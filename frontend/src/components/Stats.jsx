import { MOTION_VIDEOS } from "@/lib/constants";

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
    {/* Subtle motion video background */}
    <video
      data-testid="stats-bg-video"
      className="absolute inset-0 h-full w-full object-cover opacity-25"
      src={MOTION_VIDEOS[1]}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/80 to-[#0D0D0D] pointer-events-none" />

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
