# Pragya Kumari | Portfolio Website

A single-page portfolio site — full-stack & cloud engineering experience, projects, skills, and certifications.

**Live site:** [https://www.pragyakumari.com](https://www.pragyakumari.com)

---

## Tech Stack

Verified against `package.json` and the codebase.

**Core**
- [React 19](https://react.dev/)
- [Vite 8](https://vite.dev/) — build tool / dev server
- [Tailwind CSS v4](https://tailwindcss.com/) — CSS-first config via `@theme` in `src/index.css`, no `tailwind.config.js`
- Plain JavaScript (JSX) — not TypeScript. `@types/react`/`@types/react-dom` are dev-only, for editor intellisense.

**UI / Animation**
- [Framer Motion](https://www.framer.com/motion/) — entrance animations (e.g. Experience timeline)
- [GSAP](https://gsap.com/) (`ScrollTrigger`) — scroll-driven timeline progress indicator
- [@tsparticles/react](https://particles.js.org/) (+ `engine`, `slim`) — animated constellation background
- [react-type-animation](https://www.npmjs.com/package/react-type-animation) — Hero typing effect
- [lucide-react](https://lucide.dev/), [react-icons](https://react-icons.github.io/react-icons/) — icon sets
- [clsx](https://www.npmjs.com/package/clsx) — conditional className composition

**Fonts** (self-hosted via `@fontsource*`)
- Inter (variable), JetBrains Mono, Orbitron

**Tooling**
- [oxlint](https://oxc.rs/docs/guide/usage/linter.html) — linter (`npm run lint`)
- `@vitejs/plugin-react` — Vite's React plugin

**Third-party services**
- [Web3Forms](https://web3forms.com/) — contact form email delivery (no backend required)
- [Google Analytics 4](https://analytics.google.com/) — visitor/behavior analytics
- [Anthropic API](https://www.anthropic.com/) (Claude Haiku 4.5) — powers the chat widget's reasoning and tool use

**Infrastructure (AWS)**
- **S3** — static file hosting (bucket: `pragya-kumari-portfolio-91f561f4`)
- **CloudFront** — CDN in front of the S3 bucket (distribution: `E1WR599BU3HA0G`), serving the custom domain via an ACM certificate (`us-east-1`, DNS-validated) covering `pragyakumari.com` + `www.pragyakumari.com`; DNS/registrar is GoDaddy, with the bare apex domain forwarding (301) to `www`, since GoDaddy's DNS doesn't support an ALIAS/ANAME record at the zone apex
- **API Gateway + Lambda** — two endpoints on one HTTP API (`sqhjzyzhw2`): `portfolio-contact-metric` (publishes a custom CloudWatch metric on contact-form submission) and `portfolio-chatbot` (proxies chat requests to the Anthropic API and runs the tool-use loop). CORS `AllowOrigins` is an explicit allowlist (both domain variants + the CloudFront URL + localhost), not a wildcard.
- **DynamoDB** — `portfolio-chatbot-ratelimit`, a per-IP fixed-window rate limiter for the chatbot endpoint (on-demand billing, TTL-expired items)
- **CloudWatch** — dashboard (`Portfolio-Infra-Health`) combining CloudFront's built-in metrics, the custom contact-form metric, and a second section covering the chatbot backend (Lambda invocations/errors/duration, API Gateway request count/4xx/5xx/latency)

---

## High-Level Design (HLD)

### 1. Site delivery flow

The site is a static SPA (no server-side rendering, no backend for page delivery). `vite build` produces static HTML/JS/CSS/assets, which are synced to S3 and served through CloudFront.

```
Browser
  │  HTTPS request
  ▼
CloudFront (CDN, edge cache)
  │  cache miss only
  ▼
S3 bucket (static assets: index.html, JS/CSS bundles, images, resume PDF)
```

Deploy path: `vite build` → `aws s3 sync dist/ s3://…` → `aws cloudfront create-invalidation` (see [Deployment](#deployment)).

**Why this shape:** the site has no dynamic server-rendered content, so a static bucket behind a CDN is the cheapest and simplest way to serve it — no server to patch, scale, or pay for idle capacity on.

### 2. Contact form flow

```
ContactForm (React)
  │
  ├──▶ Web3Forms API  ──▶  email delivered to kmpragya052000@gmail.com
  │      (POST, determines the UI's success/error state)
  │
  └──▶ API Gateway ──▶ Lambda (portfolio-contact-metric)
         (fire-and-forget, does not affect the UI)         │
                                                             ▼
                                              CloudWatch PutMetricData
                                              (Portfolio/ContactForm namespace,
                                               dimensioned by success/error)
```

**Why this shape:** the site is 100% static, so there's no backend of its own to send email from — Web3Forms exists specifically to let a static site POST directly to a public API and have it relay to an inbox. The metric-reporting call is a second, independent request: it's fire-and-forget (wrapped so a failure there can never affect the form's actual UX) and goes through a small Lambda rather than calling CloudWatch directly, because `PutMetricData` requires AWS credentials that can't be safely embedded in client-side JS. A Lambda **Function URL** was tried first (simpler than API Gateway) but the AWS account has a guardrail blocking public/unauthenticated Function URLs; API Gateway (HTTP API) + the same Lambda was used instead.

### 3. Analytics / observability flow

Two separate tools, each used for what it's good at — deliberately not overlapping:

```
Browser ──▶ gtag.js ──▶ Google Analytics 4
  (page views, section-view events, resume_download, hire_me_click)

CloudFront ──▶ CloudWatch (automatic: Requests, error rates, cache hit rate, origin latency) [us-east-1]
Lambda (contact-metric) ──▶ CloudWatch (custom: ContactFormSubmission, success/error) [ap-southeast-2]
Lambda (chatbot) ──▶ CloudWatch (automatic: Invocations, Errors, Duration) [ap-southeast-2]
API Gateway ──▶ CloudWatch (automatic: Count, 4xx, 5xx, Latency) [ap-southeast-2]
                │
                ▼
     CloudWatch Dashboard "Portfolio-Infra-Health"
```

**Why this shape:** GA4 answers *visitor-behavior* questions (who's here, what are they doing) and is purpose-built for that; CloudWatch answers *infrastructure-health* questions (is the CDN erroring, is origin latency spiking, is the chatbot backend healthy) using metrics CloudFront/Lambda/API Gateway already emit for free. The one custom CloudWatch metric (contact-form success/failure) is the single piece of "application health" data worth having next to the infra metrics, so it's folded into the same dashboard rather than living only in GA4.

**A region gotcha, worth knowing if you extend this dashboard:** CloudFront metrics always live in `us-east-1` regardless of which region the distribution actually serves from — but the Lambda/API Gateway/custom metrics live in whatever region those resources are deployed in (`ap-southeast-2` here). Each dashboard widget's `region` property has to match where its metric actually lives; copy-pasting one widget's region onto another (e.g. reusing `us-east-1` for a Lambda-region metric) produces a widget that silently shows no data — exactly this happened with the contact-form widget and went unnoticed until an audit caught it.

### 4. Chatbot flow

A small agent, not a wrapped LLM call — most predictable questions never reach an API at all:

```
User message
  │
  ▼
FAQ layer (src/data/chatbotFaq.js, client-side, zero network call)
  │  match? ──▶ instant canned reply (+ optional client action)
  │  no match
  ▼
POST /chat ──▶ Lambda (portfolio-chatbot)
                 │
                 ├─ DynamoDB rate-limit check (per IP, fixed window) ──▶ 429 if over
                 │
                 └─ Anthropic Messages API (Claude Haiku 4.5)
                      system prompt = full knowledge base (lambda/chatbot/knowledge.js)
                      tools = [get_project_case_study, scroll_to_section, download_resume]
                      │
                      ├─ stop_reason "end_turn" ──▶ return text to the widget
                      │
                      ├─ tool_use: get_project_case_study (server tool)
                      │    resolved inside the Lambda, loop continues automatically
                      │
                      └─ tool_use: scroll_to_section / download_resume (client tool)
                           returned to the browser ──▶ widget executes the action
                           ──▶ POSTs a tool_result back to /chat ──▶ Claude continues
```

**Why this shape:** the client/server tool split is the core design decision — some things (fetching deeper background detail) can be resolved entirely on the backend and looped invisibly, but scrolling the page or triggering a file download can only happen in the browser, so the backend hands control back and picks the conversation up again once the frontend reports the action is done. The FAQ layer exists purely for cost/latency: the handful of questions every visitor asks (hello, resume, tech stack) are answered for free before an API call is even considered. Rate limiting is DynamoDB-based rather than AWS WAF specifically to avoid WAF's flat monthly base fee, which isn't worth it at this traffic scale; the real backstop against a runaway bill is a spend cap set directly on the Anthropic API key, independent of any bug in the app-level limiter.

---

## Low-Level Design (LLD)

### Component structure

```
src/
├── App.jsx                     # Composes Layout + all page sections in order
├── main.jsx                    # React root
├── index.css                   # Tailwind v4 @theme tokens, light/dark overrides, global utilities
├── data/
│   ├── content.js               # Single source of truth for all copy/links/config
│   ├── skillIcons.js            # Skill name → icon component + brand color map
│   └── chatbotFaq.js            # Client-side FAQ pattern-matching layer for the chat widget
├── lib/
│   └── analytics.js             # trackEvent() wrapper around window.gtag
├── hooks/
│   ├── useTheme.js              # Theme state (see below)
│   ├── useInView.js             # IntersectionObserver → boolean, used for scroll-reveal
│   ├── useScrolled.js           # Navbar background-on-scroll trigger
│   ├── useActiveSection.js      # Tracks which section is in view, for nav highlighting
│   └── useChat.js               # Chat message state, FAQ short-circuit, backend + tool-loop calls
└── components/
    ├── layout/                  # Navbar, Footer, Layout, Section, ParticleBackground, ContactForm
    ├── hero/                    # Hero, FloatingSocialIcons
    ├── experience/               # Experience (timeline), TimelineNode, CompanyLogo
    ├── projects/                 # Projects, ProjectCard
    ├── skills/                   # Skills, SkillIconCard
    ├── certifications/           # Certifications, CertificationCard
    ├── chatbot/                  # ChatWidget (avatar trigger + panel), ChatMessage
    └── ui/                       # Button, Tag, IconLink, MetricStat, Reveal, BrandIcons

lambda/                          # Standalone Lambda source, zip-deployed (no shared build with the Vite app)
├── contact-metric/               # index.mjs — publishes the contact-form CloudWatch metric
└── chatbot/
    ├── index.mjs                 # Handler: rate limit → Anthropic call → tool-use loop
    ├── context.js                 # System prompt (imports knowledge.js) + case-study tool content
    ├── knowledge.js                # Full factual knowledge base, sourced from the resume + content.js
    └── tools.js                    # Tool schemas + server-tool executor
```

Every section (`Experience`, `Projects`, `Skills`, `Certifications`) is wrapped in the shared `Section` component, which owns the scroll-reveal (`useInView`) and fires the `section_view` analytics event. `Footer` (which renders the Contact section) duplicates this wiring directly since it doesn't use `Section`.

There is no router — navigation is single-page anchor scrolling (`href="#skills"` etc.) with `scroll-behavior: smooth`.

### Theming

Implemented with Tailwind v4's CSS-first `@theme` and plain CSS custom properties — no theme library, no context provider.

- `src/index.css` defines all color tokens (`--color-canvas`, `--color-ink`, `--color-accent`, …) once inside `@theme` (the dark/default values), with a second block scoped to `[data-theme="light"]` that overrides the same variable names. Every component just uses the resulting Tailwind utilities (`bg-canvas`, `text-ink`, etc.) — components don't know which theme is active.
- Theme state lives as a single DOM attribute: `document.documentElement.dataset.theme`. `useTheme.js` reads this via `useSyncExternalStore` and writes to it (plus `localStorage`) on toggle, dispatching a `themechange` custom event so multiple components using the hook (e.g. `Navbar`'s toggle button and `ParticleBackground`, which re-colors its particles per theme) stay in sync without any shared React state/context.
- An inline script in `index.html` runs before first paint: reads `localStorage`, falls back to `prefers-color-scheme`, and sets the `data-theme` attribute immediately — this avoids a flash of the wrong theme on load. The same script also resets scroll position and strips any URL hash on load/reload.
- A handful of components (Button, Navbar's toggle/CTA buttons) have explicit `[data-theme=light]` Tailwind arbitrary-variant overrides where the dark-mode "glow" aesthetic (bright box-shadows) needed a different treatment in light mode (softer shadows, solid fills) rather than just different colors.

### Contact form

`src/components/layout/ContactForm.jsx`:

- Client-side email validation via a regex (`EMAIL_PATTERN`), checked on blur and on submit; shows an inline error and blocks submission rather than relying solely on the browser's native `type="email"` validation.
- Honeypot spam filter: a `botcheck` checkbox field is rendered off-screen (`display: none`, `tabIndex={-1}`, `aria-hidden`) — invisible to real visitors but often filled in by bots that programmatically fill every form field. If it's checked on submit, the form shows the normal success state but the request is dropped before ever calling Web3Forms.
- On submit, POSTs `{ access_key, name, email, message, botcheck }` to `https://api.web3forms.com/submit`. `WEB3FORMS_ACCESS_KEY` lives directly in `src/data/content.js` — it's not a secret (Web3Forms keys are designed to be public/client-exposed, similar to a Stripe publishable key), so it isn't loaded from an env file.
- UI is a small state machine (`idle` → `sending` → `sent` | `error`) driving the submit button's disabled state and the success/error message shown.
- After the Web3Forms request settles (success or failure), fires `reportContactMetric(status)` — a `fetch()` to the API Gateway endpoint in `CONTACT_METRIC_URL`, wrapped in `.catch(() => {})` so a metrics failure is silent and never surfaces to the user.
- If `WEB3FORMS_ACCESS_KEY` is unset, the form falls back to a `mailto:` link with the message pre-filled, instead of the fetch-based submit.

### Chatbot

`src/hooks/useChat.js` + `src/components/chatbot/`:

- Holds the full Anthropic-format `messages` array in a ref (no database — conversations are short, and the whole point is a stateless Lambda behind a static site, matching the rest of this repo's infra philosophy).
- `sendMessage()` checks `matchFaq()` first; a match renders instantly and, if it has an associated action (e.g. a resume request), runs it directly — no backend call at all.
- On a miss, POSTs to `/chat` and drives the client-tool round trip: if the Lambda returns `status: "needs_client_action"`, the widget runs the action (`scroll_to_section` / `download_resume`, defined in a small `CLIENT_ACTIONS` map) and POSTs a `tool_result` back so Claude can continue, capped at a few round trips to avoid a runaway loop.
- `ChatWidget.jsx` is the floating avatar trigger + panel; `ChatMessage.jsx` renders a single bubble. The trigger button shows a small pulsing ring (`@utility chat-trigger-pulse` in `index.css`, disabled under `prefers-reduced-motion`) and a notification dot that clears once the widget has been opened.

`lambda/chatbot/`:

- `index.mjs` checks the DynamoDB rate limit (`event.requestContext.http.sourceIp` — this is an HTTP API v2 field; the older `identity.sourceIp` from REST APIs doesn't exist here), then calls the Anthropic Messages API with `context.js`'s system prompt and `tools.js`'s tool schemas.
- Tool calls are split by name: `get_project_case_study` is a **server tool**, resolved locally against `context.js`'s `CASE_STUDIES` and looped back to Anthropic automatically (invisible to the frontend); `scroll_to_section`/`download_resume` are **client tools**, returned to the browser to execute.
- The system prompt is grounded by `knowledge.js` — a full factual knowledge base (work history, education, every project, full skills list, certifications) sourced directly from the resume PDF and `src/data/content.js`, so most factual questions never need a tool call at all. `CASE_STUDIES` in `context.js` is reserved for narrative/"why" questions (why she left Amazon, how the CloudWatch dashboard works) rather than facts.
- Prompt caching (`cache_control` on the system block) is wired in but doesn't currently engage — the system prompt sits under Haiku 4.5's ~4,096-token caching floor even with the full knowledge base, verified via the API's own `cache_read_input_tokens` in the response rather than assumed. Cost impact of no caching is negligible at this traffic volume (roughly $0.003–0.004 per conversation turn).

### Other implementation notes

- **Scroll-reveal**: `useInView` (IntersectionObserver, fires once) toggles a `reveal`/`is-visible` utility class pair (see the `@utility reveal` block in `index.css`) for a fade/slide-in on scroll; respects `prefers-reduced-motion`.
- **Particle background**: `ParticleBackground.jsx` configures `@tsparticles/slim` with separate color/opacity/size presets per theme (`PARTICLE_THEMES.dark` / `.light`), keyed off `useTheme()`; the underlying `@tsparticles/react` wrapper fully reinitializes the particle instance whenever the `options` object identity changes, so theme changes take effect immediately.
- **Content model**: all copy, links, nav items, experience/project/skill/certification data live in `src/data/content.js` as plain exported constants — components map over these arrays rather than hardcoding content, so most content edits don't touch component code.
- **Icons**: `src/data/skillIcons.js` maps each skill's display label to a specific icon component and its real brand color; skills without an honest brand mark (e.g. "System Design") use a generic icon rather than a misleading logo.

---

## Features

- Fully responsive layout — verified at 375px (mobile), 768px (tablet), and 1920px (desktop) in both themes
- Light/dark theme toggle, defaults to OS preference, persisted across visits, no flash-of-wrong-theme on load
- Working contact form (Web3Forms) with client-side validation, honeypot spam filtering, and distinct success/error states
- Contact email address shown directly in the footer, in addition to the mailto icon link
- SEO metadata: title/description/keywords, canonical URL, Open Graph + Twitter Card tags, JSON-LD `Person` structured data, a generated 1200×630 social preview image, and a full favicon set
- Google Analytics 4 event tracking: page views, per-section view events, resume-download clicks, "Hire Me" clicks
- Custom CloudWatch metric for contact-form success/failure, shown on an infra-health dashboard alongside CloudFront's request/error/latency/cache-hit-rate metrics
- Animated, theme-aware constellation particle background
- Scroll-triggered reveal animations, reduced-motion aware throughout
- Resume download button in the navbar (currently active); the code renders it disabled/greyed-out automatically if `resumeUrl` is ever unset, instead of linking to a missing file
- Chat widget: a free client-side FAQ layer for predictable questions, backed by a Claude Haiku 4.5 agent (Lambda + API Gateway) for everything else, with real tool use — some tools resolved server-side, others (page scroll, resume download) handed back to the browser to execute. Per-IP rate limited and grounded in a full knowledge base sourced from the resume and site content. System prompt includes explicit guardrails against prompt injection, off-topic requests, and being asked to fabricate negative claims about Pragya — verified against live adversarial prompts, not just written and assumed to hold.
- Custom domain (`pragyakumari.com` / `www.pragyakumari.com`) via an ACM-issued cert on CloudFront, with GoDaddy DNS/forwarding handling the apex-to-`www` redirect

---

## Local Development

```bash
npm install       # install dependencies
npm run dev       # start the Vite dev server (http://localhost:5173)
npm run build     # production build to dist/
npm run preview   # locally preview the production build
npm run lint      # run oxlint
```

No environment variables are required to run locally — the Web3Forms key and analytics IDs are committed directly in `src/data/content.js`/`index.html` (see [Contact form](#contact-form) for why). The chatbot's `ANTHROPIC_API_KEY` lives only as a Lambda environment variable in AWS, never in the repo or the frontend bundle — the widget always talks to `/chat`, never to Anthropic directly.

---

## Deployment

```bash
npm run deploy              # frontend: build + sync to S3 + invalidate CloudFront
npm run deploy:chatbot      # zip + update the portfolio-chatbot Lambda
npm run deploy:contact-metric   # zip + update the portfolio-contact-metric Lambda
```

`npm run deploy` runs, in order:
1. `vite build` — production build to `dist/`
2. `aws s3 sync dist/ s3://pragya-kumari-portfolio-91f561f4/ --delete` — sync to the S3 origin, removing stale files
3. `aws cloudfront create-invalidation --distribution-id E1WR599BU3HA0G --paths '/*'` — invalidate the CDN cache so changes go live immediately instead of waiting for cached objects to expire

The two `deploy:*` scripts zip their respective `lambda/<name>/` folder and run `aws lambda update-function-code` — there's no build step, since both functions are plain `.mjs` with no bundled dependencies (Node 20.x's managed runtime already includes the AWS SDK v3 clients they use).

Requires the AWS CLI configured locally with credentials that have S3 write, CloudFront invalidation, and Lambda update permissions.
