"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { value: 500, suffix: "+", label: "Lives Supported" },
  { value: 50,  suffix: "+", label: "Community Partners" },
  { value: 10,  suffix: "+", label: "Care Programmes" },
  { value: 5,   suffix: "+", label: "Years of Trust" },
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
      className="flex flex-col items-center text-center border-l-2 border-primary/30 pl-4 md:pl-6"
    >
      <span className="type-h3 text-primary-dark tabular-nums">
        {count}{suffix}
      </span>
      <span className="type-label text-white/70 mt-2">
        {label}
      </span>
    </motion.div>
  );
}

export default function StatsCounter() {
  return (
    <section className="py-14 md:py-20 bg-secondary overflow-x-hidden">
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