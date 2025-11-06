"use client"

import { CustomCursor } from "@/components/custom-cursor"
import { useState, useEffect, useMemo, useCallback } from "react"
import { Transition } from "@headlessui/react"
import { useIsMobile } from "@/hooks/use-mobile"
import { useTheme } from "next-themes"
import Image from "next/image"
import { Github, ExternalLink } from "lucide-react"
import * as simpleIcons from "simple-icons"
import { CONTENT, PROJECTS, TECHNOLOGIES, INTERESTS, SOCIAL_LINKS, EMAIL, TIME_ZONES } from "@/lib/constants"
import type { Language, Project, Technology } from "@/lib/types"

export default function Home() {
  const [language, setLanguage] = useState<Language>("en")
  const [times, setTimes] = useState<Record<string, string>>({})
  const [currentTimeIndex, setCurrentTimeIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [showProjects, setShowProjects] = useState(false)
  const [isRetro, setIsRetro] = useState(false)
  const isMobile = useIsMobile()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date()
      const updatedTimes: Record<string, string> = {}

      TIME_ZONES.forEach((tz) => {
        updatedTimes[tz.city] = now.toLocaleTimeString("en-US", {
          timeZone: tz.timezone,
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      })
      })

      setTimes(updatedTimes)
    }

    updateTimes()
    const interval = setInterval(updateTimes, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setCurrentTimeIndex((prev) => (prev + 1) % TIME_ZONES.length)
    }, 3000)
    return () => clearInterval(cycleInterval)
  }, [])

  const timeZones = useMemo(() => {
    return TIME_ZONES.map((tz) => ({
      city: tz.city,
      time: times[tz.city] || "",
    }))
  }, [times])

  const content = useMemo(() => CONTENT[language], [language])

  const getIcon = useCallback((slug: string) => {
    const camelCaseSlug = "si" + slug
      .split(/[-.]/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join("")
    return (simpleIcons as any)[camelCaseSlug]
  }, [])

  const handleLanguageChange = useCallback((lang: Language) => {
    setLanguage(lang)
  }, [])

  const handleThemeToggle = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark")
  }, [theme, setTheme])

  const handleRetroToggle = useCallback(() => {
    setIsRetro((prev) => !prev)
  }, [])

  return (
    <>
      {!isMobile && <CustomCursor />}
      <main className={`min-h-screen font-mono ${isRetro ? "vintage-bg" : "bg-white dark:bg-black"}`}>
        <div className="flex items-center justify-center min-h-screen px-4 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-8 sm:gap-12 lg:gap-16 max-w-[1200px] w-full items-center">
            <Transition
              show={mounted}
              enter="transition-all duration-800 ease-out"
              enterFrom="opacity-0 -translate-x-12"
              enterTo="opacity-100 translate-x-0"
            >
              <div className="space-y-6 sm:space-y-8 flex-shrink-0">
              <div className="space-y-2">
                  <Transition
                    show={mounted}
                    enter="transition-all duration-1000 ease-out"
                    enterFrom="opacity-0 w-0"
                    enterTo="opacity-100 w-full"
                  >
                    <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold overflow-hidden whitespace-nowrap tracking-tight transition-colors duration-500 ${isRetro ? "vintage-text" : "text-black dark:text-white"}`}>évoise</h1>
                  </Transition>
                  <h2 className={`text-lg sm:text-xl lg:text-2xl font-light tracking-wide transition-colors duration-500 ${isRetro ? "vintage-text opacity-70" : "text-gray-600 dark:text-gray-400"}`}>Developer</h2>
                  {!isMobile && (
                    <div className="space-y-2 pt-2">
                      <div className={`flex gap-2 text-sm ${isRetro ? "vintage-text opacity-60" : "text-gray-500 dark:text-gray-400"}`}>
                        <button
                          onClick={() => handleLanguageChange("en")}
                          aria-label="Switch to English"
                          className={`hover:opacity-100 transition-opacity ${language === "en" ? "opacity-100 font-medium" : ""}`}
                  >
                    en
                  </button>
                        <span aria-hidden="true">/</span>
                  <button
                          onClick={() => handleLanguageChange("fr")}
                          aria-label="Switch to French"
                          className={`hover:opacity-100 transition-opacity ${language === "fr" ? "opacity-100 font-medium" : ""}`}
                  >
                    fr
                  </button>
                </div>
                      <div className="flex gap-3">
                        <button
                          onClick={handleThemeToggle}
                          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                          className={`text-sm transition-opacity ${isRetro ? "vintage-text opacity-60 hover:opacity-100" : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"}`}
                        >
                          {theme === "dark" ? "light" : "dark"}
                        </button>
                        <button
                          onClick={handleRetroToggle}
                          aria-label={`Switch to ${isRetro ? "default" : "retro"} mode`}
                          className={`text-sm transition-opacity ${isRetro ? "vintage-text opacity-100 font-medium" : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"}`}
                        >
                          retro
                        </button>
                      </div>
                    </div>
                  )}
              </div>

                <div className="space-y-3 pt-4 sm:pt-6">
                  <h3 className={`text-xs uppercase tracking-wider ${isRetro ? "font-light vintage-text opacity-50 tracking-[0.2em]" : "font-medium text-gray-500 dark:text-gray-400"}`}>
                    {content.social}
                  </h3>
                  <nav className="space-y-1.5" aria-label="Social links">
                    <a
                      href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                      aria-label="GitHub profile"
                      className={`block transition-all duration-300 text-sm relative group ${isRetro ? "vintage-text opacity-70 hover:opacity-100" : "text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400"}`}
                >
                  <span className="relative">
                  github
                    <span className={`absolute bottom-0 left-0 w-0 h-px transition-all duration-300 ${isRetro ? "bg-amber-600 dark:bg-amber-500 group-hover:w-full" : "bg-gray-600 dark:bg-gray-400 group-hover:w-full"}`}></span>
                  </span>
                </a>
                <a
                      href={SOCIAL_LINKS.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                      aria-label="Twitter profile"
                      className={`block transition-all duration-300 text-sm relative group ${isRetro ? "vintage-text opacity-70 hover:opacity-100" : "text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400"}`}
                >
                  <span className="relative">
                  twitter
                    <span className={`absolute bottom-0 left-0 w-0 h-px transition-all duration-300 ${isRetro ? "bg-amber-600 dark:bg-amber-500 group-hover:w-full" : "bg-gray-600 dark:bg-gray-400 group-hover:w-full"}`}></span>
                  </span>
                </a>
                <a
                      href={SOCIAL_LINKS.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                      aria-label="Discord profile"
                      className={`block transition-all duration-300 text-sm relative group ${isRetro ? "vintage-text opacity-70 hover:opacity-100" : "text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400"}`}
                >
                  <span className="relative">
                  discord
                    <span className={`absolute bottom-0 left-0 w-0 h-px transition-all duration-300 ${isRetro ? "bg-amber-600 dark:bg-amber-500 group-hover:w-full" : "bg-gray-600 dark:bg-gray-400 group-hover:w-full"}`}></span>
                  </span>
                </a>
              </nav>
                </div>

                <div className="space-y-3 pt-4 sm:pt-6">
                  <h3 className={`text-xs uppercase tracking-wider ${isRetro ? "font-light vintage-text opacity-50 tracking-[0.2em]" : "font-medium text-gray-500 dark:text-gray-400"}`}>
                    {content.path}
                  </h3>
                  <nav className="space-y-1.5" aria-label="Navigation">
                    <button
                      onClick={() => setShowProjects(false)}
                      aria-label="Show home content"
                      className={`block text-left transition-all duration-300 text-sm relative group cursor-pointer ${isRetro ? "vintage-text opacity-70 hover:opacity-100" : "text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400"} ${!showProjects ? "opacity-100 font-medium" : ""}`}
                    >
                      <span className="relative">
                        {content.home}
                        {!showProjects && (
                          <span className={`absolute bottom-0 left-0 w-full h-px ${isRetro ? "bg-amber-600 dark:bg-amber-500" : "bg-gray-600 dark:bg-gray-400"}`}></span>
                        )}
                      </span>
                    </button>
                    <button
                      onClick={() => setShowProjects(true)}
                      aria-label="Show projects"
                      className={`block text-left transition-all duration-300 text-sm relative group cursor-pointer ${isRetro ? "vintage-text opacity-70 hover:opacity-100" : "text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400"} ${showProjects ? "opacity-100 font-medium" : ""}`}
                    >
                      <span className="relative">
                        {content.projects}
                        {showProjects && (
                          <span className={`absolute bottom-0 left-0 w-full h-px ${isRetro ? "bg-amber-600 dark:bg-amber-500" : "bg-gray-600 dark:bg-gray-400"}`}></span>
                        )}
                      </span>
                    </button>
                  </nav>
                </div>

                <Transition
                  show={mounted}
                  enter="transition-all duration-800 ease-out delay-400"
                  enterFrom="opacity-0 translate-y-4"
                  enterTo="opacity-100 translate-y-0"
                >
                  <div className="pt-4 sm:pt-6 space-y-3">
                    <div className={`flex items-center gap-2 text-xs ${isRetro ? "vintage-text opacity-50" : "text-gray-500 dark:text-gray-400"}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${isRetro ? "bg-amber-600 dark:bg-amber-500" : "bg-green-500"}`}></div>
                      <span className={`transition-all duration-500 ${isRetro ? "font-light" : ""}`}>
                    {timeZones[currentTimeIndex].city} {timeZones[currentTimeIndex].time}
                  </span>
                </div>

                <div className="flex gap-1">
                  {timeZones.map((_, index) => (
                    <div
                      key={index}
                          className={`w-1 h-1 rounded-full transition-all duration-300 ${isRetro 
                            ? index === currentTimeIndex ? "bg-amber-600 dark:bg-amber-500 opacity-100" : "bg-amber-600 dark:bg-amber-500 opacity-20"
                            : index === currentTimeIndex ? "bg-gray-400 dark:bg-gray-500" : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    />
                  ))}
                </div>
              </div>
                </Transition>
            </div>
            </Transition>

            <Transition
              show={mounted}
              enter="transition-all duration-800 ease-out"
              enterFrom="opacity-0 translate-x-12"
              enterTo="opacity-100 translate-x-0"
            >
              <div className="space-y-6">
                {showProjects ? (
                  <div className="space-y-6">
                    {PROJECTS.length > 0 ? (
                      <div className="space-y-8">
                        {PROJECTS.map((project: Project) => (
                          <div key={project.id} className="space-y-4 group">
                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                              <div className={`relative w-full sm:w-40 h-40 sm:h-40 flex-shrink-0 rounded overflow-hidden transition-all duration-500 ${isRetro ? "bg-white/30 dark:bg-black/30 vintage-border border group-hover:shadow-lg" : "bg-gray-200 dark:bg-gray-800 group-hover:shadow-xl group-hover:shadow-gray-200/50 dark:group-hover:shadow-gray-800/50"}`}>
                                <Image
                                  src={project.image}
                                  alt={`${project.name} project screenshot`}
                                  fill
                                  className={`object-cover transition-all duration-500 ${isRetro ? "opacity-90 group-hover:opacity-100 group-hover:scale-105" : "group-hover:scale-105"}`}
                                  sizes="(max-width: 640px) 100vw, 160px"
                                  loading="lazy"
                                />
                              </div>
                              <div className="flex-1 min-w-0 w-full">
                                <h3 className={`text-lg sm:text-xl font-medium mb-2 transition-colors duration-500 ${isRetro ? "vintage-text" : "text-black dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200"}`}>
                                  {project.name}
                                </h3>
                                <p className={`text-sm leading-relaxed mb-4 transition-all duration-500 ${isRetro ? "vintage-text opacity-70" : "text-gray-600 dark:text-gray-400"}`}>
                                  {project.description}
                                </p>
                                <div className="flex flex-wrap gap-3 sm:gap-4 items-center">
                                  {project.github && (
                                    <a
                                      href={project.github}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      aria-label={`View ${project.name} on GitHub`}
                                      className={`flex items-center gap-1.5 text-xs transition-all duration-300 ${isRetro ? "vintage-text opacity-60 hover:opacity-100 hover:gap-2" : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:gap-2"}`}
                                    >
                                      <Github size={14} aria-hidden="true" className="transition-transform duration-300 hover:scale-110" />
                                      <span>github</span>
                                    </a>
                                  )}
                                  <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Visit ${project.name}`}
                                    className={`flex items-center gap-1.5 text-xs transition-all duration-300 ${isRetro ? "vintage-text opacity-60 hover:opacity-100 hover:gap-2" : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:gap-2"}`}
                                  >
                                    <ExternalLink size={14} aria-hidden="true" className="transition-transform duration-300 hover:scale-110" />
                                    <span>external</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16">
                        <p className="text-gray-500 text-lg">No projects yet.</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-6 sm:space-y-8 lg:space-y-10">
                    <div className={`space-y-4 sm:space-y-5 leading-relaxed text-sm sm:text-base transition-colors duration-500 ${isRetro ? "vintage-text" : "text-black dark:text-white"}`}>
                      <p className={`transition-opacity duration-500 ${isRetro ? "opacity-80" : ""}`}>{content.bio1}</p>
                      <p className={`transition-opacity duration-500 ${isRetro ? "opacity-80" : ""}`}>{content.bio2}</p>
                      <p className={`transition-opacity duration-500 ${isRetro ? "opacity-80" : ""}`}>{content.bio4}</p>
                    </div>

                    <div className="pt-4 sm:pt-6 space-y-3">
                      <h3 className={`text-xs uppercase tracking-wider mb-3 transition-all duration-500 ${isRetro ? "font-light vintage-text opacity-50 tracking-[0.2em]" : "font-medium text-gray-500 dark:text-gray-400"}`}>
                        {language === "en" ? "Technologies" : "Technologies"}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {TECHNOLOGIES.map((tech) => {
                          const icon = getIcon(tech.slug)
                          return (
                            <span
                              key={tech.name}
                              className={`flex items-center gap-2 px-2.5 py-1 text-xs rounded-full transition-all duration-300 cursor-default ${isRetro 
                                ? "font-light vintage-text opacity-70 bg-white/30 dark:bg-black/30 vintage-border border hover:opacity-100 hover:scale-105"
                                : "font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105 hover:shadow-md"
                              }`}
                            >
                              {icon && (
                                <svg
                                  role="img"
                                  viewBox="0 0 24 24"
                                  className="w-3.5 h-3.5"
                                  fill={`#${icon.hex}`}
                                  xmlns="http://www.w3.org/2000/svg"
                                  aria-label={tech.name}
                                >
                                  <path d={icon.path} />
                                </svg>
                              )}
                              <span>{tech.name}</span>
                            </span>
                          )
                        })}
                      </div>
                    </div>

                    <div className="pt-4 sm:pt-6 space-y-3">
                      <h3 className={`text-xs uppercase tracking-wider mb-3 transition-all duration-500 ${isRetro ? "font-light vintage-text opacity-50 tracking-[0.2em]" : "font-medium text-gray-500 dark:text-gray-400"}`}>
                        {language === "en" ? "Interests" : "Intérêts"}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {INTERESTS[language].map((interest) => (
                          <span
                            key={interest}
                            className={`px-2.5 py-1 text-xs rounded-full transition-all duration-300 cursor-default ${isRetro
                              ? "font-light vintage-text opacity-70 bg-white/20 dark:bg-black/20 vintage-border border hover:opacity-100 hover:scale-105"
                              : "font-medium text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:scale-105 hover:shadow-sm"
                            }`}
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
              </div>

                    <div className="pt-6 sm:pt-8 space-y-3">
                      <div className={`flex items-center gap-2 text-xs transition-all duration-500 ${isRetro ? "vintage-text opacity-50" : "text-gray-500 dark:text-gray-400"}`}>
                        <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${isRetro ? "bg-amber-600 dark:bg-amber-500" : "bg-green-500 animate-pulse"}`} aria-hidden="true"></div>
                        <span className={`transition-colors duration-500 ${isRetro ? "" : "text-green-600 dark:text-green-400"}`}>{content.status}</span>
                </div>
                <a
                        href={`mailto:${EMAIL}`}
                        aria-label="Send email"
                        className={`block transition-all duration-300 text-sm relative group break-all ${isRetro ? "vintage-text opacity-70 hover:opacity-100" : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"}`}
                >
                        <span className="relative">
                          {EMAIL}
                          <span className={`absolute bottom-0 left-0 w-0 h-px transition-all duration-300 ${isRetro ? "bg-amber-600 dark:bg-amber-500 group-hover:w-full" : "bg-black dark:bg-white group-hover:w-full"}`}></span>
                        </span>
                </a>
              </div>
            </div>
                )}
              </div>
            </Transition>
          </div>
        </div>

        <div className="fixed bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block">
          <div className={`w-px h-6 sm:h-8 bg-gradient-to-b from-transparent to-transparent ${isRetro ? "via-amber-600/30 dark:via-amber-500/30" : "via-gray-300 dark:via-gray-600"}`}></div>
        </div>
      </main>
    </>
  )
}
