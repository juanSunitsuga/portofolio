'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import projects from '../../projects.json';
import TechBadge from '../../components/TechBadge';

export default function ProjectDetail() {
  const params = useParams();
  const projectId = parseInt(params.id as string);
  const project = projects.find((p) => p.id === projectId);
  const revealVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  if (!project) {
    return (
      <div className="flex min-h-screen bg-black font-sans pt-20 items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Project not found</h1>
          <Link href="/projects" className="text-emerald-400 hover:text-emerald-300">
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-black font-sans pt-20">
      <main className="w-full max-w-5xl mx-auto py-12 px-8 sm:px-16">
        <Link href="/projects" className="text-zinc-400 hover:text-white transition-colors mb-8 inline-block">
          ← Back to Projects
        </Link>

        {/* Hero Section with Image */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={revealVariants}
          viewport={{ once: true, amount: 0.3 }}
          className="relative w-full h-96 rounded-lg overflow-hidden mb-12 border border-zinc-800"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        </motion.div>

        {/* Project Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={revealVariants}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">{project.title}</h1>
              <p className="text-lg text-emerald-400">{project.role}</p>
            </div>
            <span className="text-zinc-400">{project.year}</span>
          </div>

          <div className="flex gap-6 text-zinc-400 mb-6 flex-wrap">
            <div className="flex items-center gap-2">
              <span>👥</span>
              <span>{project.type}</span>
            </div>
          </div>

          <div className="flex gap-4 flex-wrap">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-zinc-700 rounded-full text-white hover:bg-zinc-900 transition-colors flex items-center gap-2"
            >
              📚 Repository
            </a>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={revealVariants}
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12"
        >
          <div className="lg:col-span-2">
            {/* Short Explanation */}
            <motion.section className="mb-12" id="short-explanation" variants={revealVariants}>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-1 h-8 bg-emerald-500 rounded"></span>
                Short Explanation
              </h2>
              <p className="text-zinc-300 leading-relaxed mb-4">{project.description}</p>
            </motion.section>

            {/* Project Goals */}
            <motion.section className="mb-12" id="project-goals" variants={revealVariants}>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-1 h-8 bg-emerald-500 rounded"></span>
                Project Goals
              </h2>
              <p className="text-zinc-300 leading-relaxed">
                The main objective was to create a comprehensive solution that addresses real-world problems while
                demonstrating strong technical skills and best practices in software development. This project focuses
                on delivering value through clean architecture, efficient algorithms, and user-centric design.
              </p>
            </motion.section>

            {/* Key Contributions */}
            <motion.section className="mb-12" id="key-contributions" variants={revealVariants}>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-1 h-8 bg-emerald-500 rounded"></span>
                Key Contributions
              </h2>
              <ul className="space-y-3">
                {project.contributions.map((contribution, idx) => (
                  <li key={idx} className="flex gap-3 text-zinc-300">
                    <span className="text-emerald-500 flex-shrink-0">✓</span>
                    <span>{contribution}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Problems and Solutions */}
            <motion.section className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-lg mb-12" id="problems" variants={revealVariants}>
              <h3 className="text-xl font-bold text-white mb-3">The Problems and How I Dealt With It</h3>
              <p className="text-zinc-300 leading-relaxed">{project.problems}</p>
              <div className="mt-4 p-4 bg-zinc-800/50 rounded border border-zinc-700">
                <p className="text-zinc-300"><strong>Challenge:</strong> {project.challenge}</p>
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-6">
            {/* Spotlight */}
            <motion.div className="p-6 border border-zinc-800 rounded-lg bg-zinc-900/50" variants={revealVariants}>
              <h3 className="text-lg font-bold text-white mb-4">Spotlight</h3>
              <div className="space-y-2">
                <p className="text-zinc-300 text-sm mb-4">{project.spotlight}</p>
                <div className="space-y-2">
                  <a href="#short-explanation" className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-2 transition-colors">
                    → Short Explanation
                  </a>
                  <a href="#project-goals" className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-2 transition-colors">
                    → Project Goals
                  </a>
                  <a href="#key-contributions" className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-2 transition-colors">
                    → Key Contributions
                  </a>
                  <a href="#problems" className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-2 transition-colors">
                    → The Problems and How I Dealt With It
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Tech Stack */}
            <motion.div className="p-6 border border-zinc-800 rounded-lg" variants={revealVariants}>
              <h3 className="text-lg font-bold text-white mb-4">Tech Stack Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, idx) => (
                  <TechBadge key={`${project.id}-${tech}-${idx}`} tech={tech} className="bg-zinc-900/90" />
                ))}
              </div>
            </motion.div>

            {/* Features */}
            <motion.div className="p-6 border border-zinc-800 rounded-lg" variants={revealVariants}>
              <h4 className="text-lg font-bold text-white mb-4">Features</h4>
              <ul className="space-y-2">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="text-sm text-zinc-300 flex items-center gap-2">
                    <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          </aside>
        </motion.div>

        {/* Try It Out Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={revealVariants}
          viewport={{ once: true, amount: 0.25 }}
          className="p-8 border border-zinc-800 rounded-lg bg-gradient-to-br from-zinc-900/50 to-zinc-950/50"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Try it out!</h2>
          <p className="text-zinc-300 mb-6">
            Check out the project on GitHub to see the complete source code, documentation, and contribution guidelines.
          </p>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium"
          >
            View on GitHub →
          </a>
        </motion.div>
      </main>
    </div>
  );
}
