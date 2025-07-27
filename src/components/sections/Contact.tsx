'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
  Mail,
  MapPin,
  Globe,
  Clock,
  MessageSquare,
  User,
  Building2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import type { ContactFormData } from '@/types';

// Zod validation schema
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  company: z
    .string()
    .max(100, 'Company name must be less than 100 characters')
    .optional(),
  project: z
    .string()
    .min(10, 'Project description must be at least 10 characters')
    .max(200, 'Project description must be less than 200 characters'),
  message: z
    .string()
    .min(50, 'Message must be at least 50 characters')
    .max(1000, 'Message must be less than 1000 characters'),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [honeypot, setHoneypot] = useState('');

  // Contact information data
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'gustavo@thegurucompany.com',
      description: 'Drop me a line anytime',
      href: 'mailto:gustavo@thegurucompany.com',
      external: false,
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Available Worldwide',
      description: 'Remote collaboration specialist',
      href: null,
      external: false,
    },
    {
      icon: Clock,
      title: 'Response Time',
      value: 'Within 24 hours',
      description: 'Quick and professional replies',
      href: null,
      external: false,
    },
    {
      icon: Globe,
      title: 'Website',
      value: 'thegurucompany.com',
      description: 'Learn more about my work',
      href: 'https://thegurucompany.com',
      external: true,
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
    watch,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      company: '',
      project: '',
      message: '',
    },
  });

  // Watch form values for real-time character counting
  const messageValue = watch('message');
  const projectValue = watch('project');

  const onSubmit = async (data: ContactFormValues) => {
    // Basic spam protection: honeypot check
    if (honeypot) {
      console.log('Spam detected via honeypot');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      console.log('Form submitted successfully:', result);
      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
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

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const formVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="contact" className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Let&apos;s <span className="text-gradient-primary">Connect</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Ready to transform your business with AI? Let&apos;s discuss your
              project and explore how we can work together.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <motion.div variants={containerVariants} className="space-y-6">
              <motion.h3
                variants={itemVariants}
                className="text-2xl font-bold mb-6"
              >
                Get In Touch
              </motion.h3>
              {contactInfo.map((info, index) => (
                <motion.div key={info.title} variants={itemVariants}>
                  <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 bg-card/80 backdrop-blur-sm h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-300">
                          <info.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-foreground mb-1">
                            {info.title}
                          </h4>
                          {info.href ? (
                            <a
                              href={info.href}
                              target={info.external ? '_blank' : undefined}
                              rel={
                                info.external
                                  ? 'noopener noreferrer'
                                  : undefined
                              }
                              className="text-primary font-medium mb-1 hover:underline block truncate"
                              title={info.value}
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p
                              className="text-primary font-medium mb-1 truncate"
                              title={info.value}
                            >
                              {info.value}
                            </p>
                          )}
                          <p className="text-sm text-muted-foreground">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={formVariants} className="lg:col-span-2">
              <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    Start Your Project
                  </CardTitle>
                  <CardDescription>
                    Tell me about your vision and let&apos;s make it reality.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Success Message */}
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mb-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <div>
                        <h3 className="font-semibold text-green-800 dark:text-green-200">
                          Message Sent Successfully!
                        </h3>
                        <p className="text-sm text-green-600 dark:text-green-300">
                          Thank you for reaching out. I&apos;ll get back to you
                          within 24 hours.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Error Message */}
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3"
                    >
                      <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                      <div>
                        <h3 className="font-semibold text-red-800 dark:text-red-200">
                          Submission Failed
                        </h3>
                        <p className="text-sm text-red-600 dark:text-red-300">
                          There was an error sending your message. Please try
                          again.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                    noValidate
                  >
                    <fieldset disabled={isSubmitting} className="space-y-6">
                      <legend className="sr-only">
                        Contact Information Form
                      </legend>

                      {/* Honeypot field for spam protection */}
                      <input
                        type="text"
                        name="website"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        style={{
                          position: 'absolute',
                          left: '-9999px',
                          opacity: 0,
                        }}
                        tabIndex={-1}
                        aria-hidden="true"
                        autoComplete="off"
                      />
                      <input
                        type="text"
                        name="website"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        style={{
                          position: 'absolute',
                          left: '-9999px',
                          opacity: 0,
                        }}
                        tabIndex={-1}
                        aria-hidden="true"
                        autoComplete="off"
                      />

                      {/* Name and Email Row */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <motion.div
                          variants={itemVariants}
                          className="space-y-2"
                        >
                          <Label
                            htmlFor="name"
                            className="text-foreground font-medium"
                          >
                            Full Name *
                          </Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                              id="name"
                              type="text"
                              placeholder="Your full name"
                              className={`pl-10 ${
                                errors.name
                                  ? 'border-red-500 focus-visible:ring-red-500'
                                  : ''
                              }`}
                              {...register('name')}
                              aria-invalid={errors.name ? 'true' : 'false'}
                              aria-describedby={
                                errors.name ? 'name-error' : undefined
                              }
                            />
                          </div>
                          {errors.name && (
                            <p
                              id="name-error"
                              className="text-sm text-red-500"
                              role="alert"
                            >
                              {errors.name.message}
                            </p>
                          )}
                        </motion.div>

                        <motion.div
                          variants={itemVariants}
                          className="space-y-2"
                        >
                          <Label
                            htmlFor="email"
                            className="text-foreground font-medium"
                          >
                            Email Address *
                          </Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                              id="email"
                              type="email"
                              placeholder="your.email@company.com"
                              className={`pl-10 ${
                                errors.email
                                  ? 'border-red-500 focus-visible:ring-red-500'
                                  : ''
                              }`}
                              {...register('email')}
                              aria-invalid={errors.email ? 'true' : 'false'}
                              aria-describedby={
                                errors.email ? 'email-error' : undefined
                              }
                            />
                          </div>
                          {errors.email && (
                            <p
                              id="email-error"
                              className="text-sm text-red-500"
                              role="alert"
                            >
                              {errors.email.message}
                            </p>
                          )}
                        </motion.div>
                      </div>

                      {/* Company */}
                      <motion.div variants={itemVariants} className="space-y-2">
                        <Label
                          htmlFor="company"
                          className="text-foreground font-medium"
                        >
                          Company / Organization
                        </Label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            id="company"
                            type="text"
                            placeholder="Your company name (optional)"
                            className={`pl-10 ${
                              errors.company
                                ? 'border-red-500 focus-visible:ring-red-500'
                                : ''
                            }`}
                            {...register('company')}
                            aria-invalid={errors.company ? 'true' : 'false'}
                            aria-describedby={
                              errors.company ? 'company-error' : undefined
                            }
                          />
                        </div>
                        {errors.company && (
                          <p
                            id="company-error"
                            className="text-sm text-red-500"
                            role="alert"
                          >
                            {errors.company.message}
                          </p>
                        )}
                      </motion.div>

                      {/* Project Description */}
                      <motion.div variants={itemVariants} className="space-y-2">
                        <Label
                          htmlFor="project"
                          className="text-foreground font-medium"
                        >
                          What would you like to build? *
                        </Label>
                        <Input
                          id="project"
                          type="text"
                          placeholder="e.g., Mobile app, Web platform, API integration..."
                          className={
                            errors.project
                              ? 'border-red-500 focus-visible:ring-red-500'
                              : ''
                          }
                          {...register('project')}
                          aria-invalid={errors.project ? 'true' : 'false'}
                          aria-describedby={
                            errors.project
                              ? 'project-error project-count'
                              : 'project-count'
                          }
                        />
                        <div className="flex justify-between items-center">
                          {errors.project && (
                            <p
                              id="project-error"
                              className="text-sm text-red-500"
                              role="alert"
                            >
                              {errors.project.message}
                            </p>
                          )}
                          <p
                            id="project-count"
                            className={`text-xs ml-auto ${
                              projectValue?.length > 180
                                ? 'text-red-500'
                                : projectValue?.length > 160
                                ? 'text-yellow-500'
                                : 'text-muted-foreground'
                            }`}
                          >
                            {projectValue?.length || 0}/200
                          </p>
                        </div>
                      </motion.div>

                      {/* Message */}
                      <motion.div variants={itemVariants} className="space-y-2">
                        <Label
                          htmlFor="message"
                          className="text-foreground font-medium"
                        >
                          Project Details *
                        </Label>
                        <div className="relative">
                          <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                          <Textarea
                            id="message"
                            placeholder="Tell me more about your project, timeline, budget, and any specific requirements..."
                            rows={6}
                            className={`pl-10 pt-10 resize-none ${
                              errors.message
                                ? 'border-red-500 focus-visible:ring-red-500'
                                : ''
                            }`}
                            {...register('message')}
                            aria-invalid={errors.message ? 'true' : 'false'}
                            aria-describedby={
                              errors.message
                                ? 'message-error message-count'
                                : 'message-count'
                            }
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          {errors.message && (
                            <p
                              id="message-error"
                              className="text-sm text-red-500"
                              role="alert"
                            >
                              {errors.message.message}
                            </p>
                          )}
                          <p
                            id="message-count"
                            className={`text-xs ml-auto ${
                              messageValue?.length > 900
                                ? 'text-red-500'
                                : messageValue?.length > 800
                                ? 'text-yellow-500'
                                : 'text-muted-foreground'
                            }`}
                          >
                            {messageValue?.length || 0}/1000
                          </p>
                        </div>
                      </motion.div>

                      {/* Submit Button */}
                      <motion.div variants={itemVariants} className="pt-4">
                        <Button
                          type="submit"
                          size="lg"
                          disabled={isSubmitting || !isValid || !isDirty}
                          className="w-full md:w-auto min-w-[200px] group"
                          aria-describedby={
                            isSubmitting ? 'submit-status' : undefined
                          }
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              <span id="submit-status">Sending Message...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </fieldset>
                  </form>

                  {/* Form Footer */}
                  <motion.div
                    variants={itemVariants}
                    className="mt-8 pt-6 border-t border-border"
                  >
                    <p className="text-sm text-muted-foreground text-center">
                      I typically respond within 24 hours. For urgent matters,
                      feel free to reach out via{' '}
                      <a
                        href="mailto:gustavo@thegurucompany.com"
                        className="text-primary hover:underline font-medium"
                      >
                        email
                      </a>{' '}
                      directly.
                    </p>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
