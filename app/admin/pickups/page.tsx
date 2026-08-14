import { createClient } from "@/lib/supabase/server";
import { isToday, isAfter, isBefore, parseISO, startOfToday, format } from "date-fns";
import Link from "next/link";
import { revalidatePath } from "next/cache";

async function quickComplete(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const supabase = await createClient();
  
  // Use lowercase enum update
  await supabase.from("wasteSubmissions").update({ status: "completed" }).eq("id", id);
  
  revalidatePath("/admin/pickups");
  revalidatePath("/admin");
}

export default async function PickupsPage() {
  const supabase = await createClient();
  const today = startOfToday();

  const { data: pickups, error } = await supabase
    .from("wasteSubmissions")
    .select("id, fullName, phone, address, city, wasteType, preferredPickupDate, notes")
    // Target lowercase enum
    .eq("status", "scheduled")
    .order("preferredPickupDate", { ascending: true });

  if (error) {
    console.error("SUPABASE ERROR:", error);
    return <div className="text-red-500 p-6">Failed to load pickups.</div>;
  }

  const overduePickups = pickups?.filter((p) => 
    p.preferredPickupDate && isBefore(parseISO(p.preferredPickupDate), today)
  ) || [];

  const todaysPickups = pickups?.filter((p) => 
    p.preferredPickupDate && isToday(parseISO(p.preferredPickupDate))
  ) || [];

  const upcomingPickups = pickups?.filter((p) => 
    p.preferredPickupDate && isAfter(parseISO(p.preferredPickupDate), today)
  ) || [];

  return (
    <div className="flex flex-col gap-8 w-full pb-16">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-zinc-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Pickup Logistics</h1>
          <p className="text-slate-500 dark:text-zinc-400 text-sm mt-1">Route management and active schedules.</p>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        
        {overduePickups.length > 0 && (
          <section className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-4 text-red-700 dark:text-red-500 flex items-center gap-2">
              <span className="text-2xl">⚠️</span>
              Overdue Pickups ({overduePickups.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {overduePickups.map((pickup) => (
                <PickupCard key={pickup.id} pickup={pickup} highlight="red" />
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-xl font-semibold mb-4 text-emerald-600 dark:text-emerald-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Today's Pickups ({todaysPickups.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {todaysPickups.length === 0 ? (
              <p className="text-slate-500 dark:text-zinc-500 text-sm">No pickups scheduled for today.</p>
            ) : (
              todaysPickups.map((pickup) => (
                <PickupCard key={pickup.id} pickup={pickup} highlight="emerald" />
              ))
            )}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-slate-700 dark:text-zinc-300">
            Upcoming Pickups ({upcomingPickups.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingPickups.length === 0 ? (
              <p className="text-slate-500 dark:text-zinc-500 text-sm">No upcoming pickups scheduled.</p>
            ) : (
              upcomingPickups.map((pickup) => (
                <PickupCard key={pickup.id} pickup={pickup} highlight="none" />
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function PickupCard({ pickup, highlight }: { pickup: any, highlight: "red" | "emerald" | "none" }) {
  const borderColors = {
    red: "border-red-300 dark:border-red-900 shadow-sm",
    emerald: "border-emerald-300 dark:border-emerald-900/50 shadow-sm",
    none: "border-slate-200 dark:border-zinc-800"
  };

  return (
    <div className={`bg-white dark:bg-zinc-950 border rounded-xl p-5 flex flex-col justify-between transition-all ${borderColors[highlight]}`}>
      <div>
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-slate-900 dark:text-zinc-100">{pickup.fullName}</h3>
          <span className="bg-slate-100 dark:bg-zinc-900 px-2.5 py-1 rounded-md text-xs text-slate-700 dark:text-zinc-300 font-medium border border-slate-200 dark:border-zinc-800">
            {pickup.wasteType}
          </span>
        </div>
        <div className="text-sm text-slate-600 dark:text-zinc-400 space-y-1 mb-4">
          <p className="flex items-center gap-2">📍 {pickup.address}, {pickup.city}</p>
          <p className="flex items-center gap-2">📞 {pickup.phone}</p>
        </div>
        {pickup.notes && (
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 p-3 rounded-md text-xs text-amber-800 dark:text-amber-200 mb-4">
            <strong>Note:</strong> {pickup.notes}
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-zinc-800 mt-2">
        <span className={`text-xs font-medium ${highlight === 'red' ? 'text-red-600 dark:text-red-400' : 'text-slate-500 dark:text-zinc-500'}`}>
          {format(new Date(pickup.preferredPickupDate), "MMM dd, yyyy")}
        </span>
        
        <div className="flex gap-3">
          <Link 
            href={`/admin/submissions/${pickup.id}`}
            className="text-slate-500 dark:text-zinc-400 text-sm hover:text-slate-900 dark:hover:text-white font-medium transition-colors"
          >
            Edit
          </Link>
          
          <form action={quickComplete}>
            <input type="hidden" name="id" value={pickup.id} />
            <button 
              type="submit" 
              className="text-emerald-600 dark:text-emerald-500 text-sm hover:text-emerald-700 dark:hover:text-emerald-400 font-bold transition-colors"
            >
              ✓ Complete
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}