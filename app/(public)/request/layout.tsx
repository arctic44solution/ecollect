import Navbar from "@/components/navbar";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function RequestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-10 items-center">
        {/* Render your custom Nav Bar right at the top */}
        {/* <Navbar /> */}

        {/* Content body containing your Form page */}
        <div className="flex-1 flex flex-col max-w-5xl w-full p-5">
          {children}
        </div>

        {/* Simple Footer */}
        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-10">
          <p>© 2026 eCollect Sri Lanka. All rights reserved.</p>
          <ThemeSwitcher />
        </footer>
      </div>
    </main>
  );
}
