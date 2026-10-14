"use client";

import { type FormEvent, useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type CareerApplicationValues = {
  position: string;
  name: string;
  phone: string;
  email: string;
  cvLink: string;
  message: string;
};

const initialValues: CareerApplicationValues = {
  position: "",
  name: "",
  phone: "",
  email: "",
  cvLink: "",
  message: ""
};

function buildApplicationMessage(values: CareerApplicationValues) {
  return [
    "I wish to apply for a position with VidhiSatya.",
    "",
    `Position: ${values.position || "[please write position]"}`,
    `Name: ${values.name || "[please write name]"}`,
    `Phone: ${values.phone || "[please write phone]"}`,
    `Email: ${values.email || "[please write email]"}`,
    `CV Link / Attachment Note: ${values.cvLink || "[please attach CV or share link]"}`,
    "",
    values.message ? `Message: ${values.message}` : "Message: I request an interview for the above position."
  ].join("\n");
}

export function CareerApplicationForm() {
  const [values, setValues] = useState<CareerApplicationValues>(initialValues);

  const applicationMessage = useMemo(() => buildApplicationMessage(values), [values]);
  const whatsappHref = `https://wa.me/919891147979?text=${encodeURIComponent(applicationMessage)}`;
  const emailHref = `mailto:rajeshnarang@vidhisatya.com?subject=${encodeURIComponent(
    `VidhiSatya Career Application - ${values.position || "Position"}`
  )}&body=${encodeURIComponent(applicationMessage)}`;

  function updateValue(field: keyof CareerApplicationValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function submitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.open(whatsappHref, "_blank", "noopener,noreferrer");
    window.location.href = emailHref;
  }

  return (
    <form onSubmit={submitApplication} className="mt-5 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="career-position">Position Applied For</Label>
          <Input
            id="career-position"
            required
            value={values.position}
            onChange={(event) => updateValue("position", event.target.value)}
            placeholder="Enter position"
          />
        </div>
        <div>
          <Label htmlFor="career-name">Full Name</Label>
          <Input
            id="career-name"
            required
            value={values.name}
            onChange={(event) => updateValue("name", event.target.value)}
            placeholder="Enter full name"
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="career-phone">Phone / WhatsApp</Label>
          <Input
            id="career-phone"
            required
            value={values.phone}
            onChange={(event) => updateValue("phone", event.target.value)}
            placeholder="Enter phone number"
          />
        </div>
        <div>
          <Label htmlFor="career-email">Email</Label>
          <Input
            id="career-email"
            type="email"
            required
            value={values.email}
            onChange={(event) => updateValue("email", event.target.value)}
            placeholder="Enter email"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="career-cv">CV Link / Attachment Note</Label>
        <Input
          id="career-cv"
          required
          value={values.cvLink}
          onChange={(event) => updateValue("cvLink", event.target.value)}
          placeholder="Paste CV link or mention that CV will be attached"
        />
      </div>
      <div>
        <Label htmlFor="career-message">Message</Label>
        <Textarea
          id="career-message"
          rows={4}
          value={values.message}
          onChange={(event) => updateValue("message", event.target.value)}
          placeholder="Add brief experience, availability, or interview request"
        />
      </div>
      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-[0.75rem] bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-ambient sm:w-auto"
      >
        Submit Application
      </button>
    </form>
  );
}
