# Implementation Plan: Prem Edge Interiors & Construction Website Rebrand

## Overview

This plan covers the full rebrand of the existing Next.js OgeDecor website to Prem Edge Interiors & Construction. Tasks are ordered so that the design system (tokens, fonts) is updated first, then global layout, then individual components, then pages, and finally cleanup. Each task is independently executable once its dependencies are met.

## Task Dependency Graph

```json
{
  "waves": [
    { "wave": 1, "tasks": [1] },
    { "wave": 2, "tasks": [2] },
    { "wave": 3, "tasks": [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] },
    { "wave": 4, "tasks": [15, 16, 17, 18, 19, 20, 21] },
    { "wave": 5, "tasks": [22, 23, 24, 25] }
  ]
}
```

## Notes

- All color utility replacements follow the mapping in `design.md` (e.g. `bg-obsidian` → `bg-primary`, `text-gold` → `text-secondary`).
- No Prisma schema changes are required.
- Logo images are replaced with styled text until a real logo asset is provided at `/public/prem-edge-logo.png`.
- Tasks 22–25 (cleanup) should run last to avoid broken references during development.

## Tasks

### Task List

- [x] 1. Update design system — color tokens and typography
- [x] 2. Update global layout — metadata, fonts, and JSON-LD
- [x] 3. Rebrand NavBar component
- [x] 4. Rebrand Footer component
- [x] 5. Rebrand Hero component
- [x] 6. Create WhyChooseUs component (replaces BrandStory)
- [x] 7. Update Services home component
- [x] 8. Create StatsCounter component
- [x] 9. Create ProcessSection component
- [x] 10. Create IndustriesServed component
- [x] 11. Create FAQ component
- [x] 12. Update Testimonials component
- [ ] 13. Update FeaturedProjects component
- [ ] 14. Update InspirationGallery component
- [ ] 15. Rebuild home page composition
- [ ] 16. Rebuild About page content
- [ ] 17. Rebuild Services page content
- [ ] 18. Update Projects / Portfolio page content
- [ ] 19. Update existing Project Detail page
- [ ] 20. Update Contact page content
- [ ] 21. Create Blog page
- [ ] 22. Remove shop and shipping-returns routes
- [ ] 23. Update sitemap, privacy, terms pages
- [ ] 24. Update package.json and README
- [ ] 25. Delete old brand assets from public/

---

## Tasks (Implementation Details)

- [ ] 1. Update design system — color tokens and typography
  Update `src/app/globals.css` to replace all OgeDecor palette variables with the Prem Edge color tokens and update the `@theme inline` block. Replace the `bg-strip-pattern` utility to use the new tokens.

  **Sub-tasks:**
  - [ ] 1.1 In `globals.css` `:root` block, replace the five OgeDecor variables (`--color-obsidian`, `--color-sand`, `--color-gold`, `--color-bronze`, `--color-emerald`) with the six Prem Edge variables: `--color-primary: #1F2937`, `--color-secondary: #C9A227`, `--color-accent: #F8F5F0`, `--color-background: #FFFFFF`, `--color-text: #111827`, `--color-success: #10B981`. Also update `--background` and `--foreground` root aliases accordingly.
  - [ ] 1.2 Update the `@theme inline` block to expose the new tokens as Tailwind utilities (`--color-primary`, `--color-secondary`, `--color-accent`, `--color-background`, `--color-text`, `--color-success`) and remove the old token entries. Add `--font-heading` and `--font-body` variables (values will be wired in Task 2).
  - [ ] 1.3 Update the `body` selector to use `background-color: var(--color-background)`, `color: var(--color-text)`, and `font-family: var(--font-body)`.
  - [ ] 1.4 Update `bg-strip-pattern` to use `--color-primary` as background and `--color-secondary` for the diagonal stripe color.

- [ ] 2. Update global layout — metadata, fonts, and JSON-LD
  Rewrite `src/app/layout.tsx` to load Poppins and Inter fonts, update the root Metadata object with full Prem Edge branding, and inject a JSON-LD Organization script.

  **Sub-tasks:**
  - [ ] 2.1 Replace `Playfair_Display` and `Montserrat` imports with `Poppins` (weights 400, 600, 700; variable `--font-poppins`) and `Inter` (weights 400, 500; variable `--font-inter`) from `next/font/google`.
  - [ ] 2.2 In the `<body>` className, replace `${playfair.variable} ${montserrat.variable}` with `${poppins.variable} ${inter.variable}` and replace `bg-obsidian text-sand` with `bg-background text-text`.
  - [ ] 2.3 Wire the font variables into `globals.css` `@theme inline`: `--font-heading: var(--font-poppins)` and `--font-body: var(--font-inter)`.
  - [ ] 2.4 Replace the root `Metadata` export with: `title.default: "Prem Edge Interiors & Construction"`, `title.template: "%s | Prem Edge Interiors & Construction"`, `description` referencing premium interior design, residential and commercial construction, and renovation, `keywords` array from Requirement 5, `authors/creator/publisher: "Prem Edge Interiors & Construction"`, `metadataBase` updated to `https://premedgeinteriors.com`, `openGraph.siteName: "Prem Edge Interiors & Construction"`, `openGraph.locale: "en_US"`, Twitter card fields updated.
  - [ ] 2.5 Add a `<script type="application/ld+json">` tag inside `<body>` containing a JSON-LD `Organization` object with: `name: "Prem Edge Interiors & Construction"`, `url`, `description`, `email: "info@premedgeinteriors.com"`, `sameAs: []`.

- [ ] 3. Rebrand NavBar component
  Update `src/components/NavBar.tsx` to show the new navigation links, remove the shopping cart, and replace the logo image with a brand-name text element.

  **Sub-tasks:**
  - [ ] 3.1 Replace the `navLinks` array with: `[{ name: "Home", href: "/" }, { name: "About", href: "/about" }, { name: "Services", href: "/services" }, { name: "Projects", href: "/projects" }, { name: "Blog", href: "/blog" }, { name: "Contact", href: "/contact" }]`.
  - [ ] 3.2 Remove the `ShoppingBag` import and both the desktop cart button and the mobile cart button elements entirely.
  - [ ] 3.3 Replace the `<img src="/ogedecor.png" alt="OgeDecor Logo" />` element with a styled text logo: `<span className="text-xl font-heading font-bold text-secondary tracking-wide">Prem Edge</span>` (wrapped in the existing `<Link href="/">`).
  - [ ] 3.4 Replace all `bg-obsidian`, `text-sand`, `text-gold`, `hover:text-gold`, `bg-gold`, `text-obsidian` Tailwind utilities in the component with their Prem Edge equivalents (`bg-primary`, `text-accent`, `text-secondary`, `hover:text-secondary`, `bg-secondary`, `text-primary`).
  - [ ] 3.5 In the mobile menu, replace `font-serif` with `font-heading` on the link elements.

- [ ] 4. Rebrand Footer component
  Update `src/components/Footer.tsx` to replace the logo image, update all links and copy to Prem Edge branding, and remove the shipping-returns link.

  **Sub-tasks:**
  - [ ] 4.1 Replace the `<img src="/ogedecor.png" .../>` logo with `<span className="text-2xl font-heading font-bold text-secondary">Prem Edge Interiors & Construction</span>`.
  - [ ] 4.2 Update the tagline paragraph from "Redefining spaces with African elegance and modern luxury." to "Building Spaces. Creating Experiences. Premium construction and interior design solutions across residential, commercial, and renovation projects."
  - [ ] 4.3 Update the EXPLORE link list to: `About (/about)`, `Services (/services)`, `Projects (/projects)`, `Blog (/blog)`, `Contact (/contact)`.
  - [ ] 4.4 Remove the `Collection (/shop)` link. In the LEGAL list, remove the `Shipping & Returns (/shipping-returns)` link.
  - [ ] 4.5 Update the contact email anchor from `hello@ogedecor.com` to `info@premedgeinteriors.com`.
  - [ ] 4.6 Update the copyright line to `© {new Date().getFullYear()} Prem Edge Interiors & Construction. All rights reserved.` and the tagline to `Building Spaces. Creating Experiences.`
  - [ ] 4.7 Replace all old color utilities (`bg-obsidian`, `text-gold`, `hover:bg-gold`, `hover:text-obsidian`, `border-white/10`) with Prem Edge equivalents throughout the component.

- [ ] 5. Rebrand Hero component
  Update `src/components/Hero.tsx` to display Prem Edge headline and copy, replace the "Shop Collection" CTA, and update the background image aria-label.

  **Sub-tasks:**
  - [ ] 5.1 Replace the `<h2>` eyebrow text from "Interior Design Studio" to "Premium Construction & Interior Design".
  - [ ] 5.2 Replace the `<h1>` text from "African Elegance. Modern Living." to "Building Spaces. Creating Experiences."
  - [ ] 5.3 Replace the `<p>` subheadline from Wakanda/Afro-futurism copy to: "Premium construction and interior design solutions for homes, offices, and commercial developments. We transform your vision into remarkable spaces."
  - [ ] 5.4 Replace the "View Projects" button `href` from `#projects` to `/projects` and update its label to "View Our Projects".
  - [ ] 5.5 Replace the "Shop Collection" secondary link with: `<Link href="/contact">Request Consultation</Link>` with the same styling.
  - [ ] 5.6 Update the `aria-label` on the background image div from "Luxurious interior living room with dark walls and geometric accents" to "Premium construction and interior design project by Prem Edge Interiors & Construction".
  - [ ] 5.7 Replace `font-serif` with `font-heading`, `text-sand` with `text-accent`, `text-gold` with `text-secondary`, `bg-gold` with `bg-secondary`, `border-gold` with `border-secondary`, `text-obsidian` with `text-primary` throughout the component.

- [ ] 6. Create WhyChooseUs component (replaces BrandStory)
  Create `src/components/WhyChooseUs.tsx` as a new component presenting Prem Edge's four differentiators. This replaces the Afro-futuristic BrandStory entirely.

  **Sub-tasks:**
  - [ ] 6.1 Create `src/components/WhyChooseUs.tsx` with a section containing: eyebrow label "Why Choose Us", heading "Built on Quality. Driven by Innovation.", and a 2×2 grid of four differentiator cards.
  - [ ] 6.2 The four cards should each have an icon, title, and description: (1) "Quality Construction" — "We deliver durable, high-quality projects using premium materials and proven construction methods." (2) "Innovative Design" — "Creative spaces tailored to your unique vision, blending functionality with modern aesthetics." (3) "Experienced Team" — "Our professionals bring years of industry expertise to every residential and commercial project." (4) "On-Time Delivery" — "We respect your time. Projects are completed efficiently, on schedule, and within agreed budgets."
  - [ ] 6.3 Style with Prem Edge tokens: light background (`bg-accent`), gold accent line, `text-primary` headings, `text-secondary` icons.
  - [ ] 6.4 Keep the existing framer-motion `whileInView` animation pattern from BrandStory for consistency.

- [ ] 7. Update Services home component
  Replace the four OgeDecor service items in `src/components/Services.tsx` with six Prem Edge service items.

  **Sub-tasks:**
  - [ ] 7.1 Replace the `services` array with six items: Interior Design (`PenTool`), Residential Construction (`Home`), Commercial Construction (`Building2`), Renovation & Remodeling (`Hammer`), Space Planning (`Layout`), Project Management (`ClipboardList`). Each with a relevant description sentence.
  - [ ] 7.2 Update the section eyebrow from "Our Expertise" to "What We Do" and the heading from "Design Services" to "Our Services".
  - [ ] 7.3 Update the CTA link text from "Explore Our Design Journey" to "View All Services".
  - [ ] 7.4 Update the grid from `lg:grid-cols-4` to `lg:grid-cols-3` to accommodate 6 items in two rows.
  - [ ] 7.5 Replace all old color utilities with Prem Edge equivalents throughout the component.

- [ ] 8. Create StatsCounter component
  Create `src/components/StatsCounter.tsx` displaying four animated statistics counters for the home page.

  **Sub-tasks:**
  - [ ] 8.1 Create `src/components/StatsCounter.tsx` with a section containing four stat items: `150+ Projects Completed`, `200+ Happy Clients`, `10+ Years of Experience`, `50+ Team Members`.
  - [ ] 8.2 Use framer-motion `whileInView` to trigger a simple count-up animation or fade-in on scroll.
  - [ ] 8.3 Style with a `bg-primary` (deep charcoal) background, `text-secondary` (gold) numbers, and `text-accent` labels to create a high-contrast statistics bar.

- [ ] 9. Create ProcessSection component
  Create `src/components/ProcessSection.tsx` presenting the four-step Prem Edge project workflow.

  **Sub-tasks:**
  - [ ] 9.1 Create `src/components/ProcessSection.tsx` with four steps: Step 1 — Consultation, Step 2 — Planning & Design, Step 3 — Construction & Execution, Step 4 — Project Delivery.
  - [ ] 9.2 Each step has a step number badge, title, and one-sentence description.
  - [ ] 9.3 Connect steps with a horizontal line on desktop (same pattern as the existing ServicesContent process section).
  - [ ] 9.4 Use `text-secondary` for step numbers and connector line, `text-primary` for titles.

- [ ] 10. Create IndustriesServed component
  Create `src/components/IndustriesServed.tsx` displaying six industry tiles.

  **Sub-tasks:**
  - [ ] 10.1 Create `src/components/IndustriesServed.tsx` with a section heading "Industries We Serve" and six tiles: Residential, Commercial, Hospitality, Healthcare, Education, Retail.
  - [ ] 10.2 Each tile has a relevant Lucide icon, title, and a short one-line descriptor.
  - [ ] 10.3 Style as a 2×3 or 3×2 grid with `border-secondary/20` borders, hover effect `bg-secondary/10`.

- [ ] 11. Create FAQ component
  Create `src/components/FAQ.tsx` as an accessible accordion with at least five Prem Edge-relevant Q&A pairs.

  **Sub-tasks:**
  - [ ] 11.1 Create `src/components/FAQ.tsx` with state managing which item is open (only one open at a time).
  - [ ] 11.2 Include five FAQ items: (1) "How long does a typical construction project take?" (2) "What areas do you serve?" (3) "Do you handle both design and construction?" (4) "How do I get started with a consultation?" (5) "Can you work within a fixed budget?"
  - [ ] 11.3 Each accordion item uses a `<button>` with `aria-expanded` and `aria-controls` attributes, and the answer panel has the corresponding `id` and `role="region"` for WCAG 2.1 AA compliance.
  - [ ] 11.4 Animate open/close with framer-motion `AnimatePresence` and a height transition.
  - [ ] 11.5 Style: `bg-accent` section background, `text-primary` questions, `text-secondary` chevron icon that rotates on open.

- [ ] 12. Update Testimonials component
  Update `src/components/Testimonials.tsx` to replace OgeDecor client quotes and update the CTA section copy.

  **Sub-tasks:**
  - [ ] 12.1 Replace the three testimonial objects with Prem Edge-relevant placeholder quotes: (1) "Prem Edge transformed our office space beyond expectations. Professional, on time, and outstanding quality." — Michael A., CEO. (2) "From consultation to handover, the team was exceptional. Our new home is everything we dreamed of." — Jennifer O., Homeowner. (3) "Reliable, innovative, and detail-oriented. Prem Edge delivered our commercial fit-out flawlessly." — David K., Operations Director.
  - [ ] 12.2 Update the CTA section heading from "Ready to elevate your space?" to "Let's Build Something Exceptional Together".
  - [ ] 12.3 Update the CTA paragraph from OgeDecor copy to: "Tell us about your project and let's create something remarkable. Book your free consultation today."
  - [ ] 12.4 Update the CTA button text from "Start Your Design Journey" to "Book Free Consultation".
  - [ ] 12.5 Replace old color utilities with Prem Edge equivalents.

- [ ] 13. Update FeaturedProjects component
  Update `src/components/FeaturedProjects.tsx` to replace OgeDecor placeholder project titles and update copy.

  **Sub-tasks:**
  - [ ] 13.1 Replace the four mock project entries with Prem Edge-relevant titles: (1) "Lekki Luxury Residence" — Residential, (2) "Lagos Corporate Hub" — Commercial, (3) "Abuja Villa Renovation" — Renovation, (4) "GRA Office Complex" — Commercial.
  - [ ] 13.2 Update the section eyebrow from "Selected Works" to "Featured Projects" and the heading from "Our Portfolio" to "Featured Work".
  - [ ] 13.3 Replace old color utilities with Prem Edge equivalents.

- [ ] 14. Update InspirationGallery component
  Update `src/components/InspirationGallery.tsx` heading copy and replace old color utilities.

  **Sub-tasks:**
  - [ ] 14.1 Update the section eyebrow from "Moodboard" to "Project Gallery" and the heading from "Inspiration Gallery" to "Our Work in Focus".
  - [ ] 14.2 Replace old color utilities (`text-gold`, `bg-strip-pattern`) with Prem Edge equivalents.
  - [ ] 14.3 Update each image `alt` attribute from `"Inspiration ${index + 1}"` to `"Prem Edge interior and construction project ${index + 1}"`.

- [ ] 15. Rebuild home page composition
  Update `src/app/page.tsx` to import the new and updated components in the correct order, remove ShopPreview, and update page-level Metadata.

  **Sub-tasks:**
  - [ ] 15.1 Remove `ShopPreview` and `BrandStory` imports.
  - [ ] 15.2 Add imports for `WhyChooseUs`, `StatsCounter`, `ProcessSection`, `IndustriesServed`, `FAQ`.
  - [ ] 15.3 Update the component render order to: `<Hero />`, `<WhyChooseUs />`, `<Services />`, `<StatsCounter />`, `<FeaturedProjects />`, `<ProcessSection />`, `<IndustriesServed />`, `<InspirationGallery />`, `<Testimonials />`, `<FAQ />`.
  - [ ] 15.4 Update page-level `Metadata`: title `"Home | Premium Construction & Interior Design"`, description referencing Prem Edge services.

- [ ] 16. Rebuild About page content
  Completely rewrite `src/app/about/AboutContent.tsx` to present Prem Edge as a company with overview, mission, vision, values, and team sections. Update the About page `Metadata`.

  **Sub-tasks:**
  - [ ] 16.1 Remove all Ogechi, Nigerian heritage, Afro-luxury, and OgeDecor content.
  - [ ] 16.2 Add a company overview hero section: heading "About Prem Edge Interiors & Construction", subheading "Transforming Ideas into Remarkable Spaces", and a paragraph describing the company.
  - [ ] 16.3 Add a Mission section: "To deliver premium interior and construction solutions that exceed client expectations through quality, innovation, and integrity."
  - [ ] 16.4 Add a Vision section: "To become a leading construction and interior design company recognised for excellence, innovation, and integrity across every project we deliver."
  - [ ] 16.5 Add a Core Values section with four value cards: Quality, Integrity, Innovation, Client Satisfaction — each with a Lucide icon and one-sentence description.
  - [ ] 16.6 Add a "Meet The Team" section with four placeholder team cards: each with a placeholder avatar (`bg-accent` div), a name, and a role (e.g. "Lead Architect", "Interior Designer", "Project Manager", "Site Supervisor").
  - [ ] 16.7 Update `src/app/about/page.tsx` Metadata to: `title: "About | Prem Edge Interiors & Construction"`, description referencing the company overview.

- [ ] 17. Rebuild Services page content
  Rewrite `src/app/services/ServicesContent.tsx` to list all six Prem Edge services and replace the five Afro-futuristic process steps with five professional ones. Update page Metadata.

  **Sub-tasks:**
  - [ ] 17.1 Replace the `servicesList` array with six Prem Edge services: Interior Design, Residential Construction, Commercial Construction, Renovation & Remodeling, Space Planning, Project Management — each with a title, description, and four feature bullet points.
  - [ ] 17.2 Replace the `designProcess` array: step 01 "Consultation", step 02 "Design & Planning", step 03 "Approval", step 04 "Execution", step 05 "Handover" — each with a professional description.
  - [ ] 17.3 Update the process section eyebrow from "The Alchemy of Design" to "How We Work" and the heading from the Afro-futuristic copy to "Our Process".
  - [ ] 17.4 Update all CTA copy: "Start this Journey" → "Get a Quote", "Book a private curation session" → "Book a consultation", button text → "Book a Free Consultation".
  - [ ] 17.5 Update `src/app/services/page.tsx` Metadata to: `title: "Services | Prem Edge Interiors & Construction"`.

- [ ] 18. Update Projects / Portfolio page content
  Update `src/app/projects/PortfolioContent.tsx` to use the new categories, remove OgeDecor-specific placeholder titles, and update headings. Update page Metadata.

  **Sub-tasks:**
  - [ ] 18.1 Replace `CATEGORIES` constant with `["All", "Residential", "Commercial", "Interior Design", "Renovation"]`.
  - [ ] 18.2 Replace all six mock project entries with Prem Edge-relevant titles and categories: (1) "Lekki Luxury Residence" — Residential, (2) "Lagos Corporate Hub" — Commercial, (3) "Abuja Villa Renovation" — Renovation, (4) "GRA Office Complex" — Commercial, (5) "Victoria Island Penthouse" — Interior Design, (6) "Ikeja Retail Fit-Out" — Interior Design.
  - [ ] 18.3 Update the page heading eyebrow from "Our Creations" to "Our Projects" and the main heading from "The Portfolio" to "Featured Work".
  - [ ] 18.4 Replace the empty-state message "No projects found in this collection." with "No projects found in this category." and update the reset button copy.
  - [ ] 18.5 Update `src/app/projects/page.tsx` Metadata to: `title: "Projects | Prem Edge Interiors & Construction"`.

- [ ] 19. Update existing Project Detail page
  Update `src/app/projects/[id]/page.tsx` to ensure it renders the full project detail structure and exports a proper dynamic Metadata object.

  **Sub-tasks:**
  - [ ] 19.1 Read the current `src/app/projects/[id]/page.tsx` content and ensure the page renders: a hero image section, project info panel (client, location, category, timeline), a gallery grid, and placeholder sections for Challenges, Solutions, and Results.
  - [ ] 19.2 Export a dynamic `generateMetadata` function that returns `title: \`${project.title} | Prem Edge Interiors & Construction\`` and an appropriate description.
  - [ ] 19.3 Replace any OgeDecor-specific copy or color utilities in the page.

- [ ] 20. Update Contact page content
  Rewrite the step content in `src/app/contact/ContactContent.tsx` and update the WhatsApp message and success copy. Update page Metadata.

  **Sub-tasks:**
  - [ ] 20.1 Update Step 0 intro: heading "Let's Build Something Great Together", body copy "Tell us about your project and we'll get back to you within 24 hours to discuss how we can help.", button text "Start Your Project".
  - [ ] 20.2 Replace the `projectTypes` array with six Prem Edge options: Residential Construction (`Home`), Commercial Construction (`Building2`), Interior Design (`PenTool`), Renovation & Remodeling (`Hammer`), Space Planning (`Layout`), Project Management (`ClipboardList`).
  - [ ] 20.3 Replace the Step 2 `moodOptions` (Calm/Bold/Warm/Modern African Elegance) with `scopeOptions`: New Build (`Building`), Renovation (`Wrench`), Interior Fit-Out (`Layers`), Full Turnkey (`PackageCheck`) — rename the step heading to "What best describes your project scope?".
  - [ ] 20.4 Update the WhatsApp message template: replace "Hello OgeDecor!" with "Hello Prem Edge Interiors & Construction!" and replace "Atmosphere" field label with "Project Scope".
  - [ ] 20.5 Update Step 7 success heading from "Manifested." to "Thank You!" and the body copy from Afro-futurism language to: "Your project enquiry has been received. Our team will be in touch within 24 hours to discuss next steps."
  - [ ] 20.6 Replace all `font-serif` with `font-heading` and all old color utilities with Prem Edge equivalents throughout the component.
  - [ ] 20.7 Update `src/app/contact/page.tsx` Metadata to: `title: "Contact | Prem Edge Interiors & Construction"`.

- [ ] 21. Create Blog page
  Create `src/app/blog/page.tsx` and `src/app/blog/BlogContent.tsx` as a static listing page with category filters and placeholder post cards.

  **Sub-tasks:**
  - [ ] 21.1 Create `src/app/blog/BlogContent.tsx` as a `"use client"` component with: a page hero section (eyebrow "Our Blog", heading "Insights & Inspiration"), a row of category filter chips (All, Construction Tips, Interior Design Trends, Home Improvement, Building Materials, Smart Homes, Sustainable Construction), and a 3-column grid of placeholder post cards.
  - [ ] 21.2 Include three placeholder post cards, each with: a placeholder image (Unsplash interior/construction URL), category chip, title, excerpt, and a "Read More" link (href `#`).
  - [ ] 21.3 When no posts match the selected category, show a "Coming Soon" message with the tagline "Building Spaces. Creating Experiences."
  - [ ] 21.4 Create `src/app/blog/page.tsx` that imports `BlogContent` and exports `Metadata` with `title: "Blog | Prem Edge Interiors & Construction"` and a description about construction tips and interior design insights.

- [ ] 22. Remove shop and shipping-returns routes
  Delete the `/shop` and `/shipping-returns` route directories and the `ShopPreview.tsx` component.

  **Sub-tasks:**
  - [ ] 22.1 Delete `src/app/shop/` directory (including `page.tsx` and `ShopContent.tsx`).
  - [ ] 22.2 Delete `src/app/shipping-returns/` directory (including `page.tsx` and `ShippingContent.tsx`).
  - [ ] 22.3 Delete `src/components/ShopPreview.tsx`.
  - [ ] 22.4 Delete `src/components/BrandStory.tsx` (its content has been replaced by the new `WhyChooseUs.tsx`).

- [ ] 23. Update sitemap, privacy, and terms pages
  Update `src/app/sitemap.ts` to use the Prem Edge domain and correct routes. Update privacy and terms pages to reference Prem Edge.

  **Sub-tasks:**
  - [ ] 23.1 In `src/app/sitemap.ts`, replace `baseUrl` with `https://premedgeinteriors.com`, remove the `/shop` entry, and add entries for `/about` and `/blog`.
  - [ ] 23.2 In `src/app/privacy/PrivacyContent.tsx`, replace all occurrences of "OgeDecor", "Oge Decor", and related terms with "Prem Edge Interiors & Construction". Update any email addresses to `info@premedgeinteriors.com`.
  - [ ] 23.3 In `src/app/terms/TermsContent.tsx`, replace all occurrences of "OgeDecor", "Oge Decor", and related terms with "Prem Edge Interiors & Construction".
  - [ ] 23.4 Update `src/app/privacy/page.tsx` Metadata title to `"Privacy Policy | Prem Edge Interiors & Construction"`.
  - [ ] 23.5 Update `src/app/terms/page.tsx` Metadata title to `"Terms of Service | Prem Edge Interiors & Construction"`.

- [ ] 24. Update package.json and README
  Update project-level files to reflect the Prem Edge brand.

  **Sub-tasks:**
  - [ ] 24.1 In `package.json`, change `"name": "ogedecor"` to `"name": "prem-edge-interiors"`.
  - [ ] 24.2 Rewrite `README.md` to describe the Prem Edge Interiors & Construction project: what it is, tech stack (Next.js, Tailwind CSS, Prisma, Neon, Cloudinary), getting started instructions, and environment variables needed.

- [ ] 25. Delete old brand assets from public/
  Remove OgeDecor image files from the `public/` directory after all references have been removed.

  **Sub-tasks:**
  - [ ] 25.1 Delete `/public/ogedecor.png`.
  - [ ] 25.2 Delete `/public/ogedecoricon.png`.
  - [ ] 25.3 Delete `/public/ogechi-portrait.png`.
  - [ ] 25.4 Delete `/public/ogechi-portrait - Copy.png`.
  - [ ] 25.5 Verify no remaining `src` attributes, `backgroundImage` strings, or import statements reference the deleted files. Fix any remaining references.
