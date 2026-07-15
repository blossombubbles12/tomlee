"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

const testimonials = [
  { quote: "World Impact Africa transformed our team's capability. Their corporate training programme was practical, relevant, and delivered measurable results.", author: "Adebayo O.", role: "HR Director, First Capital Bank" },
  { quote: "The certification programme gave our staff internationally recognised credentials that have directly improved our service delivery.", author: "Ngozi E.", role: "Training Manager, MTN Nigeria" },
  { quote: "Working with World Impact Africa on our graduate training programme was seamless. They truly understand Africa's workforce needs.", author: "Emeka I.", role: "CEO, TechBridge Solutions" },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-primary overflow-x-hidden">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            {/* Left */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[2px] bg-secondary shrink-0" />
                <span className="text-secondary text-xs font-medium tracking-[0.25em] uppercase">Client Stories</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white leading-tight mb-8">
                What Our Clients Say
              </h2>
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Testimonial ${i + 1}`}
                    className={`transition-all duration-300 rounded-full ${i === current ? "w-7 h-2 bg-secondary" : "w-2 h-2 bg-white/20 hover:bg-white/40"}`}
                  />
                ))}
              </div>
            </div>

            {/* Right — quote */}
            <div className="relative min-h-[180px] md:min-h-[220px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="text-secondary/20 text-6xl md:text-8xl font-serif leading-none mb-3 select-none">&ldquo;</div>
                  <p className="text-white/80 text-base sm:text-lg md:text-xl font-heading leading-relaxed mb-6">
                    {testimonials[current].quote}
                  </p>
                  <p className="text-secondary font-heading font-semibold text-xs sm:text-sm uppercase tracking-widest">
                    {testimonials[current].author}
                  </p>
                  <p className="text-white/45 text-xs mt-1">{testimonials[current].role}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1621857093087-7daa85ab14a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000')" }}
        />
        <div className="absolute inset-0 bg-primary/85" />
        <div className="relative z-10 container mx-auto">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-[2px] bg-secondary shrink-0" />
              <span className="text-secondary text-xs font-medium tracking-[0.25em] uppercase">Start Today</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white leading-tight mb-5">
              Ready to Transform Your Workforce?
            </h2>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
              Partner with World Impact Africa to build high-performance teams through world-class training, certification, and talent solutions.
            </p>
            <Link
              href="/get-started"
              className="group inline-flex items-center gap-2 bg-secondary text-white px-6 sm:px-8 py-3 sm:py-4 font-heading font-semibold text-sm tracking-wide hover:bg-white hover:text-secondary transition-all duration-300 w-full sm:w-auto justify-center sm:justify-start"
            >
              Request a Proposal
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
