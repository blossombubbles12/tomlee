"use client";

import { motion } from "framer-motion";
import { CheckCircle, XCircle, ChevronRight, Globe, Users, Award, BarChart3, FileText, UserPlus, Download, LogIn, Calculator, Building2, BookOpen, Shield, Share2, Palette, CreditCard, Lock, HeartHandshake } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";

function img(images: string[], idx: number): string {
  return images[idx % images.length] || "";
}

const WHO_CAN_APPLY = [
  "Professionals", "Consultants", "Care Professionals",
  "Business Development Professionals", "Entrepreneurs",
  "Healthcare Professionals", "Professional Associations",
  "Home Care Agencies", "Corporate Service Providers",
];

const OPPORTUNITIES = [
  "Care Professional Referrals", "Family & Client Coordination",
  "Home Care Service Opportunities", "Care Consulting Opportunities",
  "Quality Assurance Projects", "Business Partnerships", "Brand Awareness Activities",
];

const INSTITUTIONS = [
  "Personal Care Services",
  "Companionship & Social Support",
  "Home Nursing Services",
  "Senior Care & Assisted Living",
  "Specialized Care Programs",
  "Tomlee Home Care Consulting",
  "Other current and future Tomlee Home Care services",
];

const COMMISSION_TRAINING = [
  { range: "1–10 Clients", rate: "20%" },
  { range: "11–20 Clients", rate: "25%" },
  { range: "21–30 Clients", rate: "30%" },
  { range: "31–50 Clients", rate: "35%" },
  { range: "51+ Clients", rate: "40%" },
];

export default function RepresentativesContent({ images }: { images: string[] }) {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <PageHero
        title="Care Professional Network"
        subtitle="Independent care professionals who refer families, coordinate home care assignments, and earn commissions"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Representatives" }]}
      />

      {/* ── Introduction ── */}
      <section className="py-12 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-8 h-[2px] bg-primary" />
                <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">Version 1.0</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text mb-6">
                Care Professional Network
              </h2>
              <p className="text-text/80 text-base leading-relaxed mb-4">
                The Care Professional Network is established by Tomlee Home Care to expand the reach of home care
                services, care coordination, professional care referrals, and family support initiatives across Nigeria
                and other regions.
              </p>
              <p className="text-text/80 text-base leading-relaxed mb-4">
                Representatives serve as official ambassadors and business development partners of Tomlee Home Care within
                their assigned cities or territories.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                {[
                  "Increase care professional referrals",
                  "Expand family and client base",
                  "Promote home care services",
                  "Coordinate care assignments",
                  "Build local partnerships",
                  "Strengthen brand awareness",
                  "Support business growth in assigned territories",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle size={14} className="text-primary shrink-0 mt-1" />
                    <span className="text-text/85 text-xs">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="relative h-80 lg:h-96 overflow-hidden"
            >
              <Image
                src={img(images, 0)}
                alt="Tomlee Home Care representative network"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Who Can Apply ── */}
      <section className="py-12 md:py-20 lg:py-24 bg-surface">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-8 h-[2px] bg-primary" />
                <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">Who Can Apply</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-text mb-6">
                We Welcome Applications From
              </h2>
              <p className="text-text/80 text-base leading-relaxed mb-6">
                Our network is open to individuals and organisations who share our commitment to quality home care
                and professional excellence.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {WHO_CAN_APPLY.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-primary shrink-0" />
                    <span className="text-text/85 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <Globe size={40} className="text-primary mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-heading font-bold text-text mb-4">Global Reach, Local Impact</h3>
              <p className="text-text/80 text-sm leading-relaxed mb-4">
                Whether you are an individual care professional or a large home care organisation, we invite you to join
                our growing network of representatives across Nigeria and beyond.
              </p>
              <p className="text-text/80 text-sm leading-relaxed">
                No matter your location or background, if you have the drive to connect families with quality home care
                services, we want to hear from you.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Services Covered ── */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="w-8 h-[2px] bg-primary" />
              <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">Services</span>
              <div className="w-8 h-[2px] bg-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-text">
              Services Covered
            </h2>
            <p className="text-text/80 text-base mt-3 max-w-xl mx-auto">
              The Representative Network supports all Tomlee Home Care services including but not limited to:
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {INSTITUTIONS.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3 bg-surface border border-secondary/10 p-5 hover:border-primary/30 transition-colors"
              >
                <Building2 size={16} className="text-primary shrink-0" />
                <span className="text-text/85 text-sm">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Representative Status & Opportunities ── */}
      <section className="py-12 md:py-20 lg:py-24 bg-surface">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-secondary/10 p-8"
            >
              <Users size={32} className="text-primary mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-heading font-bold text-text mb-2">Representative Status</h3>
              <p className="text-text/80 text-sm mb-6">
                Representatives are independent partners and are not employees of Tomlee Home Care.
              </p>
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-heading font-semibold text-text uppercase tracking-wide mb-3 flex items-center gap-2">
                    <CheckCircle size={14} className="text-primary" /> Authorized To
                  </p>
                  <ul className="space-y-2">
                    {["Promote care services", "Refer care professionals", "Generate business leads", "Build partnerships", "Organize local activities"].map((i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-text/85">
                        <CheckCircle size={14} className="text-primary shrink-0 mt-0.5" /> {i}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-heading font-semibold text-text uppercase tracking-wide mb-3 flex items-center gap-2">
                    <XCircle size={14} className="text-red-500" /> Not Authorized To
                  </p>
                  <ul className="space-y-2">
                    {["Modify fees", "Alter care plans", "Sign agreements on behalf of Tomlee Home Care", "Create independent services using the Tomlee Home Care brand", "Make commitments without written approval"].map((i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-text/85">
                        <XCircle size={14} className="text-red-400 shrink-0 mt-0.5" /> {i}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-8 h-[2px] bg-primary" />
                <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">Opportunities</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-text mb-6">
                Representative Opportunities
              </h2>
              <p className="text-text/80 text-sm mb-6">
                Representatives may support a wide range of activities across our organisation.
              </p>
              <div className="space-y-3">
                {OPPORTUNITIES.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 bg-white border border-secondary/10 p-4 hover:border-primary/30 transition-colors"
                  >
                    <ChevronRight size={16} className="text-primary shrink-0" />
                    <span className="text-text/85 text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Image Break ── */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <Image src={img(images, 1)} alt="" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-secondary/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white text-xl md:text-2xl font-heading font-bold text-center px-4">
            Policy, Guidelines, Terms &amp; Operating Framework
          </p>
        </div>
      </div>

      {/* ── Responsibilities ── */}
      <section className="py-12 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="w-8 h-[2px] bg-primary" />
              <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">Responsibilities</span>
              <div className="w-8 h-[2px] bg-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-text">
              Responsibilities
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-surface border border-secondary/10 p-8"
            >
              <h3 className="text-lg font-heading font-bold text-text mb-5 flex items-center gap-3">
                <Shield size={20} className="text-primary" strokeWidth={1.5} />
                Responsibilities of Tomlee Home Care
              </h3>
              <ul className="space-y-3">
                {[
                  "Develop and maintain care standards",
                  "Conduct quality assessments",
                  "Issue care assignment confirmations",
                  "Provide marketing materials",
                  "Maintain websites and care coordination platforms",
                  "Provide representative support",
                  "Verify care professional registrations",
                  "Manage quality assurance",
                  "Protect the brand",
                  "Process commissions",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle size={14} className="text-primary shrink-0 mt-1" />
                    <span className="text-text/85 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-surface border border-secondary/10 p-8"
            >
              <h3 className="text-lg font-heading font-bold text-text mb-5 flex items-center gap-3">
                <Users size={20} className="text-primary" strokeWidth={1.5} />
                Responsibilities of Representatives
              </h3>
              <div className="space-y-5">
                <div>
                  <p className="text-xs font-heading font-semibold text-text uppercase tracking-wide mb-3">Representatives Shall</p>
                  <ul className="space-y-2">
                    {["Promote approved care services", "Refer care professionals", "Generate care assignment leads", "Build partnerships", "Participate in meetings", "Submit monthly reports", "Protect the Tomlee Home Care brand", "Maintain professionalism"].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-text/85">
                        <CheckCircle size={14} className="text-primary shrink-0 mt-0.5" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-heading font-semibold text-text uppercase tracking-wide mb-3 text-red-600">Representatives Shall Not</p>
                  <ul className="space-y-2">
                    {["Misrepresent the organization", "Use unauthorized materials", "Alter logos or care documents", "Make false promises", "Collect fees without reporting"].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-text/85">
                        <XCircle size={14} className="text-red-400 shrink-0 mt-0.5" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Social Media & Content Management ── */}
      <section className="py-12 md:py-20 lg:py-24 bg-surface">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-secondary/10 p-8"
            >
              <Share2 size={28} className="text-primary mb-4" strokeWidth={1.5} />
              <h3 className="text-lg font-heading font-bold text-text mb-4">Social Media Policy</h3>
              <p className="text-text/80 text-sm mb-4">
                Each city may operate official pages (e.g., Tomlee Lagos, Tomlee Abuja, Tomlee Port Harcourt,
                Tomlee Ibadan, Tomlee Enugu).
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-heading font-semibold text-text uppercase tracking-wide mb-2">All social media pages must:</p>
                  <ul className="space-y-1.5">
                    {["Be approved by Headquarters", "Use approved branding", "Display official contact information", "Follow brand guidelines"].map((i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-text/85">
                        <CheckCircle size={12} className="text-primary shrink-0 mt-1" /> {i}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-heading font-semibold text-text uppercase tracking-wide mb-2">Representatives are encouraged to:</p>
                  <ul className="space-y-1.5">
                    {["Share official posts", "Localize announcements", "Promote upcoming programs", "Share approved success stories"].map((i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-text/85">
                        <CheckCircle size={12} className="text-primary shrink-0 mt-1" /> {i}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-heading font-semibold text-text uppercase tracking-wide mb-2 text-red-600">Representatives shall not:</p>
                  <ul className="space-y-1.5">
                    {["Create independent branding", "Change logos", "Publish controversial content", "Publish political content", "Publish misleading information"].map((i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-text/85">
                        <XCircle size={12} className="text-red-400 shrink-0 mt-0.5" /> {i}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-8"
            >
              <div className="bg-white border border-secondary/10 p-8">
                <BookOpen size={28} className="text-primary mb-4" strokeWidth={1.5} />
                <h3 className="text-lg font-heading font-bold text-text mb-4">Content Management Policy</h3>
                <p className="text-text/80 text-sm mb-4">
                  Headquarters remains the primary source of content. At least 80% of content should originate from Headquarters.
                </p>
                <div className="space-y-3">
                  <p className="text-xs font-heading font-semibold text-text uppercase tracking-wide mb-2">Representatives should:</p>
                  <ul className="space-y-1.5">
                    {["Share content from Headquarters pages", "Repost official graphics", "Repost official videos", "Repost official announcements"].map((i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-text/85">
                        <CheckCircle size={12} className="text-primary shrink-0 mt-1" /> {i}
                      </li>
                    ))}
                  </ul>
                  <p className="text-text/80 text-xs mt-3">
                    Local content may be created where necessary but must align with brand standards.
                  </p>
                </div>
              </div>

              <div className="bg-white border border-secondary/10 p-8">
                <Palette size={28} className="text-primary mb-4" strokeWidth={1.5} />
                <h3 className="text-lg font-heading font-bold text-text mb-4">Brand Guidelines</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-heading font-semibold text-text uppercase tracking-wide mb-2">Representatives must use:</p>
                    <ul className="space-y-1.5">
                      {["Official logos", "Official colors", "Official templates", "Official fonts", "Official email signatures"].map((i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-text/85">
                          <CheckCircle size={12} className="text-primary shrink-0 mt-1" /> {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-heading font-semibold text-text uppercase tracking-wide mb-2 text-red-600">Prohibited:</p>
                    <ul className="space-y-1.5">
                      {["Logo modifications", "Unapproved care plans", "Unapproved websites", "Unapproved marketing materials"].map((i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-text/85">
                          <XCircle size={12} className="text-red-400 shrink-0 mt-0.5" /> {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Image Break ── */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <Image src={img(images, 2)} alt="" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-primary/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white text-xl md:text-2xl font-heading font-bold text-center px-4">
            Care Assignment &amp; Payment Management
          </p>
        </div>
      </div>

      {/* ── Care Assignment Process ── */}
      <section className="py-12 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="w-8 h-[2px] bg-primary" />
              <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">Process</span>
              <div className="w-8 h-[2px] bg-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-text">
              Care Assignment Process
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { step: 1, title: "Identify", desc: "Representative identifies family care needs" },
                { step: 2, title: "Register", desc: "Client family completes registration" },
                { step: 3, title: "Collect Payment", desc: "Payment is collected" },
                { step: 4, title: "Submit Report", desc: "Representative submits payment report" },
                { step: 5, title: "Confirm", desc: "Headquarters confirms payment" },
                { step: 6, title: "Add to Care Roster", desc: "Care professional is matched to the family" },
                { step: 7, title: "Begin Care", desc: "Home care assignment begins" },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-surface border border-secondary/10 p-5 text-center hover:border-primary/30 transition-colors relative"
                >
                  <div className="w-10 h-10 bg-primary text-white font-heading font-bold text-lg flex items-center justify-center mx-auto mb-3">
                    {item.step}
                  </div>
                  <h4 className="text-sm font-heading font-bold text-text mb-1">{item.title}</h4>
                  <p className="text-text/80 text-xs">{item.desc}</p>
                  {i < 6 && (
                    <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-primary/40 z-10">
                      <ChevronRight size={16} />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Payment Management ── */}
      <section className="py-12 md:py-20 lg:py-24 bg-surface">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-5">
                <div className="w-8 h-[2px] bg-primary" />
                <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">Payments</span>
                <div className="w-8 h-[2px] bg-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-text">
                Payment Management Policy
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-secondary/10 p-8"
              >
                <CreditCard size={28} className="text-primary mb-4" strokeWidth={1.5} />
                <h3 className="text-lg font-heading font-bold text-text mb-4">Payment Collection</h3>
                <p className="text-text/80 text-sm mb-4">
                  Representatives may collect payments on behalf of Tomlee Home Care subject to strict controls.
                </p>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-heading font-semibold text-text uppercase tracking-wide mb-2">Required Process</p>
                    <ul className="space-y-1.5">
                      {["All payments must be recorded", "Receipt must be issued", "Client details must be submitted", "Funds must be remitted within 48 hours"].map((i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-text/85">
                          <CheckCircle size={12} className="text-primary shrink-0 mt-1" /> {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-heading font-semibold text-text uppercase tracking-wide mb-2">Required Submission</p>
                    <ul className="space-y-1.5">
                      {["Client Name", "Care Service", "Amount Collected", "Date of Payment", "Payment Reference"].map((i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-text/85">
                          <CheckCircle size={12} className="text-primary shrink-0 mt-1" /> {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-red-600 text-xs font-heading font-semibold">
                    Failure to remit funds within the approved timeline may result in suspension.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white border border-secondary/10 p-8"
              >
                <HeartHandshake size={28} className="text-primary mb-4" strokeWidth={1.5} />
                <h3 className="text-lg font-heading font-bold text-text mb-4">Building Trust in Payment Collection</h3>
                <div className="space-y-4">
                  {[
                    { label: "Representative Agreement", desc: "Every representative signs a formal agreement" },
                    { label: "Security Deposit", desc: "Representatives may provide a refundable security deposit (Optional)" },
                    { label: "Monthly Reconciliation", desc: "Monthly review of clients, payments, and commissions" },
                    { label: "Official Receipts", desc: "Every payment receives a Client Receipt and Headquarters Confirmation" },
                    { label: "Payment Tracking Portal", desc: "System records all transactions — client name, care service, amount" },
                  ].map((item) => (
                    <div key={item.label} className="border-l-2 border-primary pl-4">
                      <p className="text-sm font-heading font-semibold text-text">{item.label}</p>
                      <p className="text-text/80 text-xs">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 bg-secondary p-8 text-center"
            >
              <h3 className="text-lg font-heading font-bold text-white mb-6">Progressive Trust Model</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "New Representatives", desc: "Payment remittance within 48 hours" },
                  { title: "Established Representatives", desc: "Weekly remittance" },
                  { title: "High Performing Representatives", desc: "Agreed credit limits and settlement periods" },
                ].map((item) => (
                  <div key={item.title} className="border border-white/20 p-6">
                    <h4 className="text-white font-heading font-bold text-sm mb-2">{item.title}</h4>
                    <p className="text-white/80 text-xs">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Commission Structure ── */}
      <section className="py-12 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="w-8 h-[2px] bg-primary" />
              <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">Commission Structure</span>
              <div className="w-8 h-[2px] bg-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-text">
              Our Commission Structure
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-surface border border-secondary/10 overflow-hidden"
            >
              <div className="bg-primary p-4">
                <h3 className="text-lg font-heading font-bold text-white text-center">Care Service Assignments</h3>
              </div>
              <div className="p-6">
                {COMMISSION_TRAINING.map((item) => (
                  <div key={item.range} className="flex justify-between items-center py-3 border-b border-secondary/5 last:border-b-0">
                    <span className="text-text/85 text-sm">{item.range}</span>
                    <span className="text-primary font-heading font-bold text-lg">{item.rate}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="bg-surface border border-secondary/10 overflow-hidden"
            >
              <div className="bg-secondary p-4">
                <h3 className="text-lg font-heading font-bold text-white text-center">Consulting Projects</h3>
              </div>
              <div className="p-6">
                {[
                  { label: "Care Consulting", rate: "20%" },
                  { label: "Corporate Wellness Programs", rate: "20%" },
                  { label: "Quality Assurance Projects", rate: "20%" },
                  { label: "Care Plan Development", rate: "15% – 20%" },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center py-3 border-b border-secondary/5 last:border-b-0">
                    <span className="text-text/85 text-sm">{item.label}</span>
                    <span className="text-secondary font-heading font-bold text-lg">{item.rate}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Image Break ── */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <Image src={img(images, 3)} alt="" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-secondary/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white text-xl md:text-2xl font-heading font-bold text-center px-4">
            Benefits, Reporting &amp; Code of Conduct
          </p>
        </div>
      </div>

      {/* ── Benefits ── */}
      <section className="py-12 md:py-20 bg-secondary">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="w-8 h-[2px] bg-primary" />
              <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">Benefits</span>
              <div className="w-8 h-[2px] bg-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white">
              Representative Benefits
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              "Official appointment letter",
              "Representative ID",
              "Commission earnings",
              "Marketing materials",
              "Training support",
              "Business development support",
              "Access to Tomlee Home Care opportunities",
            ].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-start gap-3"
              >
                <Award size={18} className="text-primary shrink-0 mt-0.5" />
                <span className="text-white/80 text-sm">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Monthly Reporting ── */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-4 mb-5">
                <div className="w-8 h-[2px] bg-primary" />
                <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">Reporting</span>
                <div className="w-8 h-[2px] bg-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-text">
                Monthly Reporting
              </h2>
              <p className="text-text/80 text-sm mt-3">
                Representatives must submit a monthly report covering:
              </p>
            </div>
            <div className="bg-surface border border-secondary/10 p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm text-text/80 border-b border-secondary/10 pb-4">
                <div><span className="font-heading font-semibold text-text">Month:</span> ________</div>
                <div><span className="font-heading font-semibold text-text">Country:</span> ________</div>
                <div><span className="font-heading font-semibold text-text">Representative:</span> ________</div>
              </div>
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-heading font-semibold text-text uppercase tracking-wide mb-3 flex items-center gap-2">
                    <Users size={14} className="text-primary" /> Client Summary
                  </p>
                  <ul className="space-y-1.5 pl-4">
                    {["Number of Clients", "Care Assignments", "Revenue Generated"].map((i) => (
                      <li key={i} className="text-sm text-text/85 list-disc ml-4">{i}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-heading font-semibold text-text uppercase tracking-wide mb-3 flex items-center gap-2">
                    <BarChart3 size={14} className="text-primary" /> Business Development Activities
                  </p>
                  <ul className="space-y-1.5 pl-4">
                    {["Meetings Held", "Leads Generated", "Companies Contacted"].map((i) => (
                      <li key={i} className="text-sm text-text/85 list-disc ml-4">{i}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-heading font-semibold text-text uppercase tracking-wide mb-3 flex items-center gap-2">
                    <FileText size={14} className="text-primary" /> Challenges
                  </p>
                  <ul className="space-y-1.5 pl-4">
                    {["Issues encountered", "Support required"].map((i) => (
                      <li key={i} className="text-sm text-text/85 list-disc ml-4">{i}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Confidentiality, Code of Conduct & Termination ── */}
      <section className="py-12 md:py-20 lg:py-24 bg-surface">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-secondary/10 p-6"
            >
              <Lock size={28} className="text-primary mb-4" strokeWidth={1.5} />
              <h3 className="text-base font-heading font-bold text-text mb-3">Confidentiality</h3>
              <p className="text-text/80 text-xs mb-3">Representatives shall not disclose:</p>
              <ul className="space-y-1.5">
                {["Client data", "Pricing strategies", "Internal documents", "Financial information", "Proprietary materials"].map((i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-text/85">
                    <XCircle size={11} className="text-red-400 shrink-0 mt-0.5" /> {i}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.07 }}
              className="bg-white border border-secondary/10 p-6"
            >
              <HeartHandshake size={28} className="text-primary mb-4" strokeWidth={1.5} />
              <h3 className="text-base font-heading font-bold text-text mb-3">Code of Conduct</h3>
              <p className="text-text/80 text-xs mb-3">Representatives shall:</p>
              <ul className="space-y-1.5">
                {["Act professionally", "Protect the brand", "Maintain integrity", "Promote quality", "Support organizational growth"].map((i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-text/85">
                    <CheckCircle size={11} className="text-primary shrink-0 mt-0.5" /> {i}
                  </li>
                ))}
              </ul>
              <p className="text-text/70 text-xs mt-4">
                All representatives are expected to operate in a manner that reflects positively on the reputation and
                values of Tomlee Home Care.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.14 }}
              className="bg-white border border-secondary/10 p-6"
            >
              <XCircle size={28} className="text-red-500 mb-4" strokeWidth={1.5} />
              <h3 className="text-base font-heading font-bold text-text mb-3">Termination</h3>
              <p className="text-text/80 text-xs mb-3">Tomlee Home Care reserves the right to terminate for:</p>
              <ul className="space-y-1.5">
                {["Fraud", "Misrepresentation", "Brand abuse", "Failure to remit funds", "Ethical violations", "Poor performance"].map((i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-text/85">
                    <XCircle size={11} className="text-red-400 shrink-0 mt-0.5" /> {i}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Application Form ── */}
      <section id="apply-form" className="py-12 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-4 mb-5">
                <div className="w-8 h-[2px] bg-primary" />
                <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">Application</span>
                <div className="w-8 h-[2px] bg-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-text">
                Apply to Become a Representative
              </h2>
              <p className="text-text/80 text-sm mt-3">
                Complete the application form below and our team will review your application.
              </p>
            </div>

            <div className="bg-surface border border-secondary/10 p-6 md:p-10">
              <h3 className="text-lg font-heading font-bold text-text mb-6">Required Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {["Full Name", "Country", "City", "Phone Number", "Email Address", "Occupation", "Organization", "LinkedIn Profile"].map((field) => (
                  <div key={field}>
                    <label className="block text-xs font-heading font-semibold text-text mb-1.5 uppercase tracking-wide">{field}</label>
                    <input
                      type={field === "Email Address" ? "email" : "text"}
                      placeholder={field}
                      className="w-full border border-secondary/20 bg-white px-4 py-2.5 text-sm text-text placeholder:text-text/30 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                ))}
              </div>

              <div className="mb-8">
                <label className="block text-xs font-heading font-semibold text-text mb-1.5 uppercase tracking-wide">Professional Experience</label>
                <textarea rows={4} placeholder="Briefly describe your professional experience..." className="w-full border border-secondary/20 bg-white px-4 py-2.5 text-sm text-text placeholder:text-text/30 focus:outline-none focus:border-primary transition-colors resize-y" />
              </div>

              <div className="mb-8">
                <label className="block text-xs font-heading font-semibold text-text mb-1.5 uppercase tracking-wide">Areas of Interest</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {["Care Professional Referrals", "Home Care Services", "Care Coordination Consulting", "Family & Client Support", "Quality Assurance Projects", "Business Partnerships"].map((area) => (
                    <label key={area} className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" className="accent-primary w-4 h-4" />
                      <span className="text-text/85 text-sm group-hover:text-text transition-colors">{area}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-xs font-heading font-semibold text-text mb-1.5 uppercase tracking-wide">Upload CV</label>
                <div className="border-2 border-dashed border-secondary/20 bg-white p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <FileText size={32} className="text-text/20 mx-auto mb-2" strokeWidth={1.5} />
                  <p className="text-text/60 text-sm">Click to upload or drag and drop your CV (PDF, DOC)</p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-text/70 text-xs mb-4">
                  Successful applicants will be contacted and provided with onboarding information.
                </p>
                <button className="bg-primary text-white px-8 py-3 text-sm font-heading font-semibold hover:bg-secondary transition-colors">
                  Submit Application
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Buttons ── */}
      <section className="py-12 md:py-16 bg-secondary">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="#apply-form" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 text-sm font-heading font-semibold hover:bg-primary/90 transition-colors">
              Apply Now <UserPlus size={16} />
            </Link>
            <Link href="/representatives/dashboard" className="inline-flex items-center gap-2 bg-white text-secondary px-6 py-3 text-sm font-heading font-semibold hover:bg-primary hover:text-white transition-colors">
              Representative Login <LogIn size={16} />
            </Link>
            <button className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 text-sm font-heading font-semibold hover:bg-white/10 transition-colors">
              Download Representative Guide <Download size={16} />
            </button>
            <button className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 text-sm font-heading font-semibold hover:bg-white/10 transition-colors">
              Commission Calculator <Calculator size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
