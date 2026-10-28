'use client';

import {
  motion,
  useInView,
  useScroll,
  useTransform,
  Variants,
} from 'framer-motion';
import {
  Briefcase,
  Building,
  Calendar,
  ChevronRight,
  Cpu,
  MapPin,
} from 'lucide-react';
import { useRef, useState } from 'react';
import { Experience as ExperienceType } from '@/types';

const Experience = () => {
  const ref = useRef(null);
  const timelineRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Scroll-based animations for timeline
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start end', 'end start'],
  });

  const timelineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const experiences: ExperienceType[] = [
    {
      id: '1',
      company: 'TheGurúCompany',
      role: 'Lead AI / Full-Stack Engineer',
      type: 'AI SaaS Platform',
      location: 'Mexico',
      period: '2020 to now',
      description:
        'Building the LLM stack and services behind three production AI products',
      achievements: [
        'Built and shipped three production AI SaaS products, Utoppia, ChatO and WeWell, from architecture through deployment',
        'Built tool-calling conversational agents with human handoff across WhatsApp, Instagram, web chat, Zendesk and Salesforce',
        'Designed an AI microservices architecture spanning messaging-channel integrations, data and reference APIs, embedding and vector search, RPA workers and a custom visual flow builder for agent workflows',
        'Implemented the LLM layer end to end: model fine-tuning, embedding pipelines, vector database integration, retrieval and prompt engineering',
        'Integrated commercial and open-source models behind a single provider-agnostic service interface',
      ],
      technologies: [
        'LLMs',
        'RAG',
        'Vector Databases',
        'Embeddings',
        'Fine-tuning',
        'Python',
        'Node.js',
        'Microservices',
        'RPA',
        'Docker',
      ],
      color: 'secondary',
    },
    {
      id: '2',
      company: 'Koonol México / Gurúcomm',
      role: 'Lead Platform Engineer',
      type: 'Telecom SaaS / MVNO',
      location: 'México',
      period: '2017 to 2020',
      description:
        'Engineered a multi-tenant telecom platform from first subscriber to 3M+ MAU',
      achievements: [
        'Engineered the platform behind Mexico\'s first MVNO on Altán\'s "Shared Network": mobile apps, CRM, provisioning and conversion landing pages, reaching 25K active subscribers',
        'Built the multi-tenant white-label version of the platform, licensed to multiple Altán Networks operators and serving 3M+ monthly active users',
        "Developed the country's first number-portability API, plus top-up network integrations for convenience-store payments",
        'Implemented prepaid and postpaid provisioning services with real-time balance and billing reconciliation',
      ],
      technologies: [
        'Ruby on Rails',
        'React',
        'PostgreSQL',
        'REST APIs',
        'Multi-tenancy',
        'Payment Systems',
        'Telecom APIs',
        'AWS',
      ],
      color: 'accent',
    },
    {
      id: '3',
      company: 'Soluciones Eucledian',
      role: 'Senior Full-Stack Developer',
      type: 'Digital Products Studio',
      location: 'Mexico',
      period: '2012 to 2017',
      description:
        'Shipped web and mobile products on high-availability architectures',
      achievements: [
        'Built web and mobile products on high-availability architectures reaching 1M+ daily users',
        'Delivered custom CRM, ERP, e-commerce and campaign/operations systems for 50+ clients',
        'Owned the full stack: REST API design, data modeling, front-end, native and hybrid mobile',
        'Set up AWS deployment and CI/CD pipelines across the studio’s project portfolio',
      ],
      technologies: [
        'PHP',
        'Ruby on Rails',
        'JavaScript',
        'MySQL',
        'REST APIs',
        'iOS / Android',
        'AWS',
        'CI/CD',
      ],
      color: 'primary',
    },
  ];

  const previousRoles = [
    {
      company: 'BNN',
      role: 'Lead Developer',
      period: '2009-2011',
      type: 'Digital Agency',
    },
    {
      company: 'Yoyo Button',
      role: 'Full Stack Developer',
      period: '2008-2009',
      type: 'Web Product (Australia)',
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.02,
      y: -8,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  const timelineDotVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
        delay: 0.2,
      },
    },
    hover: {
      scale: 1.3,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
  };

  const achievementVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  const getColorClasses = (color: 'primary' | 'secondary' | 'accent') => {
    switch (color) {
      case 'secondary':
        return {
          dot: 'bg-secondary',
          icon: 'text-secondary',
          tag: 'bg-secondary/10 text-secondary border-secondary/20',
        };
      case 'accent':
        return {
          dot: 'bg-accent',
          icon: 'text-accent',
          tag: 'bg-accent/10 text-accent border-accent/20',
        };
      default:
        return {
          dot: 'bg-primary',
          icon: 'text-primary',
          tag: 'bg-primary/10 text-primary border-primary/20',
        };
    }
  };

  return (
    <section id="experience" className="py-20" ref={ref}>
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Professional{' '}
              <span className="text-gradient-primary">Experience</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              18 years of hands-on engineering, from high-traffic web platforms
              to production agent systems
            </p>

            {/* Progress indicator */}
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-secondary-foreground via-accent-foreground to-primary-foreground rounded-full mx-auto mt-8 origin-left"
              style={{ scaleX: timelineHeight }}
            />
          </motion.div>

          {/* Timeline */}
          <div className="relative" ref={timelineRef}>
            {/* Timeline line background */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-secondary-foreground/20 via-accent-foreground/20 to-primary-foreground/20 transform md:-translate-x-1/2" />

            {/* Animated timeline line */}
            <motion.div
              className="absolute left-4 md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-secondary-foreground via-accent-foreground to-primary-foreground transform md:-translate-x-1/2 origin-top"
              style={{ height: timelineHeight }}
            />

            {/* Mobile timeline indicator */}
            <div className="md:hidden absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background/80 to-transparent pointer-events-none" />

            {/* Experience Cards */}
            <div className="space-y-12">
              {experiences.map((exp, index) => {
                const colorClasses = getColorClasses(exp.color);
                return (
                  <motion.div
                    key={exp.id}
                    variants={cardVariants}
                    whileHover="hover"
                    onHoverStart={() => setHoveredCard(exp.id)}
                    onHoverEnd={() => setHoveredCard(null)}
                    className={`relative ${
                      index % 2 === 0 ? 'md:pr-8' : 'md:pl-8 md:ml-auto'
                    } md:w-1/2 ml-10 md:ml-0`}
                  >
                    {/* Timeline dot */}
                    <motion.div
                      variants={timelineDotVariants}
                      whileHover="hover"
                      className={`absolute w-4 h-4 rounded-full left-[-1.5rem] md:left-auto ${
                        index % 2 === 0 ? 'md:right-[-2rem]' : 'md:left-[-2rem]'
                      } top-6 z-10 shadow-lg ${
                        colorClasses.dot
                      } cursor-pointer`}
                    >
                      {/* Pulse effect when hovered */}
                      {hoveredCard === exp.id && (
                        <motion.div
                          className={`absolute inset-0 rounded-full ${colorClasses.dot} opacity-30`}
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 0, 0.3],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />
                      )}
                    </motion.div>

                    {/* Card */}
                    <motion.div
                      className="bg-card p-4 sm:p-6 md:p-8 border group hover:shadow-xl transition-all duration-300 hover:border-primary/20 hover:bg-card/80"
                      whileHover={{
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                      }}
                    >
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-3 sm:gap-4">
                        <div className="flex-1">
                          <motion.h3
                            className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            {exp.role}
                          </motion.h3>
                          <div className="flex flex-wrap items-center gap-2 text-muted-foreground mb-2">
                            <div className="flex items-center gap-1">
                              <Building size={16} className="flex-shrink-0" />
                              <span className="font-semibold">
                                {exp.company}
                              </span>
                            </div>
                            <span className="text-sm opacity-70">
                              ({exp.type})
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col sm:items-end text-sm text-muted-foreground gap-1">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} className="flex-shrink-0" />
                            <span className="font-medium">{exp.period}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin size={14} className="flex-shrink-0" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Achievements */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-foreground mb-3">
                          Key Achievements:
                        </h4>
                        <motion.ul
                          className="space-y-2"
                          initial="hidden"
                          animate="visible"
                          variants={{
                            visible: {
                              transition: {
                                staggerChildren: 0.1,
                              },
                            },
                          }}
                        >
                          {exp.achievements.map((achievement, i) => (
                            <motion.li
                              key={i}
                              variants={achievementVariants}
                              className="flex items-start gap-2 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                            >
                              <motion.div
                                whileHover={{ rotate: 90 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronRight
                                  size={16}
                                  className={`mt-0.5 flex-shrink-0 ${colorClasses.icon} transition-colors duration-300`}
                                />
                              </motion.div>
                              <span className="text-sm leading-relaxed">
                                {achievement}
                              </span>
                            </motion.li>
                          ))}
                        </motion.ul>
                      </div>

                      {/* Technologies */}
                      <div>
<div className="flex items-start gap-3 border-t border-border pt-4">
                          <Cpu
                            size={16}
                            className={`mt-1 shrink-0 ${colorClasses.icon}`}
                          />
                          <p className="font-mono text-xs leading-6 text-muted-foreground">
                            {exp.technologies.join('  /  ')}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Previous Roles */}
          <motion.div
            variants={itemVariants}
            className="mt-16 pt-12 border-t border-border"
          >
            <h3 className="text-2xl font-semibold text-center mb-8">
              Previous Experience
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {previousRoles.map((role, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ scale: 1.02 }}
                  className="bg-card p-6 border text-center hover:shadow-lg transition-all duration-300 hover:border-primary/20"
                >
                  <Briefcase size={20} className="mx-auto mb-3 text-accent" />
                  <h4 className="font-semibold text-foreground mb-2">
                    {role.role}
                  </h4>
                  <p className="text-muted-foreground mb-1">{role.company}</p>
                  <p className="text-sm text-muted-foreground">
                    {role.period} • {role.type}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
