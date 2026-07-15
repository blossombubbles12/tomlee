"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function WhoWeAre() {
  return (
    <section className="py-16 md:py-24 bg-surface overflow-x-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-primary shrink-0" />
              <span className="text-primary text-xs font-medium tracking-[0.2em] uppercase">Who We Are</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text leading-tight mb-5">
              Africa&apos;s Workforce<br />
              <span className="text-secondary">Development Partner</span>
            </h2>
            <p className="text-text/80 text-sm sm:text-base leading-relaxed mb-4">
              World Impact Africa is a workforce development organisation focused on closing the gap between education and industry performance across Africa.
            </p>
            <p className="text-text/80 text-sm sm:text-base leading-relaxed">
              We design and deliver corporate training, professional certifications, and workforce solutions that equip individuals and organisations with practical, job-ready skills.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 mt-8">
              {[
                { number: "500+", label: "Professionals Trained" },
                { number: "50+",  label: "Corporate Clients" },
                { number: "10+",  label: "Certification Programmes" },
                { number: "5+",   label: "Years of Impact" },
              ].map((item) => (
                <div key={item.label} className="bg-white p-4 border border-secondary/10">
                  <p className="text-2xl md:text-3xl font-heading font-bold text-primary mb-1">{item.number}</p>
                  <p className="text-[10px] md:text-xs text-text/70 uppercase tracking-widest">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image collage — hidden on very small, shown sm+ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="grid grid-cols-2 gap-3 mt-8 lg:mt-0"
          >
            <div className="relative h-44 sm:h-52 col-span-2 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1573164574511-73c773193279?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
                alt="World Impact Africa professionals in a collaborative meeting"
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-secondary/10" />
            </div>
            <div className="relative h-32 sm:h-36 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1744809482817-9a9d4fc280af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                alt="Corporate training session"
                fill
                className="object-cover"
                sizes="(max-width:768px) 50vw, 25vw"
              />
            </div>
            <div className="relative h-32 sm:h-36 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1655720357872-ce227e4164ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                alt="Team collaboration at World Impact Africa"
                fill
                className="object-cover"
                sizes="(max-width:768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-primary/10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
