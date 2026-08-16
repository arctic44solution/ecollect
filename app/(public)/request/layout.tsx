import Navbar from "@/components/navbar";
// 1. Change the import
import { CinematicFooter } from "@/components/cinematic-footer";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function RequestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col items-center">
        {/* Uncomment your Navbar if you want it visible on this page */}
        {/* <Navbar /> */}

        {/* Content body containing your Form page */}
        <div className="flex-1 flex flex-col max-w-5xl w-full p-5">
          {children}
        </div>

        {/* 2. Use the CinematicFooter here */}
        <div className="flex w-full items-end justify-center">
          <CinematicFooter />
        </div>
      </div>
    </main>
  );
}