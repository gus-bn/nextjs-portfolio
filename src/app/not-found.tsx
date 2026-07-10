'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search, FileQuestion } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />

      {/* Floating orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-primary/10 blur-3xl"
        animate={{
          x: mousePosition.x * 0.02,
          y: mousePosition.y * 0.02,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 100 }}
        style={{ top: '10%', left: '10%' }}
      />
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-accent/10 blur-3xl"
        animate={{
          x: mousePosition.x * -0.02,
          y: mousePosition.y * -0.02,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 100 }}
        style={{ bottom: '10%', right: '10%' }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Animated 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
          className="relative mb-8"
        >
          <motion.h1
            className="text-[12rem] sm:text-[16rem] md:text-[20rem] font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary via-accent to-primary leading-none"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear'
            }}
            style={{
              backgroundSize: '200% 200%',
            }}
          >
            404
          </motion.h1>

          {/* Glitch effect overlay */}
          <motion.div
            className="absolute inset-0 text-[12rem] sm:text-[16rem] md:text-[20rem] font-bold text-primary/20 leading-none"
            animate={{
              x: [0, -2, 2, -2, 0],
              opacity: [0, 0.5, 0, 0.5, 0],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          >
            404
          </motion.div>
        </motion.div>

        {/* Profile Image with Icon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            {/* Profile Image */}
            <motion.div
              className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            >
              {!imageError ? (
                <Image
                  src="/profile.webp"
                  alt="Gustavo Beauregard"
                  fill
                  className="object-cover"
                  onError={() => setImageError(true)}
                  priority
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <FileQuestion className="w-16 h-16 text-primary/60" strokeWidth={1.5} />
                </div>
              )}
            </motion.div>

            {/* Animated ring around image */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary/40"
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 blur-xl bg-primary/20 rounded-full -z-10"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Page Not Found
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-md mx-auto">
            Looks like you&apos;ve ventured into uncharted territory.
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 text-base font-medium text-primary-foreground overflow-hidden transition-all duration-300"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary to-accent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.3 }}
              />
              <Home className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Go Home</span>
            </motion.button>
          </Link>

          <Link href="/#about">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center justify-center gap-2 rounded-lg border-2 border-primary/20 bg-background/50 backdrop-blur-sm px-8 py-4 text-base font-medium text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
            >
              <Search className="w-5 h-5" />
              <span>Explore Portfolio</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Back navigation hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-sm text-muted-foreground flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>or press your browser&apos;s back button</span>
        </motion.div>
      </div>

      {/* Floating particles */}
      {mounted && [...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/30 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
          }}
          animate={{
            y: [null, Math.random() * -100 - 50],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}
