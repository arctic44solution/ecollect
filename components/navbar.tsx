import Link from "next/link";
import { Recycle } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo Section */}
        <Link href="/" className="flex items-center space-x-2">
          <Recycle className="h-6 w-6 text-green-600" />
          <span className="font-bold text-xl tracking-tight">eCollect</span>
        </Link>

        {/* Simple Navigation links - no Login/Logout buttons */}
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link 
            href="/" 
            className="transition-colors hover:text-foreground text-foreground/60"
          >
            Home
          </Link>
          <Link 
            href="/request" 
            className="transition-colors hover:text-foreground text-foreground"
          >
            Request Pickup
          </Link>
        </nav>
      </div>
    </header>
  );
}