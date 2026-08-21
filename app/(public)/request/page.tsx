"use client";

import * as React from "react";
import { format } from "date-fns";
import { Loader2, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import dynamic from "next/dynamic";

const Calendar = dynamic(
  () => import("@/components/ui/calendar").then((mod) => mod.Calendar),
  { ssr: false }
);

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
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
    } catch (err) {
      console.error("Error submitting form: ", err);
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="w-full max-w-xl mx-auto px-4 sm:px-6 py-12 sm:py-24 text-center flex flex-col items-center justify-center gap-5 sm:gap-6">
        <CheckCircle2 className="h-16 w-16 sm:h-20 sm:w-20 text-[#00a65a] animate-bounce" />
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
          Submission Received! 🎉
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-base sm:text-lg max-w-md">
          ප්‍රතිචක්‍රීකරණයට එක්වීම පිළිබඳව ස්තුතියි! ඔබගේ ඉල්ලීම සාර්ථකව
          සුරක්ෂිත කර ඇත. අපගේ එකතු කිරීමේ කණ්ඩායම එය පරීක්ෂා කර, ඉක්මනින්ම ඔබව
          සම්බන්ධ කරගනු ඇත.
        </p>
        <Button
          onClick={() => setIsSuccess(false)}
          className="mt-4 bg-[#00a65a] hover:bg-[#008f4d] text-white w-full sm:w-auto py-6 sm:py-2 rounded-xl sm:rounded-full font-bold transition-all active:scale-95"
        >
          තවත් ඉල්ලීමක් යොමු කරන්න.
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="mb-8 sm:mb-10 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">Recycle Your Waste Easily ♻️</h1>
        <p className="mt-2 sm:mt-3 text-sm sm:text-base text-neutral-500 dark:text-neutral-400">
          Submit your recyclable items and we will arrange a collection.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full">
        <FieldGroup className="space-y-6 sm:space-y-8">
          
          {/* User Information */}
          <FieldSet>
            <FieldLegend className="text-base sm:text-lg text-neutral-900 dark:text-white">ඔබගේ තොරතුරු</FieldLegend>
            <FieldGroup className="space-y-4 pt-2">
              <Field>
                <FieldLabel htmlFor="name" className="text-sm">සම්පුර්ණ නම / Full Name</FieldLabel>
                <Input id="name" placeholder="Enter your name" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="w-full h-11 sm:h-10 rounded-xl sm:rounded-md bg-white dark:bg-[#111] border-neutral-200 dark:border-neutral-800" />
              </Field>
              <Field>
                <FieldLabel htmlFor="phone" className="text-sm">දුරකතන අංකය / Phone Number</FieldLabel>
                <Input id="phone" placeholder="0771234567" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required className="w-full h-11 sm:h-10 rounded-xl sm:rounded-md bg-white dark:bg-[#111] border-neutral-200 dark:border-neutral-800" />
              </Field>
              <Field>
                <FieldLabel htmlFor="address" className="text-sm">ලිපිනය / Address</FieldLabel>
                <Textarea id="address" placeholder="Enter your pickup address" className="resize-none w-full min-h-25 rounded-xl sm:rounded-md bg-white dark:bg-[#111] border-neutral-200 dark:border-neutral-800" value={address} onChange={(e) => setAddress(e.target.value)} required />
              </Field>
              <Field>
                <FieldLabel htmlFor="city" className="text-sm">නගරය / City</FieldLabel>
                <Input id="city" placeholder="Colombo" value={city} onChange={(e) => setCity(e.target.value)} required className="w-full h-11 sm:h-10 rounded-xl sm:rounded-md bg-white dark:bg-[#111] border-neutral-200 dark:border-neutral-800" />
              </Field>
            </FieldGroup>
          </FieldSet>

          <FieldSeparator className="my-6 border-neutral-200 dark:border-neutral-800" />

          {/* Waste Information */}
          <FieldSet>
            <FieldLegend className="text-base sm:text-lg text-neutral-900 dark:text-white">ප්‍රතිචක්‍රීකරණය කල හැකි ද්‍රව්‍ය තොරතුරු</FieldLegend>
            <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-3">
              {wasteTypesMap.map((item) => (
                <Field key={item.value} orientation="horizontal" className="flex items-center gap-3 p-3 sm:p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#111]/50 sm:border-transparent sm:bg-transparent transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800/50">
                  <Checkbox id={item.value} checked={selectedWaste.includes(item.value)} onCheckedChange={(checked) => handleWasteCheckboxChange(item.value, !!checked)} className="h-5 w-5 sm:h-4 sm:w-4 shrink-0" />
                  <FieldLabel htmlFor={item.value} className="font-medium sm:font-normal cursor-pointer select-none text-sm sm:text-base flex-1 text-neutral-700 dark:text-neutral-300">{item.label}</FieldLabel>
                </Field>
              ))}
            </FieldGroup>
          </FieldSet>

          <FieldSeparator className="my-6 border-neutral-200 dark:border-neutral-800" />

          {/* Date & Notes */}
          <FieldSet>
            <FieldLegend className="text-base sm:text-lg text-neutral-900 dark:text-white">දිනය සහ සටහන්</FieldLegend>
            <FieldGroup className="space-y-4 pt-2">
              <Field>
                <FieldLabel className="text-sm">Pick a Date</FieldLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button type="button" variant="outline" className="w-full justify-start font-normal text-left h-11 sm:h-10 rounded-xl sm:rounded-md bg-white dark:bg-[#111] border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800">
                      {date ? format(date, "PPP") : <span className="text-neutral-500">Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 border-neutral-200 dark:border-neutral-800" align="start">
                    <Calendar mode="single" selected={date} onSelect={setDate} disabled={(date) => date < new Date()} />
                  </PopoverContent>
                </Popover>
              </Field>
              <Field>
                <FieldLabel htmlFor="notes" className="text-sm">අමතර සටහන් / Special Notes (Optional)</FieldLabel>
                <Textarea id="notes" className="resize-none w-full min-h-25 rounded-xl sm:rounded-md bg-white dark:bg-[#111] border-neutral-200 dark:border-neutral-800" value={notes} onChange={(e) => setNotes(e.target.value)} />
              </Field>
            </FieldGroup>
          </FieldSet>

          {errorMsg && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-sm rounded-xl text-center font-medium my-4">
              ❌ {errorMsg}
            </div>
          )}

          <Button type="submit" className="w-full bg-[#00a65a] hover:bg-[#008f4d] text-white font-semibold py-6 sm:py-4 rounded-xl sm:rounded-full transition-all active:scale-95 shadow-md shadow-[#00a65a]/20" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="flex items-center"><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting...</span>
            ) : (
              "ප්‍රතිචක්‍රීකරණය කල හැකි ද්‍රව්‍ය එකතු කිරීම සඳහා ඉල්ලීම යොමු කරන්න"
            )}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}