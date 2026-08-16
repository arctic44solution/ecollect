"use client";

import * as React from "react";
import { format } from "date-fns";
import { Phone, MessageCircle, Loader2, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import dynamic from "next/dynamic";

// --- Import the Footer ---
import { CinematicFooter } from "@/components/cinematic-footer";

const Calendar = dynamic(
  () => import("@/components/ui/calendar").then((mod) => mod.Calendar),
  {
    ssr: false, 
  },
);

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const wasteTypesMap = [
  { label: "Plastic Bottles", value: "plastic" },
  { label: "Glass Bottles", value: "glass" },
  { label: "Metal Items", value: "metal" },
  { label: "Paper & Cardboard", value: "paper" },
  { label: "Electronics", value: "e-waste" },
  { label: "Organic Waste", value: "organic" },
  { label: "Other", value: "other" },
];

export default function RequestPage() {
  const supabase = createClient();

  const [fullName, setFullName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [selectedWaste, setSelectedWaste] = React.useState<string[]>([]);
  const [date, setDate] = React.useState<Date>();
  const [notes, setNotes] = React.useState("");

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const handleWasteCheckboxChange = (value: string, checked: boolean) => {
    if (checked) {
      setSelectedWaste((prev) => [...prev, value]);
    } else {
      setSelectedWaste((prev) => prev.filter((item) => item !== value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    if (!date) {
      setErrorMsg("Please select a preferred collection date.");
      setIsSubmitting(false);
      return;
    }

    if (selectedWaste.length === 0) {
      setErrorMsg("Please select at least one waste type.");
      setIsSubmitting(false);
      return;
    }

    try {
      const formattedDate = format(date, "yyyy-MM-dd");

      const { error } = await supabase.from("wasteSubmissions").insert([
        {
          fullName,
          phone,
          address,
          city,
          wasteType: selectedWaste, 
          preferredPickupDate: formattedDate,
          notes: notes || null,
          status: "pending",
        },
      ]);

      if (error) throw error;

      setIsSuccess(true);
      setFullName("");
      setPhone("");
      setAddress("");
      setCity("");
      setSelectedWaste([]);
      setDate(undefined);
      setNotes("");
    } catch (err: any) {
      console.error("Error submitting form: ", err);
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-1 mx-auto w-full max-w-xl px-4 sm:px-6 py-12 sm:py-16 text-center flex flex-col items-center justify-center gap-5 sm:gap-6">
          <CheckCircle2 className="h-16 w-16 sm:h-20 sm:w-20 text-green-600 animate-bounce" />
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Submission Received! 🎉
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-md">
            ප්‍රතිචක්‍රීකරණයට එක්වීම පිළිබඳව ස්තුතියි! ඔබගේ ඉල්ලීම සාර්ථකව
            සුරක්ෂිත කර ඇත. අපගේ එකතු කිරීමේ කණ්ඩායම එය පරීක්ෂා කර, ඉක්මනින්ම ඔබව
            සම්බන්ධ කරගනු ඇත.
          </p>
          <Button
            onClick={() => setIsSuccess(false)}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto py-6 sm:py-2 rounded-xl sm:rounded-md"
          >
            තවත් ඉල්ලීමක් යොමු කරන්න.
          </Button>
        </div>
        <CinematicFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="mx-auto w-full max-w-2xl px-4 sm:px-6 py-8 sm:py-12 flex-1">
        {/* Header */}
        <div className="mb-8 sm:mb-10 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold">Recycle Your Waste Easily ♻️</h1>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground">
            Submit your recyclable items and we will arrange a collection.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full">
          {/* ... (Keep your form logic exactly as it was) ... */}
          <FieldGroup className="space-y-6 sm:space-y-8">
            <FieldSet>
              <FieldLegend className="text-base sm:text-lg">ඔබගේ තොරතුරු</FieldLegend>
              <FieldGroup className="space-y-4 pt-2">
                <Field><FieldLabel>Full Name</FieldLabel><Input value={fullName} onChange={(e) => setFullName(e.target.value)} required /></Field>
                <Field><FieldLabel>Phone</FieldLabel><Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required /></Field>
                <Field><FieldLabel>Address</FieldLabel><Textarea value={address} onChange={(e) => setAddress(e.target.value)} required /></Field>
                <Field><FieldLabel>City</FieldLabel><Input value={city} onChange={(e) => setCity(e.target.value)} required /></Field>
              </FieldGroup>
            </FieldSet>
            
            {/* Waste Selection and Date Pickers remain here */}
            {/* ... */}
            
            <Button type="submit" className="w-full h-auto bg-green-600 py-4" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </FieldGroup>
        </form>

        {/* Contact Section */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-slate-200 dark:border-zinc-800">
           {/* ... Contact buttons ... */}
        </div>
      </div>

      {/* --- Footer added here --- */}
      <CinematicFooter />
    </div>
  );
}