import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Mail, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SUPPORT_EMAIL, SUPPORT_PHONE } from "@/lib/constants";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Message sent. We'll get back to you shortly.");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      const msg = err?.response?.data?.detail || "Could not send. Try again.";
      toast.error(typeof msg === "string" ? msg : "Could not send.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative bg-[#121212] py-24 md:py-32 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        <div>
          <div className="text-xs md:text-sm font-bold tracking-[0.25em] uppercase text-[#D4AF37]">
            // Get in touch
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mt-4 leading-[0.95]">
            Talk to the <span className="text-[#D4AF37]">FitX team</span>.
          </h2>
          <p className="mt-5 text-zinc-400 max-w-md">
            Partnerships, press, support or just a hello — we read every message
            that lands in our inbox.
          </p>

          <ul className="mt-10 space-y-5">
            <li className="flex items-start gap-4">
              <div className="h-11 w-11 grid place-items-center rounded-md bg-[#0D0D0D] border border-white/10 text-[#D4AF37]">
                <Mail size={18} />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">Email</div>
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="font-display text-lg font-bold tracking-tight text-white hover:text-[#D4AF37]"
                  data-testid="contact-email"
                >
                  {SUPPORT_EMAIL}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="h-11 w-11 grid place-items-center rounded-md bg-[#0D0D0D] border border-white/10 text-[#D4AF37]">
                <Phone size={18} />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">Phone</div>
                <a
                  href={`tel:${SUPPORT_PHONE.replace(/\s/g, "")}`}
                  className="font-display text-lg font-bold tracking-tight text-white hover:text-[#D4AF37]"
                  data-testid="contact-phone"
                >
                  {SUPPORT_PHONE}
                </a>
              </div>
            </li>
          </ul>
        </div>

        <form onSubmit={submit} data-testid="contact-form" className="bg-[#0D0D0D] border border-white/5 rounded-md p-7 md:p-9">
          <div className="space-y-4">
            <div>
              <label className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">Name</label>
              <Input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Jane Doe"
                data-testid="contact-name-input"
                className="mt-2 h-12 bg-[#121212] border-white/10 text-white placeholder:text-zinc-500 focus-visible:ring-[#D4AF37]"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">Email</label>
              <Input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@email.com"
                data-testid="contact-email-input"
                className="mt-2 h-12 bg-[#121212] border-white/10 text-white placeholder:text-zinc-500 focus-visible:ring-[#D4AF37]"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">Message</label>
              <Textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us what's on your mind..."
                data-testid="contact-message-input"
                className="mt-2 bg-[#121212] border-white/10 text-white placeholder:text-zinc-500 focus-visible:ring-[#D4AF37]"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              data-testid="contact-submit"
              className="w-full h-12 rounded-md bg-[#D4AF37] text-black font-display font-bold uppercase tracking-widest text-sm hover:bg-[#B8941F] transition-colors disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send message"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
