"use client";

import PageHero from "@/components/PageHero";

export default function PrivacyContent() {
    return (
        <main className="min-h-screen bg-background text-text pb-24">
            <PageHero title="Privacy Policy" page="privacy" />
            <div className="container mx-auto px-6 py-16 max-w-3xl space-y-10 text-text/85 leading-relaxed">

                <section>
                    <h2 className="text-lg font-heading font-semibold text-primary mb-3">At Tomlee Home Care</h2>
                    <p>We hold your privacy in the highest regard. This Privacy Policy outlines how we collect, use, and protect your personal information when you engage with our home care services and care professional network.</p>
                </section>

                <section>
                    <h2 className="text-lg font-heading font-semibold text-primary mb-3">1. Information Collection</h2>
                    <p>We collect information you provide directly — such as when you submit an enquiry, request a care assessment, or join our network — including name, email, phone number, care needs, and family preferences.</p>
                </section>

                <section>
                    <h2 className="text-lg font-heading font-semibold text-primary mb-3">2. How We Use Your Data</h2>
                    <p>Your information is used solely to provide our services: matching care professionals, coordinating care plans, communicating with families, and sending relevant updates with your consent.</p>
                </section>

                <section>
                    <h2 className="text-lg font-heading font-semibold text-primary mb-3">3. Data Security</h2>
                    <p>We implement rigorous security measures to protect your personal data against unauthorised access, alteration, or disclosure.</p>
                </section>

                <section>
                    <h2 className="text-lg font-heading font-semibold text-primary mb-3">4. Third-Party Sharing</h2>
                    <p>Tomlee Home Care does not sell or trade your personal information. Trusted partners who assist in our operations are required to maintain confidentiality.</p>
                </section>

                <section>
                    <h2 className="text-lg font-heading font-semibold text-primary mb-3">5. Contact</h2>
                    <p>Questions? Reach us at <a href="mailto:info@tomleehomecare.ng" className="text-secondary hover:underline">info@tomleehomecare.ng</a>.</p>
                </section>

                <p className="text-text/60 text-sm">Last Updated: January 2026</p>
            </div>
        </main>
    );
}