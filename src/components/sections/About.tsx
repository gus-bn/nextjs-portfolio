'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { Code, Users, Lightbulb, Award } from 'lucide-react';
import { useRef, useState } from 'react';
import Image from 'next/image';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const highlights = [
    {
      icon: Code,
      title: '18+ Years',
      description: 'In scalable application development',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      hoverBg: 'hover:bg-secondary/20',
    },
    {
      icon: Users,
      title: '40+ Engineers',
      description: 'Successfully led teams',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      hoverBg: 'hover:bg-accent/20',
    },
    {
      icon: Lightbulb,
      title: '15+ Products',
      description: 'SaaS solutions launched',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      hoverBg: 'hover:bg-primary/20',
    },
    {
      icon: Award,
      title: '3M+ Users',
      description: 'Monthly active users served',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      hoverBg: 'hover:bg-secondary/20',
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
    hidden: { opacity: 0, scale: 0.8, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
  };

  const achievementVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="about" className="py-20 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              About <span className="text-gradient-primary">Gustavo</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A passionate technology leader driving digital transformation
              through innovative AI solutions and scalable architectures.
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
            {/* Story */}
            <motion.div
              variants={itemVariants}
              className="space-y-6 text-center lg:text-left"
            >
              <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
                CTO, Founder & Tech Evangelist
              </h3>

              <div className="space-y-4 text-muted-foreground">
                <motion.p
                  className="text-lg leading-relaxed"
                  variants={itemVariants}
                >
                  With over 18 years in technology leadership, I specialize in
                  <span className="text-secondary font-semibold">
                    {' '}
                    AI transformation
                  </span>{' '}
                  and
                  <span className="text-accent font-semibold">
                    {' '}
                    enterprise architecture
                  </span>
                  . My journey spans from launching Mexico&apos;s first MVNO to
                  pioneering AI-powered SaaS solutions.
                </motion.p>

                <motion.p
                  className="text-lg leading-relaxed"
                  variants={itemVariants}
                >
                  As CTO and Co-Founder of{' '}
                  <span className="text-primary font-semibold">
                    TheGurúCompany
                  </span>
                  , I&apos;ve built comprehensive AI microservices architectures
                  that power multiple products including Utoppia, ChatO, and
                  WeWell—serving millions of users worldwide.
                </motion.p>

                <motion.p
                  className="text-lg leading-relaxed"
                  variants={itemVariants}
                >
                  I&apos;m passionate about bridging the gap between
                  cutting-edge AI technology and real-world business solutions,
                  transforming how organizations operate and scale in the
                  digital age.
                </motion.p>
              </div>

              {/* Professional Image */}
              <motion.div
                variants={itemVariants}
                className="mt-8 flex justify-center"
              >
                <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
                  {!imageError ? (
                    <>
                      <Image
                        src="/profile.webp"
                        alt="Gustavo Beauregard - Professional Photo"
                        fill
                        className={`object-cover transition-opacity duration-300 ${
                          imageLoading ? 'opacity-0' : 'opacity-100'
                        }`}
                        onLoad={() => setImageLoading(false)}
                        onError={() => {
                          setImageError(true);
                          setImageLoading(false);
                        }}
                        priority
                      />
                      {imageLoading && (
                        <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
                          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <div className="text-center">
                        <Users className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Professional Photo
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>

            {/* Highlights Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-6"
            >
              {highlights.map((highlight, index) => {
                const Icon = highlight.icon;
                return (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    whileHover="hover"
                    className={`bg-card p-6 rounded-lg border text-center group transition-all duration-300 cursor-pointer ${highlight.hoverBg} hover:shadow-xl hover:border-primary/20`}
                  >
                    <motion.div
                      className={`inline-flex p-3 rounded-full mb-4 ${highlight.color} ${highlight.bgColor} group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 5 }}
                    >
                      <Icon size={24} className="text-current" />
                    </motion.div>
                    <motion.h4
                      className={`text-2xl font-bold mb-2 ${highlight.color}`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {highlight.title}
                    </motion.h4>
                    <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                      {highlight.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Key Achievements */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-secondary/5 to-accent/5 rounded-2xl p-8 md:p-12 border border-border/50"
          >
            <motion.h3
              className="text-2xl md:text-3xl font-semibold text-center mb-8"
              variants={itemVariants}
            >
              Key Achievements
            </motion.h3>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  year: '2020',
                  description:
                    'Co-founded TheGurúCompany, launched first AI SaaS product',
                  color: 'text-secondary',
                },
                {
                  year: '2017',
                  description:
                    "Launched Mexico's first MVNO with 25K+ active customers",
                  color: 'text-accent',
                },
                {
                  year: '2013',
                  description:
                    'MIT Megacity Logistics Lab contributor, ITESM graduate',
                  color: 'text-primary',
                },
              ].map((achievement, index) => (
                <motion.div
                  key={index}
                  variants={achievementVariants}
                  className="text-center group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <motion.div
                    className={`text-3xl md:text-4xl font-bold mb-2 ${achievement.color} group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ y: -2 }}
                  >
                    {achievement.year}
                  </motion.div>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {achievement.description}
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

export default About;
