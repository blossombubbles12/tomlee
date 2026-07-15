# Requirements Document

## Introduction

This feature covers the full rebrand of the existing Next.js website from "OgeDecor" (an Afro-luxury interior design studio) to **Prem Edge Interiors & Construction** — a modern, premium company specialising in interior design, residential and commercial construction, renovation, space planning, furniture & fit-out, project management, and architectural support.

The rebrand is not a new feature build. It is a comprehensive replacement of every brand touchpoint in the existing codebase: brand name, color tokens, typography, page copy, navigation structure, metadata/SEO, logo and image assets, and component content. The result must look and feel like a purpose-built site for Prem Edge Interiors & Construction, with no trace of OgeDecor remaining.

---

## Glossary

- **Website**: The Next.js 14+ application located at `src/` in the workspace.
- **Brand_Name**: "Prem Edge Interiors & Construction" — the new company name used in all user-facing text, metadata, and code comments.
- **OgeDecor_References**: Any string, variable name, file name, alt text, CSS class name, or metadata value that contains "ogedecor", "OgeDecor", "Oge Decor", "Ogechi", "Onuegbu", "obsidian", "sand", "Wakanda", "Afro", "African Elegance", "Afro-luxury", or equivalent brand-specific language from the old brand.
- **Color_Token**: A named CSS custom property or Tailwind theme value used throughout the stylesheet and component classes (e.g., `--color-obsidian`, `--color-gold`, `bg-obsidian`).
- **Design_System**: The combination of Color_Tokens, typography variables, and utility classes that define the visual language of the Website.
- **Brand_Spec**: The Prem Edge Interiors & Construction design document provided by the user, defining palette, typography, personality, page structure, and content.
- **Metadata**: Next.js `Metadata` objects, Open Graph tags, Twitter card tags, `<title>`, `<meta name="description">`, `robots.txt`, and `sitemap.ts`.
- **Navigation**: The `NavBar` component and the link set rendered in desktop and mobile menus.
- **Footer**: The `Footer` component including logo, links, social icons, copyright, and tagline.
- **Hero_Section**: The top section of the home page with the primary headline, subheadline, and call-to-action links.
- **Services_Section**: Page and component content describing the company's offered services.
- **About_Page**: The page describing the company, its mission, vision, values, and team.
- **Projects_Page**: The portfolio/projects listing page with category filters.
- **Contact_Page**: The multi-step inquiry form page.
- **CMS_Ready**: Content structured so that copy strings and service/project data are easy to locate and update without changing component logic.

---

## Requirements

### Requirement 1: Design System — Color Tokens

**User Story:** As a developer, I want the Tailwind CSS theme and CSS custom properties to use the Prem Edge Interiors & Construction palette, so that every component inherits the correct brand colors without manual overrides.

#### Acceptance Criteria

1. THE Website SHALL define the following CSS custom properties in `globals.css` inside the `:root` selector, the `@theme inline` block, and remove any existing OgeDecor-specific values from the `body` selector and utility classes:
   - `--color-primary: #1F2937` (Deep Charcoal)
   - `--color-secondary: #C9A227` (Luxury Gold)
   - `--color-accent: #F8F5F0` (Warm Off White)
   - `--color-background: #FFFFFF`
   - `--color-text: #111827`
   - `--color-success: #10B981`
2. THE Website SHALL remove all Color_Tokens that reference OgeDecor-specific names from the `:root` block, the `@theme inline` block, the `body` selector, and all utility rule definitions: `--color-obsidian`, `--color-sand`, `--color-gold`, `--color-bronze`, `--color-emerald`, `--background`, and `--foreground` (where those variables map to OgeDecor hex values).
3. THE Website SHALL replace every Tailwind utility class that references a removed Color_Token — including `bg-obsidian`, `text-sand`, `text-gold`, `bg-gold`, `border-gold`, `text-obsidian`, `bg-sand`, and any inline `rgba(212,175,55,…)` hardcoded values — with the corresponding new brand color utility derived from the new token set.
4. THE Website SHALL expose the six new palette values through the `@theme inline` block in `globals.css` so Tailwind generates utility classes (`bg-primary`, `text-secondary`, `bg-accent`, etc.) for each token. The `@theme inline` block SHALL NOT contain entries for any removed OgeDecor token.
5. IF any `.tsx`, `.ts`, or `.css` file still references a removed Color_Token name after the replacement is complete, THEN the `next build` step SHALL fail with a TypeScript or PostCSS compilation error, confirming zero surviving old-token references.

---

### Requirement 2: Design System — Typography

**User Story:** As a developer, I want the site to use Poppins for headings and Inter for body text, so that the typography matches the Prem Edge brand specification.

#### Acceptance Criteria

1. THE Website SHALL load the `Poppins` Google Font (weights 400, 600, 700) and the `Inter` Google Font (weights 400, 500) via `next/font/google` in `src/app/layout.tsx`, assigning CSS variables `--font-heading` and `--font-body` respectively.
2. THE Website SHALL remove the `Playfair_Display` and `Montserrat` font imports and their variable declarations (`--font-playfair`, `--font-montserrat`) from `layout.tsx`.
3. THE Website SHALL update the `@theme inline` block in `globals.css` to declare `--font-heading` mapped to the Poppins variable and `--font-body` mapped to the Inter variable, replacing the old `--font-playfair` and `--font-montserrat` entries.
4. WHEN a heading element (`h1`–`h6`) is rendered anywhere on the site, THE Website SHALL apply the `font-heading` Tailwind utility (Poppins) — applied either through the Tailwind base layer `h1–h6 { @apply font-heading; }` or explicit class on each element. No heading element SHALL use `font-serif` or `font-sans` classes that previously mapped to Playfair Display or Montserrat.
5. WHEN body text is rendered, THE Website SHALL apply `font-body` (Inter) via the `body { font-family: var(--font-body); }` rule in `globals.css`, replacing the previous Montserrat body font.
6. THE Website SHALL replace every occurrence of the `font-serif` class (previously Playfair Display) in `.tsx` files with `font-heading`, and every occurrence of `font-sans` class (previously Montserrat) with `font-body`, so that no component references the removed font variable names.

---

### Requirement 3: Brand Name and Identity — Global Text Replacement

**User Story:** As a site visitor, I want every visible text element on the site to reference "Prem Edge Interiors & Construction", so that the website accurately represents the new brand.

#### Acceptance Criteria

1. THE Website SHALL replace all occurrences of the following strings in `.tsx`, `.ts`, `.css`, and `.md` files according to this mapping:

   | Old string | Replacement |
   |---|---|
   | `OgeDecor` / `Oge Decor` | `Prem Edge Interiors & Construction` |
   | `Ogechi Cynthia Onuegbu` | `Prem Edge Interiors & Construction` |
   | `Ogechi` (standalone personal name) | `Prem Edge` |
   | `Onuegbu` | *(remove or replace with company name)* |
   | `Creative Director, OgeDecor` | `Prem Edge Interiors & Construction` |
   | `hello@ogedecor.com` | `info@premedgeinteriors.com` |
   | `privacy@ogedecor.com` | `privacy@premedgeinteriors.com` |
   | `https://ogedecor.com` | `https://premedgeinteriors.com` |

2. THE Website SHALL update the `package.json` `"name"` field from `"ogedecor"` to `"prem-edge-interiors"`.
3. THE Website SHALL replace the tagline `"Redefining spaces with African elegance and modern luxury"` and `"Designed with African Excellence."` with `"Building Spaces. Creating Experiences."` in every file where they appear.
4. THE Website SHALL remove or replace all of the following Afro-futuristic and OgeDecor heritage strings with professional Prem Edge language:
   - `"Afro-luxury"`, `"Afro-futuristic"`, `"African geometry"`, `"Wakanda"`, `"Wakanda-inspired"`, `"ancestral inspiration"`, `"futuristic luxury"`, `"Design Alchemy"`, `"design alchemy"`, `"Alchemy of Design"`, `"African Elegance"`, `"Nigerian heritage"`, `"Manifesting the Future of African Luxury"`, `"bridge the gap between ancestral inspiration and futuristic luxury"`.
5. THE Website SHALL ensure all three OgeDecor-brand email addresses visible in rendered page content — `hello@ogedecor.com`, `privacy@ogedecor.com`, and any other `@ogedecor.com` address — are replaced with the corresponding Prem Edge addresses.
6. WHEN a search for any string listed in criteria 1, 3, or 4 is run against the `src/` directory after the rebrand is complete, THE search SHALL return zero matches in any user-visible text node, image `alt` attribute, or metadata field.

---

### Requirement 4: Logo and Image Assets

**User Story:** As a site visitor, I want the logo and all brand imagery to reflect Prem Edge Interiors & Construction, so that the visual identity is consistent.

#### Acceptance Criteria

1. THE Website SHALL replace the `src` attribute of every `<img>` or `<Image>` tag currently referencing `/ogedecor.png` or `/ogedecoricon.png` with either `/prem-edge-logo.png` (if the asset exists) or a text-based placeholder element. No `<img>` tag pointing to an OgeDecor asset SHALL remain after the rebrand.
2. WHERE a final logo file does not yet exist, THE Footer logo area SHALL render a styled `<span>` with the text "Prem Edge Interiors & Construction" and an `aria-label="Prem Edge Interiors & Construction logo"` on its wrapping element (not an `alt` attribute, since `<span>` is not a void element).
3. WHERE a final logo file does not yet exist, THE NavBar logo area SHALL render a styled `<span>` with the text "Prem Edge" (abbreviated for navigation width) and an `aria-label="Prem Edge Interiors & Construction logo"` on its wrapping `<Link>` element.
4. THE Website SHALL update every image `alt` attribute that contains "OgeDecor", "Ogechi", "Wakanda", "African geometry", or equivalent OgeDecor_References to a description relevant to Prem Edge's services (e.g. "Modern luxury living room designed by Prem Edge Interiors"). CSS `background-image` properties that previously referenced OgeDecor portraits SHALL be replaced with neutral construction/interior stock image URLs.
5. WHEN a final logo PNG is placed at `/public/prem-edge-logo.png`, THE Website's NavBar and Footer logo areas SHALL conditionally render `<Image src="/prem-edge-logo.png" alt="Prem Edge Interiors & Construction logo" width={…} height={…} />` in place of the text placeholder, without requiring any other code changes.

---

### Requirement 5: Global Layout — Metadata and SEO

**User Story:** As a search engine crawler, I want all metadata to reference Prem Edge Interiors & Construction with the correct target keywords, so that the site ranks for relevant construction and interior design searches.

#### Acceptance Criteria

1. THE Website SHALL update the root `Metadata` object in `src/app/layout.tsx` with all of the following fields:
   - `title.default`: `"Prem Edge Interiors & Construction"`
   - `title.template`: `"%s | Prem Edge Interiors & Construction"`
   - `description`: `"Prem Edge Interiors & Construction delivers premium interior design, residential construction, commercial construction, and renovation services. Building spaces that inspire."`
   - `keywords`: `["Construction Company", "Interior Design Company", "Building Contractors", "Residential Construction", "Commercial Construction", "Interior Renovation", "Luxury Interior Design", "Prem Edge Interiors"]`
   - `authors`: `[{ name: "Prem Edge Interiors & Construction" }]`
   - `creator`: `"Prem Edge Interiors & Construction"`
   - `publisher`: `"Prem Edge Interiors & Construction"`
   - `metadataBase`: `new URL("https://premedgeinteriors.com")`
   - `openGraph.siteName`: `"Prem Edge Interiors & Construction"`
   - `openGraph.locale`: `"en_US"`
   - `openGraph.url`: `"https://premedgeinteriors.com"`
   - `openGraph.title`: `"Prem Edge Interiors & Construction"`
   - `openGraph.description`: matching the root description above
   - `twitter.title`: `"Prem Edge Interiors & Construction"`
   - `twitter.description`: matching the root description above
2. THE Website SHALL update `src/app/sitemap.ts` to replace `baseUrl = 'https://ogedecor.com'` with `baseUrl = 'https://premedgeinteriors.com'`.
3. WHEN a page file exports its own `Metadata` object, THE Website SHALL update that object's `title` (string or object) and `description` to Prem Edge branded content. No page-level `Metadata` SHALL contain "OgeDecor", "Afro-luxury", or any OgeDecor_Reference.
4. THE Website SHALL update `authors`, `creator`, and `publisher` fields to `"Prem Edge Interiors & Construction"` in both the root layout and any page that overrides them.

---

### Requirement 6: Navigation Structure

**User Story:** As a site visitor, I want the navigation bar to show the correct Prem Edge pages and remove pages that no longer apply to a construction and interiors company, so that I can easily find the content I need.

#### Acceptance Criteria

1. THE NavBar SHALL display the following navigation links with the specified labels and routes, in this order: `Home` (`/`), `About` (`/about`), `Services` (`/services`), `Projects` (`/projects`), `Blog` (`/blog`), `Contact` (`/contact`).
2. THE NavBar SHALL remove the `Collection` link (route `/shop`) from both the desktop nav `navLinks` array and the mobile menu overlay.
3. THE NavBar SHALL remove the `ShoppingBag` icon button and its associated cart badge (`<span>`) from both the desktop nav bar and the mobile toggle area.
4. THE Footer SHALL update its "EXPLORE" link list to display exactly: `About` (`/about`), `Services` (`/services`), `Projects` (`/projects`), `Blog` (`/blog`), `Contact` (`/contact`) — replacing the current "About Ogechi", "Portfolio", "Services", and "Collection" links.
5. THE Footer SHALL update the copyright line to `"© [current year] Prem Edge Interiors & Construction. All rights reserved."` and the tagline to `"Building Spaces. Creating Experiences."`.
6. THE Footer SHALL replace `hello@ogedecor.com` with a functional `mailto:info@premedgeinteriors.com` link displaying the text `info@premedgeinteriors.com`.
7. WHEN a user clicks a navigation link inside the mobile menu overlay, THE NavBar SHALL set `isMobileMenuOpen` to `false`, closing the overlay.

---

### Requirement 7: Home Page Content

**User Story:** As a site visitor landing on the home page, I want to see content that accurately represents Prem Edge Interiors & Construction's services and brand proposition, so that I immediately understand what the company does.

#### Acceptance Criteria

1. THE Hero_Section SHALL display the `<h1>` text `"Building Spaces. Creating Experiences."` and a subheadline that explicitly names both core service areas: interior design and construction (e.g. "Premium construction and interior design solutions for homes, offices, and commercial developments.").
2. THE Hero_Section SHALL remove the following three specific OgeDecor copy instances: (a) the `<h1>` or eyebrow label reading "African Elegance. Modern Living.", (b) any eyebrow label reading "Afro-Luxury Interiors" or equivalent, and (c) any body paragraph containing "Wakanda-inspired" or "ancestral" language.
3. THE Hero_Section SHALL replace the "Shop Collection" secondary CTA link with an "Our Services" link pointing to `/services`.
4. THE Hero_Section SHALL update the `aria-label` (or equivalent accessible label) on the hero background image container so it no longer references any OgeDecor-specific description. The new label SHALL describe a construction or interior design scene without referencing the old brand.
5. THE Website SHALL replace the `BrandStory` component's copy with a "Why Choose Us" section containing exactly four differentiator cards, each with a title and a supporting description of at least one sentence: Expertise, Quality, Innovation, and Client Focus.
6. THE Services section on the home page SHALL display a preview card for each of the following six services, each card containing at minimum a title and a brief description: Interior Design, Residential Construction, Commercial Construction, Renovation & Remodeling, Space Planning, and Project Management.
7. THE Testimonials section SHALL display at least three placeholder testimonials, each referencing construction or interior design work, with no OgeDecor client names or OgeDecor-specific project references.
8. THE Website SHALL include a statistics counter section positioned after the Services preview section and before the Testimonials section on the home page, displaying four stats: "Projects Completed", "Happy Clients", "Years of Experience", and "Team Members", each with a numeric value and label.

---

### Requirement 8: About Page Content

**User Story:** As a site visitor, I want the About page to describe Prem Edge Interiors & Construction as a company — its mission, vision, and values — rather than profiling an individual designer.

#### Acceptance Criteria

1. THE About_Page SHALL replace the Ogechi Cynthia Onuegbu personal profile section (including portrait image, personal biography, and attributed quotes) with a company overview section describing Prem Edge Interiors & Construction's history, focus areas, and market positioning.
2. THE About_Page SHALL include a clearly labelled Mission statement section. The Mission section SHALL contain company-focused copy (not personal biography), and SHALL NOT reference "Ogechi", "OgeDecor", or any OgeDecor_Reference.
3. THE About_Page SHALL include a clearly labelled Vision statement section containing at minimum one forward-looking statement describing the company's long-term aspiration (e.g. becoming a leading construction and interior design company recognized for excellence and integrity).
4. THE About_Page SHALL include a Core Values section listing at least four named values, each with a supporting description: e.g. Quality, Integrity, Innovation, Client Satisfaction.
5. THE About_Page SHALL include a "Meet The Team" section containing at least two placeholder team member cards. Each card SHALL display: a visible placeholder image area (or grey box), a name label, and a role/title label.
6. THE About_Page SHALL remove all occurrences of the following strings and their immediate surrounding UI context: "Ogechi", "Ogechi Cynthia Onuegbu", "Manifesting the Future of African Luxury", "Afro-luxury aesthetic", "Nigerian heritage", "Creative Director, OgeDecor", "Collaborate with Ogechi", and any image `alt` text attributing the portrait to Ogechi.
7. THE About_Page SHALL export a `Metadata` object with `title: "About | Prem Edge Interiors & Construction"`, a description referencing the company overview, and `keywords` that include "construction company", "interior design", and "Prem Edge".

---

### Requirement 9: Services Page Content

**User Story:** As a site visitor, I want the Services page to list Prem Edge's full range of services with accurate descriptions, so that I can understand what the company offers.

#### Acceptance Criteria

1. THE Services_Section SHALL list the following six service categories, each rendered with a title, a distinct icon, and a description:
   - Interior Design
   - Residential Construction
   - Commercial Construction
   - Renovation & Remodeling
   - Space Planning
   - Project Management
2. THE Services_Section SHALL NOT display "Bespoke Decor & Styling", "Custom Furniture", "Art Curation", or "Textile Design" as service items or feature bullet points anywhere on the Services page.
3. THE Services_Section SHALL update the design process steps to display the following five ordered labels: Consultation → Design & Planning → Approval → Execution → Handover, replacing the current OgeDecor steps (Discovery, Manifestation, Refinement, Curation, Alchemy).
4. THE Services_Section SHALL remove all OgeDecor-branded section headings and copy from the Services page, specifically: "The Alchemy of Design", "Design Excellence", "Curating spaces that bridge the gap between ancestral inspiration and futuristic luxury", and any copy referencing "curation session", "alchemy", or "African elegance".
5. THE Services page SHALL export a `Metadata` object with `title: "Services | Prem Edge Interiors & Construction"` and a description referencing the company's construction and design services.
6. WHEN a user clicks any per-service CTA link or the bottom-section consultation button on the Services page, THE Services_Section SHALL navigate the user to `/contact`.

---

### Requirement 10: Projects / Portfolio Page

**User Story:** As a site visitor, I want the Projects page to display portfolio projects categorised by Prem Edge's actual service types, so that I can browse relevant work.

#### Acceptance Criteria

1. THE Projects_Page SHALL update the category filter to display exactly five options: `All`, `Residential`, `Commercial`, `Interior Design`, `Renovation`.
2. THE Projects_Page SHALL update all placeholder project titles to use Prem Edge-relevant names. No placeholder project title SHALL contain "Neo-Lagos Penthouse", "Vibranium Lounge", "Wakanda Tech Hub", or any other OgeDecor_Reference.
3. THE Projects_Page SHALL update the page heading text to "Our Projects" or "Featured Work", replacing any OgeDecor-specific heading such as "Our Creations" or "The Portfolio".
4. THE Projects_Page SHALL export a `Metadata` object with `title: "Projects | Prem Edge Interiors & Construction"`.
5. THE Projects_Page SHALL display each project card with: project title, category label, location label, and scope/service type label.
6. WHEN a project card is clicked, THE Projects_Page SHALL navigate the user to the project detail page at `/projects/[id]`.

---

### Requirement 11: Contact Page

**User Story:** As a prospective client, I want the contact form to reflect Prem Edge's services and ask for the information that is relevant to a construction and interiors inquiry, so that I can submit a meaningful inquiry.

#### Acceptance Criteria

1. THE Contact_Page SHALL replace all OgeDecor-specific introductory copy — including "Your story begins with a space", "design journey", "alchemy", "Begin Your Design Journey", and equivalent — with professional Prem Edge copy such as "Let's Build Something Great" and "Tell us about your project".
2. THE Contact_Page SHALL update the project type selection step to offer exactly these six options: Residential Construction, Commercial Construction, Interior Design, Renovation & Remodeling, Space Planning, Project Management.
3. THE Contact_Page SHALL replace the "mood" selection step (options: Calm / Bold / Warm / Modern African Elegance) with a "Scope" step that asks "What best describes your project?" with exactly four options: New Build, Renovation, Interior Fit-Out, Full Turnkey.
4. THE Contact_Page SHALL update the WhatsApp pre-filled message template to reference "Prem Edge Interiors & Construction" as the company name and use the new project type and scope field labels.
5. THE Contact_Page SHALL update the submission success message to reference "Prem Edge Interiors & Construction" and remove any OgeDecor-specific language.
6. THE Contact_Page SHALL export a `Metadata` object with `title: "Contact | Prem Edge Interiors & Construction"`.
7. IF the user has not entered a value in the name field or the email/contact field, THEN THE Contact_Page SHALL render the submit/send button in a disabled state and display inline validation text adjacent to the empty field(s).

---

### Requirement 12: New Pages — Blog and Project Detail

**User Story:** As a site visitor, I want a Blog page and a Project Detail page to exist as part of the Prem Edge site structure, so that the navigation links work and content can be added later.

#### Acceptance Criteria

1. THE Website SHALL create a `/blog` route at `src/app/blog/page.tsx` that renders a blog listing page with: a page heading, a category filter displaying the labels Construction Tips, Interior Design Trends, Home Improvement, Building Materials, Smart Homes, Sustainable Construction, and at least two placeholder post cards (each with a title, category label, and placeholder description).
2. THE `/projects/[id]` dynamic route SHALL render a project detail page displaying at minimum: project title (hero), category, completion date, description, and a media gallery section. If the `client`, `location`, `challenges`, `solutions`, and `results` fields are not present in the current data model, the page SHALL include clearly labelled placeholder sections for those fields rather than omitting them.
3. THE Blog page SHALL export a `Metadata` object with `title: "Blog | Prem Edge Interiors & Construction"` and a relevant description.
4. THE `/projects/[id]` page SHALL export a dynamic `generateMetadata` function that returns `title: "${project.title} | Prem Edge Interiors & Construction"` for a found project, and `title: "Project Not Found"` when the project does not exist.
5. WHEN no blog posts exist in the data source, THE Blog page SHALL display a "Coming Soon" placeholder section containing the site tagline "Building Spaces. Creating Experiences." instead of an empty post grid.

---

### Requirement 13: Pages to Remove or Repurpose

**User Story:** As a site owner, I want the OgeDecor-specific pages that do not apply to Prem Edge to be removed or repurposed, so that visitors are not confused by irrelevant content.

#### Acceptance Criteria

1. THE Website SHALL delete `src/app/shop/page.tsx`, `src/app/shop/ShopContent.tsx`, and `src/components/ShopPreview.tsx`, AND SHALL remove the `/shop` link from `NavBar.tsx`, `Footer.tsx`, and any import of `ShopPreview` from `src/app/page.tsx`.
2. THE Website SHALL delete `src/app/shipping-returns/page.tsx` and `src/app/shipping-returns/ShippingContent.tsx`, AND SHALL remove the "Shipping & Returns" link from `Footer.tsx`.
3. THE Website SHALL update `src/app/privacy/page.tsx` `Metadata` title to `"Privacy Policy | Prem Edge Interiors & Construction"` and update `src/app/privacy/PrivacyContent.tsx` to replace: the "At OgeDecor" heading, the `privacy@ogedecor.com` email address, and all body text that names OgeDecor, with Prem Edge Interiors & Construction branded equivalents.
4. THE Website SHALL update `src/app/terms/page.tsx` `Metadata` title to `"Terms of Service | Prem Edge Interiors & Construction"` and update `src/app/terms/TermsContent.tsx` to replace: the "OgeDecor website and services" reference in section 1, the "Design Alchemy" heading in section 2, the "OgeDecor" references in sections 3–5, and all body text naming OgeDecor, with Prem Edge Interiors & Construction equivalents.
5. THE Website SHALL update `src/app/sitemap.ts` to: replace `baseUrl = 'https://ogedecor.com'` with `baseUrl = 'https://premedgeinteriors.com'`, remove the `/shop` entry, and add entries for `/blog` (changeFrequency: `monthly`, priority: `0.7`) and `/about` (changeFrequency: `yearly`, priority: `0.8`).
6. WHEN a user requests `/shop` or `/shipping-returns`, THE Website SHALL return an HTTP 404 status and render the site's standard Next.js not-found page (i.e., no route file exists at those paths so Next.js returns 404 automatically).

---

### Requirement 14: Industries Served and FAQ Sections

**User Story:** As a site visitor, I want to see which industries Prem Edge serves and find answers to common questions, so that I can quickly assess whether the company is relevant to my needs.

#### Acceptance Criteria

1. THE Website SHALL include an "Industries Served" section (on the home page or services page) displaying exactly six industry tiles: Residential, Commercial, Hospitality, Healthcare, Education, Retail. Each tile SHALL contain at minimum a text label and a representative icon.
2. THE Website SHALL include an FAQ section with at least five question-and-answer pairs rendered as an accordion. On initial page load, all FAQ answers SHALL be in a collapsed (hidden) state.
3. WHEN a user activates (clicks or presses Enter/Space on) a collapsed FAQ question, THE FAQ_Accordion SHALL expand that question's answer panel and collapse the answer panel of any other currently open question.
4. THE FAQ_Accordion SHALL be keyboard-navigable: users SHALL be able to Tab between questions and activate each question with Enter or Space, meeting WCAG 2.1 AA Success Criterion 4.1.2 (Name, Role, Value) for disclosure widgets (each trigger button SHALL have `aria-expanded` set to `true` when open and `false` when closed, and the answer panel SHALL be associated via `aria-controls`).
5. THE FAQ section SHALL include question-and-answer content covering at minimum these five topics: (a) typical project timeline, (b) geographic service area, (c) how to get a project estimate or budget, (d) the initial consultation process, (e) types of projects handled.

---

### Requirement 15: SEO — Structured Data and Performance

**User Story:** As a search engine, I want the site to expose structured data and meet basic performance standards, so that Prem Edge ranks well for its target keywords.

#### Acceptance Criteria

1. THE Website SHALL include a `<script type="application/ld+json">` tag in the root layout (`src/app/layout.tsx`) containing a valid JSON-LD `Organization` or `LocalBusiness` schema with at minimum: `name: "Prem Edge Interiors & Construction"`, a `description` string, and a `contactPoint` or `email` value using the Prem Edge contact email.
2. THE Website SHALL use the Next.js `<Image>` component (from `next/image`) for all locally served image assets (files under `/public/`). Externally hosted images (e.g. Unsplash URLs) may use a standard `<img>` tag with explicit width/height attributes and an appropriate `alt` value.
3. THE Website SHALL include non-empty, Prem Edge-relevant `alt` text on every `<img>` and `<Image>` element. No `alt` attribute SHALL be empty (`alt=""`) except for purely decorative images, and no `alt` text SHALL contain "OgeDecor", "Ogechi", or any OgeDecor_Reference.
4. WHEN the home page (`/`) is served, THE Website SHALL include an `openGraph.images` entry in the page or root `Metadata` object referencing a Prem Edge branded OG image at a path under `/public/` or an absolute URL. The image SHALL have explicit `width` and `height` values.
5. THE Website SHALL preserve the existing `public/robots.txt` `Disallow: /admin` rule and `index: true, follow: true` settings, and update the `Sitemap:` directive URL from `https://ogedecor.com/sitemap.xml` to `https://premedgeinteriors.com/sitemap.xml`.

---

### Requirement 16: Code Cleanliness — Remove Dead Code

**User Story:** As a developer maintaining the codebase, I want all OgeDecor-specific dead code and unused assets to be removed, so that the repository is clean and unambiguous.

#### Acceptance Criteria

1. IF all `<img>` / `<Image>` `src` attributes and CSS `background-image` references to `/public/ogedecor.png`, `/public/ogedecoricon.png`, `/public/ogechi-portrait.png`, and `/public/ogechi-portrait - Copy.png` have been replaced or removed per Requirement 4, THEN THE Website SHALL delete those four files from the `/public/` directory.
2. IF the `BrandStory.tsx` component's content has been fully replaced by the "Why Choose Us" section (per Requirement 7, AC5), THEN THE Website SHALL either delete `src/components/BrandStory.tsx` and remove its import from `src/app/page.tsx`, OR rename it to `WhyChooseUs.tsx` and update the import accordingly.
3. IF the `InspirationGallery.tsx` component's content has been repurposed to serve a new function in the Prem Edge site, THEN THE Website SHALL rename `src/components/InspirationGallery.tsx` to a name that reflects its new function (e.g. `ProjectGallery.tsx` or `FeaturedWork.tsx`) and update all imports.
4. THE Website SHALL update `README.md` to describe the Prem Edge Interiors & Construction project, its tech stack, and local setup instructions, removing all OgeDecor-specific project descriptions, philosophy, and branding.
5. THE Website SHALL ensure that, after all rebrand changes from Requirements 1–16 have been applied, a search of the `src/` directory for any of the following strings returns zero matches in non-comment, user-visible code: "OgeDecor", "ogedecor", "Ogechi", "obsidian", "sand" (as a color token), "Wakanda", "Afro-luxury".
6. THE Website SHALL ensure that running `next build` after all rebrand changes produces zero TypeScript compilation errors and zero ESLint errors.
