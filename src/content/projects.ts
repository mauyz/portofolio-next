export type ProjectLink = {
  kind: "apkpure" | "playstore" | "appstore" | "web" | "github";
  url: string;
};

export type Project = {
  /** Clé dans `projects.items` (titre et description). */
  id:
    | "soren"
    | "cuecha"
    | "enijay"
    | "kidywin"
    | "intimist"
    | "quadient"
    | "workcode"
    | "portfolio";
  /** Aperçu 2000×1600 dans `public/images/projects`. */
  image: string;
  stack: string[];
  links: ProjectLink[];
  /** Application pas encore publiée sur les stores. */
  unreleased?: boolean;
};

const playStore = (id: string): ProjectLink => ({
  kind: "playstore",
  url: `https://play.google.com/store/apps/details?id=${id}`,
});

const appStore = (url: string): ProjectLink => ({ kind: "appstore", url });

// Projets professionnels du plus récent au plus ancien, puis projets personnels.
export const projects: Project[] = [
  {
    id: "soren",
    image: "/images/projects/soren.jpg",
    stack: ["Flutter", "BLoC", "Drift", "Supabase", "PostgreSQL", "WorkManager", "GitLab CI"],
    links: [
      playStore("com.soren.mobile"),
      appStore("https://apps.apple.com/fr/app/soren/id6791588925"),
    ],
  },
  {
    id: "cuecha",
    image: "/images/projects/cuecha.jpg",
    stack: ["Flutter", "BLoC", "REST API", "Dio / Retrofit", "go_router", "Drift", "Stripe", "GitLab CI"],
    links: [],
    unreleased: true,
  },
  {
    id: "enijay",
    image: "/images/projects/enijay.jpg",
    stack: ["Flutter", "BLoC", "Supabase", "PostGIS", "Realtime", "OneSignal", "Jet Admin", "GitLab CI"],
    links: [
      playStore("com.enijay.app"),
      appStore("https://apps.apple.com/fr/app/enijay/id6758624723"),
    ],
  },
  {
    id: "kidywin",
    image: "/images/projects/kidywin.jpg",
    stack: ["Flutter", "BLoC", "Supabase", "Edge Functions", "Jet Admin", "flutter_map", "GitLab CI"],
    links: [
      playStore("com.serevia.kidywin"),
      appStore("https://apps.apple.com/fr/app/kidywin/id6755099634"),
    ],
  },
  {
    id: "intimist",
    image: "/images/projects/intimist.jpg",
    stack: ["Flutter", "BLoC", "Firebase", "Cloud Functions", "Gemini API", "In-app purchases", "Drift"],
    links: [
      playStore("com.serevia.intimist"),
      appStore("https://apps.apple.com/fr/app/intimist-conversations/id6746474569"),
    ],
  },
  {
    id: "quadient",
    image: "/images/projects/quadient.png",
    stack: ["Dart", "Flutter", "REST API", "GitLab"],
    links: [
      playStore("com.quadient.app"),
      appStore("https://apps.apple.com/pl/app/quadient-scan/id6504674418"),
    ],
  },
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
    id: "portfolio",
    image: "/images/projects/portfolio.png",
    stack: ["Dart", "Flutter", "SQLite", "GitHub"],
    links: [{ kind: "web", url: "https://moisedev.netlify.app/" }],
  },
];
