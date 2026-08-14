"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

const testimonials = [
  { quote: "Tomlee Home Care has been a blessing for our family. Their caregiver is patient, kind, and truly professional — my mother is thriving at home again.", author: "Mrs. Adebayo", role: "Daughter of a care client" },
  { quote: "The team took time to understand my father's needs and matched him with the perfect carer. The communication and care quality are simply outstanding.", author: "Mr. Nnamdi", role: "Family caregiver" },
  { quote: "From the first assessment to the care plan, everything felt personal and professional. Knowing someone compassionate is with dad while we work brings real peace of mind.", author: "Emeka U.", role: "Care recipient's family" },
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
      <section className="py-20 md:py-28 lg:py-32 bg-surface overflow-x-hidden">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            {/* Left */}
            <div>
              <span className="type-label inline-flex items-center rounded-full bg-tint text-secondary px-4 py-1.5 mb-6">
                Family Stories
              </span>
              <h2 className="type-h2 text-secondary mb-8">
                What Families Say About Us
              </h2>
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Testimonial ${i + 1}`}
                    className={`transition-all duration-300 rounded-full ${i === current ? "w-7 h-2 bg-primary" : "w-2 h-2 bg-secondary/20 hover:bg-secondary/40"}`}
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
                  <div className="text-primary/60 text-6xl md:text-8xl font-serif leading-none mb-3 select-none">&ldquo;</div>
                  <p className="type-body text-secondary/85 font-heading mb-6">
                    {testimonials[current].quote}
                  </p>
                  <p className="text-primary font-heading font-semibold text-xs sm:text-sm uppercase tracking-widest">
                    {testimonials[current].author}
                  </p>
                  <p className="type-small text-muted mt-1">{testimonials[current].role}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-20 md:py-28 lg:py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 to-secondary/80" />
        <div className="relative z-10 container mx-auto">
          <div className="max-w-2xl">
            <span className="type-label inline-flex items-center rounded-full bg-white/10 border border-white/10 text-primary px-4 py-1.5 mb-5">
              Start Today
            </span>
            <h2 className="type-h2 text-white mb-5">
              Give Your Loved One the Best Care, at Home
            </h2>
            <p className="type-body text-white/75 mb-8 max-w-xl">
              Request a free, no-obligation care assessment and discover how Tomlee Home Care can support your family with warmth, dignity, and professional expertise.
            </p>
            <Link
              href="/get-started"
              className="group inline-flex items-center gap-3 bg-primary text-secondary px-6 sm:px-8 py-3.5 sm:py-4 font-heading font-semibold text-sm rounded-full hover:bg-primary-dark hover:text-white active:scale-[0.98] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] w-full sm:w-auto justify-center"
            >
              Request a Care Assessment
              <span className="w-7 h-7 rounded-full bg-white/25 flex items-center justify-center">
                <ArrowRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}