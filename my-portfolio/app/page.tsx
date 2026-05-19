'use client';

import Link from 'next/link';
import projects from './projects.json';
import { useRef } from 'react';
import Image from 'next/image';

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-black font-sans pt-20">
      <main className="flex w-full max-w-5xl mx-auto flex-col py-32 px-8 sm:px-16">
        {/* Hero Section */}
        <div className="flex flex-col gap-6 mb-20">
          <div className="inline-block bg-emerald-950/40 border border-emerald-900/60 rounded-full px-4 py-2 w-fit">
            <span className="flex items-center gap-2 text-sm text-emerald-400">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              Currently at Apple Developer Academy
            </span>
          </div>
          <div>
            <h1 className="text-5xl font-bold text-white mb-2">Agustinus Juan Kurniawan</h1>
            <p className="text-lg text-emerald-400">Full Stack Developer</p>
          </div>
          <p className="text-lg text-zinc-400 max-w-md leading-relaxed">
            Building scalable web applications with React, Node.js, and cloud technologies. Passionate about creating efficient, user-focused solutions while continuously learning new technologies.
          </p>
          <div className="flex gap-4 mt-4 flex-wrap">
            <Link href="/projects" className="px-6 py-3 border border-zinc-700 rounded-full text-white hover:bg-zinc-900 transition-colors">
              View My Projects
            </Link>
            <Link href="/about" className="px-6 py-3 bg-emerald-600 rounded-full text-white hover:bg-emerald-700 transition-colors">
              Learn More About Me
            </Link>
          </div>
          <div className="flex gap-6 mt-8 text-zinc-400">
            <a href="https://github.com/juanSunitsuga" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/agustinus-juan-kurniawan/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="mailto:juankurniawan04@gmail.com" className="hover:text-white transition-colors">
              Email
            </a>
          </div>
        </div>

        {/* Featured Projects Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white">Featured Projects</h2>
              <p className="text-zinc-400 mt-2">Scroll to see more</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => scroll('left')}
                className="p-2 border border-zinc-700 rounded-full hover:bg-zinc-900 transition-colors text-white"
                aria-label="Scroll left"
              >
                ←
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-2 border border-zinc-700 rounded-full hover:bg-zinc-900 transition-colors text-white"
                aria-label="Scroll right"
              >
                →
              </button>
            </div>
          </div>

          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4"
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#3f3f46 #1a1a1a' }}
          >
            {projects.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <div className="flex-shrink-0 w-96 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-all hover:shadow-lg hover:shadow-emerald-900/20 bg-zinc-950/50 overflow-hidden group cursor-pointer">
                  {/* Image */}
                  <div className="relative w-full h-48 overflow-hidden bg-zinc-900">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-emerald-400 mb-1 group-hover:text-emerald-300 transition-colors">{project.title}</h3>
                    <p className="text-sm text-zinc-400 mb-3">{project.year}</p>
                    <p className="text-zinc-300 text-sm leading-relaxed line-clamp-2 mb-4">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-xs text-zinc-300"
                        >
                          {tech}
                        </span>
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
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
