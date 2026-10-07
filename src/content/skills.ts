export type Skill = { name: string; logo: string };

export type SkillCategory = {
  /** Clé dans `skills.categories`. */
  id:
    | "languages"
    | "frameworks"
    | "databases"
    | "backend"
    | "integrations"
    | "tools"
    | "ai";
  items: Skill[];
};

const logo = (file: string, ext = "png") => `/images/skills/${file}.${ext}`;

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    items: [
      { name: "Dart", logo: logo("dart") },
      { name: "Kotlin", logo: logo("kotlin") },
      { name: "Java", logo: logo("java") },
      { name: "TypeScript", logo: logo("typescript") },
    ],
  },
  {
    id: "frameworks",
    items: [
      { name: "Flutter", logo: logo("flutter") },
      { name: "BLoC", logo: logo("bloc") },
      { name: "Android SDK", logo: logo("android") },
      { name: "Next.js", logo: logo("nextjs", "svg") },
      { name: "Spring Boot", logo: logo("springboot") },
    ],
  },
  {
    id: "databases",
    items: [
      { name: "PostgreSQL", logo: logo("postgresql") },
      { name: "SQLite / Drift", logo: logo("sqlite") },
      { name: "MySQL", logo: logo("mysql") },
      { name: "MongoDB", logo: logo("mongodb") },
    ],
  },
  {
    id: "backend",
    items: [
      { name: "REST API", logo: logo("api") },
      { name: "GraphQL", logo: logo("graphql") },
      { name: "Supabase", logo: logo("supabase") },
      { name: "Firebase", logo: logo("firebase") },
      { name: "Jet Admin", logo: logo("jetadmin") },
    ],
  },
  {
    id: "integrations",
    items: [
      { name: "Stripe", logo: logo("stripe", "svg") },
      { name: "OneSignal", logo: logo("onesignal") },
      { name: "Google AdMob", logo: logo("googleadmob") },
    ],
  },
  {
    id: "tools",
    items: [
      { name: "Git", logo: logo("git") },
      { name: "GitLab CI", logo: logo("gitlab") },
      { name: "Docker", logo: logo("docker") },
      { name: "Fastlane", logo: logo("fastlane") },
    ],
  },
  {
    id: "ai",
    items: [
      { name: "Gemini API", logo: logo("gemini", "svg") },
      { name: "Claude Code", logo: logo("claude", "svg") },
      { name: "Kilo Code", logo: logo("kilocode") },
    ],
  },
];
