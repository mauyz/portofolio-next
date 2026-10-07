/**
 * Période d'une expérience ou d'une formation.
 * `start` / `end` : année (« 2022 ») ou année-mois (« 2024-05 »).
 * Sans `end` et avec `current`, la période s'affiche « Depuis … ».
 */
export type Period = { start: string; end?: string; current?: boolean };

export type Experience = {
  /** Clé dans `career.experiences` (titre et puces). */
  id: "consulting" | "neoshore" | "androidFreelance" | "onnOlep" | "emaya";
  period: Period;
  company?: string;
  contract: "permanent" | "freelance" | "internship";
  location: string;
  stack: string[];
};

export type Education = {
  /** Clé dans `career.education` (diplôme et puces). */
  id: "master" | "licence" | "bac";
  period: Period;
  school: string;
  location: string;
};

export const experiences: Experience[] = [
  {
    id: "consulting",
    period: { start: "2024-05", current: true },
    contract: "freelance",
    location: "Madagascar",
    stack: [
      "Dart",
      "TypeScript",
      "Java",
      "Flutter",
      "Next.js",
      "Supabase",
      "PostgreSQL",
      "Edge Functions",
      "Jet Admin",
      "Firebase",
      "Cloud Functions",
      "Gemini API",
      "Stripe",
      "In-app purchases",
      "OneSignal",
      "Spring Boot",
      "REST API",
      "MySQL",
      "Git",
      "GitLab CI",
      "Fastlane",
      "Docker",
    ],
  },
  {
    id: "neoshore",
    period: { start: "2022", end: "2024" },
    company: "Neoshore Madagascar",
    contract: "permanent",
    location: "Antananarivo, Madagascar",
    stack: [
      "Dart",
      "Java",
      "Kotlin",
      "Flutter",
      "GraphQL",
      "REST API",
      "SQLite",
      "Firebase",
      "Social Network Authentication",
      "Facebook API",
      "Face detection",
      "Git",
    ],
  },
  {
    id: "androidFreelance",
    period: { start: "2020", end: "2022" },
    contract: "freelance",
    location: "Antananarivo, Madagascar",
    stack: [
      "Java",
      "Kotlin",
      "SQLite",
      "Firebase",
      "MySQL",
      "REST API",
      "WebSocket",
      "Google Calendar",
      "OpenStreetMap",
      "Git",
    ],
  },
  {
    id: "onnOlep",
    period: { start: "2017", end: "2020" },
    company: "ONN & OLEP",
    contract: "permanent",
    location: "Antananarivo, Madagascar",
    stack: [
      "GLPI",
      "Active Directory",
      "pfSense",
      "Bash & Shell",
      "Apache",
      "Zimbra",
    ],
  },
  {
    id: "emaya",
    period: { start: "2016", end: "2017" },
    company: "E-Maya Offshore",
    contract: "internship",
    location: "Antananarivo, Madagascar",
    stack: [
      "Java",
      "Kotlin",
      "SQLite",
      "Firebase",
      "Google API",
      "WebSocket",
      "REST API",
    ],
  },
];

export const education: Education[] = [
  {
    id: "master",
    period: { start: "2015", end: "2017" },
    school: "Ecole Nationale d'Informatique (ENI)",
    location: "Fianarantsoa",
  },
  {
    id: "licence",
    period: { start: "2012", end: "2015" },
    school: "Ecole Nationale d'Informatique (ENI)",
    location: "Fianarantsoa",
  },
  {
    id: "bac",
    period: { start: "2012" },
    school: "Lycée Fo Masin'i Jesoa",
    location: "Fianarantsoa",
  },
];
