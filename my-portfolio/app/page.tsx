"use client";
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { FaArrowDown, FaEnvelope, FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { SiReact, SiTypescript, SiNodedotjs, SiPython, SiSwift, SiPostgresql } from 'react-icons/si';
import { FaAws } from 'react-icons/fa6';
import projects from './projects.json';
import TechBadge from './components/TechBadge';
import { experiences } from './experienceData';

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<number | null>(null);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const scrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    restDelta: 0.001,
  });
  
  // Create smooth parallax effect
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = isMobile ? 200 : 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.5
      }
    }
  };

  // Enhanced item variants with blur and smooth easing
  const itemVariants = {
    hidden: { y: 24, opacity: 0, filter: 'blur(6px)' },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: { 
        duration: 0.7
      }
    }
  };

  // Section reveal with smooth parallax-like effect
  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        staggerChildren: 0.08
      },
    },
  };

  // 3D flip card variants for project cards
  const flipCardVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.85,
      rotateY: 45,
      filter: 'blur(10px)'
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      filter: 'blur(0px)',
      transition: { 
        duration: 0.8
      },
    },
    hover: {
      y: -12,
      transition: { duration: 0.4 }
    }
  };

  // Enhanced card hover state with smooth transitions
  const projectCardContainerVariants = {
    initial: { 
      rotateX: 0,
      rotateY: 0,
    },
    hover: {
      y: -12,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  };

  const heroTitleVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(12px)' },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        delay: i * 0.12,
        duration: 0.9
      }
    })
  };

  // Smooth staggered list animation
  const listItemVariants = {
    hidden: { opacity: 0, x: -20, filter: 'blur(4px)' },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: {
        delay: i * 0.06,
        duration: 0.6
      }
    })
  };

  // Badge animation on hover
  const badgeVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.08,
      transition: { duration: 0.3 }
    },
    tap: {
      scale: 0.95
    }
  };

  const technicalSkills = {
    'Programming Languages': ['Python', 'Java', 'PHP', 'Typescript', 'Javascript', 'Swift', 'SwiftUI'],
    Frameworks: ['React', 'Next.js', 'Vue', 'Express', 'Hapi.js', 'Flask'],
    Databases: ['MySQL', 'PostgreSQL'],
    'Tools & Cloud': ['AWS', 'SAP', 'Figma', 'Docker', 'Git', 'Postman', 'ESLint'],
  };

  const skillDescriptions: Record<string, string> = {
    Python: 'Used for data processing, scripting, and building practical backend logic in academic and project work.',
    Java: 'Used for object-oriented software engineering, including desktop and system-focused projects.',
    PHP: 'Used for backend web development and server-side application logic in web projects.',
    Typescript: 'Improves code quality with static typing and makes larger frontend/backend codebases easier to maintain.',
    Javascript: 'Core language for building dynamic web interfaces and backend services.',
    Swift: 'Primary language for iOS app development and Apple ecosystem projects.',
    SwiftUI: 'Used to build modern, declarative iOS interfaces quickly and consistently.',
    React: 'Main library for building reusable, component-driven web interfaces.',
    'Next.js': 'Framework used for full-stack React development, routing, and performance-focused rendering.',
    Vue: 'Used for reactive frontend interfaces with a lightweight development workflow.',
    Express: 'Backend framework used to build APIs and server-side services in Node.js.',
    'Hapi.js': 'Framework used for structured backend API development with clear plugin architecture.',
    Flask: 'Python web framework used for lightweight web services and rapid prototypes.',
    MySQL: 'Relational database used for structured transactional data and SQL queries.',
    PostgreSQL: 'Relational database used for robust data modeling and reliable production-grade queries.',
    AWS: 'Cloud platform used for deployment learning, storage services, and backend infrastructure exposure.',
    SAP: 'Enterprise platform knowledge gained through certification and foundational business process training.',
    Figma: 'Primary tool for UI/UX design, prototyping, and developer-designer collaboration.',
    Docker: 'Used to containerize apps for consistent local development and deployment workflows.',
    Git: 'Version control workflow for collaboration, branching, and clean project history.',
    Postman: 'Tool for API testing, debugging request flows, and validating endpoint behavior.',
    ESLint: 'Static analysis tooling to enforce consistent code style and prevent common bugs early.',
  };

  const scrollToNext = () => {
    const target = document.getElementById('projects');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const education = [
    {
      degree: 'Bachelor of Computer Science',
      school: 'Institut Teknologi Harapan Bangsa',
      location: 'Bandung, Indonesia',
      period: 'August 2026',
      highlights: [
        'Nominated in Dean\'s List for 2 semester',
        'GPA 3.83',
      ],
    },
    {
      degree: 'Certiplus Program',
      school: 'ITHB Career Resource Center',
      location: 'Bandung, Indonesia',
      period: 'December 2023 - May 2026',
      highlights: [
        'Completed professional training in computer and communication skills',
        'Completed training in leadership, entrepreneurship, and career planning skills',
      ],
    },
  ];

  const certifications = [
    {
      title: 'AWS Academy Cloud Foundation Certification',
      provider: 'ITHB Career Resource Center',
      period: 'December 2025',
      completions: [
        'Completed the AWS Academy Cloud Foundation Certification - December 2025',
      ],
    },
    {
      title: 'SAP Certification',
      provider: 'ITHB Career Resource Center',
      period: 'December 2025 - May 2026',
      completions: [
        'Completed SAP Introduction - December 2025',
        'Completed SAP S/4HANA - May 2026',
      ],
    },
    {
      title: 'AWS Backend Academy',
      provider: 'Dicoding',
      period: 'September 2024',
      completions: [
        'Learn Back-End Basics with JavaScript - September 2024',
        'Architecting on AWS (Building Cloud Architecture on AWS) - August 2024',
        'Learn Back-End Beginners with JavaScript - June 2024',
        'Learn JavaScript Programming Basics - May 2024',
        'Cloud Practitioner Essentials (Learn AWS Cloud Basics) - May 2024',
      ],
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-black font-sans pt-20">
      <motion.div
        className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-emerald-500"
        style={{ scaleX: scrollProgress }}
      />

      {/* Roaming Tech Icons - Left & Right sides only */}
      {[
        { icon: SiReact, name: 'React', color: '#61DAFB', side: 'left', top: '20%' },
        { icon: SiTypescript, name: 'TypeScript', color: '#3178C6', side: 'left', top: '45%' },
        { icon: SiPython, name: 'Python', color: '#3776AB', side: 'left', top: '70%' },
        { icon: SiNodedotjs, name: 'Node.js', color: '#68A063', side: 'right', top: '25%' },
        { icon: SiSwift, name: 'Swift', color: '#FA7343', side: 'right', top: '50%' },
        { icon: SiPostgresql, name: 'PostgreSQL', color: '#336791', side: 'right', top: '75%' },
        { icon: FaAws, name: 'AWS', color: '#FF9900', side: 'right', top: '10%' },
      ].map((tech, index) => (
        <motion.div
          key={tech.name}
          className={`fixed z-30 cursor-grab active:cursor-grabbing ${
            tech.side === 'left' ? 'left-4' : 'right-4'
          }`}
          style={{ top: tech.top }}
          drag
          dragElastic={0.3}
          dragMomentum={true}
          dragConstraints={{
            left: tech.side === 'left' ? -20 : 0,
            right: tech.side === 'right' ? 20 : 0,
            top: -300,
            bottom: 300,
          }}
          whileHover={{ scale: 1.25 }}
          whileDrag={{ scale: 1.15 }}
          animate={{
            y: [0, -12, 0],
          }}
          transition={{
            duration: 3 + index * 0.3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Tech Icon Container */}
          <motion.div
            className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-emerald-950/80 to-zinc-900/80 border border-emerald-500/40 shadow-lg"
            whileHover={{
              boxShadow: `0 0 30px ${tech.color}40, 0 0 50px ${tech.color}20`,
              borderColor: tech.color,
            }}
          >
            <tech.icon size={24} style={{ color: tech.color }} />
          </motion.div>

          {/* Tooltip */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 bg-zinc-950 border border-emerald-500/30 rounded text-xs text-emerald-300 font-medium whitespace-nowrap"
            initial={{ opacity: 0, y: 5 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            style={{ pointerEvents: 'none' } as any}
          >
            {tech.name}
          </motion.div>
        </motion.div>
      ))}
      <main className="flex w-full max-w-5xl mx-auto flex-col py-32 px-8 sm:px-16">
        {/* Hero Section with Animation */}
        <motion.section
          id="home"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col gap-6 mb-20"
        >
          <motion.div variants={itemVariants}>
            <div className="inline-block bg-emerald-950/40 border border-emerald-900/60 rounded-full px-4 py-2 w-fit">
              <span className="flex items-center gap-2 text-sm text-emerald-400">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                Currently at Apple Developer Academy
              </span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">Agustinus Juan Kurniawan</h1>
              <p className="text-lg text-emerald-400">Full Stack Developer</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className="text-lg text-zinc-400 max-w-md leading-relaxed">
              Building scalable web applications with React, Node.js, and cloud technologies. Passionate about creating efficient, user-focused solutions
              while continuously learning new technologies.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-4 mt-4 flex-wrap">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Link href="#projects" className="inline-block px-6 py-3 border border-zinc-700 rounded-full text-white hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20">
                View My Projects
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Link href="#experience" className="inline-block px-6 py-3 bg-emerald-600 rounded-full text-white hover:bg-emerald-700 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-600/50">
                Explore My Experience
              </Link>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="flex gap-6 mt-8 text-zinc-400 flex-wrap">
              <a href="https://github.com/juanSunitsuga" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-flex items-center gap-2">
                <FaGithub className="h-4 w-4" aria-hidden="true" />
                <span>GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/agustinus-juan-kurniawan/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-flex items-center gap-2">
                <FaLinkedinIn className="h-4 w-4" aria-hidden="true" />
                <span>LinkedIn</span>
              </a>
              <a href="mailto:juankurniawan04@gmail.com" className="hover:text-white transition-colors inline-flex items-center gap-2">
                <FaEnvelope className="h-4 w-4" aria-hidden="true" />
                <span>Email</span>
              </a>
            </div>
          </motion.div>

          <motion.button
            variants={itemVariants}
            type="button"
            onClick={scrollToNext}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ y: [0, 10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2
            }}
            className="mt-8 w-fit inline-flex flex-col items-center gap-3 text-zinc-400 hover:text-white transition-colors"
            aria-label="Scroll down to projects"
          >
            <span className="text-sm font-medium">Scroll to explore</span>
            <FaArrowDown className="h-4 w-4" aria-hidden="true" />
          </motion.button>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          id="projects"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="mb-12"
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white">My Projects</h2>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => scroll('left')}
                className="p-2 border border-zinc-700 rounded-full hover:bg-zinc-900 transition-colors text-white"
                aria-label="Scroll left"
              >
                ←
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => scroll('right')}
                className="p-2 border border-zinc-700 rounded-full hover:bg-zinc-900 transition-colors text-white"
                aria-label="Scroll right"
              >
                →
              </motion.button>
            </div>
          </div>

          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 hardware-accelerated snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none' }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={flipCardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                whileHover="hover"
                transition={{ delay: index * 0.06 }}
                onMouseEnter={() => setHoveredProjectId(project.id)}
                onMouseLeave={() => setHoveredProjectId(null)}
                style={{ perspective: 1200 }}
              >
                <Link href={`/projects/${project.id}`}>
                  <motion.div
                    className="flex-shrink-0 w-96 h-full border border-zinc-800 rounded-2xl overflow-hidden group cursor-pointer bg-zinc-950/40 backdrop-blur-md transition-all duration-500 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/20"
                    animate={{
                      borderColor: hoveredProjectId === project.id ? 'rgba(16, 185, 129, 0.5)' : 'rgba(24, 24, 27, 1)',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Image Container with Smooth Zoom */}
                    <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-zinc-900 to-black">
                      <motion.div
                        animate={{
                          scale: hoveredProjectId === project.id ? 1.08 : 1,
                        }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={400}
                          height={200}
                          className="w-full h-full object-cover"
                          priority
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ 
                          opacity: hoveredProjectId === project.id ? 1 : 0 
                        }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
                      />
                    </div>

                    {/* Content */}
                    <motion.div 
                      className="p-6"
                      animate={{
                        backgroundColor: hoveredProjectId === project.id ? 'rgba(24, 24, 27, 0.8)' : 'rgba(9, 9, 11, 0.4)',
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.h3 
                        className="text-xl font-bold text-emerald-400 mb-1 group-hover:text-emerald-300 transition-colors duration-300"
                        animate={{
                          y: hoveredProjectId === project.id ? -2 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {project.title}
                      </motion.h3>
                      <p className="text-sm text-zinc-400 mb-3">{project.year}</p>
                      <p className="text-zinc-300 text-sm leading-relaxed line-clamp-2 mb-4">
                        {project.description}
                      </p>

                      {/* Tech Stack with Staggered Animation */}
                      <motion.div 
                        className="flex flex-wrap gap-2 mb-4"
                        initial="hidden"
                        animate={hoveredProjectId === project.id ? 'visible' : 'hidden'}
                        variants={{
                          visible: {
                            transition: {
                              staggerChildren: 0.04,
                              delayChildren: 0.1
                            }
                          }
                        }}
                      >
                        {project.techStack.slice(0, 3).map((tech, idx) => (
                          <motion.div
                            key={`${project.id}-${tech}-${idx}`}
                            custom={idx}
                            variants={{
                              hidden: { opacity: 0, scale: 0.8 },
                              visible: {
                                opacity: 1,
                                scale: 1,
                                transition: { type: 'spring', stiffness: 300, damping: 20 }
                              }
                            }}
                          >
                            <TechBadge tech={tech} className="bg-zinc-900/90 group-hover:bg-zinc-800 transition-colors duration-300" />
                          </motion.div>
                        ))}
                        {project.techStack.length > 3 && (
                          <motion.span 
                            className="px-2 py-1 text-xs text-zinc-400"
                            animate={{
                              opacity: hoveredProjectId === project.id ? 1 : 0.6,
                            }}
                          >
                            +{project.techStack.length - 3}
                          </motion.span>
                        )}
                      </motion.div>

                      {/* CTA Button with Smooth Animation */}
                      <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600/10 group-hover:bg-emerald-600 text-emerald-400 group-hover:text-white rounded-lg transition-all text-sm font-medium"
                        animate={{
                          x: hoveredProjectId === project.id ? 4 : 0,
                          backgroundColor: hoveredProjectId === project.id ? 'rgba(16, 185, 129, 0.8)' : 'rgba(16, 185, 129, 0.1)',
                        }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      >
                        View Details →
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          id="skills"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="mb-12"
        >
          <motion.h2 
            className="text-3xl font-bold text-white mb-8"
            variants={itemVariants}
          >
            Technical Skills
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {Object.entries(technicalSkills).map(([category, list], categoryIdx) => (
              <motion.div 
                key={category} 
                custom={categoryIdx}
                variants={listItemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.h3 
                  className="text-emerald-400 text-2xl font-semibold mb-4"
                  animate={{
                    y: selectedSkill && list.includes(selectedSkill) ? -4 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {category}
                </motion.h3>
                <div className="flex flex-wrap gap-3">
                  {list.map((skill, skillIdx) => (
                    <motion.button
                      key={`${category}-${skill}`}
                      type="button"
                      onClick={() => setSelectedSkill((prev) => (prev === skill ? null : skill))}
                      className="rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/80"
                      aria-label={`Show details for ${skill}`}
                      custom={skillIdx}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      variants={badgeVariants}
                      animate={selectedSkill === skill ? 'hover' : 'initial'}
                      transition={{
                        duration: 0.2,
                        type: 'spring',
                        stiffness: 400,
                        damping: 30
                      }}
                    >
                      <TechBadge
                        tech={skill}
                        className={`${
                          selectedSkill === skill 
                            ? 'border-emerald-500 bg-emerald-950/50 shadow-lg shadow-emerald-500/30' 
                            : 'bg-zinc-900/90 hover:border-emerald-500/40'
                        } cursor-pointer transition-all duration-300`}
                      />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Skill Details Panel with Smooth Animation */}
          <AnimatePresence mode="wait">
            {selectedSkill && (
              <motion.div
                key={selectedSkill}
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="mt-8 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 to-emerald-900/20 backdrop-blur-xl p-8"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <motion.p 
                      className="text-xs text-emerald-400 font-semibold uppercase tracking-widest mb-2"
                      animate={{ x: 0, opacity: 1 }}
                      initial={{ x: -20, opacity: 0 }}
                      transition={{ delay: 0.1, duration: 0.3 }}
                    >
                      Skill Details
                    </motion.p>
                    <motion.h4 
                      className="text-3xl font-bold text-white"
                      animate={{ x: 0, opacity: 1 }}
                      initial={{ x: -20, opacity: 0 }}
                      transition={{ delay: 0.15, duration: 0.3 }}
                    >
                      {selectedSkill}
                    </motion.h4>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.15, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={() => setSelectedSkill(null)}
                    className="text-2xl text-zinc-400 hover:text-emerald-400 transition-colors flex-shrink-0"
                    aria-label="Close selected skill description"
                  >
                    ✕
                  </motion.button>
                </div>
                <motion.p 
                  className="text-zinc-300 leading-relaxed text-lg"
                  animate={{ x: 0, opacity: 1 }}
                  initial={{ x: -20, opacity: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  {skillDescriptions[selectedSkill] ?? 'Hands-on skill used in projects and continuous learning activities.'}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* Experience Section */}
        <motion.section
          id="experience"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="mb-12"
        >
          <motion.h2 
            className="text-3xl font-bold text-white mb-8"
            variants={itemVariants}
          >
            Experience
          </motion.h2>
          <div className="space-y-4">
            {experiences.map((item, idx) => (
              <motion.div
                key={item.id}
                custom={idx}
                variants={listItemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Link href={`/experience/${item.id}`} className="group block">
                  <motion.div
                    className="bg-zinc-950/50 border border-zinc-800 p-8 rounded-2xl transition-all duration-500 group-hover:bg-zinc-950/80 backdrop-blur-sm"
                    whileHover={{ 
                      borderColor: 'rgba(16, 185, 129, 0.4)',
                      boxShadow: '0 20px 50px rgba(16, 185, 129, 0.1)'
                    }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <motion.h3 
                        className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300 flex-1"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.org}
                      </motion.h3>
                      <motion.span 
                        className="text-sm text-zinc-400 whitespace-nowrap font-medium bg-zinc-900/50 px-4 py-2 rounded-full group-hover:bg-emerald-500/20 group-hover:text-emerald-300 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                      >
                        {item.period}
                      </motion.span>
                    </div>
                    <motion.p 
                      className="text-emerald-400 font-semibold mb-2 group-hover:text-emerald-300 transition-colors duration-300"
                      whileHover={{ x: 2 }}
                    >
                      {item.role}
                    </motion.p>
                    <motion.p 
                      className="text-zinc-500 text-sm group-hover:text-zinc-300 transition-colors duration-300"
                      whileHover={{ x: 4 }}
                    >
                      Read story →
                    </motion.p>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Certifications Section */}
        <motion.section
          id="certifications"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="mb-12"
        >
          <motion.h2 
            className="text-3xl font-bold text-white mb-8"
            variants={itemVariants}
          >
            Certifications
          </motion.h2>
          <div className="space-y-4">
            {certifications.map((cert, idx) => (
              <motion.div
                key={cert.title}
                custom={idx}
                variants={listItemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div
                  className="bg-zinc-950/50 border border-zinc-800 p-8 rounded-2xl transition-all duration-500 group backdrop-blur-sm hover:bg-zinc-950/80"
                  whileHover={{ 
                    borderColor: 'rgba(16, 185, 129, 0.4)',
                    y: -6,
                    boxShadow: '0 20px 50px rgba(16, 185, 129, 0.1)'
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <motion.h3 
                      className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors duration-300 flex-1"
                      whileHover={{ x: 2 }}
                    >
                      {cert.title}
                    </motion.h3>
                    <motion.span 
                      className="text-sm text-zinc-400 whitespace-nowrap font-medium"
                      whileHover={{ scale: 1.05 }}
                    >
                      {cert.period}
                    </motion.span>
                  </div>
                  <motion.p 
                    className="text-emerald-400 font-medium mb-4 group-hover:text-emerald-300 transition-colors duration-300"
                    whileHover={{ x: 2 }}
                  >
                    {cert.provider}
                  </motion.p>
                  <motion.ul 
                    className="space-y-3 text-zinc-400 text-sm"
                    initial="hidden"
                    whileInView="visible"
                    variants={{
                      visible: {
                        transition: { staggerChildren: 0.05 }
                      }
                    }}
                  >
                    {cert.completions.map((item) => (
                      <motion.li 
                        key={item} 
                        className="flex items-start gap-3 group-hover:text-zinc-300 transition-colors duration-300"
                        variants={{
                          hidden: { x: -10, opacity: 0 },
                          visible: { x: 0, opacity: 1 }
                        }}
                      >
                        <motion.span
                          className="text-emerald-500 mt-1 flex-shrink-0"
                          whileHover={{ scale: 1.2 }}
                        >
                          ✓
                        </motion.span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Education Section */}
        <motion.section
          id="education"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="mb-20"
        >
          <motion.h2 
            className="text-3xl font-bold text-white mb-8"
            variants={itemVariants}
          >
            Education
          </motion.h2>
          <div className="space-y-4">
            {education.map((item, idx) => (
              <motion.div
                key={item.degree}
                custom={idx}
                variants={listItemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div
                  className="bg-zinc-950/50 border border-zinc-800 p-8 rounded-2xl transition-all duration-500 group backdrop-blur-sm hover:bg-zinc-950/80"
                  whileHover={{ 
                    borderColor: 'rgba(16, 185, 129, 0.4)',
                    y: -6,
                    boxShadow: '0 20px 50px rgba(16, 185, 129, 0.1)'
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <motion.h3 
                      className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors duration-300 flex-1"
                      whileHover={{ x: 2 }}
                    >
                      {item.degree}
                    </motion.h3>
                    <motion.span 
                      className="text-sm text-zinc-400 whitespace-nowrap font-medium"
                      whileHover={{ scale: 1.05 }}
                    >
                      {item.period}
                    </motion.span>
                  </div>
                  <motion.p 
                    className="text-emerald-400 font-medium mb-1 group-hover:text-emerald-300 transition-colors duration-300"
                    whileHover={{ x: 2 }}
                  >
                    {item.school}
                  </motion.p>
                  <motion.p 
                    className="text-zinc-400 text-sm mb-4 group-hover:text-zinc-300 transition-colors duration-300"
                    whileHover={{ x: 2 }}
                  >
                    {item.location}
                  </motion.p>
                  <motion.ul 
                    className="space-y-3 text-zinc-400 text-sm"
                    initial="hidden"
                    whileInView="visible"
                    variants={{
                      visible: {
                        transition: { staggerChildren: 0.05 }
                      }
                    }}
                  >
                    {item.highlights.map((highlight) => (
                      <motion.li 
                        key={highlight} 
                        className="flex items-start gap-3 group-hover:text-zinc-300 transition-colors duration-300"
                        variants={{
                          hidden: { x: -10, opacity: 0 },
                          visible: { x: 0, opacity: 1 }
                        }}
                      >
                        <motion.span 
                          className="text-emerald-500 mt-1 flex-shrink-0"
                          whileHover={{ scale: 1.2 }}
                        >
                          ★
                        </motion.span>
                        <span>{highlight}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.section>

      </main>
    </div>
  );
}

