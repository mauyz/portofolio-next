export type ProjectLink = {
  kind: "apkpure" | "playstore" | "appstore" | "web" | "github";
  url: string;
};

export type Project = {
  /** Clé dans `projects.items` (titre et description). */
  id:
    | "workcode"
    | "quadient"
    | "constitution"
    | "feelin"
    | "portfolio"
    | "taskmanager";
  /** Aperçu 2000×1600 dans `public/images/projects`. */
  image: string;
  stack: string[];
  links: ProjectLink[];
};

export const projects: Project[] = [
  {
    id: "workcode",
    image: "/images/projects/workcode.png",
    stack: ["Dart", "Flutter", "SQLite", "Google AdMob", "GitHub", "Fastlane"],
    links: [
      {
        kind: "apkpure",
        url: "https://apkpure.com/fr/code-du-travail-malagasy/com.eightgroup.madagascar_workcoode",
      },
      { kind: "github", url: "https://github.com/mauyz/madagascar_workcode" },
    ],
  },
  {
    id: "quadient",
    image: "/images/projects/quadient.png",
    stack: ["Dart", "Flutter", "REST API", "GitLab"],
    links: [
      {
        kind: "playstore",
        url: "https://play.google.com/store/apps/details?id=com.quadient.app",
      },
      {
        kind: "appstore",
        url: "https://apps.apple.com/pl/app/quadient-scan/id6504674418",
      },
    ],
  },
  {
    id: "constitution",
    image: "/images/projects/constitution.png",
    stack: ["Dart", "Flutter", "SQLite", "Google AdMob", "GitHub", "Fastlane"],
    links: [
      {
        kind: "apkpure",
        url: "https://apkpure.com/fr/constitution-malagasy-explorer/com.eightgroup.mauyz.constitution",
      },
      { kind: "web", url: "https://constitutionmg.vercel.app/" },
      {
        kind: "github",
        url: "https://github.com/mauyz/madagascar_constitution",
      },
    ],
  },
  {
    id: "feelin",
    image: "/images/projects/feelin.png",
    stack: ["Dart", "Flutter", "Java", "Firebase", "GraphQL", "REST API", "SQLite"],
    links: [],
  },
  {
    id: "portfolio",
    image: "/images/projects/portfolio.png",
    stack: ["Dart", "Flutter", "SQLite", "GitHub"],
    links: [{ kind: "github", url: "https://github.com/mauyz/portfolio-fluter" }],
  },
  {
    id: "taskmanager",
    image: "/images/projects/taskmanager.png",
    stack: ["Dart", "Flutter", "SQLite", "GitHub"],
    links: [{ kind: "github", url: "https://github.com/mauyz/task_manager_app" }],
  },
];
