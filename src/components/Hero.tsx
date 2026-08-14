"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const SLIDES = [
  {
    eyebrow: "Compassionate Care at Home",
    headline: "Professional Care,",
    headlineAccent: "Right at Home",
    subheadline:
      "Tomlee Home Care connects your loved ones with trusted, vetted caregivers who deliver dignified, personalised support — from daily living assistance to specialist clinical care.",
    cta1: { label: "Request Care", href: "/get-started" },
    cta2: { label: "Explore Our Services", href: "/solutions" },
    alt: "Professional caregiver warmly supporting an elderly woman at home",
  },
  {
    eyebrow: "Elderly & Companion Care",
    headline: "Companionship That",
    headlineAccent: "Feels Like Family",
    subheadline:
      "Our trained companions help seniors stay safe, active, and connected in familiar surroundings — supporting wellbeing, medication routines, and meaningful everyday companionship.",
    cta1: { label: "Find a Caregiver", href: "/get-started" },
    cta2: { label: "Our Care Standards", href: "/about" },
    alt: "Caregiver sharing a warm moment with a senior client at home",
  },
  {
    eyebrow: "Specialist Home Care",
    headline: "Care Beyond",
    headlineAccent: "the Hospital",
    subheadline:
      "From post-operative recovery to long-term support for chronic conditions, our specialist carers bring professional, clinical-level care into the home — with compassion at every step.",
    cta1: { label: "Request a Care Plan", href: "/get-started" },
    cta2: { label: "About Tomlee Home Care", href: "/about" },
    alt: "Attentive professional carer helping a patient during recovery at home",
  },
];

const SLIDE_DURATION = 7000;

export default function Hero({ images = [] }: { images?: string[] }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  const goTo = useCallback(
    (index: number, dir: number) => {
      setDirection(dir);
      setCurrent((index + SLIDES.length) % SLIDES.length);
    },
    []
  );

  const next = useCallback(() => goTo(current + 1, 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, -1), [current, goTo]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [next, paused]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 48) {
      if (dx < 0) next();
      else prev();
    }
    touchX.current = null;
  };

  const FALLBACK_IMAGES = [
    "https://images.unsplash.com/photo-1584515933487-779824d29309?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000",
    "https://images.unsplash.com/photo-1595475884562-073c30d45670?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000",
    "https://images.unsplash.com/photo-1543269865-cbf427effbad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000",
  ];

  const slide = SLIDES[current];

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 48 : -48 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -48 : 48 }),
  };

  return (
    <section
      className="relative w-full overflow-hidden flex items-center"
      style={{ height: "calc(100dvh - 4.5rem)", minHeight: 560 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-label="Hero slideshow"
    >
      {/* Background image — full-width crossfade */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${current}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0 z-0"
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${images[current] || FALLBACK_IMAGES[current]})` }}
            role="img"
            aria-label={slide.alt}
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark text fade overlay — soft navy horizontal gradient behind the copy */}
      {/* Mobile: stronger left-to-right fade so text stays readable */}
      <div
        aria-hidden
        className="absolute inset-0 z-10 md:hidden"
        style={{
          background:
            "linear-gradient(to right, #00264D 0%, #00264D 55%, rgba(0,38,77,0.9) 74%, rgba(0,38,77,0.5) 92%, rgba(0,38,77,0.22) 100%)",
        }}
      />
      {/* Desktop: clean navy text area → soft fade → fully visible image */}
      <div
        aria-hidden
        className="absolute inset-0 z-10 hidden md:block"
        style={{
          background:
            "linear-gradient(to right, #00264D 0%, #00264D 30%, rgba(0,38,77,0.75) 50%, rgba(0,38,77,0.32) 68%, rgba(0,38,77,0.08) 80%, rgba(0,38,77,0) 88%)",
        }}
      />

      {/* Slide content — left aligned, within the left 40–50% */}
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
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              className="max-w-2xl"
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-5 md:mb-7">
                <div className="w-8 md:w-12 h-[1px] bg-primary shrink-0" />
                <span className="type-label text-primary">
                  {slide.eyebrow}
                </span>
              </div>

              {/* Headline */}
              <h1 className="type-display text-white mb-5 md:mb-7">
                {slide.headline}
                <br />
                <span className="text-primary">{slide.headlineAccent}</span>
              </h1>

              {/* Subheadline */}
              <p className="type-body text-white/85 mb-7 md:mb-10 max-w-xl">
                {slide.subheadline}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 flex-wrap">
                <Link
                  href={slide.cta1.href}
                  className="group inline-flex items-center gap-3 bg-primary text-secondary px-6 sm:px-8 py-3.5 sm:py-4 font-heading font-semibold text-xs sm:text-sm rounded-full hover:bg-primary-dark hover:text-white active:scale-[0.98] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] w-full sm:w-auto justify-center sm:justify-start shadow-card"
                >
                  {slide.cta1.label}
                  <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                    <ArrowRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </span>
                </Link>
                <Link
                  href={slide.cta2.href}
                  className="group inline-flex items-center gap-3 border border-white/40 text-white px-6 sm:px-8 py-3.5 sm:py-4 font-heading font-semibold text-xs sm:text-sm rounded-full hover:bg-white hover:border-white hover:text-secondary active:scale-[0.98] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] w-full sm:w-auto justify-center sm:justify-start"
                >
                  {slide.cta2.label}
                </Link>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Prev / Next arrows — minimal */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 flex items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-sm text-white hover:bg-primary hover:border-primary active:scale-[0.96] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 flex items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-sm text-white hover:bg-primary hover:border-primary active:scale-[0.96] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
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
                  : "w-2 h-2 bg-white/35 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        {/* Progress bar — hidden on mobile to save space */}
        {!paused && (
          <div className="hidden sm:block w-32 md:w-40 h-[1px] bg-white/20 overflow-hidden rounded-full">
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
      <div className="hidden sm:block absolute bottom-6 md:bottom-10 right-4 md:right-10 z-30 text-white/50 text-xs font-heading tracking-widest">
        {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
      </div>
    </section>
  );
}
