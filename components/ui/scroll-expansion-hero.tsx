'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaSrc: string;
}

export default function ScrollExpandMedia({ mediaSrc }: ScrollExpandMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track the scroll progress of this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "center center"] // Starts expanding when it enters the screen, finishes in the middle
  });

  // Smoothly transform the width from 75% to 100%
  const width = useTransform(scrollYProgress, [0, 1], ["75%", "100%"]);
  // Smoothly reduce border radius as it hits the edges
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["2.5rem", "0rem"]);
  // Subtle internal image zoom out for a high-end parallax feel
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <section 
      ref={containerRef} 
      className="w-full h-[40vh] sm:h-[60vh] md:h-[75vh] flex items-center justify-center bg-[#fcfcfc] dark:bg-[#09090b] py-8 sm:py-16"
    >
      <motion.div 
        style={{ width, borderRadius }} 
        className="relative h-full overflow-hidden shadow-2xl border border-neutral-200/50 dark:border-neutral-800/50 bg-neutral-100 dark:bg-neutral-900"
      >
        <motion.img 
          style={{ scale }}
          src={mediaSrc} 
          className="w-full h-full object-cover" 
          alt="Eco friendly operations showcase" 
        />
        {/* Subtle overlay to make the image look premium */}
        <div className="absolute inset-0 bg-black/10" />
      </motion.div>
    </section>
  );
}