# Design Document

## Overview

This document describes the technical approach for rebranding the existing Next.js website from OgeDecor (Afro-luxury interior design studio) to **Prem Edge Interiors & Construction**. The work is purely a content, styling, and structural replacement — no new backend infrastructure is required. Every change is confined to `src/`, `public/`, `package.json`, and `prisma/` where relevant.

---

## Architecture

The site is a **Next.js 14+ App Router** application using:
- **Tailwind CSS v4** with `@theme inline` for design tokens
- **Framer Motion** for animations
- **Lucide React** for icons
- **Prisma + Neon** for project/inquiry data
- **Cloudinary** for image uploads
- **`next/font/google`** for fonts

No architectural changes are needed. The rebrand is a leaf-level replacement of tokens, copy, component content, and page structure.

---

## Design Decisions

### 1. Color Token Replacement

**Current state:** `globals.css` defines OgeDecor-specific variables (`--color-obsidian: #0a0a0a`, `--color-sand`, `--color-gold`, `--color-bronze`, `--color-emerald`) and exposes them in the `@theme inline` block. The `body` and components use `bg-obsidian`, `text-sand`, `text-gold`, `bg-gold`, etc.

**New state:** Replace all five tokens with Prem Edge's palette:

```css
:root {
  --color-primary: #1F2937;     /* Deep Charcoal — replaces obsidian */
  --color-secondary: #C9A227;   /* Luxury Gold — replaces gold/bronze */
  --color-accent: #F8F5F0;      /* Warm Off White — replaces sand */
  --color-background: #FFFFFF;
  --color-text: #111827;
  --color-success: #10B981;
}
```

The `@theme inline` block is updated to expose these as Tailwind utilities (`bg-primary`, `text-secondary`, `bg-accent`, etc.). All existing Tailwind utilities in components (`bg-obsidian` → `bg-primary`, `text-sand` → `text-accent`, `text-gold` / `bg-gold` → `text-secondary` / `bg-secondary`, `border-gold` → `border-secondary`) are replaced globally.

The `body` background changes from dark (`#0a0a0a`) to white (`#FFFFFF`), and default text changes from light to dark — this is the biggest visual shift, moving the site from a dark luxury aesthetic to a light, modern SaaS-style layout.

### 2. Typography Replacement

**Current state:** `Playfair_Display` (`--font-playfair` → `--font-serif`) and `Montserrat` (`--font-montserrat` → `--font-sans`) loaded in `layout.tsx`.

**New state:** Replace with `Poppins` (headings, weights 400/600/700) and `Inter` (body, weights 400/500). CSS variables renamed to `--font-heading` (Poppins) and `--font-body` (Inter). All `font-serif` utility usages are replaced with `font-heading`; `font-sans` usages are replaced with `font-body`.

### 3. NavBar Restructure

**Current nav links:** About, Projects, Services, Collection (`/shop`), Start Project (`/contact`)

**New nav links:** Home (`/`), About, Services, Projects, Blog, Contact

Remove: `Collection` link, `ShoppingBag` icon, cart badge (both desktop and mobile).

The mobile menu already closes on link click — no logic change needed.

### 4. Footer Restructure

Replace logo image with styled brand-name text span. Update EXPLORE links to: About, Services, Projects, Blog, Contact. Remove `shipping-returns` from LEGAL. Update copyright, tagline, and email.

### 5. Home Page Sections

The home page (`page.tsx`) currently imports: `Hero`, `BrandStory`, `FeaturedProjects`, `Services`, `ShopPreview`, `InspirationGallery`, `Testimonials`.

**Changes:**
- `Hero` — update headline, subheadline, replace "Shop Collection" CTA with "Our Services" → `/services`
- `BrandStory` → rename/repurpose as `WhyChooseUs` — replace Afro-futurism copy with four differentiator cards (Quality Construction, Innovative Design, Experienced Team, On-Time Delivery)
- `FeaturedProjects` — update placeholder project titles (remove Wakanda/Neo-Lagos names)
- `Services` — replace 4 OgeDecor services with 6 Prem Edge services
- `ShopPreview` — **remove** from home page imports and delete component file
- `InspirationGallery` — **keep** as a project gallery / inspiration section; update heading only
- `Testimonials` — replace OgeDecor client quotes with construction/interiors placeholder quotes; update CTA copy
- **Add** `StatsCounter` component (new) — Projects Completed, Happy Clients, Years Experience, Team Members
- **Add** `IndustriesServed` component (new) — 6 industry tiles
- **Add** `FAQ` component (new) — accordion with 5+ Prem Edge FAQ items
- **Add** `ProcessSection` component (new) — 4-step process

**Home page import order:**
```
Hero → WhyChooseUs → Services → StatsCounter → FeaturedProjects → ProcessSection → IndustriesServed → InspirationGallery → Testimonials → FAQ
```

### 6. About Page

Fully replace the personal-profile layout with a company overview layout:
- Company overview paragraph
- Stats row (reuse numbers from StatsCounter context)
- Mission / Vision / Core Values sections
- Team section with placeholder cards (name, role, placeholder avatar)

Remove all Ogechi, Nigerian heritage, and Afro-luxury content.

### 7. Services Page

Replace 3 OgeDecor service items with 6 Prem Edge services. Replace 5-step Afro-futuristic process (Discovery → Manifestation → Alchemy) with a 5-step professional process: Consultation → Design & Planning → Approval → Execution → Handover.

### 8. Projects Page

- Update `CATEGORIES` constant: `["All", "Residential", "Commercial", "Interior Design", "Renovation"]`
- Update placeholder project titles (remove Wakanda Tech Hub, Neo-Lagos Penthouse, Vibranium Lounge, Ashanti Royal Suite, Serengeti Villa)
- Update heading from "Our Creations / The Portfolio" to "Our Projects / Featured Work"

### 9. Contact Page

The multi-step form keeps its structure. Changes:
- Step 0 (intro): update headline and body copy
- Step 1 (project type): replace `[Residential, Commercial, Custom Decor]` with `[Residential Construction, Commercial Construction, Interior Design, Renovation & Remodeling, Space Planning, Project Management]`
- Step 2 (mood → scope): replace mood options with scope options: New Build, Renovation, Interior Fit-Out, Full Turnkey
- Step 6 (contact): update WhatsApp message to reference Prem Edge
- Step 7 (success): update success headline and copy
- Page `Metadata` updated

### 10. New Pages

**Blog page** (`src/app/blog/page.tsx` + `BlogContent.tsx`):
- Static listing page with category filter chips (Construction Tips, Interior Design Trends, Home Improvement, Building Materials, Smart Homes, Sustainable Construction)
- "Coming Soon" placeholder post cards (3 placeholder cards)
- `Metadata` with title `"Blog | Prem Edge Interiors & Construction"`

**Project Detail page** (`src/app/projects/[id]/page.tsx`) — already exists. Update:
- Ensure it renders: hero image, client, location, category, timeline, gallery, challenges, solutions, results
- Update `Metadata` to use project title dynamically

### 11. Pages to Remove

- `/shop` route → delete `src/app/shop/` directory
- `/shipping-returns` route → delete `src/app/shipping-returns/` directory
- `ShopPreview.tsx` component → delete
- Remove references in Footer LEGAL links

### 12. SEO and Metadata

- Root `layout.tsx` Metadata: full replacement of title, description, keywords, authors, creator, publisher, openGraph, twitter fields
- All page-level Metadata exports updated
- `sitemap.ts`: replace domain, remove `/shop`, add `/blog` and `/about`
- JSON-LD `Organization` script added to root layout

### 13. Asset Cleanup

Delete from `public/`:
- `ogedecor.png`
- `ogedecoricon.png`
- `ogechi-portrait.png`
- `ogechi-portrait - Copy.png`

Logo placeholder: styled `<span>` with text "Prem Edge" in NavBar and Footer until real logo is dropped into `/public/prem-edge-logo.png`.

### 14. package.json

Change `"name": "ogedecor"` → `"name": "prem-edge-interiors"`.

---

## Component Map

| Current | Action | New Name |
|---|---|---|
| `Hero.tsx` | Update content | `Hero.tsx` |
| `BrandStory.tsx` | Replace entirely | `WhyChooseUs.tsx` (rename file) |
| `FeaturedProjects.tsx` | Update placeholder data | `FeaturedProjects.tsx` |
| `Services.tsx` | Replace service list | `Services.tsx` |
| `ShopPreview.tsx` | **Delete** | — |
| `InspirationGallery.tsx` | Update heading copy | `InspirationGallery.tsx` |
| `Testimonials.tsx` | Update quotes + CTA copy | `Testimonials.tsx` |
| `NavBar.tsx` | Update links, remove cart | `NavBar.tsx` |
| `Footer.tsx` | Update logo, links, copy | `Footer.tsx` |
| — | **Create** | `WhyChooseUs.tsx` |
| — | **Create** | `StatsCounter.tsx` |
| — | **Create** | `IndustriesServed.tsx` |
| — | **Create** | `ProcessSection.tsx` |
| — | **Create** | `FAQ.tsx` |
| `AboutContent.tsx` | Replace entirely | `AboutContent.tsx` |
| `ServicesContent.tsx` | Update services + process | `ServicesContent.tsx` |
| `PortfolioContent.tsx` | Update categories + data | `PortfolioContent.tsx` |
| `ContactContent.tsx` | Update steps + copy | `ContactContent.tsx` |
| — | **Create** | `src/app/blog/page.tsx` |
| — | **Create** | `src/app/blog/BlogContent.tsx` |
| `src/app/shop/` | **Delete** | — |
| `src/app/shipping-returns/` | **Delete** | — |

---

## Data Flow

No changes to Prisma schema, database, or API routes. The `getProjects()` and `createInquiry()` server actions in `actions.ts` are unchanged in their signatures; only the WhatsApp message string in `createInquiry` is updated to reference Prem Edge.

---

## Styling Conventions

All components continue to use Tailwind utility classes. After the token rename:

| Old utility | New utility |
|---|---|
| `bg-obsidian` | `bg-primary` |
| `text-sand` | `text-accent` |
| `text-gold` | `text-secondary` |
| `bg-gold` | `bg-secondary` |
| `border-gold` | `border-secondary` |
| `hover:text-gold` | `hover:text-secondary` |
| `hover:bg-gold` | `hover:bg-secondary` |
| `font-serif` | `font-heading` |
| `font-sans` | `font-body` |

The `bg-strip-pattern` utility in `globals.css` is updated to use `--color-primary` and `--color-secondary` values.
