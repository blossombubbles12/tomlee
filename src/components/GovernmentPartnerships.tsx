"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Users, GraduationCap, Monitor, Briefcase, ClipboardList } from "lucide-react";

const PROGRAMS = [
  { icon: Users,         label: "Youth empowerment initiatives" },
  { icon: GraduationCap, label: "Community skills development programmes" },
  { icon: Monitor,       label: "Digital and vocational training projects" },
  { icon: Briefcase,     label: "Employability and entrepreneurship programmes" },
  { icon: ClipboardList, label: "Large-scale workforce assessments and certification" },
];

export default function GovernmentPartnerships() {
  return (
    <section className="py-16 md:py-24 bg-strip-pattern overflow-x-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Text + image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-primary shrink-0" />
              <span className="text-primary text-xs font-medium tracking-[0.2em] uppercase">Government Partnerships</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight mb-5">
              Community Impact &<br />
              <span className="text-primary">Public Sector</span> Collaboration
            </h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-6">
              World Impact Africa partners with government agencies to deliver community-based training programmes aimed at reducing unemployment and improving workforce readiness across Africa.
            </p>
            <div className="relative h-40 sm:h-44 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1740208376134-67da8e85ccf3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
                alt="Government partnership — community hands together"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-secondary/40" />
            </div>
          </motion.div>

          {/* Programme list */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-4 lg:mt-0"
          >
            <ul className="space-y-3">
              {PROGRAMS.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-4 bg-white/10 px-4 sm:px-6 py-3 sm:py-4 border border-white/10 hover:bg-white/15 transition-colors">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 bg-primary/20 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-primary" strokeWidth={1.5} />
                  </div>
                  <span className="text-white/80 text-xs sm:text-sm">{label}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
