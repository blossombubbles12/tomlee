"use client";
import { motion } from "framer-motion";
import { Landmark, Flame, Radio, Building2, Store, Heart } from "lucide-react";

const industries = [
  { icon: Landmark,  title: "Banking & Finance",            description: "Equipping finance professionals with the skills to navigate a rapidly evolving sector." },
  { icon: Flame,     title: "Oil & Gas",                    description: "Technical and leadership training for Nigeria's most critical industry." },
  { icon: Radio,     title: "Telecommunications",           description: "Building digital and operational capability across telecoms organisations." },
  { icon: Building2, title: "Government & Public Sector",   description: "Workforce development and certification programmes for public institutions." },
  { icon: Store,     title: "SMEs & Startups",              description: "Practical skills and certifications to help growing businesses scale." },
  { icon: Heart,     title: "NGOs & Development Agencies",  description: "Capacity building for organisations driving social impact across Africa." },
];

export default function IndustriesServed() {
  return (
    <section className="py-12 md:py-20 lg:py-24 bg-surface">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-8 h-[2px] bg-primary" />
              <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">Sectors We Cover</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text leading-tight">Industries We Serve</h2>
          </div>
          <p className="text-text/70 text-sm leading-relaxed max-w-sm md:text-right">
            World Impact Africa delivers workforce development expertise across Africa&apos;s key economic sectors.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map(({ icon: Icon, title, description }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="bg-white p-8 border border-secondary/10 hover:border-primary/30 hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-10 h-10 bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon size={20} className="text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-heading font-semibold text-text uppercase tracking-widest">{title}</h3>
              </div>
              <p className="text-text/80 text-sm leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
