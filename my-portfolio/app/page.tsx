"use client";
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { FaArrowDown, FaEnvelope, FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import projects from './projects.json';
import TechBadge from './components/TechBadge';
import { experiences } from './experienceData';

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const scrollProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45 },
    },
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

          <motion.div variants={itemVariants}>
            <div className="flex gap-4 mt-4 flex-wrap">
              <Link href="#projects" className="px-6 py-3 border border-zinc-700 rounded-full text-white hover:bg-zinc-900 transition-colors">
                View My Projects
              </Link>
              <Link href="#experience" className="px-6 py-3 bg-emerald-600 rounded-full text-white hover:bg-emerald-700 transition-colors">
                Explore My Experience
              </Link>
            </div>
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
            animate={{ y: [0, 8, 0], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            className="mt-2 w-fit inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
            aria-label="Scroll down to projects"
          >
            <span className="text-sm">Scroll down</span>
            <FaArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
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
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4"
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#3f3f46 #1a1a1a' }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <Link href={`/projects/${project.id}`}>
                  <div className="flex-shrink-0 w-96 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-all hover:shadow-lg hover:shadow-emerald-900/20 bg-zinc-950/50 overflow-hidden group cursor-pointer">
                    <div className="relative w-full h-48 overflow-hidden bg-zinc-900">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={400}
                        height={200}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-emerald-400 mb-1 group-hover:text-emerald-300 transition-colors">{project.title}</h3>
                      <p className="text-sm text-zinc-400 mb-3">{project.year}</p>
                      <p className="text-zinc-300 text-sm leading-relaxed line-clamp-2 mb-4">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.techStack.slice(0, 3).map((tech, idx) => (
                          <TechBadge key={`${project.id}-${tech}-${idx}`} tech={tech} className="bg-zinc-900/90" />
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="px-2 py-1 text-xs text-zinc-400">
                            +{project.techStack.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600/10 group-hover:bg-emerald-600 text-emerald-400 group-hover:text-white rounded transition-all text-sm font-medium">
                        View Details →
                      </div>
                    </div>
                  </div>
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
          viewport={{ once: true, amount: 0.25 }}
          variants={sectionVariants}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-8">Technical Skills</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {Object.entries(technicalSkills).map(([category, list]) => (
              <motion.div key={category} variants={itemVariants}>
                <h3 className="text-emerald-400 text-2xl font-semibold mb-4">{category}</h3>
                <div className="flex flex-wrap gap-3">
                  {list.map((skill) => (
                    <button
                      key={`${category}-${skill}`}
                      type="button"
                      onClick={() => setSelectedSkill((prev) => (prev === skill ? null : skill))}
                      className="rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/80"
                      aria-label={`Show details for ${skill}`}
                    >
                      <TechBadge
                        tech={skill}
                        className={`${selectedSkill === skill ? 'border-emerald-500 bg-emerald-950/35' : 'bg-zinc-900/90'} cursor-pointer`}
                      />
                    </button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {selectedSkill && (
              <motion.div
                key={selectedSkill}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="mt-6 rounded-xl border border-emerald-900/60 bg-emerald-950/30 p-5"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h4 className="text-white font-semibold">{selectedSkill}</h4>
                  <button
                    type="button"
                    onClick={() => setSelectedSkill(null)}
                    className="text-xs text-zinc-400 hover:text-white transition-colors"
                    aria-label="Close selected skill description"
                  >
                    Close
                  </button>
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  {skillDescriptions[selectedSkill] ?? 'Hands-on skill used in projects and continuous learning activities.'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* Experience Section */}
        <motion.section
          id="experience"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={sectionVariants}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-8">Experience</h2>
          <div className="space-y-6">
            {experiences.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="bg-zinc-900/70 border border-zinc-800 p-6 rounded-lg"
              >
                <Link href={`/experience/${item.id}`} className="group block">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-semibold text-white group-hover:text-emerald-400 transition-colors">
                      {item.org}
                    </h3>
                    <span className="text-sm text-zinc-400 whitespace-nowrap">{item.period}</span>
                  </div>
                  <p className="text-zinc-300 mt-1">{item.role}</p>
                  <p className="text-zinc-500 text-sm mt-3 group-hover:text-zinc-300 transition-colors">Read story →</p>
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
          viewport={{ once: true, amount: 0.25 }}
          variants={sectionVariants}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-8">Certifications</h2>
          <div className="space-y-6">
            {certifications.map((cert) => (
              <motion.div
                key={cert.title}
                variants={itemVariants}
                className="bg-zinc-900/70 border border-zinc-800 p-6 rounded-lg"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-white">{cert.title}</h3>
                  <span className="text-sm text-zinc-400">{cert.period}</span>
                </div>
                <p className="text-emerald-400 mb-3">{cert.provider}</p>
                <ul className="space-y-2 text-zinc-300 text-sm">
                  {cert.completions.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Education Section */}
        <motion.section
          id="education"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={sectionVariants}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-8">Education</h2>
          <div className="space-y-6">
            {education.map((item) => (
              <motion.div
                key={item.degree}
                variants={itemVariants}
                className="bg-zinc-900/70 border border-zinc-800 p-6 rounded-lg"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-white">{item.degree}</h3>
                  <span className="text-sm text-zinc-400">{item.period}</span>
                </div>
                <p className="text-emerald-400 mb-1">{item.school}</p>
                <p className="text-zinc-400 text-sm mb-3">{item.location}</p>
                <ul className="space-y-2 text-zinc-300 text-sm">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>• {highlight}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

      </main>
    </div>
  );
}

