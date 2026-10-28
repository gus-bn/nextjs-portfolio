'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  Database,
  FileText,
  Globe,
  MessagesSquare,
  Mic,
  MonitorCheck,
  Plug,
  Rocket,
  ShieldCheck,
  SquareTerminal,
  Target,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { useRef } from 'react';

type Capability = {
  icon: LucideIcon;
  title: string;
  body: string;
  proof: string;
};

const IN_PRODUCT: Capability[] = [
  {
    icon: Globe,
    title: 'Browser agents',
    body: 'Headless agents that drive a real browser over MCP to read sites no API exposes.',
    proof: 'Meryto job harvesting',
  },
  {
    icon: MessagesSquare,
    title: 'Conversational agents',
    body: 'Tool-calling agents that qualify leads, answer support and book meetings, then hand off to a person.',
    proof: 'ChatO, Utoppia',
  },
  {
    icon: Database,
    title: 'Retrieval and memory',
    body: 'Embedding pipelines, vector search and context assembly grounded in the customer’s own data.',
    proof: 'Utoppia, Meryto',
  },
  {
    icon: Mic,
    title: 'Voice agents',
    body: 'Real-time spoken conversations seeded with the job, the CV and the application.',
    proof: 'Meryto interview coach',
  },
  {
    icon: Plug,
    title: 'MCP servers',
    body: 'Internal systems exposed as typed tools so models can act on them safely.',
    proof: 'Model Context Protocol',
  },
];

const IN_WORKFLOW: Capability[] = [
  {
    icon: SquareTerminal,
    title: 'Claude Code and Codex',
    body: 'Parallel coding agents across API, web, admin and mobile repositories, each with its own instructions.',
    proof: 'ChecaTurno, five repos',
  },
  {
    icon: Boxes,
    title: 'Skills and subagents',
    body: 'Repository skills that run CI locally, deploy each service and clean up branches on command.',
    proof: 'ChecaTurno deploys',
  },
  {
    icon: MonitorCheck,
    title: 'Browser QA passes',
    body: 'Agents test real flows in Chrome against staging and write findings back into the spec.',
    proof: 'Interlinked BSS',
  },
  {
    icon: FileText,
    title: 'Specs as source of truth',
    body: 'Living functional specs and migration plans that agents read before they write a line.',
    proof: 'Ember to React migration',
  },
];

const LOOP: { icon: LucideIcon; label: string; detail: string }[] = [
  { icon: Target, label: 'Plan', detail: 'Spec, acceptance criteria, scope' },
  { icon: Wrench, label: 'Act', detail: 'Agents with tools, in parallel' },
  { icon: BadgeCheck, label: 'Verify', detail: 'Tests, browser QA, review' },
  { icon: Rocket, label: 'Ship', detail: 'Deploy skills, monitored' },
];

const GUARDRAILS = [
  'Concurrency slots',
  'Hard timeouts',
  'Rate-limit classification',
  'Process-tree cleanup',
  'Persisted transcripts',
  'Human handoff and sign-off',
];

const CapabilityList = ({
  label,
  icon: LabelIcon,
  items,
  isInView,
  offset,
}: {
  label: string;
  icon: LucideIcon;
  items: Capability[];
  isInView: boolean;
  offset: number;
}) => (
  <div className="border border-border bg-card">
    <div className="flex items-center gap-3 border-b border-border px-5 py-4">
      <LabelIcon size={18} className="text-accent" />
      <h3 className="font-mono text-sm font-semibold uppercase tracking-[0.16em]">
        {label}
      </h3>
    </div>
    <ul>
      {items.map(({ icon: Icon, title, body, proof }, i) => (
        <motion.li
          key={title}
          initial={{ opacity: 0, x: -12 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.45, delay: offset + i * 0.07 }}
          className="group flex gap-4 border-b border-border px-5 py-5 last:border-b-0 transition-colors hover:bg-muted/40"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center border border-border bg-background text-foreground transition-colors group-hover:border-accent group-hover:text-accent">
            <Icon size={20} />
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <h4 className="font-semibold">{title}</h4>
              <span className="font-mono text-[11px] text-muted-foreground">
                {proof}
              </span>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {body}
            </p>
          </div>
        </motion.li>
      ))}
    </ul>
  </div>
);

const Agentic = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="agents" ref={ref} className="relative py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-3xl"
        >
          <div className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
            <span className="h-px w-10 bg-accent" />
            Agentic engineering
          </div>
          <h2 className="text-4xl font-semibold leading-[1] tracking-[-0.05em] md:text-6xl">
            Agents in the product.
            <br />
            <span className="text-accent">Agents in the workflow.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            I build agents that do production work for customers, and I run my
            own engineering through agents: planning from specs, coding in
            parallel, testing in a real browser and deploying with repeatable
            skills. One engineer, the output of a team, with the guardrails a
            team would demand.
          </p>
        </motion.div>

        {/* Loop */}
        <ol className="mb-10 grid grid-cols-2 border border-border md:grid-cols-4">
          {LOOP.map(({ icon: Icon, label, detail }, i) => (
            <motion.li
              key={label}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.15 + i * 0.1 }}
              className="relative flex items-start gap-3 border-border p-5 [&:not(:last-child)]:border-r max-md:[&:nth-child(2)]:border-r-0 max-md:[&:nth-child(-n+2)]:border-b"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center bg-foreground text-background">
                <Icon size={18} />
              </span>
              <div>
                <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
                  {String(i + 1).padStart(2, '0')}
                  {i < LOOP.length - 1 && <ArrowRight size={12} />}
                </div>
                <div className="font-semibold">{label}</div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {detail}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>

        <div className="grid gap-6 lg:grid-cols-2">
          <CapabilityList
            label="In the product"
            icon={Rocket}
            items={IN_PRODUCT}
            isInView={isInView}
            offset={0.3}
          />
          <CapabilityList
            label="In my workflow"
            icon={SquareTerminal}
            items={IN_WORKFLOW}
            isInView={isInView}
            offset={0.4}
          />
        </div>

        {/* Guardrails */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-6 flex flex-col gap-4 border border-border bg-muted/30 p-5 md:flex-row md:items-center md:gap-8"
        >
          <div className="flex shrink-0 items-center gap-3">
            <ShieldCheck size={20} className="text-accent" />
            <span className="font-mono text-sm font-semibold uppercase tracking-[0.16em]">
              Guardrails
            </span>
          </div>
          <ul className="grid flex-1 grid-cols-1 gap-x-6 gap-y-2 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-3">
            {GUARDRAILS.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <BadgeCheck size={14} className="shrink-0 text-accent" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default Agentic;
