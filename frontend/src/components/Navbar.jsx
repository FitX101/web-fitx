import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { APP_STORE_URL, PLAY_STORE_URL, APP_ICON } from "@/lib/constants";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: "Features", href: "/#features", testId: "nav-features-link" },
    { label: "How it works", href: "/#how-it-works", testId: "nav-how-link" },
    { label: "Pricing", href: "/#pricing", testId: "nav-pricing-link" },
    { label: "Blog", href: "/blog", testId: "nav-blog-link" },
    { label: "Contact", href: "/#contact", testId: "nav-contact-link" },
  ];

  return (
    <header
      data-testid="main-navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-black/70 border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        <Link to="/" data-testid="nav-logo" className="flex items-center gap-2.5">
          <img src={APP_ICON} alt="FitX" className="h-9 w-9 rounded-lg" />
          <span className="font-display text-2xl font-black tracking-tight uppercase">
            Fit<span className="text-[#FF3B30]">X</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={l.testId}
              className="text-sm font-medium text-zinc-300 hover:text-white transition-colors uppercase tracking-wider"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="nav-app-store-btn"
            aria-label="Download on the App Store"
            className="h-10 w-10 grid place-items-center rounded-md border border-white/10 bg-white/5 text-white hover:bg-white hover:text-black transition-colors"
          >
            <FaApple className="text-xl" />
          </a>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="nav-play-store-btn"
            aria-label="Get it on Google Play"
            className="inline-flex items-center gap-2 px-4 h-10 rounded-md bg-[#FF3B30] text-white text-sm font-bold uppercase tracking-wider hover:bg-[#E6352B] transition-colors"
          >
            <FaGooglePlay /> Get App
          </a>
        </div>

        <button
          data-testid="mobile-menu-toggle"
          className="lg:hidden h-10 w-10 grid place-items-center text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-black/95 border-t border-white/10" data-testid="mobile-menu">
          <div className="px-5 py-6 flex flex-col gap-5">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-testid={`mobile-${l.testId}`}
                className="text-base font-medium text-zinc-200 hover:text-[#FF3B30] uppercase tracking-wider"
              >
                {l.label}
              </a>
            ))}
            <div className="flex gap-3 pt-2">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="mobile-app-store-btn"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 h-11 rounded-md bg-white text-black font-bold"
              >
                <FaApple /> App Store
              </a>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="mobile-play-store-btn"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 h-11 rounded-md bg-[#FF3B30] text-white font-bold"
              >
                <FaGooglePlay /> Play Store
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
