import Hero from '@/components/Hero';
import StatsSection from '@/components/StatsSection';
import Marquee from '@/components/Marquee';
import MenuSection from '@/components/MenuSection';
import BenefitsSection from '@/components/BenefitsSection';
import AboutSection from '@/components/AboutSection';
import LocationsSection from '@/components/LocationsSection';
import ReviewsSection from '@/components/ReviewsSection';
import LiquidCursor from '@/components/LiquidCursor';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import ScrollToTop from '@/components/ScrollToTop';
import ScrollProgress from '@/components/ScrollProgress';
import { Reveal } from '@/components/Reveal';

export default function Home() {
  return (
    <main className="min-h-screen bg-[--color-background] relative selection:bg-blue-200 selection:text-blue-900 overflow-x-hidden">
      <ScrollProgress />
      <LiquidCursor />
      <Navbar />
      <Hero />
      <Reveal><StatsSection /></Reveal>
      <Marquee />
      <Reveal><BenefitsSection /></Reveal>
      <Reveal><AboutSection /></Reveal>
      <Reveal><MenuSection /></Reveal>
      <Reveal><LocationsSection /></Reveal>
      <Reveal><ReviewsSection /></Reveal>
      <Footer />
      <ScrollToTop />
    </main>
  );
}

