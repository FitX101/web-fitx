import { Check } from "lucide-react";
import { StoreButtons } from "@/components/StoreButtons";

const PLANS = [
  {
    name: "3 Months",
    price: "₹1,999",
    sub: "₹666 / mo",
    features: ["All core features", "AI diet plans", "Workout library", "Cancel anytime"],
    accent: false,
  },
  {
    name: "6 Months",
    price: "₹2,999",
    sub: "₹500 / mo",
    features: [
      "Everything in 3 Months",
      "Priority support",
      "Advanced insights",
      "Save 25%",
    ],
    accent: true,
  },
  {
    name: "12 Months",
    price: "₹4,999",
    sub: "₹416 / mo",
    features: [
      "Everything in 6 Months",
      "Personal coach features",
      "Lifetime habit tracking",
      "Save 38%",
    ],
    accent: false,
  },
];

export const Pricing = () => (
  <section
    id="pricing"
    data-testid="pricing-section"
    className="relative bg-[#0A0A0A] py-24 md:py-32 border-t border-white/5"
  >
    <div className="max-w-7xl mx-auto px-5 md:px-8">
      <div className="text-center max-w-3xl mx-auto">
        <div className="text-xs md:text-sm font-bold tracking-[0.25em] uppercase text-[#D4AF37]">
          // Pricing
        </div>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mt-4 leading-[0.95]">
          Start free. <span className="text-[#D4AF37]">Upgrade when you&rsquo;re ready.</span>
        </h2>
        <p className="mt-4 text-zinc-400">
          FitX is free to download with full tracking. Unlock premium AI plans
          and advanced insights anytime.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        {PLANS.map((p, i) => (
          <div
            key={i}
            data-testid={`pricing-plan-${i}`}
            className={`relative rounded-md p-7 md:p-8 transition-all ${
              p.accent
                ? "bg-[#D4AF37] text-black border border-[#D4AF37]"
                : "bg-[#141414] border border-white/10 hover:border-white/25"
            }`}
          >
            {p.accent && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-sm bg-black text-[#D4AF37] text-[10px] font-black tracking-[0.25em] uppercase">
                Most popular
              </div>
            )}
            <div className="text-xs uppercase tracking-[0.25em] opacity-80">{p.name}</div>
            <div className="mt-4 flex items-baseline gap-2">
              <div className="font-display text-5xl md:text-6xl font-black tracking-tighter">{p.price}</div>
            </div>
            <div className={`text-sm mt-1 ${p.accent ? "text-black/70" : "text-zinc-500"}`}>{p.sub}</div>

            <ul className="mt-6 space-y-3">
              {p.features.map((f, j) => (
                <li key={j} className="flex items-start gap-2 text-sm">
                  <Check size={16} className={p.accent ? "text-black mt-0.5" : "text-[#D4AF37] mt-0.5"} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <StoreButtons source="pricing" />
      </div>
    </div>
  </section>
);
