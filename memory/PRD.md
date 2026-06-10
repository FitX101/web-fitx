# FitX Global — Promotional Website

## Original Problem Statement
> emergent just made an app for me called FitX. Play store - https://play.google.com/store/apps/details?id=com.fitx.health, App Store - https://apps.apple.com/app/fitx-ai-fitness-diet-coach/id6760651950. Make an amazing website for my app with live motion workout and fitness in the background, make the website SEO-friendly with blogs as well. The website should be classy and attractive and is only for promotion purpose, redirecting users to App Store and Play Store on the platform button they click on. I already have a domain for the website from godaddy: fitxglobal.com. Make it live on this domain on making it.

## Architecture
- **Frontend:** React (CRA + craco), TailwindCSS, framer-motion, shadcn/ui, sonner toasts, react-icons, react-router-dom v7.
- **Backend:** FastAPI + Motor (MongoDB async), Pydantic v2. Routes prefixed `/api`.
- **DB:** MongoDB collections: `newsletter_subscribers`, `contact_messages`. Blog data is seeded in-code (6 posts).
- **Routing:** `/` (Home), `/blog` (BlogIndex), `/blog/:slug` (BlogPost).

## Design
- Dark "Performance Pro" theme — obsidian backgrounds (#0A0A0A / #141414), kinetic red accent (#FF3B30).
- Typography: Barlow Condensed (display) + DM Sans (body) — non-cliché pairing.
- Hero: looping Mixkit fitness video background + floating phone mockup with real App Store screenshot.
- Bento-grid features section; floating stats cards on phone; marquee phone-screenshot gallery; 3-step "How it works"; pricing 3/6/12mo plans matching App Store IAP.

## User Personas
1. **Mobile-first fitness seeker** — discovers FitX via social/search, lands on hero, taps Play Store / App Store CTA.
2. **Researcher** — reads blog (SEO entry) → converts via in-article CTA.
3. **Brand/PR/Partner** — uses the contact form to reach the team.

## Core Requirements (Static)
- Promotional only — every CTA redirects externally to App Store / Play Store.
- SEO-friendly: semantic HTML, meta tags, OG/Twitter cards, JSON-LD MobileApplication schema, canonical URL.
- Blogs section with multiple articles + individual post pages.
- Newsletter email capture (persisted).
- Contact form (persisted).
- Motion/video background in hero.

## What's Been Implemented (2026-12-10)
- ✅ FastAPI backend: `/api/`, `/api/newsletter` (POST, idempotent), `/api/newsletter` (GET admin), `/api/contact` (POST), `/api/blogs` (list + category filter), `/api/blogs/{slug}`.
- ✅ React frontend with 11 sections: Navbar (sticky glass), Hero (video bg + phone mockup), Stats strip, Features (bento), HowItWorks, Screenshots (marquee phones), Pricing, Testimonials, Newsletter, Contact, Footer.
- ✅ Blog index + dynamic blog post page with 6 seeded fitness/diet articles + in-article CTA.
- ✅ All App Store / Play Store buttons link to live FitX URLs (target=_blank).
- ✅ data-testids on every interactive element.
- ✅ SEO meta tags + JSON-LD schema in index.html.
- ✅ Toasts via `sonner`; forms via shadcn `Input`/`Textarea`.
- ✅ Backend tests: 12/12 pass. Frontend tests: all flows verified.

## Prioritized Backlog
### P0 (next)
- Deploy to fitxglobal.com via Emergent platform → DNS guidance for GoDaddy.

### P1
- Move blog content to MongoDB collection + simple admin to add posts.
- Add `/api/admin/newsletter` and `/api/admin/contact` listing with basic auth for owner access (CSV export).
- Sitemap.xml + robots.txt for SEO.
- Add Open Graph image (1200×630) generated for FitX brand.

### P2
- Multi-language (i18n) — Hindi + English given India HQ.
- A/B test hero copy / CTAs for store-click conversion.
- Instagram embed strip in footer.
- Privacy Policy + Terms internal pages (currently links to external https://fitxglobal.com/privacy-policy/).

## Next Tasks
- User-driven: deploy to fitxglobal.com → point GoDaddy DNS.
- Optional: add Open Graph image and sitemap before launch.
