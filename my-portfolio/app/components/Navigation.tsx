'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-3xl mx-auto px-16 py-4 flex gap-8">
        <Link
          href="/"
          className={`text-sm font-medium transition-colors ${
            isActive('/')
              ? 'text-emerald-500'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Home
        </Link>
        <Link
          href="/projects"
          className={`text-sm font-medium transition-colors ${
            isActive('/projects')
              ? 'text-emerald-500'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Projects
        </Link>
        <Link
          href="/about"
          className={`text-sm font-medium transition-colors ${
            isActive('/about')
              ? 'text-emerald-500'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          About
        </Link>
      </div>
    </nav>
  );
}
