"use client";

import { motion } from "framer-motion";
import { GraduationCap, ClipboardCheck, Building2, ArrowRight, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";

const IMG_CERT    = "https://images.unsplash.com/photo-1778922286590-5cc0bcba34ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200";
const IMG_EXAM    = "https://images.unsplash.com/photo-1627599936744-51d288f89af4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200";

const CERT_CATEGORIES = [
  { name: "Business & Management",     samples: ["Certified Project Management Professional", "Certified Business Analyst", "Certified Operations Manager"] },
  { name: "Digital Skills & Technology", samples: ["Certified Digital Marketing Specialist", "Certified Cybersecurity Awareness Professional", "Certified Data Analyst"] },
  { name: "Finance & Data Analytics",  samples: ["Certified Financial Analyst", "Certified Data Analytics Practitioner", "Certified Risk Management Professional"] },
  { name: "Leadership & HR",           samples: ["Certified HR Business Partner", "Certified Leadership Coach", "Certified Talent Development Professional"] },
];

const TRAINING_STEPS = [
  "Enroll in training programme",
  "Complete coursework and assessments",
  "Sit for final examination",
  "Earn your certification",
];

const EXAM_STEPS = [
  "Register directly for certification exam",
  "Sit for standardised assessment",
  "Earn certification upon passing",
];

export default function CertificationsContent() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <PageHero
        title="Professional Certifications"
        subtitle="Industry-relevant certifications that validate real-world skills and improve employability."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Certifications" }]}
      />

      {/* Pathways — with images */}
      <section className="py-12 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-8 h-[2px] bg-primary" />
            <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">Certification Pathways</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-text mb-12">Two Paths to Certification</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Training-Based */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="overflow-hidden border border-secondary/10">
              <div className="relative h-44">
                <Image src={IMG_CERT} alt="Training-based certification — presenter at workshop" fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute bottom-4 left-6">
                  <span className="text-white text-xs font-heading font-semibold uppercase tracking-widest bg-primary px-3 py-1">Training-Based</span>
                </div>
              </div>
              <div className="bg-surface p-8">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-5">
                  <GraduationCap size={22} className="text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-heading font-bold text-text mb-2">Training-Based Certification</h3>
                <p className="text-text/80 text-sm mb-6">Attend training, then sit for your certification exam.</p>
                <ul className="space-y-3">
                  {TRAINING_STEPS.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">{i + 1}</span>
                      <span className="text-text/85 text-sm">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Exam-Only */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="overflow-hidden border border-secondary/10">
              <div className="relative h-44">
                <Image src={IMG_EXAM} alt="Exam-only certification — professional assessment" fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-4 left-6">
                  <span className="text-white text-xs font-heading font-semibold uppercase tracking-widest bg-secondary px-3 py-1">Exam-Only</span>
                </div>
              </div>
              <div className="bg-secondary p-8">
                <div className="w-12 h-12 bg-white/10 flex items-center justify-center mb-5">
                  <ClipboardCheck size={22} className="text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-2">Exam-Only Certification</h3>
                <p className="text-white/80 text-sm mb-6">For experienced professionals — register directly for the exam.</p>
                <ul className="space-y-3">
                  {EXAM_STEPS.map((step, i) => (
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

      {/* Categories */}
      <section className="py-12 md:py-20 lg:py-24 bg-surface">
        <div className="container mx-auto">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-8 h-[2px] bg-primary" />
            <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">Certification Categories</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-text mb-12">What You Can Get Certified In</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CERT_CATEGORIES.map((cat, i) => (
              <motion.div key={cat.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white border border-secondary/10 p-6 hover:border-primary/30 transition-colors">
                <h3 className="text-sm font-heading font-bold text-text mb-4 uppercase tracking-wide">{cat.name}</h3>
                <ul className="space-y-2">
                  {cat.samples.map((s) => (
                    <li key={s} className="text-xs text-text/80 flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Exam Services */}
      <section className="py-12 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-8 h-[2px] bg-primary" />
                <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">Corporate Examination Services</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-text mb-4">Bulk Assessments for Organisations</h2>
              <p className="text-text/80 text-base leading-relaxed mb-6">
                Organisations can request customised examinations for employees, trainees, or candidates. We provide standardised onsite or online testing with performance evaluation reports and certification issuance.
              </p>
              <ul className="space-y-3 mb-8">
                {["Standardised examinations", "Onsite or online testing", "Performance evaluation reports", "Certification issuance for successful candidates"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <Building2 size={16} className="text-primary shrink-0" />
                    <span className="text-text/85 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-primary text-white px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-heading font-semibold hover:bg-secondary transition-colors">
                Request Corporate Exam Services <ArrowRight size={15} />
              </Link>
            </div>

            {/* Enroll CTA with image bg */}
            <div className="relative overflow-hidden">
              <div className="relative h-48">
                <Image src={IMG_CERT} alt="Certification enrolment" fill className="object-cover" sizes="50vw" />
                <div className="absolute inset-0 bg-secondary/70" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl">🎓</span>
                </div>
              </div>
              <div className="bg-surface border border-secondary/10 p-8 text-center">
                <h3 className="text-xl font-heading font-bold text-text mb-2">Ready to Enroll?</h3>
                <p className="text-text/80 text-sm mb-6">Start your certification journey today — choose a pathway that fits your experience level.</p>
                <Link href="/get-started" className="inline-flex items-center gap-2 bg-secondary text-white px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-heading font-semibold hover:bg-primary transition-colors">
                  Enroll Now <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
