import { motion } from "framer-motion";
import { ScanBarcode, ScanFace, Sparkles, ChefHat } from "lucide-react";

const CARDS = [
  {
    icon: ScanBarcode,
    title: "Calorie Tracking Scanner",
    desc: "AI-powered food recognition. Scan barcodes or snap a picture of your plate to instantly log your macronutrients.",
    value: "25,000+ Verified Foods",
    accent: "Scan · Snap · Track",
  },
  {
    icon: ScanFace,
    title: "Real-Time Form Correctness",
    desc: "Master your technique. Use your device's camera to receive instant, visual feedback on joint alignment and lifting posture for squats and deadlifts.",
    value: "Injury Prevention Technology",
    accent: "AR · Pose Detection",
  },
  {
    icon: Sparkles,
    title: "FitX Chatbot AI Mentor",
    desc: "Instant fitness advice 24/7. Personalized workout adjustments, motivational tips, and immediate nutrition guidance from your integrated AI mentor.",
    value: "Personalized Routine Optimization",
    accent: "Chat · Adapt · Grow",
  },
  {
    icon: ChefHat,
    title: "10,000+ Healthy Meal Recipes",
    desc: "Diet-aware culinary inspiration. High-protein, calorie-matched recipes tailored to Vegan, Eggetarian, Non-Veg, and Vegetarian preferences.",
    value: "Search by Ingredient or Macro Goal",
    accent: "Recipes · Macros · Prefs",
  },
];

export const UnlockedFeatures = () => (
  <section
    id="unlocked"
    data-testid="unlocked-features-section"
    className="relative bg-[#0D0D0D] py-24 md:py-32 border-y border-white/5 overflow-hidden"
  >
    {/* Ambient gold glow */}
    <div
      aria-hidden="true"
      className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] rounded-full pointer-events-none"
      style={{
        background:
          "radial-gradient(closest-side, rgba(212,175,55,0.14) 0%, rgba(13,13,13,0) 70%)",
      }}
    />

    <div className="relative max-w-7xl mx-auto px-5 md:px-8">
      <div className="max-w-4xl">
        <div className="text-xs md:text-sm font-bold tracking-[0.25em] uppercase text-[#D4AF37]">
          // The new FitX
        </div>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mt-4 leading-[0.95]">
          AI-Powered Fitness,{" "}
          <span className="text-gold-gradient">Unlocked</span>.
        </h2>
        <p className="mt-5 text-zinc-400 max-w-2xl">
          Four intelligent systems working in the background — so every rep,
          every meal, and every message is smarter than the day before.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        {CARDS.map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.div
              key={i}
              data-testid={`unlocked-card-${i}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className="group relative bg-gradient-to-b from-[#141414] to-[#0F0F0F] border border-white/5 hover:border-[#D4AF37]/40 rounded-md p-8 md:p-10 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* subtle gold ring */}
              <div className="pointer-events-none absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                   style={{ boxShadow: "inset 0 0 0 1px rgba(212,175,55,0.25), 0 20px 60px -20px rgba(212,175,55,0.2)" }} />

              <div className="flex items-start justify-between gap-4">
                <div
                  className="h-14 w-14 grid place-items-center rounded-md border border-[#D4AF37]/40 text-[#E5C158] shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(212,175,55,0.14) 0%, rgba(212,175,55,0.02) 100%)",
                  }}
                >
                  <Icon size={26} strokeWidth={1.7} />
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-zinc-600">
                    Feature 0{i + 1}
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-[#D4AF37]/80">
                    {c.accent}
                  </div>
                </div>
              </div>

              <h3 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight mt-7 text-white leading-tight">
                {c.title}
              </h3>
              <p className="mt-4 text-sm md:text-base text-zinc-400 leading-relaxed max-w-lg">
                {c.desc}
              </p>

              <div className="mt-7 pt-5 border-t border-white/5 flex items-center gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-[#E5C158]" />
                <div className="font-display text-sm md:text-base font-bold uppercase tracking-[0.15em] text-gold-gradient">
                  {c.value}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);
