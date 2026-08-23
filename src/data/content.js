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
    name: "AWS Generative AI and AI Agents with Amazon Bedrock",
    issuer: "Amazon Web Services",
    date: "",
    url: "https://www.coursera.org/account/accomplishments/professional-cert/9KILEM7ZH3AS",
  },
  {
    name: "IBM RAG and Agentic AI",
    issuer: "IBM",
    date: "",
    url: "https://www.coursera.org/account/accomplishments/professional-cert/MQKMLPW968QK",
  },
  {
    name: "Building AI Agents and Agentic Workflows",
    issuer: "IBM",
    date: "",
    url: "https://www.coursera.org/account/accomplishments/specialization/KJ61RY0QQHIV",
  },
  {
    name: "RAG for Generative AI Applications",
    issuer: "IBM",
    date: "",
    url: "https://www.coursera.org/account/accomplishments/specialization/NO81RT3CU93Z",
  },
  {
    name: "Generative AI for Software Developers",
    issuer: "IBM",
    date: "",
    url: "https://www.coursera.org/account/accomplishments/specialization/4TT5DVFFXDAF",
  },
  {
    name: "AWS Cloud Technical Essentials",
    issuer: "Amazon Web Services",
    date: "",
    url: "https://www.coursera.org/account/accomplishments/verify/K5FUQCCYSKHE",
  },
  {
    name: "AWS Cloud Practitioner Essentials",
    issuer: "Amazon Web Services",
    date: "",
    url: "https://www.coursera.org/account/accomplishments/verify/MGTK9ZXYAJQB",
  },
  {
    name: "Google Agile Essentials",
    issuer: "Google",
    date: "",
    url: "https://www.coursera.org/account/accomplishments/specialization/MQJGHHA81H9Y",
  },
  {
    name: "Google Data Analytics",
    issuer: "Google",
    date: "",
    url: "https://www.coursera.org/account/accomplishments/professional-cert/LRZBKWUHNXF6",
  },
  {
    name: "Python for Everybody",
    issuer: "University of Michigan",
    date: "",
    url: "https://www.coursera.org/account/accomplishments/specialization/DDT3WJP0OU8H",
  },
  {
    name: "High Performance Collaboration: Leadership, Teamwork, and Negotiation",
    issuer: "Northwestern University",
    date: "",
    url: "https://www.coursera.org/account/accomplishments/verify/U64RDJT3ZB8P",
  },
  {
    name: "Leading Teams: Developing as a Leader",
    issuer: "University of Illinois Urbana-Champaign",
    date: "",
    url: "https://www.coursera.org/account/accomplishments/verify/MT4PVREAWXAJ",
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
      "Built an end-to-end job-search pipeline that discovers leads across 6+ job boards and Gmail, tailors a resume and cover letter per posting with a locally-hosted LLM, and auto-updates application status by classifying incoming rejection/interview/assessment emails — no manual tracking required. Every AI-generated resume is scored for ATS compatibility and role fit before a human ever sees it, and the whole thing runs on-device with zero inference cost.",
    metrics: [
      { value: "6+", label: "job sources integrated" },
      { value: "$0", label: "cloud cost — fully on-device" },
      { value: "Auto", label: "rejection/interview detection" },
    ],
    tags: [
      "Python",
      "Flask",
      "SQLAlchemy",
      "React",
      "TypeScript",
      "Vite",
      "Ollama",
      "Gmail API (OAuth2 + PKCE)",
      "AWS Lambda",
      "S3",
    ],
    links: { github: null, demo: "https://d4echnhz4b9y4.cloudfront.net/" },
  },
  {
    title: "LifeOS",
    context: "Personal Life-Tracking PWA",
    description:
      "Architected a serverless life-tracking PWA where one journal sentence — not a form — drives everything: Claude extracts structured data and fans it out across 11 tracked domains in parallel, with deterministic guardrails so the model is never trusted with arithmetic, and per-user data isolation enforced at the schema level, not application logic.",
    metrics: [
      { value: "11", label: "tracked life domains" },
      { value: "0", label: "cross-user data leaks — by design" },
      { value: "AI-forced", label: "priority — deadline math, not guesses" },
    ],
    tags: ["React", "AWS SAM", "Lambda", "API Gateway", "DynamoDB", "Cognito", "Claude API"],
    links: { github: null, demo: "https://d27z12rdh95fmx.cloudfront.net/" },
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
