import Link from "next/link";
import { Recycle } from "lucide-react";

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
          <span className="text-xl font-bold tracking-tight">Eco-SriLanka</span>
        </Link>

        <nav>
          <Link
          href="/request"
          className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-bold text-black shadow-md transition-all hover:bg-emerald-600 hover:shadow-lg"
        >
          ප්‍රතිචක්‍රීකරණ ද්‍රව්‍ය එකතු කර ගැනීමට ඉල්ලීමක් කරන්න
          </Link>
        </nav>
      </div>
    </header>
  );
}
