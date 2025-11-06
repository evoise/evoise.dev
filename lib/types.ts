export type Language = "en" | "fr"

export interface Content {
  bio1: string
  bio2: string
  bio4: string
  status: string
  projects: string
  social: string
  path: string
  home: string
}

export interface Project {
  id: string
  name: string
  url: string
  description: string
  image: string
  longDescription: string
  github?: string
}

export interface Technology {
  name: string
  slug: string
}

export interface TimeZone {
  city: string
  time: string
}

export interface SimpleIcon {
  hex: string
  path: string
}

