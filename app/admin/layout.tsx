import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Suspense } from "react";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { AuthButton } from "@/components/auth-button"; 

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex w-full bg-slate-50 dark:bg-black text-slate-900 dark:text-white transition-colors duration-300">
      
      {/* Sidebar - Adaptive Light/Dark */}
      <aside className="w-64 border-r border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-zinc-800">
          <span className="text-xl font-bold tracking-tight text-emerald-600 dark:text-emerald-500 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            eCollect Pro
          </span>
        </div>
        
        <nav className="flex-1 flex flex-col gap-2 p-4">
          <SidebarLink href="/admin" label="Dashboard" />
          <SidebarLink href="/admin/submissions" label="Waste Submissions" />
          <SidebarLink href="/admin/pickups" label="Pickup Logistics" />
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Top Navbar */}
        <header className="h-16 border-b border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-between px-6 lg:px-8 shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-medium text-slate-500 dark:text-zinc-400">
              Admin Workspace
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <div className="h-6 w-px bg-slate-200 dark:bg-zinc-800"></div>
            {/* Suspense boundary required by Next.js 15 for reading cookies */}
            <Suspense fallback={<div className="w-20 h-8 rounded bg-slate-200 dark:bg-zinc-800 animate-pulse"></div>}>
              <AuthButton />
            </Suspense>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto w-full">
            <Suspense fallback={
              <div className="flex h-[50vh] items-center justify-center text-slate-500 dark:text-zinc-500">
                <div className="animate-pulse flex flex-col items-center gap-4">
                  <div className="h-8 w-8 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>
                  <p>Loading workspace...</p>
                </div>
              </div>
            }>
              <AdminGuard>{children}</AdminGuard>
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}

// Reusable Nav Link Component
function SidebarLink({ href, label }: { href: string, label: string }) {
  return (
    <Link 
      href={href} 
      className="px-4 py-2 rounded-md text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors text-sm font-medium"
    >
      {label}
    </Link>
  );
}

// The Auth Guard
async function AdminGuard({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: roleData } = await supabase
    .from("user_roles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (roleData?.role !== "admin") redirect("/"); 

  return <>{children}</>;
}