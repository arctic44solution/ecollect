import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function RequestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col  items-center">
        {/* Render your custom Nav Bar right at the top */}
        {/* <Navbar /> */}

        {/* Content body containing your Form page */}
        <div className="flex-1 flex flex-col max-w-5xl w-full p-5">
          {children}
        </div>

        <div className="flex w-full items-end justify-center bg-muted/30">
          <Footer />
        </div>
      </div>
    </main>
  );
}
