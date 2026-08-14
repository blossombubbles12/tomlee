"use client";
import { motion } from "framer-motion";
import { UserRound, HeartPulse, Baby, BedDouble, Home, Accessibility } from "lucide-react";

const industries = [
  { icon: UserRound,    title: "Elderly Care",               description: "Compassionate daily living support that helps seniors stay safe, active, and independent at home." },
  { icon: HeartPulse,   title: "Post-Surgery Recovery",      description: "Clinical-level assistance during recovery — wound care support, medication routines, and mobility help." },
  { icon: BedDouble,    title: "Chronic Condition Care",     description: "Long-term support for clients living with diabetes, stroke recovery, and other ongoing health needs." },
  { icon: Accessibility,title: "Disability Support",         description: "Skilled, patient care professionals who help clients with physical or cognitive disabilities live fully." },
  { icon: Baby,         title: "Postnatal & New Mum Care",   description: "Gentle, expert support for new families during the precious early months at home." },
  { icon: Home,         title: "End-of-Life & Palliative",   description: "Dignified, compassionate care that comforts clients and families at the most sensitive moments." },
];

export default function IndustriesCards() {
  return (
    <section className="py-20 md:py-28 lg:py-32 bg-background">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <span className="type-label inline-flex items-center rounded-full bg-tint text-secondary px-4 py-1.5 mb-6">
              Who We Care For
            </span>
            <h2 className="type-h2 text-secondary">
              Tailored Care for Every Stage of Life
            </h2>
          </div>
          <p className="type-body text-muted max-w-sm md:text-right">
            Tomlee Home Care matches every client with the right caregiver and the right care plan — however complex the need.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map(({ icon: Icon, title, description }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
              className="group bg-surface border border-secondary/8 rounded-[1.5rem] p-8 hover:border-primary/40 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center group-hover:bg-primary/15 transition-colors duration-300 shadow-card">
                  <Icon size={22} className="text-secondary" strokeWidth={1.5} />
                </div>
                <h3 className="type-h3 text-secondary">{title}</h3>
              </div>
              <p className="type-small text-muted leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}