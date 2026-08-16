"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion"
import { MapPin, X, Maximize2, Plus, Minus } from "lucide-react"

// Import your REAL map
import { CoverageMap } from "@/components/coverage-map" 

interface LocationMapProps {
  location?: string
  coordinates?: string
  className?: string
}

export function LocationMap({
  location = "Colombo & Suburbs",
  coordinates = "Western Province, Sri Lanka",
  className,
}: LocationMapProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-50, 50], [8, -8])
  const rotateY = useTransform(mouseX, [-50, 50], [-8, 8])

  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 })

  useEffect(() => {
    if (isExpanded) {
      mouseX.set(0)
      mouseY.set(0)
      document.body.style.overflow = "hidden" // Prevent page scroll when map is open
    } else {
      document.body.style.overflow = "unset"
    }
    return () => { document.body.style.overflow = "unset" }
  }, [isExpanded, mouseX, mouseY])

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (isExpanded || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY

    mouseX.set(clientX - centerX)
    mouseY.set(clientY - centerY)
  }

  const handleMouseLeave = () => {
    if (!isExpanded) {
      mouseX.set(0)
      mouseY.set(0)
      setIsHovered(false)
    }
  }

  // Helper to trigger manual zoom for WebGL canvases
  const triggerZoom = (direction: "in" | "out") => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      // Simulates a mouse wheel scroll to trigger internal map zoom
      canvas.dispatchEvent(new WheelEvent('wheel', { 
        deltaY: direction === "in" ? -500 : 500, 
        bubbles: true 
      }));
    }
  };

  return (
    <>
      {/* 1. THE 3D HOVER CARD (Always in the page flow) */}
      <motion.div
        ref={containerRef}
        className={`relative cursor-pointer select-none w-full max-w-[320px] h-[180px] mx-auto z-10 ${className || ""}`}
        style={{ perspective: 1000 }}
        onMouseMove={handleMouseMove}
        onTouchMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onTouchEnd={handleMouseLeave}
        onClick={() => setIsExpanded(true)}
      >
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#0c0c0e] border border-neutral-200 dark:border-neutral-800 shadow-xl w-full h-full"
          style={{
            rotateX: springRotateX,
            rotateY: springRotateY,
            transformStyle: "preserve-3d",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
        >
          {/* Abstract Map Background for the card */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-500/10 pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
            <svg width="100%" height="100%" className="absolute inset-0">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" className="stroke-foreground" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative z-10 h-full flex flex-col justify-between p-5 pointer-events-none">
            <div className="flex items-start justify-between">
              <MapPin className="h-6 w-6 text-emerald-500 drop-shadow-md" />
              <motion.div
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10"
                animate={{ scale: isHovered ? 1.05 : 1 }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                <span className="text-[10px] font-bold text-neutral-800 dark:text-neutral-200 tracking-wide uppercase">Interactive</span>
              </motion.div>
            </div>

            <div className="space-y-1.5">
              <motion.h3
                className="text-neutral-900 dark:text-white font-bold text-base tracking-tight flex items-center justify-between"
                animate={{ x: isHovered ? 4 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {location}
                <Maximize2 className="h-4 w-4 text-emerald-500 opacity-50" />
              </motion.h3>
              <p className="text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium truncate">
                {coordinates}
              </p>
              <motion.div
                className="h-1 rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-transparent mt-2"
                animate={{ scaleX: isHovered ? 1 : 0.3, originX: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>

        <motion.p
          className="absolute -bottom-8 left-1/2 text-xs font-bold text-emerald-600 dark:text-emerald-500 whitespace-nowrap"
          style={{ x: "-50%" }}
          animate={{ opacity: isHovered ? 1 : 0.7, y: isHovered ? 0 : 4 }}
        >
          Click to view exact locations
        </motion.p>
      </motion.div>

      {/* 2. THE EXPANDED FULLSCREEN MAP MODAL */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Dark Blurred Backdrop */}
            <motion.div 
              className="absolute inset-0 bg-black/70 backdrop-blur-md cursor-pointer"
              onClick={() => setIsExpanded(false)}
            />

            {/* Map Container - FIXED WITH CLIP-PATH MASK TO PREVENT BLEEDING */}
            <motion.div
              className="relative w-full h-full max-w-6xl max-h-[85vh] bg-white dark:bg-black shadow-2xl flex flex-col z-10"
              style={{
                // This is the magic line that physically cuts the WebGL map to match the rounded corners perfectly!
                clipPath: "inset(0px round 2rem)",
                WebkitMaskImage: "-webkit-radial-gradient(white, black)"
              }}
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              
              {/* Massive Close Button */}
              <button
                className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[200] flex items-center justify-center h-12 w-12 rounded-full bg-white/90 dark:bg-black/90 border border-neutral-200 dark:border-neutral-800 shadow-xl text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-all hover:scale-105 active:scale-95"
                onClick={() => setIsExpanded(false)}
              >
                <X className="h-6 w-6" />
              </button>

              {/* Text Hint Badge (Top Left) */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-[100] bg-white/95 dark:bg-black/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-800 pointer-events-none">
                 <p className="text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200">
                     Drag to move
                 </p>
              </div>

              {/* NEW: Manual Zoom Controller (+ / -) Bottom Right */}
              <div className="absolute bottom-6 right-4 sm:bottom-8 sm:right-8 z-[200] flex flex-col gap-1 bg-white/95 dark:bg-black/90 backdrop-blur-md p-1.5 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800">
                <button
                  onClick={() => triggerZoom("in")}
                  className="flex items-center justify-center h-12 w-12 rounded-xl bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-emerald-600 transition-colors active:scale-95"
                  aria-label="Zoom in"
                >
                  <Plus className="h-6 w-6" />
                </button>
                <div className="h-px w-8 mx-auto bg-neutral-200 dark:bg-neutral-800" />
                <button
                  onClick={() => triggerZoom("out")}
                  className="flex items-center justify-center h-12 w-12 rounded-xl bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-emerald-600 transition-colors active:scale-95"
                  aria-label="Zoom out"
                >
                  <Minus className="h-6 w-6" />
                </button>
              </div>

              {/* The Real Map */}
              <div className="w-full h-full relative flex-1">
                <CoverageMap />
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}