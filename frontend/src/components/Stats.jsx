const STATS = [
  { value: "10K+", label: "Active users" },
  { value: "4.8★", label: "User rating" },
  { value: "2.1M", label: "Meals logged" },
  { value: "94%", label: "Reach goals" },
];

export const Stats = () => (
  <section
    data-testid="stats-section"
    className="relative bg-[#0D0D0D] border-y border-white/5 overflow-hidden"
  >
    <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
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
