interface StatCardProps {
  value: string;
  label: string;
  delay?: 0 | 1 | 2;
}

const delayClass: Record<number, string> = {
  0: "animate-float",
  1: "animate-float-delay",
  2: "animate-float-delay-2",
};

export function StatCard({ value, label, delay = 0 }: StatCardProps) {
  return (
    <div
      className={`glass rounded-2xl px-6 py-4 flex flex-col gap-1 shadow-card min-w-[140px] ${delayClass[delay]}`}
    >
      <span className="font-playfair font-bold text-2xl text-gold-gradient">
        {value}
      </span>
      <span className="text-[11px] font-dm text-white/50 uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}
