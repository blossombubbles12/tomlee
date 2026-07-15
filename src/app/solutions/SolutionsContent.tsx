"use client";

import { motion } from "framer-motion";
import { BookOpen, Award, Users, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";

const IMGS = {
  training:      "https://images.unsplash.com/photo-1744809482817-9a9d4fc280af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
  certification: "https://images.unsplash.com/photo-1778922286590-5cc0bcba34ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
  talent:        "https://images.unsplash.com/photo-1573164574397-dd250bc8a598?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
};

const SOLUTION_PILLARS = [
  {
    icon: BookOpen,
    title: "Corporate Training Solutions",
    description: "Tailored training programmes aligned to your organisation's strategic objectives. We design and deliver leadership development, sales performance, digital skills, customer experience, and HR training.",
    href: "/corporate-training",
    cta: "Explore Corporate Training",
    features: ["Leadership Development", "Sales & Customer Service", "Digital Transformation", "HR & Management Training"],
    image: IMGS.training,
    imageAlt: "Corporate training workshop with African professionals",
  },
  {
    icon: Award,
    title: "Professional Certification Programs",
    description: "Industry-relevant certifications across business, technology, finance, and leadership that validate skills and improve career progression — through training-based or exam-only pathways.",
    href: "/certifications",
    cta: "View Certifications",
    features: ["Business & Management", "Digital Skills & Technology", "Finance & Data Analytics", "Leadership & HR"],
    image: IMGS.certification,
    imageAlt: "Professional certification presenter",
  },
  {
    icon: Users,
    title: "Workforce & Talent Solutions",
    description: "End-to-end talent pipeline development including graduate programmes, internship pipelines, corporate talent outsourcing, skills assessment, and workforce planning.",
    href: "/talent-solutions",
    cta: "Explore Talent Solutions",
    features: ["Graduate Training Programmes", "Internship Pipelines", "Talent Outsourcing", "Skills Assessment & Planning"],
    image: IMGS.talent,
    imageAlt: "African workforce professionals",
  },
];

export default function SolutionsContent() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <PageHero
        title="Our Solutions"
        subtitle="Integrated workforce development solutions for organisations, governments, and institutions."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Solutions" }]}
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
              Three Pillars of <span className="text-secondary">Workforce Transformation</span>
            </h2>
            <p className="text-text/80 text-base leading-relaxed">
              World Impact Africa provides integrated solutions designed to build skills, validate competencies, and develop talent pipelines across Africa.
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
          <p className="text-white/80 text-base mb-8">Talk to our team and we&apos;ll help identify the right solution for your needs.</p>
          <Link href="/get-started" className="inline-flex items-center gap-2 bg-primary text-white px-5 sm:px-8 py-3 sm:py-4 font-heading font-semibold text-xs sm:text-sm tracking-wide hover:bg-white hover:text-secondary transition-colors">
            Get Started <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}
