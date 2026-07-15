"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

const PARTNERS = [
  "Corporate Organisations & Enterprise Businesses",
  "Government Ministries, Agencies & Public Institutions",
  "Non-Governmental & Development Organisations",
  "Academic & Training Institutions",
  "Industry & Professional Bodies",
];

const STANDARDS = [
  "Industry-relevant training delivery",
  "Competency-based assessment systems",
  "Standardised certification processes",
  "Quality-driven learning outcomes",
];

export default function PartnersAccreditations() {
  return (
    <section className="py-12 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto">
        {/* Header with image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-8 h-[2px] bg-primary" />
              <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">Partners & Accreditations</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text leading-tight mb-4">
              A Trusted Network Across <span className="text-secondary">Africa</span>
            </h2>
            <p className="text-text/70 text-base leading-relaxed max-w-lg">
              World Impact Africa collaborates with a wide network of stakeholders across Africa&apos;s workforce ecosystem, operating in alignment with recognised workforce development standards.
            </p>
          </div>
          <div className="relative h-56 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1528901166007-3784c7dd3653?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
              alt="Partnership network — professional working on laptop"
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-primary/15" />
          </div>
        </div>

        {/* Partner & standards lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="text-lg font-heading font-bold text-text mb-6">Our Partners Include</h3>
            <ul className="space-y-4">
              {PARTNERS.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-primary shrink-0 mt-0.5" />
                  <span className="text-text/85 text-sm leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
            <h3 className="text-lg font-heading font-bold text-text mb-6">Our Credibility & Standards</h3>
            <ul className="space-y-4">
              {STANDARDS.map((s) => (
                <li key={s} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-secondary shrink-0 mt-0.5" />
                  <span className="text-text/85 text-sm leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
