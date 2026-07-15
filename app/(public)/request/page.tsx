"use client";

import * as React from "react";
import { format } from "date-fns";
import { Phone, MessageCircle } from "lucide-react";

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
import { Calendar } from "@/components/ui/calendar";

const wasteTypes = [
  "Plastic Bottles",
  "Glass Bottles",
  "Metal Items",
  "Paper",
  "Cardboard",
  "Electronics",
  "Other"
];

export default function RequestPage() {
  const [date, setDate] = React.useState<Date>();

  return (
    <div className="mx-auto w-full max-w-xl py-10">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Recycle Your Waste Easily ♻️</h1>

        <p className="mt-3 text-muted-foreground">
          Submit your recyclable items and we will arrange a collection.
        </p>
      </div>

      <form>
        <FieldGroup>
          {/* User Information */}
          <FieldSet>
            <FieldLegend>Your Information</FieldLegend>

            <FieldDescription>
              Tell us where to collect your items.
            </FieldDescription>

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">සම්පුර්න න​ම</FieldLabel>

                <Input id="name" placeholder="Enter your name" required />
              </Field>

              <Field>
                <FieldLabel htmlFor="phone">දුරකතන අංකය</FieldLabel>

                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  type="tel"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="address">පිටත් වියමන ලිපිනය</FieldLabel>

                <Textarea
                  id="address"
                  placeholder="Enter your pickup address"
                  className="resize-none"
                  required
                />
              </Field>
            </FieldGroup>
          </FieldSet>

          <FieldSeparator />

          {/* Waste Information */}
          <FieldSet>
            <FieldLegend>Waste Information</FieldLegend>

            <FieldDescription>
              Select the items you want us to collect.
            </FieldDescription>

            <FieldGroup className="gap-3">
              {wasteTypes.map((item) => (
                <Field key={item} orientation="horizontal">
                  <Checkbox id={item} name="wasteType" />

                  <FieldLabel htmlFor={item} className="font-normal">
                    {item}
                  </FieldLabel>
                </Field>
              ))}
            </FieldGroup>
          </FieldSet>

          <FieldSeparator />

          {/* Collection Date */}
          <FieldSet>
            <FieldLegend>Preferred Collection Date</FieldLegend>

            <FieldDescription>
              Choose a suitable date for pickup.
            </FieldDescription>

            <Popover>
              <PopoverTrigger asChild>
                <Button
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
          </FieldSet>

          <FieldSeparator />

          {/* Submit */}
          <Button type="submit" className="w-full">
            Request Collection
          </Button>
        </FieldGroup>
      </form>

      {/* Contact Section */}
      <div className="mt-10">
        <div className="mb-5 text-center">
          <h2 className="font-semibold">Need Help?</h2>

          <p className="text-sm text-muted-foreground">Contact us directly</p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" asChild>
            <a href="tel:+94123456789">
              <Phone />
              Call Us
            </a>
          </Button>

          <Button variant="outline" className="flex-1" asChild>
            <a href="https://wa.me/94123456789" target="_blank">
              <MessageCircle />
              WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
