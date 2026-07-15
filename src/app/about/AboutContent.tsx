"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import PageHero from "@/components/PageHero";

const CORE_VALUES = [
  {
    title: "Excellence",
    description: "We hold ourselves to the highest standards in everything we deliver — from curriculum design to training facilitation and certification.",
  },
  {
    title: "Innovation",
    description: "We embrace new ideas, technologies, and methodologies to stay ahead of workforce development trends across Africa.",
  },
  {
    title: "Impact",
    description: "Every programme we run is measured by the real difference it makes to individuals, organisations, and communities.",
  },
  {
    title: "Integrity",
    description: "We act with honesty, transparency, and professionalism in all our relationships — with clients, partners, and learners.",
  },
  {
    title: "Practical Learning",
    description: "Our programmes are grounded in real-world application, not theory alone. We train for performance, not just knowledge.",
  },
];

// Curated Unsplash images — relevant to African workforce development
const ABOUT_IMAGES = {
  teamMeeting:    "https://images.unsplash.com/photo-1573164574511-73c773193279?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
  collaboration:  "https://images.unsplash.com/photo-1655720357872-ce227e4164ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
  training:       "https://images.unsplash.com/photo-1744809482817-9a9d4fc280af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
  professionals:  "https://images.unsplash.com/photo-1573164574397-dd250bc8a598?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
};

export default function AboutContent() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <PageHero
        title="About World Impact Africa"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        page="about"
      />

      {/* Mission & Vision — with image */}
      <section className="py-12 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative h-[400px] overflow-hidden"
            >
              <Image
                src={ABOUT_IMAGES.teamMeeting}
                alt="World Impact Africa team meeting — African professionals collaborating"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {/* Accent overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
              <div className="absolute top-4 left-4 bg-primary text-white text-xs font-heading font-semibold px-4 py-2 uppercase tracking-widest">
                Est. Since 2019
              </div>
            </motion.div>

            {/* Mission & Vision cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex flex-col gap-6"
            >
              <div className="bg-surface p-8 border border-secondary/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-[2px] bg-primary" />
                  <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">Our Mission</span>
                </div>
                <p className="text-text text-lg font-heading leading-relaxed">
                  To equip individuals and organisations with practical skills, certifications, and workforce solutions that drive performance and economic growth across Africa.
                </p>
              </div>

              <div className="bg-secondary p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-[2px] bg-primary" />
                  <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">Our Vision</span>
                </div>
                <p className="text-white text-lg font-heading leading-relaxed">
                  To become Africa&apos;s leading workforce transformation and professional development organisation — a continent where every professional has access to world-class skills.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who We Are — image + text */}
      <section className="py-12 md:py-20 lg:py-24 bg-surface">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-8 h-[2px] bg-primary" />
                <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">Who We Are</span>
              </div>
              <h2 className="text-3xl md:text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-text mb-6">
                A Workforce Development Organisation Built for Africa
              </h2>
              <p className="text-text/80 text-base leading-relaxed mb-4">
                World Impact Africa is a workforce development and professional training organisation committed to transforming how individuals and organisations build skills for the future of work.
              </p>
              <p className="text-text/80 text-base leading-relaxed mb-6">
                We believe sustainable economic growth depends on continuous learning, practical skill development, and strong alignment between education systems and industry needs.
              </p>
              <p className="text-text/80 text-base leading-relaxed">
                We also work with governments, corporations, NGOs, and institutions to scale workforce development impact across industries and communities throughout Africa.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="relative h-56 overflow-hidden col-span-2">
                <Image
                  src={ABOUT_IMAGES.collaboration}
                  alt="Team collaborating on a project at World Impact Africa"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={ABOUT_IMAGES.training}
                  alt="Corporate training session delivered by World Impact Africa"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={ABOUT_IMAGES.professionals}
                  alt="African professionals in a World Impact Africa workplace"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-12 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="w-8 h-[2px] bg-primary" />
              <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">Core Values</span>
              <div className="w-8 h-[2px] bg-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text">
              What We Stand For
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_VALUES.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-surface border border-secondary/10 p-8 hover:border-primary/30 hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-primary flex items-center justify-center mb-5 text-white font-heading font-bold text-lg">
                  {i + 1}
                </div>
                <h3 className="text-lg font-heading font-bold text-text mb-3">{value.title}</h3>
                <p className="text-text/80 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
