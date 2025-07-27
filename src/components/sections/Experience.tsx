'use client';

import {
  motion,
  useInView,
  useScroll,
  useTransform,
  Variants,
} from 'framer-motion';
import { Calendar, MapPin, Building, ChevronRight } from 'lucide-react';
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
      role: 'CTO, Co-Founder',
      type: 'AI Tech Startup',
      location: 'Mexico',
      period: '2020 – Present',
      description:
        'Leading AI transformation through innovative SaaS solutions',
      achievements: [
        'Launched three AI SaaS products: Utoppia, ChatO, and WeWell',
        'Developed comprehensive AI microservices architecture with embeddings, RPA, and custom flow builders',
        'Implemented specialized AI services: model fine-tuning, vector databases, and prompt engineering',
        'Integrated commercial and open-source LLMs for enterprise solutions',
      ],
      technologies: [
        'AI/ML',
        'Microservices',
        'Vector Databases',
        'LLMs',
        'RPA',
        'Node.js',
        'Python',
      ],
      color: 'secondary',
    },
    {
      id: '2',
      company: 'Koonol México / Gurúcomm',
      role: 'CTO, Co-Founder',
      type: 'Tech Startup/MVNO',
      location: 'México',
      period: '2017 – 2020',
      description:
        "Pioneered Mexico's first MVNO and telecommunications innovation",
      achievements: [
        'Launched Mexico\'s first MVNO on Altán\'s "Shared Network" with 25K active customers',
        'Created white-labeled SaaS solutions serving 3M+ monthly active users',
        "Developed country's first portability API and multiple top-up networks",
        'Integrated prepaid and postpaid mobile services with innovative payment solutions',
      ],
      technologies: [
        'Telecom APIs',
        'Mobile Apps',
        'CRM',
        'Payment Systems',
        'Ruby on Rails',
        'React',
      ],
      color: 'accent',
    },
    {
      id: '3',
      company: 'Soluciones Eucledian',
      role: 'CTO, Co-Founder',
      type: 'Digital Agency',
      location: 'Mexico',
      period: '2012 – 2017',
      description:
        'Founded digital agency merging innovation, creativity, and technology',
      achievements: [
        'Served 50+ active clients with comprehensive digital solutions',
        'Developed mobile applications reaching 1M+ daily users',
        'Created high-availability architectures for enterprise clients',
        'Designed marketing solutions for CRM, ERP, and operations management',
      ],
      technologies: [
        'Mobile Development',
        'Web Applications',
        'AWS',
        'Digital Marketing',
        'PHP',
        'iOS/Android',
      ],
      color: 'primary',
    },
  ];

  const previousRoles = [
    {
      company: 'BNN',
      role: 'CTO',
      period: '2009-2011',
      type: 'Digital Agency',
    },
    {
      company: 'Yoyo Button',
      role: 'Full Stack Developer',
      period: '2008-2009',
      type: 'Tech Startup (Australia)',
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

  const techTagVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
  };

  const getColorClasses = (color: 'primary' | 'secondary' | 'accent') => {
    switch (color) {
      case 'secondary':
        return {
          dot: 'bg-secondary-foreground',
          icon: 'text-secondary-foreground',
          tag: 'bg-secondary/10 text-secondary-foreground border-secondary/20',
        };
      case 'accent':
        return {
          dot: 'bg-accent-foreground',
          icon: 'text-accent-foreground',
          tag: 'bg-accent/10 text-accent-foreground border-accent/20',
        };
      default:
        return {
          dot: 'bg-primary-foreground',
          icon: 'text-primary-foreground',
          tag: 'bg-primary/10 text-primary-foreground border-primary/20',
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
              A journey of technological innovation, from digital agencies to
              AI-powered startups
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
                      className="bg-card p-4 sm:p-6 md:p-8 rounded-lg border group hover:shadow-xl transition-all duration-300 hover:border-primary/20 hover:bg-card/80"
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
                          animate={
                            hoveredCard === exp.id ? 'visible' : 'hidden'
                          }
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
                        <h4 className="font-semibold text-foreground mb-3">
                          Technologies & Skills:
                        </h4>
                        <motion.div
                          className="flex flex-wrap gap-2"
                          initial="hidden"
                          animate={
                            hoveredCard === exp.id ? 'visible' : 'hidden'
                          }
                          variants={{
                            visible: {
                              transition: {
                                staggerChildren: 0.05,
                              },
                            },
                          }}
                        >
                          {exp.technologies.map((tech, i) => (
                            <motion.span
                              key={i}
                              variants={techTagVariants}
                              whileHover="hover"
                              className={`px-3 py-1 text-xs font-medium rounded-full border ${colorClasses.tag} cursor-pointer transition-all duration-300 hover:shadow-md`}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </motion.div>
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
                  className="bg-card p-6 rounded-lg border text-center hover:shadow-lg transition-all duration-300 hover:border-primary/20"
                >
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
