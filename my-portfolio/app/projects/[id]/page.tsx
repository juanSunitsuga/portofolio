'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useLenis } from 'lenis/react';
import { 
  SiReact, SiTypescript, SiNodedotjs, SiPython, SiSwift, SiPostgresql, SiExpress, SiFlask, SiJavascript,
  SiVuetify, SiJest, SiMui, SiHtml5, SiCss, SiMysql, SiPostman
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa6';
import projects from '../../projects.json';
import TechBadge from '../../components/TechBadge';

export default function ProjectDetail() {
  const params = useParams();
  const projectId = parseInt(params.id as string);
  const project = projects.find((p) => p.id === projectId);
  const lenis = useLenis();

  // Tech icon mapping - each tech has a specific icon
  const techIconMap: Record<string, { icon: any; color: string }> = {
    'React': { icon: SiReact, color: '#61DAFB' },
    'TypeScript': { icon: SiTypescript, color: '#3178C6' },
    'Typescript': { icon: SiTypescript, color: '#3178C6' },
    'Node.js': { icon: SiNodedotjs, color: '#68A063' },
    'Python': { icon: SiPython, color: '#3776AB' },
    'Swift': { icon: SiSwift, color: '#FA7343' },
    'PostgreSQL': { icon: SiPostgresql, color: '#336791' },
    'AWS': { icon: FaAws, color: '#FF9900' },
    'AWS S3': { icon: FaAws, color: '#FF9900' },
    'Express': { icon: SiExpress, color: '#90C53F' },
    'Flask': { icon: SiFlask, color: '#000000' },
    'Hapi.js': { icon: SiExpress, color: '#F3A540' },
    'JavaScript': { icon: SiJavascript, color: '#F7DF1E' },
    'Vuetify': { icon: SiVuetify, color: '#1B9A6F' },
    'Jest': { icon: SiJest, color: '#15C213' },
    'Material UI': { icon: SiMui, color: '#007FFF' },
    'Scikit-learn': { icon: SiPython, color: '#F7931E' },
    'Java': { icon: SiJavascript, color: '#007396' },
    'HTML': { icon: SiHtml5, color: '#E34C26' },
    'CSS': { icon: SiCss, color: '#563D7C' },
    'ESLint': { icon: SiJavascript, color: '#4B32C3' },
    'Swing': { icon: SiJavascript, color: '#007396' },
    'JDBC': { icon: SiJavascript, color: '#007396' },
    'OOP': { icon: SiJavascript, color: '#007396' },
    'MySQL': { icon: SiMysql, color: '#00758F' },
    'Postman': { icon: SiPostman, color: '#FF6C37' },
    'BeautifulSoup': { icon: SiPython, color: '#3776AB' },
    'Pandas': { icon: SiPython, color: '#150458' },
    'NumPy': { icon: SiPython, color: '#013243' },
    'JWT': { icon: SiJavascript, color: '#000000' },
  };

  const getTechIcon = (tech: string) => {
    if (techIconMap[tech]) {
      return techIconMap[tech];
    }
    // If tech not found, console warn and return a consistent fallback
    console.warn(`Icon not found for tech: ${tech}, using default`);
    return { icon: SiJavascript, color: '#666' };
  };

  // Scroll to top smoothly on mount
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2, easing: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t });
    } else {
      window.scrollTo(0, 0);
    }
  }, [projectId, lenis]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
        duration: 0.5
      }
    }
  };

  const revealVariants = {
    hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7 },
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
      <motion.main 
        className="w-full max-w-5xl mx-auto py-12 px-8 sm:px-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={revealVariants}>
          <Link href="/projects" className="text-zinc-400 hover:text-white transition-colors mb-8 inline-block">
            ← Back to Projects
          </Link>
        </motion.div>

        {/* Hero Section with Image */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={revealVariants}
          viewport={{ once: true, amount: 0.3 }}
          className="relative w-full h-96 rounded-2xl overflow-hidden mb-12 border border-zinc-800"
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

        {/* Interactive Draggable Tech Stack Icons - Stick to Sides */}
        {project.techStack.map((tech, index) => {
          const techData = getTechIcon(tech);
          const IconComponent = techData.icon;
          const isLeft = index < Math.ceil(project.techStack.length / 2);
          const positionIndex = isLeft ? index : index - Math.ceil(project.techStack.length / 2);
          const totalOnSide = Math.ceil(project.techStack.length / 2);
          
          // Calculate vertical position based on index
          const topPercent = 20 + (positionIndex * 15);
          
          return (
            <motion.div
              key={`${projectId}-draggable-${tech}-${index}`}
              className={`fixed z-30 cursor-grab active:cursor-grabbing ${
                isLeft ? 'left-4' : 'right-4'
              }`}
              style={{ top: `${topPercent}%` }}
              drag
              dragElastic={0.3}
              dragMomentum={true}
              dragConstraints={{
                left: isLeft ? -20 : 0,
                right: isLeft ? 0 : 20,
                top: -300,
                bottom: 300,
              }}
              whileHover={{ scale: 1.25 }}
              whileDrag={{ scale: 1.15 }}
              initial={{
                opacity: 0,
                scale: 0,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.8,
                delay: index * 0.06,
                type: 'spring',
                stiffness: 80,
                damping: 20,
              }}
            >
              {/* Tech Icon Container */}
              <motion.div
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-emerald-950/80 to-zinc-900/80 border border-emerald-500/40 shadow-lg"
                whileHover={{
                  boxShadow: `0 0 30px ${techData.color}40, 0 0 50px ${techData.color}20`,
                  borderColor: techData.color,
                }}
                title={tech}
              >
                <IconComponent size={24} style={{ color: techData.color }} />
              </motion.div>

              {/* Tooltip */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 bg-zinc-950 border border-emerald-500/30 rounded text-xs text-emerald-300 font-medium whitespace-nowrap"
                initial={{ opacity: 0, y: 5 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                style={{ pointerEvents: 'none' } as any}
              >
                {tech}
              </motion.div>
            </motion.div>
          );
        })}

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

          <motion.div 
            className="flex gap-4 flex-wrap"
            whileHover={{ scale: 1.02 }}
          >
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-zinc-700 rounded-full text-white hover:bg-zinc-900 transition-colors flex items-center gap-2"
            >
              📚 Repository
            </a>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              }
            }
          }}
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12"
        >
          <div className="lg:col-span-2">
            {/* Short Explanation */}
            <motion.section className="mb-12" id="short-explanation" variants={revealVariants}>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <motion.span 
                  className="w-1 h-8 bg-emerald-500 rounded"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  style={{ originY: 0 }}
                ></motion.span>
                Short Explanation
              </h2>
              <p className="text-zinc-300 leading-relaxed mb-4">{project.description}</p>
            </motion.section>

            {/* Project Goals */}
            <motion.section className="mb-12" id="project-goals" variants={revealVariants}>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <motion.span 
                  className="w-1 h-8 bg-emerald-500 rounded"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  style={{ originY: 0 }}
                ></motion.span>
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
                <motion.span 
                  className="w-1 h-8 bg-emerald-500 rounded"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  style={{ originY: 0 }}
                ></motion.span>
                Key Contributions
              </h2>
              <ul className="space-y-3">
                {project.contributions.map((contribution, idx) => (
                  <motion.li 
                    key={idx} 
                    className="flex gap-3 text-zinc-300"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-emerald-500 flex-shrink-0">✓</span>
                    <span>{contribution}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.section>

            {/* Problems and Solutions */}
            <motion.section 
              className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl mb-12" 
              id="problems" 
              variants={revealVariants}
            >
              <h3 className="text-xl font-bold text-white mb-3">The Problems and How I Dealt With It</h3>
              <p className="text-zinc-300 leading-relaxed">{project.problems}</p>
              <motion.div 
                className="mt-4 p-4 bg-zinc-800/50 rounded border border-zinc-700"
                whileHover={{ backgroundColor: 'rgba(36, 36, 39, 0.8)' }}
              >
                <p className="text-zinc-300"><strong>Challenge:</strong> {project.challenge}</p>
              </motion.div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-6">
            {/* Spotlight */}
            <motion.div 
              className="p-6 border border-zinc-800 rounded-2xl bg-zinc-900/50" 
              variants={revealVariants}
              whileHover={{ borderColor: 'rgba(16, 185, 129, 0.3)' }}
            >
              <h3 className="text-lg font-bold text-white mb-4">Spotlight</h3>
              <div className="space-y-2">
                <p className="text-zinc-300 text-sm mb-4">{project.spotlight}</p>
                <div className="space-y-2">
                  <motion.a 
                    href="#short-explanation" 
                    className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-2 transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    → Short Explanation
                  </motion.a>
                  <motion.a 
                    href="#project-goals" 
                    className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-2 transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    → Project Goals
                  </motion.a>
                  <motion.a 
                    href="#key-contributions" 
                    className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-2 transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    → Key Contributions
                  </motion.a>
                  <motion.a 
                    href="#problems" 
                    className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-2 transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    → The Problems and How I Dealt With It
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Tech Stack */}
            <motion.div 
              className="p-6 border border-zinc-800 rounded-2xl" 
              variants={revealVariants}
              whileHover={{ borderColor: 'rgba(16, 185, 129, 0.3)' }}
            >
              <h3 className="text-lg font-bold text-white mb-4">Tech Stack Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, idx) => (
                  <motion.div
                    key={`${project.id}-${tech}-${idx}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.04, duration: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <TechBadge tech={tech} className="bg-zinc-900/90" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Features */}
            <motion.div 
              className="p-6 border border-zinc-800 rounded-2xl" 
              variants={revealVariants}
              whileHover={{ borderColor: 'rgba(16, 185, 129, 0.3)' }}
            >
              <h4 className="text-lg font-bold text-white mb-4">Features</h4>
              <ul className="space-y-2">
                {project.features.map((feature, idx) => (
                  <motion.li 
                    key={idx} 
                    className="text-sm text-zinc-300 flex items-center gap-2"
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <motion.span 
                      className="w-1 h-1 bg-emerald-500 rounded-full flex-shrink-0"
                      whileInView={{ scale: 1.5 }}
                      transition={{ delay: idx * 0.04 + 0.2, duration: 0.3 }}
                      viewport={{ once: true }}
                    ></motion.span>
                    {feature}
                  </motion.li>
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
          className="p-8 border border-zinc-800 rounded-2xl bg-gradient-to-br from-zinc-900/50 to-zinc-950/50"
          whileHover={{ borderColor: 'rgba(16, 185, 129, 0.3)' }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">Try it out!</h2>
          <p className="text-zinc-300 mb-6">
            Check out the project on GitHub to see the complete source code, documentation, and contribution guidelines.
          </p>
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium"
            whileHover={{ scale: 1.05, x: 4 }}
            whileTap={{ scale: 0.95 }}
          >
            View on GitHub →
          </motion.a>
        </motion.div>
      </motion.main>
    </div>
  );
}
