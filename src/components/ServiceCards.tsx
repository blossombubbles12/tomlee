"use client";

import { motion } from "framer-motion";
import { HeartHandshake, ShieldCheck, Sun, Users, Home, UserRound } from "lucide-react";
import Link from "next/link";

const PILLARS = [
  {
    icon: HeartHandshake,
    title: "Companion Care",
    description: "Warm companionship, emotional support, and daily engagement that keeps clients connected, active, and content.",
    href: "/solutions",
    cta: "Learn More",
  },
  {
    icon: ShieldCheck,
    title: "Personal & Clinical Care",
    description: "Assistance with daily living, medication support, mobility help, and specialist care for recovery and chronic conditions.",
    href: "/solutions",
    cta: "View Care Services",
  },
  {
    icon: Home,
    title: "Live-In Home Care",
    description: "Round-the-clock support from a trusted caregiver who becomes part of the household — around the clock, at home.",
    href: "/solutions",
    cta: "Explore Home Care",
  },
  {
    icon: Users,
    title: "Respite & Family Support",
    description: "Professional relief care that gives family carers breathing room, knowing their loved one is in capable, caring hands.",
    href: "/solutions",
    cta: "Request Support",
  },
  {
    icon: Sun,
    title: "Dementia & Specialist Care",
    description: "Trained, patient caregivers who deliver structured, compassionate support for clients living with dementia and memory loss.",
    href: "/solutions",
    cta: "Specialist Care",
  },
  {
    icon: UserRound,
    title: "Caregiver Placements",
    description: "Carefully matched, vetted care professionals placed into your home through a transparent, family-first process.",
    href: "/representatives",
    cta: "Meet Our Carers",
  },
];

export default function ServiceCards() {
  return (
    <section className="py-20 md:py-28 lg:py-32 bg-surface overflow-x-hidden">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-20">
          <span className="type-label inline-flex items-center rounded-full bg-tint text-secondary px-4 py-1.5 mb-6">
            Service Features
          </span>
          <h2 className="type-h2 text-secondary mb-4">
            A Full Range of <span className="text-primary-dark">Care Services</span>
          </h2>
          <p className="type-body text-muted">
            Every care plan is personal. We blend professional expertise with genuine human warmth so your loved ones receive support that truly feels like home.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
              className="group bg-white border border-secondary/8 rounded-[1.5rem] p-7 md:p-9 hover:border-primary/40 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col"
            >
              <div className="w-12 h-12 rounded-2xl bg-tint flex items-center justify-center mb-6 group-hover:bg-primary/15 transition-colors duration-300">
                <pillar.icon size={22} className="text-secondary" strokeWidth={1.5} />
              </div>
              <h3 className="type-h3 text-secondary mb-3">{pillar.title}</h3>
              <p className="type-small text-muted leading-relaxed mb-6 flex-1">{pillar.description}</p>
              <Link
                href={pillar.href}
                className="inline-flex items-center gap-2 text-xs font-semibold text-primary-dark uppercase tracking-widest hover:text-secondary transition-colors"
              >
                {pillar.cta}
                <span className="w-6 h-6 rounded-full bg-tint flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <span className="text-secondary">→</span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}