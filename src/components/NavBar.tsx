"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Home, HeartHandshake, Info, ShieldCheck, UserRound, Phone } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";

const SOLUTIONS_LINKS = [
    { label: "Personal Home Care",        href: "/corporate-training" },
    { label: "Elderly & Companion Care",  href: "/certifications"     },
    { label: "Specialist Care Services",  href: "/talent-solutions"   },
    { label: "Care Professional Network", href: "/representatives"    },
];

const SERVICE_META: Record<string, { desc: string }> = {
    "/corporate-training": { desc: "Daily living support in the comfort of home" },
    "/certifications":     { desc: "Warm companionship for elderly loved ones" },
    "/talent-solutions":   { desc: "Vetted specialists for complex care needs" },
    "/representatives":    { desc: "Join the professionals families trust" },
};

// Shared underline indicator for active nav links
function ActiveUnderline() {
    return (
        <motion.span
            layoutId="nav-underline"
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="absolute -bottom-[6px] left-0 right-0 h-[2px] rounded-full bg-[#FFA513]"
        />
    );
}

export default function NavBar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [solutionsOpen, setSolutionsOpen] = useState(false);
    const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const solutionsRef = useRef<HTMLDivElement>(null);
    const drawerRef = useRef<HTMLDivElement>(null);
    const menuTriggerRef = useRef<HTMLButtonElement>(null);

    const { scrollY } = useScroll();
    useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

    const isServicesActive = SOLUTIONS_LINKS.some((l) => pathname.startsWith(l.href));
    const isActive = (prefix: string) => pathname.startsWith(prefix);

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
            if (e.key === "Escape") {
                setMobileOpen(false);
                return;
            }
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

    // Return focus to the header trigger when the menu closes
    useEffect(() => {
        if (!mobileOpen && menuTriggerRef.current) {
            menuTriggerRef.current.focus({ preventScroll: true });
        }
    }, [mobileOpen]);

    // Lock body scroll while menu is open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

            return (
        <>
            <header
                style={{ boxShadow: scrolled ? "0 12px 32px -16px rgba(0,31,68,0.18)" : "0 8px 24px -20px rgba(0,31,68,0.14)" }}
                className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] border-b border-[#001F44]/8`}
            >
                <div className="w-full max-w-[1440px] mx-auto flex items-center h-[76px] px-4 sm:px-8 lg:px-12">

                    {/* Logo */}
                    <Link href="/" aria-label="Tomlee Home Care Home" className="flex-shrink-0 inline-flex items-center leading-none mr-5 sm:mr-8">
                        <Image src="/logo.png" alt="Tomlee Home Care"
                            width={1280} height={478} priority
                            style={{ height: 40 }}
                            className="block w-auto object-contain" />
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden lg:flex items-center ml-auto">
                        <div className="flex items-center gap-10 xl:gap-12">
                            <div className="relative">
                                <Link href="/about"
                                    className={`nav-link py-4 ${isActive("/about") ? "nav-link-active" : ""}`}>
                                    {pathname === "/about" ? <ActiveUnderline /> : null}About
                                </Link>
                            </div>

                            {/* Solutions dropdown — hover to open */}
                            <div ref={solutionsRef} className="relative"
                                onMouseEnter={() => setSolutionsOpen(true)}
                                onMouseLeave={() => setSolutionsOpen(false)}
                            >
                                <button
                                    onClick={() => setSolutionsOpen(p => !p)}
                                    aria-expanded={solutionsOpen}
                                    aria-haspopup="true"
                                    aria-controls="solutions-dropdown"                                    className={`nav-link flex items-center gap-1.5 py-4 ${isServicesActive ? "nav-link-active" : ""}`}>
                                    {isServicesActive ? <ActiveUnderline /> : null}Services
                                    <ChevronDown size={14} strokeWidth={1.5} className={`transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${solutionsOpen ? "rotate-180" : ""}`} />
                                </button>
                                <AnimatePresence>
                                    {solutionsOpen && (
                                        <motion.div
                                            id="solutions-dropdown"
                                            role="menu"
                                            initial={{ opacity: 0, y: 12, scale: 0.98 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 12, scale: 0.98 }}
                                            transition={{ duration: 0.26, ease: [0.32, 0.72, 0, 1] }}
                                            className="absolute top-full right-0 mt-3 w-[320px] bg-white border border-[#001F44]/8 rounded-2xl shadow-elevated p-2 overflow-hidden"
                                        >
                                            {SOLUTIONS_LINKS.map((l, i) => (
                                                <motion.div
                                                    key={l.href}
                                                    initial={{ opacity: 0, y: 8 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.05, duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
                                                >
                                                    <Link href={l.href} onClick={() => setSolutionsOpen(false)}
                                                        role="menuitem"
                                                        aria-current={isActive(l.href) ? "page" : undefined}
                                                        className="group flex items-start gap-3 px-4 py-3 rounded-xl transition-colors duration-200 hover:bg-tint/70">
                                                        <span className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${isActive(l.href) ? "bg-[#FFA513]" : "bg-[#FFA513]/40 group-hover:bg-[#FFA513]"}`} />
                                                        <span>
                                                            <span className="block text-sm font-semibold text-[#001F44] leading-snug transition-colors duration-200 group-hover:text-[#FFA513]">{l.label}</span>
                                                            <span className="block text-xs text-text/55 mt-0.5 leading-snug">{SERVICE_META[l.href].desc}</span>
                                                        </span>
                                                    </Link>
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="relative">
                                <Link href="/insights"
                                    className={`nav-link py-4 ${isActive("/insights") ? "nav-link-active" : ""}`}>
                                    {isActive("/insights") ? <ActiveUnderline /> : null}Insights
                                </Link>
                            </div>

                            <div className="relative">
                                <Link href="/contact"
                                    className={`nav-link py-4 ${isActive("/contact") ? "nav-link-active" : ""}`}>
                                    {isActive("/contact") ? <ActiveUnderline /> : null}Contact
                                </Link>
                            </div>
                        </div>
                    </nav>

                    {/* CTA + phone + hamburger */}
                    <div className="flex items-center gap-3 sm:gap-5 ml-auto lg:ml-12">
                        <a href="tel:+2347070579947" className="hidden xl:inline-flex items-center gap-2.5 text-sm font-medium text-secondary hover:text-primary-dark transition-colors" aria-label="Call Tomlee Home Care">
                            <span className="w-9 h-9 rounded-full bg-tint flex items-center justify-center text-primary-dark">
                                <Phone size={15} strokeWidth={1.5} />
                            </span>
                            +234 707 057 9947
                        </a>
                        <Link href="/get-started"
                            className="group inline-flex items-center gap-3 bg-primary text-secondary text-sm font-heading font-semibold px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-full tracking-wide hover:bg-primary-dark hover:text-white hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-card">
                            <span className="pl-1 sm:pl-2">Request Care</span>
                            <span className="w-8 h-8 rounded-full bg-secondary text-primary flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-white group-hover:text-secondary group-hover:scale-105">
                                <Home size={14} strokeWidth={2} />
                            </span>
                        </Link>
                        <button
                            ref={menuTriggerRef}
                            onClick={() => setMobileOpen(p => !p)}
                            aria-expanded={mobileOpen}
                            aria-controls="mobile-menu"
                            aria-label={mobileOpen ? "Close menu" : "Open menu"}
                            className="lg:hidden relative w-11 h-11 rounded-full border border-secondary/10 bg-white flex items-center justify-center hover:border-secondary/25 transition-colors duration-200">
                            <span className="relative block w-[18px] h-[14px]">
                                <motion.span
                                    animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                                    transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                                    className="absolute left-0 top-0 h-[2px] w-full rounded-full bg-secondary" />
                                <motion.span
                                    animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                                    transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
                                    className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] w-full rounded-full bg-secondary" />
                                <motion.span
                                    animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                                    transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                                    className="absolute left-0 bottom-0 h-[2px] w-full rounded-full bg-secondary" />
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            {/* ── Mobile menu ── */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        id="mobile-menu"
                        ref={drawerRef}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Mobile navigation"
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                        className="fixed inset-0 z-[60] bg-white flex flex-col overflow-y-auto">
                        <div className="container mx-auto flex items-center justify-between h-[76px] shrink-0 px-4 sm:px-8">
                            <Image src="/logo.png" alt="Tomlee Home Care" width={1280} height={478} style={{ height: 40 }} className="block w-auto object-contain" />
                        </div>

                        <div className="container mx-auto flex-1 py-2 px-4 sm:px-8">
                            {[
                                { label: "Home", icon: Home, href: "/" },
                            ].map(({ label, icon: Icon, href }, i) => (
                                <motion.div key={href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}>
                                    <Link href={href} onClick={() => setMobileOpen(false)} className="mobile-link" aria-current={pathname === href ? "page" : undefined}>
                                        <span className="flex items-center gap-3"><Icon size={18} strokeWidth={1.5} className="text-primary-dark" /> {label}</span>
                                    </Link>
                                </motion.div>
                            ))}

                            {/* Services accordion */}
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}>
                                <button
                                    onClick={() => setMobileSolutionsOpen(p => !p)}
                                    aria-expanded={mobileSolutionsOpen}
                                    className="mobile-link w-full flex items-center justify-between"
                                >
                                    <span className="flex items-center gap-3"><HeartHandshake size={18} strokeWidth={1.5} className="text-primary-dark" /> Services</span>
                                    <span className="w-8 h-8 rounded-full bg-tint flex items-center justify-center">
                                        <ChevronDown size={16} className={`text-[#001F44] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${mobileSolutionsOpen ? "rotate-180" : ""}`} />
                                    </span>
                                </button>
                                <AnimatePresence>
                                    {mobileSolutionsOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                                            className="overflow-hidden"
                                        >
                                            {SOLUTIONS_LINKS.map(l => (
                                                <Link key={l.href} href={l.href}
                                                    onClick={() => setMobileOpen(false)}
                                                    className="mobile-link-sm pl-11 flex items-center gap-2"
                                                    aria-current={isActive(l.href) ? "page" : undefined}>
                                                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50" /> {l.label}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>

                            {[
                                { label: "About",          icon: Info,        href: "/about" },
                                { label: "Insights",       icon: ShieldCheck, href: "/insights" },
                                { label: "Care Network",   icon: UserRound,   href: "/representatives" },
                                { label: "Contact Us",     icon: Phone,       href: "/contact" },
                            ].map(({ label, icon: Icon, href }, i) => (
                                <motion.div key={href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.06, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}>
                                    <Link href={href} onClick={() => setMobileOpen(false)} className="mobile-link" aria-current={pathname === href ? "page" : undefined}>
                                        <span className="flex items-center gap-3"><Icon size={18} strokeWidth={1.5} className="text-primary-dark" /> {label}</span>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                            className="container mx-auto pb-10 shrink-0 px-4 sm:px-8">
                            <a href="tel:+2347070579947"
                                className="flex items-center justify-center gap-3 w-full text-center bg-tint text-secondary py-4 font-heading font-semibold text-sm tracking-wide rounded-full mb-4 transition-colors duration-200 hover:bg-secondary hover:text-white">
                                <Phone size={16} strokeWidth={1.5} /> +234 707 057 9947
                            </a>
                            <Link href="/get-started" onClick={() => setMobileOpen(false)}
                                className="group/cta flex items-center justify-center gap-3 w-full text-center bg-primary hover:bg-primary-dark text-secondary hover:text-white py-4 font-heading font-semibold text-sm tracking-wide rounded-full transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]">
                                <span>Request Care</span>
                                <span className="w-7 h-7 rounded-full bg-secondary text-primary flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/cta:bg-white group-hover/cta:text-secondary group-hover/cta:scale-105">
                                    <Home size={13} strokeWidth={2} />
                                </span>
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}