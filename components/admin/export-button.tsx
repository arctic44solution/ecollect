"use client";

export function ExportCsvButton({ data }: { data: any[] }) {
  const exportToCSV = () => {
    if (!data || data.length === 0) return;

    const headers = ["ID", "Customer Name", "Phone", "Address", "City", "Waste Type", "Pickup Date", "Status", "Created At", "Notes"];
    const rows = data.map((item) => [
      `"${item.id}"`,
      `"${item.fullName || ""}"`,
      `"${item.phone || ""}"`,
      `"${item.address || ""}"`,
      `"${item.city || ""}"`,
      `"${item.wasteType || ""}"`,
      `"${item.preferredPickupDate || ""}"`,
      `"${item.status || ""}"`,
      `"${item.createdAt || ""}"`,
      `"${(item.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ecollect-submissions-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={exportToCSV}
      type="button"
      className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors shadow-sm"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
      Export CSV
    </button>
  );
}