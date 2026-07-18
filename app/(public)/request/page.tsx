"use client";

import * as React from "react";
import { format } from "date-fns";
import { Phone, MessageCircle, Loader2, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import dynamic from "next/dynamic";

const Calendar = dynamic(
  () => import("@/components/ui/calendar").then((mod) => mod.Calendar),
  {
    ssr: false, // Disables server-side rendering for this component
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

// Mapping user-friendly names to our database ENUM values
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

  // Form Fields State
  const [fullName, setFullName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [selectedWaste, setSelectedWaste] = React.useState<string[]>([]);
  const [date, setDate] = React.useState<Date>();
  const [notes, setNotes] = React.useState("");

  // Status States
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  // Handle checking and unchecking waste types
  const handleWasteCheckboxChange = (value: string, checked: boolean) => {
    if (checked) {
      setSelectedWaste((prev) => [...prev, value]);
    } else {
      setSelectedWaste((prev) => prev.filter((item) => item !== value));
    }
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    // Basic Validation
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
          wasteType: selectedWaste, // Saves as postgres enum array: e.g. ['plastic', 'glass']
          preferredPickupDate: formattedDate,
          notes: notes || null,
          status: "pending", // Automatically set default
        },
      ]);

      if (error) throw error;

      setIsSuccess(true);

      // Reset form fields
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
      <div className="mx-auto w-full max-w-xl py-16 text-center flex flex-col items-center justify-center gap-6">
        <CheckCircle2 className="h-20 w-20 text-green-600 animate-bounce" />
        <h1 className="text-3xl font-bold text-foreground">
          Submission Received! 🎉
        </h1>
        <p className="text-muted-foreground text-lg max-w-md">
          ප්‍රතිචක්‍රීකරණයට එක්වීම පිළිබඳව ස්තුතියි! ඔබගේ ඉල්ලීම සාර්ථකව
          සුරක්ෂිත කර ඇත. අපගේ එකතු කිරීමේ කණ්ඩායම එය පරීක්ෂා කර, ඉක්මනින්ම ඔබව
          සම්බන්ධ කරගනු ඇත.
        </p>
        <Button
          onClick={() => setIsSuccess(false)}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white"
        >
          තවත් ඉල්ලීමක් යොමු කරන්න.
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-xl py-10">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Recycle Your Waste Easily ♻️</h1>
        <p className="mt-3 text-muted-foreground">
          Submit your recyclable items and we will arrange a collection.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <FieldGroup>
          {/* User Information */}
          <FieldSet>
            <FieldLegend>ඔබගේ තොරතුරු</FieldLegend>
            <FieldDescription>
              ඔබගේ ප්‍රතිචක්‍රීකරණ ද්‍රව්‍ය එකතු කර ගැනීමට ඇති ස්ථානය පිළිබඳව
              අපට දන්වන්න.
            </FieldDescription>

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">සම්පුර්ණ නම / Full Name</FieldLabel>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="phone">
                  දුරකතන අංකය / Phone Number
                </FieldLabel>
                <Input
                  id="phone"
                  placeholder="Enter your phone number (e.g. 0771234567)"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="address">ලිපිනය / Address</FieldLabel>
                <Textarea
                  id="address"
                  placeholder="Enter your pickup address"
                  className="resize-none"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="city">නගරය / City</FieldLabel>
                <Input
                  id="city"
                  placeholder="Enter your city (e.g. Colombo)"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </Field>
            </FieldGroup>
          </FieldSet>

          <FieldSeparator />

          {/* Waste Information */}
          <FieldSet>
            <FieldLegend>ප්‍රතිචක්‍රීකරණය කල හැකි ද්‍රව්‍ය තොරතුරු</FieldLegend>
            <FieldDescription>
              අප විසින් එකතු කර ගැනීමට අවශ්‍ය ද්‍රව්‍ය තෝරන්න.
            </FieldDescription>

            <FieldGroup className="grid grid-cols-2 gap-3">
              {wasteTypesMap.map((item) => (
                <Field
                  key={item.value}
                  orientation="horizontal"
                  className="flex items-center gap-2"
                >
                  <Checkbox
                    id={item.value}
                    name="wasteType"
                    checked={selectedWaste.includes(item.value)}
                    onCheckedChange={(checked) =>
                      handleWasteCheckboxChange(item.value, !!checked)
                    }
                  />
                  <FieldLabel
                    htmlFor={item.value}
                    className="font-normal cursor-pointer select-none"
                  >
                    {item.label}
                  </FieldLabel>
                </Field>
              ))}
            </FieldGroup>
          </FieldSet>

          <FieldSeparator />

          {/* Collection Date & Notes */}
          <FieldSet>
            <FieldLegend>
              ප්‍රතිචක්‍රීකරණය කල හැකි ද්‍රව්‍ය එකතු කිරීමට කැමති දිනය සහ සටහන්
            </FieldLegend>
            <FieldDescription>
              ඔබට පහසු දිනයක් තෝරාගෙන, විශේෂ උපදෙස් තිබේ නම් සඳහන් කරන්න.
            </FieldDescription>

            <FieldGroup>
              <Field>
                <FieldLabel>Pick a Date</FieldLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-start font-normal"
                    >
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </Field>

              <Field>
                <FieldLabel htmlFor="notes">
                  අමතර සටහන් / Special Notes (Optional)
                </FieldLabel>
                <Textarea
                  id="notes"
                  placeholder="E.g. Call before arrival, leave items near gate, etc."
                  className="resize-none"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </Field>
            </FieldGroup>
          </FieldSet>

          {errorMsg && (
            <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg text-center font-medium">
              ❌ {errorMsg}
            </div>
          )}

          <FieldSeparator />

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting
                Request...
              </>
            ) : (
              "ප්‍රතිචක්‍රීකරණය කල හැකි ද්‍රව්‍ය එකතු කිරීම සඳහා ඉල්ලීම යොමු කරන්න"
            )}
          </Button>
        </FieldGroup>
      </form>

      {/* Contact Section */}
      <div className="mt-10">
        <div className="mb-5 text-center">
          <h2 className="font-semibold">උදව් අවශ්‍යද?</h2>
          <p className="text-sm text-muted-foreground">අපව සෘජුවම සම්බන්ධ කරගන්න.</p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" asChild>
            <a href="tel:+94706503676">
              <Phone className="h-4 w-4 mr-2" />
              Call Us
            </a>
          </Button>

          <Button variant="outline" className="flex-1" asChild>
            <a
              href="https://wa.me/94706503676"
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}