import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "FitX is the first app that actually understood my schedule. The AI suggestions feel like a coach who's known me for years.",
    name: "Aarav Mehta",
    role: "Marathon runner",
    img: "https://images.unsplash.com/photo-1601412436009-d964bd02edbc?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzV8MHwxfHNlYXJjaHwxfHxhdGhsZXRpYyUyMHBvcnRyYWl0JTIwaGVhZHNob3R8ZW58MHx8fHwxNzgxMDgyMzExfDA&ixlib=rb-4.1.0&q=85",
  },
  {
    quote:
      "Lost 11 kilos in 4 months. The cheat meal tracker kept me honest — and sane. Best fitness app I've used.",
    name: "Priya Iyer",
    role: "FitX user since 2025",
    img: "https://images.unsplash.com/photo-1565884280295-98eb83e41c65?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzV8MHwxfHNlYXJjaHwyfHxhdGhsZXRpYyUyMHBvcnRyYWl0JTIwaGVhZHNob3R8ZW58MHx8fHwxNzgxMDgyMzExfDA&ixlib=rb-4.1.0&q=85",
  },
  {
    quote:
      "I love how clean the dashboard is. Macros, calories burned, weight trend — one swipe and I know exactly what to do today.",
    name: "Daniel Okafor",
    role: "Strength athlete",
    img: "https://images.unsplash.com/photo-1610903866883-c280999dcc0e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzV8MHwxfHNlYXJjaHwzfHxhdGhsZXRpYyUyMHBvcnRyYWl0JTIwaGVhZHNob3R8ZW58MHx8fHwxNzgxMDgyMzExfDA&ixlib=rb-4.1.0&q=85",
  },
];

export const Testimonials = () => (
  <section data-testid="testimonials-section" className="bg-[#141414] py-24 md:py-32 border-y border-white/5">
    <div className="max-w-7xl mx-auto px-5 md:px-8">
      <div className="max-w-3xl">
        <div className="text-xs md:text-sm font-bold tracking-[0.25em] uppercase text-[#FF3B30]">
          // Loved by athletes
        </div>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mt-4 leading-[0.95]">
          What the <span className="text-[#FF3B30]">community</span> says
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        {TESTIMONIALS.map((t, i) => (
          <div
            key={i}
            data-testid={`testimonial-${i}`}
            className="bg-[#0A0A0A] border border-white/5 rounded-md p-7 md:p-8 hover:border-white/20 transition-colors"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, k) => (
                <Star key={k} size={14} className="fill-[#FF3B30] text-[#FF3B30]" />
              ))}
            </div>
            <p className="text-zinc-200 text-base leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
            <div className="mt-6 flex items-center gap-3 pt-5 border-t border-white/5">
              <img src={t.img} alt={t.name} className="h-11 w-11 rounded-full object-cover grayscale" />
              <div>
                <div className="font-display font-bold uppercase tracking-wide text-white">
                  {t.name}
                </div>
                <div className="text-xs uppercase tracking-widest text-zinc-500">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
