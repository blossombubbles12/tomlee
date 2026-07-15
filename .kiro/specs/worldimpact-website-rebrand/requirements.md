# Requirements Document

## Introduction

WorldImpact Group is a workforce development, professional certification, and corporate training organisation focused on Africa. This feature covers a complete rebrand and restructure of the existing Next.js website (currently branded as "Prime Edge Interiors & Construction") to the WorldImpact Group identity, content strategy, and page architecture.

The rebrand encompasses: a new visual identity (colour scheme, typography, logo usage), a new site navigation structure, full content replacement across all pages, nine new or reworked pages, updated global components (NavBar, Footer), and removal of construction/interior-design-specific pages and data that are no longer relevant.

The stack remains unchanged: Next.js (App Router), TypeScript, Tailwind CSS v4, Framer Motion, Prisma, and Cloudinary.

---

## Glossary

- **WorldImpact_Group**: The organisation being rebranded to; a workforce development, certification, and corporate training company focused on Africa.
- **Site**: The Next.js web application being rebranded.
- **NavBar**: The global fixed navigation component rendered on every page.
- **Footer**: The global footer component rendered on every page.
- **Hero**: The full-viewport introductory section of the Home page.
- **Page_Hero**: The sub-page banner/header component used on inner pages.
- **CTA**: Call-to-action — a button or link prompting a user action.
- **Brand_Theme**: The WorldImpact Group colour palette, typography, and visual style.
- **Solutions_Page**: The `/solutions` route covering Corporate Training, Professional Certifications, and Workforce & Talent Solutions.
- **Certifications_Page**: The `/certifications` route detailing certification pathways and corporate examination services.
- **Corporate_Training_Page**: The `/corporate-training` route describing training offerings, process, and benefits.
- **Talent_Solutions_Page**: The `/talent-solutions` route covering talent sourcing, assessment, and placement services.
- **Insights_Page**: The `/insights` route replacing the `/blog` route for articles, research reports, and career guides.
- **Get_Started_Page**: The `/get-started` route with distinct onboarding flows for organisations, individuals, and governments.
- **Contact_Page**: The `/contact` route with a contact form and WorldImpact Group contact details.
- **About_Page**: The `/about` route covering mission, vision, and core values.
- **Home_Page**: The `/` route — the site landing page.
- **Insight**: A piece of content (article, research report, workforce insight, or career guide) displayed on the Insights_Page.
- **Certification_Pathway**: A structured route to obtaining a professional certification, either training-based or exam-only.
- **EARS**: Easy Approach to Requirements Syntax — the pattern set used to write acceptance criteria.

---

## Requirements

### Requirement 1: Brand Theme and Global Visual Identity

**User Story:** As a visitor, I want the website to look and feel like a credible, professional African workforce development organisation, so that I trust WorldImpact Group's expertise.

#### Acceptance Criteria

1. THE Site SHALL apply a new Brand_Theme with a primary colour of orange (`#F58635`), a secondary colour of forest green (`#005D24`), a surface colour of off-white (`#F5F7FA`), and a dark text colour of `#1A1A2E`.
2. THE Site SHALL replace all occurrences of the Prime Edge colour palette (`#1F2937`, `#C9A227`, `#F8F5F0`) with the corresponding WorldImpact Group Brand_Theme tokens across `globals.css` and all components.
3. THE Site SHALL use Poppins (headings) and Inter (body) as the primary typefaces, consistent with the existing font configuration.
4. THE Site SHALL remove all Prime Edge Interiors & Construction branding, including logo files referenced as `primedgelogo.png` and `primeedgelogo.png`, replacing all logo references with `wialogo.png` from the `/public` directory.
5. THE Site SHALL update the `<Metadata>` in `layout.tsx` with the WorldImpact Group organisation name, description, keywords, domain (`worldimpact.com.ng`), and contact email (`info@worldimpact.com.ng`).
6. THE Site SHALL update the JSON-LD structured data in `layout.tsx` to reflect WorldImpact Group's organisation name, URL, and contact information.

---

### Requirement 2: Global Navigation (NavBar)

**User Story:** As a visitor, I want a clear, professional navigation menu that reflects the WorldImpact Group site structure, so that I can find the content I need quickly.

#### Acceptance Criteria

1. THE NavBar SHALL display the WorldImpact Group wordmark/logo as the primary brand mark, linking to `/`.
2. THE NavBar SHALL include the following top-level navigation items: **About**, **Solutions** (dropdown), **Certifications**, **Corporate Training**, **Talent Solutions**, **Insights**, **Contact**.
3. WHEN a visitor hovers over or activates the **Solutions** dropdown, THE NavBar SHALL display links to: Corporate Training (`/corporate-training`), Professional Certifications (`/certifications`), and Talent & Workforce Solutions (`/talent-solutions`).
4. THE NavBar SHALL include a primary CTA button labelled "Get Started" linking to `/get-started`, styled with the Brand_Theme primary colour (`#F58635`).
5. THE NavBar SHALL remove all references to Projects, Services (Prime Edge), and Blog routes that are no longer part of the WorldImpact Group site structure.
6. WHEN the viewport width is below 768px, THE NavBar SHALL render a mobile drawer/slide-in menu containing all navigation items with accordion-style dropdowns.
7. WHILE the mobile drawer is open, THE NavBar SHALL display a close button and trap focus within the drawer for accessibility.

---

### Requirement 3: Home Page

**User Story:** As a prospective client or individual learner, I want the Home page to immediately communicate WorldImpact Group's value proposition and guide me to relevant sections, so that I understand what the organisation does and how to engage.

#### Acceptance Criteria

1. THE Home_Page SHALL render a Hero section with the headline "Building Future-Ready Workforces Across Africa" and three CTAs: "Explore Solutions" (`/solutions`), "Request Corporate Training" (`/corporate-training`), and "Enroll in Certification" (`/certifications`).
2. THE Home_Page SHALL render a "Who We Are" section with a brief description of WorldImpact Group's mission and focus areas.
3. THE Home_Page SHALL render a "What We Do" section showcasing three service pillars: Corporate Training, Professional Certifications, and Talent & Workforce Solutions — each linking to its respective page.
4. THE Home_Page SHALL render an "Industries We Serve" section displaying: Banking & Finance, Oil & Gas, Telecoms, Government, SMEs, and NGOs.
5. THE Home_Page SHALL render a "Partners & Accreditations" section listing or displaying logos/names of key partners and accrediting bodies.
6. THE Home_Page SHALL render a "Government Partnerships & Community Impact" section highlighting public-sector collaboration and social impact.
7. THE Home_Page SHALL render a "Why WorldImpact Group" section with at least four distinct value propositions (e.g., Africa-focused, industry-aligned curricula, recognised certifications, measurable outcomes).
8. THE Home_Page SHALL render a closing CTA section with the heading "Ready to Upgrade Your Workforce?" and a button linking to `/get-started`.
9. THE Home_Page SHALL remove all Prime Edge Interiors sections: FeaturedProjects, InspirationGallery, and any construction-specific content.

---

### Requirement 4: About Us Page

**User Story:** As a visitor, I want to learn about WorldImpact Group's mission, vision, and values, so that I can assess whether the organisation aligns with my goals.

#### Acceptance Criteria

1. THE About_Page SHALL display the organisation's mission statement: a clear statement of purpose focused on workforce development across Africa.
2. THE About_Page SHALL display the organisation's vision statement: a forward-looking statement about the future of African workforces.
3. THE About_Page SHALL display the five Core Values with a title and description for each: **Excellence**, **Innovation**, **Impact**, **Integrity**, and **Practical Learning**.
4. THE About_Page SHALL use the PageHero component (or equivalent) to display a branded page header with the title "About WorldImpact Group".
5. THE About_Page SHALL remove all Prime Edge team references, project history, or construction-specific content.

---

### Requirement 5: Solutions Page

**User Story:** As a prospective client, I want a single overview page of all WorldImpact Group's service offerings, so that I can quickly understand what is available and navigate to the detail I need.

#### Acceptance Criteria

1. THE Solutions_Page SHALL be accessible at the route `/solutions`.
2. THE Solutions_Page SHALL display an overview section for each of the three solution pillars: Corporate Training Solutions, Professional Certification Programs, and Workforce & Talent Solutions.
3. WHEN a visitor clicks on a solution pillar card or CTA, THE Solutions_Page SHALL navigate to the corresponding detail page (`/corporate-training`, `/certifications`, or `/talent-solutions`).
4. THE Solutions_Page SHALL use the PageHero component to display a branded header with the title "Our Solutions".
5. THE Solutions_Page SHALL be linked from the NavBar Solutions dropdown.

---

### Requirement 6: Certifications Page

**User Story:** As an individual learner or HR professional, I want to browse available certifications and understand the pathways, so that I can enrol in the right programme.

#### Acceptance Criteria

1. THE Certifications_Page SHALL be accessible at the route `/certifications`.
2. THE Certifications_Page SHALL display two Certification_Pathway types: **Training-Based** (attend training then sit exam) and **Exam-Only** (sit exam directly without prior training).
3. THE Certifications_Page SHALL display a "Corporate Examination Services" section describing bulk/group examination arrangements for organisations.
4. THE Certifications_Page SHALL display at least four Certification Categories (e.g., Finance & Banking, Oil & Gas, Leadership & Management, Technology) with sample certification titles under each.
5. THE Certifications_Page SHALL include a CTA prompting visitors to apply or enquire, linking to `/get-started` or `/contact`.
6. THE Certifications_Page SHALL use the PageHero component with the title "Professional Certifications".

---

### Requirement 7: Corporate Training Page

**User Story:** As an L&D manager or HR director, I want to understand what corporate training WorldImpact Group offers and how the process works, so that I can request a training programme for my organisation.

#### Acceptance Criteria

1. THE Corporate_Training_Page SHALL be accessible at the route `/corporate-training`.
2. THE Corporate_Training_Page SHALL display a "What We Offer" section describing the range of training programmes (e.g., leadership development, technical skills, compliance training).
3. THE Corporate_Training_Page SHALL display a "How It Works" section with a four-step process: Step 1 — Needs Assessment, Step 2 — Programme Design, Step 3 — Delivery, Step 4 — Evaluation & Certification.
4. THE Corporate_Training_Page SHALL display a "Benefits" section with at least four key benefits of choosing WorldImpact Group for corporate training.
5. THE Corporate_Training_Page SHALL include a CTA button labelled "Request Corporate Training" linking to `/contact` or `/get-started`.
6. THE Corporate_Training_Page SHALL use the PageHero component with the title "Corporate Training Solutions".

---

### Requirement 8: Talent Solutions Page

**User Story:** As an HR leader or business owner, I want to understand how WorldImpact Group can help source and develop talent, so that I can engage the talent solutions service.

#### Acceptance Criteria

1. THE Talent_Solutions_Page SHALL be accessible at the route `/talent-solutions`.
2. THE Talent_Solutions_Page SHALL display a "Services" section describing talent sourcing, skills assessment, workforce planning, and placement services.
3. THE Talent_Solutions_Page SHALL display a "Value to Organisations" section articulating measurable benefits such as reduced time-to-hire, improved retention, and workforce capability uplift.
4. THE Talent_Solutions_Page SHALL include a CTA prompting visitors to contact WorldImpact Group, linking to `/contact` or `/get-started`.
5. THE Talent_Solutions_Page SHALL use the PageHero component with the title "Talent & Workforce Solutions".

---

### Requirement 9: Insights Page

**User Story:** As a professional or HR decision-maker, I want to read relevant articles and research, so that I can stay informed on workforce development trends in Africa.

#### Acceptance Criteria

1. THE Insights_Page SHALL be accessible at the route `/insights`, replacing the existing `/blog` route.
2. THE Insights_Page SHALL display content in four categories: **Articles**, **Research Reports**, **Workforce Insights**, and **Career Guides**.
3. THE Insights_Page SHALL display each Insight as a card showing: title, category label, publication date, and a short excerpt, rendering from any available content source (static seed data, CMS, database, or other).
4. WHEN no content exists from any source, THE Insights_Page SHALL render placeholder cards for each category so the page is not empty; placeholder cards SHALL NOT be shown while real content is available or while content is loading.
5. THE Insights_Page SHALL use the PageHero component with the title "Insights".
6. IF a visitor accesses `/blog`, THEN THE Site SHALL redirect them to `/insights` to preserve any existing links.

---

### Requirement 10: Contact Page

**User Story:** As a visitor, I want to send an enquiry to WorldImpact Group, so that I can request information or begin a conversation.

#### Acceptance Criteria

1. THE Contact_Page SHALL be accessible at the route `/contact`.
2. THE Contact_Page SHALL render a contact form with the following fields: **Full Name** (required), **Organisation** (optional), **Email** (required, validated format), **Phone** (optional), **Service Interested In** (required, select/dropdown with options: Corporate Training, Professional Certifications, Talent Solutions, General Enquiry), **Message** (required, textarea).
3. WHEN a visitor submits the form with all required fields valid, THE Contact_Page SHALL send the enquiry and display a success confirmation message.
4. WHEN a visitor interacts with a required form field and leaves it empty or invalid — whether on blur or on submit — THE Contact_Page SHALL display an inline validation error message for that field without clearing the form.
5. THE Contact_Page SHALL display WorldImpact Group's contact email `info@worldimpact.com.ng` as a visible, clickable `mailto:` link.
6. THE Contact_Page SHALL use the PageHero component with the title "Contact Us".
7. THE Contact_Page SHALL consolidate the existing `/contact` and `/contact-us` routes into a single `/contact` page, removing the duplicate `/contact-us` route.

---

### Requirement 11: Get Started / Apply Page

**User Story:** As a prospective client or individual learner, I want a clear starting point to engage with WorldImpact Group based on who I am, so that I am directed to the right process or team.

#### Acceptance Criteria

1. THE Get_Started_Page SHALL be accessible at the route `/get-started`.
2. THE Get_Started_Page SHALL display three distinct audience-specific onboarding options: **For Organisations** (corporate training or talent solutions enquiry), **For Individuals** (certification or training enrolment), **For Governments** (partnership or public workforce programme enquiry).
3. WHEN a visitor selects an audience option, THE Get_Started_Page SHALL display a contextual form or next-step instructions relevant to that audience type.
4. THE Get_Started_Page SHALL include a CTA or link back to `/contact` for visitors who prefer direct contact over structured forms.
5. THE Get_Started_Page SHALL use the PageHero component with the title "Get Started".

---

### Requirement 12: Global Footer

**User Story:** As a visitor, I want the footer to display WorldImpact Group's key links, contact details, and legal information, so that I can navigate the site and find important information from any page.

#### Acceptance Criteria

1. THE Footer SHALL display the WorldImpact Group brand name/wordmark.
2. THE Footer SHALL include a "Quick Links" column with links to: About, Solutions, Certifications, Corporate Training, Talent Solutions, Insights, Contact.
3. THE Footer SHALL include a "Contact" column displaying: email `info@worldimpact.com.ng` as a `mailto:` link, and social media links (LinkedIn, Twitter/X, Facebook) — linking to `#` until real URLs are available.
4. THE Footer SHALL include a "Legal" column or section with links to Privacy Policy (`/privacy`) and Terms of Service (`/terms`).
5. THE Footer SHALL display a copyright notice: "© [current year] WorldImpact Group. All rights reserved."
6. THE Footer SHALL remove all Prime Edge Interiors project listings, construction references, and the US address.

---

### Requirement 13: Legacy Page Routing and Cleanup

**User Story:** As a developer maintaining the site, I want unused legacy pages removed or redirected, so that the codebase remains clean and no dead routes are served.

#### Acceptance Criteria

1. THE Site SHALL remove the `/projects` and `/projects/[id]` routes and all associated data files (`projects-data.ts`), as these are not part of the WorldImpact Group site structure.
2. THE Site SHALL remove or repurpose the `/services` and `/services/[slug]` routes, replacing them with the Solutions page structure.
3. THE Site SHALL remove the `/team` page route as a standalone page; team/leadership content MAY be incorporated into the About page if desired.
4. THE Site SHALL remove the `/shop` and `/shipping-returns` route directories as they contain no relevant content.
5. IF a visitor accesses `/blog`, THEN THE Site SHALL redirect to `/insights` via a Next.js redirect in `next.config.ts`.
6. THE Site SHALL update `sitemap.ts` to reflect the new WorldImpact Group route structure.
7. THE Site SHALL update the `services-data.ts` and `projects-data.ts` data files or remove them if the data is no longer consumed by any active component.

---

### Requirement 14: Responsive Design

**User Story:** As a visitor on any device, I want the website to be fully usable and visually consistent across mobile, tablet, and desktop, so that I have a good experience regardless of how I access the site.

#### Acceptance Criteria

1. THE Site SHALL render all pages correctly at viewport widths of 375px (mobile), 768px (tablet), and 1280px (desktop).
2. THE NavBar SHALL switch from a horizontal desktop layout to a mobile drawer at viewports below 768px.
3. WHEN a section uses a multi-column grid layout on desktop, THE Site SHALL collapse it to a single-column or two-column layout on mobile.
4. THE Site SHALL not display horizontal scroll bars at any supported viewport width of 375px or wider; no minimum supported width is guaranteed below 375px.
5. THE Site SHALL use Tailwind CSS responsive prefixes (`sm:`, `md:`, `lg:`) for all layout breakpoints.

---

### Requirement 15: Accessibility

**User Story:** As a visitor using assistive technology, I want the website to be navigable and understandable, so that I can access WorldImpact Group's content regardless of my ability.

#### Acceptance Criteria

1. THE Site SHALL provide descriptive `alt` text for all meaningful images.
2. THE Site SHALL ensure all interactive elements (links, buttons, form inputs) are keyboard-focusable and have visible focus indicators.
3. THE NavBar SHALL include `aria-label` and `aria-expanded` attributes on dropdown trigger buttons.
4. THE Contact_Page form fields SHALL each have an associated `<label>` element.
5. THE Site SHALL maintain a colour contrast ratio of at least 4.5:1 between text and background colours, in accordance with WCAG 2.1 AA.
