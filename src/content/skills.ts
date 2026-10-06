export type Skill = { name: string; logo: string };

export type SkillCategory = {
  /** Clé dans `skills.categories`. */
  id: "languages" | "frameworks" | "databases" | "tools";
  items: Skill[];
};

const logo = (file: string) => `/images/skills/${file}.png`;

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    items: [
      { name: "Dart", logo: logo("dart") },
      { name: "Java", logo: logo("java") },
      { name: "TypeScript", logo: logo("typescript") },
      { name: "PHP", logo: logo("php") },
    ],
  },
  {
    id: "frameworks",
    items: [
      { name: "Flutter", logo: logo("flutter") },
      { name: "Android SDK", logo: logo("android") },
      { name: "Symfony", logo: logo("symfony") },
      { name: "Spring Boot", logo: logo("springboot") },
    ],
  },
  {
    id: "databases",
    items: [
      { name: "PostgreSQL", logo: logo("postgresql") },
      { name: "MySQL", logo: logo("mysql") },
      { name: "MongoDB", logo: logo("mongodb") },
    ],
  },
  {
    id: "tools",
    items: [
      { name: "Firebase", logo: logo("firebase") },
      { name: "Supabase", logo: logo("supabase") },
      { name: "Git", logo: logo("git") },
      { name: "Docker", logo: logo("docker") },
      { name: "Fastlane", logo: logo("fastlane") },
      { name: "REST API", logo: logo("api") },
      { name: "GraphQL", logo: logo("graphql") },
    ],
  },
];
