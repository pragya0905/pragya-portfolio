// Comprehensive factual knowledge base for the chatbot's system prompt —
// everything real and current about Pragya, loaded into every conversation
// so most questions can be answered without a tool call. Sourced directly
// from her resume and src/data/content.js (the site's own single source of
// truth) — nothing here is invented.
//
// Keep this file and the two source-of-truth files in sync manually: this
// Lambda is a standalone zip deploy with no shared build step with the
// resume PDF or the Vite app's src/data/content.js.
export const KNOWLEDGE_BASE = `
## Work history (full detail)

**Founder & Software Engineer, Aurique Life** (June 2025 — Present, Remote)
- Founded a digital wellness brand — single-handedly architected and launched a scalable e-commerce platform, achieving $5K ARR and 25% month-over-month growth.
- Built the complete backend in Python (Flask) and AWS (DynamoDB, SQS, SNS, CloudWatch) to handle order state management, secure OTP authentication (PyJWT), and real-time metric tracking — deployed via the Serverless Framework/CloudFormation for infrastructure-as-code, and tested with pytest/moto to verify AWS interactions without hitting live AWS.
- Engineered a high-performance, responsive frontend in React and TypeScript, using GSAP and Framer Motion for an immersive, scroll-driven storytelling UI, plus React Three Fiber/Three.js for interactive 3D product showcases — boosted brand engagement by 30%.
- Led end-to-end digital branding and technical SEO, integrating automated marketing workflows and a cohesive, minimalist design system across the platform.
- This is her own company, not just an engineering role — she owns the whole thing: product, engineering, and business.

**Software Development Engineer, Amazon** (January 2024 — May 2025, Hyderabad, India)
- Architected a provenance-aware inventory removal system eliminating counterfeit-swap fraud on FBA orders across 100+ fulfillment centers (Java, Spring Boot, AWS), cutting return mismatches by 95% and reducing annual fraud by $5.5M.
- Re-architected a legacy EC2 polling service into an event-driven, serverless pipeline (Java, AWS CDK/TypeScript) — migrated deprecated APIs and built robust failure-path routing, eliminating idle compute costs and improving shipment processing latency.
- Designed and deployed a real-time observability pipeline for Live Site services: a Python worker on AWS ECS Fargate polling and filtering error logs into DynamoDB as a single source of truth, visualized through a React/TypeScript dashboard for faster root-cause triage. This dropped the fatal error rate from 90% to roughly 5%.
- Led code and design reviews across projects, improving code quality and collaborating with cross-functional teams — cut critical errors by 25%.

**Data Analyst Intern, DivineAI** (Bhubaneswar, India, June 2022 — September 2022)
- Developed and deployed a real-time data analytics dashboard on AWS (Django, Power BI) and performed advanced statistical analysis (Python, Pandas, NumPy, Matplotlib), surfacing insights that improved operational visibility by 30%.

**Software Engineering Intern, HighRadius** (Remote, January 2022 — April 2022)
- Built a full-stack AI-enabled B2B FinTech invoice management application (React.js, Java Servlets, MySQL) managing 50,000+ real-world invoice records, with full CRUD functionality, an advanced search engine, and analytical dashboards (charts and graphs).
- Engineered a predictive cash-flow forecasting system: evaluated 5 ML regression models (XGBoost, Decision Tree, LightGBM, Gradient Boosting, Random Forest) to predict invoice clearing dates and aging buckets — Random Forest was the best performer, with roughly a 75% validation score.

## Education
**Bachelor of Technology, Computer Science** — Kalinga Institute of Industrial Technology (KIIT-DU), Bhubaneswar, India. July 2019 — May 2023. CGPA: 8.77/10.0. Relevant coursework: Data Structures & Algorithms, DBMS, Operating Systems, Machine Learning.

## Projects (full detail)

**Aurique Life platform** — see the Founder role above; this is her current, primary project — her own company, built and run solo.

**JobPilot** (Python, FastAPI, SQLite, Ollama, Pydantic, WeasyPrint) — a local-first job-search pipeline running entirely on-device via Ollama (a local LLM runner), sourcing, scoring, and tailoring resumes across 6+ job sources at zero cloud cost, with structured LLM output validation and fabrication guardrails to keep the AI from inventing resume content. An 8-stage pipeline per job posting: years-of-experience gate, copy-only skills extraction, salary extraction, fact-checked skill matching (verifies named technologies actually appear in the source job description before claiming a match), STAR-format bullet rewriting, fit score, ATS score, and cover letter generation. Hallucination prevention is layered throughout: deterministic gatekeeping (skills/salary/years-of-exp) happens before the LLM ever runs, and fail-safe defaults (e.g., a null fit score) kick in if Ollama is offline rather than guessing. Runs resume generation, cover-letter writing, and scoring concurrently via a thread pool, and prioritizes which jobs to process first using a "golden window" heuristic (a company's local business hours) plus posting freshness.

**LifeOS** (React, AWS SAM, Lambda, API Gateway, DynamoDB, Cognito, Claude API) — a personal life-tracking progressive web app on a serverless AWS backend, covering health, sleep, expense, task, and journal tracking — including voice journaling via the Web Speech API with Claude-based habit extraction, and AI-prioritized task management — integrated with the Claude API for AI-assisted insights. Security- and discipline-first by design: per-user data ownership is enforced via Cognito JWT (never trusted from the request body), with cross-user isolation tested on every iteration. The AI is deliberately narrowly scoped — a deterministic guardrail calculates deadline-fit itself before ever calling Claude, and manual input always wins over an AI suggestion rather than being silently overwritten. Built across 10+ iterations, from initial SAM/Cognito infrastructure through CRUD, voice input, AI-assisted prioritization, and PWA packaging.

**Portfolio Assistant Chatbot (PJ)** — that's this very chatbot. A three-layer routing system: an instant client-side FAQ layer for predictable questions, Claude Haiku for reasoning on anything else, and a tool-execution layer split between server-side lookups (like this knowledge base) and client-side browser actions (scrolling the page, downloading the resume). Built to demonstrate real agent/LLM integration rather than a simple wrapped chat API.

**Ransomware Detection System** (October 2024, Python / Machine Learning) — an end-to-end ML pipeline classifying malicious vs. benign system activity from behavioral and system-level features. Performed exploratory data analysis, feature engineering, and statistical analysis to improve class separability, then evaluated multiple classification models to select the best-performing one for deployment — achieving 90% detection accuracy and reducing false positives by 20%. Behavioral classification (not signature-matching) means it can catch novel ransomware variants that traditional antivirus tools miss.

**This portfolio website** — a static React + Vite + Tailwind CSS site, deployed on S3 behind CloudFront, with a serverless contact form (Web3Forms, with a honeypot spam filter) and a CloudWatch dashboard combining CloudFront's built-in infra metrics with a custom Lambda-published metric for contact-form success/failure. It's a real, deployed piece of her engineering work, not just a container for her resume.

## Skills (full list, by category)
**Backend & Cloud:** Java, Python, C++, Node.js, AWS (EC2, S3, Lambda, DynamoDB, CloudFront, IAM, SAM, CDK, CloudWatch, SQS, SNS, ECS), Serverless Framework, CloudFormation, System Design, RESTful API Design, SQL (MySQL), PostgreSQL, Flask, Django, FastAPI, Spring Boot, PyJWT, Docker.
**AI & LLM Integration:** Claude API / Anthropic API, Prompt Engineering, LLM Integration, Ollama (local LLMs), RAG (Retrieval-Augmented Generation), Pydantic (structured LLM output validation).
**Frontend:** React, JavaScript, HTML/CSS, TypeScript, Material UI, Tailwind CSS, React Three Fiber, Three.js.
**Data & Machine Learning:** Pandas, NumPy, Scikit-Learn, Matplotlib.
**Engineering Tools:** Git, CI/CD, pytest, Lucidchart.
**Design Tools:** Figma, Adobe Illustrator, Affinity.

## Certifications
- IBM RAG and Agentic AI — IBM (via Coursera)
- Software Design and Architecture — University of Alberta (via Coursera)
- Generative AI for Software Developers — IBM (via Coursera)
- AWS Cloud Practitioner Essentials — Amazon Web Services (via Coursera)
- AWS Cloud Technical Essentials — Amazon Web Services (via Coursera)
- High Performance Collaboration: Leadership, Teamwork, and Negotiation — Northwestern University (via Coursera)
- Leading Teams: Developing as a Leader — University of Illinois Urbana-Champaign (via Coursera)
- Google Data Analytics — Google (via Coursera)
- Python for Everybody — University of Michigan (via Coursera)

## Contact
Email: kmpragya052000@gmail.com. LinkedIn: linkedin.com/in/pragya58. GitHub: github.com/pragya0905. Based in India. Open to full-stack and cloud engineering opportunities.
`;
