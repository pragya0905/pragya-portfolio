import { CASE_STUDIES } from "./context.js";

// section enum mirrors src/data/content.js's NAV_LINKS anchors exactly —
// keep the two in sync if the site's nav ever changes.
export const TOOLS = [
  {
    name: "get_project_case_study",
    description:
      "Fetch a deeper, more detailed write-up on a specific topic about Pragya's background than the base summary contains. Use this whenever a visitor asks something that needs real depth — e.g. why she left a role, how a specific piece of infra works, or a fuller story behind a project — rather than guessing from the summary alone.",
    input_schema: {
      type: "object",
      properties: {
        topic: {
          type: "string",
          enum: Object.keys(CASE_STUDIES),
          description:
            "Which case study to fetch. amazon-to-aurique: her move from Amazon to Aurique Life and why. cloudwatch-dashboard: how this site's observability/CloudWatch setup works. contact-form-architecture: how the contact form and its spam filtering work. ransomware-detection-system: the featured ML project. this-chatbot: how this chat widget itself is architected.",
        },
      },
      required: ["topic"],
    },
  },
  {
    name: "scroll_to_section",
    description:
      "Scroll the visitor's browser to a specific section of the portfolio site. Use this when a visitor asks to see something (projects, experience, skills, certifications) or when showing them is more useful than describing it in text.",
    input_schema: {
      type: "object",
      properties: {
        section: {
          type: "string",
          enum: ["experience", "projects", "skills", "certifications", "contact"],
          description: "The section id to scroll to, matching the site's nav anchors.",
        },
      },
      required: ["section"],
    },
  },
  {
    name: "download_resume",
    description:
      "Trigger a download of Pragya's resume PDF in the visitor's browser. Use this whenever a visitor asks for her resume, CV, or asks how to get one.",
    input_schema: { type: "object", properties: {} },
  },
];

// Tools in this set are executed by the browser, not this Lambda — the
// handler returns them to the frontend instead of resolving them itself.
export const CLIENT_TOOL_NAMES = new Set(["scroll_to_section", "download_resume"]);

export function runServerTool(name, input) {
  if (name === "get_project_case_study") {
    const study = CASE_STUDIES[input?.topic];
    return study || `No case study found for "${input?.topic}".`;
  }
  throw new Error(`Unknown server tool: ${name}`);
}
