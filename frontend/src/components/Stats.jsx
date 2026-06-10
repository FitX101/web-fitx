const STATS = [
  { value: "10K+", label: "Active users" },
  { value: "4.8★", label: "User rating" },
  { value: "2.1M", label: "Meals logged" },
  { value: "94%", label: "Reach goals" },
];

export const Stats = () => (
  <section data-testid="stats-section" className="bg-[#0A0A0A] border-y border-white/5">
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
      {STATS.map((s, i) => (
        <div key={i} className="text-center md:text-left">
          <div className="font-display text-4xl md:text-5xl font-black tracking-tight text-white">
            {s.value}
          </div>
          <div className="mt-1 text-xs md:text-sm uppercase tracking-[0.2em] text-zinc-500">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  </section>
);
