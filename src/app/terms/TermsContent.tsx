"use client";

import PageHero from "@/components/PageHero";

export default function TermsContent() {
    return (
        <main className="min-h-screen bg-background text-text pb-24">
            <PageHero title="Terms of Service" page="terms" />
            <div className="container mx-auto px-6 py-16 max-w-3xl space-y-10 text-text/85 leading-relaxed">

                <section>
                    <h2 className="text-lg font-heading font-semibold text-primary mb-3">1. Engagement</h2>
                    <p>By accessing or using the Tomlee Home Care website and services, you agree to be bound by these Terms of Service. Our services include personal home care, elderly &amp; companion care, specialist care services, and our care professional network.</p>
                </section>

                <section>
                    <h2 className="text-lg font-heading font-semibold text-primary mb-3">2. Our Process</h2>
                    <p>Our care process is structured for quality outcomes. Care assessments, care plans, and scheduling terms are agreed with families at the point of engagement.</p>
                </section>

                <section>
                    <h2 className="text-lg font-heading font-semibold text-primary mb-3">3. Intellectual Property</h2>
                    <p>All content, care materials, training frameworks, and branding developed by Tomlee Home Care remain our intellectual property. Unauthorised reproduction or distribution is prohibited.</p>
                </section>

                <section>
                    <h2 className="text-lg font-heading font-semibold text-primary mb-3">4. Care Programme Terms</h2>
                    <p>All care arrangements are subject to formal engagement terms outlining scope, schedule, fees, and responsibilities. Any changes to the agreed scope must be documented and may affect timelines and costs.</p>
                </section>

                <section>
                    <h2 className="text-lg font-heading font-semibold text-primary mb-3">5. Limitation of Liability</h2>
                    <p>Tomlee Home Care is not liable for delays or damages caused by independent third-party entities beyond our direct control.</p>
                </section>

                <section>
                    <h2 className="text-lg font-heading font-semibold text-primary mb-3">6. Termination</h2>
                    <p>Either party may terminate the care engagement with 30 days&apos; written notice. The client is responsible for all fees incurred up to the termination date in accordance with the refund policy.</p>
                </section>

                <section>
                    <h2 className="text-lg font-heading font-semibold text-primary mb-3">7. Contact</h2>
                    <p>For queries: <a href="mailto:info@tomleehomecare.com" className="text-secondary hover:underline">info@tomleehomecare.com</a></p>
                </section>

                <p className="text-text/60 text-sm">Last Updated: January 2026</p>
            </div>
        </main>
    );
}