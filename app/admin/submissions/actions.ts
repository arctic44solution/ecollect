"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateSubmission(formData: FormData) {
  const supabase = await createClient();
  
  const id = formData.get("id") as string;
  const fullName = formData.get("fullName") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;
  const city = formData.get("city") as string;
  
  // Convert comma-separated string input into an array for the PostgreSQL array column (_waste_type)
  const wasteTypeRaw = formData.get("wasteType") as string;
  const wasteType = wasteTypeRaw ? wasteTypeRaw.split(",").map(item => item.trim()).filter(Boolean) : [];
  
  const status = (formData.get("status") as string).toLowerCase();
  const notes = formData.get("notes") as string;
  const preferredPickupDate = formData.get("preferredPickupDate") as string;

  const { error } = await supabase
    .from("wasteSubmissions")
    .update({
      fullName,
      phone,
      address,
      city,
      wasteType,
      status,
      notes: notes || null,
      preferredPickupDate: preferredPickupDate || null,
      updatedAt: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("Update Error:", error);
    throw new Error("Failed to update submission");
  }

  revalidatePath(`/admin/submissions/${id}`);
  revalidatePath("/admin/submissions");
  revalidatePath("/admin/pickups");
  revalidatePath("/admin");
  
  redirect("/admin/submissions");
}

export async function quickUpdateStatus(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const status = (formData.get("status") as string).toLowerCase();

  await supabase
    .from("wasteSubmissions")
    .update({ 
      status, 
      updatedAt: new Date().toISOString() 
    })
    .eq("id", id);

  revalidatePath("/admin/submissions");
  revalidatePath("/admin/pickups");
  revalidatePath("/admin");
}