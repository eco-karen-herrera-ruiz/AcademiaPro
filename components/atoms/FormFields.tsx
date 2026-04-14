import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

const inputBase =
  "w-full bg-surface border border-gold-muted rounded-xl px-4 py-3 text-white placeholder-white/30 font-dm text-sm transition-all duration-200 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 [-webkit-backdrop-filter:blur(8px)] backdrop-blur-sm";

const errorBorder = "border-red-500/60 focus:border-red-400 focus:ring-red-400/20";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className = "", id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-medium text-white/60 font-dm uppercase tracking-wider"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`${inputBase} ${error ? errorBorder : ""} ${className}`}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-400 font-dm">{error}</p>
        )}
        {hint && !error && (
          <p className="text-xs text-white/40 font-dm">{hint}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className = "", id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-medium text-white/60 font-dm uppercase tracking-wider"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          rows={4}
          className={`${inputBase} resize-none ${error ? errorBorder : ""} ${className}`}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-400 font-dm">{error}</p>
        )}
        {hint && !error && (
          <p className="text-xs text-white/40 font-dm">{hint}</p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = "", id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-medium text-white/60 font-dm uppercase tracking-wider"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={inputId}
          className={`${inputBase} cursor-pointer appearance-none ${error ? errorBorder : ""} ${className}`}
          {...props}
        >
          <option value="" disabled>
            Selecciona una opción
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-navy-800 text-white">
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-xs text-red-400 font-dm">{error}</p>
        )}
      </div>
    );
  }
);
Select.displayName = "Select";
