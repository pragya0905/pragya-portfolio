import { FaAws } from "react-icons/fa";

// AWS has a real, accurate brand icon in react-icons — used directly.
// The rest are real official logos, self-hosted in public/logos/ (sourced
// from Wikimedia Commons, verified against each org's real mark before
// downloading — not hand-guessed), since no npm icon package carries IBM
// or any university logos. Northwestern's simple square "N" mark has no
// clean SVG on Commons (only wordmark/seal/athletics variants exist), so
// that one file is a hand-built monogram in Northwestern's real brand
// purple (#4E2A84) rather than a guess at a file that doesn't exist.
export const ISSUER_ICONS = {
  "Amazon Web Services": { type: "component", icon: FaAws, color: "#ff9900" },
  Google: { type: "image", src: "/logos/google.svg" },
  IBM: { type: "image", src: "/logos/ibm.svg" },
  "Northwestern University": { type: "image", src: "/logos/northwestern.svg" },
  "University of Illinois Urbana-Champaign": { type: "image", src: "/logos/illinois-block-i.png" },
  "University of Michigan": { type: "image", src: "/logos/michigan.svg" },
};
