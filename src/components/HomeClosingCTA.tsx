"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomeClosingCTA() {
  return (
    <section className="relative py-20 md:py-28 lg:py-32 overflow-hidden bg-[#E9F4EE]">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.07]"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1543269865-cbf427effbad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000')" }}
      />
      <div className="relative z-10 container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className="max-w-3xl mx-auto"
        >
          <span className="type-label inline-flex items-center rounded-full bg-white/70 text-secondary px-4 py-1.5 mb-6">
            Get Started
          </span>
          <h2 className="type-h2 text-secondary mb-5">
            Compassionate Care, Right at Home
          </h2>
          <p className="type-body text-secondary/80 mb-9 max-w-2xl mx-auto">
            Talk to our care team today and let us help your family find the right caregiver — with dignity, respect, and professional care your loved ones deserve.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/get-started"
              className="group inline-flex items-center gap-3 bg-primary text-secondary px-7 sm:px-9 py-3.5 sm:py-4 font-heading font-semibold text-sm rounded-full hover:bg-primary-dark hover:text-white active:scale-[0.98] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] w-full sm:w-auto justify-center"
            >
              Request Care
              <span className="w-7 h-7 rounded-full bg-white/25 flex items-center justify-center">
                <ArrowRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-secondary/80 hover:text-primary text-sm font-medium tracking-widest uppercase border-b border-secondary/30 hover:border-primary pb-1 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}