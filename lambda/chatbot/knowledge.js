// Comprehensive factual knowledge base for the chatbot's system prompt —
// everything real and current about Pragya, loaded into every conversation
// so most questions can be answered without a tool call. Sourced directly
// from public/resume/Pragya_Kumari_Resume.pdf and src/data/content.js (the
// site's own single source of truth) — nothing here is invented.
//
// Keep this file and the two source-of-truth files in sync manually: this
// Lambda is a standalone zip deploy with no shared build step with the
// resume PDF or the Vite app's src/data/content.js.
export const KNOWLEDGE_BASE = `
## Work history (full detail)

**Founding Engineer, Aurique Life** (June 2025 — Present, Remote)
- Architecting a cloud-hosted D2C e-commerce platform end to end: React frontend, Python/Flask backend, RESTful API design, authentication flows, and secure payment integration on AWS.
- Owns the full technical execution alone — frontend architecture, API design, cloud infrastructure, and UI/UX design (Figma, Adobe Illustrator) — not just one slice of the system.
- Cut transaction processing time by 30% and built 30+ responsive web components, improving mobile engagement by 20%.
- This is a very early-stage startup (the resume lists it as "E-commerce Wellness Startup (Stealth Mode)" from when it hadn't been publicly named yet) — it's now publicly known as Aurique Life.

**Software Development Engineer, Amazon** (January 2024 — May 2025, Hyderabad, India)
- Led backend implementation of FCSKU-level provenance-aware inventory removals across 100+ fulfillment centers, reducing inventory fraud by 5.5M removals annually and cutting return mismatches by 95%.
- Optimized high-TPS backend APIs by redesigning database queries and introducing request-level caching — reduced database load by 40-60% and improved API latency by 30%.
- Improved service reliability and delivery speed by driving design reviews, production readiness checks, and cross-team validations — resulted in 25% higher reliability and 20% faster release cycles.
- Resolved critical production failures and edge-case service crashes, reducing fatal error rates to roughly 5% and improving overall system stability.

**Data Analyst Intern, DivineAI** (Bhubaneswar, India, May 2022 — December 2022)
- Developed and deployed a data analytics dashboard using Django and Power BI on AWS, enabling real-time business monitoring.
- Enabled data-driven decision-making through data cleaning, visualization, and statistical analysis using Python (Pandas, NumPy, Matplotlib) to produce actionable business insights.

**Web Development Intern, HighRadius** (Remote, February 2022 — April 2022)
- Built a full-stack AI-enabled B2B FinTech invoice management application (React.js, Java Servlets, MySQL) managing 50,000+ real-world invoice records, with full CRUD functionality, an advanced search engine, and analytical dashboards (charts and graphs).
- Performed EDA and feature engineering on payment history and customer behavior indicators to uncover payment-delay patterns, then evaluated 5 regression models (XGBoost, Decision Tree, LightGBM, Gradient Boosting, Random Forest) to predict invoice clear/payment dates and categorize aging buckets for better cash-flow forecasting. Random Forest was the best performer, with roughly a 75% validation score.

**Software Development Intern, Stige** (Remote, September 2021 — December 2021)
- Engineered scalable full-stack web solutions using React.js and Node.js, optimizing RESTful APIs for faster data retrieval and seamless UI integration.

## Education
**Bachelor of Technology, Computer Science** — Kalinga Institute of Industrial Technology (KIIT), Bhubaneswar, India. July 2019 — May 2023. CGPA: 8.77/10.0. Relevant coursework: Data Structures & Algorithms, DBMS, Operating Systems, Machine Learning.

## Projects (full detail)

**Aurique Life platform** — see the Founding Engineer role above; this is her current, primary project. Full-stack ownership of a D2C e-commerce platform from scratch: React frontend, Flask backend, AWS infra, RESTful APIs, auth, payments, and the visual/UX design work.

**Ransomware Detection System** (October 2024, Python / Machine Learning) — a machine-learning pipeline classifying malicious vs. benign behavior from system activity features, built with Python and scikit-learn. Feature engineering and statistical analysis improved model separability, achieving 90% detection accuracy and reducing false positives by 20%. Behavioral classification (not signature-matching) means it can catch novel ransomware variants that traditional antivirus tools miss.

**This portfolio website** — a static React + Vite + Tailwind CSS site, deployed on S3 behind CloudFront, with a serverless contact form (Web3Forms, with a honeypot spam filter) and a CloudWatch dashboard combining CloudFront's built-in infra metrics with a custom Lambda-published metric for contact-form success/failure. It's a real, deployed piece of her engineering work, not just a container for her resume.

**This chatbot** — the newest addition to the site. A small agent, not a wrapped LLM call: a free instant pattern-matching layer catches predictable questions before any API call happens; anything else falls through to Claude, which has this knowledge base loaded and a set of tools — some resolved entirely on the backend, others (like scrolling the page or downloading the resume) handed back to the browser to execute.

## Skills (full list, by category)
**Backend & Cloud:** Java, Python, C++, Node.js, AWS (EC2, S3, Lambda, DynamoDB, CloudFront, IAM, SAM, CloudWatch), System Design, RESTful API Design, SQL (MySQL), PostgreSQL, Flask, Django, Spring Boot, Docker.
**AI & LLM Integration:** Claude API / Anthropic API, Prompt Engineering, LLM Integration.
**Frontend:** React, JavaScript, HTML/CSS, TypeScript, Material UI, Tailwind CSS.
**Data & Machine Learning:** Pandas, NumPy, Scikit-Learn, Matplotlib.
**Engineering Tools:** Git, Lucidchart.
**Design Tools:** Figma, Adobe Illustrator, Affinity.

## Certifications
- Generative AI for Software Developers — IBM (via Coursera)
- AWS Cloud Practitioner Essentials — Amazon Web Services (via Coursera)
- AWS Cloud Technical Essentials — Amazon Web Services (via Coursera)
- High Performance Collaboration: Leadership, Teamwork, and Negotiation — Northwestern University (via Coursera)
- Leading Teams: Developing as a Leader — University of Illinois Urbana-Champaign (via Coursera)
- Google Data Analytics — Google (via Coursera)
- Python for Everybody — University of Michigan (via Coursera)

## Contact
Email: kmpragya052000@gmail.com. LinkedIn: linkedin.com/in/pragya58. GitHub: github.com/pragya0905. Based in Hyderabad, India. Open to full-stack and cloud engineering opportunities.
`;
