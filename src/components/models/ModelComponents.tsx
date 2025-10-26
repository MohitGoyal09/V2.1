import Pytorch from '@/components/technologies/Pytorch';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import React from 'react';

import { CodeCopyButton } from '../blog/CodeCopyButton';

// Technology mapping for dynamic components
const TechnologyComponents: Record<string, React.ComponentType> = {
  'PyTorch': Pytorch,
  'pytorch': Pytorch,
  'Transformers': Pytorch,
  'transformers': Pytorch,
  'Deep Learning': Pytorch,
  'deep learning': Pytorch,
};

// Custom Technology component for displaying technology badges with icons
const Technology = ({ name }: { name: string }) => {
  const TechComponent =
    TechnologyComponents[name] || TechnologyComponents[name.toLowerCase()];

  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-muted/50 px-3 py-1.5 text-sm font-medium">
      {TechComponent && <TechComponent />}
      <span>{name}</span>
    </div>
  );
};

// Custom TechStack component for displaying multiple technologies
const TechStack = ({ technologies }: { technologies: string[] }) => {
  return (
    <div className="my-6 rounded-lg border bg-muted/20 p-4">
      <h4 className="mb-3 text-lg font-semibold">Technology Stack</h4>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <Technology key={tech} name={tech} />
        ))}
      </div>
    </div>
  );
};

// Custom ModelMeta component for model information
const ModelMeta = ({
  timeline,
  role,
  team,
  status,
  paper,
  dataset,
}: {
  timeline?: string;
  role?: string;
  team?: string;
  status?: string;
  paper?: string;
  dataset?: string;
}) => {
  return (
    <div className="my-6 grid gap-4 rounded-lg border bg-muted/20 p-4 sm:grid-cols-2 lg:grid-cols-3">
      {timeline && (
        <div>
          <h5 className="text-sm font-semibold text-muted-foreground">
            Timeline
          </h5>
          <p className="text-sm">{timeline}</p>
        </div>
      )}
      {role && (
        <div>
          <h5 className="text-sm font-semibold text-muted-foreground">Role</h5>
          <p className="text-sm">{role}</p>
        </div>
      )}
      {team && (
        <div>
          <h5 className="text-sm font-semibold text-muted-foreground">Team</h5>
          <p className="text-sm">{team}</p>
        </div>
      )}
      {status && (
        <div>
          <h5 className="text-sm font-semibold text-muted-foreground">
            Status
          </h5>
          <Badge
            variant={
              status === 'completed'
                ? 'default'
                : status === 'in-progress'
                  ? 'secondary'
                  : 'outline'
            }
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      )}
      {paper && (
        <div>
          <h5 className="text-sm font-semibold text-muted-foreground">Paper</h5>
          <a href={paper} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
            View Paper
          </a>
        </div>
      )}
      {dataset && (
        <div>
          <h5 className="text-sm font-semibold text-muted-foreground">Dataset</h5>
          <a href={dataset} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
            View Dataset
          </a>
        </div>
      )}
    </div>
  );
};

// Custom Metrics component
const Metrics = ({ metrics }: { metrics: Array<{ name: string; value: string; description?: string }> }) => {
  return (
    <div className="my-6 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/20">
      <h4 className="mb-3 text-lg font-semibold text-blue-800 dark:text-blue-200">
        Key Metrics
      </h4>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric, index) => (
          <div key={index} className="rounded-lg bg-white/50 p-3 dark:bg-gray-900/50">
            <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">
              {metric.value}
            </div>
            <div className="text-sm font-medium text-blue-700 dark:text-blue-300">
              {metric.name}
            </div>
            {metric.description && (
              <div className="text-xs text-blue-600 dark:text-blue-400">
                {metric.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Custom Challenges component
const Challenges = ({ challenges }: { challenges: string[] }) => {
  return (
    <div className="my-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-950/20">
      <h4 className="mb-3 text-lg font-semibold text-yellow-800 dark:text-yellow-200">
        Key Challenges
      </h4>
      <ul className="space-y-2">
        {challenges.map((challenge, index) => (
          <li
            key={index}
            className="flex items-start gap-2 text-sm text-yellow-700 dark:text-yellow-300"
          >
            <span className="mt-1 block size-1.5 rounded-full bg-yellow-500 dark:bg-yellow-400" />
            {challenge}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Custom Learnings component
const Learnings = ({ learnings }: { learnings: string[] }) => {
  return (
    <div className="my-6 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/20">
      <h4 className="mb-3 text-lg font-semibold text-green-800 dark:text-green-200">
        Key Learnings
      </h4>
      <ul className="space-y-2">
        {learnings.map((learning, index) => (
          <li
            key={index}
            className="flex items-start gap-2 text-sm text-green-700 dark:text-green-300"
          >
            <span className="mt-1 block size-1.5 rounded-full bg-green-500 dark:bg-green-400" />
            {learning}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const ModelComponents = {
  // Inherit blog components for basic markdown
  img: ({
    src,
    alt,
    ...props
  }: {
    src: string;
    alt: string;
    [key: string]: unknown;
  }) => (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={400}
      className="rounded-lg"
      {...props}
    />
  ),
  h1: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <h1 className="mb-6 text-4xl font-bold" {...props}>
      {children}
    </h1>
  ),
  h2: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <h2 className="mb-4 mt-8 text-3xl font-semibold" {...props}>
      {children}
    </h2>
  ),
  h3: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <h3 className="mb-3 mt-6 text-2xl font-medium" {...props}>
      {children}
    </h3>
  ),
  p: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <p className="mb-4 leading-7 text-muted-foreground" {...props}>
      {children}
    </p>
  ),
  ul: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <ul className="mb-4 ml-6 list-disc space-y-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <ol className="mb-4 ml-6 list-decimal space-y-2" {...props}>
      {children}
    </ol>
  ),
  li: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <li className="leading-7 text-muted-foreground" {...props}>
      {children}
    </li>
  ),
  pre: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => {
    const getTextContent = (node: React.ReactNode): string => {
      if (typeof node === 'string') {
        return node;
      }
      if (typeof node === 'number') {
        return String(node);
      }
      if (
        React.isValidElement(node) &&
        node.props &&
        typeof node.props === 'object'
      ) {
        return getTextContent(
          (node.props as { children?: React.ReactNode }).children,
        );
      }
      if (Array.isArray(node)) {
        return node.map(getTextContent).join('');
      }
      return '';
    };

    const codeText = getTextContent(children);

    return (
      <div className="group relative mb-4">
        <pre
          className="overflow-x-auto rounded-lg border bg-muted/30 p-4 text-sm [&>code]:bg-transparent [&>code]:p-0"
          {...props}
        >
          {children}
        </pre>
        <CodeCopyButton code={codeText} />
      </div>
    );
  },
  code: ({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    [key: string]: unknown;
  }) => {
    if (className?.includes('language-')) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }

    return (
      <code className="rounded px-2 py-1 text-sm font-mono" {...props}>
        {children}
      </code>
    );
  },
  blockquote: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <blockquote
      className="mb-4 border-l-4 border-primary pl-4 italic text-muted-foreground"
      {...props}
    >
      {children}
    </blockquote>
  ),
  table: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <div className="my-6">
      <Table {...props}>
        {children}
      </Table>
    </div>
  ),
  thead: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <TableHeader {...props}>
      {children}
    </TableHeader>
  ),
  tbody: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <TableBody {...props}>
      {children}
    </TableBody>
  ),
  tr: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <TableRow {...props}>
      {children}
    </TableRow>
  ),
  th: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <TableHead {...props}>
      {children}
    </TableHead>
  ),
  td: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <TableCell {...props}>
      {children}
    </TableCell>
  ),

  // Model-specific components
  Technology,
  TechStack,
  ModelMeta,
  Metrics,
  Challenges,
  Learnings,
};
