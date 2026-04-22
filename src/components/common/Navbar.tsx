import { navbarConfig } from '@/config/Navbar';
import { Link } from 'next-view-transitions';
import React from 'react';

import Container from './Container';
import CommandMenu from './CommandMenu';
import ModeToggle from './ModeToggle';
import { ThemeToggleButton } from './ThemeSwitch';

export default function Navbar() {
  return (
    <Container className="sticky top-0 z-20 py-4 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6">
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight text-neutral-100 transition-opacity hover:opacity-80"
          >
            Home
          </Link>
          <div className="flex items-center gap-4 text-sm text-neutral-300">
            {navbarConfig.navItems.map((item) => (
              <Link
                className="transition-colors hover:text-white"
                key={item.label}
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-neutral-300 md:hidden">
          <Link className="transition-colors hover:text-white" href="/">
            Home
          </Link>
          <Link className="transition-colors hover:text-white" href="/blog">
            Blog
          </Link>
          <Link className="transition-colors hover:text-white" href="/projects">
            Projects
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle compact />
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <ModeToggle compact />
          <div className="flex items-center gap-1 rounded-full border border-neutral-800/70 bg-neutral-900/30 p-1">
            <CommandMenu compact />
            <ThemeToggleButton
              variant="circle"
              start="top-right"
              blur
              className="size-8 text-neutral-400 hover:text-white"
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
