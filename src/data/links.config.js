// ============================================================
//  PORTFOLIO LINKS CONFIG
//  Single source of truth for every external URL.
//  Change a link here → it updates everywhere automatically.
// ============================================================

export const LINKS = {

  // ----------------------------------------------------------
  //  SOCIAL
  // ----------------------------------------------------------
  social: {
    github:   "https://github.com/rlv-iith",
    linkedin: "https://www.linkedin.com/in/ramuni-lalith-vishnu-4143ab299/",
    email:    "ic23btech11016@iith.ac.in",
  },

  // ----------------------------------------------------------
  //  RESUME  (host on Google Drive / GitHub / Cloudinary, paste URL)
  // ----------------------------------------------------------
  resume: null,   // e.g. "https://drive.google.com/file/d/XYZ/view"

  // ----------------------------------------------------------
  //  PROJECTS  (keyed by project id from projectData.jsx)
  // ----------------------------------------------------------
  projects: {
    "fintech-ai": {
      github: "https://github.com/rlv-iith",          // private — profile fallback
      demo:   null,
      note:   "Private repo",
    },
    "mitsubishi": {
      github: "https://github.com/rlv-iith/3d-point-cloud",
      demo:   null,
    },
    "ibm-agent": {
      github: "https://github.com/rlv-iith/ai-tutor",
      demo:   null,
    },
    "electrochem": {
      github: "https://github.com/rlv-iith",          // private — profile fallback
      demo:   null,
      note:   "Private repo",
    },
  },

  // ----------------------------------------------------------
  //  DEPLOYED SERVICES
  // ----------------------------------------------------------
  services: {
    frontend: "https://portfolio-server-4-kg3z.onrender.com",
    backend:  "https://portfolio-server-3-ohjk.onrender.com",
    aiBrain:  null,   // add when Phase 2 goes live
    mcp:      null,   // add when MCP server is deployed
  },
};
