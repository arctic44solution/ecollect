"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "SI" | "EN";

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("SI");

  // Save language preference in the browser so it remembers when they refresh
  useEffect(() => {
    const savedLang = localStorage.getItem("ecollect-lang") as Language;
    if (savedLang) setLang(savedLang);
  }, []);

  const toggleLang = () => {
    setLang((prev) => {
      const newLang = prev === "SI" ? "EN" : "SI";
      localStorage.setItem("ecollect-lang", newLang);
      return newLang;
    });
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}