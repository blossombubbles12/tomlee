"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function IndustriesServed() {
  return (
    <section className="py-24 md:py-32 lg:py-36 bg-[#FFF6E5] overflow-x-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-center">
          {/* ── Text ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
            className="lg:col-span-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-[2px] bg-primary shrink-0" />
              <span className="type-label text-primary">Who We Care For</span>
            </div>

            <h2 className="type-h2 text-secondary mb-6">
              Tailored Care for Every<br />
              <span className="text-primary-dark">Stage of Life</span>
            </h2>
            <p className="type-body text-muted mb-10 max-w-xl">
              Tomlee Home Care matches every client with the right caregiver and the right care plan —
              however complex the need.
            </p>

            <Link
              href="/get-started"
              className="group inline-flex items-center gap-3 bg-primary text-secondary px-7 sm:px-8 py-3.5 sm:py-4 font-heading font-semibold text-sm rounded-full hover:bg-primary-dark hover:text-white active:scale-[0.98] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-card"
            >
              Request a Care Plan
              <span className="w-7 h-7 rounded-full bg-white/25 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight size={13} />
              </span>
            </Link>
          </motion.div>

          {/* ── Image ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.32, 0.72, 0, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-square rounded-[2.5rem] border-[6px] border-white overflow-hidden shadow-card">
              <Image
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400"
                alt="Professional caregiver supporting a client during home care"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-secondary/10" />
            </div>

            {/* Floating navy accent card */}
            <div className="absolute -bottom-6 right-6 sm:right-10 bg-secondary text-white rounded-2xl shadow-card px-6 py-5">
              <p className="text-2xl md:text-3xl font-heading font-bold text-primary mb-1">24/7</p>
              <p className="type-label text-white/70">Live-In &amp; Visiting Care</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}