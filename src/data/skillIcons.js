import { Brain, ChartSpline, MessageSquare, Network, PenTool, Webhook, Workflow } from "lucide-react";
import { FaAws } from "react-icons/fa";
import { DiJava, DiIllustrator } from "react-icons/di";
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiMysql,
  SiPostgresql,
  SiCplusplus,
  SiReact,
  SiHtml5,
  SiNodedotjs,
  SiFlask,
  SiDjango,
  SiSpringboot,
  SiDocker,
  SiMui,
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiGit,
  SiFigma,
  SiLucid,
  SiTailwindcss,
  SiClaude,
  SiOllama,
} from "react-icons/si";

// Matplotlib has no maintained brand mark across icon sets, so it falls
// back to a generic chart glyph. Affinity (Serif's design suite) has no
// brand mark in any icon set either, so it falls back to a generic pen
// tool glyph rather than a misleading logo.
// Colors are each tool's real brand color (lightened where the official
// shade is too dark to read against a near-black background).
export const SKILL_ICONS = {
  Java: { icon: DiJava, color: "#f89820" },
  Python: { icon: SiPython, color: "#3776ab" },
  JavaScript: { icon: SiJavascript, color: "#f7df1e" },
  TypeScript: { icon: SiTypescript, color: "#3178c6" },
  "SQL (MySQL)": { icon: SiMysql, color: "#4479a1" },
  PostgreSQL: { icon: SiPostgresql, color: "#4169e1" },
  "C++": { icon: SiCplusplus, color: "#00599c" },
  React: { icon: SiReact, color: "#61dafb" },
  "HTML/CSS": { icon: SiHtml5, color: "#e34f26" },
  "Node.js": { icon: SiNodedotjs, color: "#339933" },
  Flask: { icon: SiFlask, color: "#e5e7eb" },
  Django: { icon: SiDjango, color: "#44b78b" },
  "Spring Boot": { icon: SiSpringboot, color: "#6db33f" },
  Docker: { icon: SiDocker, color: "#2496ed" },
  "System Design": { icon: Network, color: "#22d3ee" },
  "RESTful API Design": { icon: Webhook, color: "#22d3ee" },
  "Claude API / Anthropic API": { icon: SiClaude, color: "#d97757" },
  "Prompt Engineering": { icon: MessageSquare, color: "#22d3ee" },
  "LLM Integration": { icon: Brain, color: "#22d3ee" },
  "Ollama (Local LLMs)": { icon: SiOllama, color: "#e5e7eb" },
  "AWS (EC2, S3, Lambda, DynamoDB, CloudFront, IAM, SAM, CDK, CloudWatch, SQS, SNS, ECS)": {
    icon: FaAws,
    color: "#ff9900",
  },
  "Material UI": { icon: SiMui, color: "#007fff" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#38bdf8" },
  Pandas: { icon: SiPandas, color: "#8c5cf5" },
  NumPy: { icon: SiNumpy, color: "#4dabcf" },
  Matplotlib: { icon: ChartSpline, color: "#22d3ee" },
  "Scikit-Learn": { icon: SiScikitlearn, color: "#f7931e" },
  Git: { icon: SiGit, color: "#f05032" },
  "CI/CD": { icon: Workflow, color: "#22d3ee" },
  Lucidchart: { icon: SiLucid, color: "#e4362d" },
  Figma: { icon: SiFigma, color: "#a259ff" },
  "Adobe Illustrator": { icon: DiIllustrator, color: "#ff9a00" },
  Affinity: { icon: PenTool, color: "#1b72be" },
};

// Full label stays the SKILL_ICONS lookup key and the tooltip text; only the
// on-card text is shortened, for entries too long to sit comfortably in the
// grid alongside every other single-word/short tile.
export const SKILL_SHORT_LABELS = {
  "AWS (EC2, S3, Lambda, DynamoDB, CloudFront, IAM, SAM, CDK, CloudWatch, SQS, SNS, ECS)": "AWS (12 services)",
};
