"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const SLIDES = [
  {
    eyebrow: "Africa's Workforce Development Partner",
    headline: "Building Future-Ready",
    headlineAccent: "Workforces Across Africa",
    subheadline:
      "World Impact Africa equips individuals, organisations, and governments with practical skills, professional certifications, and workforce solutions that drive performance and economic growth.",
    cta1: { label: "Explore Solutions", href: "/solutions" },
    cta2: { label: "Request Corporate Training", href: "/corporate-training" },
    cta3: { label: "Enroll in Certification", href: "/certifications" },
    alt: "African professionals in a collaborative office environment",
  },
  {
    eyebrow: "Corporate Training Solutions",
    headline: "Transforming Teams,",
    headlineAccent: "Driving Organisational Growth",
    subheadline:
      "Customised training programmes in leadership, sales, digital skills, and HR — designed to improve workforce performance and deliver measurable results.",
    cta1: { label: "View Training Programmes", href: "/corporate-training" },
    cta2: { label: "Request a Proposal", href: "/get-started" },
    cta3: { label: "Contact Us", href: "/contact" },
    alt: "Corporate training workshop with African professionals",
  },
  {
    eyebrow: "Professional Certifications",
    headline: "Validate Your Skills,",
    headlineAccent: "Advance Your Career",
    subheadline:
      "Industry-recognised certifications across business, technology, finance, and leadership — through training-based or exam-only pathways. Get certified today.",
    cta1: { label: "Browse Certifications", href: "/certifications" },
    cta2: { label: "Enroll Now", href: "/get-started" },
    cta3: { label: "Exam-Only Pathway", href: "/certifications" },
    alt: "Female speaker presenting professional certification content",
  },
  {
    eyebrow: "Talent & Workforce Solutions",
    headline: "Build Sustainable",
    headlineAccent: "Talent Pipelines",
    subheadline:
      "From graduate training programmes to skills assessment and talent outsourcing — we help organisations attract, develop, and retain high-performance talent.",
    cta1: { label: "Explore Talent Solutions", href: "/talent-solutions" },
    cta2: { label: "Partner With Us", href: "/get-started" },
    cta3: { label: "Learn More", href: "/solutions" },
    alt: "African women professionals in an office setting",
  },
];

const SLIDE_DURATION = 6000;

export default function Hero({ images = [] }: { images?: string[] }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (index: number, dir: number) => {
      setDirection(dir);
      setCurrent((index + SLIDES.length) % SLIDES.length);
    },
    []
  );

  const next = useCallback(() => goTo(current + 1, 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, -1), [current, goTo]);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [next, paused]);

  const FALLBACK_IMAGES = [
    "https://images.unsplash.com/photo-1573164574511-73c773193279?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000",
    "https://images.unsplash.com/photo-1744809482817-9a9d4fc280af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000",
    "https://images.unsplash.com/photo-1778922286590-5cc0bcba34ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000",
    "https://images.unsplash.com/photo-1573164574397-dd250bc8a598?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000",
  ];

  const slide = SLIDES[current];

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -80 : 80 }),
  };

  return (
    <section
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{ height: "calc(100vh - 4rem)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Hero slideshow"
    >
      {/* Background image — crossfade */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${current}`}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/55 to-secondary/90 z-10" />
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${images[current] || FALLBACK_IMAGES[current]})` }}
            role="img"
            aria-label={slide.alt}
          />
        </motion.div>
      </AnimatePresence>

      {/* Slide content */}
      <div className="relative z-20 w-full">
        <div className="container mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
              className="max-w-3xl"
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-5 md:mb-7">
                <div className="w-8 md:w-12 h-[1px] bg-primary shrink-0" />
                <span className="text-primary text-[10px] md:text-xs font-medium tracking-[0.2em] md:tracking-[0.3em] uppercase">
                  {slide.eyebrow}
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white leading-[1.1] mb-5 md:mb-7">
                {slide.headline}
                <br />
                <span className="text-primary">{slide.headlineAccent}</span>
              </h1>

              {/* Subheadline */}
              <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed mb-7 md:mb-10 max-w-xl">
                {slide.subheadline}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 flex-wrap">
                <Link
                  href={slide.cta1.href}
                  className="group inline-flex items-center gap-2 bg-primary text-white px-5 sm:px-8 py-3 sm:py-4 font-heading font-semibold text-xs sm:text-sm tracking-wide hover:bg-primary/90 transition-all duration-300 w-full sm:w-auto justify-center sm:justify-start"
                >
                  {slide.cta1.label}
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href={slide.cta2.href}
                  className="group inline-flex items-center gap-2 border border-white/50 text-white px-5 sm:px-8 py-3 sm:py-4 font-heading font-semibold text-xs sm:text-sm tracking-wide hover:border-primary hover:text-primary transition-all duration-300 w-full sm:w-auto justify-center sm:justify-start"
                >
                  {slide.cta2.label}
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href={slide.cta3.href}
                  className="inline-flex items-center gap-2 text-white/80 hover:text-primary text-xs sm:text-sm font-medium tracking-widest uppercase border-b border-white/20 hover:border-primary pb-1 transition-all duration-300 sm:mt-1"
                >
                  {slide.cta3.label}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 flex items-center justify-center border border-white/20 text-white/70 hover:bg-primary hover:border-primary hover:text-white transition-all duration-200"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 flex items-center justify-center border border-white/20 text-white/70 hover:bg-primary hover:border-primary hover:text-white transition-all duration-200"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dot indicators + progress bar */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3">
        <div className="flex items-center gap-2 md:gap-3">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              aria-label={`Go to slide ${i + 1}`}
              className={`transition-all duration-400 rounded-full ${
                i === current
                  ? "w-6 md:w-8 h-2 bg-primary"
                  : "w-2 h-2 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        {/* Progress bar — hidden on mobile to save space */}
        {!paused && (
          <div className="hidden sm:block w-32 md:w-40 h-[1px] bg-white/20 overflow-hidden">
            <motion.div
              key={current}
              className="h-full bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
            />
          </div>
        )}
      </div>

      {/* Slide counter — hidden on small mobile */}
      <div className="hidden sm:block absolute bottom-6 md:bottom-10 right-4 md:right-10 z-30 text-white/45 text-xs font-heading tracking-widest">
        {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
      </div>
    </section>
  );
}
