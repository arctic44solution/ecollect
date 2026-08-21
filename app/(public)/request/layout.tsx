
import { CinematicFooter } from "@/components/cinematic-footer";

export default function RequestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full bg-[#fcfcfc] dark:bg-[#09090b] text-neutral-900 dark:text-neutral-50 font-sans antialiased">
      
      {/* Floating Navbar */}
      

      {/* 
        MAIN CONTENT WRAPPER 
        z-10 and background colors are required here so it hides the footer 
        and scrolls over it cleanly, just like the homepage!
      */}
      <main className="relative z-10 flex flex-col items-center w-full min-h-dvh bg-[#fcfcfc] dark:bg-[#09090b] pt-28 pb-16 rounded-b-4xl sm:rounded-b-[3rem] border-b border-neutral-200 dark:border-neutral-800 shadow-2xl">
        <div className="w-full max-w-5xl">
          {children}
        </div>
      </main>

      {/* The Footer will sit underneath and be revealed as the main content scrolls up */}
      <CinematicFooter />
      
    </div>
  );
}