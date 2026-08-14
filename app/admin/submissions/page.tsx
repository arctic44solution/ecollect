import { createClient } from "@/lib/supabase/server";
import { quickUpdateStatus } from "./actions";
import { ExportCsvButton } from "@/components/admin/export-button";
import Link from "next/link";
import { format } from "date-fns";

export default async function SubmissionsPage(props: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const resolvedParams = await props.searchParams;

  const query = resolvedParams.query || "";
  const statusFilter = resolvedParams.status || "";
  const cityFilter = resolvedParams.city || "";
  const dateFilter = resolvedParams.date || "";
  const currentPage = Number(resolvedParams.page) || 1;
  const limit = 10;
  const offset = (currentPage - 1) * limit;

  const supabase = await createClient();

  let dbQuery = supabase
    .from("wasteSubmissions")
    .select("*", { count: "exact" })
    .order("createdAt", { ascending: false });

  if (query) {
    dbQuery = dbQuery.or(
      `fullName.ilike.%${query}%,phone.ilike.%${query}%,address.ilike.%${query}%,city.ilike.%${query}%`
    );
  }

  if (statusFilter) dbQuery = dbQuery.eq("status", statusFilter);
  if (cityFilter) dbQuery = dbQuery.ilike("city", `%${cityFilter}%`);
  if (dateFilter) dbQuery = dbQuery.eq("preferredPickupDate", dateFilter);

  dbQuery = dbQuery.range(offset, offset + limit - 1);

  const { data: submissions, count, error } = await dbQuery;
  const totalPages = count ? Math.ceil(count / limit) : 1;

  if (error) {
    return <div className="text-red-500 p-6">Failed to load waste submissions.</div>;
  }

  return (
    <div className="flex flex-col gap-6 w-full pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Waste Submissions</h1>
          <p className="text-slate-500 dark:text-zinc-400 text-sm mt-1">Manage collection requests, confirm dates, and contact customers.</p>
        </div>
        <div className="flex items-center gap-3">
          <ExportCsvButton data={submissions || []} />
          <Link 
            href="/admin/submissions/new"
            className="bg-slate-900 dark:bg-white text-white dark:text-black font-semibold px-4 py-2 rounded-lg transition-colors text-sm shadow-sm flex items-center gap-2"
          >
            + Manual Entry
          </Link>
        </div>
      </div>

      <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 bg-white dark:bg-zinc-950 p-4 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm">
        <div className="lg:col-span-2">
          <input type="text" name="query" defaultValue={query} placeholder="Search name, phone, address, city..." className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
        </div>
        <div>
          <select name="status" defaultValue={statusFilter} className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div>
          <input type="date" name="date" defaultValue={dateFilter} className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:color-scheme-dark" />
        </div>
        <div className="flex gap-2">
          <button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg py-2 transition-colors shadow-sm">Apply</button>
          <Link href="/admin/submissions" className="px-3 py-2 text-sm text-slate-600 dark:text-zinc-400 bg-slate-100 dark:bg-zinc-900 hover:bg-slate-200 dark:hover:bg-zinc-800 rounded-lg transition-colors flex items-center justify-center">✕</Link>
        </div>
      </form>

      <div className="border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-950 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-slate-50 dark:bg-zinc-900/80 text-slate-500 dark:text-zinc-400 border-b border-slate-200 dark:border-zinc-800">
              <tr>
                <th className="px-6 py-4 font-semibold">Customer & Contact</th>
                <th className="px-6 py-4 font-semibold">Location</th>
                <th className="px-6 py-4 font-semibold">Waste Info</th>
                <th className="px-6 py-4 font-semibold">Pickup Date</th>
                <th className="px-6 py-4 font-semibold">Status & Quick Action</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-zinc-800">
              {submissions?.map((sub) => {
                const cleanPhone = sub.phone.replace(/\D/g, "");
                const wasteDisplay = Array.isArray(sub.wasteType) ? sub.wasteType.join(", ") : sub.wasteType;
                const confirmMsg = encodeURIComponent(`Hello ${sub.fullName}, this is eCollect. We'd like to confirm your e-waste pickup on ${sub.preferredPickupDate} at ${sub.address}.`);
                const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${sub.address}, ${sub.city}`)}`;

                return (
                  <tr key={sub.id} className="hover:bg-slate-50 dark:hover:bg-zinc-900/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900 dark:text-zinc-100">{sub.fullName}</div>
                      <div className="flex items-center gap-3 mt-1.5">
                        <a href={`tel:${sub.phone}`} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">📞 {sub.phone}</a>
                        <a href={`https://wa.me/${cleanPhone}?text=${confirmMsg}`} target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-600 dark:text-emerald-400 font-medium hover:underline bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-900/50">💬 WhatsApp</a>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-800 dark:text-zinc-200 text-xs line-clamp-1">{sub.address}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-medium text-slate-500 dark:text-zinc-400">{sub.city}</span>
                        <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] text-blue-500 hover:underline">📍 Map</a>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-slate-100 dark:bg-zinc-800 px-2.5 py-1 rounded text-xs text-slate-700 dark:text-zinc-300 font-medium border border-slate-200 dark:border-zinc-700">{wasteDisplay}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-zinc-300 text-xs">
                      {sub.preferredPickupDate ? format(new Date(sub.preferredPickupDate), "MMM dd, yyyy") : <span className="text-slate-400">Unscheduled</span>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <StatusBadge status={sub.status} />
                        <form action={quickUpdateStatus} className="inline">
                          <input type="hidden" name="id" value={sub.id} />
                          {sub.status === "pending" && (
                            <button type="submit" name="status" value="scheduled" className="text-[11px] font-semibold text-blue-600 border border-blue-200 rounded px-1.5 py-0.5">+ Schedule</button>
                          )}
                          {sub.status === "scheduled" && (
                            <button type="submit" name="status" value="completed" className="text-[11px] font-semibold text-emerald-600 border border-emerald-200 rounded px-1.5 py-0.5">✓ Done</button>
                          )}
                        </form>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/admin/submissions/${sub.id}`} className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold text-xs border border-emerald-200 dark:border-emerald-900 px-3 py-1.5 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/40">Manage &rarr;</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-slate-500 dark:text-zinc-400 pt-2">
        <div>Showing {submissions?.length} of {count} submissions</div>
        <div className="flex gap-2">
          {currentPage > 1 && <Link href={`/admin/submissions?page=${currentPage - 1}`} className="px-4 py-2 border rounded-lg bg-white shadow-sm">Previous</Link>}
          {currentPage < totalPages && <Link href={`/admin/submissions?page=${currentPage + 1}`} className="px-4 py-2 border rounded-lg bg-white shadow-sm">Next</Link>}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    pending: "bg-amber-100 text-amber-800 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-500/20",
    scheduled: "bg-blue-100 text-blue-800 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200 dark:border-blue-500/20",
    completed: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-400 border-red-200 dark:border-red-500/20",
  };
  
  const normalizedStatus = status?.toLowerCase();
  
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${colors[normalizedStatus] || "bg-slate-100 text-slate-700"}`}>
      {status}
    </span>
  );
}