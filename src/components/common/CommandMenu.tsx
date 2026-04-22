'use client';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from '@/components/ui/command';
import {
  BriefcaseBusiness,
  Bot,
  FileText,
  FolderKanban,
  Home,
  Mail,
  NotebookText,
  Search,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState, type ComponentType } from 'react';

type CommandEntry = {
  title: string;
  description: string;
  href: string;
  hotkey: string;
  icon: ComponentType<{ className?: string }>;
};

const navigationItems: CommandEntry[] = [
  {
    title: 'Home',
    description: 'Go back to the landing page.',
    href: '/',
    hotkey: 'H',
    icon: Home,
  },
  {
    title: 'Work',
    description: 'See experience and career highlights.',
    href: '/work-experience',
    hotkey: 'W',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Blog',
    description: 'Read writing, notes, and insights.',
    href: '/blog',
    hotkey: 'B',
    icon: NotebookText,
  },
  {
    title: 'Projects',
    description: 'Browse selected builds and experiments.',
    href: '/projects',
    hotkey: 'P',
    icon: FolderKanban,
  },
  {
    title: 'Models',
    description: 'Explore model work and AI showcases.',
    href: '/models',
    hotkey: 'M',
    icon: Bot,
  },
  {
    title: 'Resume',
    description: 'Open the latest resume and profile.',
    href: '/resume',
    hotkey: 'R',
    icon: FileText,
  },
  {
    title: 'Contact',
    description: 'Send a message or start a conversation.',
    href: '/contact',
    hotkey: 'C',
    icon: Mail,
  },
];

export default function CommandMenu({
  compact = false,
  className = '',
}: {
  compact?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const shortcutLabel = useMemo(() => {
    if (typeof navigator === 'undefined') {
      return '⌘K';
    }

    const isMac = /(Mac|iPhone|iPad|iPod)/i.test(navigator.platform);
    return isMac ? '⌘K' : 'Ctrl K';
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const navigateTo = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open command menu"
        className={`inline-flex items-center gap-2 rounded-full text-neutral-400 transition-colors hover:text-neutral-100 ${compact ? 'px-2.5 py-1.5 text-xs' : 'px-3 py-2 text-sm'} ${className}`}
      >
        <Search className="h-3.5 w-3.5" />
        <span className="font-medium">Command</span>
        <span className="text-[11px] text-neutral-500">{shortcutLabel}</span>
      </button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        className="sm:max-w-[640px]"
      >
        <CommandInput placeholder="Search pages and actions..." />
        <CommandList className="max-h-[360px]">
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Navigation">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <CommandItem
                  key={item.href}
                  onSelect={() => navigateTo(item.href)}
                  className="group gap-3 rounded-md px-3 py-2"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-700/70 bg-neutral-900/70 text-neutral-300">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-neutral-100">{item.title}</p>
                    <p className="truncate text-xs text-neutral-400">{item.description}</p>
                  </div>
                  <CommandShortcut className="rounded border border-neutral-700/80 bg-neutral-900 px-1.5 py-0.5 text-[10px] tracking-normal text-neutral-300">
                    {item.hotkey}
                  </CommandShortcut>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
