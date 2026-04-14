import Link from "next/link";
import type { ServiceRow } from "@/types/database";

interface ServiceCardProps {
  service: ServiceRow;
  index?: number;
}

export function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  // Use custom fadeUp animations for staggered entry
  const animationClasses = [
    "animate-fadeUp",
    "animate-fadeUp-1",
    "animate-fadeUp-2",
    "animate-fadeUp-3",
  ];
  const animationClass = animationClasses[index % animationClasses.length];

  return (
    <Link
      href={`/servicios/${service.slug}`}
      className={`group relative block rounded-2xl overflow-hidden glass-card shadow-card hover:shadow-card-hover hover:border-gold/40 transition-all duration-500 opacity-0 ${animationClass}`}
      aria-label={`Ver servicio: ${service.name}`}
    >
      {/* Gold top-border reveal on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold via-gold-light to-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      <div className="p-6 flex flex-col gap-4">
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-2xl border border-gold/20 group-hover:bg-gold/20 transition-colors duration-300">     
          {service.icon_emoji}
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2">
          <h3 className="font-playfair font-bold text-lg text-white group-hover:text-gold-light transition-colors duration-200">
            {service.name}
          </h3>
          <p className="text-sm font-dm text-white/55 leading-relaxed line-clamp-2">
            {service.description}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-2">  
          <div className="flex flex-col">
            <span className="text-eyebrow">Desde</span>
            <span className="font-playfair font-bold text-gold text-lg">
              ${service.base_price}
            </span>
          </div>
          <span className="text-xs font-dm text-white/40 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            {service.delivery_hours_min}h mÃ­n.
          </span>
        </div>
      </div>

      {/* Hover arrow */}
      <div className="absolute bottom-6 right-6 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </Link>
  );
}

export function ServiceCardSkeleton() {
  return (
    <div className="rounded-2xl bg-navy-900/50 border border-gold/10 p-6 flex flex-col gap-4 animate-pulse">
      <div className="w-12 h-12 rounded-xl bg-white/5" />
      <div className="flex flex-col gap-2">
        <div className="h-5 bg-white/5 rounded w-3/4" />
        <div className="h-4 bg-white/5 rounded w-full" />
        <div className="h-4 bg-white/5 rounded w-2/3" />
      </div>
      <div className="flex justify-between pt-2 border-t border-white/5">
        <div className="h-6 bg-white/5 rounded w-20" />
        <div className="h-6 bg-white/5 rounded w-16" />
      </div>
    </div>
  );
}
