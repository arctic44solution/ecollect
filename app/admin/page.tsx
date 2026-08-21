import { createClient } from "@/lib/supabase/server";
import { DashboardCharts } from "@/components/admin/dashboard-charts";
import Link from "next/link";
import { format } from "date-fns";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const { data: submissions, error } = await supabase
    .from("wasteSubmissions")
    .select("id, fullName, status, wasteType, createdAt")
    .order("createdAt", { ascending: false });

  if (error) {
    return <div className="text-red-500">Error loading dashboard data.</div>;
  }

  const totalSubmissions = submissions?.length || 0;
  
  // Filters now search for lowercase enum values
  const pendingCount = submissions?.filter((s) => s.status === "pending").length || 0;
  const scheduledCount = submissions?.filter((s) => s.status === "scheduled").length || 0;
  const completedCount = submissions?.filter((s) => s.status === "completed").length || 0;

  const recentActivity = submissions?.slice(0, 5) || [];

  return (
    <div className="flex flex-col gap-8 w-full">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Overview</h1>
        <p className="text-slate-500 dark:text-zinc-400 mt-1">Real-time metrics and recent e-waste collections.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Total Requests" value={totalSubmissions} colorClass="text-slate-900 dark:text-white" />
        <MetricCard title="Pending Review" value={pendingCount} colorClass="text-amber-600 dark:text-amber-500" />
        <MetricCard title="Scheduled" value={scheduledCount} colorClass="text-blue-600 dark:text-blue-500" />
        <MetricCard title="Completed" value={completedCount} colorClass="text-emerald-600 dark:text-emerald-500" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          <DashboardCharts submissions={submissions || []} />
        </div>

        <div className="xl:col-span-1 bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-zinc-800 pb-3 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-6">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex flex-col gap-1 border-b border-slate-100 dark:border-zinc-800/50 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm text-slate-900 dark:text-zinc-100">
                    {activity.fullName}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-zinc-500">
                    {format(new Date(activity.createdAt), "MMM d, h:mm a")}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs bg-slate-100 dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 px-2 py-1 rounded">
                    {activity.wasteType}
                  </span>
                  <StatusIndicator status={activity.status} />
                </div>
              </div>
            ))}
            
            <Link 
              href="/admin/submissions"
              className="block w-full text-center text-sm font-medium text-emerald-600 dark:text-emerald-500 hover:underline pt-2"
            >
              View all submissions &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, colorClass }: { title: string, value: number, colorClass: string }) {
  return (
    <div className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm transition-colors">
      <h3 className="text-sm font-medium text-slate-600 dark:text-zinc-400 mb-2">{title}</h3>
      <div className={`text-3xl font-bold ${colorClass}`}>{value}</div>
    </div>
  );
}

function StatusIndicator({ status }: { status: string }) {
  const colors: Record<string, string> = {
    pending: "bg-amber-500", scheduled: "bg-blue-500", completed: "bg-emerald-500", cancelled: "bg-red-500",
  };
  
  const normalizedStatus = status?.toLowerCase();
  
  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-2 h-2 rounded-full ${colors[normalizedStatus] || "bg-slate-500"}`}></div>
      <span className="text-xs font-medium text-slate-600 dark:text-zinc-400 capitalize">{status}</span>
    </div>
  );
}