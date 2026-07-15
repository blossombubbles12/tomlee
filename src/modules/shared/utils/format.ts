export function formatDate(date: Date | string, format: "short" | "long" | "full" = "short"): string {
  const d = new Date(date);
  const opts: Intl.DateTimeFormatOptions =
    format === "full"
      ? { day: "2-digit", month: "long", year: "numeric" }
      : format === "long"
        ? { day: "2-digit", month: "short", year: "numeric" }
        : { day: "2-digit", month: "short" };
  return d.toLocaleDateString("en-GB", opts);
}

export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
}

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString()}`;
}

export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : (plural ?? `${singular}s`);
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength)}...`;
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
