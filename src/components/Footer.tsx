import Link from "next/link";
import Image from "next/image";
import { Linkedin, Facebook, Twitter, Phone } from "lucide-react";

const QUICK_LINKS = [
  { label: "About",          href: "/about" },
  { label: "Services",       href: "/solutions" },
  { label: "Care Network",   href: "/representatives" },
  { label: "Insights",       href: "/insights" },
  { label: "Contact",        href: "/contact" },
];

const SOLUTION_LINKS = [
  { label: "Companion Care",              href: "/solutions" },
  { label: "Personal & Clinical Care",    href: "/certifications" },
  { label: "Live-In Home Care",            href: "/solutions" },
  { label: "Become a Care Professional",   href: "/representatives/apply" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy",   href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="bg-secondary w-full overflow-x-hidden">
      <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-40" />

      <div className="container mx-auto py-16 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12 mb-12 md:mb-16">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4">
            <div className="mb-6 inline-flex items-center leading-none">
              <Image src="/logo-white.png" alt="Tomlee Home Care"
                width={1286} height={336} style={{ height: 44 }} className="block w-auto object-contain drop-shadow-[0_1px_8px_rgba(0,0,0,0.25)]" priority />
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm mb-7">
              Tomlee Home Care delivers professional, compassionate home health and elderly care services — helping families keep their loved ones safe, comfortable, and independent in the comfort of home.
            </p>
            <div className="flex gap-3">
              {[Linkedin, Twitter, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={["LinkedIn", "Twitter", "Facebook"][i]}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/55 hover:bg-primary hover:border-primary hover:text-secondary active:scale-[0.96] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-semibold tracking-[0.25em] text-white/55 uppercase mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map(link => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-semibold tracking-[0.25em] text-white/55 uppercase mb-6">
              Our Services
            </h4>
            <ul className="space-y-3">
              {SOLUTION_LINKS.map(link => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-primary transition-colors duration-200 leading-snug block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Legal */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-semibold tracking-[0.25em] text-white/55 uppercase mb-6">
              Get In Touch
            </h4>
            <ul className="space-y-4 mb-8">
              <li>
                <a href="mailto:info@tomleehomecare.com" className="text-sm text-white/70 hover:text-primary transition-colors duration-200 break-all">
                  info@tomleehomecare.com
                </a>
              </li>
              <li>
                <a href="tel:+14049997936" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-primary transition-colors duration-200">
                  <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                    <Phone size={12} className="text-primary" />
                  </span>
                  +1 404-999-7936
                </a>
              </li>
              <li className="text-sm text-white/70 leading-relaxed">
                Lawrenceville, GA 30044, USA
              </li>
            </ul>
            <h5 className="text-[10px] font-semibold tracking-[0.25em] text-white/45 uppercase mb-3">
              Legal
            </h5>
            <ul className="space-y-2">
              {LEGAL_LINKS.map(link => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-white/55 hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-xs text-white/45">
              &copy; {new Date().getFullYear()} Tomlee Home Care. All rights reserved.
            </p>
            <Link
              href="/get-started"
              className="group inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest hover:text-white transition-colors duration-200"
            >
              Request Care
              <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-secondary transition-colors duration-300">
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}