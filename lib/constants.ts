import type { Content, Project, Technology } from "./types"

export const CONTENT: Record<string, Content> = {
  en: {
    bio1: "I am an 18-year-old developer living in France. I have been passionate about programming since childhood, constantly exploring new technologies and frameworks.",
    bio2: "As a self-taught developer, I've experimented with everything from web development to mobile apps, AI integrations, and system design. I believe in clean code, elegant solutions, and building products that truly matter.",
    bio4: "Currently focused on modern web technologies, TypeScript, React, and creating seamless user experiences that push the boundaries of what's possible on the web.",
    status: "Available for freelance projects",
    projects: "projects",
    social: "social",
    path: "path",
    home: "home",
  },
  fr: {
    bio1: "Je suis un développeur de 18 ans vivant en France. Je suis passionné par la programmation depuis l'enfance, explorant constamment de nouvelles technologies et frameworks.",
    bio2: "En tant que développeur autodidacte, j'ai expérimenté avec tout, du développement web aux applications mobiles, intégrations IA et conception de systèmes. Je crois au code propre, aux solutions élégantes et à la création de produits qui comptent vraiment.",
    bio4: "Actuellement concentré sur les technologies web modernes, TypeScript, React, et la création d'expériences utilisateur fluides qui repoussent les limites du possible sur le web.",
    status: "Disponible pour des projets freelance",
    projects: "projets",
    social: "social",
    path: "path",
    home: "accueil",
  },
}

export const PROJECTS: Project[] = [
  {
    id: "1",
    name: "deprem.live",
    url: "https://deprem.live",
    description: "Real-time earthquake tracking system aggregating data from Kandilli Observatory, AFAD, and EMSC sources",
    image: "https://upload.earth/api/image/2e3c3158b66a0815d858a31a1181a6bf-deprem.live.png",
    longDescription: "Real-time earthquake tracking system aggregating data from Kandilli Observatory, AFAD, and EMSC sources",
    github: "https://github.com/evoise/earthquake",
  },
  {
    id: "2",
    name: "upload.earth",
    url: "https://upload.earth",
    description: "Professional image hosting platform built with Next.js 14. Upload, share, and manage images with API access, password protection, and custom retention policies.",
    image: "https://upload.earth/api/image/72ef77e2d32230854a907c36b9fd02d1-upload.earth.png",
    longDescription: "Professional image hosting platform built with Next.js 14. Upload, share, and manage images with API access, password protection, and custom retention policies.",
    github: "https://github.com/evoise/upload.earth",
  },
]

export const TECHNOLOGIES: Technology[] = [
  { name: "TypeScript", slug: "typescript" },
  { name: "React", slug: "react" },
  { name: "Vue.js", slug: "vuedotjs" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "Svelte", slug: "svelte" },
  { name: "Swift", slug: "swift" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "Python", slug: "python" },
  { name: "Tailwind CSS", slug: "tailwindcss" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "MongoDB", slug: "mongodb" },
  { name: "Docker", slug: "docker" },
  { name: "Git", slug: "git" },
  { name: "Vite", slug: "vite" },
]

export const INTERESTS = {
  en: ["Web Development", "Mobile Development", "AI/ML", "System Design", "Open Source", "UI/UX", "React Native", "iOS Development"],
  fr: ["Développement Web", "Développement Mobile", "IA/ML", "Conception Système", "Open Source", "UI/UX", "React Native", "Développement iOS"],
}

export const SOCIAL_LINKS = {
  github: "https://github.com/evoise",
  twitter: "https://twitter.com",
  discord: "https://discord.com",
}

export const EMAIL = "p@evoise.dev"

export const TIME_ZONES = [
  { city: "paris", timezone: "Europe/Paris" },
  { city: "tokyo", timezone: "Asia/Tokyo" },
  { city: "istanbul", timezone: "Europe/Istanbul" },
]

