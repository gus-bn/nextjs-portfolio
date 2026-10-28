'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Lock,
  X,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Project } from '@/lib/projects';
import { logoPlate, ProjectLogo } from './ProjectLogo';

type ProjectGalleryProps = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectGallery({ project, onClose }: ProjectGalleryProps) {
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const closeRef = useRef<HTMLButtonElement>(null);
  const count = project?.shots.length ?? 0;

  const go = useCallback(
    (step: number) => {
      if (!count) return;
      setDirection(step);
      setIndex((current) => (current + step + count) % count);
    },
    [count]
  );

  useEffect(() => {
    if (!project) return;
    setIndex(0);
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') go(1);
      if (event.key === 'ArrowLeft') go(-1);
    };
    document.addEventListener('keydown', handleKey);

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [project, onClose, go]);

  const shot = project?.shots[index];
  const slide = prefersReducedMotion ? 0 : 48;

  return (
    <AnimatePresence>
      {project && shot && (
        <motion.div
          key={project.slug}
          className="fixed inset-0 z-[60] flex items-stretch justify-center bg-black/60 backdrop-blur-md dark:bg-black/85 md:items-center md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`gallery-${project.slug}`}
            className="relative flex max-h-full w-full max-w-7xl flex-col overflow-y-auto border border-border bg-background text-foreground shadow-2xl lg:flex-row lg:overflow-hidden"
            initial={{ y: prefersReducedMotion ? 0 : 32, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: prefersReducedMotion ? 0 : 24, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            {/* Viewer */}
            <div className="flex min-w-0 flex-1 flex-col bg-muted/50">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div
                    key={shot.src}
                    custom={direction}
                    className="absolute inset-0"
                    initial={{ opacity: 0, x: direction * slide }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -direction * slide }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Image
                      src={shot.src}
                      alt={shot.caption}
                      fill
                      sizes="(max-width: 1024px) 100vw, 70vw"
                      className="object-contain object-top"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close project details"
                  className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center border border-white/15 bg-black/70 text-white backdrop-blur lg:hidden"
                >
                  <X size={18} />
                </button>

                {count > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => go(-1)}
                      aria-label="Previous screenshot"
                      className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center border border-white/15 bg-black/60 text-white backdrop-blur transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      type="button"
                      onClick={() => go(1)}
                      aria-label="Next screenshot"
                      className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center border border-white/15 bg-black/60 text-white backdrop-blur transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>

              <div className="flex items-start justify-between gap-4 border-t border-border px-4 py-3 md:px-5">
                <p className="text-sm text-muted-foreground" aria-live="polite">
                  {shot.caption}
                </p>
                <span className="shrink-0 font-mono text-xs text-muted-foreground">
                  {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                </span>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto border-t border-border p-3 md:p-4">
                {project.shots.map((thumb, thumbIndex) => (
                  <button
                    key={thumb.src}
                    type="button"
                    onClick={() => {
                      setDirection(thumbIndex > index ? 1 : -1);
                      setIndex(thumbIndex);
                    }}
                    aria-label={`Show screenshot ${thumbIndex + 1}: ${thumb.caption}`}
                    aria-current={thumbIndex === index}
                    className={`relative aspect-video w-28 shrink-0 overflow-hidden border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:w-32 ${
                      thumbIndex === index
                        ? 'border-accent opacity-100'
                        : 'border-border opacity-50 hover:opacity-90'
                    }`}
                  >
                    <Image
                      src={thumb.src}
                      alt=""
                      fill
                      sizes="128px"
                      className="object-cover object-top"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <aside className="w-full shrink-0 border-t border-border lg:w-[400px] lg:overflow-y-auto lg:border-l lg:border-t-0">
              <div className="flex items-center justify-between border-b border-border p-4 md:p-5">
                <div className={`flex h-10 items-center px-3 ${logoPlate(project)}`}>
                  <ProjectLogo project={project} className="h-6" />
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close project details"
                  className="grid h-10 w-10 place-items-center border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-7 p-5 md:p-6">
                <div>
                  <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {project.category} · {project.period}
                  </div>
                  <h3
                    id={`gallery-${project.slug}`}
                    className="text-3xl font-semibold tracking-[-0.04em]"
                  >
                    {project.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{project.role}</p>
                  <p className="mt-4 text-sm leading-relaxed text-foreground/75">
                    {project.summary}
                  </p>
                </div>

                <div className="border-l-2 border-accent pl-4">
                  <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-accent">
                    <Cpu size={14} /> Agentic layer
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/85">
                    {project.agentic}
                  </p>
                </div>

                <ul className="space-y-4">
                  {project.highlights.map(({ icon: Icon, title, body }) => (
                    <li key={title} className="flex gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center border border-border text-accent">
                        <Icon size={17} />
                      </span>
                      <div>
                        <div className="text-sm font-semibold">{title}</div>
                        <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                          {body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div>
                  <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    Stack
                  </div>
                  <p className="font-mono text-xs leading-6 text-accent/90">
                    {project.stack.join('  /  ')}
                  </p>
                </div>

                {project.brands && (
                  <div className="grid gap-2">
                    {project.brands.map((brand) => (
                      <a
                        key={brand.name}
                        href={brand.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center justify-between border border-border px-3 py-2.5 transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <span className="flex h-7 items-center bg-white px-2 ring-1 ring-black/10">
                          <Image
                            src={brand.logo}
                            alt={`${brand.name} logo`}
                            width={96}
                            height={24}
                            className="h-4 w-auto object-contain"
                          />
                        </span>
                        <ArrowUpRight
                          size={16}
                          className="text-muted-foreground transition-colors group-hover:text-accent"
                        />
                      </a>
                    ))}
                  </div>
                )}

                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Visit {project.url.replace(/^https:\/\/|\/$/g, '')}
                    <ArrowUpRight size={16} />
                  </a>
                )}

                {project.privateNote && (
                  <p className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Lock size={14} /> {project.privateNote}
                  </p>
                )}
              </div>
            </aside>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
