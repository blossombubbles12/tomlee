"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomeClosingCTA() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-secondary">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1627599936744-51d288f89af4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000')" }}
      />
      <div className="relative z-10 container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-[2px] bg-primary shrink-0" />
            <span className="text-primary text-xs font-medium tracking-[0.25em] uppercase">Get Started</span>
            <div className="w-8 h-[2px] bg-primary shrink-0" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight mb-5">
            Ready to Upgrade Your Workforce?
          </h2>
          <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed mb-8">
            Partner with World Impact Africa to build a skilled, productive, and future-ready workforce.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/get-started"
              className="group inline-flex items-center gap-2 bg-primary text-white px-6 sm:px-8 py-3 sm:py-4 font-heading font-semibold text-sm tracking-wide hover:bg-primary/90 transition-all duration-300 w-full sm:w-auto justify-center"
            >
              Request Corporate Proposal
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-white/80 hover:text-primary text-sm font-medium tracking-widest uppercase border-b border-white/30 hover:border-primary pb-1 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
