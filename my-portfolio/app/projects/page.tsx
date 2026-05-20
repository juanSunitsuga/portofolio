'use client';

import projects from '../projects.json';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import TechBadge from '../components/TechBadge';

export default function Projects() {
  return (
    <div className="flex min-h-screen bg-black font-sans pt-20">
      <main className="w-full max-w-5xl mx-auto py-20 px-8 sm:px-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-white mb-12"
        >
          My Projects
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Link href={`/projects/${project.id}`}>
                <div className="h-full p-0 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-all hover:shadow-lg hover:shadow-emerald-900/20 overflow-hidden group cursor-pointer bg-zinc-950/40">
                  {/* Image */}
                  <div className="relative w-full h-48 overflow-hidden bg-zinc-900">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h2 className="text-2xl font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors">{project.title}</h2>
                        <p className="text-zinc-400 text-sm mt-1">{project.role}</p>
                      </div>
                      <span className="text-zinc-500 text-sm">{project.year}</span>
                    </div>

                    <p className="text-zinc-300 mb-4 text-sm line-clamp-2 leading-relaxed">{project.description}</p>

                    {/* Meta Info */}
                    <div className="flex gap-4 text-xs text-zinc-400 mb-4">
                      <span>👥 {project.type}</span>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.slice(0, 4).map((tech, idx) => (
                          <TechBadge key={`${project.id}-${tech}-${idx}`} tech={tech} className="bg-zinc-900/90" />
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="px-2 py-1 text-xs text-zinc-400">
                            +{project.techStack.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Button */}
                    <div className="flex items-center gap-2 px-4 py-2 bg-emerald-600/10 group-hover:bg-emerald-600 text-emerald-400 group-hover:text-white rounded transition-all text-sm font-medium w-fit">
                      View Details →
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
