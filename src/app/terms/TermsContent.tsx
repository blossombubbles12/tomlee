"use client";

import PageHero from "@/components/PageHero";

export default function TermsContent() {
    return (
        <main className="min-h-screen bg-background text-text pb-24">
            <PageHero title="Terms of Service" page="terms" />
            <div className="container mx-auto px-6 py-16 max-w-3xl space-y-10 text-text/85 leading-relaxed">

                <section>
                    <h2 className="text-lg font-heading font-semibold text-primary mb-3">1. Engagement</h2>
                    <p>By accessing or using the World Impact Africa website and services, you agree to be bound by these Terms of Service. Our services include professional training, certification programmes, corporate training solutions, and workforce development initiatives.</p>
                </section>

                <section>
                    <h2 className="text-lg font-heading font-semibold text-primary mb-3">2. Our Process</h2>
                    <p>Our training and certification process is structured for quality outcomes. Enrolment terms, programme schedules, and assessment criteria are provided at the point of registration.</p>
                </section>

                <section>
                    <h2 className="text-lg font-heading font-semibold text-primary mb-3">3. Intellectual Property</h2>
                    <p>All course materials, curriculum, training content, and certification frameworks developed by World Impact Africa remain our intellectual property. Unauthorised reproduction or distribution is prohibited.</p>
                </section>

                <section>
                    <h2 className="text-lg font-heading font-semibold text-primary mb-3">4. Programme Terms</h2>
                    <p>All programmes are subject to formal enrolment terms outlining scope, duration, fees, and certification requirements. Any changes to the agreed scope must be documented and may affect timelines and costs.</p>
                </section>

                <section>
                    <h2 className="text-lg font-heading font-semibold text-primary mb-3">5. Limitation of Liability</h2>
                    <p>World Impact Africa is not liable for delays or damages caused by independent third-party entities beyond our direct control.</p>
                </section>

                <section>
                    <h2 className="text-lg font-heading font-semibold text-primary mb-3">6. Termination</h2>
                    <p>Either party may terminate the engagement with 30 days&apos; written notice. The client is responsible for all fees incurred up to the termination date in accordance with the refund policy.</p>
                </section>

                <section>
                    <h2 className="text-lg font-heading font-semibold text-primary mb-3">7. Contact</h2>
                    <p>For queries: <a href="mailto:info@worldimpactafrica.com" className="text-secondary hover:underline">info@worldimpactafrica.com</a></p>
                </section>

                <p className="text-text/60 text-sm">Last Updated: January 2026</p>
            </div>
        </main>
    );
}
