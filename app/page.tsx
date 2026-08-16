"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  MapPin, ArrowRight, Languages, PhoneCall, Truck, Banknote, Pointer 
} from "lucide-react";
import { LocationMap } from "@/components/ui/expand-map";
import { CinematicFooter } from "@/components/cinematic-footer"; 
import { CoverflowCarousel } from "@/components/ui/coverflow-carousel";

// --- Translation Dictionary ---
const content = {
  SI: {
    title1: "ඔබේ අපද්‍රව්‍ය,",
    title2: "අපගේ වගකීමක්.",
    subtitle: "ඔබගේ නිවසට හෝ කාර්යාලයට පැමිණ, ප්‍රතිචක්‍රීකරණය කළ හැකි ද්‍රව්‍ය ඉහළ මිලකට ලබා ගැනීමට අප සූදානම්. ඔබට පහසු වේලාවක් අදම වෙන්කරවා ගන්න.",
    primaryBtn: "එකතු කර ගැනීමට ඉල්ලීමක් කරන්න",
    secondaryBtn: "සේවාව සපයන ප්‍රදේශ",
    stepsTitle: "මෙය ක්‍රියාත්මක වන්නේ කෙසේද?",
    steps: [
      { icon: <PhoneCall className="h-7 w-7"/>, title: "1. ඉල්ලීමක් කරන්න", desc: "අපගේ වෙබ් අඩවිය හරහා හෝ දුරකථන ඇමතුමකින් දිනයක් වෙන්කරගන්න." },
      { icon: <Truck className="h-7 w-7"/>, title: "2. අපි පැමිණෙනවා", desc: "නියමිත වේලාවට අපගේ නියෝජිතයින් පැමිණ ඔබ ඉදිරියේම බර කිරා බලයි." },
      { icon: <Banknote className="h-7 w-7"/>, title: "3. එවලේම මුදල්", desc: "කිසිදු රස්තියාදුවකින් තොරව එම මොහොතේම මුදල් අතට ලබාගන්න." }
    ],
    carouselTitle: "ඇයි අපව තෝරා ගන්නේ?",
    carouselDesc: "පරණ බඩු එකතු කරන නොදන්නා පුද්ගලයින් නිවසට ගෙන්වා ගැනීමේ අවදානමෙන් මිදෙන්න. අපගේ ලියාපදිංචි නියෝජිතයින් ඔබට සුරක්ෂිත හා වෘත්තීය සේවාවක් ලබා දෙයි.",
    dragHint: "← වෙනස් කිරීමට අදින්න (Swipe) →",
    slides: [
      {
        src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800",
        alt: "Secure Service",
        title: "100% ආරක්ෂිතයි",
        subtitle: "සොර සතුරන් නිවසට පැමිණීමේ අවදානමක් නැත. අපගේ ලියාපදිංචි නියෝජිතයින් නිල හැඳුනුම්පත් සහිතව පැමිණේ.",
      },
      {
        src: "https://images.unsplash.com/photo-1580519542036-ed47f3e42214?auto=format&fit=crop&q=80&w=800",
        alt: "Top Rates",
        title: "වෙළෙඳපොළේ ඉහළම මිල",
        subtitle: "විනිවිදභාවයෙන් යුත් කිරුම්. කේවල් කිරීම් නොමැතිව එම මොහොතේම මුදල් අතට.",
      },
      {
        src: "https://images.unsplash.com/photo-1506784951206-25f0db2cbf86?auto=format&fit=crop&q=80&w=800",
        alt: "Convenience",
        title: "ඔබට පහසු වේලාවක්",
        subtitle: "ඔබ නිවසේ සිටින වෙලාවට පැමිණීමට වේලාවක් වෙන් කරගන්න. රස්තියාදු වීම් නැත.",
      },
      {
        src: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800",
        alt: "Eco Friendly",
        title: "පරිසර හිතකාමීයි",
        subtitle: "අපද්‍රව්‍ය පරිසරයට මුදා හැරීමෙන් තොරව, 100%ක්ම නිසි ලෙස ප්‍රතිචක්‍රීකරණය කෙරේ.",
      }
    ],
    mapTitle: "දැනට කොළඹ සහ අවට ප්‍රදේශවල ක්‍රියාත්මකයි",
    mapDesc: "ඔබගේ ප්‍රදේශයට අපගේ සේවාව ලබාගත හැකිදැයි පරීක්ෂා කිරීමට සිතියම මත click කරන්න."
  },
  EN: {
    title1: "Your Waste,",
    title2: "Our Responsibility.",
    subtitle: "We come directly to your home or office to collect your recyclables and pay you top rates. Book a convenient pickup time today.",
    primaryBtn: "Request a Pickup Now",
    secondaryBtn: "View Coverage Areas",
    stepsTitle: "How it works",
    steps: [
      { icon: <PhoneCall className="h-7 w-7"/>, title: "1. Request Pickup", desc: "Book a date through our website or give us a direct call." },
      { icon: <Truck className="h-7 w-7"/>, title: "2. We Collect", desc: "Our verified agents arrive at your doorstep and weigh the items." },
      { icon: <Banknote className="h-7 w-7"/>, title: "3. Get Paid", desc: "Receive your cash instantly on the spot. No waiting or haggling." }
    ],
    carouselTitle: "Why Choose eCollect?",
    carouselDesc: "Stop risking your family's safety by letting unknown street scrap collectors into your home. We provide a professional, secure, and highly rewarding collection service.",
    dragHint: "← Swipe or Drag to explore →",
    slides: [
      {
        src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800",
        alt: "Secure Service",
        title: "100% Safe & Secure",
        subtitle: "No thieves disguised as collectors. Our verified staff arrive in uniform with official IDs.",
      },
      {
        src: "https://images.unsplash.com/photo-1580519542036-ed47f3e42214?auto=format&fit=crop&q=80&w=800",
        alt: "Top Rates",
        title: "Highest Market Rates",
        subtitle: "Transparent digital weighing with instant cash payments. No haggling required.",
      },
      {
        src: "https://images.unsplash.com/photo-1506784951206-25f0db2cbf86?auto=format&fit=crop&q=80&w=800",
        alt: "Convenience",
        title: "At Your Convenience",
        subtitle: "Book a time that fits your schedule. We come to your doorstep when you are ready.",
      },
      {
        src: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800",
        alt: "Eco Friendly",
        title: "Eco-Friendly Process",
        subtitle: "Zero landfill policy. We ensure your e-waste is recycled at certified facilities.",
      }
    ],
    mapTitle: "Currently active in Colombo & Suburbs",
    mapDesc: "Click on the interactive map to check if our collection trucks are operating in your specific area."
  }
};

// Reusable animation variant for smooth fade-up effect
const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Home() {
  const [lang, setLang] = useState<"SI" | "EN">("SI");
  const t = content[lang];

  return (
    <div className="relative min-h-screen w-full bg-[#fcfcfc] dark:bg-[#09090b] text-neutral-900 dark:text-neutral-50 font-sans antialiased selection:bg-emerald-500/30 overflow-x-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50"></div>

      <main className="flex flex-col items-center w-full">
        
        {/* HERO SECTION */}
        <section className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-4 pt-12 sm:pt-20 pb-12 text-center">
          <motion.div 
            initial="hidden" animate="visible" variants={fadeUpVariant}
            className="flex flex-col items-center"
          >
            <button 
              onClick={() => setLang(lang === "SI" ? "EN" : "SI")}
              className="mb-8 flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-2 text-sm font-bold text-neutral-700 dark:text-neutral-200 shadow-sm transition-all hover:bg-neutral-50 dark:hover:bg-neutral-800 active:scale-95 cursor-pointer"
            >
              <Languages className="h-4 w-4 text-emerald-600" />
              {lang === "SI" ? "Read in English" : "සිංහලෙන් කියවන්න"}
            </button>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] mb-6 text-balance">
              {t.title1} <br />
              <span className="text-emerald-600 dark:text-emerald-500">
                {t.title2}
              </span>
            </h1>

            <p className="max-w-2xl text-lg sm:text-xl font-medium leading-relaxed text-neutral-600 dark:text-neutral-400 mb-10 text-balance px-2">
              {t.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto px-4 sm:px-0">
              <Button
                size="lg"
                className="w-full sm:w-auto h-16 sm:h-14 px-8 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-lg font-bold shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
                asChild
              >
                <Link href="/request" className="flex items-center justify-center gap-2">
                  {t.primaryBtn}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-16 sm:h-14 px-8 rounded-2xl text-lg font-bold border-2 border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all active:scale-95"
                asChild
              >
                <Link href="#coverage-map">
                  {t.secondaryBtn}
                </Link>
              </Button>
            </div>
          </motion.div>
        </section>

        {/* --- NEW: HOW IT WORKS SECTION (1-2-3 Steps) --- */}
        <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-12">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant}
            className="flex flex-col items-center"
          >
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-10 text-neutral-900 dark:text-white text-center">
              {t.stepsTitle}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full relative">
              {/* Optional background connecting line for desktop */}
              <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-emerald-200 dark:via-emerald-800 to-transparent -z-10" />

              {t.steps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center text-center p-6 rounded-3xl bg-white dark:bg-[#111] border border-neutral-100 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow">
                  <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-[6px] border-white dark:border-[#09090b] shadow-sm">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 tracking-tight text-neutral-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-base font-medium text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* COVERFLOW CAROUSEL FEATURES SECTION */}
        <section className="mx-auto w-full max-w-7xl px-0 py-16 sm:py-24 overflow-hidden">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant}
          >
            <div className="text-center px-4 mb-8">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-neutral-900 dark:text-white">
                {t.carouselTitle}
              </h2>
              <p className="text-base sm:text-lg font-medium text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                {t.carouselDesc}
              </p>
            </div>
            
            {/* Drag Hint for Non-Tech Users */}
            <div className="flex items-center justify-center gap-2 mb-4 text-emerald-600 dark:text-emerald-500 font-bold text-sm animate-pulse">
              <Pointer className="h-4 w-4" />
              <span>{t.dragHint}</span>
            </div>

            <CoverflowCarousel 
              slides={t.slides} 
              showNavigation 
              showPagination 
              loop 
            />
          </motion.div>
        </section>

        {/* MAP SECTION */}
        <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-12 pb-24">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant}
            className="overflow-hidden rounded-[2rem] border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#111] shadow-sm flex flex-col lg:flex-row"
          >
            <div className="flex flex-col justify-center p-8 lg:p-14 lg:w-5/12 border-b lg:border-b-0 lg:border-r border-neutral-200 dark:border-neutral-800 text-center lg:text-left">
              <div className="mx-auto lg:mx-0 inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 mb-6 text-emerald-600 dark:text-emerald-400">
                <MapPin className="h-8 w-8" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-balance text-neutral-900 dark:text-white">
                {t.mapTitle}
              </h2>
              <p className="text-lg font-medium text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {t.mapDesc}
              </p>
            </div>

            {/* CRITICAL FIX: Changed min-h to a strict h-[400px] sm:h-[450px] so the map knows exactly how tall to expand */}
            <div id="coverage-map" className="w-full lg:w-7/12 h-[400px] sm:h-[450px] relative flex items-center justify-center bg-neutral-50 dark:bg-[#0a0a0a] p-4 sm:p-8 overflow-hidden rounded-b-[2rem] lg:rounded-br-[2rem] lg:rounded-bl-none">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.08)_0%,_transparent_70%)] pointer-events-none" />
              
              <LocationMap />
              
            </div>
          </motion.div>
        </section>
      </main>

      <CinematicFooter />
      
    </div>
  );
}