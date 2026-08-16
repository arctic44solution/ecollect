"use client";

import * as React from "react";
import { format } from "date-fns";
import { Phone, MessageCircle, Loader2, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import dynamic from "next/dynamic";
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

  return (
    <div className="w-full flex flex-col">
      <div className="flex-1 mx-auto w-full max-w-2xl px-4 sm:px-6 py-8 sm:py-12">
        {isSuccess ? (
          <div className="text-center flex flex-col items-center justify-center gap-5 sm:gap-6 py-20">
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
        ) : (
          <>
            <div className="mb-8 sm:mb-10 text-center">
              <h1 className="text-2xl sm:text-3xl font-bold">Recycle Your Waste Easily ♻️</h1>
              <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground">
                Submit your recyclable items and we will arrange a collection.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full">
              <FieldGroup className="space-y-6 sm:space-y-8">
                <FieldSet>
                  <FieldLegend className="text-base sm:text-lg">ඔබගේ තොරතුරු</FieldLegend>
                  <FieldGroup className="space-y-4 pt-2">
                    <Field>
                      <FieldLabel htmlFor="name" className="text-sm">සම්පුර්ණ නම / Full Name</FieldLabel>
                      <Input id="name" placeholder="Enter your name" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="w-full h-11 sm:h-10 rounded-xl sm:rounded-md" />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="phone" className="text-sm">දුරකතන අංකය / Phone Number</FieldLabel>
                      <Input id="phone" placeholder="0771234567" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required className="w-full h-11 sm:h-10 rounded-xl sm:rounded-md" />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="address" className="text-sm">ලිපිනය / Address</FieldLabel>
                      <Textarea id="address" placeholder="Enter your pickup address" className="resize-none w-full min-h-[100px] rounded-xl sm:rounded-md" value={address} onChange={(e) => setAddress(e.target.value)} required />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="city" className="text-sm">නගරය / City</FieldLabel>
                      <Input id="city" placeholder="Colombo" value={city} onChange={(e) => setCity(e.target.value)} required className="w-full h-11 sm:h-10 rounded-xl sm:rounded-md" />
                    </Field>
                  </FieldGroup>
                </FieldSet>

                <FieldSeparator className="my-6" />

                <FieldSet>
                  <FieldLegend className="text-base sm:text-lg">ප්‍රතිචක්‍රීකරණය කල හැකි ද්‍රව්‍ය තොරතුරු</FieldLegend>
                  <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-3">
                    {wasteTypesMap.map((item) => (
                      <Field key={item.value} orientation="horizontal" className="flex items-center gap-3 p-3 sm:p-2 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50 sm:border-transparent sm:bg-transparent">
                        <Checkbox id={item.value} checked={selectedWaste.includes(item.value)} onCheckedChange={(checked) => handleWasteCheckboxChange(item.value, !!checked)} className="h-5 w-5 sm:h-4 sm:w-4 shrink-0" />
                        <FieldLabel htmlFor={item.value} className="font-medium sm:font-normal cursor-pointer select-none text-sm sm:text-base flex-1">{item.label}</FieldLabel>
                      </Field>
                    ))}
                  </FieldGroup>
                </FieldSet>

                <FieldSeparator className="my-6" />

                <FieldSet>
                  <FieldLegend className="text-base sm:text-lg">දිනය සහ සටහන්</FieldLegend>
                  <FieldGroup className="space-y-4 pt-2">
                    <Field>
                      <FieldLabel className="text-sm">Pick a Date</FieldLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button type="button" variant="outline" className="w-full justify-start font-normal text-left h-11 sm:h-10 rounded-xl sm:rounded-md">
                            {date ? format(date, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={date} onSelect={setDate} disabled={(date) => date < new Date()} />
                        </PopoverContent>
                      </Popover>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="notes" className="text-sm">අමතර සටහන් / Special Notes (Optional)</FieldLabel>
                      <Textarea id="notes" className="resize-none w-full min-h-[100px] rounded-xl sm:rounded-md" value={notes} onChange={(e) => setNotes(e.target.value)} />
                    </Field>
                  </FieldGroup>
                </FieldSet>

                {errorMsg && (
                  <div className="p-4 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-xl text-center font-medium my-4">❌ {errorMsg}</div>
                )}

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-xl" disabled={isSubmitting}>
                  {isSubmitting ? <span className="flex items-center"><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting...</span> : "ප්‍රතිචක්‍රීකරණය කල හැකි ද්‍රව්‍ය එකතු කිරීම සඳහා ඉල්ලීම යොමු කරන්න"}
                </Button>
              </FieldGroup>
            </form>
          </>
        )}
      </div>

      <CinematicFooter />
    </div>
  );
}