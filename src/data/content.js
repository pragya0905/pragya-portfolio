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
    "I resolved 5.5M inventory discrepancies via optimized APIs.",
    2000,
    "I built the end-to-end digital experience for Aurique Life.",
    2000,
  ],
  photoUrl: "/profile-photo.png",
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
    role: "Founding Engineer",
    badge: "Founding Engineer",
    company: "Aurique Life",
    logoInitials: "AL",
    logoUrl: null,
    location: "Remote",
    dates: "June 2025 — Present",
    achievements: [
      {
        description:
          "Developed a cloud-native e-commerce platform using React.js and Python/Flask, backed by optimized RESTful APIs.",
        metric: { value: "30%", label: "faster transaction processing" },
      },
      {
        description:
          "Built 30+ responsive web components using Figma and Adobe Illustrator, sharpening the mobile experience.",
        metric: { value: "20%", label: "improvement in mobile engagement" },
      },
    ],
    techStack: ["React.js", "Python", "Flask", "AWS", "Figma"],
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
          "Architected backend services and APIs in Java and AWS to streamline FCSKU-level inventory removals across 100+ fulfillment centers, cutting return mismatches by 95%.",
        metric: { value: "$5.5M", label: "annual fraud reduction" },
      },
      {
        description:
          "Redesigned complex SQL queries and implemented distributed caching to reduce database load and improve API latency by 30%.",
        metric: { value: "40-60%", label: "reduction in database load" },
      },
      {
        description:
          "Led rigorous design reviews and PRC (peer review committee) to harden service reliability and speed up release cycles by 20%.",
        metric: { value: "25%", label: "boost in service reliability" },
      },
      {
        description:
          "Resolved critical production failures and edge-case service crashes, improving overall system stability.",
        metric: { value: "~5%", label: "fatal error rate after fixes" },
      },
    ],
    techStack: ["Java", "AWS", "SQL", "Distributed Caching"],
  },
  {
    type: "work",
    role: "Data Analyst Intern",
    company: "DivineAI",
    logoInitials: "DA",
    logoUrl: null,
    location: "Bhubaneswar, India",
    dates: "May 2022 — April 2023",
    summary:
      "Built an interactive BI dashboard on AWS with a Python/Django backend, improving operational visibility by 30%.",
  },
  {
    type: "work",
    role: "Web Development Intern",
    company: "HighRadius",
    logoInitials: "HR",
    logoUrl: null,
    location: "Remote",
    dates: "January 2022 — April 2022",
    summary:
      "Built a full-stack AI invoice management system in React.js and Java Servlets, processing 50,000+ invoices at 98% data accuracy.",
  },
  {
    type: "work",
    role: "Software Development Intern",
    company: "Stige",
    logoInitials: "S",
    logoUrl: null,
    location: "Remote",
    dates: "September 2021 — December 2021",
    summary:
      "Developed and optimized RESTful APIs in Node.js, reducing data retrieval latency by 30%.",
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
    title: "Ransomware Detection System",
    context: "Machine Learning Project",
    description:
      "Built an ML pipeline classifying malicious vs. benign system activity, with feature engineering and statistical analysis to improve model separability.",
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
      "AWS (EC2, S3, Lambda, DynamoDB, CloudFront, IAM, SAM, CloudWatch)",
      "System Design",
      "RESTful API Design",
      "SQL (MySQL)",
      "PostgreSQL",
      "Flask",
      "Django",
      "Spring Boot",
      "Docker",
    ],
  },
  {
    category: "AI & LLM Integration",
    items: ["Claude API / Anthropic API", "Prompt Engineering", "LLM Integration"],
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
    items: ["Git", "Lucidchart"],
  },
  {
    category: "Design Tools",
    items: ["Figma", "Adobe Illustrator", "Affinity"],
  },
];
