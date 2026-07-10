'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import {
  ArrowUpRight,
  Bot,
  Braces,
  Network,
  Smartphone,
} from 'lucide-react';
import { useRef } from 'react';

type Project = {
  name: string;
  eyebrow: string;
  url: string;
  image: string;
  imageAlt: string;
  statement: string;
  description: string;
  capabilities: string[];
  icon: typeof Bot;
};

const projects: Project[] = [
  {
    name: 'Utoppia',
    eyebrow: 'AI automation platform',
    url: 'https://utoppia.ai/',
    image: '/utoppia.png',
    imageAlt: 'Utoppia intelligent automation platform homepage',
    statement: 'Turn operational drag into intelligent momentum.',
    description:
      'Built from the ground up as an enterprise AI platform: a conversion-led product experience backed by intelligent agents, custom automations, and integrations that make complex internal operations feel clear and actionable.',
    capabilities: ['AI agents', 'RPA workflows', 'Knowledge systems', 'Conversion engine'],
    icon: Bot,
  },
  {
    name: 'ChatO',
    eyebrow: 'Conversational AI + CRM',
    url: 'https://getchato.ai/',
    image: '/chato.png',
    imageAlt: 'ChatO intelligent customer communication homepage',
    statement: 'A sales and support team that never leaves the chat.',
    description:
      'Created the full product story and operating surface for an AI agent that can qualify leads, manage support, schedule meetings, and hand conversations to people through WhatsApp, Instagram, Web Chat, Zendesk, Salesforce, and more.',
    capabilities: ['Omnichannel UX', 'Lead CRM', 'Human handoff', 'Messaging APIs'],
    icon: Network,
  },
  {
    name: 'WeWell',
    eyebrow: 'Personal wellness intelligence',
    url: 'https://wewell.ai/',
    image: '/wewell.png',
    imageAlt: 'WeWell AI wellness coach homepage',
    statement: 'Habit-building, designed for the rhythm of real life.',
    description:
      'Designed and engineered a calm, human-centered wellness experience around an always-on AI coach. The system connects nutrition, fitness, emotional health, progress tracking, and expert support in one personalized daily journey.',
    capabilities: ['Mobile-first journeys', 'Personalization', 'Health dashboards', 'Human-in-the-loop'],
    icon: Smartphone,
  },
  {
    name: 'Eucledian',
    eyebrow: 'Digital products + growth systems',
    url: 'https://eucledian.com/',
    image: '/eucledian.png',
    imageAlt: 'Eucledian digital technology studio homepage',
    statement: 'The studio where product, operations, and growth meet.',
    description:
      'Founded the technical and creative foundation for tailored web and mobile products. From high-converting campaigns to admin tools, REST API backends, and dashboards, each build connected a sharp front end to a system teams could actually run.',
    capabilities: ['Web + mobile', 'Admin CMS', 'REST APIs', 'Campaign systems'],
    icon: Braces,
  },
];

const Portfolio = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="portfolio"
      ref={ref}
      className="relative overflow-hidden bg-[#090a0d] py-20 text-white md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.055)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[44rem] -translate-x-1/2 rounded-full bg-secondary/20 blur-[140px]" />

      <div className="container relative mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-3xl md:mb-24"
        >
          <div className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-white/55">
            <span className="h-px w-10 bg-accent" />
            Selected work · 2012 to now
          </div>
          <h2 className="font-mono text-4xl font-semibold leading-[0.95] tracking-[-0.07em] sm:text-5xl md:text-7xl">
            I build the <span className="text-accent">whole</span> product.
          </h2>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
            Not just the screen users see. The launch story, the conversion
            system, the admin console, the CRM, the API layer, and the
            automation that keeps the business moving after launch.
          </p>
        </motion.div>

        <div className="space-y-8 md:space-y-12">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.article
                key={project.name}
                initial={{ opacity: 0, y: 36 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: index * 0.09 }}
                className="group relative overflow-hidden border border-white/10 bg-white/[0.035] p-3 backdrop-blur-sm md:p-5"
              >
                <div className="grid gap-7 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:gap-12">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Visit ${project.name}`}
                    className="relative block bg-[#141418] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <div className="relative aspect-video bg-black">
                      <Image
                        src={project.image}
                        alt={project.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        className="object-contain"
                      />
                    </div>
                  </a>

                  <div className="pb-4 pl-2 pr-2 md:px-4 lg:py-8">
                    <div className="mb-6 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <span>{project.eyebrow}</span>
                    </div>
                    <div className="mb-5 flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center bg-white text-black">
                        <Icon size={19} strokeWidth={2.4} />
                      </div>
                      <h3 className="text-3xl font-semibold tracking-[-0.05em] md:text-4xl">
                        {project.name}
                      </h3>
                    </div>
                    <p className="max-w-md text-xl leading-tight tracking-[-0.035em] text-white md:text-2xl">
                      {project.statement}
                    </p>
                    <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/60 md:text-base">
                      {project.description}
                    </p>
                    <div className="mt-7 flex flex-wrap gap-2">
                      {project.capabilities.map((capability) => (
                        <span
                          key={capability}
                          className="border border-white/15 px-3 py-1.5 text-xs font-medium text-white/75"
                        >
                          {capability}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      Explore live product <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
