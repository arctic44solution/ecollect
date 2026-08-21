import { createClient } from "@/lib/supabase/server";
import { updateSubmission } from "../actions";
import Link from "next/link";
import { format } from "date-fns";

export default async function EditSubmissionPage(props: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await props.params;
  const supabase = await createClient();

  const { data: submission, error } = await supabase
    .from("wasteSubmissions")
    .select("*")
    .eq("id", resolvedParams.id)
    .single();

  if (error || !submission) {
    return (
      <div className="p-8 text-center bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl">
        <h2 className="text-lg font-semibold text-red-500">Submission not found</h2>
        <Link href="/admin/submissions" className="text-sm text-emerald-600 hover:underline mt-2 inline-block">
          &larr; Return to Submissions
        </Link>
      </div>
    );
  }

  const cleanPhone = submission.phone.replace(/\D/g, "");
  const formattedDate = submission.preferredPickupDate ? format(new Date(submission.preferredPickupDate), "EEEE, MMMM dd, yyyy") : "pending date confirmation";
  
  // Format array to comma-separated string for text input
  const wasteTypeString = Array.isArray(submission.wasteType) 
    ? submission.wasteType.join(", ") 
    : (submission.wasteType || "");

  const templates = [
    { title: "1. Confirmation Note", text: `Hello ${submission.fullName}, this is eCollect. We'd like to confirm your e-waste pickup on ${formattedDate} at ${submission.address}, ${submission.city}. Please let us know if this works!` },
    { title: "2. En-Route Alert", text: `Hi ${submission.fullName}, our driver is on the way to collect your waste at ${submission.address}. See you shortly!` },
    { title: "3. Completed Receipt", text: `Thank you ${submission.fullName}! Your waste has been successfully collected for recycling. - eCollect Team` },
    { title: "4. Missing Info Request", text: `Hello ${submission.fullName}, we are reviewing your request. Could you please confirm if you have parking access at ${submission.address}?` }
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl pb-16">
      <div className="flex items-center gap-4">
        <Link href="/admin/submissions" className="p-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors">&larr;</Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Submission #{submission.id.slice(0, 8)}</h1>
          <p className="text-slate-500 dark:text-zinc-400 text-xs">Created on {format(new Date(submission.createdAt), "PPP p")}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-4">Direct Contact</h2>
            <div className="flex flex-col gap-3">
              <a href={`tel:${submission.phone}`} className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 hover:border-blue-500 transition-colors">
                <div className="flex items-center gap-2"><span className="text-lg">📞</span><div><p className="text-xs text-slate-500 dark:text-zinc-400">Direct Call</p><p className="text-sm font-semibold text-slate-900 dark:text-white">{submission.phone}</p></div></div><span className="text-xs font-semibold text-blue-600 dark:text-blue-400">Dial &rarr;</span>
              </a>
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${submission.address}, ${submission.city}`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 hover:border-emerald-500 transition-colors">
                <div className="flex items-center gap-2"><span className="text-lg">📍</span><div><p className="text-xs text-slate-500 dark:text-zinc-400">Route Map</p><p className="text-sm font-semibold text-slate-900 dark:text-white">{submission.city}</p></div></div><span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Navigate &rarr;</span>
              </a>
            </div>

            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mt-6 mb-3">WhatsApp Quick Messages</h3>
            <div className="space-y-3">
              {templates.map((tpl, i) => (
                <div key={i} className="p-3 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-lg flex flex-col gap-2">
                  <p className="text-xs font-bold text-emerald-900 dark:text-emerald-300">{tpl.title}</p>
                  <a href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(tpl.text)}`} target="_blank" rel="noopener noreferrer" className="w-full text-center py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold shadow-sm">Send Template &rarr;</a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <form action={updateSubmission} className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm flex flex-col gap-5">
            <input type="hidden" name="id" value={submission.id} />
            <div className="border-b border-slate-200 dark:border-zinc-800 pb-3 flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Edit Operational Details</h2>
              <span className="text-xs text-slate-500">Auto-timestamps on save</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5"><label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Customer Full Name</label><input type="text" name="fullName" defaultValue={submission.fullName} required className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg px-3.5 py-2 text-sm focus:ring-2 focus:ring-emerald-500" /></div>
              <div className="flex flex-col gap-1.5"><label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Contact Phone</label><input type="text" name="phone" defaultValue={submission.phone} required className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg px-3.5 py-2 text-sm focus:ring-2 focus:ring-emerald-500" /></div>
              <div className="flex flex-col gap-1.5"><label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Address</label><input type="text" name="address" defaultValue={submission.address} required className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg px-3.5 py-2 text-sm focus:ring-2 focus:ring-emerald-500" /></div>
              <div className="flex flex-col gap-1.5"><label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">City</label><input type="text" name="city" defaultValue={submission.city} required className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg px-3.5 py-2 text-sm focus:ring-2 focus:ring-emerald-500" /></div>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Waste Type (Comma separated)</label>
                <input type="text" name="wasteType" defaultValue={wasteTypeString} required className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg px-3.5 py-2 text-sm focus:ring-2 focus:ring-emerald-500" />
              </div>
              
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-end">
                  <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Pickup Date</label>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-500 font-medium">Work Week Only</span>
                </div>
                <input type="date" name="preferredPickupDate" defaultValue={submission.preferredPickupDate ? submission.preferredPickupDate.split("T")[0] : ""} className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg px-3.5 py-2 text-sm focus:ring-2 focus:ring-emerald-500 dark:color-scheme-dark" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Status</label>
              <select name="status" defaultValue={submission.status?.toLowerCase()} className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg px-3.5 py-2 text-sm focus:ring-2 focus:ring-emerald-500 font-semibold">
                <option value="pending">Pending</option>
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Internal Operational Notes & Instructions</label>
              <textarea name="notes" defaultValue={submission.notes || ""} rows={4} placeholder="Log customer instructions, gate access codes, or driver updates..." className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg px-3.5 py-2 text-sm focus:ring-2 focus:ring-emerald-500 resize-none" />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-zinc-800">
              <Link href="/admin/submissions" className="px-4 py-2 rounded-lg border border-slate-200 dark:border-zinc-800 text-sm font-semibold text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-900">Cancel</Link>
              <button type="submit" className="px-6 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-sm">Save All Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}