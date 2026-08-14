"use client";

import { motion } from "framer-motion";
import { Users, ClipboardCheck, HeartPulse, ShieldCheck, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";

const IMG_SPECIALIST  = "https://images.unsplash.com/photo-1584515933487-779824d29309?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200";
const IMG_CARRING     = "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200";

const SERVICES = [
  { icon: ShieldCheck, title: "Vetted Care Professionals",      desc: "Background-verified, trained professionals matched to your loved one's needs." },
  { icon: HeartPulse,  title: "Recovery & Post-Surgical Care",   desc: "Specialist support during recovery, post-operative periods, and chronic conditions." },
  { icon: ClipboardCheck, title: "Dementia & Memory Support",    desc: "Patient, structured care for clients living with dementia or memory conditions." },
  { icon: Users,       title: "Flexible Scheduling",             desc: "Hourly visits, overnight stays, or live-in care — tailored to your family's routine." },
];

const VALUE_PROPS = [
  { metric: "24/7", label: "Care Availability",   desc: "Day, night, or live-in support — whenever your family needs it." },
  { metric: "100%", label: "Vetted Professionals", desc: "Every professional passes background and reference checks." },
  { metric: "5★",   label: "Family Satisfaction", desc: "Families consistently rate our care professionals highly." },
];

export default function TalentSolutionsContent() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <PageHero
        title="Specialist Care Services"
        subtitle="Vetted, trained specialists for recovery, dementia, and complex home care needs."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Specialist Care" }]}
      />

      {/* Services — with intro image */}
      <section className="py-12 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-8 h-[2px] bg-primary" />
                <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">Our Services</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-text mb-4">Specialist Care for Every Home</h2>
              <p className="text-text/80 text-base leading-relaxed">
                From recovery care to dementia and memory support — we connect families with trained specialists who make complex care manageable at home.
              </p>
            </div>
            <div className="relative h-64 overflow-hidden">
              <Image src={IMG_SPECIALIST} alt="Specialist home care professional providing attentive care" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-primary/20" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-surface border border-secondary/10 p-8 hover:border-primary/30 hover:shadow-sm transition-all duration-300 group">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <s.icon size={20} className="text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-base font-heading font-bold text-text mb-2">{s.title}</h3>
                    <p className="text-text/80 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Value — image + stats */}
      <section className="py-12 md:py-20 lg:py-24 bg-secondary">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-8 h-[2px] bg-primary" />
                <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">Value to Families</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-4">The Tomlee Difference</h2>
              <p className="text-white/80 text-base leading-relaxed">
                Our specialist care delivers measurable peace of mind — consistent, dependable, and compassionate support for your loved one.
              </p>
            </div>
            <div className="relative h-56 overflow-hidden">
              <Image src={IMG_CARRING} alt="Care professional with a family member" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-secondary/50" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {VALUE_PROPS.map((v, i) => (
              <motion.div key={v.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white/10 border border-white/10 p-8 text-center">
                <p className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-primary mb-2">{v.metric}</p>
                <p className="text-white font-heading font-semibold text-sm mb-3 uppercase tracking-wide">{v.label}</p>
                <p className="text-white/70 text-xs leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-primary text-white px-5 sm:px-8 py-3 sm:py-4 font-heading font-semibold text-xs sm:text-sm tracking-wide hover:bg-white hover:text-secondary transition-colors">
              Request Specialist Care <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}