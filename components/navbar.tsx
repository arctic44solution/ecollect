import Link from "next/link";
import { Recycle } from "lucide-react";
import { ThemeSwitcher } from "./theme-switcher";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link
          href="/"
          aria-label="eCollect home"
          className="flex items-center gap-2"
        >
          <Recycle className="h-6 w-6 text-green-600" />
          <span className="text-xl font-bold tracking-tight">eCollect</span>
        </Link>

        <div className="flex items-center gap-6">
          <nav>
            <Link
              href="/request"
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
            >
              පෝරමය වෙත පිවිසෙන්න
            </Link>
          </nav>

          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}