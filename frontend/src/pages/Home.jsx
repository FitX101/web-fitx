import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Screenshots } from "@/components/Screenshots";
import { Pricing } from "@/components/Pricing";
import { Testimonials } from "@/components/Testimonials";
import { Newsletter } from "@/components/Newsletter";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main data-testid="home-page">
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <Screenshots />
      <Pricing />
      <Testimonials />
      <Newsletter />
      <Contact />
    </main>
  );
}
