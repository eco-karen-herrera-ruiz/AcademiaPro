const universities = [
  "PUCE", "UCE", "ESPOL", "UTE", "UTPL", "UDLA", "UPS",
  "U. Cuenca", "U. Guayaquil", "USFQ", "UTN", "ESPE",
  "U. Azuay", "ULEAM", "UNL", "UTC", "UNIANDES", "UCSG",
];

export function UniversitiesStrip() {
  // Duplicate for seamless loop
  const items = [...universities, ...universities];

  return (
    <section
      id="universidades"
      className="py-12 border-y border-gold/10 overflow-hidden bg-navy-800/40 relative"
      aria-label="Universidades que cubrimos"
    >
      {/* Edge blurs */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-navy to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-navy to-transparent z-10 pointer-events-none" />

      <p className="text-center text-eyebrow mb-6 px-4">
        Cubrimos todas las universidades del Ecuador
      </p>

      <div className="flex w-max animate-ticker">
        {items.map((uni, i) => (
          <span
            key={`${uni}-${i}`}
            className="inline-flex items-center mx-3 px-4 py-2 rounded-full glass text-sm font-dm text-white/70 border border-gold/15 hover:border-gold/40 hover:text-white transition-all duration-200 cursor-default whitespace-nowrap"
          >
            {uni}
          </span>
        ))}
      </div>
    </section>
  );
}
