export const PROFILE = {
  name: "Pragya Kumari",
  title: "Software Development Engineer | Full Stack & Cloud",
  location: "Hyderabad, India",
  tagline:
    "I build cloud-native platforms and Amazon-scale backend systems — from RESTful APIs that cut fraud by millions to founding the engineering of a D2C e-commerce platform from scratch.",
  // Drives the Hero's typing animation. `tagline` above remains the
  // accessible fallback read by screen readers.
  taglineSequence: [
    "I build cloud-native platforms.",
    2000,
    "I architect Amazon-scale backend systems.",
    2000,
    "I prevented $5.5M in annual fraud at Amazon",
    2000,
    "I built the end-to-end digital experience for Aurique Life.",
    2000,
  ],
  photoUrl: "/profile-photo.webp",
  initials: "PK",
};

export const SOCIAL_LINKS = {
  email: "kmpragya052000@gmail.com",
  linkedin: "https://www.linkedin.com/in/pragya58/",
  github: "https://github.com/pragya0905",
  resumeUrl: "/resume/Pragya_Kumari_Resume.pdf",
};

export const WEB3FORMS_ACCESS_KEY = "d5a29e46-7043-4f58-b648-81e401cdd61e";

// Publishes a CloudWatch custom metric (Portfolio/ContactForm) so contact-form
// health shows up on the infra dashboard alongside CloudFront's own metrics.
export const CONTACT_METRIC_URL = "https://sqhjzyzhw2.execute-api.ap-southeast-2.amazonaws.com/";

// Backs the chat widget (see src/hooks/useChat.js) — same API Gateway as
// CONTACT_METRIC_URL, on its own explicit /chat route.
export const CHATBOT_API_URL = "https://sqhjzyzhw2.execute-api.ap-southeast-2.amazonaws.com/chat";

export const NAV_LINKS = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export const CERTIFICATIONS = [
  {
    name: "IBM RAG and Agentic AI",
    issuer: "IBM · Coursera",
    date: "",
    url: "",
  },
  {
    name: "Software Design and Architecture",
    issuer: "University of Alberta · Coursera",
    date: "",
    url: "",
  },
  {
    name: "Generative AI for Software Developers",
    issuer: "IBM · Coursera",
    date: "",
    url: "https://coursera.org/share/7376845131fe6ff44ea95c3309a22d35",
  },
  {
    name: "AWS Cloud Practitioner Essentials",
    issuer: "Amazon Web Services · Coursera",
    date: "",
    url: "https://coursera.org/share/d04acb564b5a21440683968567c2fc1f",
  },
  {
    name: "AWS Cloud Technical Essentials",
    issuer: "Amazon Web Services · Coursera",
    date: "",
    url: "https://coursera.org/share/81a5583d385f8b30ee41590580be394e",
  },
  {
    name: "High Performance Collaboration: Leadership, Teamwork, and Negotiation",
    issuer: "Northwestern University · Coursera",
    date: "",
    url: "https://coursera.org/share/fb9a1a5ad9d7378c5d60fb5db3495a64",
  },
  {
    name: "Leading Teams: Developing as a Leader",
    issuer: "University of Illinois Urbana-Champaign · Coursera",
    date: "",
    url: "https://coursera.org/share/058fda3098bb6cbc01365d03424683ad",
  },
  {
    name: "Google Data Analytics",
    issuer: "Google · Coursera",
    date: "",
    url: "https://coursera.org/share/7c0b480f066dcf51033a60eb59100b7c",
  },
  {
    name: "Python for Everybody",
    issuer: "University of Michigan · Coursera",
    date: "",
    url: "https://coursera.org/share/d16d543a3446ec00cfb453b8a41718d4",
  },
];

// Each entry is a node on the Experience timeline. `logoUrl` is a stub —
// drop a real logo into public/logos/ and set the URL to replace the
// initials placeholder, same pattern as PROFILE.photoUrl.
export const EXPERIENCE = [
  {
    type: "work",
    role: "Founder & Software Engineer",
    badge: "Founder",
    company: "Aurique Life",
    logoInitials: "AL",
    logoUrl: null,
    location: "Remote",
    dates: "June 2025 — Present",
    achievements: [
      {
        description:
          "Founded a digital wellness brand — single-handedly architected and launched a scalable e-commerce platform, building the complete backend in Python (Flask) and AWS (DynamoDB, SQS, SNS, CloudWatch) to handle order state management, secure OTP authentication, and real-time metric tracking.",
        metric: { value: "$5K", label: "ARR, +25% MoM growth" },
      },
      {
        description:
          "Engineered a high-performance, responsive frontend in React and TypeScript, leveraging GSAP and Framer Motion for an immersive, scroll-driven storytelling UI.",
        metric: { value: "30%", label: "boost in brand engagement" },
      },
      {
        description:
          "Led end-to-end digital branding and technical SEO, integrating automated marketing workflows and a cohesive, minimalist design system across the platform.",
        metric: { value: "Unified", label: "branding, SEO & marketing automation" },
      },
    ],
    techStack: ["React", "TypeScript", "Python", "Flask", "AWS", "DynamoDB", "SQS", "SNS", "CloudWatch", "GSAP", "Framer Motion"],
  },
  {
    type: "work",
    role: "Software Development Engineer",
    badge: "SDE",
    company: "Amazon",
    logoInitials: "A",
    logoUrl: null,
    location: "Hyderabad",
    dates: "January 2024 — May 2025",
    achievements: [
      {
        description:
          "Architected a provenance-aware inventory removal system eliminating counterfeit-swap fraud on FBA orders across 100+ fulfillment centers (Java, Spring Boot, AWS), cutting return mismatches by 95%.",
        metric: { value: "$5.5M", label: "annual fraud reduction" },
      },
      {
        description:
          "Re-architected a legacy EC2 polling service into an event-driven, serverless pipeline (Java, AWS CDK/TypeScript), migrating deprecated APIs and establishing robust failure-path routing.",
        metric: { value: "Serverless", label: "event-driven EC2 migration" },
      },
      {
        description:
          "Designed and deployed a real-time observability pipeline for Live Site services — a Python worker on AWS ECS Fargate polling and filtering error logs into DynamoDB, visualized through a React/TypeScript dashboard for faster root-cause triage.",
        metric: { value: "90% → 5%", label: "fatal error rate, Live Site services" },
      },
      {
        description:
          "Led code and design reviews across projects, improving code quality and collaborating with cross-functional teams.",
        metric: { value: "25%", label: "reduction in critical errors" },
      },
    ],
    techStack: [
      "Java",
      "Python",
      "TypeScript",
      "React.js",
      "Spring Boot",
      "SQL",
      "AWS Lambda",
      "ECS Fargate",
      "DynamoDB",
      "SQS",
      "SNS",
      "S3",
      "RDS",
      "AWS CDK",
      "CloudWatch",
    ],
  },
  {
    type: "work",
    role: "Data Analyst Intern",
    company: "DivineAI",
    logoInitials: "DA",
    logoUrl: null,
    location: "Bhubaneswar, India",
    dates: "June 2022 — September 2022",
    achievements: [
      {
        description:
          "Developed and deployed an interactive data analytics dashboard using Django and Power BI on AWS, enabling real-time business monitoring. Performed data cleaning, visualization, and statistical analysis using Python (Pandas, NumPy, Matplotlib) to support data-driven decision-making and surface actionable business insights.",
        metric: { value: "30%", label: "improvement in operational visibility" },
      },
    ],
    techStack: ["Python", "Django", "Power BI", "AWS", "Pandas", "NumPy", "Matplotlib"],
  },
  {
    type: "work",
    role: "Web Development Intern",
    company: "HighRadius",
    logoInitials: "HR",
    logoUrl: null,
    location: "Remote",
    dates: "January 2022 — April 2022",
    achievements: [
      {
        description:
          "Built a full-stack AI-enabled B2B FinTech invoice management application (React.js, Java Servlets, MySQL) with full CRUD functionality, an advanced search engine, and analytical dashboards (charts, graphs).",
        metric: { value: "50,000+", label: "invoice records managed" },
      },
      {
        description:
          "Performed EDA and feature engineering on payment history and customer behavior indicators, then evaluated 5 regression models (XGBoost, Decision Tree, LightGBM, Gradient Boosting, Random Forest) to predict invoice clear/payment dates and aging buckets for cash-flow forecasting — Random Forest was the best performer.",
        metric: { value: "75%", label: "Random Forest validation score" },
      },
    ],
    techStack: ["React.js", "Java Servlets", "MySQL", "Python", "Scikit-learn"],
  },
  {
    type: "education",
    role: "B.Tech, Computer Science & Engineering",
    company: "Kalinga Institute of Industrial Technology (KIIT)",
    logoInitials: "KIIT",
    logoUrl: null,
    location: "CGPA 8.77",
    dates: "July 2019 — May 2023",
    summary:
      "Coursework: Data Structures & Algorithms, DBMS, Operating Systems, Machine Learning.",
  },
];

export const PROJECTS = [
  {
    title: "JobPilot",
    context: "AI Job-Search Tool",
    description:
      "Architected a local-first job-search pipeline running entirely on-device via Ollama — sourcing, scoring, and tailoring resumes across 6+ job sources at zero cloud cost, with structured LLM output validation and fabrication guardrails.",
    metrics: [
      { value: "6+", label: "job sources integrated" },
      { value: "$0", label: "cloud cost — fully on-device" },
    ],
    tags: ["Python", "FastAPI", "SQLite", "Ollama", "Pydantic", "WeasyPrint"],
    links: { github: null, demo: null },
  },
  {
    title: "LifeOS",
    context: "Personal Life-Tracking PWA",
    description:
      "Built a personal life-tracking progressive web app on a serverless AWS backend with a React frontend, covering health, sleep, expense, task, and journal tracking — including AI-prioritized task management — integrated with the Claude API for AI-assisted insights.",
    metrics: [{ value: "5", label: "tracked domains: health, sleep, expenses, tasks, journal" }],
    tags: ["React", "AWS SAM", "Lambda", "API Gateway", "DynamoDB", "Claude API"],
    links: { github: null, demo: null },
  },
  {
    title: "Portfolio Assistant Chatbot (PJ)",
    context: "AI Portfolio Agent",
    description:
      "Architected the live AI agent embedded on this site — a three-layer routing system with an instant client-side FAQ layer, Claude Haiku for reasoning, and a tool-execution layer split between server-side lookups and client-side browser actions — autonomously handling recruiter queries rather than just wrapping a chat API.",
    metrics: [{ value: "3", label: "routing layers: FAQ, LLM, tool execution" }],
    tags: ["React", "AWS Lambda", "API Gateway", "CloudFront", "Claude API"],
    links: { github: null, demo: null },
  },
  {
    title: "Ransomware Detection System",
    context: "Machine Learning Project",
    description:
      "Built an end-to-end ML pipeline classifying malicious vs. benign system activity from behavioral and system-level features, performing exploratory data analysis, feature engineering, and statistical analysis to improve class separability, then evaluated multiple classification models to select the best-performing one for deployment.",
    metrics: [
      { value: "90%", label: "detection accuracy" },
      { value: "20%", label: "fewer false positives" },
    ],
    tags: ["Python", "scikit-learn", "Machine Learning", "Data Analysis"],
    links: { github: null, demo: null },
  },
];

export const SKILLS = [
  {
    category: "Backend & Cloud",
    items: [
      "Java",
      "Python",
      "C++",
      "Node.js",
      "AWS (EC2, S3, Lambda, DynamoDB, CloudFront, IAM, SAM, CDK, CloudWatch, SQS, SNS, ECS)",
      "System Design",
      "RESTful API Design",
      "SQL (MySQL)",
      "PostgreSQL",
      "Flask",
      "FastAPI",
      "Django",
      "Spring Boot",
      "Docker",
    ],
  },
  {
    category: "AI & LLM Integration",
    items: [
      "Claude API / Anthropic API",
      "Prompt Engineering",
      "LLM Integration",
      "Ollama (Local LLMs)",
      "RAG (Retrieval-Augmented Generation)",
      "Pydantic",
    ],
  },
  {
    category: "Frontend",
    items: ["React", "JavaScript", "HTML/CSS", "TypeScript", "Material UI", "Tailwind CSS"],
  },
  {
    category: "Data & Machine Learning",
    items: ["Pandas", "NumPy", "Scikit-Learn", "Matplotlib"],
  },
  {
    category: "Engineering Tools",
    items: ["Git", "CI/CD", "Lucidchart"],
  },
  {
    category: "Design Tools",
    items: ["Figma", "Adobe Illustrator", "Affinity"],
  },
];
