'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { experiences } from '../../experienceData';

export default function ExperienceDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const experience = experiences.find((item) => item.id === id);
  const lenis = useLenis();

  // Scroll to top smoothly on mount
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2, easing: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t });
    } else {
      window.scrollTo(0, 0);
    }
  }, [id, lenis]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7 },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  if (!experience) {
    return (
      <div className="flex min-h-screen bg-black font-sans pt-20 items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Experience not found</h1>
          <Link href="/#experience" className="text-emerald-400 hover:text-emerald-300">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-black font-sans pt-20">
      <motion.main 
        className="w-full max-w-5xl mx-auto py-12 px-8 sm:px-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <Link href="/#experience" className="text-zinc-400 hover:text-white transition-colors mb-8 inline-block">
            ← Back to Home
          </Link>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="mb-12 border border-zinc-800 rounded-2xl bg-zinc-900/40 p-8"
        >
          <div className="flex justify-between items-start mb-4 gap-6">
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">{experience.org}</h1>
              <p className="text-lg text-emerald-400">{experience.role}</p>
              <p className="text-zinc-400 mt-1">{experience.location}</p>
            </div>
            <span className="text-zinc-400 whitespace-nowrap">{experience.period}</span>
          </div>

          <motion.div 
            className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl"
            whileHover={{ borderColor: 'rgba(16, 185, 129, 0.3)' }}
          >
            <h2 className="text-xl font-semibold text-white mb-2">{experience.storyTitle}</h2>
            <p className="text-zinc-300 leading-relaxed">{experience.summary}</p>
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="lg:col-span-2">
            <motion.section 
              className="mb-12" 
              id="story"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.06,
                  }
                }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-2xl font-bold text-white mb-4 flex items-center gap-3"
                variants={itemVariants}
              >
                <motion.span 
                  className="w-1 h-8 bg-emerald-500 rounded"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  style={{ originY: 0 }}
                ></motion.span>
                Full Story
              </motion.h2>
              <div className="space-y-4">
                {experience.story.map((paragraph, idx) => (
                  <motion.p 
                    key={paragraph}
                    className="text-zinc-300 leading-relaxed"
                    custom={idx}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: (i: number) => ({
                        opacity: 1,
                        x: 0,
                        transition: { delay: i * 0.06, duration: 0.5 }
                      })
                    }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </motion.section>

            <motion.section 
              className="mb-12" 
              id="highlights"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.08,
                  }
                }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-2xl font-bold text-white mb-4 flex items-center gap-3"
                variants={itemVariants}
              >
                <motion.span 
                  className="w-1 h-8 bg-emerald-500 rounded"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  style={{ originY: 0 }}
                ></motion.span>
                Highlights
              </motion.h2>
              <ul className="space-y-3">
                {experience.points.map((point, idx) => (
                  <motion.li 
                    key={point} 
                    className="flex gap-3 text-zinc-300"
                    custom={idx}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: (i: number) => ({
                        opacity: 1,
                        x: 0,
                        transition: { delay: i * 0.06, duration: 0.5 }
                      })
                    }}
                  >
                    <motion.span 
                      className="text-emerald-500 flex-shrink-0"
                      whileHover={{ scale: 1.2 }}
                    >
                      ✓
                    </motion.span>
                    <span>{point}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.section>
          </div>

          <motion.aside 
            className="flex flex-col gap-6"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.12,
                }
              }
            }}
          >
            <motion.div 
              className="p-6 border border-zinc-800 rounded-2xl bg-zinc-900/50"
              variants={itemVariants}
              whileHover={{ borderColor: 'rgba(16, 185, 129, 0.3)' }}
            >
              <h3 className="text-lg font-bold text-white mb-4">Quick Navigation</h3>
              <div className="space-y-2">
                <motion.a 
                  href="#story" 
                  className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-2 transition-colors"
                  whileHover={{ x: 4 }}
                >
                  → Full Story
                </motion.a>
                <motion.a 
                  href="#highlights" 
                  className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-2 transition-colors"
                  whileHover={{ x: 4 }}
                >
                  → Highlights
                </motion.a>
              </div>
            </motion.div>

            <motion.div 
              className="p-6 border border-zinc-800 rounded-2xl"
              variants={itemVariants}
              whileHover={{ borderColor: 'rgba(16, 185, 129, 0.3)' }}
            >
              <h3 className="text-lg font-bold text-white mb-4">Role Snapshot</h3>
              <p className="text-zinc-300 text-sm mb-2"><strong>Organization:</strong> {experience.org}</p>
              <p className="text-zinc-300 text-sm mb-2"><strong>Position:</strong> {experience.role}</p>
              <p className="text-zinc-300 text-sm mb-2"><strong>Location:</strong> {experience.location}</p>
              <p className="text-zinc-300 text-sm"><strong>Period:</strong> {experience.period}</p>
            </motion.div>
          </motion.aside>
        </motion.div>

        <motion.div 
          className="p-8 border border-zinc-800 rounded-2xl bg-gradient-to-br from-zinc-900/50 to-zinc-950/50"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ borderColor: 'rgba(16, 185, 129, 0.3)' }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">Explore More</h2>
          <p className="text-zinc-300 mb-6">
            Continue reading other experience stories or jump back to projects.
          </p>
          <div className="flex flex-wrap gap-3">
            <motion.div
              whileHover={{ scale: 1.05, x: 4 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/#experience"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium"
              >
                Back to Home →
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-700 hover:bg-zinc-900 text-white rounded-lg transition-colors font-medium"
              >
                View Projects
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.main>
    </div>
  );
}
