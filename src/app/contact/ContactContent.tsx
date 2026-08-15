"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { Mail, Phone, MapPin } from "lucide-react";
import { submitContactForm } from "@/app/actions";

const IMG_CONTACT = "https://images.unsplash.com/photo-1556761175-b413da4baf72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200";

type FormData = {
  fullName: string;
  organisation: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;
type FormStatus = "idle" | "submitting" | "success" | "error";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ContactContent() {
  const [form, setForm] = useState<FormData>({
    fullName: "", organisation: "", email: "", phone: "", service: "", message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  function validateField(name: keyof FormData, value: string): string {
    if (name === "fullName" && !value.trim()) return "Full name is required.";
    if (name === "email") {
      if (!value.trim()) return "Email address is required.";
      if (!validateEmail(value)) return "Please enter a valid email address.";
    }
    if (name === "service" && !value) return "Please select a service.";
    if (name === "message" && !value.trim()) return "Message is required.";
    return "";
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    const error = validateField(name as keyof FormData, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: FormErrors = {};
    (["fullName", "email", "service", "message"] as const).forEach(field => {
      const error = validateField(field, form[field]);
      if (error) newErrors[field] = error;
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setStatus("submitting");
    try {
      const result = await submitContactForm({
        fullName: form.fullName,
        organisation: form.organisation,
        email: form.email,
        phone: form.phone,
        service: form.service,
        message: form.message,
      });
      if (result.success) {
        setStatus("success");
        setForm({ fullName: "", organisation: "", email: "", phone: "", service: "", message: "" });
        setErrors({});
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputClass = (field: keyof FormData) =>
    `w-full px-4 py-3 border text-sm text-text bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors ${
      errors[field] ? "border-red-400" : "border-secondary/20 focus:border-primary"
    }`;

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <PageHero title="Contact Us" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]} />

      <section className="py-12 md:py-20 lg:py-24 bg-surface">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">

            {/* Contact Info */}
            <div className="lg:col-span-1">
              {/* Image */}
              <div className="relative h-48 mb-8 overflow-hidden">
                <Image src={IMG_CONTACT} alt="Tomlee Home Care care team ready to help" fill className="object-cover" sizes="(max-width:1024px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-secondary/60" />
                <div className="absolute inset-0 flex items-end p-6">
                  <p className="text-white text-sm font-heading font-semibold">We&apos;re ready to support your family.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-8 h-[2px] bg-primary" />
                <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">Get In Touch</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-text mb-4">We&apos;re Ready to Help</h2>
              <p className="text-text/80 text-sm leading-relaxed mb-8">
                Whether you need personal home care, elderly &amp; companion care, or specialist care — our care team is ready to support your loved one.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail size={16} className="text-primary" />
                  </div>
                  <a href="mailto:info@tomleehomecare.ng" className="text-sm text-text/85 hover:text-primary transition-colors">
                    info@tomleehomecare.ng
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone size={16} className="text-primary" />
                  </div>
                  <a href="tel:+14049997936" className="text-sm text-text/85 hover:text-primary transition-colors">
                    +1 404-999-7936
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin size={16} className="text-primary" />
                  </div>
                  <span className="text-sm text-text/85 leading-relaxed">
                    Lawrenceville, GA 30044, USA
                  </span>
                </li>
              </ul>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border border-green-200 p-8 text-center"
                >
                  <div className="text-4xl mb-4">✓</div>
                  <h3 className="text-xl font-heading font-bold text-green-800 mb-2">Message Sent!</h3>
                  <p className="text-green-700 text-sm">Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {status === "error" && (
                    <div className="bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                      Something went wrong. Please try again or email us directly at{" "}
                      <a href="mailto:info@tomleehomecare.ng" className="underline">info@tomleehomecare.ng</a>.
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-semibold text-text/85 uppercase tracking-widest mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input id="fullName" name="fullName" type="text" value={form.fullName}
                        onChange={handleChange} onBlur={handleBlur}
                        className={inputClass("fullName")} placeholder="Your full name" />
                      {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
                    </div>
                    <div>
                      <label htmlFor="organisation" className="block text-xs font-semibold text-text/85 uppercase tracking-widest mb-2">
                        Organisation
                      </label>
                      <input id="organisation" name="organisation" type="text" value={form.organisation}
                        onChange={handleChange} onBlur={handleBlur}
                        className={inputClass("organisation")} placeholder="Care recipient / family name (optional)" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-text/85 uppercase tracking-widest mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input id="email" name="email" type="email" value={form.email}
                        onChange={handleChange} onBlur={handleBlur}
                        className={inputClass("email")} placeholder="your@email.com" />
                      {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-text/85 uppercase tracking-widest mb-2">
                        Phone Number
                      </label>
                      <input id="phone" name="phone" type="tel" value={form.phone}
                        onChange={handleChange} onBlur={handleBlur}
                        className={inputClass("phone")} placeholder="+1 404 ... (optional)" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-xs font-semibold text-text/85 uppercase tracking-widest mb-2">
                      Service Interested In <span className="text-red-500">*</span>
                    </label>
                    <select id="service" name="service" value={form.service}
                      onChange={handleChange} onBlur={handleBlur}
                      className={inputClass("service")}>
                      <option value="">Select a service...</option>
                      <option value="Personal Home Care">Personal Home Care</option>
                      <option value="Elderly & Companion Care">Elderly &amp; Companion Care</option>
                      <option value="Specialist Care Services">Specialist Care Services</option>
                      <option value="Care Professional Network">Care Professional Network</option>
                      <option value="General Enquiry">General Enquiry</option>
                    </select>
                    {errors.service && <p className="mt-1 text-xs text-red-500">{errors.service}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-text/85 uppercase tracking-widest mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea id="message" name="message" rows={5} value={form.message}
                      onChange={handleChange} onBlur={handleBlur}
                      className={inputClass("message")} placeholder="Tell us about your loved one's care needs..." />
                    {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="bg-primary text-white px-5 sm:px-8 py-3 sm:py-4 font-heading font-semibold text-xs sm:text-sm tracking-wide hover:bg-secondary transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? "Sending..." : "Send Request"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
