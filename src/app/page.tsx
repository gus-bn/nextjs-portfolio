import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Portfolio from '@/components/sections/Portfolio';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: SITE_CONFIG.siteName,
  description: SITE_CONFIG.description,
};

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background text-foreground">
        <Hero />

        <About />

        <Skills />

        <Portfolio />

        <Experience />

        <Contact />
      </main>
      <Footer />
    </>
  );
}
