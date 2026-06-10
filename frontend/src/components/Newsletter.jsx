import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await axios.post(`${API}/newsletter`, { email });
      toast.success("You're in. Watch your inbox for FitX drops.");
      setEmail("");
    } catch (err) {
      const msg = err?.response?.data?.detail || "Could not subscribe. Try again.";
      toast.error(typeof msg === "string" ? msg : "Could not subscribe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="newsletter"
      data-testid="newsletter-section"
      className="relative bg-[#0A0A0A] py-20 md:py-28 border-t border-white/5"
    >
      <div className="max-w-4xl mx-auto px-5 md:px-8 text-center">
        <div className="text-xs md:text-sm font-bold tracking-[0.25em] uppercase text-[#D4AF37]">
          // Newsletter
        </div>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mt-4 leading-[0.95]">
          The fitness drop. <span className="text-[#D4AF37]">Weekly.</span>
        </h2>
        <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
          Workouts, nutrition science and behind-the-scenes from the FitX team —
          no spam, just signal.
        </p>

        <form
          onSubmit={submit}
          data-testid="newsletter-form"
          className="mt-9 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
        >
          <Input
            type="email"
            required
            placeholder="you@strongmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            data-testid="newsletter-email-input"
            className="h-12 bg-[#141414] border-white/10 text-white placeholder:text-zinc-500 focus-visible:ring-[#D4AF37]"
          />
          <button
            type="submit"
            disabled={loading}
            data-testid="newsletter-submit"
            className="h-12 px-7 rounded-md bg-[#D4AF37] text-black font-display font-bold uppercase tracking-widest text-sm hover:bg-[#B8941F] transition-colors disabled:opacity-60"
          >
            {loading ? "Joining..." : "Join"}
          </button>
        </form>
      </div>
    </section>
  );
};
