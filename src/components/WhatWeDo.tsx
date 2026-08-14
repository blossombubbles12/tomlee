"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function WhatWeDo() {
  return (
    <section className="py-24 md:py-32 lg:py-36 bg-[#EAF1F7] overflow-x-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-center">
          {/* ── Image ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-square rounded-[2.5rem] border-[6px] border-white overflow-hidden shadow-card">
              <Image
                src="/images/editorial1.png"
                alt="Caregiver sharing a warm companionship moment with a senior at home"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 42vw"
              />
              <div className="absolute inset-0 bg-secondary/10" />
            </div>
          </motion.div>

          {/* ── Text ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-[2px] bg-primary shrink-0" />
              <span className="type-label text-primary">What We Do</span>
            </div>

            <h2 className="type-h2 text-secondary mb-5">
              A Full Range of <span className="text-primary-dark">Care Services</span>
            </h2>
            <p className="type-body text-muted mb-10 max-w-xl">
              Every care plan is personal. We blend professional expertise with genuine human warmth so your
              loved ones receive support that truly feels like home.
            </p>

            <Link
              href="/solutions"
              className="group inline-flex items-center gap-3 bg-primary text-secondary px-7 sm:px-8 py-3.5 sm:py-4 font-heading font-semibold text-sm rounded-full hover:bg-primary-dark hover:text-white active:scale-[0.98] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-card"
            >
              Explore All Services
              <span className="w-7 h-7 rounded-full bg-white/25 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight size={13} />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}