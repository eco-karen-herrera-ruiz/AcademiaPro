import React from "react";
import Link from "next/link";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  loading?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<Variant, string> = {
  primary: [
    "bg-gold text-navy font-semibold",
    "hover:bg-gold-light hover:shadow-gold-lg",
    "active:scale-[0.98]",
    "border border-gold",
  ].join(" "),
  outline: [
    "bg-transparent text-gold font-medium",
    "border border-gold/40",
    "hover:border-gold hover:bg-gold/5",
    "active:scale-[0.98]",
  ].join(" "),
  ghost: [
    "bg-transparent text-white/70 font-medium",
    "hover:text-white hover:bg-white/5",
    "border border-transparent",
    "active:scale-[0.98]",
  ].join(" "),
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-sm rounded-xl",
  lg: "px-8 py-4 text-base rounded-xl",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  loading = false,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-dm transition-all duration-200 cursor-pointer touch-action-manipulation select-none";
  const classes = `${base} ${variantStyles[variant]} ${sizeStyles[size]} ${className} ${disabled || loading ? "opacity-50 pointer-events-none" : ""}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {loading && <Spinner />}
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading && <Spinner />}
      {children}
    </button>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}
