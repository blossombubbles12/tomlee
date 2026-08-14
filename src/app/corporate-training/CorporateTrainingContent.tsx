"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Bath, ShowerHead, Utensils, Pill, CheckCircle, Send, DoorOpen } from "lucide-react";
import Image from "next/image";
import PageHero from "@/components/PageHero";

function img(images: string[], idx: number): string {
  return images[idx % images.length] || "";
}

const OFFERINGS = [
  { icon: Bath,      title: "Personal Care & Hygiene",      desc: "Gentle assistance with bathing, grooming, dressing, and daily hygiene routines." },
  { icon: ShowerHead, title: "Mobility Support",            desc: "Help with moving around the home, transfers, and safe daily activity." },
  { icon: Utensils,  title: "Meal Preparation & Nutrition", desc: "Nutritious meals prepared around your loved one's dietary needs and preferences." },
  { icon: Pill,      title: "Medication Reminders",         desc: "Timely, careful medication reminders and support with daily medication routines." },
  { icon: Heart,     title: "Companionship & Connection",   desc: "Warm, consistent companionship that brightens each day and reduces loneliness." },
  { icon: DoorOpen,  title: "Household & Errand Assistance", desc: "Light housekeeping and errand support so home stays comfortable and cared for." },
];

const STEPS = [
  { step: 1, title: "Free Care Assessment",      desc: "We meet your loved one and family to understand needs, routines, and preferences." },
  { step: 2, title: "Personalised Care Plan",    desc: "We design a bespoke care plan around your loved one's lifestyle and goals." },
  { step: 3, title: "Professional Matching",     desc: "We match a vetted, trained care professional who fits your family's home." },
  { step: 4, title: "Ongoing Family Support",    desc: "Regular check-ins and transparent updates so you're always in the loop." },
];

const BENEFITS = [
  { title: "Independence Preserved",    desc: "Care that supports, never replaces — your loved one stays in charge of their own life." },
  { title: "Peace of Mind for Families", desc: "Rested, confident family members knowing their loved one is in safe hands." },
  { title: "Consistent, Dependable Care", desc: "The same familiar professional, visit after visit." },
  { title: "Flexible Scheduling",        desc: "Hourly visits, overnight stays, or live-in — wherever support is needed." },
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
        title="Personal Home Care"
        subtitle="Dignified, everyday support delivered in the comfort of home — built around your loved one's life."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Personal Home Care" }]}
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
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-text mb-4">The Support Your Loved One Needs</h2>
              <p className="text-text/80 text-base leading-relaxed">
                From morning routines to evening meals — our trained care professionals deliver practical, compassionate support that keeps life comfortable and independent at home.
              </p>
            </div>
            <div className="relative h-64 overflow-hidden">
              <Image src={img(images, 0)} alt="Care professional supporting a client at home" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
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
              <Image src={img(images, 1)} alt="Tomlee Home Care professional training process" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-primary/10" />
            </div>
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-8 h-[2px] bg-primary" />
                <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">How It Works</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-text mb-4">Our 4-Step Care Process</h2>
              <p className="text-text/80 text-base leading-relaxed">
                Every care journey begins with understanding — and ends with genuine peace of mind.
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-12">Why Families Choose Us</h2>
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
                Request a Free Care Assessment
              </h2>
              <p className="text-text/80 text-base leading-relaxed mb-6">
                Tell us about your loved one&apos;s needs and our care team will get back to you within 24 hours.
              </p>
              <div className="relative h-64 overflow-hidden">
                <Image src={img(images, 2)} alt="Get in touch with Tomlee Home Care" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-secondary/20" />
              </div>
            </div>

            <div className="bg-surface border border-secondary/10 p-6 md:p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle size={48} className="text-primary mx-auto mb-4" strokeWidth={1.5} />
                  <h3 className="text-xl font-heading font-bold text-text mb-2">Enquiry Received</h3>
                  <p className="text-text/80 text-sm">Thank you. Our care team will review your request and respond within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-heading font-semibold text-text mb-1 uppercase tracking-wide">Your Name</label>
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
                    <label className="block text-xs font-heading font-semibold text-text mb-1 uppercase tracking-wide">Support Needed</label>
                    <select name="trainingNeeds" value={formData.trainingNeeds} onChange={handleChange} required
                      className="w-full border border-secondary/20 bg-white px-4 py-2.5 text-sm text-text focus:outline-none focus:border-primary transition-colors">
                      <option value="">Select area of care</option>
                      <option value="leadership">Personal Care &amp; Hygiene</option>
                      <option value="sales">Mobility Support</option>
                      <option value="customer">Meal Preparation</option>
                      <option value="digital">Medication Reminders</option>
                      <option value="compliance">Companionship &amp; Connection</option>
                      <option value="hr">Household &amp; Errand Assistance</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-heading font-semibold text-text mb-1 uppercase tracking-wide">Hours Needed / Week</label>
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