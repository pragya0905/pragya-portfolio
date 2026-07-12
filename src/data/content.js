export const PROFILE = {
  name: "Pragya Kumari",
  title: "Full-Stack & Cloud Engineer",
  location: "Hyderabad, India",
  tagline:
    "I build cloud-native platforms and Amazon-scale backend systems — from RESTful APIs that cut fraud by millions to founding the engineering of a D2C e-commerce platform from scratch.",
};

// TODO: add your GitHub profile URL once ready — the Navbar and Footer
// automatically render the GitHub link the moment this is non-null.
// TODO: drop your resume PDF into public/resume/ and set resumeUrl,
// e.g. "/resume/Pragya_Kumari_Resume.pdf" — the Navbar CTA switches to
// "Resume" automatically once this is set.
export const SOCIAL_LINKS = {
  email: "kmpragya052000@gmail.com",
  linkedin: "https://www.linkedin.com/in/pragya--jaiswal/",
  github: null,
  resumeUrl: null,
};

export const NAV_LINKS = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const EXPERIENCE = {
  featured: [
    {
      role: "Founding Engineer",
      badge: "Founding Engineer",
      company: "Aurique Life",
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
      role: "Software Development Engineer",
      badge: "SDE",
      company: "Amazon",
      location: "Hyderabad",
      dates: "January 2024 — May 2025",
      achievements: [
        {
          description:
            "Architected backend services and APIs in Java and AWS to streamline FCSKU-level inventory removals across 100+ fulfillment centers.",
          metric: { value: "$5.5M", label: "annual fraud reduction" },
        },
        {
          description:
            "Redesigned complex SQL queries and implemented distributed caching to reduce database load and improve latency.",
          metric: { value: "40-60%", label: "reduction in database load" },
        },
        {
          description:
            "Led rigorous design reviews and PRC (peer review committee) to harden service reliability.",
          metric: { value: "25%", label: "boost in service reliability" },
        },
      ],
      techStack: ["Java", "AWS", "SQL", "Distributed Caching"],
    },
  ],
  timeline: [
    {
      type: "work",
      role: "Data Analyst Intern",
      company: "DivineAI",
      location: "Bhubaneswar, India",
      dates: "May 2022 — April 2023",
      summary:
        "Built an interactive BI dashboard on AWS with a Python/Django backend, improving operational visibility by 30%.",
    },
    {
      type: "work",
      role: "Web Development Intern",
      company: "HighRadius",
      location: "Remote",
      dates: "January 2022 — April 2022",
      summary:
        "Built a full-stack AI invoice management system in React.js and Java Servlets, processing 50,000+ invoices at 98% data accuracy.",
    },
    {
      type: "work",
      role: "Software Development Intern",
      company: "Stige",
      location: "Remote",
      dates: "September 2021 — December 2021",
      summary:
        "Developed and optimized RESTful APIs in Node.js, reducing data retrieval latency by 30%.",
    },
    {
      type: "education",
      role: "B.Tech, Computer Science & Engineering",
      company: "Kalinga Institute of Industrial Technology (KIIT)",
      location: "CGPA 8.77",
      dates: "July 2019 — May 2023",
      summary:
        "Coursework: Data Structures & Algorithms, DBMS, Operating Systems, Machine Learning.",
    },
  ],
};

export const PROJECTS = [
  {
    title: "Cloud-Native D2C E-Commerce Platform",
    context: "Founding Project — Aurique Life",
    description:
      "Built a cloud-native direct-to-consumer e-commerce platform from scratch, with optimized RESTful APIs and 30+ responsive UI components.",
    metrics: [
      { value: "30%", label: "faster transactions" },
      { value: "20%", label: "mobile engagement" },
    ],
    tags: ["React.js", "Python", "Flask", "AWS"],
    links: { github: null, demo: null },
  },
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
  {
    title: "AI-Powered Invoice Management System",
    context: "Built at HighRadius",
    description:
      "Full-stack invoice management system with API integrations, processing tens of thousands of invoices with high data accuracy.",
    metrics: [
      { value: "50K+", label: "invoices processed" },
      { value: "98%", label: "data accuracy" },
    ],
    tags: ["React.js", "Java Servlets"],
    links: { github: null, demo: null },
  },
  {
    title: "Business Intelligence Dashboard",
    context: "Built at DivineAI",
    description:
      "Interactive BI dashboard on AWS delivering data-driven insights that improved operational visibility for the business.",
    metrics: [{ value: "30%", label: "operational visibility gain" }],
    tags: ["Python", "Django", "AWS"],
    links: { github: null, demo: null },
  },
];

export const SKILLS = [
  {
    category: "Languages",
    items: ["Java", "Python", "JavaScript", "SQL (MySQL)", "C++", "HTML/CSS"],
  },
  {
    category: "Web & Cloud",
    items: [
      "React.js",
      "Node.js",
      "Flask",
      "Django",
      "AWS (EC2, S3, Lambda)",
      "Material UI",
    ],
  },
  {
    category: "Data & Tools",
    items: [
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Scikit-Learn",
      "Git",
      "Figma",
      "Adobe Illustrator",
    ],
  },
];
