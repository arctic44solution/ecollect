import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";

async function createManualSubmission(formData: FormData) {
  "use server";
  const supabase = await createClient();
  
  const { error } = await supabase.from("wasteSubmissions").insert([{
    fullName: formData.get("fullName"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    city: formData.get("city"),
    wasteType: formData.get("wasteType"),
    status: formData.get("status"),
    notes: formData.get("notes") || null,
    preferredPickupDate: formData.get("preferredPickupDate") || null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }]);

  if (error) throw new Error("Failed to create submission");

  revalidatePath("/admin/submissions");
  revalidatePath("/admin");
  redirect("/admin/submissions");
}

export default function NewSubmissionPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl pb-16">
      <div className="flex items-center gap-4 mb-2">
        <Link href="/admin/submissions" className="text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors">
          &larr; Back to Submissions
        </Link>
      </div>
      
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">New Manual Order</h1>
        <p className="text-slate-500 dark:text-zinc-400 text-sm mt-1">Log a request received via phone or email.</p>
      </div>

      <form action={createManualSubmission} className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Customer Full Name</label>
            <input type="text" name="fullName" required className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Contact Phone</label>
            <input type="text" name="phone" required className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Address</label>
            <input type="text" name="address" required className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">City</label>
            <input type="text" name="city" required className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Waste Type</label>
            <input type="text" name="wasteType" required className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Pickup Date (Work Week Only)</label>
            <input type="date" name="preferredPickupDate" className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 dark:color-scheme-dark" />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Initial Status</label>
          <select name="status" className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500">
            <option value="Pending">Pending (Requires Review)</option>
            <option value="Scheduled">Scheduled (Ready for Pickup)</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Operational Notes</label>
          <textarea name="notes" rows={4} placeholder="Add instructions..." className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 resize-none" />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-zinc-800">
          <Link href="/admin/submissions" className="px-4 py-2 rounded-lg border border-slate-200 dark:border-zinc-800 text-sm font-semibold text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-900">Cancel</Link>
          <button type="submit" className="px-6 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-sm">Create Order</button>
        </div>
      </form>
    </div>
  );
}