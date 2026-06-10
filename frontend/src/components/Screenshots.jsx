import { motion } from "framer-motion";
import { SCREENSHOTS } from "@/lib/constants";

export const Screenshots = () => (
  <section
    id="screenshots"
    data-testid="screenshots-section"
    className="relative bg-[#0A0A0A] py-24 md:py-32 overflow-hidden"
  >
    <div className="max-w-7xl mx-auto px-5 md:px-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <div className="text-xs md:text-sm font-bold tracking-[0.25em] uppercase text-[#FF3B30]">
            // Inside the app
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mt-4 leading-[0.95] max-w-3xl">
            A workout floor. <span className="text-[#FF3B30]">In your pocket.</span>
          </h2>
        </div>
        <p className="max-w-md text-zinc-400">
          Every screen designed for clarity at a glance — from a sweaty mid-set
          check-in to a calm Sunday meal-prep review.
        </p>
      </div>
    </div>

    {/* Phone gallery */}
    <div className="mt-16 relative">
      <div className="fx-marquee-track gap-6">
        {[...SCREENSHOTS, ...SCREENSHOTS].map((src, i) => (
          <motion.div
            key={i}
            className="shrink-0 w-[220px] md:w-[260px]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full aspect-[9/16] rounded-[28px] border-[8px] border-zinc-800 bg-zinc-900 overflow-hidden shadow-xl">
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-16 h-3 bg-black rounded-full z-10" />
              <img
                src={src}
                alt={`FitX screenshot ${(i % SCREENSHOTS.length) + 1}`}
                className="w-full h-full object-cover"
                data-testid={`screenshot-${i % SCREENSHOTS.length}`}
              />
            </div>
          </motion.div>
        ))}
      </div>
      {/* edge fades */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent pointer-events-none" />
    </div>
  </section>
);
