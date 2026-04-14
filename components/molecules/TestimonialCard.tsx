interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  university: string;
  rating: number;
  initials: string;
}

export function TestimonialCard({
  quote,
  name,
  role,
  university,
  rating,
  initials,
}: TestimonialCardProps) {
  return (
    <div className="glass rounded-2xl p-8 flex flex-col gap-6 shadow-card hover:shadow-gold transition-all duration-500 hover:border-gold/30">
      {/* Stars */}
      <div className="flex gap-1" aria-label={`Calificación: ${rating} de 5 estrellas`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < rating ? "text-gold fill-gold" : "text-white/20 fill-white/10"}`}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="font-playfair text-lg italic text-white/80 leading-relaxed">
        &ldquo;{quote}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-4 pt-2 border-t border-gold/10">
        <div
          className="w-12 h-12 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center flex-shrink-0"
          aria-hidden="true"
        >
          <span className="font-playfair font-bold text-gold text-sm">
            {initials}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="font-dm font-semibold text-white text-sm">{name}</span>
          <span className="font-dm text-xs text-white/50">
            {role} · {university}
          </span>
        </div>
      </div>
    </div>
  );
}
