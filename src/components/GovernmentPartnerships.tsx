"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Users, GraduationCap, HeartHandshake, Briefcase, ClipboardList } from "lucide-react";

const PROGRAMS = [
  { icon: Users,          label: "Community elder-care outreach" },
  { icon: GraduationCap,  label: "Caregiver training academies" },
  { icon: HeartHandshake, label: "Family support & caregiving guidance" },
  { icon: Briefcase,      label: "Care placement programmes for vulnerable households" },
  { icon: ClipboardList,  label: "Home care assessments & care coordination" },
];

export default function GovernmentPartnerships() {
  return (
    <section className="py-24 md:py-32 lg:py-36 bg-secondary overflow-x-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Text + image */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          >
            <span className="type-label inline-flex items-center rounded-full bg-white/10 border border-white/10 text-primary px-4 py-1.5 mb-6">
              Community &amp; Public Collaboration
            </span>
            <h2 className="type-h2 text-white mb-5">
              Caring for Communities,<br />
              <span className="text-primary">Together</span>
            </h2>
            <p className="type-body text-white/80 mb-6">
              Tomlee Home Care partners with government agencies, health services, and community organisations to expand access to quality home care for the people who need it most.
            </p>
            <div className="relative h-40 sm:h-48 rounded-[1.5rem] border-[6px] border-white/20 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
                alt="Caregivers joining hands in community"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-secondary/30" />
            </div>
          </motion.div>

          {/* Programme list */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.32, 0.72, 0, 1] }}
            className="mt-4 lg:mt-0"
          >
            <ul className="space-y-3">
              {PROGRAMS.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-4 bg-white/10 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border border-white/10 hover:bg-white/15 transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]">
                  <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-primary" strokeWidth={1.5} />
                  </div>
                  <span className="type-small text-white/80">{label}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}