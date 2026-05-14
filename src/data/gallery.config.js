// ============================================================
//  GALLERY METADATA CONFIG
//
//  HOW TO ADD A PHOTO:
//    1. Drop the image file into  src/assets/gallery/
//    2. Add an entry below with the exact filename as the key
//    3. Fill in event (occasion) and project (which experience/project)
//
//  category color options:
//    "text-yellow-400"  → hackathons / awards
//    "text-blue-400"    → internships / research
//    "text-emerald-400" → projects / labs
//    "text-purple-400"  → tech / dev work
//    "text-rose-400"    → community / clubs
//    "text-white"       → sports / personal
//    "text-gray-400"    → general / misc
//
//  Images without an entry here use GALLERY_FALLBACK below.
// ============================================================

export const GALLERY_META = {

  // --- ACTIVE ENTRIES (matched to files in src/assets/gallery/) ---

  "Build-2024_01.jpg": {
    event:    "BUILD-2024 Incubator Presentation",
    project:  "Tinkerers' Lab – Operations Coord",
    category: "text-purple-400",
  },

  "Echem_Mat_Lab_04.jpg": {
    event:    "Micro-Supercapacitor Device Fabrication",
    project:  "ElectroChem Research Internship (IITH)",
    category: "text-emerald-400",
  },

  "Inter-IIT.jpg": {
    event:    "Inter-IIT Tech Meet",
    project:  "IIT Hyderabad Contingent",
    category: "text-blue-400",
  },

  "Mitsubhishi Hacathon Prize money.jpg": {
    event:    "Cash Prize Ceremony",
    project:  "Mitsubishi 3D Tech Hackathon 2024",
    category: "text-yellow-400",
  },

  "SIH.jpg": {
    event:    "Smart India Hackathon",
    project:  "National-Level Hackathon",
    category: "text-yellow-400",
  },

  "TL.jpg": {
    event:    "Tinkerers' Lab Team Photo",
    project:  "Tinkerers' Lab – Operations Coord",
    category: "text-purple-400",
  },

  // --- TEMPLATE: add more photos below ---
  // "your-filename.jpg": {
  //   event:    "Occasion / what happened",
  //   project:  "Which internship / project / club",
  //   category: "text-yellow-400",   // see color guide at top of file
  // },
};

// Shown for any image not listed above
export const GALLERY_FALLBACK = {
  event:    "Portfolio Moment",
  project:  "RLV Journey",
  category: "text-gray-400",
};
