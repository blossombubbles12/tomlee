import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The page you are looking for does not exist or has been moved. Return to Tomlee Home Care.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4">
      <div className="text-center max-w-lg">
        <div className="text-8xl font-heading font-bold text-primary/20 mb-4">404</div>
        <div className="w-12 h-[2px] bg-primary mx-auto mb-6" />
        <h1 className="text-3xl font-heading font-bold text-text mb-4">Page Not Found</h1>
        <p className="text-text/80 text-base leading-relaxed mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 font-heading font-semibold text-sm tracking-wide hover:bg-secondary transition-colors"
          >
            Back to Home <ArrowRight size={15} />
          </Link>
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 border border-secondary/20 text-text px-6 py-3 font-heading font-semibold text-sm tracking-wide hover:border-primary hover:text-primary transition-colors"
          >
            View Our Services <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
