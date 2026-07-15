"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, TrendingUp, Monitor, Shield, BarChart3, Heart, ArrowRight, CheckCircle, Send, Building2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";

function img(images: string[], idx: number): string {
  return images[idx % images.length] || "";
}

const OFFERINGS = [
  { icon: Users,      title: "Leadership Development",        desc: "Build the next generation of leaders with targeted leadership and management training." },
  { icon: TrendingUp, title: "Sales Performance Training",    desc: "Equip your sales teams with skills to drive revenue and build lasting client relationships." },
  { icon: Heart,      title: "Customer Experience Training",  desc: "Deliver exceptional customer experiences through structured service excellence training." },
  { icon: Monitor,    title: "Digital Skills Training",       desc: "Prepare your workforce for the digital economy with practical technology and data literacy skills." },
  { icon: Shield,     title: "Compliance & Risk Training",    desc: "Ensure your organisation meets regulatory requirements with focused compliance training." },
  { icon: BarChart3,  title: "HR & Workforce Development",    desc: "Build HR capability and strategic workforce planning skills across your people function." },
];

const STEPS = [
  { step: 1, title: "Needs Assessment",           desc: "We evaluate your workforce gaps, performance challenges, and strategic objectives." },
  { step: 2, title: "Programme Design",           desc: "Our experts design a custom curriculum aligned to your industry, culture, and learning outcomes." },
  { step: 3, title: "Delivery",                   desc: "Expert-led training delivered onsite, virtually, or through a blended approach." },
  { step: 4, title: "Evaluation & Certification", desc: "We measure impact, report on outcomes, and issue certificates to completers." },
];

const BENEFITS = [
  { title: "Improved Employee Productivity",    desc: "Directly measurable improvement in workforce output and performance metrics." },
  { title: "Stronger Leadership Capability",   desc: "Develop leaders who drive teams and execute strategy effectively." },
  { title: "Better Customer Satisfaction",     desc: "Customer-facing teams that deliver consistent, exceptional experiences." },
  { title: "Increased Operational Efficiency", desc: "Streamlined processes and skilled teams that reduce waste and cost." },
];

export default function CorporateTrainingContent({ images }: { images: string[] }) {
  const [formData, setFormData] = useState({
    organisation: "",
    contactName: "",
    email: "",
    phone: "",
    trainingNeeds: "",
    participants: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type: "corporate-training" }),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ organisation: "", contactName: "", email: "", phone: "", trainingNeeds: "", participants: "", message: "" });
      }
    } catch {
      // silently fail
    }
  };

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <PageHero
        title="Corporate Training Solutions"
        subtitle="Customised training programmes that improve workforce performance and drive organisational results."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Corporate Training" }]}
      />

      {/* What We Offer — image + intro */}
      <section className="py-12 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-8 h-[2px] bg-primary" />
                <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">What We Offer</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-text mb-4">Training Programmes We Deliver</h2>
              <p className="text-text/80 text-base leading-relaxed">
                From leadership to digital skills — our customised programmes are built around your organisation&apos;s specific goals and delivered by seasoned industry practitioners.
              </p>
            </div>
            <div className="relative h-64 overflow-hidden">
              <Image src={img(images, 0)} alt="Corporate training workshop" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-secondary/20" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {OFFERINGS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-surface border border-secondary/10 p-6 hover:border-primary/30 hover:shadow-sm transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon size={18} className="text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-heading font-bold text-text mb-2">{item.title}</h3>
                <p className="text-text/80 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works — with image */}
      <section className="py-12 md:py-20 lg:py-24 bg-surface">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative h-64 overflow-hidden order-last lg:order-first">
              <Image src={img(images, 1)} alt="World Impact Africa training process" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-primary/10" />
            </div>
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-8 h-[2px] bg-primary" />
                <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">How It Works</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-text mb-4">Our 4-Step Process</h2>
              <p className="text-text/80 text-base leading-relaxed">
                Every engagement begins with understanding — and ends with measurable impact.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative bg-white border border-secondary/10 p-6"
              >
                <div className="w-12 h-12 bg-primary flex items-center justify-center text-white font-heading font-bold text-lg mb-5">
                  {step.step}
                </div>
                <h3 className="text-base font-heading font-bold text-text mb-3">{step.title}</h3>
                <p className="text-text/80 text-sm leading-relaxed">{step.desc}</p>
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-10 -right-3 text-primary/30 text-2xl">&rsaquo;</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 md:py-20 lg:py-24 bg-secondary">
        <div className="container mx-auto">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-8 h-[2px] bg-primary" />
            <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">Benefits</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-12">Why Organisations Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 bg-white/10 p-6 border border-white/10"
              >
                <CheckCircle size={20} className="text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-heading font-bold text-white mb-1">{b.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-8 h-[2px] bg-primary" />
                <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">Enquire Now</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-text mb-4">
                Request a Corporate Training Proposal
              </h2>
              <p className="text-text/80 text-base leading-relaxed mb-6">
                Tell us about your training needs and our team will get back to you with a customised proposal within 48 hours.
              </p>
              <div className="relative h-64 overflow-hidden">
                <Image src={img(images, 2)} alt="Get in touch" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-secondary/20" />
              </div>
            </div>

            <div className="bg-surface border border-secondary/10 p-6 md:p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle size={48} className="text-primary mx-auto mb-4" strokeWidth={1.5} />
                  <h3 className="text-xl font-heading font-bold text-text mb-2">Enquiry Received</h3>
                  <p className="text-text/80 text-sm">Thank you. Our team will review your request and respond within 48 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-heading font-semibold text-text mb-1 uppercase tracking-wide">Organisation</label>
                      <input name="organisation" value={formData.organisation} onChange={handleChange} required
                        className="w-full border border-secondary/20 bg-white px-4 py-2.5 text-sm text-text placeholder:text-text/30 focus:outline-none focus:border-primary transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-heading font-semibold text-text mb-1 uppercase tracking-wide">Contact Name</label>
                      <input name="contactName" value={formData.contactName} onChange={handleChange} required
                        className="w-full border border-secondary/20 bg-white px-4 py-2.5 text-sm text-text placeholder:text-text/30 focus:outline-none focus:border-primary transition-colors" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-heading font-semibold text-text mb-1 uppercase tracking-wide">Email</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required
                        className="w-full border border-secondary/20 bg-white px-4 py-2.5 text-sm text-text placeholder:text-text/30 focus:outline-none focus:border-primary transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-heading font-semibold text-text mb-1 uppercase tracking-wide">Phone</label>
                      <input name="phone" value={formData.phone} onChange={handleChange}
                        className="w-full border border-secondary/20 bg-white px-4 py-2.5 text-sm text-text placeholder:text-text/30 focus:outline-none focus:border-primary transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-heading font-semibold text-text mb-1 uppercase tracking-wide">Training Needs</label>
                    <select name="trainingNeeds" value={formData.trainingNeeds} onChange={handleChange} required
                      className="w-full border border-secondary/20 bg-white px-4 py-2.5 text-sm text-text focus:outline-none focus:border-primary transition-colors">
                      <option value="">Select area of interest</option>
                      <option value="leadership">Leadership Development</option>
                      <option value="sales">Sales Performance</option>
                      <option value="customer">Customer Experience</option>
                      <option value="digital">Digital Skills</option>
                      <option value="compliance">Compliance &amp; Risk</option>
                      <option value="hr">HR &amp; Workforce Development</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-heading font-semibold text-text mb-1 uppercase tracking-wide">Expected Participants</label>
                      <input name="participants" value={formData.participants} onChange={handleChange}
                        className="w-full border border-secondary/20 bg-white px-4 py-2.5 text-sm text-text placeholder:text-text/30 focus:outline-none focus:border-primary transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-heading font-semibold text-text mb-1 uppercase tracking-wide">Message / Requirements</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} rows={4} required
                      className="w-full border border-secondary/20 bg-white px-4 py-2.5 text-sm text-text placeholder:text-text/30 focus:outline-none focus:border-primary transition-colors resize-y" />
                  </div>
                  <button type="submit"
                    className="w-full bg-primary text-white py-3 text-sm font-heading font-semibold hover:bg-secondary transition-colors flex items-center justify-center gap-2">
                    Send Enquiry <Send size={15} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
