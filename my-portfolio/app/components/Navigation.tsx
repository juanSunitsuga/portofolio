'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  const sectionLinks = [
    { label: 'Home', hash: 'home' },
    { label: 'Projects', hash: 'projects' },
    { label: 'Skills', hash: 'skills' },
    { label: 'Experience', hash: 'experience' },
    { label: 'Certifications', hash: 'certifications' },
    { label: 'Education', hash: 'education' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-4 flex gap-6 overflow-x-auto whitespace-nowrap scrollbar-thin">
        {sectionLinks.map((item) => (
          <Link
            key={item.hash}
            href={pathname === '/' ? `#${item.hash}` : `/#${item.hash}`}
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
