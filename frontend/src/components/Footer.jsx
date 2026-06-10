import { Link } from "react-router-dom";
import { FaApple, FaGooglePlay, FaInstagram } from "react-icons/fa";
import {
  APP_STORE_URL,
  PLAY_STORE_URL,
  APP_ICON,
  SUPPORT_EMAIL,
} from "@/lib/constants";

export const Footer = () => (
  <footer
    data-testid="site-footer"
    className="relative bg-[#0A0A0A] border-t border-white/10 pt-16 pb-8"
  >
    <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-10">
      <div className="md:col-span-5">
        <div className="flex items-center gap-2.5">
          <img src={APP_ICON} alt="FitX" className="h-10 w-10 rounded-lg" />
          <span className="font-display text-3xl font-black tracking-tight uppercase">
            Fit<span className="text-[#FF3B30]">X</span>
          </span>
        </div>
        <p className="mt-5 text-zinc-400 max-w-md text-sm leading-relaxed">
          FitX is the AI fitness & diet coach in your pocket. Built by athletes,
          engineered for everyone.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="footer-app-store"
            className="inline-flex items-center gap-2 px-4 h-11 rounded-md bg-white text-black font-display font-bold uppercase tracking-wider text-sm hover:bg-[#FF3B30] hover:text-white transition-colors"
          >
            <FaApple /> App Store
          </a>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="footer-play-store"
            className="inline-flex items-center gap-2 px-4 h-11 rounded-md bg-[#FF3B30] text-white font-display font-bold uppercase tracking-wider text-sm hover:bg-[#E6352B] transition-colors"
          >
            <FaGooglePlay /> Play Store
          </a>
        </div>
      </div>

      <div className="md:col-span-2">
        <div className="text-xs uppercase tracking-[0.25em] text-zinc-500">Product</div>
        <ul className="mt-4 space-y-3 text-sm">
          <li><a href="/#features" className="text-zinc-300 hover:text-[#FF3B30]">Features</a></li>
          <li><a href="/#how-it-works" className="text-zinc-300 hover:text-[#FF3B30]">How it works</a></li>
          <li><a href="/#pricing" className="text-zinc-300 hover:text-[#FF3B30]">Pricing</a></li>
          <li><Link to="/blog" className="text-zinc-300 hover:text-[#FF3B30]">Blog</Link></li>
        </ul>
      </div>

      <div className="md:col-span-2">
        <div className="text-xs uppercase tracking-[0.25em] text-zinc-500">Company</div>
        <ul className="mt-4 space-y-3 text-sm">
          <li><a href="/#contact" className="text-zinc-300 hover:text-[#FF3B30]">Contact</a></li>
          <li>
            <a href="https://fitxglobal.com/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-[#FF3B30]">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-zinc-300 hover:text-[#FF3B30]">
              Support
            </a>
          </li>
        </ul>
      </div>

      <div className="md:col-span-3">
        <div className="text-xs uppercase tracking-[0.25em] text-zinc-500">Follow</div>
        <ul className="mt-4 space-y-3 text-sm">
          <li>
            <a
              href="https://www.instagram.com/fitx_global"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-instagram"
              className="inline-flex items-center gap-2 text-zinc-300 hover:text-[#FF3B30]"
            >
              <FaInstagram /> @fitx_global
            </a>
          </li>
          <li>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-zinc-300 hover:text-[#FF3B30]">
              {SUPPORT_EMAIL}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-5 md:px-8 mt-14 pt-6 border-t border-white/5 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
      <div className="text-xs text-zinc-500 uppercase tracking-[0.2em]">
        © {new Date().getFullYear()} FitX Global Pvt Ltd. All rights reserved.
      </div>
      <div className="text-xs text-zinc-600 uppercase tracking-[0.2em]">
        Designed for athletes. Built for everyone.
      </div>
    </div>
  </footer>
);
