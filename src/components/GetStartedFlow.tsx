"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Building2, UserCircle, Landmark, ArrowRight } from "lucide-react";
import Link from "next/link";

const IMG_GETSTARTED = "https://images.unsplash.com/photo-1655720357872-ce227e4164ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200";

const AUDIENCES = [
  {
    key: "organisations",
    label: "For Organisations",
    icon: Building2,
    description: "Corporate training, workforce development, and talent solutions for businesses and enterprises.",
    fields: [
      { id: "orgName",    label: "Organisation Name", type: "text",  required: true,  placeholder: "Your company name" },
      { id: "orgContact", label: "Contact Person",    type: "text",  required: true,  placeholder: "Your full name" },
      { id: "orgEmail",   label: "Email Address",     type: "email", required: true,  placeholder: "your@organisation.com" },
      { id: "orgNeed",    label: "Training Need",     type: "text",  required: false, placeholder: "e.g. Leadership training for 50 managers" },
    ],
  },
  {
    key: "individuals",
    label: "For Individuals",
    icon: UserCircle,
    description: "Certification programmes and professional training for individuals advancing their careers.",
    fields: [
      { id: "indName",     label: "Full Name",              type: "text",  required: true,  placeholder: "Your full name" },
      { id: "indEmail",    label: "Email Address",          type: "email", required: true,  placeholder: "your@email.com" },
      { id: "indInterest", label: "Programme of Interest",  type: "text",  required: false, placeholder: "e.g. Certified Project Management Professional" },
    ],
  },
  {
    key: "governments",
    label: "For Governments",
    icon: Landmark,
    description: "Partnership programmes, public workforce assessments, and community training for government agencies.",
    fields: [
      { id: "govAgency",  label: "Agency / Ministry", type: "text",  required: true,  placeholder: "Agency or ministry name" },
      { id: "govContact", label: "Contact Person",    type: "text",  required: true,  placeholder: "Your full name" },
      { id: "govEmail",   label: "Email Address",     type: "email", required: true,  placeholder: "your@agency.gov.ng" },
      { id: "govScope",   label: "Programme Scope",   type: "text",  required: false, placeholder: "e.g. Digital skills training for 500 civil servants" },
    ],
  },
];

export default function GetStartedFlow() {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const audience = AUDIENCES.find((a) => a.key === selected);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="py-12 md:py-20 lg:py-24 bg-surface overflow-x-hidden">
      <div className="container mx-auto">

        {/* Intro image banner */}
        <div className="relative h-36 md:h-44 mb-8 md:mb-12 overflow-hidden">
          <Image src={IMG_GETSTARTED} alt="Get started with World Impact Africa" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-secondary/70" />
          <div className="absolute inset-0 flex flex-col justify-center px-10">
            <p className="text-primary text-xs font-medium tracking-[0.3em] uppercase mb-2">Start Your Journey</p>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white">Select who you are to get the right solution</h2>
          </div>
        </div>

        {/* Audience selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          {AUDIENCES.map((a) => (
            <button
              key={a.key}
              onClick={() => { setSelected(a.key); setSubmitted(false); }}
              className={`text-left p-8 border transition-all duration-300 ${
                selected === a.key
                  ? "border-primary bg-white shadow-md"
                  : "border-secondary/10 bg-white hover:border-primary/40"
              }`}
            >
              <div
                className={`w-12 h-12 flex items-center justify-center mb-4 ${
                  selected === a.key ? "bg-primary" : "bg-primary/10"
                }`}
              >
                <a.icon size={22} className={selected === a.key ? "text-white" : "text-primary"} strokeWidth={1.5} />
              </div>
              <h3 className="text-base font-heading font-bold text-text mb-2">{a.label}</h3>
              <p className="text-text/80 text-sm leading-relaxed">{a.description}</p>
            </button>
          ))}
        </div>

        {/* Contextual form */}
        <AnimatePresence mode="wait">
          {selected && audience && !submitted && (
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-secondary/10 p-5 sm:p-8 w-full max-w-2xl"
            >
              <h3 className="text-xl font-heading font-bold text-text mb-6">
                {audience.label} — Tell Us About Your Needs
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                {audience.fields.map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="block text-xs font-semibold text-text/85 uppercase tracking-widest mb-2"
                    >
                      {field.label}{" "}
                      {field.required && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      required={field.required}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 border border-secondary/20 text-sm text-text bg-surface focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    />
                  </div>
                ))}
                <div className="flex items-center gap-4 pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-primary text-white px-5 sm:px-6 py-3 font-heading font-semibold text-xs sm:text-sm tracking-wide hover:bg-secondary transition-colors w-full sm:w-auto justify-center sm:justify-start"
                  >
                    Submit Enquiry <ArrowRight size={15} />
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {selected && submitted && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 border border-green-200 p-8 max-w-2xl text-center"
            >
              <div className="text-4xl mb-4">✓</div>
              <h3 className="text-xl font-heading font-bold text-green-800 mb-2">Enquiry Submitted!</h3>
              <p className="text-green-700 text-sm">Thank you. Our team will be in touch within 24 hours.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Direct contact fallback */}
        <p className="mt-8 text-sm text-text/70">
          Prefer to contact us directly?{" "}
          <Link href="/contact" className="text-primary hover:text-secondary underline underline-offset-2 transition-colors">
            Send us a message
          </Link>
        </p>
      </div>
    </section>
  );
}
