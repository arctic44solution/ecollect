import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Recycle, Calendar, ShieldCheck, MapPin } from "lucide-react";
import { CoverageMap } from "@/components/coverage-map";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    // We make sure the parent container is explicitly 'relative' and 'w-full'
    <div className="relative flex flex-col items-center justify-between w-full min-h-[calc(100vh-64px)] overflow-hidden">
      {/* Background Image wrapper with forced full dimensions */}
      {/* <div className="absolute inset-0 -z-10 w-full h-full">
        <Image
          src="/hero-bg.png" 
          alt="Eco Sri Lanka Homepage Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center w-full h-full"
        />
      </div> */}

      {/* Hero Section */}
      {/* ... keeping all of your section code exactly the same ... */}

      {/* Hero Section */}
      <section className="text-center max-w-3xl flex flex-col items-center gap-6 px-4 pt-16 md:pt-24 pb-12">
        <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-medium px-4 py-1.5 rounded-full text-sm flex items-center gap-2">
          <Recycle className="h-4 w-4" /> Smart Waste Management Solutions
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Recycle Smart, Live Green with{" "}
          <span className="text-green-600">eCollect</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
          ඔබගේ ප්‍රතිචක්‍රීකරණය කළ හැකි අපද්‍රව්‍ය ඉතා පහසුවෙන් ඉවත් කර ගන්න.
          ඔබගේ නිවසට හෝ කාර්යාලයට පැමිණ, ඉහළ මිලක් ගෙවා, ඔබ සතු ප්‍රතිචක්‍රීකරණය
          කළ හැකි ද්‍රව්‍ය අප ආයතනය විසින් ආරක්ෂිත හා වගකීමෙන් යුතුව ලබාගනු
          ලැබේ. ඔබට පහසු දිනයක් වෙන්කරවාගෙන, අප සමඟ එක්ව පිරිසිදු හා හරිත
          පරිසරයක් ගොඩනඟමු.
        </p>

        <div className="flex flex-wrap gap-4 justify-center mt-4">
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold shadow-sm"
            asChild
          >
            <Link href="/request">
              ප්‍රතිචක්‍රීකරණ ද්‍රව්‍ය එකතු කර ගැනීමට ඉල්ලීමක් කරන්න
            </Link>
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full max-w-5xl px-4 grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
        {/* Feature 1 */}
        <div className="border bg-card text-card-foreground rounded-xl p-6 flex flex-col gap-4 shadow-sm">
          <div className="p-3 bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-400 rounded-lg w-fit">
            <Calendar className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold">නම්‍යශීලී කාලසටහන්</h3>
          <p className="text-muted-foreground text-sm">
            ඔබගේ නිවසට හෝ කාර්යාලයට පැමිණ, ප්‍රතිචක්‍රීකරණය කළ හැකි ද්‍රව්‍ය ඉහළ
            මිලකට මිලදීගෙන ලබාගැනීමට අප සූදානම්. පහසු දිනයක් සහ වේලාවක්
            තෝරාගන්න. අපගේ එකතු කිරීමේ කණ්ඩායම ඔබගේ පහසුව අනුව කාර්යක්ෂම ගමන්
            මාර්ග සැලසුම් කර, නියමිත වේලාවට සේවාව ලබාදෙනු ඇත.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="border bg-card text-card-foreground rounded-xl p-6 flex flex-col gap-4 shadow-sm">
          <div className="p-3 bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-400 rounded-lg w-fit">
            <Recycle className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold">පරිසර හිතකාමී වර්ගීකරණය</h3>
          <p className="text-muted-foreground text-sm">
            අපි ලෝහ, ප්ලාස්ටික්, වීදුරු, කඩදාසි, ඉලෙක්ට්‍රොනික අපද්‍රව්‍ය, පොල්
            කටු, කාබනික අපද්‍රව්‍ය සහ සියලුම වර්ගයේ අපද්‍රව්‍ය එකතු කරමු. ඒවා
            නිසි ලෙස වර්ගීකරණය කර, සහතික ලත් ප්‍රතිචක්‍රීකරණ මධ්‍යස්ථාන වෙත යොමු
            කර පරිසර හිතකාමී ලෙස කළමනාකරණය කරනු ලැබේ.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="border bg-card text-card-foreground rounded-xl p-6 flex flex-col gap-4 shadow-sm">
          <div className="p-3 bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-400 rounded-lg w-fit">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold">තහවුරු කළ ක්‍රියාවලිය</h3>
          <p className="text-muted-foreground text-sm">
            ඔබගේ ඉල්ලීමේ තත්ත්වය පරීක්ෂා කරමින්, එය තහවුරු කිරීමේ අදියරේ සිට
            අනුමත කිරීම සහ සම්පූර්ණ කිරීම දක්වා සෑම පියවරක්ම නිරීක්ෂණය කරන්න.
            සියලුම ප්‍රතිචක්‍රීකරණ ද්‍රව්‍ය වගකීමෙන් හා විශ්වාසනීය ලෙස කළමනාකරණය
            කරන බව අපි සහතික කරමු.
          </p>
        </div>
      </section>

      {/* Active Location Section */}
      <section className="w-full max-w-5xl px-4 py-8">
        <div className="border border-green-200 dark:border-green-900/50 bg-green-50/50 dark:bg-green-950/20 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div className="flex gap-3 items-start">
            <div className="p-2 bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 rounded-lg mt-0.5 sm:mt-0">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-bold">
                Now active in Colombo and major suburbs
              </h4>
              <p className="text-muted-foreground text-sm mt-0.5">
                We are actively expanding our pickup networks. Check
                availability at the form page.
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="whitespace-nowrap w-full sm:w-auto mt-2 sm:mt-0"
            asChild
          >
            <Link href="#coverage-map">Check Locations</Link>
          </Button>
        </div>

        {/* Coverage Map */}
        <div id="coverage-map" className="mt-6">
          <CoverageMap />
        </div>
      </section>

      {/* Footer */}
      <div className="flex w-full items-end justify-center bg-muted/30">
        <Footer />
      </div>
    </div>
  );
}
