import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/navbar";
import "./globals.css";

// FIX 1: Use Capital 'L' for LanguageProvider
import { LanguageProvider } from "@/lib/language-context";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "eCollect - Recycle Smart, Live Green",
  description: "An effortless way to dispose of your recyclable waste.",
  icons: {
    icon: "/favicon.svg",
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.className} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* FIX 2: Wrap both the Navbar AND the main children inside the Provider! */}
          <LanguageProvider>
            
            {/* Your custom navbar renders globally */}
            <Navbar />
            
            {/* Main content renders exactly once */}
            <main className="flex-1 w-full flex flex-col">
              {children}
            </main>
            
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}