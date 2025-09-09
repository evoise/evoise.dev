"use client"

import { CustomCursor } from "@/components/custom-cursor"
import { useState, useEffect } from "react"

const content = {
  en: {
    bio1: "I am an 18-year-old developer living in France. I have been passionate about programming since childhood, constantly exploring new technologies and frameworks.",
    bio2: "As a self-taught developer, I've experimented with everything from web development to mobile apps, AI integrations, and system design. I believe in clean code, elegant solutions, and building products that truly matter.",
    bio4: "Currently focused on modern web technologies, TypeScript, React, and creating seamless user experiences that push the boundaries of what's possible on the web.",
    status: "Available for freelance projects",
  },
  fr: {
    bio1: "Je suis un développeur de 18 ans vivant en France. Je suis passionné par la programmation depuis l'enfance, explorant constamment de nouvelles technologies et frameworks.",
    bio2: "En tant que développeur autodidacte, j'ai expérimenté avec tout, du développement web aux applications mobiles, intégrations IA et conception de systèmes. Je crois au code propre, aux solutions élégantes et à la création de produits qui comptent vraiment.",
    bio4: "Actuellement concentré sur les technologies web modernes, TypeScript, React, et la création d'expériences utilisateur fluides qui repoussent les limites du possible sur le web.",
    status: "Disponible pour des projets freelance",
  },
}

export default function Home() {
  const [language, setLanguage] = useState<"en" | "fr">("en")
  const [parisTime, setParisTime] = useState("")
  const [tokyoTime, setTokyoTime] = useState("")
  const [istanbulTime, setIstanbulTime] = useState("")
  const [currentTimeIndex, setCurrentTimeIndex] = useState(0)

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date()

      const paris = now.toLocaleTimeString("en-US", {
        timeZone: "Europe/Paris",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      })

      const tokyo = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Tokyo",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      })

      const istanbul = now.toLocaleTimeString("en-US", {
        timeZone: "Europe/Istanbul",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      })

      setParisTime(paris)
      setTokyoTime(tokyo)
      setIstanbulTime(istanbul)
    }

    updateTimes()
    const interval = setInterval(updateTimes, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setCurrentTimeIndex((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(cycleInterval)
  }, [])

  const timeZones = [
    { city: "paris", time: parisTime },
    { city: "tokyo", time: tokyoTime },
    { city: "istanbul", time: istanbulTime },
  ]

  return (
    <>
      <CustomCursor />
      <main className="min-h-screen bg-white font-mono">
        <div className="flex items-center justify-center min-h-screen px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl w-full">
            {/* Left Column - Personal Info */}
            <div className="space-y-8 animate-slide-in-left">
              <div className="space-y-2">
                <h1 className="text-4xl lg:text-5xl font-bold text-black animate-typewriter">évoise</h1>
                <h2 className="text-xl lg:text-2xl text-gray-600">Developer</h2>
                <div className="flex gap-2 text-sm text-gray-500 pt-2">
                  <button
                    onClick={() => setLanguage("en")}
                    className={`hover:text-black transition-colors ${language === "en" ? "text-black font-medium" : ""}`}
                  >
                    en
                  </button>
                  <span>/</span>
                  <button
                    onClick={() => setLanguage("fr")}
                    className={`hover:text-black transition-colors ${language === "fr" ? "text-black font-medium" : ""}`}
                  >
                    fr
                  </button>
                </div>
              </div>

              <nav className="space-y-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-black hover:text-gray-600 transition-colors text-glow"
                >
                  github
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-black hover:text-gray-600 transition-colors text-glow"
                >
                  twitter
                </a>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-black hover:text-gray-600 transition-colors text-glow"
                >
                  discord
                </a>
              </nav>

              <div className="pt-4 space-y-3 animate-fade-in">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="transition-all duration-500">
                    {timeZones[currentTimeIndex].city} {timeZones[currentTimeIndex].time}
                  </span>
                </div>

                <div className="flex gap-1">
                  {timeZones.map((_, index) => (
                    <div
                      key={index}
                      className={`w-1 h-1 rounded-full transition-all duration-300 ${
                        index === currentTimeIndex ? "bg-gray-400" : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Bio */}
            <div className="space-y-6 animate-slide-in-right">
              <div className="space-y-4 text-black leading-relaxed">
                <p className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                  {content[language].bio1}
                </p>

                <p className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                  {content[language].bio2}
                </p>

                <p className="animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                  {content[language].bio4}
                </p>
              </div>

              <div className="pt-6 space-y-3 animate-fade-in-up" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-600">{content[language].status}</span>
                </div>
                <a
                  href="mailto:p@evoise.dev"
                  className="block text-gray-600 hover:text-black transition-all duration-300 hover:translate-x-1"
                >
                  p@evoise.dev
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-300 to-transparent animate-pulse"></div>
        </div>
      </main>
    </>
  )
}
