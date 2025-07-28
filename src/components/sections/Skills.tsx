'use client';

import { motion, useInView, Variants } from 'framer-motion';
import {
  Server,
  Monitor,
  Smartphone,
  Users,
  Shield,
  CheckCircle,
  Star,
  TrendingUp,
  Award,
  Bot,
} from 'lucide-react';
import { useRef, useState } from 'react';

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

  const skillCategories: SkillCategory[] = [
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
        {
          name: 'High Availability',
          level: 'Expert',
          description: 'Resilient system design',
        },
        {
          name: 'Open Source',
          level: 'Advanced',
          description: 'Contributing to community projects',
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
          name: 'Ember.js',
          level: 'Expert',
          description: 'Ambitious web applications',
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
          name: 'Mobile Websites',
          level: 'Advanced',
          description: 'Responsive web design',
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
      title: 'AI Automations',
      icon: Bot,
      description:
        'Building intelligent automation systems and AI-powered solutions',
      color: 'from-cyan-500/20 to-indigo-500/20',
      iconColor: 'text-cyan-400',
      skills: [
        {
          name: 'n8n Workflows',
          level: 'Expert',
          description: 'Complex automation workflows & integrations',
        },
        {
          name: 'AI Agents',
          level: 'Advanced',
          description: 'Intelligent autonomous systems',
        },
        {
          name: 'MCP Servers',
          level: 'Advanced',
          description: 'Model Context Protocol implementations',
        },
        {
          name: 'Voice Assistants',
          level: 'Advanced',
          description: 'Conversational AI interfaces',
        },
        {
          name: 'Process Automation',
          level: 'Expert',
          description: 'Business workflow optimization',
        },
        {
          name: 'API Orchestration',
          level: 'Expert',
          description: 'Complex service integrations',
        },
      ],
    },
    {
      title: 'Leadership & Architecture',
      icon: Users,
      description: 'Leading teams and designing scalable systems',
      color: 'from-purple-500/20 to-pink-500/20',
      iconColor: 'text-purple-400',
      skills: [
        {
          name: 'Engineering Leadership',
          level: 'Expert',
          description: 'Managing high-performance teams',
        },
        {
          name: 'Cloud Architecture',
          level: 'Expert',
          description: 'AWS & resilient frameworks',
        },
        {
          name: 'High Availability',
          level: 'Expert',
          description: 'System reliability & uptime',
        },
        {
          name: 'Agile/Scrum',
          level: 'Expert',
          description: 'Iterative development methodologies',
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

  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Expert':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/40';
      case 'Advanced':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20 hover:border-blue-500/40';
      case 'Intermediate':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20 hover:border-amber-500/40';
      default:
        return 'bg-muted/10 text-muted-foreground border-border/20';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'Expert':
        return Star;
      case 'Advanced':
        return TrendingUp;
      case 'Intermediate':
        return Award;
      default:
        return CheckCircle;
    }
  };

  const getLevelDescription = (level: string) => {
    switch (level) {
      case 'Expert':
        return 'Deep expertise with extensive production experience';
      case 'Advanced':
        return 'Strong proficiency with solid practical knowledge';
      case 'Intermediate':
        return 'Good understanding with growing experience';
      default:
        return 'Familiar with the technology';
    }
  };

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
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Comprehensive full-stack development capabilities with expertise
              spanning backend systems, frontend frameworks, mobile platforms,
              and enterprise architecture.
            </p>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
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
                  className="h-full group bg-card/80 backdrop-blur-sm border border-border/50 rounded-lg p-6 transition-all duration-300 hover:shadow-xl hover:border-primary/30 hover:bg-card focus-within:ring-2 focus-within:ring-primary/20"
                  tabIndex={0}
                  role="region"
                  aria-labelledby={`category-${index}`}
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      className={`p-3 rounded-2xl bg-gradient-to-r ${category.color} backdrop-blur-sm transition-all duration-300`}
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
                              className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary/40"
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
                      const LevelIcon = getLevelIcon(skill.level);
                      const skillKey = `${category.title}-${skill.name}`;
                      const isHovered = hoveredSkill === skillKey;

                      return (
                        <motion.div
                          key={skill.name}
                          variants={skillVariants}
                          custom={skillIndex}
                          className="group/skill relative p-4 rounded-xl bg-secondary/30 border border-border/30 transition-all duration-300 hover:bg-secondary/50 hover:scale-[1.02] hover:border-primary/30 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50"
                          onMouseEnter={() => setHoveredSkill(skillKey)}
                          onMouseLeave={() => setHoveredSkill(null)}
                          tabIndex={0}
                          role="button"
                          aria-label={`${skill.name} - ${skill.level} level skill`}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              setHoveredSkill(isHovered ? null : skillKey);
                            }
                          }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-foreground group-hover/skill:text-primary transition-colors duration-300">
                                {skill.name}
                              </h4>
                              <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{
                                  scale: isHovered ? 1 : 0,
                                  opacity: isHovered ? 1 : 0,
                                }}
                                transition={{ duration: 0.2 }}
                                className="flex items-center"
                              >
                                <LevelIcon className="w-4 h-4 text-primary" />
                              </motion.div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-300 flex items-center gap-1 ${getLevelColor(
                                  skill.level
                                )}`}
                              >
                                <LevelIcon className="w-3 h-3" />
                                {skill.level}
                              </span>
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                            {skill.description}
                          </p>

                          {/* Enhanced context on hover */}
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{
                              height: isHovered ? 'auto' : 0,
                              opacity: isHovered ? 1 : 0,
                            }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="pt-2 mt-2 border-t border-border/30">
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <LevelIcon className="w-3 h-3" />
                                <span className="font-medium">
                                  {getLevelDescription(skill.level)}
                                </span>
                              </div>
                            </div>
                          </motion.div>

                          {/* Animated skill reveal indicator */}
                          <motion.div
                            className="absolute inset-0 rounded-xl border-2 border-primary/20 pointer-events-none"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{
                              scale: isHovered ? 1 : 0.8,
                              opacity: isHovered ? 1 : 0,
                            }}
                            transition={{ duration: 0.2 }}
                          />
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
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">
                15+ years of full-stack development experience
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
