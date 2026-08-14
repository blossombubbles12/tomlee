"use client";

import { motion } from "framer-motion";
import { HeartHandshake, Home, ShieldCheck, ArrowRight, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";

const IMG_COMPANION = "https://images.unsplash.com/photo-1556761175-b413da4baf72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200";
const IMG_LIVEIN    = "https://images.unsplash.com/photo-1584515933487-779824d29309?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200";

const CARE_MODES = [
  "Companionship & social engagement",
  "Live-in elderly care (24/7)",
  "Flexible hourly visits",
  "Respite care for family caregivers",
];

const SPECIALIST_STEPS = [
  "Share your loved one's needs with our care team",
  "We match a vetted, trained care professional",
  "Care begins with a personalised care plan",
  "Families stay informed at every step",
];

export default function CertificationsContent() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <PageHero
        title="Elderly & Companion Care"
        subtitle="Warm companionship and attentive elderly care — delivered by vetted, trained care professionals."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Elderly & Companion Care" }]}
      />

      {/* Care Modes — with images */}
      <section className="py-12 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-8 h-[2px] bg-primary" />
            <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">Care Options</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-text mb-12">Two Ways We Support Your Family</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Companion Care */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="overflow-hidden border border-secondary/10">
              <div className="relative h-44">
                <Image src={IMG_COMPANION} alt="Companion care visit — warm conversation" fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute bottom-4 left-6">
                  <span className="text-white text-xs font-heading font-semibold uppercase tracking-widest bg-primary px-3 py-1">Companion Care</span>
                </div>
              </div>
              <div className="bg-surface p-8">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-5">
                  <HeartHandshake size={22} className="text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-heading font-bold text-text mb-2">Companion & Elderly Care</h3>
                <p className="text-text/80 text-sm mb-6">A warm, familiar presence that brings comfort, connection, and safety to your loved one&apos;s day.</p>
                <ul className="space-y-3">
                  {CARE_MODES.map((mode, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">{i + 1}</span>
                      <span className="text-text/85 text-sm">{mode}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Live-in / Specialist */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="overflow-hidden border border-secondary/10">
              <div className="relative h-44">
                <Image src={IMG_LIVEIN} alt="Live-in care professional with an elderly client" fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-4 left-6">
                  <span className="text-white text-xs font-heading font-semibold uppercase tracking-widest bg-secondary px-3 py-1">Specialist Care</span>
                </div>
              </div>
              <div className="bg-secondary p-8">
                <div className="w-12 h-12 bg-white/10 flex items-center justify-center mb-5">
                  <ShieldCheck size={22} className="text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-2">Specialist & Live-in Support</h3>
                <p className="text-white/80 text-sm mb-6">For dementia, recovery, and chronic conditions — matched to a specialist professional.</p>
                <ul className="space-y-3">
                  {SPECIALIST_STEPS.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-primary shrink-0 mt-0.5" />
                      <span className="text-white/80 text-sm">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vetted & Trained Care Professionals */}
      <section className="py-12 md:py-20 lg:py-24 bg-surface">
        <div className="container mx-auto">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-8 h-[2px] bg-primary" />
            <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">Our Standards</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-text mb-12">Every Care Professional Is Vetted & Trained</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Background Verification", desc: "Identity and reference checks on every professional before they join our network." },
              { title: "Care-Specific Training", desc: "Elderly care, dementia awareness, and daily living support training." },
              { title: "First-Aid Certification", desc: "First-response and emergency preparedness skills as standard." },
              { title: "Ongoing Supervision", desc: "Regular check-ins so care quality stays consistently high." },
            ].map((card, i) => (
              <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white border border-secondary/10 p-6 hover:border-primary/30 transition-colors">
                <div className="w-9 h-9 bg-primary flex items-center justify-center mb-4">
                  <Home size={16} className="text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-heading font-bold text-text mb-2 uppercase tracking-wide">{card.title}</h3>
                <p className="text-xs text-text/80 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Engage a Care Professional */}
      <section className="py-12 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-8 h-[2px] bg-primary" />
                <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">Family Support</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-text mb-4">A Care Professional for Every Home</h2>
              <p className="text-text/80 text-base leading-relaxed mb-6">
                Families can request a care professional through our network — matched to your loved one&apos;s personality, routines, and needs. Flexible schedules, transparent plans, and support when you need it.
              </p>
              <ul className="space-y-3 mb-8">
                {["Personality-matched care professionals", "Flexible hourly, overnight, or live-in schedules", "Dementia & memory-support specialists", "Clear care plans and family updates"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-primary shrink-0" />
                    <span className="text-text/85 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-primary text-white px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-heading font-semibold hover:bg-secondary transition-colors">
                Request a Care Professional <ArrowRight size={15} />
              </Link>
            </div>

            {/* Join CTA with image bg */}
            <div className="relative overflow-hidden">
              <div className="relative h-48">
                <Image src={IMG_COMPANION} alt="Elderly care support" fill className="object-cover" sizes="50vw" />
                <div className="absolute inset-0 bg-secondary/70" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl">❤️</span>
                </div>
              </div>
              <div className="bg-surface border border-secondary/10 p-8 text-center">
                <h3 className="text-xl font-heading font-bold text-text mb-2">Join Our Care Network</h3>
                <p className="text-text/80 text-sm mb-6">Are you a trained care professional? Join the network families trust across Nigeria.</p>
                <Link href="/representatives" className="inline-flex items-center gap-2 bg-secondary text-white px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-heading font-semibold hover:bg-primary transition-colors">
                  Join the Network <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}