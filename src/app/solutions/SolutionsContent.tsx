"use client";

import { motion } from "framer-motion";
import { HeartHandshake, CalendarHeart, Stethoscope, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";

const IMGS = {
  personal:  "https://images.unsplash.com/photo-1543269865-cbf427effbad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
  companions: "https://images.unsplash.com/photo-1556761175-b413da4baf72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
  specialist: "https://images.unsplash.com/photo-1584515933487-779824d29309?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
};

const SOLUTION_PILLARS = [
  {
    icon: CalendarHeart,
    title: "Personal Home Care",
    description: "Dignified, everyday support delivered in the comfort of home. Our care professionals assist with daily living activities while preserving your loved one's independence.",
    href: "/corporate-training",
    cta: "Explore Personal Home Care",
    features: ["Daily Living Assistance", "Mobility Support", "Meal Preparation", "Medication Reminders"],
    image: IMGS.personal,
    imageAlt: "Personal home care professional assisting a client",
  },
  {
    icon: HeartHandshake,
    title: "Elderly & Companion Care",
    description: "Warm companionship and attentive elderly care that brings comfort, connection, and peace of mind to families — available flexible, 24/7, or live-in.",
    href: "/certifications",
    cta: "Explore Elderly & Companion Care",
    features: ["Companionship & Engagement", "Live-in Care", "Dementia & Memory Support", "Respite for Families"],
    image: IMGS.companions,
    imageAlt: "Companion care professional with an elderly client",
  },
  {
    icon: Stethoscope,
    title: "Specialist Care Services",
    description: "Specialist care for recovery, complex conditions, and chronic needs — delivered by vetted, trained professionals matched to your loved one's situation.",
    href: "/talent-solutions",
    cta: "Explore Specialist Care",
    features: ["Post-Surgical Recovery Care", "Chronic Condition Support", "Post-Operative Palliative Care", "Trained Specialists"],
    image: IMGS.specialist,
    imageAlt: "Specialist home care professional in action",
  },
];

export default function SolutionsContent() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <PageHero
        title="Our Services"
        subtitle="Compassionate, professional home care services designed around your family's needs."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      <section className="py-12 md:py-20 lg:py-24 bg-surface">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="w-8 h-[2px] bg-primary" />
              <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">What We Offer</span>
              <div className="w-8 h-[2px] bg-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-text mb-4">
              Three Pillars of <span className="text-secondary">Compassionate Care</span>
            </h2>
            <p className="text-text/80 text-base leading-relaxed">
              Tomlee Home Care provides integrated services designed to keep your loved ones safe, comfortable, and independent at home.
            </p>
          </div>

          <div className="space-y-8">
            {SOLUTION_PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-white border border-secondary/10 overflow-hidden hover:border-primary/30 hover:shadow-md transition-all duration-300 group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-4">
                  {/* Image */}
                  <div className="relative h-52 lg:h-auto lg:col-span-1">
                    <Image
                      src={pillar.image}
                      alt={pillar.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width:1024px) 100vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-secondary/30 group-hover:bg-secondary/20 transition-colors" />
                  </div>
                  {/* Content */}
                  <div className="lg:col-span-3 p-8 md:p-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-11 h-11 bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                        <pillar.icon size={20} className="text-primary" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-xl font-heading font-bold text-text">{pillar.title}</h3>
                    </div>
                    <p className="text-text/80 text-base leading-relaxed mb-5">{pillar.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {pillar.features.map((f) => (
                        <span key={f} className="text-xs bg-surface border border-secondary/10 px-3 py-1 text-text/80">
                          {f}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={pillar.href}
                      className="inline-flex items-center gap-2 bg-primary text-white px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-heading font-semibold tracking-wide hover:bg-secondary transition-colors"
                    >
                      {pillar.cta} <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container mx-auto text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-white mb-4">Not Sure Where to Start?</h2>
          <p className="text-white/80 text-base mb-8">Talk to our care team and we&apos;ll help you find the right support for your loved one.</p>
          <Link href="/get-started" className="inline-flex items-center gap-2 bg-primary text-white px-5 sm:px-8 py-3 sm:py-4 font-heading font-semibold text-xs sm:text-sm tracking-wide hover:bg-white hover:text-secondary transition-colors">
            Get Started <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}