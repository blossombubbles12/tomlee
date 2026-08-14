"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { HeartHandshake, ShieldCheck, Award, BarChart3, Users, Home } from "lucide-react";

const REASONS = [
  { icon: HeartHandshake, title: "Compassion-First",             description: "Every carer is chosen for their heart as much as their skill — warmth is the foundation of every visit." },
  { icon: ShieldCheck,    title: "Vetted & Background-Checked",  description: "All Tomlee carers pass rigorous vetting, training, and reference checks so your family is always in safe hands." },
  { icon: Award,          title: "Trained Care Professionals",   description: "Our caregivers are trained in personal care, safety, medication support, and specialist care protocols." },
  { icon: BarChart3,      title: "Personalised Care Plans",      description: "Each client receives a tailored care plan, reviewed with the family and adjusted as needs evolve." },
  { icon: Users,          title: "Family-Inclusive Approach",    description: "We keep families informed and involved at every step — transparent, honest, and reassuring communication." },
  { icon: Home,           title: "Care in the Comfort of Home",  description: "From a single visit to live-in care, we help loved ones stay where they feel safest and happiest." },
];

export default function WhyCards() {
  return (
    <section className="py-20 md:py-28 lg:py-32 bg-surface">
      <div className="container mx-auto">
        {/* Header with background image banner */}
        <div className="relative h-44 md:h-56 mb-16 rounded-[2rem] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000"
            alt="Why Tomlee Home Care — compassionate professional care"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-secondary/85" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <span className="type-label inline-flex items-center rounded-full bg-white/10 border border-white/10 text-primary px-4 py-1.5 mb-4">
              Why Tomlee Home Care
            </span>
            <h2 className="type-h2 text-white">
              Trusted Care. <span className="text-primary">Real Warmth.</span>
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
              transition={{ delay: i * 0.08, duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
              className="bg-white p-8 rounded-[1.5rem] border border-secondary/8 hover:border-primary/40 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group"
            >
              <div className="w-12 h-12 rounded-2xl bg-tint flex items-center justify-center mb-6 group-hover:bg-primary/15 transition-colors duration-300">
                <item.icon size={22} className="text-secondary" strokeWidth={1.5} />
              </div>
              <div className="w-6 h-[2px] bg-primary/40 mb-4 rounded-full" />
              <h3 className="type-h3 text-secondary mb-3">{item.title}</h3>
              <p className="type-small text-muted leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}