import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ModelCaseStudyFrontmatter } from '@/types/model';
import rehypeHighlight from '@shikijs/rehype';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Link } from 'next-view-transitions';
import Image from 'next/image';

import Github from '../svgs/Github';
import Website from '../svgs/Website';
import { ModelComponents } from './ModelComponents';

interface ModelContentProps {
  frontmatter: ModelCaseStudyFrontmatter;
  content: string;
}

export function ModelContent({ frontmatter, content }: ModelContentProps) {
  const {
    title,
    description,
    image,
    technologies,
    github,
    live,
    timeline,
    role,
    team,
    status,
    challenges,
    learnings,
    paper,
    dataset,
    metrics,
  } = frontmatter;

  const statusVariant =
    status === 'completed'
      ? 'default'
      : status === 'in-progress'
        ? 'secondary'
        : 'outline';

  return (
    <article className="mx-auto max-w-4xl">
      {/* Hero Section */}
      <header className="mb-8 space-y-6">
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
              {title}
            </h1>
            <Badge variant={statusVariant} className="text-xs">
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </div>

          <p className="text-lg text-muted-foreground">{description}</p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            {github && (
              <Button asChild variant="outline">
                <Link href={github} target="_blank" className="flex items-center gap-2">
                  <Github className="size-4" />
                  View Code
                </Link>
              </Button>
            )}
            {live && (
              <Button asChild>
                <Link href={live} target="_blank" className="flex items-center gap-2">
                  <Website className="size-4" />
                  View Model
                </Link>
              </Button>
            )}
            {paper && (
              <Button asChild variant="outline">
                <Link href={paper} target="_blank" className="flex items-center gap-2">
                  📄 Read Paper
                </Link>
              </Button>
            )}
            {dataset && (
              <Button asChild variant="outline">
                <Link href={dataset} target="_blank" className="flex items-center gap-2">
                  📊 Dataset
                </Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      <Separator className="mb-8" />

      {/* Project Details */}
      <div className="mb-8 grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Role</h3>
            <p className="text-sm">{role}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Timeline</h3>
            <p className="text-sm">{timeline}</p>
          </div>
          {team && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Team</h3>
              <p className="text-sm">{team}</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      {metrics && metrics.length > 0 && (
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-semibold">Key Metrics</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {metrics.map((metric, index) => (
              <div key={index} className="rounded-lg border bg-card p-4">
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="text-sm font-medium">{metric.name}</div>
                {metric.description && (
                  <div className="text-xs text-muted-foreground">{metric.description}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Challenges */}
      {challenges && challenges.length > 0 && (
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-semibold">Key Challenges</h3>
          <ul className="space-y-2">
            {challenges.map((challenge, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="mt-1 text-muted-foreground">•</span>
                <span className="text-sm">{challenge}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Learnings */}
      {learnings && learnings.length > 0 && (
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-semibold">Key Learnings</h3>
          <ul className="space-y-2">
            {learnings.map((learning, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="mt-1 text-muted-foreground">•</span>
                <span className="text-sm">{learning}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Separator className="mb-8" />

      {/* Content */}
      <div className="prose prose-gray max-w-none dark:prose-invert">
        <MDXRemote
          source={content}
          components={ModelComponents}
          options={{
            mdxOptions: {
              rehypePlugins: [
                [
                  rehypeHighlight,
                  {
                    theme: 'github-dark',
                  },
                ],
              ],
            },
          }}
        />
      </div>
    </article>
  );
}
