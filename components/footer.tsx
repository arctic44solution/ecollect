import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface FooterNavLink {
  label: string;
  href: string;
}

export interface FooterProps {
  navLinks?: FooterNavLink[];
}

const WATERMARK_TEXT = "eco Sri Lanka";

export function Footer({
  navLinks = [
    { label: "Home", href: "/" },
    { label: "Request Pickup", href: "/request" },
    { label: "Locations", href: "/#coverage-map" },
  ],
}: FooterProps) {
  return (
    <footer className="w-full overflow-hidden">
      <div className="relative px-6 sm:px-10 md:px-16 lg:px-20">
        <div className="mt-10 flex flex-col gap-8 sm:mt-24 md:mt-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-1.5">
            <span className="text-lg font-light tracking-wide text-muted-foreground">
              Reach out at:
            </span>

            <a
              href="https://wa.me/94706503676"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-2xl font-medium text-foreground"
            >
              <span>Whatsapp</span>

              <ArrowRight className="size-6 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>

          <nav className="flex flex-wrap items-center gap-6 sm:gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-md font-medium text-foreground transition-opacity hover:opacity-70"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="relative px-6 pt-10 pb-2 sm:px-10 md:px-16 lg:px-20 lg:pt-14 lg:pb-2">
        {/* Background Glow */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-3/4">
          <div className="absolute inset-0 bg-gradient-to-tl from-primary/80 via-primary/30 to-transparent blur-lg" />

          <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-primary/40 blur-3xl sm:h-96 sm:w-96" />

          <div className="absolute right-1/4 bottom-0 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        </div>

        <div className="relative z-10 overflow-hidden">
          <svg
            className="block h-auto w-full select-none"
            viewBox="0 0 1000 170"
            preserveAspectRatio="xMinYMax meet"
            aria-hidden="true"
          >
            <text
              x="0"
              y="140"
              fontSize="150"
              fontWeight="700"
              style={{
                fontFamily:
                  'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              }}
              className="fill-watermark"
            >
              {WATERMARK_TEXT}
            </text>
          </svg>
        </div>
      </div>
    </footer>
  );
}