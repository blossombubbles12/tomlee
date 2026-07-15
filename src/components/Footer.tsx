import Link from "next/link";
import Image from "next/image";
import { Linkedin, Facebook, Twitter } from "lucide-react";

const QUICK_LINKS = [
  { label: "About",              href: "/about" },
  { label: "Representatives",    href: "/representatives" },
  { label: "Solutions",          href: "/solutions" },
  { label: "Certifications",     href: "/certifications" },
  { label: "Corporate Training", href: "/corporate-training" },
  { label: "Talent Solutions",   href: "/talent-solutions" },
  { label: "Insights",           href: "/insights" },
  { label: "Contact",            href: "/contact" },
];

const SOLUTION_LINKS = [
  { label: "Corporate Training",           href: "/corporate-training" },
  { label: "Professional Certifications",  href: "/certifications" },
  { label: "Talent & Workforce Solutions", href: "/talent-solutions" },
  { label: "Become a Representative",      href: "/representatives/apply" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy",   href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="bg-secondary w-full overflow-x-hidden">
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />

      <div className="container mx-auto py-12 md:py-16 lg:py-20">
        {/* 
          Mobile:  single column
          Tablet:  2 columns (brand + quick links on row 1, solutions + contact on row 2)
          Desktop: 4 columns (12-col grid)
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-12 mb-10 md:mb-16">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4">
            <div className="mb-5">
              <Image src="/wialogo.png" alt="World Impact Africa"
                width={160} height={48} className="h-10 w-auto object-contain brightness-0 invert" priority />
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm mb-6">
              World Impact Africa is a workforce development and professional training organisation committed to transforming how individuals and organisations build skills for the future of work across Africa. We deliver industry-recognised certifications, corporate training, talent solutions, and consulting services that drive performance and economic growth.
            </p>
            <div className="flex gap-3">
              {[Linkedin, Twitter, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={["LinkedIn", "Twitter", "Facebook"][i]}
                  className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/55 hover:bg-primary hover:border-primary hover:text-white transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-semibold tracking-[0.25em] text-white/55 uppercase mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
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

          {/* Solutions */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-semibold tracking-[0.25em] text-white/55 uppercase mb-5">
              Our Solutions
            </h4>
            <ul className="space-y-2.5">
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
            <h4 className="text-[10px] font-semibold tracking-[0.25em] text-white/55 uppercase mb-5">
              Get In Touch
            </h4>
            <ul className="space-y-3 mb-7">
              <li>
                <a href="mailto:info@worldimpactafrica.com" className="text-sm text-white/70 hover:text-primary transition-colors duration-200 break-all">
                  info@worldimpactafrica.com
                </a>
              </li>
              <li>
                <a href="tel:+2347070579947" className="text-sm text-white/70 hover:text-primary transition-colors duration-200">
                  +234 707 057 9947
                </a>
              </li>
              <li className="text-sm text-white/70 leading-relaxed">
                198 BnB Mall, Ibeju-Lekki,<br />Lagos, Nigeria
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
        <div className="pt-6 md:pt-8 border-t border-white/10">
          <p className="text-xs text-white/45 text-center sm:text-left">
            &copy; {new Date().getFullYear()} World Impact Africa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
