import {
  heroConfig,
  heroModeConfig,
  skillComponents,
  socialLinks,
} from '@/config/Hero';
import { parseTemplate } from '@/lib/hero';
import { cn } from '@/lib/utils';
import { PortfolioMode } from '@/stores/modeStore';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React from 'react';

import Container from '../common/Container';
import Skill from '../common/Skill';
import CV from '../svgs/CV';
import Chat from '../svgs/Chat';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

const buttonIcons = {
  CV: CV,
  Chat: Chat,
};

interface HeroProps {
  mode: PortfolioMode;
}

export default function Hero({ mode }: HeroProps) {
  const { name, title, avatar, skills } = heroConfig;
  const modeConfig = heroModeConfig[mode];
  const description = modeConfig.description;
  const buttons = modeConfig.buttons ?? heroConfig.buttons;

  const modeLabel = mode === 'engineering' ? 'Engineering Focus' : 'Research Focus';

  const renderDescription = () => {
    const parts = parseTemplate(description.template, skills);

    return parts.map((part) => {
      if (part.type === 'skill' && 'skill' in part && part.skill) {
        const SkillComponent =
          skillComponents[part.skill.component as keyof typeof skillComponents];
        return (
          <Skill key={part.key} name={part.skill.name} href={part.skill.href}>
            <SkillComponent />
          </Skill>
        );
      } else if (part.type === 'bold' && 'text' in part) {
        return (
          <b key={part.key} className="whitespace-pre-wrap text-primary">
            {part.text}
          </b>
        );
      } else if (part.type === 'text' && 'text' in part) {
        return (
          <span key={part.key} className="whitespace-pre-wrap">
            {part.text}
          </span>
        );
      }
      return null;
    });
  };

  return (
    <Container className="mx-auto max-w-5xl">
      {/* Image */}
      <Image
        src={avatar}
        alt="hero"
        width={96}
        height={96}
        className="size-24 rounded-full dark:bg-yellow-300 bg-blue-300 object-contain"
      />

      {/* Text Area */}
      <div className="mt-8 flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {modeLabel}
        </span>

        <h1
          className={cn(
            'text-4xl font-bold leading-tight',
            mode === 'engineering' ? 'text-foreground' : 'text-foreground/95',
          )}
        >
          Hi, I&apos;m {name} -
          <span
            className={cn(
              'ml-2',
              mode === 'engineering' ? 'text-secondary' : 'text-primary',
            )}
          >
            {title}
          </span>
        </h1>

        <div
          className={cn(
            'mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-2 whitespace-pre-wrap text-base leading-relaxed text-neutral-500 md:text-lg md:leading-relaxed',
          )}
        >
          {renderDescription()}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex gap-4">
        {buttons.map((button, index) => {
          const IconComponent =
            buttonIcons[button.icon as keyof typeof buttonIcons];
          return (
            <Button
              key={index}
              variant={button.variant as 'outline' | 'default'}
              className={cn(
                button.variant === 'outline' && 'inset-shadow-indigo-500',
                button.variant === 'default' && 'inset-shadow-indigo-500',
              )}
            >
              {IconComponent && <IconComponent />}
              <Link href={button.href}>{button.text}</Link>
            </Button>
          );
        })}
      </div>

      {/* Social Links */}
      <div className="mt-8 flex gap-2">
        {socialLinks.map((link) => (
          <Tooltip key={link.name} delayDuration={0}>
            <TooltipTrigger asChild>
              <Link
                href={link.href}
                key={link.name}
                className="text-secondary flex items-center gap-2"
              >
                <span className="size-6">{link.icon}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{link.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </Container>
  );
}
