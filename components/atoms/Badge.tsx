import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "gold" | "navy" | "success" | "warning" | "error";
  className?: string;
}

const variantMap: Record<NonNullable<BadgeProps["variant"]>, string> = {
  gold:    "bg-gold/10 text-gold border border-gold/30",
  navy:    "bg-navy-700 text-white/70 border border-white/10",
  success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
  warning: "bg-amber-500/10 text-amber-400 border border-amber-500/30",
  error:   "bg-red-500/10 text-red-400 border border-red-500/30",
};

export function Badge({
  children,
  variant = "gold",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium tracking-wide uppercase font-dm ${variantMap[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

/* Status badge mapped from OrderStatus */
const statusConfig: Record<string, { label: string; variant: BadgeProps["variant"] }> = {
  pending:     { label: "Pendiente",     variant: "warning" },
  in_progress: { label: "En proceso",   variant: "gold" },
  review:      { label: "En revisión",  variant: "navy" },
  delivered:   { label: "Entregado",    variant: "success" },
  cancelled:   { label: "Cancelado",    variant: "error" },
};

export function StatusBadge({ status }: { status: string }) {
  const cfg = statusConfig[status] ?? { label: status, variant: "navy" as const };
  return <Badge variant={cfg.variant}>{cfg.label}</Badge>;
}
