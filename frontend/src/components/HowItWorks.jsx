import { motion } from "framer-motion";
import { Download, Sliders, TrendingUp } from "lucide-react";

const STEPS = [
  {
    icon: Download,
    title: "Download FitX",
    desc: "Install free from the App Store or Google Play. Less than a minute.",
  },
  {
    icon: Sliders,
    title: "Personalize Your Plan",
    desc: "Enter your goal, body metrics and preferences. FitX builds your blueprint instantly.",
  },
  {
    icon: TrendingUp,
    title: "Track & Transform",
    desc: "Log workouts, meals and weight. Watch the trendline tell the truth.",
  },
];

export const HowItWorks = () => (
  <section
    id="how-it-works"
    data-testid="how-it-works-section"
    className="relative bg-[#141414] py-24 md:py-32 border-y border-white/5"
  >
    <div className="max-w-7xl mx-auto px-5 md:px-8">
      <div className="grid grid-cols-12 gap-8 items-end">
        <div className="col-span-12 md:col-span-7">
          <div className="text-xs md:text-sm font-bold tracking-[0.25em] uppercase text-[#FF3B30]">
            // How it works
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mt-4 leading-[0.95]">
            Three steps. <span className="text-[#FF3B30]">Real results.</span>
          </h2>
        </div>
        <p className="col-span-12 md:col-span-5 text-zinc-400">
          No paywalled tutorials. No 12-week onboarding. Just open the app and
          go — FitX adapts as you do.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={i}
              data-testid={`step-card-${i}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative bg-[#0A0A0A] border border-white/5 rounded-md p-7 md:p-8 hover:border-white/20 transition-colors"
            >
              <div className="absolute -top-4 left-7 font-display text-6xl font-black text-[#FF3B30] leading-none">
                0{i + 1}
              </div>
              <div className="pt-10">
                <Icon size={28} className="text-white" />
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight mt-5">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);
