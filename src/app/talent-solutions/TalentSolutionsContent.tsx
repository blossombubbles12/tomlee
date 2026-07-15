"use client";

import { motion } from "framer-motion";
import { Users, ClipboardCheck, BarChart3, Briefcase, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";

const IMG_TALENT  = "https://images.unsplash.com/photo-1573164574397-dd250bc8a598?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200";
const IMG_COLLAB  = "https://images.unsplash.com/photo-1655720357872-ce227e4164ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200";

const SERVICES = [
  { icon: Users,          title: "Graduate Training Programmes",       desc: "Structured onboarding and skills development programmes for fresh graduates entering the workforce." },
  { icon: Briefcase,      title: "Internship Pipelines",               desc: "Build relationships with top talent early through structured internship and apprenticeship programmes." },
  { icon: ClipboardCheck, title: "Skills Assessment & Certification",  desc: "Evaluate existing workforce competencies and certify validated skills against industry benchmarks." },
  { icon: BarChart3,      title: "Workforce Planning & Outsourcing",   desc: "Strategic workforce planning, talent outsourcing, and corporate examination services at scale." },
];

const VALUE_PROPS = [
  { metric: "40%", label: "Reduction in Time-to-Hire",   desc: "Our pre-assessed talent pipelines dramatically reduce recruitment cycles." },
  { metric: "60%", label: "Improvement in Retention",    desc: "Properly onboarded and trained employees stay longer and contribute more." },
  { metric: "3×",  label: "Workforce Capability Uplift", desc: "Organisations report tripled productivity scores after structured skills development." },
];

export default function TalentSolutionsContent() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <PageHero
        title="Talent & Workforce Solutions"
        subtitle="Build sustainable talent pipelines and develop high-performance workforces."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Talent Solutions" }]}
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
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-text mb-4">End-to-End Talent Development</h2>
              <p className="text-text/80 text-base leading-relaxed">
                From graduate pipelines to strategic workforce planning — we partner with organisations to build the talent infrastructure they need to grow.
              </p>
            </div>
            <div className="relative h-64 overflow-hidden">
              <Image src={IMG_TALENT} alt="African women professionals in a talent solutions context" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
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
                <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">Value to Organisations</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-4">The WorldImpact Difference</h2>
              <p className="text-white/80 text-base leading-relaxed">
                Our structured talent solutions deliver measurable impact — from faster hiring to stronger workforce capability.
              </p>
            </div>
            <div className="relative h-56 overflow-hidden">
              <Image src={IMG_COLLAB} alt="Team collaborating on talent strategy" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
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
              Partner With Us <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
