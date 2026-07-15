"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { value: 500, suffix: "+", label: "Professionals Trained" },
  { value: 50,  suffix: "+", label: "Corporate Clients" },
  { value: 10,  suffix: "+", label: "Certification Programmes" },
  { value: 5,   suffix: "+", label: "Years of Impact" },
];

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let t0: number | null = null;
    const step = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setCount(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function Stat({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const count = useCountUp(value, 1800, visible);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="flex flex-col items-center text-center border-l-2 border-secondary/30 pl-4 md:pl-6"
    >
      <span className="text-3xl sm:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-secondary tabular-nums">
        {count}{suffix}
      </span>
      <span className="mt-2 text-[10px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] text-text/70">
        {label}
      </span>
    </motion.div>
  );
}

export default function StatsCounter() {
  return (
    <section className="py-12 md:py-20 bg-primary overflow-x-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {stats.map((s, i) => (
            <Stat key={s.label} {...s} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
