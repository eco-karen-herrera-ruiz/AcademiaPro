/**
 * Format a numeric price to locale-aware currency string.
 * @example formatPrice(15)      → "$15.00"
 * @example formatPrice(25, "USD") → "$25.00"
 */
export function formatPrice(
  amount: number,
  currency: "USD" | "COP" = "USD"
): string {
  return new Intl.NumberFormat("es-EC", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Merge class names, filtering out falsy values.
 * Lightweight alternative to clsx.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Basic HTML sanitization — strips script tags and event handlers.
 * For untrusted user input displayed in UI.
 */
export function sanitizeHtml(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, "")
    .replace(/on\w+\s*=\s*\S+/gi, "");
}

/**
 * Truncate text to a max length, adding ellipsis.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}

/**
 * Safe date formatter for Ecuador locale.
 */
export function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString("es-EC", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
}
