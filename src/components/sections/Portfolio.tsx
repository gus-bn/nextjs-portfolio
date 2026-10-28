'use client';

import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Cpu, Images, Lock } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { ProjectGallery } from '@/components/ui/ProjectGallery';
import { logoPlate, ProjectLogo } from '@/components/ui/ProjectLogo';
import { PROJECTS, type Project } from '@/lib/projects';

const firstSentence = (text: string) => text.split(/(?<=\.)\s/)[0];

const ProjectCard = ({
  project,
  index,
  isInView,
  onOpen,
}: {
  project: Project;
  index: number;
  isInView: boolean;
  onOpen: (project: Project) => void;
}) => {
  const prefersReducedMotion = useReducedMotion();
  const CategoryIcon = project.categoryIcon;
  const cover = project.shots[0];
  const host = project.url?.replace(/^https:\/\/|\/$/g, '');

  return (
    <motion.article
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1 }}
      className="group relative flex flex-col border border-border bg-card transition-colors duration-300 hover:border-foreground/25"
    >
      {/* Cover */}
      <button
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`Open ${project.name} screenshots`}
        className="relative block text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
      >
        <div className="flex items-center gap-2 border-b border-border bg-muted px-3 py-2 font-mono text-[11px] text-muted-foreground">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2 w-2 bg-foreground/15" />
            <span className="h-2 w-2 bg-foreground/15" />
            <span className="h-2 w-2 bg-foreground/15" />
          </span>
          <span className="ml-2 flex items-center gap-1.5 truncate">
            {host ? (
              host
            ) : project.brands ? (
              project.brands
                .map((brand) => brand.url?.replace(/^https:\/\/|\/$/g, ''))
                .join('  ·  ')
            ) : (
              <>
                <Lock size={11} /> private console
              </>
            )}
          </span>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden bg-black">
          <Image
            src={cover.src}
            alt={cover.caption}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          <span className="absolute bottom-4 right-4 flex items-center gap-2 border border-white/20 bg-black/70 px-3 py-1.5 text-xs font-semibold text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
            <Images size={14} /> {project.shots.length} screens
          </span>
        </div>
      </button>

      {/* Logo plate */}
      <div
        className={`relative z-10 -mt-8 ml-5 flex h-16 w-fit items-center px-4 shadow-xl shadow-black/15 md:ml-7 dark:shadow-black/40 ${logoPlate(project)}`}
      >
        <ProjectLogo project={project} />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5 md:p-7">
        <div className="mb-4 flex items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          <span className="flex items-center gap-2">
            <CategoryIcon size={14} className="text-accent" />
            {project.category}
          </span>
          <span>{project.period}</span>
        </div>

        <h3 className="text-2xl font-semibold tracking-[-0.04em] md:text-3xl">
          {project.name}
        </h3>
        <p className="mt-2 text-lg leading-snug tracking-[-0.02em] text-foreground/85">
          {project.statement}
        </p>

        {project.brands && (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {project.brands.map((brand) => (
              <span
                key={brand.name}
                className="flex h-8 items-center bg-white px-2.5 ring-1 ring-black/10"
              >
                <Image
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  width={96}
                  height={24}
                  className="h-4 w-auto object-contain"
                />
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 flex gap-3 border-t border-border pt-5">
          <Cpu size={18} className="mt-0.5 shrink-0 text-accent" />
          <p className="text-sm leading-relaxed text-muted-foreground">
            {firstSentence(project.agentic)}
          </p>
        </div>

        <p className="mt-5 font-mono text-xs leading-6 text-accent/80">
          {project.stack.slice(0, 6).join('  /  ')}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-7">
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="inline-flex items-center gap-2 bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Images size={16} /> More info
          </button>
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-border px-4 py-2.5 text-sm font-semibold text-foreground/85 transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Live site <ArrowUpRight size={16} />
            </a>
          ) : project.brands ? null : (
            <span className="inline-flex items-center gap-2 px-1 text-xs text-muted-foreground">
              <Lock size={14} /> Private platform
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
};

const Portfolio = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [active, setActive] = useState<Project | null>(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <section
      id="portfolio"
      ref={ref}
      className="relative overflow-hidden bg-muted/30 py-20 text-foreground md:py-28 dark:bg-[#090a0d]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(hsl(var(--foreground)/.05)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground)/.05)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[44rem] -translate-x-1/2 rounded-full bg-secondary/10 blur-[140px] dark:bg-secondary/20" />

      <div className="container relative mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14 grid gap-8 md:mb-20 lg:grid-cols-[1.3fr_1fr] lg:items-end"
        >
          <div>
            <div className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
              <span className="h-px w-10 bg-accent" />
              Selected work
            </div>
            <h2 className="font-mono text-4xl font-semibold leading-[0.95] tracking-[-0.07em] sm:text-5xl md:text-7xl">
              Whole products, <span className="text-accent">built with agents.</span>
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Agents inside the product doing real work, and agents in my
            workflow writing, testing and shipping the code. Open any project
            to see the screens and how the agentic layer fits.
          </p>
        </motion.div>

        <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              isInView={isInView}
              onOpen={setActive}
            />
          ))}
        </div>
      </div>

      <ProjectGallery project={active} onClose={close} />
    </section>
  );
};

export default Portfolio;
