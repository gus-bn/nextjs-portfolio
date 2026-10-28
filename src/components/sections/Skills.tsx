'use client';

import { motion, useInView, Variants } from 'framer-motion';
import {
  Server,
  Monitor,
  Smartphone,
  Network,
  Shield,
  CheckCircle,
  Bot,
} from 'lucide-react';
import { useRef } from 'react';
import LogoLoop from '@/components/ui/LogoLoop';
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiNodedotjs,
  SiAmazonwebservices,
  SiSwift,
  SiKotlin,
  SiRuby,
  SiTailwindcss,
  SiEmberdotjs,
  SiDocker
} from 'react-icons/si';

interface Skill {
  name: string;
  level: 'Expert' | 'Advanced' | 'Intermediate';
  description: string;
}

interface SkillCategory {
  title: string;
  icon: typeof Server;
  description: string;
  color: string;
  iconColor: string;
  skills: Skill[];
}

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Popular tech logos for LogoLoop
  const techLogos = [
    { node: <SiReact className="w-full h-full text-[#61DAFB]" />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs className="w-full h-full text-foreground" />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTypescript className="w-full h-full text-[#3178C6]" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiNodedotjs className="w-full h-full text-[#339933]" />, title: "Node.js", href: "https://nodejs.org" },
    { node: <SiRuby className="w-full h-full text-[#CC342D]" />, title: "Ruby", href: "https://ruby-lang.org" },
    { node: <SiAmazonwebservices className="w-full h-full text-[#FF9900]" />, title: "AWS", href: "https://aws.amazon.com" },
    { node: <SiSwift className="w-full h-full text-[#FA7343]" />, title: "Swift", href: "https://swift.org" },
    { node: <SiKotlin className="w-full h-full text-[#7F52FF]" />, title: "Kotlin", href: "https://kotlinlang.org" },
    { node: <SiEmberdotjs className="w-full h-full text-[#E04E39]" />, title: "Ember.js", href: "https://emberjs.com" },
    { node: <SiTailwindcss className="w-full h-full text-[#06B6D4]" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
    { node: <SiDocker className="w-full h-full text-[#2496ED]" />, title: "Docker", href: "https://docker.com" },
  ];

  const skillCategories: SkillCategory[] = [
    {
      title: 'AI & Agentic Engineering',
      icon: Bot,
      description: 'Agents that do production work, and the workflow that ships them',
      color: 'from-cyan-500/20 to-indigo-500/20',
      iconColor: 'text-cyan-400',
      skills: [
        {
          name: 'RAG Pipelines',
          level: 'Expert',
          description: 'Chunking, retrieval & context assembly',
        },
        {
          name: 'Agent Orchestration',
          level: 'Expert',
          description: 'Tool-using agents with queues, slots and timeouts',
        },
        {
          name: 'Browser Agents',
          level: 'Expert',
          description: 'Headless agents driving Chrome over MCP',
        },
        {
          name: 'Claude Code & Codex',
          level: 'Expert',
          description: 'Agent-driven development, skills and subagents',
        },
      ],
    },
    {
      title: 'Backend Development',
      icon: Server,
      description: 'Building robust, scalable server-side solutions',
      color: 'from-blue-500/20 to-purple-500/20',
      iconColor: 'text-blue-400',
      skills: [
        {
          name: 'Ruby on Rails',
          level: 'Expert',
          description: 'Full-stack web development framework',
        },
        {
          name: 'Node.js',
          level: 'Expert',
          description: 'JavaScript runtime for scalable applications',
        },
        {
          name: 'Microservices',
          level: 'Advanced',
          description: 'Distributed system architecture',
        },
        {
          name: 'AWS',
          level: 'Advanced',
          description: 'Cloud infrastructure & services',
        },
      ],
    },
    {
      title: 'Frontend Development',
      icon: Monitor,
      description: 'Creating engaging user experiences across platforms',
      color: 'from-green-500/20 to-teal-500/20',
      iconColor: 'text-green-400',
      skills: [
        {
          name: 'React.js',
          level: 'Expert',
          description: 'Modern component-based development',
        },
        {
          name: 'Next.js',
          level: 'Expert',
          description: 'Full-stack React framework',
        },
        {
          name: 'Admin Dashboards',
          level: 'Expert',
          description: 'Complex data visualization',
        },
        {
          name: 'CRM Systems',
          level: 'Advanced',
          description: 'Customer relationship platforms',
        },
      ],
    },
    {
      title: 'Mobile Development',
      icon: Smartphone,
      description: 'Native and cross-platform mobile solutions',
      color: 'from-orange-500/20 to-red-500/20',
      iconColor: 'text-orange-400',
      skills: [
        {
          name: 'iOS (Swift)',
          level: 'Expert',
          description: 'Native iOS app development',
        },
        {
          name: 'iOS (Objective-C)',
          level: 'Advanced',
          description: 'Legacy iOS applications',
        },
        {
          name: 'Android (Kotlin)',
          level: 'Advanced',
          description: 'Modern Android development',
        },
        {
          name: 'React Native',
          level: 'Advanced',
          description: 'Cross-platform mobile apps',
        },
      ],
    },
    {
      title: 'Architecture & Platform',
      icon: Network,
      description: 'Designing systems that stay up under load',
      color: 'from-purple-500/20 to-pink-500/20',
      iconColor: 'text-purple-400',
      skills: [
        {
          name: 'Distributed Systems Design',
          level: 'Expert',
          description: 'Service boundaries, queues & data flow',
        },
        {
          name: 'Cloud Architecture',
          level: 'Expert',
          description: 'AWS & GCP resilient frameworks',
        },
        {
          name: 'High Availability',
          level: 'Expert',
          description: 'System reliability & uptime',
        },
        {
          name: 'CI/CD & DevOps',
          level: 'Advanced',
          description: 'Docker, pipelines & automated deploys',
        },
      ],
    },
    {
      title: 'Security & Compliance',
      icon: Shield,
      description: 'Ensuring robust security and regulatory compliance',
      color: 'from-red-500/20 to-rose-500/20',
      iconColor: 'text-red-400',
      skills: [
        {
          name: 'ISO 27001',
          level: 'Advanced',
          description: 'Information security management',
        },
        {
          name: 'SOC 2 Compliance',
          level: 'Advanced',
          description: 'Security & availability controls',
        },
        {
          name: 'Penetration Testing',
          level: 'Intermediate',
          description: 'Security vulnerability assessment',
        },
        {
          name: 'Information Security',
          level: 'Advanced',
          description: 'Data protection & privacy',
        },
      ],
    },
  ];

  const getLevelBars = (level: Skill['level']) =>
    level === 'Expert' ? 3 : level === 'Advanced' ? 2 : 1;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const skillVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -20,
      scale: 0.9,
    },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
        delay: index * 0.1,
      },
    }),
  };

  return (
    <section
      id="skills"
      className="py-20 bg-gradient-to-b from-background to-secondary/30"
      ref={ref}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div variants={cardVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Technical <span className="text-gradient-primary">Expertise</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12">
              The stack I actually build with: agent and retrieval systems on
              top of backend services, front-end applications, native mobile
              and the cloud infrastructure underneath.
            </p>

            {/* Tech Logo Loop */}
            <motion.div 
              variants={cardVariants}
              className="relative overflow-hidden bg-gradient-to-r from-muted/10 via-muted/5 to-muted/10 p-8 backdrop-blur-sm border border-border/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
              <div className="relative">
                <LogoLoop
                  logos={techLogos}
                  speed={80}
                  direction="left"
                  logoHeight={48}
                  gap={60}
                  pauseOnHover
                  scaleOnHover
                  fadeOut
                  fadeOutColor="var(--background)"
                  ariaLabel="Technologies and tools I work with"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 auto-rows-fr gap-8"
          >
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, ease: 'easeOut' },
                }}
              >
                <div
                  className="h-full group bg-card/80 backdrop-blur-sm border border-border/50 p-6 transition-all duration-300 hover:shadow-xl hover:border-primary/30 hover:bg-card focus-within:ring-2 focus-within:ring-primary/20"
                  tabIndex={0}
                  role="region"
                  aria-labelledby={`category-${index}`}
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      className={`p-3 bg-gradient-to-r ${category.color} backdrop-blur-sm transition-all duration-300`}
                      whileHover={{
                        scale: 1.1,
                        rotate: 5,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <category.icon
                        className={`w-8 h-8 ${category.iconColor} transition-all duration-300`}
                      />
                    </motion.div>
                    <div>
                      <h3
                        id={`category-${index}`}
                        className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300"
                      >
                        {category.title}
                      </h3>
                      <div className="flex items-center gap-1 mt-1">
                        {Array.from({ length: category.skills.length }).map(
                          (_, i) => (
                            <motion.div
                              key={i}
                              className="w-1.5 h-1.5 bg-primary/20 group-hover:bg-primary/40"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: i * 0.1, duration: 0.2 }}
                            />
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-6 group-hover:text-foreground/80 transition-colors duration-300">
                    {category.description}
                  </p>

                  {/* Skills List */}
                  <motion.div
                    variants={containerVariants}
                    className="space-y-3"
                  >
                    {category.skills.map((skill, skillIndex) => {
                      return (
                        <motion.div
                          key={skill.name}
                          variants={skillVariants}
                          custom={skillIndex}
                          className="group/skill relative p-4 bg-card/60 backdrop-blur-sm border border-border/40 transition-all duration-300 hover:bg-card/80 hover:border-primary/30"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-foreground group-hover/skill:text-primary transition-colors duration-300">
                                {skill.name}
                              </h4>
                            </div>
                            <div className="flex items-center gap-2">
<span
                                className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground"
                                aria-label={`${skill.level} level`}
                              >
                                <span className="flex gap-0.5" aria-hidden="true">
                                  {[0, 1, 2].map((bar) => (
                                    <span
                                      key={bar}
                                      className={`h-3 w-1.5 ${
                                        bar < getLevelBars(skill.level)
                                          ? 'bg-accent'
                                          : 'bg-border'
                                      }`}
                                    />
                                  ))}
                                </span>
                                {skill.level}</span>
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {skill.description}
                          </p>

                        </motion.div>
                      );
                    })}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Experience Summary */}
          <motion.div variants={cardVariants} className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 border-y border-border px-6 py-3">
              <CheckCircle className="w-5 h-5 text-accent" />
              <span className="text-foreground font-medium">
                18+ years of full-stack development experience
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
