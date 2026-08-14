import Link from "next/link";

// All page keys mapped to relevant Unsplash images
const PAGE_IMAGES: Record<string, string> = {
  about:                "https://images.unsplash.com/photo-1584515933487-779824d29309?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000",
  solutions:            "https://images.unsplash.com/photo-1595475884562-073c30d45670?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000",
  certifications:       "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000",
  "corporate-training": "https://images.unsplash.com/photo-1543269865-cbf427effbad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000",
  "talent-solutions":   "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000",
  representatives:      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000",
  "representatives/dashboard": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000",
  insights:             "https://images.unsplash.com/photo-1632910121591-29e2484c0259?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000",
  "get-started":        "https://images.unsplash.com/photo-1543269865-cbf427effbad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000",
  contact:              "https://images.unsplash.com/photo-1556761175-b413da4baf72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000",
  privacy:              "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000",
  terms:                "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000",
  default:              "https://images.unsplash.com/photo-1584515933487-779824d29309?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000",
};

interface Crumb { label: string; href?: string; }

interface PageHeroProps {
  title: string;
  subtitle?: string;
  page?: string;       // explicit key into PAGE_IMAGES
  image?: string;      // full URL override
  breadcrumbs?: Crumb[];
}

/** Convert page title or breadcrumb label to a PAGE_IMAGES key */
function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+&\s+|\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export default function PageHero({ title, subtitle, page, image, breadcrumbs }: PageHeroProps) {
  const derivedKey = page ?? slugify(title);
  const bg = image ?? PAGE_IMAGES[derivedKey] ?? PAGE_IMAGES.default;

  const crumbs: Crumb[] = breadcrumbs ?? [
    { label: "Home", href: "/" },
    { label: title },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `https://tomleehomecare.ng${c.href}` } : {}),
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section
        className="relative flex items-end w-full overflow-hidden"
        style={{ minHeight: "clamp(280px, 38vw, 440px)" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bg})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/25" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-70" />
        <div className="relative z-10 container mx-auto pb-10 md:pb-14 pt-16 md:pt-20">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-4 md:mb-5 flex-wrap">
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span className="text-primary/50 text-xs">›</span>}
                {c.href ? (
                  <Link
                    href={c.href}
                    className="text-white/55 hover:text-primary text-[10px] md:text-xs uppercase tracking-[0.15em] transition-colors"
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-primary text-[10px] md:text-xs uppercase tracking-[0.15em]">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
          <div className="w-8 md:w-10 h-[2px] bg-primary mb-4 md:mb-5" />
          <h1
            className="font-heading font-bold text-white leading-tight mb-3 md:mb-4 break-words"
            style={{ fontSize: "clamp(1.6rem, 5vw, 3.5rem)" }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className="text-white/80 leading-relaxed max-w-xl"
              style={{ fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)" }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </section>
    </>
  );
}
