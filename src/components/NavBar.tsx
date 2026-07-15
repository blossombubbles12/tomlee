"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ChevronRight, Home, Info, GraduationCap, Building2, Users, Newspaper, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const SOLUTIONS_LINKS = [
    { label: "Corporate Training",           href: "/corporate-training" },
    { label: "Professional Certifications",  href: "/certifications"     },
    { label: "Talent & Workforce Solutions", href: "/talent-solutions"   },
    { label: "Global Representative Network", href: "/representatives"   },
];

export default function NavBar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [solutionsOpen, setSolutionsOpen] = useState(false);
    const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);

    const solutionsRef = useRef<HTMLDivElement>(null);
    const drawerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (solutionsRef.current && !solutionsRef.current.contains(e.target as Node)) {
                setSolutionsOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    // Focus trap: keep Tab / Shift+Tab cycling within the drawer while it is open
    useEffect(() => {
        if (!mobileOpen) return;
        const drawer = drawerRef.current;
        if (!drawer) return;

        const focusableSelector = 'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])';

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key !== "Tab") return;
            const focusable = Array.from(
                drawer.querySelectorAll<HTMLElement>(focusableSelector)
            ).filter(el => !el.hasAttribute("disabled"));
            if (focusable.length === 0) return;
            const first = focusable[0];
            const last  = focusable[focusable.length - 1];
            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };

        drawer.addEventListener("keydown", handleKeyDown);
        return () => drawer.removeEventListener("keydown", handleKeyDown);
    }, [mobileOpen]);

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-primary/8 shadow-sm">
                <div className="w-full max-w-[1440px] mx-auto flex items-center h-16 px-4 sm:px-6 lg:px-12 xl:px-16">

                    {/* Logo */}
                    <Link href="/" aria-label="World Impact Africa Home" className="flex-shrink-0">
                        <Image src="/wialogo.png" alt="World Impact Africa"
                            width={100} height={36} className="h-9 w-auto object-contain" priority />
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center ml-16 lg:ml-24 xl:ml-32 gap-6 lg:gap-8 xl:gap-10">

                        <Link href="/about" className="nav-link">About</Link>

                        {/* Solutions dropdown — hover to open */}
                        <div ref={solutionsRef} className="relative"
                            onMouseEnter={() => setSolutionsOpen(true)}
                            onMouseLeave={() => setSolutionsOpen(false)}
                        >
                            <button
                                onClick={() => setSolutionsOpen(p => !p)}
                                aria-expanded={solutionsOpen}
                                aria-haspopup="true"
                                aria-controls="solutions-dropdown"
                                className="nav-link flex items-center gap-1"
                            >
                                Solutions <ChevronDown size={14} className={`ml-0.5 transition-transform duration-200 ${solutionsOpen ? "rotate-180" : ""}`} strokeWidth={2.5} />
                            </button>
                            <AnimatePresence>
                                {solutionsOpen && (
                                    <motion.div
                                        id="solutions-dropdown"
                                        role="menu"
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 6 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-white border border-primary/8 shadow-xl py-2 z-50"
                                    >
                                        {SOLUTIONS_LINKS.map(l => (
                                            <Link key={l.href} href={l.href} onClick={() => setSolutionsOpen(false)}
                                                role="menuitem"
                                                className="block px-5 py-3 text-sm text-primary/80 hover:text-secondary hover:bg-surface transition-colors">
                                                {l.label}
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link href="/certifications"     className="nav-link">Certifications</Link>
                        <Link href="/corporate-training" className="nav-link">Corporate Training</Link>
                        <Link href="/talent-solutions"   className="nav-link">Talent Solutions</Link>
                        <Link href="/insights"           className="nav-link">Insights</Link>
                    </nav>

                    {/* CTA + hamburger */}
                    <div className="flex items-center gap-4 ml-auto">
                        <Link href="/representatives/apply" className="hidden md:inline-block bg-primary text-white text-xs font-heading font-semibold px-5 py-2 tracking-wide hover:bg-secondary transition-colors rounded-sm">
                            Apply Now
                        </Link>
                        <button onClick={() => setMobileOpen(true)} className="md:hidden text-primary hover:text-secondary transition-colors" aria-label="Open menu">
                            <Menu size={22} />
                        </button>
                    </div>
                </div>
            </header>

            {/* ── Mobile menu ── */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div ref={drawerRef} initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed inset-0 z-[60] bg-white flex flex-col overflow-y-auto">

                        <div className="container mx-auto flex items-center justify-between h-16 border-b border-primary/8 shrink-0 px-4 sm:px-6 lg:px-8">
                            <Link href="/" aria-label="World Impact Africa Home" onClick={() => setMobileOpen(false)}>
                                <Image src="/wialogo.png" alt="World Impact Africa" width={120} height={36} className="h-9 w-auto object-contain" />
                            </Link>
                            <button onClick={() => setMobileOpen(false)} className="text-primary hover:text-secondary" aria-label="Close menu"><X size={22} /></button>
                        </div>

                        <div className="container mx-auto flex-1 py-2 px-4 sm:px-6 lg:px-8">
                            <Link href="/" onClick={() => setMobileOpen(false)} className="mobile-link">
                                <span className="flex items-center gap-3"><Home size={18} strokeWidth={1.5} className="text-primary/60" /> Home</span>
                            </Link>
                            <Link href="/about" onClick={() => setMobileOpen(false)} className="mobile-link">
                                <span className="flex items-center gap-3"><Info size={18} strokeWidth={1.5} className="text-primary/60" /> About</span>
                            </Link>

                            {/* Solutions accordion */}
                            <div>
                                <button
                                    onClick={() => setMobileSolutionsOpen(p => !p)}
                                    aria-expanded={mobileSolutionsOpen}
                                    className="mobile-link w-full flex items-center justify-between"
                                >
                                    <span className="flex items-center gap-3"><Briefcase size={18} strokeWidth={1.5} className="text-primary/60" /> Solutions</span>
                                    <ChevronDown size={16} className={`transition-transform duration-200 ${mobileSolutionsOpen ? "rotate-180" : ""}`} />
                                </button>
                                <AnimatePresence>
                                    {mobileSolutionsOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden"
                                        >
                                            {SOLUTIONS_LINKS.map(l => (
                                                <Link key={l.href} href={l.href}
                                                    onClick={() => setMobileOpen(false)}
                                                    className="mobile-link-sm pl-11 flex items-center gap-2">
                                                    <ChevronRight size={12} className="text-primary/40" /> {l.label}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <Link href="/certifications" onClick={() => setMobileOpen(false)} className="mobile-link">
                                <span className="flex items-center gap-3"><GraduationCap size={18} strokeWidth={1.5} className="text-primary/60" /> Certifications</span>
                            </Link>
                            <Link href="/corporate-training" onClick={() => setMobileOpen(false)} className="mobile-link">
                                <span className="flex items-center gap-3"><Building2 size={18} strokeWidth={1.5} className="text-primary/60" /> Corporate Training</span>
                            </Link>
                            <Link href="/talent-solutions" onClick={() => setMobileOpen(false)} className="mobile-link">
                                <span className="flex items-center gap-3"><Users size={18} strokeWidth={1.5} className="text-primary/60" /> Talent Solutions</span>
                            </Link>
                            <Link href="/insights" onClick={() => setMobileOpen(false)} className="mobile-link">
                                <span className="flex items-center gap-3"><Newspaper size={18} strokeWidth={1.5} className="text-primary/60" /> Insights</span>
                            </Link>
                        </div>

                        <div className="container mx-auto pb-10 shrink-0 px-4 sm:px-6 lg:px-8">
                            <Link href="/representatives/apply" onClick={() => setMobileOpen(false)}
                                className="block w-full text-center bg-primary text-white py-3 font-heading font-semibold text-sm tracking-wide hover:bg-secondary transition-colors rounded-sm">
                                Apply Now
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{``}</style>
        </>
    );
}
