"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import PageHero from "@/components/PageHero";

const CORE_VALUES = [
  {
    title: "Compassion",
    description: "Every person deserves to be cared for with dignity and warmth. Compassion is the heart of everything our care professionals do.",
  },
  {
    title: "Trust",
    description: "Families invite us into their homes. We earn that trust through honesty, transparency, and consistent, dependable care.",
  },
  {
    title: "Professionalism",
    description: "Our care professionals are thoroughly vetted, rigorously trained, and held to the highest standards of home care practice.",
  },
  {
    title: "Respect",
    description: "We honour each individual's independence, preferences, and personal rhythm — care is personal, never one-size-fits-all.",
  },
  {
    title: "Excellence",
    description: "From the first call to every visit, we hold ourselves to standards that families can rely on, day after day.",
  },
];

// Curated Unsplash images — relevant to compassionate home care
const ABOUT_IMAGES = {
  teamMeeting:    "https://images.unsplash.com/photo-1584515933487-779824d29309?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
  collaboration:  "https://images.unsplash.com/photo-1556761175-b413da4baf72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
  training:       "https://images.unsplash.com/photo-1543269865-cbf427effbad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
  professionals:  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
};

export default function AboutContent() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <PageHero
        title="About Tomlee Home Care"
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
                alt="A Tomlee Home Care professional providing compassionate care"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {/* Accent overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
              <div className="absolute top-4 left-4 bg-primary text-white text-xs font-heading font-semibold px-4 py-2 uppercase tracking-widest">
                Caring Since 2019
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
                  To deliver compassionate, professional home care that lets families and their loved ones live with dignity, comfort, and independence — right where they belong.
                </p>
              </div>

              <div className="bg-secondary p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-[2px] bg-primary" />
                  <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">Our Vision</span>
                </div>
                <p className="text-white text-lg font-heading leading-relaxed">
                  To become Nigeria&apos;s most trusted home care provider — a family where every person receives the care and companionship they deserve.
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
                A Home Care Family Built on Trust
              </h2>
              <p className="text-text/80 text-base leading-relaxed mb-4">
                Tomlee Home Care is a trusted provider of professional home care services — supporting elderly loved ones, people recovering from illness or surgery, and families who need a helping hand at home.
              </p>
              <p className="text-text/80 text-base leading-relaxed mb-6">
                We believe care begins with understanding. Every plan we build starts with a conversation about your loved one&apos;s needs, routines, and preferences.
              </p>
              <p className="text-text/80 text-base leading-relaxed">
                We also work with hospitals, care facilities, and community organisations to extend compassionate care beyond the four walls of a hospital.
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
                  alt="A care professional supporting a client at home"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={ABOUT_IMAGES.training}
                  alt="Tomlee Home Care professional training session"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={ABOUT_IMAGES.professionals}
                  alt="A Tomlee Home Care professional ready to serve"
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