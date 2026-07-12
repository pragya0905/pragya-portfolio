# Project Deep-Dive: Pragya Kumari's Portfolio

This is the full story of this project — every major piece, why it exists, and how it works. `README.md` is the technical reference for someone cloning the repo; this document is the narrative version, written to cover **what** was built, **why** each decision was made over the alternatives, and **how** it actually works under the hood, including the problems that came up along the way and how they were solved.

**Live site:** https://d1aa6im9pyy9sf.cloudfront.net
**Repo:** https://github.com/pragya0905/pragya-portfolio

---

## 1. What this project is

A single-page portfolio site for Pragya Kumari — a Software Development Engineer with backend/cloud experience at Amazon and full-stack ownership as a Founding Engineer at a startup (Aurique Life). The site presents her experience, projects, skills, and certifications, and includes two pieces of real, working engineering beyond the static content: a serverless contact form with spam filtering and observability, and an agentic chatbot that can answer questions about her background and interact with the page itself.

The project is deliberately over-built relative to what a static resume page strictly needs — that's the point. It exists as a demonstration of full-stack and cloud engineering practice, not just a container for a PDF.

---

## 2. Why this architecture: static site + serverless AWS

**The decision:** No traditional backend server. The frontend is a static React build served from S3 behind CloudFront. The two dynamic features (contact form metrics, chatbot) are handled by small, independent Lambda functions behind a shared API Gateway, with no persistent server process anywhere.

**Why:** A portfolio site has no dynamic, per-request content to render — every visitor sees the same page. Paying for (and patching, and scaling) a server that sits mostly idle doesn't make sense here. Static hosting behind a CDN is both the cheapest option and, per web performance conventions, the fastest — CloudFront serves cached assets from edge locations rather than round-tripping to an origin server on every request.

Where the site does need *some* backend logic — sending contact-form email, publishing a metric, running an LLM conversation — the answer is Lambda: pay only for actual invocations, zero idle cost, and no server to maintain. This is "serverless where it's needed, static everywhere else," not serverless dogma for its own sake.

---

## 3. The stack, and why each piece was chosen

| Choice | Why this one, not an alternative |
|---|---|
| **React 19 + Vite 8** | Vite's dev server and build times are materially faster than older bundlers (Webpack-era CRA); React needs no justification for a component-heavy content site with lots of repeated card/section patterns. |
| **Plain JavaScript, not TypeScript** | A single-developer, content-heavy site with no complex shared data contracts across a team — TypeScript's main value (catching type errors across a large, multi-contributor codebase) doesn't pay for itself here relative to the setup/maintenance overhead. |
| **Tailwind CSS v4 (CSS-first `@theme`)** | No `tailwind.config.js` — v4 moved configuration into CSS custom properties directly. This made the entire light/dark theme system possible with just two CSS blocks (see §5) instead of a JS theme object threaded through every component. |
| **S3 + CloudFront over a PaaS (Vercel/Netlify)** | The explicit goal was to demonstrate hands-on AWS skill, not just ship a working site — a managed platform would have hidden exactly the infrastructure work (CDN config, cache invalidation, IAM, Lambda wiring) that the project exists to showcase. |
| **API Gateway HTTP API, not REST API** | HTTP APIs are cheaper and simpler for this use case (no need for REST API's request/response transformation features), and its CORS handling is genuinely simpler to configure correctly for a small number of routes. |
| **Web3Forms for contact-form email** | The site is 100% static — there's no backend of its own to send mail from, and standing up an SMTP-capable server for one contact form would be absurd overkill. Web3Forms exists specifically to let static sites POST to a public endpoint and have it relay to an inbox. |
| **Anthropic API (Claude Haiku 4.5) for the chatbot** | Haiku 4.5 is materially cheaper than Sonnet/Opus while being entirely sufficient for grounded Q&A + tool routing over a fixed, well-scoped knowledge base — this isn't a task that benefits from a larger model's extra reasoning depth, so paying for one would be wasted spend on a public, unauthenticated endpoint. |

---

## 4. Evolution of the project (roughly chronological)

The project didn't arrive at its current shape all at once. It went through distinct phases, each solving a real problem or filling a real gap:

1. **Scaffold** — Vite + React + Tailwind, basic sections (Hero, Experience, Projects, Skills, Certifications, Contact).
2. **Deployment** — S3 + CloudFront set up, `npm run deploy` scripted as build → sync → invalidate.
3. **Theming** — a full light/dark mode system added, including a hand-tuned light palette (not a naive color inversion) and a theme-aware particle background.
4. **SEO & social metadata** — title/description/keywords, Open Graph + Twitter Card tags, JSON-LD `Person` structured data, a generated 1200×630 social preview image, full favicon set.
5. **Content correctness pass** — title, skills list, project list, certifications, and links iterated to match Pragya's actual current role and achievements (several rounds of "remove this project," "rename this skill," "add this certification" as her real background was reflected accurately).
6. **Analytics & observability** — GA4 for visitor behavior, a custom CloudWatch metric + dashboard for infrastructure health (see §7).
7. **Contact-form hardening** — a honeypot spam filter added once the form was live and exposed to real traffic (see §6).
8. **Git history + security pass** — the repo was formalized in git (it had been developed locally without version control up to this point), scanned for secrets before pushing to a public GitHub repo, and commit authorship was corrected via a non-interactive rebase.
9. **README rewrite** — a full HLD/LLD technical write-up, verified line-by-line against the actual codebase rather than written from memory.
10. **The chatbot** — by far the largest single addition: a full agentic system with its own AWS infrastructure (see §8).
11. **Chatbot trigger redesign** — the generic message-icon button replaced with a themed avatar matching the site's visual language (see §8.6).

---

## 5. Theming system

**What:** A light/dark toggle, defaulting to OS preference, persisted across visits, with zero flash-of-wrong-theme on load.

**Why it needed real design work, not just inverted colors:** The original design was dark-only — a near-black canvas, cyan glow shadows, a particle background, all specifically tuned for a black backdrop. A naive "invert the colors" approach would have produced a washed-out, flat light mode (bright cyan glows read as smudges on white; a translucent glass button background becomes invisible on white). So the light palette was hand-tuned: a warm off-white canvas (not stark white), a darkened accent color for contrast, and a separate `--color-glow` token (decoupled from `--color-accent`) specifically so glow-shadow intensity could be tuned independently of the accent color itself.

**How:**
- Theme state lives as a single DOM attribute, `document.documentElement.dataset.theme`.
- `src/index.css` defines every color as a CSS custom property once in `@theme` (the dark/default set), with a second `[data-theme="light"]` block overriding the same variable names. Every component uses Tailwind utilities like `bg-canvas`/`text-ink` — no component contains theme-conditional logic itself.
- `useTheme.js` reads/writes that DOM attribute via `useSyncExternalStore`, and dispatches a custom `themechange` event so multiple independent consumers (the Navbar toggle, the particle background) stay in sync without a shared React context.
- An inline `<script>` in `index.html`'s `<head>` runs before React mounts: reads `localStorage`, falls back to `prefers-color-scheme`, and sets the attribute immediately. This is what prevents a flash of the wrong theme — by the time React hydrates, the correct theme is already applied.

---

## 6. Contact form

**What:** A form that emails Pragya directly, with client-side validation, distinct success/error states, and spam filtering.

**Why Web3Forms + a honeypot, specifically:** Once the form was live and reachable by the public internet, it became a target for automated spam. A honeypot — an invisible form field that only bots (which fill in every field programmatically) ever complete — was chosen over a CAPTCHA because it adds zero friction for real visitors, costs nothing, and required no new dependency. It's explicitly a *first line of defense*, not a complete solution: a bot using real browser automation can't interact with a `display:none` field at all (this was verified directly — see §9's testing note), but a bot that POSTs straight to Web3Forms's API bypasses the page entirely and the honeypot does nothing for that case. reCAPTCHA v3 was identified as the next escalation if spam becomes a real problem, but wasn't built since it hasn't been needed yet — no point adding complexity for a problem that doesn't exist.

**How:** A checkbox field named `botcheck` is rendered off-screen (`display:none`, `tabIndex={-1}`, `aria-hidden`). If it's checked on submit, the UI shows the normal "sent" success state (so a bot gets no signal it was caught) but the request is silently dropped before Web3Forms is ever called. After the real request settles, a second, independent, fire-and-forget call reports success/error to a CloudWatch metric (see §7) — wrapped in `.catch(() => {})` so a metrics failure can never surface to the user or block the actual contact-form UX.

---

## 7. Analytics & observability

**What:** Two separate tools, deliberately not overlapping — Google Analytics 4 for visitor behavior, CloudWatch for infrastructure health.

**Why split this way, rather than one tool for everything:** GA4 is purpose-built to answer "who's here, what are they doing" — page views, which sections get scrolled to, resume downloads, "Hire Me" clicks. CloudWatch is purpose-built to answer "is the infrastructure healthy" — CloudFront already emits request counts, error rates, cache hit rate, and origin latency for free; there was no reason to duplicate that in GA4 or build custom infra-monitoring from scratch. The one exception is a single custom metric — contact-form submission success/failure — added to CloudWatch specifically because "is the one piece of application logic on this site actually working" is an infrastructure-health question, not a visitor-behavior one, so it belongs on the same dashboard as the CDN metrics, not buried in GA4's event stream.

**How the custom metric gets there — and a real engineering detour:** The contact form can't call `PutMetricData` directly, since that requires AWS credentials that can't be safely embedded in client-side JS. The first design was a Lambda **Function URL** — simpler than API Gateway, since it needs no separate resource to configure. This hit an account-level AWS guardrail that blocks public, unauthenticated Function URLs. Rather than working around the guardrail (which would have meant weakening account security posture for one form), the design was changed: API Gateway (HTTP API) in front of the same Lambda, which is the "proper" pattern anyway. A second bug showed up here too: the API Gateway resource policy's `SourceArn` had a trailing slash (`sqhjzyzhw2/*/*/`) which caused a 500 "IAM role doesn't have permissions" error — removing the trailing slash (`sqhjzyzhw2/*/*`) fixed it. Both of these are the kind of thing that only surfaces by actually deploying and testing against real AWS, not by reading documentation.

---

## 8. The chatbot — the largest piece of this project

This is worth its own detailed section, since it's architecturally the most interesting part of the site and the one built with the most deliberate design intent.

### 8.1 What it is, and what it deliberately isn't

**What:** A chat widget where a visitor (recruiter, hiring manager, curious engineer) can ask questions about Pragya's background and get grounded, accurate answers — and where some answers come with real side effects, like scrolling the page to a relevant section or triggering the resume download.

**What it deliberately isn't:** "An LLM wrapped in a chat box." That's the easy version, and it doesn't demonstrate anything beyond "I can call an API." The actual goal was to build something that reasons about *when it needs to think versus when it can just act*, and that knows the difference between what it can answer on its own and what needs a human loop back through the browser. That framing drove every architectural decision below.

### 8.2 The three-layer request flow

1. **FAQ layer (client-side, free, instant).** Before anything touches an API, a small pattern-matching layer (`src/data/chatbotFaq.js`) checks the visitor's message against a handful of predictable patterns — greetings, resume requests, tech-stack questions. A match resolves instantly with zero network call and zero cost. This exists purely because most of what visitors ask is predictable, and it's wasteful (in both latency and money) to route "hi" through an LLM.
2. **Claude Haiku 4.5, grounded by a full knowledge base.** Anything that doesn't match falls through to a Lambda that calls the Anthropic Messages API. The system prompt is backed by a comprehensive knowledge base (`lambda/chatbot/knowledge.js`) covering full work history with every real metric, education, every project in detail, the complete skills list, and certifications — sourced directly from the actual resume PDF and the site's own `content.js`, not invented. This means most factual questions ("where did she study," "does she know PostgreSQL," "what certifications does she have") get answered directly, without needing a tool call at all.
3. **Tools, split by where they can execute.** Some things genuinely can't be resolved by an LLM alone:
   - **Server tools** (`get_project_case_study`) run inside the Lambda itself, against a set of deeper narrative write-ups — the "why" behind something (why she left Amazon, how the CloudWatch dashboard is built), as opposed to the "what" the knowledge base already covers. Resolved invisibly; the model loops back to itself automatically.
   - **Client tools** (`scroll_to_section`, `download_resume`) can only happen in the browser. When the model calls one of these, the Lambda returns control to the frontend instead of trying to resolve it itself. The widget executes the action (scrolls the page, or creates and clicks a download link), then POSTs a `tool_result` back to the Lambda so the conversation continues — "I've scrolled you to the Projects section, the Ransomware Detection System's built with..." This client/server split is the architectural core of the whole feature.

### 8.3 Why a stateless Lambda, no database for conversation history

The frontend holds the full conversation history in React state and resends it on every request — the Lambda itself is completely stateless between calls. This mirrors the rest of the site's infrastructure philosophy (no server to run, nothing to keep alive) and is genuinely sufficient at this scale: conversations are short, and the cost of resending history each turn is negligible compared to the cost of standing up and maintaining a session store for a low-traffic personal site.

### 8.4 Security and cost controls — and why each specific mechanism was chosen over alternatives

A public, unauthenticated endpoint that calls a metered LLM API needs real guardrails before going live. Three were built, each chosen deliberately over a more expensive or more complex alternative:

- **CORS locked to the real origin.** The API Gateway's CORS config allows only `https://d1aa6im9pyy9sf.cloudfront.net` (plus `localhost` for dev) — not a wildcard. A request from any other origin gets a response with no `Access-Control-Allow-Origin` header, which browsers refuse to expose to JS, even though the raw HTTP request still returns 200 (this was explicitly verified, not assumed).
- **Per-IP rate limiting via DynamoDB, not AWS WAF.** A fixed-window counter (one item per `ip#hour-bucket`, TTL'd to auto-expire) caps requests per visitor per hour. WAF was considered and rejected specifically because it carries a flat ~$5–6/month base fee regardless of traffic — not worth it at this site's actual traffic volume. The DynamoDB approach costs fractions of a cent. Its known limitation (a visitor can send the limit right at the end of one window and again right at the start of the next, briefly doubling the effective rate) was accepted as a reasonable tradeoff for a portfolio site, not a bug to fix.
- **A spend cap on the Anthropic API key itself**, set directly in the Anthropic Console — the real backstop against a runaway bill, independent of the app-level rate limiter above. If the rate limiter has a bug, this is what actually prevents a surprise charge.

### 8.5 Problems hit and solved during the build

This section exists because the *how it was actually built* includes real debugging, not just the finished design:

- **Lambda Function URLs blocked account-wide** (see §7) — pivoted to API Gateway.
- **CORS preflight failing on the contact-metric route**: the Lambda's `$default` catch-all route meant `OPTIONS` preflight requests reached the handler and failed body-parsing (returning 400) before ever reaching the CORS-aware logic — and per the CORS spec, a non-2xx preflight response makes browsers abort the real request even if the right headers are technically present elsewhere. Fixed by short-circuiting `OPTIONS` to a bare `204` before any body parsing.
- **`deploy:chatbot` forgetting a file.** After adding `knowledge.js`, the deploy script (which explicitly lists which files to zip) wasn't updated to include it — the first deploy after that change crashed every single request with `Cannot find module '/var/task/knowledge.js'`. Caught immediately via CloudWatch logs, fixed by updating the zip command, redeployed.
- **A near-miss bug caught before it shipped**: an attempt to make the "ask for the visitor's name" behavior more robust involved seeding the conversation history with an assistant-authored greeting turn. This would have broken *every single request*, since the Anthropic Messages API requires the first message in a conversation to have the `user` role — an assistant-first array is rejected outright. Caught by reasoning through the API contract before deploying, not by a failed test after the fact; fixed by moving that logic into a system-prompt instruction instead of a fabricated history entry.
- **Prompt caching not engaging.** `cache_control` was wired in from the start, expecting it to reduce cost once the knowledge base grew the system prompt. In practice, `cache_read_input_tokens` stayed at `0` even after the knowledge base pushed the prompt to ~3,195 tokens — still under Haiku 4.5's real caching floor. Rather than padding the prompt with filler content just to clear an arbitrary token threshold, this was accepted as-is: the actual dollar cost of skipping caching entirely is negligible at this traffic volume (roughly $0.003–0.004 per conversation turn), so it wasn't worth manufacturing content to chase a technical bonus with no real payoff.
- **A visible/backend greeting-text drift.** The chat widget originally had *two* separate greeting strings — one static, rendered immediately when the widget opens, and one returned by the FAQ layer when a visitor types "hi." When the FAQ text was updated to ask for the visitor's name, the static one was missed, so the site kept showing the old greeting until the mismatch was caught and fixed by extracting a single shared `GREETING_TEXT` constant so the two can't drift apart again.
- **The "getting to know the visitor" behavior initially failed silently.** The first version of the system-prompt instruction asking Claude to request the visitor's name got consistently skipped whenever a visitor asked a real question first — the model prioritized giving a complete answer over the secondary instruction, which was buried as one bullet among many. Verified as broken via direct testing (not assumed to work because the instruction existed), then fixed by promoting it to its own clearly-marked, non-optional section of the prompt, which then verified correctly in both the tool-call and plain-answer paths.

None of these were caught by "it should probably work" reasoning — each was found either by deploying and testing against the real, live AWS infrastructure, or by tracing through the actual API contract, then fixed and re-verified against production before being considered done.

### 8.6 The chat trigger's visual design

**What:** A circular "PJ" avatar button (bottom-right, fixed position) replacing an initial generic message-icon button — dark navy background in dark mode (flipping to white in light mode, matching the rest of the site's theme-adaptive circular buttons), a low-opacity pulsing ring, a glow shadow matching the hero section's other circular icon buttons, and a notification dot that clears once the widget's been opened.

**Why it went through a second iteration:** The first version deliberately used a *fixed* dark-navy background (matching the hero photo frame's always-dark styling) rather than a theme-adaptive one, reasoning from the literal design brief ("dark surface background, same navy as the hero section"). Once actually seen live in light mode, this read as visually wrong — a single dark, out-of-place circle on an otherwise light page, inconsistent with how every other circular button on the site (the theme toggle, the social icons) adapts to the active theme. It was corrected to use the theme-reactive `bg-surface` token instead, which is the same fix pattern used everywhere else on the site: prefer the token that already encodes "adapt with the theme" over one that encodes "always look like this."

**Also worth noting**, from a self-critique during the design process: the glow shadow was initially omitted (the design brief asked for a ring, not a shadow), which made the new avatar sit inconsistently next to the hero's other glowing circular icons — a case of matching the literal spec over cross-checking against the rest of the page's established visual language. Added back once the inconsistency was pointed out.

---

## 9. Testing methodology, and what it taught

Verification throughout this project consistently favored **testing against the real, deployed system** over trusting that code "should" work:

- UI changes were checked with headless-browser screenshots (Playwright) in both themes at multiple breakpoints, not just eyeballed in one browser window.
- Every backend change was tested with real `curl` requests against the live API Gateway endpoint, with CloudWatch logs checked immediately after to confirm the actual error (or lack of one) — not inferred from the HTTP status code alone.
- The honeypot spam filter's initial test attempts (raw DOM `.checked = true` + a dispatched `change` event) produced false negatives — React's synthetic event system doesn't reliably pick up programmatic DOM mutations for checkboxes. This wasn't a bug in the component; it was a bug in the *test methodology*, discovered by temporarily making the checkbox visible so Playwright's real `.check()` API could interact with it through the actual React event path — which then passed cleanly. The lesson generalizes: a failing test doesn't always mean failing code.
- Cache behavior, rate limiting, and CORS rejection were each verified with a real second call and a real cross-origin request, respectively — not assumed correct because the configuration "looked right."

---

## 10. Known limitations and deliberate non-decisions

Things that were consciously left as-is, and why:

- **Honeypot-only spam protection.** Effective against bots that fill every field but ineffective against bots that POST directly to Web3Forms's API, bypassing the page. Accepted because reCAPTCHA's UX cost isn't worth paying until spam is an actual observed problem.
- **No caching engaged on the chatbot's system prompt.** The real dollar cost of not caching is negligible at current traffic; padding the prompt to force caching to activate would have been optimizing a number instead of the actual thing that matters (cost).
- **Fixed-window (not sliding-window) rate limiting.** Has a known edge at window boundaries; not worth the added complexity for a portfolio-scale audience where the real backstop is the Anthropic spend cap, not the rate limiter.
- **Two data sources for chatbot content that can drift**: `lambda/chatbot/knowledge.js` (backend) and `src/data/content.js` (frontend) are maintained independently, since the Lambda is a standalone zip deploy with no shared build step with the Vite app. If the site's content changes, the knowledge base has to be updated by hand — a real maintenance cost, accepted because building a shared-content pipeline for two small, infrequently-changed files would be solving a problem that doesn't exist yet.
- **A couple of small date discrepancies between the resume PDF and `content.js`** (the DivineAI and HighRadius internship date ranges differ slightly between the two sources) — surfaced explicitly when the chatbot's knowledge base was built from the resume, rather than silently picked one source and hidden the conflict. Not yet reconciled in either source file.

---

## 11. Where things stand

Everything described above is live, deployed, and has been verified against production — not just built and assumed working. The chatbot's AWS infrastructure (Lambda, API Gateway route, DynamoDB table, IAM role) all exist as real, running resources, alongside the original S3/CloudFront/Lambda/CloudWatch infrastructure for the base site and contact form. Both Lambda functions are version-controlled in `lambda/` as of this project's more recent work — previously they existed only as live AWS state with no source in the repo, which has since been corrected.
