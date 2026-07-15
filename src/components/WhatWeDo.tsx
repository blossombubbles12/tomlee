"use client";

import { motion } from "framer-motion";
import { BookOpen, Award, Users } from "lucide-react";
import Link from "next/link";

const PILLARS = [
  {
    icon: BookOpen,
    title: "Corporate Training",
    description: "Customised training programmes designed to improve employee performance, leadership capacity, and operational efficiency.",
    href: "/corporate-training",
    cta: "Learn More",
  },
  {
    icon: Award,
    title: "Professional Certifications",
    description: "Industry-relevant certification programmes designed to validate skills and improve employability and career progression.",
    href: "/certifications",
    cta: "View Certifications",
  },
  {
    icon: Users,
    title: "Talent & Workforce Solutions",
    description: "End-to-end workforce development including training, assessment, certification, and talent pipeline development.",
    href: "/talent-solutions",
    cta: "Explore Solutions",
  },
];

export default function WhatWeDo() {
  return (
    <section className="py-16 md:py-24 bg-white overflow-x-hidden">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-primary shrink-0" />
            <span className="text-primary text-xs font-medium tracking-[0.2em] uppercase">What We Do</span>
            <div className="w-8 h-[2px] bg-primary shrink-0" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text leading-tight mb-4">
            Our <span className="text-secondary">Service Pillars</span>
          </h2>
          <p className="text-text/70 text-sm sm:text-base leading-relaxed">
            Three integrated solutions designed to transform how organisations and individuals build skills for the future.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-surface border border-secondary/10 p-6 md:p-8 hover:border-primary/40 hover:shadow-md transition-all duration-300 group flex flex-col"
            >
              <div className="w-11 h-11 bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <pillar.icon size={20} className="text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-base md:text-lg font-heading font-bold text-text mb-3">{pillar.title}</h3>
              <p className="text-text/80 text-sm leading-relaxed mb-5 flex-1">{pillar.description}</p>
              <Link
                href={pillar.href}
                className="text-xs font-semibold text-primary uppercase tracking-widest hover:text-secondary transition-colors flex items-center gap-2"
              >
                {pillar.cta} →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
