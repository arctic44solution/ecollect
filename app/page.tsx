"use client";

import React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  MapPin, ArrowRight, PhoneCall, Truck, Banknote, Pointer, Star, Leaf, Recycle
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";

// Components
import { LocationMap } from "@/components/ui/expand-map";
import { CinematicFooter } from "@/components/cinematic-footer"; 
import { CoverflowCarousel } from "@/components/ui/coverflow-carousel";

const content = {
  SI: {
    title1: "ඔබේ අපද්‍රව්‍ය,",
    title2: "අපගේ වගකීමක්.",
    subtitle: "ඔබගේ නිවසට හෝ කාර්යාලයට පැමිණ, ප්‍රතිචක්‍රීකරණය කළ හැකි ද්‍රව්‍ය ඉහළ මිලකට ලබා ගැනීමට අප සූදානම්. ඔබට පහසු වේලාවක් අදම වෙන්කරවා ගන්න.",
    primaryBtn: "එකතු කර ගැනීමට ඉල්ලීමක් කරන්න",
    secondaryBtn: "සේවාව සපයන ප්‍රදේශ",
    trustText: "ශ්‍රී ලාංකිකයින් 5,000+ කට වඩා විශ්වාස කරයි",
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
      { src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800", alt: "Secure Service", title: "100% ආරක්ෂිතයි", subtitle: "සොර සතුරන් නිවසට පැමිණීමේ අවදානමක් නැත. අපගේ ලියාපදිංචි නියෝජිතයින් නිල හැඳුනුම්පත් සහිතව පැමිණේ." },
      { src: "https://images.unsplash.com/photo-1580519542036-ed47f3e42214?auto=format&fit=crop&q=80&w=800", alt: "Top Rates", title: "වෙළෙඳපොළේ ඉහළම මිල", subtitle: "විනිවිදභාවයෙන් යුත් කිරුම්. කේවල් කිරීම් නොමැතිව එම මොහොතේම මුදල් අතට." },
      { src: "https://images.unsplash.com/photo-1506784951206-25f0db2cbf86?auto=format&fit=crop&q=80&w=800", alt: "Convenience", title: "ඔබට පහසු වේලාවක්", subtitle: "ඔබ නිවසේ සිටින වෙලාවට පැමිණීමට වේලාවක් වෙන් කරගන්න. රස්තියාදු වීම් නැත." },
      { src: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800", alt: "Eco Friendly", title: "පරිසර හිතකාමීයි", subtitle: "අපද්‍රව්‍ය පරිසරයට මුදා හැරීමෙන් තොරව, 100%ක්ම නිසි ලෙස ප්‍රතිචක්‍රීකරණය කෙරේ." }
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
    trustText: "Trusted by 5,000+ households across Sri Lanka",
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
      { src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800", alt: "Secure Service", title: "100% Safe & Secure", subtitle: "No thieves disguised as collectors. Our verified staff arrive in uniform with official IDs." },
      { src: "https://images.unsplash.com/photo-1580519542036-ed47f3e42214?auto=format&fit=crop&q=80&w=800", alt: "Top Rates", title: "Highest Market Rates", subtitle: "Transparent digital weighing with instant cash payments. No haggling required." },
      { src: "https://images.unsplash.com/photo-1506784951206-25f0db2cbf86?auto=format&fit=crop&q=80&w=800", alt: "Convenience", title: "At Your Convenience", subtitle: "Book a time that fits your schedule. We come to your doorstep when you are ready." },
      { src: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800", alt: "Eco Friendly", title: "Eco-Friendly Process", subtitle: "Zero landfill policy. We ensure your e-waste is recycled at certified facilities." }
    ],
    mapTitle: "Currently active in Colombo & Suburbs",
    mapDesc: "Click on the interactive map to check if our collection trucks are operating in your specific area."
  }
};

const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Home() {
  const { lang } = useLanguage(); // Reads the language from the global state
  const t = content[lang];

  const { scrollY } = useScroll();
  const width = useTransform(scrollY, [0, 250], ["94%", "100%"]);
  const borderRadius = useTransform(scrollY, [0, 250], ["40px 40px 0px 0px", "0px 0px 0px 0px"]);
  
  const orb1Y = useTransform(scrollY, [0, 500], [0, 150]);
  const orb1Rotate = useTransform(scrollY, [0, 500], [0, 45]);
  
  const orb2Y = useTransform(scrollY, [0, 500], [0, -150]);
  const orb2Rotate = useTransform(scrollY, [0, 500], [0, -45]);

  return (
    <div className="relative min-h-screen w-full font-sans antialiased selection:bg-[#00a65a]/30 overflow-x-hidden bg-[#f4f4f5] dark:bg-[#000000]">
      <div className="absolute inset-0 z-0 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50 pointer-events-none"></div>

      <div className="w-full flex justify-center pt-6 sm:pt-10 z-10 relative">
        <motion.div
          style={{ width, borderRadius }}
          className="relative bg-white dark:bg-[#0a0a0a] shadow-[0_20px_60px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center overflow-hidden border-t border-x border-neutral-100 dark:border-neutral-800"
        >
          <div className="absolute inset-0 z-0 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none"></div>

          <motion.div style={{ y: orb1Y, rotate: orb1Rotate }} className="absolute top-[10%] left-[-5%] sm:left-[5%] md:left-[15%] w-48 h-48 sm:w-64 sm:h-64 z-0 pointer-events-none">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#6ee7b7] to-[#00a65a] blur-2xl opacity-20" />
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#a7f3d0] to-[#00a65a] shadow-[inset_-10px_-10px_30px_rgba(0,0,0,0.1),_20px_20px_40px_rgba(0,166,90,0.2)] flex items-center justify-center backdrop-blur-md opacity-80">
              <Leaf className="w-20 h-20 text-white/90" strokeWidth={1.5} />
            </div>
          </motion.div>

          <motion.div style={{ y: orb2Y, rotate: orb2Rotate }} className="absolute bottom-[5%] right-[-5%] sm:right-[5%] md:right-[15%] w-40 h-40 sm:w-56 sm:h-56 z-0 pointer-events-none">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#047857] to-[#34d399] blur-2xl opacity-10" />
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#00a65a] to-[#6ee7b7] shadow-[inset_-10px_-10px_30px_rgba(0,0,0,0.15),_20px_20px_40px_rgba(0,166,90,0.15)] flex items-center justify-center backdrop-blur-md opacity-70">
              <Recycle className="w-16 h-16 text-white/90" strokeWidth={1.5} />
            </div>
          </motion.div>

          {/* Hero Content Area */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-4xl px-4 w-full pt-28 pb-20 sm:pt-36 sm:pb-28">
            
            <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] font-bold tracking-tight leading-[1.1] mb-6 text-neutral-900 dark:text-white">
              {t.title1} <br />
              <span className="text-[#00a65a] relative inline-block mt-2">
                {t.title2}
                <div className="absolute -bottom-2 left-0 w-full h-[5px] bg-[#00a65a] rounded-full"></div>
              </span>
            </h1>

            <p className="max-w-[44rem] text-base sm:text-lg text-neutral-500 dark:text-neutral-400 mb-10 leading-[1.8] px-2 font-medium">
              {t.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-4 sm:px-0 mb-12">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 bg-[#00a65a] hover:bg-[#008f4d] text-white rounded-full text-base font-bold shadow-lg shadow-[#00a65a]/20 transition-all hover:-translate-y-0.5 active:scale-95" asChild>
                <Link href="/request" className="flex items-center justify-center gap-2">
                  {t.primaryBtn}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 rounded-full text-base font-bold bg-[#f3f4f6] text-neutral-900 hover:bg-[#e5e7eb] dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 transition-all hover:-translate-y-0.5 active:scale-95 border-0 shadow-sm" asChild>
                <Link href="#coverage-map">
                  {t.secondaryBtn}
                </Link>
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/80 dark:bg-neutral-900/80 border border-neutral-100 dark:border-neutral-800 backdrop-blur-md py-2.5 px-6 rounded-full shadow-sm">
              <div className="flex -space-x-3">
                <img className="w-10 h-10 rounded-full border-2 border-white dark:border-neutral-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Customer" />
                <img className="w-10 h-10 rounded-full border-2 border-white dark:border-neutral-900 object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" alt="Customer" />
                <img className="w-10 h-10 rounded-full border-2 border-white dark:border-neutral-900 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Customer" />
                <img className="w-10 h-10 rounded-full border-2 border-white dark:border-neutral-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Customer" />
                <div className="w-10 h-10 rounded-full border-2 border-white dark:border-neutral-900 bg-[#f3f4f6] dark:bg-neutral-800 flex items-center justify-center text-xs font-bold text-neutral-600 dark:text-neutral-300">
                  +5k
                </div>
              </div>
              <div className="flex flex-col items-center sm:items-start">
                <div className="flex items-center gap-1 text-[#00a65a]">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 mt-0.5">
                  {t.trustText}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <main className="relative z-20 bg-white dark:bg-[#0a0a0a] w-full pt-10 sm:pt-16">
        <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpItem} className="flex flex-col items-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-12 text-neutral-900 dark:text-white text-center">
              {t.stepsTitle}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full relative">
              <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-[#00a65a]/30 dark:via-[#00a65a]/30 to-transparent -z-10" />

              {t.steps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center text-center p-6 rounded-3xl bg-white dark:bg-[#111] border border-neutral-100 dark:border-neutral-800 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#00a65a]/10 text-[#00a65a] border-[6px] border-white dark:border-[#09090b] shadow-sm">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 tracking-tight text-neutral-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-base font-medium text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-0 py-16 sm:py-24 overflow-hidden bg-neutral-50 dark:bg-[#111]/50 border-y border-neutral-100 dark:border-neutral-900 mt-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpItem}>
            <div className="text-center px-4 mb-8">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-neutral-900 dark:text-white">
                {t.carouselTitle}
              </h2>
              <p className="text-base sm:text-lg font-medium text-neutral-500 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                {t.carouselDesc}
              </p>
            </div>
            
            <div className="flex items-center justify-center gap-2 mb-4 text-[#00a65a] font-bold text-sm animate-pulse">
              <Pointer className="h-4 w-4" />
              <span>{t.dragHint}</span>
            </div>

            <CoverflowCarousel slides={t.slides} showNavigation showPagination loop />
          </motion.div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-20 pb-32">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpItem} className="overflow-hidden rounded-[2rem] border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#111] shadow-xl flex flex-col lg:flex-row">
            <div className="flex flex-col justify-center p-8 lg:p-14 lg:w-5/12 border-b lg:border-b-0 lg:border-r border-neutral-200 dark:border-neutral-800 text-center lg:text-left">
              <div className="mx-auto lg:mx-0 inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-[#00a65a]/10 mb-6 text-[#00a65a]">
                <MapPin className="h-8 w-8" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-balance text-neutral-900 dark:text-white">
                {t.mapTitle}
              </h2>
              <p className="text-lg font-medium text-neutral-500 dark:text-neutral-400 leading-relaxed">
                {t.mapDesc}
              </p>
            </div>

            <div id="coverage-map" className="w-full lg:w-7/12 h-[400px] sm:h-[450px] relative flex items-center justify-center bg-neutral-50 dark:bg-[#0a0a0a] p-4 sm:p-8 overflow-hidden rounded-b-[2rem] lg:rounded-br-[2rem] lg:rounded-bl-none">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,166,90,0.08)_0%,_transparent_70%)] pointer-events-none" />
              <LocationMap />
            </div>
          </motion.div>
        </section>

        <CinematicFooter />
      </main>
    </div>
  );
}