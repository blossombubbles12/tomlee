"use client";

import React, { useState } from "react";
import { Input } from "@/modules/shared/components/forms/Input";
import { ComboBox } from "@/modules/shared/components/forms/ComboBox";
import { Textarea } from "@/modules/shared/components/forms/Textarea";
import { FileUpload } from "@/modules/shared/components/forms/FileUpload";
import { useForm } from "@/modules/shared/hooks/useForm";
import { validators } from "@/modules/shared/validation/rules";
import { INSTITUTIONS, INTEREST_AREAS } from "@/modules/shared/constants";
import { CheckCircle, UserPlus } from "lucide-react";
import PageHero from "@/components/PageHero";
import { submitRepApplication } from "./actions";

export default function ApplyContent() {
  const form = useForm({
    initialValues: {
      fullName: "", country: "", city: "", phone: "", email: "",
      occupation: "", organisation: "", linkedin: "", experience: "",
    },
    onSubmit: async (values) => {
      return submitRepApplication({
        ...values,
        areasOfInterest: interests.join(", "),
        cvUrl,
      });
    },
    validate: (values) => {
      const errors: Record<string, string> = {};
      const nameErr = validators.required(values.fullName, "Full name");
      if (nameErr) errors.fullName = nameErr;
      const countryErr = validators.required(values.country, "Country");
      if (countryErr) errors.country = countryErr;
      const cityErr = validators.required(values.city, "City");
      if (cityErr) errors.city = cityErr;
      const phoneErr = validators.required(values.phone, "Phone");
      if (phoneErr) errors.phone = phoneErr;
      const emailErr = validators.required(values.email, "Email") || validators.email(values.email);
      if (emailErr) errors.email = emailErr;
      const orgErr = validators.required(values.organisation, "Institution");
      if (orgErr) errors.organisation = orgErr;
      return errors;
    },
  });

  const [interests, setInterests] = useState<string[]>([]);
  const [cvUrl, setCvUrl] = useState("");

  if (form.status === "success") {
    return (
      <div className="flex flex-col w-full overflow-x-hidden">
        <PageHero title="Application Submitted" subtitle="Thank you for applying." breadcrumbs={[{ label: "Home", href: "/" }, { label: "Apply" }]} />
        <section className="py-20 bg-surface">
          <div className="container mx-auto text-center max-w-md">
            <CheckCircle size={48} className="text-primary mx-auto mb-4" strokeWidth={1.5} />
            <h2 className="text-2xl font-heading font-bold text-text mb-2">Application Received</h2>
            <p className="text-text/80 text-sm">Our team will review your application and contact you with onboarding information.</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <PageHero
        title="Apply to Become a Representative"
        subtitle="Complete the application form below and our team will review your application."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Representatives", href: "/representatives" }, { label: "Apply" }]}
      />

      <section className="py-12 md:py-20 lg:py-24 bg-surface">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-text mb-4">Representative Application</h2>
              <p className="text-text/85 text-base max-w-xl mx-auto">
                Join the World Impact Africa Global Representative Network. Fill in your details below.
              </p>
            </div>

            <form onSubmit={form.handleSubmit} className="bg-white border border-secondary/10 p-6 md:p-10">
              {form.formError && (
                <div className="bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 mb-6">{form.formError}</div>
              )}

              <h3 className="text-lg font-heading font-bold text-text mb-6">Required Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <Input label="Full Name" name="fullName" value={form.values.fullName} onChange={form.handleChange} error={form.errors.fullName} required />
                <Input label="Country" name="country" value={form.values.country} onChange={form.handleChange} error={form.errors.country} required />
                <Input label="City" name="city" value={form.values.city} onChange={form.handleChange} error={form.errors.city} required />
                <Input label="Phone Number" name="phone" value={form.values.phone} onChange={form.handleChange} error={form.errors.phone} required />
                <Input label="Email Address" name="email" type="email" value={form.values.email} onChange={form.handleChange} error={form.errors.email} required />
                <Input label="Occupation" name="occupation" value={form.values.occupation} onChange={form.handleChange} />
                <ComboBox label="Select Institution" name="organisation" value={form.values.organisation} onChange={(val) => form.setFieldValue("organisation", val)} options={INSTITUTIONS} placeholder="Choose your institution..." error={form.errors.organisation} required />
                <Input label="LinkedIn Profile" name="linkedin" value={form.values.linkedin} onChange={form.handleChange} placeholder="https://linkedin.com/in/..." />
              </div>

              <div className="mb-8">
                <Textarea label="Professional Experience" name="experience" value={form.values.experience} onChange={form.handleChange} rows={4} placeholder="Briefly describe your professional experience..." />
              </div>

              <div className="mb-8">
                <label className="block text-xs font-heading font-semibold text-text mb-1.5 uppercase tracking-wide">Areas of Interest</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {INTEREST_AREAS.map((area) => (
                    <label key={area} className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" checked={interests.includes(area)}
                        onChange={() => setInterests((prev) => prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area])}
                        className="accent-primary w-4 h-4" />
                      <span className="text-text/85 text-sm group-hover:text-text transition-colors">{area}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <FileUpload onUpload={(url) => setCvUrl(url)} value={cvUrl} label="Upload CV (PDF, DOC, DOCX — max 5MB)" />
              </div>

              <div className="text-center">
                <p className="text-text/70 text-xs mb-4">
                  Successful applicants will be contacted and provided with onboarding information.
                </p>
                <button type="submit" disabled={form.status === "submitting"}
                  className="bg-primary text-white px-8 py-3 text-sm font-heading font-semibold hover:bg-secondary transition-colors">
                  {form.status === "submitting" ? "Submitting..." : "Submit Application"} <UserPlus size={16} className="inline ml-1" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
