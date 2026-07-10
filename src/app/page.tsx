import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Portfolio from '@/components/sections/Portfolio';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';

export const metadata: Metadata = {
  title: 'Gustavo Beauregard - CTO, Founder & AI Specialist',
  description:
    'Experienced CTO and AI Specialist with 18+ years in software engineering. Leading teams of 40+ engineers, specializing in full-stack development, React, Next.js, and cutting-edge AI solutions.',
};

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background text-foreground">
        <Hero />

        <About />

        <Experience />

        <Portfolio />

        <Skills />

        <Contact />
      </main>
      <Footer />
    </>
  );
}
