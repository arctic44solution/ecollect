import Navbar from "@/components/navbar";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function RequestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col">
      {/* <Navbar /> */}
      <div className="flex-1 w-full flex flex-col">
        {children}
      </div>
    </main>
  );
}