"use client"

import { useEffect, useState, useRef } from "react"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [trailingPosition, setTrailingPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailingRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio("/assets/click.wav")
    audioRef.current.volume = 0.3
  }, [])

  useEffect(() => {
    let animationId: number
    let trailingId: number
    let currentX = 0
    let currentY = 0
    let trailingX = 0
    let trailingY = 0

    const updateCursor = (e: MouseEvent) => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }

      animationId = requestAnimationFrame(() => {
        currentX = e.clientX
        currentY = e.clientY
        setPosition({ x: currentX, y: currentY })
      })
    }

    const animateTrailing = () => {
      trailingX += (currentX - trailingX) * 0.15
      trailingY += (currentY - trailingY) * 0.15
      setTrailingPosition({ x: trailingX, y: trailingY })
      trailingId = requestAnimationFrame(animateTrailing)
    }

    trailingId = requestAnimationFrame(animateTrailing)

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    const handleMouseDown = () => {
      setIsClicking(true)
      if (audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play().catch(() => {})
      }
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    document.addEventListener("mousemove", updateCursor, { passive: true })
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    const interactiveElements = document.querySelectorAll('a, button, [role="button"]')
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      if (trailingId) {
        cancelAnimationFrame(trailingId)
      }
      document.removeEventListener("mousemove", updateCursor)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={trailingRef}
        className={`cursor-trail ${isHovering ? "hover" : ""} ${isClicking ? "clicking" : ""}`}
        style={{
          left: `${trailingPosition.x}px`,
          top: `${trailingPosition.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? "hover" : ""} ${isClicking ? "clicking" : ""}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="cursor-core" />
        <div className="cursor-ripple" />
      </div>
    </>
  )
}
