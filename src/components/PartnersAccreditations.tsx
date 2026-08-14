"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

const PARTNERS = [
  "Hospitals & Specialist Clinics",
  "Elderly Care Facilities & Retirement Homes",
  "Families & Private Households",
  "NGOs & Community Health Organisations",
  "Corporate & Insurance Care Programmes",
];

const STANDARDS = [
  "Rigorous caregiver vetting & background checks",
  "Structured training and care protocols",
  "Individualised, family-reviewed care plans",
  "Quality-checked care outcomes",
];

export default function PartnersAccreditations() {
  return (
    <section className="py-20 md:py-28 lg:py-32 bg-background">
      <div className="container mx-auto">
        {/* Header with image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <span className="type-label inline-flex items-center rounded-full bg-tint text-secondary px-4 py-1.5 mb-6">
              Partners &amp; Care Network
            </span>
            <h2 className="type-h2 text-secondary mb-4">
              A Trusted Care Network, <span className="text-primary-dark">Family-First</span>
            </h2>
            <p className="type-body text-muted max-w-lg">
              Tomlee Home Care works alongside healthcare providers, community organisations, and families to deliver consistent, high-quality home care that people can rely on.
            </p>
          </div>
          <div className="relative h-56 rounded-[1.75rem] overflow-hidden shadow-card">
            <Image
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
              alt="Professional caregiver supporting a client"
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/25 to-transparent" />
          </div>
        </div>

        {/* Partner & standards lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="type-h3 text-secondary mb-6">Who We Work With</h3>
            <ul className="space-y-4">
              {PARTNERS.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle size={14} className="text-primary-dark" />
                  </span>
                  <span className="type-small text-muted leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
            <h3 className="type-h3 text-secondary mb-6">Our Care Standards</h3>
            <ul className="space-y-4">
              {STANDARDS.map((s) => (
                <li key={s} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-tint flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle size={14} className="text-secondary" />
                  </span>
                  <span className="type-small text-muted leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}