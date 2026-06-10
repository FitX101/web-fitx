import { motion } from "framer-motion";
import { HERO_VIDEO, SCREENSHOTS } from "@/lib/constants";
import { StoreButtons } from "@/components/StoreButtons";
import { Star } from "lucide-react";

export const Hero = () => {
  return (
    <section
      data-testid="hero-section"
      className="relative min-h-[100svh] w-full overflow-hidden bg-black"
    >
      {/* Video background */}
      <video
        data-testid="hero-bg-video"
        className="absolute inset-0 h-full w-full object-cover"
        src={HERO_VIDEO}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 hero-overlay" />
      {/* Accent grid lines */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="grid grid-cols-12 gap-8 items-center">
          {/* Copy */}
          <div className="col-span-12 lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md"
            >
              <span className="h-2 w-2 rounded-full bg-[#FF3B30] fx-pulse" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-zinc-200">
                AI Fitness & Diet Coach
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase mt-6 leading-[0.92]"
            >
              Train smarter.
              <br />
              <span className="text-[#FF3B30]">Eat sharper.</span>
              <br />
              Live stronger.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-6 max-w-xl text-base md:text-lg text-zinc-300 leading-relaxed"
            >
              FitX is the AI coach in your pocket — personalized workouts, smart
              calorie & macro tracking, custom diet plans and real progress
              insights. All in one beautiful app.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-9"
            >
              <StoreButtons source="hero" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 flex items-center gap-5 text-xs uppercase tracking-widest text-zinc-400"
            >
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-[#FF3B30] text-[#FF3B30]" />
                ))}
                <span className="ml-1.5 text-zinc-300">4.8 rating</span>
              </div>
              <div className="h-3 w-px bg-white/20" />
              <span>10k+ downloads</span>
              <div className="h-3 w-px bg-white/20 hidden sm:block" />
              <span className="hidden sm:inline">iOS · Android</span>
            </motion.div>
          </div>

          {/* Phone mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="hidden lg:flex col-span-5 justify-end"
          >
            <div className="relative fx-float">
              <div className="absolute -inset-8 bg-[#FF3B30] opacity-20 blur-3xl rounded-full" />
              <div className="relative w-[290px] h-[600px] rounded-[44px] border-[10px] border-zinc-800 bg-zinc-900 shadow-2xl overflow-hidden">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-10" />
                <img
                  src={SCREENSHOTS[0]}
                  alt="FitX app dashboard"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-10 px-4 py-3 bg-[#141414] border border-white/10 rounded-md backdrop-blur-md">
                <div className="text-[10px] uppercase tracking-widest text-zinc-500">Today</div>
                <div className="font-display text-2xl font-black text-white">
                  847 <span className="text-[#FF3B30] text-sm">kcal burned</span>
                </div>
              </div>
              <div className="absolute -top-4 -right-6 px-4 py-3 bg-[#141414] border border-white/10 rounded-md backdrop-blur-md">
                <div className="text-[10px] uppercase tracking-widest text-zinc-500">Streak</div>
                <div className="font-display text-2xl font-black text-white">
                  21 <span className="text-[#FF3B30] text-sm">days</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-[#0A0A0A] z-10 pointer-events-none" />
    </section>
  );
};
