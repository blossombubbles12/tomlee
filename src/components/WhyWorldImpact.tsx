"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Globe, BookOpen, Award, BarChart3, Users, Layers } from "lucide-react";

const REASONS = [
  { icon: Globe,     title: "Africa-Focused",               description: "Built specifically for the African workforce context — our programmes are locally relevant and globally competitive." },
  { icon: BookOpen,  title: "Industry-Aligned Curriculum",  description: "Our training content is developed in collaboration with industry experts to ensure real-world applicability." },
  { icon: Award,     title: "Recognised Certifications",    description: "Our certifications validate skills against industry standards, improving employability and career progression." },
  { icon: BarChart3, title: "Measurable Outcomes",          description: "We track and report on the impact of every programme, ensuring organisations see tangible returns." },
  { icon: Users,     title: "Experienced Facilitators",     description: "Our trainers and assessors are seasoned industry practitioners with deep subject expertise." },
  { icon: Layers,    title: "Scalable Solutions",           description: "From individual certification to enterprise-wide workforce transformation — we scale to meet your needs." },
];

export default function WhyWorldImpact() {
  return (
    <section className="py-12 md:py-20 lg:py-24 bg-surface">
      <div className="container mx-auto">
        {/* Header with background image banner */}
        <div className="relative h-40 mb-16 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1621857093087-7daa85ab14a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000"
            alt="Why World Impact Africa — professional workforce development"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-secondary/80" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="w-8 h-[2px] bg-primary" />
              <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">Why World Impact Africa</span>
              <div className="w-8 h-[2px] bg-primary" />
            </div>
            <h2 className="text-3xl md:text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white">
              Built for <span className="text-primary">Impact.</span>{" "}
              Driven by <span className="text-primary">Results.</span>
            </h2>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-white p-8 border border-secondary/10 hover:border-primary/30 hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-secondary/10 flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                <item.icon size={22} className="text-secondary" strokeWidth={1.5} />
              </div>
              <div className="w-6 h-[2px] bg-primary/40 mb-4" />
              <h3 className="text-base font-heading font-semibold text-text mb-3">{item.title}</h3>
              <p className="text-text/80 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
