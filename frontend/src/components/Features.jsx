import { motion } from "framer-motion";
import {
  Activity,
  UtensilsCrossed,
  LineChart,
  CakeSlice,
  Play,
  HeartPulse,
} from "lucide-react";

const FEATURES = [
  {
    icon: Activity,
    title: "Personalized Fitness Tracking",
    desc: "Track daily steps, calories burned, and activity tailored to your profile — height, weight, and goals.",
    span: "md:col-span-8",
  },
  {
    icon: UtensilsCrossed,
    title: "Custom Diet Plans",
    desc: "AI-tuned diet recommendations. Monitor protein, carbs, and fats with effortless precision.",
    span: "md:col-span-4",
  },
  {
    icon: LineChart,
    title: "Smart Progress Monitoring",
    desc: "Real-time feedback with smart color indicators. See momentum, not just numbers.",
    span: "md:col-span-4",
  },
  {
    icon: CakeSlice,
    title: "Cheat Meal Tracking",
    desc: "Log your favorite indulgences guilt-free. Add custom meals — never lose track.",
    span: "md:col-span-8",
  },
  {
    icon: Play,
    title: "Video & Learning",
    desc: "Curated workout and nutrition videos to guide every step of your transformation.",
    span: "md:col-span-6",
  },
  {
    icon: HeartPulse,
    title: "Health Insights",
    desc: "Calories, protein, carbs, fats and weight — every metric in one calm command center.",
    span: "md:col-span-6",
  },
];

export const Features = () => (
  <section id="features" data-testid="features-section" className="relative bg-[#0D0D0D] py-24 md:py-32">
    <div className="max-w-7xl mx-auto px-5 md:px-8">
      <div className="max-w-3xl">
        <div className="text-xs md:text-sm font-bold tracking-[0.25em] uppercase text-[#D4AF37]">
          // Features
        </div>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mt-4 leading-[0.95]">
          Built for the way you actually <span className="text-[#D4AF37]">train and eat</span>.
        </h2>
        <p className="mt-5 text-zinc-400 max-w-2xl">
          Every feature in FitX is shaped by behavior — what real people do on
          their best days, and what saves them on their worst.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-12 gap-5 md:gap-6">
        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={i}
              data-testid={`feature-card-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`col-span-12 ${f.span} group relative bg-[#121212] border border-white/5 hover:border-white/20 rounded-md p-7 md:p-8 transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 grid place-items-center rounded-md bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37]">
                  <Icon size={22} strokeWidth={2} />
                </div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-zinc-600">
                  0{i + 1}
                </div>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight mt-6 text-white">
                {f.title}
              </h3>
              <p className="mt-3 text-sm md:text-base text-zinc-400 leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);
