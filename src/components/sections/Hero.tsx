'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  Bot,
  ChevronDown,
  Download,
  Layers,
  Mail,
  MapPin,
  Timer,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Squares from '@/components/ui/Squares';
import { SITE_CONFIG } from '@/lib/constants';

const HIGHLIGHTS = [
  { icon: Bot, label: 'Agentic AI systems' },
  { icon: Layers, label: 'Full-stack, end to end' },
  { icon: Users, label: '3M+ MAU platforms' },
  { icon: Timer, label: '18+ years shipping' },
];

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();

  const scrollToNextSection = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openResume = () => {
    window.open('/resume.pdf', '_blank');
  };

  // Animation variants with reduced motion support
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.6,
        staggerChildren: prefersReducedMotion ? 0.05 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ paddingTop: 'var(--header-height)' }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background dark:from-background dark:via-muted/10 dark:to-background" />

      {/* Squares background effect */}
      <div className="absolute inset-0 overflow-hidden">
        <Squares 
          speed={prefersReducedMotion ? 0 : 0.5} 
          squareSize={40}
          direction='diagonal'
          borderColor='rgba(128, 128, 128, 0.1)'
          hoverFillColor='rgba(128, 128, 128, 0.05)'
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          {/* Location & Status */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-2 text-muted-foreground mb-6"
          >
            <MapPin size={16} />
            <span className="text-sm font-medium">Querétaro, Mexico</span>
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse ml-2" />
            <span className="text-sm">{SITE_CONFIG.availability}</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="text-foreground">Hi, I&apos;m </span>
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Gustavo
            </span>
            <br />
            <span className="bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">
              Beauregard
            </span>
          </motion.h1>

          {/* Role */}
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-muted-foreground mb-4">
              {SITE_CONFIG.title}
            </h2>
            <ul className="mx-auto flex max-w-3xl flex-wrap justify-center border-y border-border text-sm font-medium">
              {HIGHLIGHTS.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 px-4 py-3 text-foreground/80 sm:[&:not(:last-child)]:border-r sm:border-border"
                >
                  <Icon size={16} className="text-accent" />
                  {label}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            I build{' '}
            <span className="text-secondary font-semibold">agentic products</span>{' '}
            end to end, from browser agents and conversational AI to retrieval
            pipelines, and I ship them with a workflow run by coding agents, on{' '}
            <span className="text-accent font-semibold">
              high-availability architectures
            </span>{' '}
            that have served{' '}
            <span className="text-primary font-semibold">
              3M+ monthly active users
            </span>
            .
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.div
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                size="lg"
                className="px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                onClick={scrollToContact}
              >
                <Mail size={20} className="mr-2" />
                Let&apos;s Connect
              </Button>
            </motion.div>

            <motion.div
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-4 text-lg font-semibold border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 hover:shadow-lg"
                onClick={openResume}
              >
                <Download size={20} className="mr-2" />
                Download Resume
              </Button>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center cursor-pointer group"
            onClick={scrollToNextSection}
          >
            <span className="text-sm text-muted-foreground mb-2 font-medium group-hover:text-secondary transition-colors duration-300">
              Scroll to explore
            </span>
            <motion.div
              animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
              transition={
                prefersReducedMotion
                  ? {}
                  : {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }
              }
              className="p-2 border border-muted hover:border-secondary transition-colors duration-300 group-hover:shadow-lg will-change-transform"
            >
              <ChevronDown
                size={20}
                className="text-muted-foreground group-hover:text-secondary transition-colors duration-300"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
