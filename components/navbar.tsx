"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, Variants } from "framer-motion";
import { Recycle, Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "./theme-switcher";
import { useLanguage } from "@/lib/language-context";

const EXPAND_SCROLL_THRESHOLD = 80;

const containerVariants: Variants = {
  expanded: { y: 0, opacity: 1, width: "auto", transition: { y: { type: "spring", damping: 18, stiffness: 250 }, opacity: { duration: 0.3 }, type: "spring", damping: 20, stiffness: 300, staggerChildren: 0.07, delayChildren: 0.1 } },
  collapsed: { y: 0, opacity: 1, width: "3.5rem", transition: { type: "spring", damping: 20, stiffness: 300, when: "afterChildren", staggerChildren: 0.05, staggerDirection: -1 } },
};

const logoVariants: Variants = {
  expanded: { opacity: 1, x: 0, scale: 1, filter: "blur(0px)", transition: { type: "spring", damping: 15 } },
  collapsed: { opacity: 0, x: -20, scale: 0.8, filter: "blur(4px)", transition: { duration: 0.2 } },
};

const itemVariants: Variants = {
  expanded: { opacity: 1, x: 0, scale: 1, filter: "blur(0px)", transition: { type: "spring", damping: 15 } },
  collapsed: { opacity: 0, x: -10, scale: 0.95, filter: "blur(4px)", transition: { duration: 0.2 } },
};

const collapsedIconVariants: Variants = {
  expanded: { opacity: 0, scale: 0.5, rotate: 180, transition: { duration: 0.2 } },
  collapsed: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", damping: 15, stiffness: 300, delay: 0.1 } },
};

export default function Navbar() {
  const [isExpanded, setExpanded] = React.useState(true);
  const { scrollY } = useScroll();
  const lastScrollY = React.useRef(0);
  const scrollPositionOnCollapse = React.useRef(0);
  
  const { lang, toggleLang } = useLanguage();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;
    if (isExpanded && latest > previous && latest > 150) {
      setExpanded(false);
      scrollPositionOnCollapse.current = latest; 
    } 
    else if (!isExpanded && latest < previous && (scrollPositionOnCollapse.current - latest > EXPAND_SCROLL_THRESHOLD)) {
      setExpanded(true);
    }
    if (latest < 50 && !isExpanded) setExpanded(true);
    lastScrollY.current = latest;
  });

  const handleNavClick = (e: React.MouseEvent) => {
    if (!isExpanded) {
      e.preventDefault();
      setExpanded(true);
    }
  };

  return (
    <div className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={isExpanded ? "expanded" : "collapsed"}
        variants={containerVariants}
        whileHover={!isExpanded ? { scale: 1.05 } : {}}
        whileTap={!isExpanded ? { scale: 0.95 } : {}}
        onClick={handleNavClick}
        className={cn(
          // ADDED: max-w-[95vw] to prevent it from ever exceeding the mobile screen width
          "flex items-center overflow-hidden rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-[#0a0a0a]/90 shadow-lg shadow-black/5 backdrop-blur-md h-14 max-w-[95vw] sm:max-w-none",
          !isExpanded && "cursor-pointer justify-center shadow-md shadow-[#00a65a]/10"
        )}
      >
        <motion.div variants={logoVariants} className="shrink-0 flex items-center pl-3 sm:pl-5 pr-2 sm:pr-4">
          <Link href="/" onClick={(e) => !isExpanded && e.preventDefault()} className="flex items-center gap-2">
            <Recycle className="h-6 w-6 text-[#00a65a]" />
            {/* ADDED: hidden sm:block to hide the brand text on mobile and save space */}
            <span className="hidden sm:block text-xl font-bold tracking-tight text-neutral-900 dark:text-white">eCollect</span>
          </Link>
        </motion.div>
        
        {/* ADDED: Reduced gaps and padding for mobile */}
        <motion.div className={cn("flex items-center gap-1 sm:gap-3 pr-2 sm:pr-4", !isExpanded && "pointer-events-none")}>
          <motion.div variants={itemVariants}>
            <Link
              href="/request"
              // ADDED: text-[11px] sm:text-sm to shrink the link text slightly on mobile
              className="text-[11px] sm:text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-[#00a65a] transition-colors whitespace-nowrap mr-1 sm:mr-2"
            >
              {lang === "SI" ? "පෝරමය වෙත පිවිසෙන්න" : "Request Pickup"}
            </Link>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex items-center pl-2 sm:pl-3 border-l border-neutral-200 dark:border-neutral-800 gap-1 sm:gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation(); 
                toggleLang();
              }}
              className="flex items-center justify-center gap-1 sm:gap-1.5 h-8 sm:h-8 px-2 sm:px-3 rounded-full bg-neutral-100 dark:bg-neutral-800 text-[10px] sm:text-xs font-bold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              aria-label="Toggle Language"
            >
              <Languages className="h-3.5 sm:h-3.5 w-3.5 sm:w-3.5 text-[#00a65a]" />
              <span>{lang === "SI" ? "EN" : "සිං"}</span>
            </button>
            <ThemeSwitcher />
          </motion.div>
        </motion.div>
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div variants={collapsedIconVariants} animate={isExpanded ? "expanded" : "collapsed"}>
            <Recycle className="h-6 w-6 text-[#00a65a]" />
          </motion.div>
        </div>
      </motion.nav>
    </div>
  );
}