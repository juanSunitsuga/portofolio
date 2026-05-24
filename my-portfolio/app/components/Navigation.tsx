'use client';

import { usePathname } from 'next/navigation';
import { useLenis } from 'lenis/react';
import { motion } from 'framer-motion';

export default function Navigation() {
  const pathname = usePathname();
  const lenis = useLenis();

  const sectionLinks = [
    { label: 'Home', hash: '#home' },
    { label: 'Projects', hash: '#projects' },
    { label: 'Skills', hash: '#skills' },
    { label: 'Experience', hash: '#experience' },
    { label: 'Certifications', hash: '#certifications' },
    { label: 'Education', hash: '#education' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (pathname === '/') {
      e.preventDefault();
      lenis?.scrollTo(hash, { offset: -100, duration: 1.5, easing: (t) => 1 - Math.pow(1 - t, 3) });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.06,
        delayChildren: 0.1
      }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-2xl border-b border-zinc-800/50 hardware-accelerated"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-4 flex gap-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {sectionLinks.map((item, idx) => (
          <motion.a
            key={item.hash}
            href={pathname === '/' ? item.hash : `/${item.hash}`}
            onClick={(e) => handleScroll(e, item.hash)}
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer relative group"
            custom={idx}
            variants={linkVariants}
            whileHover={{ scale: 1.05, color: '#ffffff' }}
            whileTap={{ scale: 0.95 }}
          >
            {item.label}
            <motion.span
              className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
              initial={{ scaleX: 0, originX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </motion.a>
        ))}
      </div>
    </motion.nav>
  );
}