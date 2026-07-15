# Implementation Plan: WorldImpact Group Website Rebrand

## Overview

This plan converts the existing "Prime Edge Interiors & Construction" Next.js application into the WorldImpact Group website. Work proceeds in dependency order: design tokens first (everything else depends on them), then global layout and shared components, then the home page, then individual content pages, then legacy cleanup, and finally automated tests. Each task references the requirements it satisfies.

---

## Tasks

- [ ] 1. Update design tokens in `globals.css`
  - [ ] 1.1 Replace `@theme inline` block with WorldImpact Group colour tokens
    - Set `--color-primary: #F58635`, `--color-secondary: #005D24`, `--color-surface: #F5F7FA`, `--color-background: #FFFFFF`, `--color-text: #1A1A2E`
    - Remove `--color-accent` (old `#F8F5F0`) and replace any `bg-accent` / `text-accent` utilities that depend on it with appropriate surface or white equivalents across the file
    - Update `.bg-strip-pattern` to use `#005D24` background with `rgba(245,134,53,0.05)` stripe overlay
    - _Requirements: 1.1, 1.2_

  - [ ]* 1.2 Write unit test asserting new token hex values are present in `globals.css`
    - Create `src/__tests__/globals.test.ts`
    - Assert file content contains `#F58635`, `#005D24`, `#F5F7FA`, `#1A1A2E`
    - Assert file does NOT contain old values `#1F2937`, `#C9A227`, `#F8F5F0`
    - _Requirements: 1.1, 1.2_

- [ ] 2. Update global layout (`layout.tsx`) and metadata
  - [ ] 2.1 Replace all metadata and JSON-LD with WorldImpact Group values
    - Update `title.default` and `template` to "WorldImpact Group"
    - Update `description`, `keywords`, `authors`, `creator`, `publisher`, `metadataBase` to `https://worldimpact.com.ng`
    - Update `openGraph` locale to `en_NG` and all string fields to WorldImpact Group copy
    - Replace JSON-LD `name`, `url`, `email`, and remove old address block; set `email` to `info@worldimpact.com.ng`
    - _Requirements: 1.5, 1.6_

  - [ ] 2.2 Replace logo reference in `layout.tsx` (if any direct references exist) and confirm font config unchanged
    - Fonts (Poppins + Inter) remain as-is; verify body class uses `bg-background text-text`
    - _Requirements: 1.3, 1.4_

- [ ] 3. Rebuild `NavBar.tsx`
  - [ ] 3.1 Rewrite component state, nav structure, and logo reference
    - Remove `servicesRef`, `projectsRef`, `aboutRef` and all related state (`servicesOpen`, `projectsOpen`, `aboutOpen`, `mobileServicesOpen`, `mobileProjectsOpen`, `mobileAboutOpen`)
    - Add `solutionsOpen` / `setSolutionsOpen` state only
    - Remove all imports from `projects-data.ts` and `services-data.ts`
    - Replace logo `<Image>` src with `/wialogo.png`, alt with "WorldImpact Group", aria-label with "WorldImpact Group Home"
    - _Requirements: 2.1, 2.5, 1.4_

  - [ ] 3.2 Implement desktop nav items and Solutions dropdown
    - Render flat links: About (`/about`), Certifications (`/certifications`), Corporate Training (`/corporate-training`), Talent Solutions (`/talent-solutions`), Insights (`/insights`), Contact (`/contact`)
    - Render Solutions dropdown trigger with `aria-expanded`, `aria-haspopup="true"`, `aria-controls="solutions-dropdown"`
    - Dropdown panel (`id="solutions-dropdown"`, `role="menu"`) shows 3 links: Corporate Training, Professional Certifications, Talent & Workforce Solutions
    - Add "Get Started" CTA button (`/get-started`) with `bg-primary text-white` styling
    - Update `.nav-link` hover colour to `#F58635` via the inline `<style>` block
    - _Requirements: 2.2, 2.3, 2.4, 2.5, 15.3_

  - [ ] 3.3 Rebuild mobile drawer with all 7 nav items, Solutions accordion, and focus trap
    - Drawer slides in from right at `z-60`; replace logo src with `/wialogo.png`
    - Render all nav items; Solutions accordion expands inline
    - Close button has `aria-label="Close menu"`
    - Implement focus trap: on `keydown Tab/Shift+Tab` inside open drawer, cycle focus only among focusable children of the drawer element
    - _Requirements: 2.6, 2.7, 15.2, 15.3_

  - [ ]* 3.4 Write unit tests for NavBar
    - Create `src/__tests__/NavBar.test.tsx`
    - Assert 7 nav label strings are present in the rendered DOM
    - Assert logo `src` is `/wialogo.png`
    - Assert "Get Started" link points to `/get-started`
    - Click Solutions trigger; assert 3 dropdown link items are visible
    - Assert Solutions trigger has `aria-expanded="false"` initially and `"true"` after click
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [ ]* 3.5 Write property test for NavBar aria-expanded state (Property 10)
    - **Property 10: NavBar dropdown aria-expanded reflects open state**
    - **Validates: Requirements 2.7, 15.3**
    - Use `fc.boolean()` as starting state; assert `aria-expanded` attribute matches open/closed state after interaction
    - _Requirements: 2.7, 15.3_

- [ ] 4. Rebuild `Footer.tsx`
  - [ ] 4.1 Replace all Prime Edge content with WorldImpact Group content
    - Remove `PROJECTS` import and project listing column
    - Replace brand name with "WorldImpact Group"; replace tagline with WorldImpact copy
    - Implement 4-column grid: Brand (col-span-4), Quick Links (col-span-2), Solutions (col-span-3), Contact (col-span-3)
    - Quick Links: About, Solutions, Certifications, Corporate Training, Talent Solutions, Insights, Contact (7 links)
    - Solutions column: Corporate Training, Professional Certifications, Talent & Workforce Solutions, + link to `/solutions`
    - Contact column: `mailto:info@worldimpact.com.ng` link; LinkedIn, Twitter/X, Facebook social icons (`href="#"`)
    - Legal links: Privacy Policy, Terms of Service
    - Copyright: `© {new Date().getFullYear()} WorldImpact Group. All rights reserved.`
    - Set footer background to `bg-secondary` (forest green)
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6_

  - [ ]* 4.2 Write unit tests for Footer
    - Create `src/__tests__/Footer.test.tsx`
    - Assert `href="mailto:info@worldimpact.com.ng"` is present
    - Assert all 7 quick links are in the DOM
    - Assert copyright text contains "WorldImpact Group"
    - Assert no text content contains "Prime Edge"
    - _Requirements: 12.1, 12.2, 12.3, 12.5, 12.6_

  - [ ]* 4.3 Write property test for Footer copyright year (Property 6)
    - **Property 6: Footer copyright year is always current**
    - **Validates: Requirements 12.5**
    - Render Footer and assert displayed year equals `new Date().getFullYear()`
    - _Requirements: 12.5_

- [ ] 5. Checkpoint — global foundation complete
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Rebuild `Hero.tsx` for WorldImpact Group
  - [ ] 6.1 Replace all Prime Edge content in `Hero.tsx` with WorldImpact Group content
    - Set headline to "Building Future-Ready Workforces Across Africa"
    - Add sub-headline describing WorldImpact Group's focus
    - Render three CTA buttons/links: "Explore Solutions" (`/solutions`), "Request Corporate Training" (`/corporate-training`), "Enroll in Certification" (`/certifications`)
    - Replace any hard-coded Prime Edge hex values with Tailwind token utilities (`bg-primary`, `text-secondary`, etc.)
    - _Requirements: 3.1, 1.1_

- [ ] 7. Create new home page section components
  - [ ] 7.1 Create `src/components/WhoWeAre.tsx`
    - Static section describing WorldImpact Group's mission and focus areas
    - Use `bg-surface` background; Poppins heading, Inter body
    - _Requirements: 3.2_

  - [ ] 7.2 Create `src/components/WhatWeDo.tsx`
    - Three-column card grid (desktop), stacked (mobile) for: Corporate Training, Professional Certifications, Talent & Workforce Solutions
    - Each card has icon (BookOpen, Award, Users from lucide-react), title, short description, and `<Link>` to detail page
    - Use `motion.div` staggered entrance animations via Framer Motion
    - _Requirements: 3.3_

  - [ ] 7.3 Update `src/components/IndustriesServed.tsx` with new content
    - Replace existing industry list with: Banking & Finance, Oil & Gas, Telecoms, Government, SMEs, NGOs
    - _Requirements: 3.4_

  - [ ] 7.4 Create `src/components/PartnersAccreditations.tsx`
    - Static section listing/displaying key partners and accrediting bodies
    - _Requirements: 3.5_

  - [ ] 7.5 Create `src/components/GovernmentPartnerships.tsx`
    - Static section highlighting public-sector collaboration and social impact
    - _Requirements: 3.6_

  - [ ] 7.6 Create `src/components/WhyWorldImpact.tsx`
    - Replace `WhyChooseUs.tsx` usage; render at least 4 value proposition cards: Africa-focused, industry-aligned curricula, recognised certifications, measurable outcomes
    - _Requirements: 3.7_

  - [ ] 7.7 Create `src/components/HomeClosingCTA.tsx`
    - Section with heading "Ready to Upgrade Your Workforce?" and a primary CTA button linking to `/get-started`
    - _Requirements: 3.8_

- [ ] 8. Rebuild home page (`src/app/page.tsx`)
  - [ ] 8.1 Replace component composition in `page.tsx`
    - Remove imports: `WhyChooseUs`, `Services`, `FeaturedProjects`, `ProcessSection`, `InspirationGallery`, `FAQ`, `Testimonials`
    - Add imports: `WhoWeAre`, `WhatWeDo`, `PartnersAccreditations`, `GovernmentPartnerships`, `WhyWorldImpact`, `HomeClosingCTA`
    - Final order: `Hero`, `WhoWeAre`, `WhatWeDo`, `IndustriesServed`, `StatsCounter`, `PartnersAccreditations`, `GovernmentPartnerships`, `WhyWorldImpact`, `Testimonials`, `HomeClosingCTA`
    - Update page metadata to WorldImpact Group copy
    - _Requirements: 3.1–3.9_

  - [ ]* 8.2 Write unit tests for home page
    - Create `src/__tests__/page.test.tsx`
    - Assert headline text "Building Future-Ready Workforces Across Africa" is present
    - Assert no text content contains "Prime Edge", "FeaturedProjects", or "InspirationGallery"
    - _Requirements: 3.1, 3.9_

- [ ] 9. Update About page (`/about`)
  - [ ] 9.1 Rebuild `src/app/about/AboutContent.tsx`
    - Add `PageHero` with title "About WorldImpact Group"
    - Mission section: "To empower African professionals and organisations through world-class workforce development, professional certifications, and talent solutions."
    - Vision section: "A continent where every professional has access to internationally recognised skills and every organisation has the talent to thrive."
    - Render 5 Core Values as a card grid: Excellence, Innovation, Impact, Integrity, Practical Learning — each with title and description
    - Remove all Prime Edge team references, project history, and construction content
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

  - [ ]* 9.2 Write unit tests for About page
    - Create `src/__tests__/AboutContent.test.tsx`
    - Assert all 5 core value titles are present in the DOM
    - Assert mission and vision text is present
    - Assert no text contains "Prime Edge"
    - _Requirements: 4.1, 4.2, 4.3_

- [ ] 10. Create Solutions page (`/solutions`)
  - [ ] 10.1 Create `src/app/solutions/page.tsx` and `SolutionsContent.tsx`
    - `page.tsx`: Server Component with `metadata: { title: "Our Solutions" }`, renders `<PageHero title="Our Solutions" />` and `<SolutionsContent />`
    - `SolutionsContent.tsx`: Client Component rendering 3 pillar cards with `motion.div` staggered entrance
    - Each card: icon, title, short description, `<Link>` to detail page (`/corporate-training`, `/certifications`, `/talent-solutions`)
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [ ]* 10.2 Write property test for Solutions pillar links (Property 1)
    - **Property 1: Solutions pillar links are well-formed**
    - **Validates: Requirements 5.3**
    - For each rendered pillar card, assert `href` is one of the three valid detail routes
    - _Requirements: 5.3_

- [ ] 11. Create Certifications page (`/certifications`)
  - [ ] 11.1 Create `src/app/certifications/page.tsx` and `CertificationsContent.tsx`
    - `page.tsx`: Server Component with `metadata: { title: "Professional Certifications" }`, renders `<PageHero title="Professional Certifications" />` and `<CertificationsContent />`
    - `CertificationsContent.tsx`: renders Pathway Types (Training-Based vs Exam-Only two-column cards), Certification Categories 4-column grid (`CERT_CATEGORIES` array with Finance & Banking, Oil & Gas, Leadership & Management, Technology), Corporate Examination Services descriptive block, and CTA to `/get-started`
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_

  - [ ]* 11.2 Write unit tests for Certifications page
    - Create `src/__tests__/certifications.test.tsx`
    - Assert "Training-Based" and "Exam-Only" pathway labels are in the DOM
    - Assert all 4 category names are present
    - Assert CTA link points to `/get-started` or `/contact`
    - _Requirements: 6.2, 6.4, 6.5_

- [ ] 12. Create Corporate Training page (`/corporate-training`)
  - [ ] 12.1 Create `src/app/corporate-training/page.tsx` and `CorporateTrainingContent.tsx`
    - `page.tsx`: Server Component with `metadata: { title: "Corporate Training Solutions" }`, renders `<PageHero title="Corporate Training Solutions" />` and `<CorporateTrainingContent />`
    - `CorporateTrainingContent.tsx`: renders What We Offer (6-card grid of training domains), How It Works (4-step process: Needs Assessment, Programme Design, Delivery, Evaluation & Certification) as horizontal stepper (desktop) / vertical list (mobile), Benefits (4-column icon+text grid), and CTA "Request Corporate Training" → `/contact`
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_

  - [ ]* 12.2 Write unit tests for Corporate Training page
    - Create `src/__tests__/corporate-training.test.tsx`
    - Assert step headings "Needs Assessment", "Programme Design", "Delivery", "Evaluation & Certification" are present
    - Assert CTA button/link is present
    - _Requirements: 7.3, 7.5_

- [ ] 13. Create Talent Solutions page (`/talent-solutions`)
  - [ ] 13.1 Create `src/app/talent-solutions/page.tsx` and `TalentSolutionsContent.tsx`
    - `page.tsx`: Server Component with `metadata: { title: "Talent & Workforce Solutions" }`, renders `<PageHero title="Talent & Workforce Solutions" />` and `<TalentSolutionsContent />`
    - `TalentSolutionsContent.tsx`: renders Services (4-card grid: Talent Sourcing, Skills Assessment, Workforce Planning, Placement Services), Value to Organisations (3-column stat/benefit cards), and CTA "Partner With Us" → `/contact`
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ] 14. Create Insights page (`/insights`)
  - [ ] 14.1 Create `src/components/InsightCard.tsx`
    - Props interface: `{ insight: Insight; }` where `Insight` matches the design interface (id, title, category, publishedAt, excerpt, slug, isPlaceholder?)
    - Render title, category label, formatted `publishedAt` date (use `data-testid="insight-date"`), and excerpt
    - Placeholder cards: render with `data-placeholder="true"` attribute, `data-category={category}`, muted opacity and dashed border, not clickable (no href)
    - Real cards: render as `<Link href={/insights/${slug}}>` wrapper
    - _Requirements: 9.3, 9.4_

  - [ ] 14.2 Create `src/app/insights/page.tsx` and `InsightsContent.tsx`
    - `page.tsx`: async Server Component that calls `fetchInsightsFromDB()` (returns `[]` if DB empty or unreachable); if empty, sets `isPlaceholder = true` and uses `PLACEHOLDER_INSIGHTS` seed data (one per category)
    - Renders `<PageHero title="Insights" />` and `<InsightsContent insights={insights} isPlaceholder={isPlaceholder} />`
    - `InsightsContent.tsx`: groups cards by category, renders 3-column grid (desktop), 1-column (mobile)
    - Add `fetchInsightsFromDB` utility in `src/lib/insights.ts` using Prisma `Insight` model
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

  - [ ]* 14.3 Write property test for InsightCard (Property 2)
    - **Property 2: Insight cards render all required fields**
    - **Validates: Requirements 9.3**
    - Use `fc.record({ id: fc.uuid(), title: fc.string({minLength:1}), category: fc.constantFrom(...), publishedAt: fc.date(), excerpt: fc.string({minLength:1}), slug: fc.string({minLength:1}) })` 
    - Assert container text contains title, category, excerpt; assert `[data-testid="insight-date"]` is present
    - _Requirements: 9.3_

  - [ ]* 14.4 Write property test for placeholder exclusivity (Property 3)
    - **Property 3: Insights placeholder logic is exclusive**
    - **Validates: Requirements 9.4**
    - Non-empty array + `isPlaceholder=false`: assert zero `[data-placeholder="true"]` elements
    - `PLACEHOLDER_INSIGHTS` + `isPlaceholder=true`: assert each of the 4 categories has a `[data-placeholder="true"][data-category="..."]` element
    - _Requirements: 9.4_

- [ ] 15. Create Contact page (`/contact`)
  - [ ] 15.1 Rebuild `src/app/contact/ContactContent.tsx`
    - Form fields: Full Name (required), Organisation (optional), Email (required, validated), Phone (optional), Service Interested In (required, `<select>` with 4 options), Message (required, `<textarea>`)
    - Each field must have a `<label>` with matching `htmlFor` / `id`
    - Validation: on blur per field + on submit; inline error message below each invalid field; form state preserved on error
    - Success state: display confirmation banner on successful submission via existing Server Action pattern in `actions.ts`
    - Error state: display non-dismissible error banner on network/server failure; preserve form state
    - Display `info@worldimpact.com.ng` as visible `<a href="mailto:info@worldimpact.com.ng">` link
    - Add `<PageHero title="Contact Us" />`
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 15.4_

  - [ ] 15.2 Update `src/app/contact/page.tsx` metadata
    - Set `metadata: { title: "Contact Us" }`
    - _Requirements: 10.1_

  - [ ]* 15.3 Write unit tests for Contact form
    - Create `src/__tests__/ContactContent.test.tsx`
    - Assert all 6 field `id` attributes are present in the DOM
    - Assert each field has an associated `<label>` with matching `htmlFor`
    - Assert mailto link is present
    - _Requirements: 10.2, 15.4_

  - [ ]* 15.4 Write property test for valid form submission (Property 4)
    - **Property 4: Contact form valid submission produces success state**
    - **Validates: Requirements 10.3**
    - Use `fc.record({ fullName: fc.string({minLength:1}), email: fc.emailAddress(), service: fc.constantFrom(...), message: fc.string({minLength:1}) })`
    - Mock server action; fill form, submit, assert success state with no inline errors
    - _Requirements: 10.3_

  - [ ]* 15.5 Write property test for invalid fields (Property 5)
    - **Property 5: Invalid required fields produce inline errors**
    - **Validates: Requirements 10.4**
    - Use `fc.constantFrom("fullName", "email", "service", "message")` and `fc.constant("")`
    - For each required field with empty/invalid value, assert inline error appears without clearing other fields
    - _Requirements: 10.4_

  - [ ]* 15.6 Write property test for form field labels (Property 11)
    - **Property 11: Contact form fields each have an associated label**
    - **Validates: Requirements 15.4**
    - For each `<input>`, `<select>`, `<textarea>` in the form, assert a `<label htmlFor={id}>` exists in the document
    - _Requirements: 15.4_

- [ ] 16. Create Get Started page (`/get-started`)
  - [ ] 16.1 Create `src/components/GetStartedFlow.tsx`
    - Three audience cards: For Organisations (Building2 icon), For Individuals (UserCircle icon), For Governments (Landmark icon)
    - State: `const [selected, setSelected] = useState<string | null>(null)`
    - Selecting a card reveals its contextual mini-form below via `AnimatePresence`
    - Three inline forms: OrganisationEnquiryForm, IndividualEnrolmentForm, GovernmentPartnershipForm — each with relevant fields and submit via Server Action
    - "Prefer to contact us directly?" link at bottom → `/contact`
    - _Requirements: 11.2, 11.3, 11.4_

  - [ ] 16.2 Create `src/app/get-started/page.tsx`
    - Server Component with `metadata: { title: "Get Started" }`
    - Renders `<PageHero title="Get Started" />` and `<GetStartedFlow />`
    - _Requirements: 11.1, 11.5_

  - [ ]* 16.3 Write unit tests for Get Started page
    - Create `src/__tests__/GetStartedFlow.test.tsx`
    - Assert 3 audience card labels are present: "For Organisations", "For Individuals", "For Governments"
    - Assert "contact" link is present pointing to `/contact`
    - _Requirements: 11.2, 11.4_

- [ ] 17. Checkpoint — all pages implemented
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 18. Update Prisma schema
  - [ ] 18.1 Add `Insight` model and remove `Project` model from `prisma/schema.prisma`
    - Add `Insight` model: `id String @id @default(uuid())`, `title String`, `category String`, `excerpt String`, `body String`, `slug String @unique`, `publishedAt DateTime @default(now())`, `imageUrl String?`, `createdAt DateTime @default(now())`, `updatedAt DateTime @updatedAt`
    - Remove `Project` model (no active components will reference it after cleanup in Task 20)
    - Run `npx prisma generate` to regenerate the Prisma client
    - _Requirements: (supports 9.3, 9.4; enables Insight data fetching)_

- [ ] 19. Configure redirects and update sitemap
  - [ ] 19.1 Update `next.config.ts` with redirect rules
    - Add `async redirects()` returning: `{ source: "/blog", destination: "/insights", permanent: true }`, `{ source: "/blog/:slug*", destination: "/insights", permanent: true }`, `{ source: "/contact-us", destination: "/contact", permanent: true }`
    - _Requirements: 9.6, 10.7, 13.5_

  - [ ] 19.2 Rewrite `src/app/sitemap.ts`
    - Replace `baseUrl` with `https://worldimpact.com.ng`
    - Include routes: `/`, `/about`, `/solutions`, `/certifications`, `/corporate-training`, `/talent-solutions`, `/insights`, `/get-started`, `/contact`, `/privacy`, `/terms`
    - Remove all legacy routes: `/team`, `/projects/*`, `/services/*`, `/blog`, `/contact-us`, and `primeedgeinteriors.com` base URL
    - _Requirements: 13.6_

  - [ ]* 19.3 Write unit tests for sitemap and redirects
    - Create `src/__tests__/sitemap.test.ts`
    - Assert sitemap array contains all 11 WorldImpact routes with `worldimpact.com.ng` base
    - Assert sitemap does not contain `primeedgeinteriors.com`, `/team`, `/projects`, `/services`, `/blog`
    - Assert `next.config.ts` `redirects()` array contains correct `/blog` → `/insights` and `/contact-us` → `/contact` rules
    - _Requirements: 13.5, 13.6_

- [ ] 20. Legacy cleanup — remove unused pages, components, and data files
  - [ ] 20.1 Delete legacy page directories
    - Delete `src/app/projects/` (includes `[id]/` subdirectory)
    - Delete `src/app/services/` (includes `[slug]/` subdirectory)
    - Delete `src/app/team/`
    - Delete `src/app/shop/`
    - Delete `src/app/shipping-returns/`
    - Delete `src/app/contact-us/`
    - Delete `src/app/blog/`
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 10.7_

  - [ ] 20.2 Delete legacy data files and unused component files
    - Delete `src/lib/projects-data.ts`
    - Delete `src/lib/services-data.ts`
    - Delete `src/components/FeaturedProjects.tsx`
    - Delete `src/components/InspirationGallery.tsx`
    - Delete `src/components/Services.tsx`
    - Delete `src/components/WhyChooseUs.tsx`
    - Delete `src/components/ProcessSection.tsx`
    - Verify no remaining file imports from the deleted files (search for any lingering `import` statements referencing them)
    - _Requirements: 13.1, 13.7_

  - [ ] 20.3 Add `src/app/not-found.tsx` for removed routes
    - Create a friendly 404 page with a message and links to `/` and `/solutions`
    - _Requirements: 13.1, 13.2, 13.3, 13.4_

- [ ] 21. Add WCAG utility and accessibility property tests
  - [ ] 21.1 Create `src/lib/wcag.ts` colour contrast utility
    - Implement `getContrastRatio(fg: string, bg: string): number` using the WCAG relative luminance formula
    - Input: hex colour strings; output: contrast ratio number
    - _Requirements: 15.5_

  - [ ]* 21.2 Write property test for brand token colour contrasts (Property 13)
    - **Property 13: Brand token colour contrasts meet WCAG AA**
    - **Validates: Requirements 15.5**
    - Import `getContrastRatio`; test all 4 required pairs: `#1A1A2E`/`#FFFFFF`, `#1A1A2E`/`#F5F7FA`, `#FFFFFF`/`#F58635`, `#FFFFFF`/`#005D24`
    - Assert each ratio ≥ 4.5
    - _Requirements: 15.5_

- [ ] 22. Set up Vitest test framework
  - [ ] 22.1 Install and configure Vitest with jsdom and fast-check
    - Run `npm install --save-dev vitest @testing-library/react @testing-library/user-event jsdom fast-check @vitejs/plugin-react`
    - Create `vitest.config.ts` with `environment: "jsdom"` and `globals: true`
    - Add `"test": "vitest --run"` script to `package.json`
    - Create `src/__tests__/` directory (or `src/__tests__` convention)
    - _Requirements: (test infrastructure for Properties 1–13)_

- [ ] 23. Final checkpoint — full suite green
  - Ensure all tests pass (`npm run test`), ask the user if questions arise.

---

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP delivery
- Each task references specific requirements for traceability
- Task 22 (test setup) should be completed before executing any `*` test sub-tasks; if running tests early, complete 22.1 first
- Checkpoints at Tasks 5, 17, and 23 provide natural integration points to verify the build compiles cleanly (`npm run build`)
- The Prisma `Project` model removal in Task 18.1 must happen only after Task 20.2 deletes all files that import it
- `StatsCounter.tsx` and `Testimonials.tsx` are updated in-place with WorldImpact Group copy as part of their parent task (home page rebuild, Task 8); no separate tasks are needed as the component structure is unchanged
- Property tests reference their design document property numbers (e.g., "Property 2") for direct traceability

---

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "22.1"] },
    { "id": 1, "tasks": ["1.2", "2.1", "2.2"] },
    { "id": 2, "tasks": ["3.1", "4.1", "18.1"] },
    { "id": 3, "tasks": ["3.2", "3.3", "4.2", "4.3", "6.1"] },
    { "id": 4, "tasks": ["3.4", "3.5", "7.1", "7.2", "7.3", "7.4", "7.5", "7.6", "7.7"] },
    { "id": 5, "tasks": ["8.1", "10.1", "11.1", "12.1", "13.1", "14.1", "15.1", "15.2", "16.1", "21.1"] },
    { "id": 6, "tasks": ["8.2", "9.1", "10.2", "11.2", "12.2", "14.2", "16.2", "19.1", "19.2"] },
    { "id": 7, "tasks": ["9.2", "13.2", "14.3", "14.4", "15.3", "15.4", "15.5", "15.6", "16.3", "19.3", "21.2"] },
    { "id": 8, "tasks": ["20.1", "20.2", "20.3"] }
  ]
}
```
