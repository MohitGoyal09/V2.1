import Container from '@/components/common/Container';
import { ModelContent } from '@/components/models/ModelContent';
import { ModelNavigation } from '@/components/models/ModelNavigation';
import ArrowLeft from '@/components/svgs/ArrowLeft';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { siteConfig } from '@/config/Meta';
import {
  getModelCaseStudyBySlug,
  getModelCaseStudySlugs,
  getModelNavigation,
  getRelatedModelCaseStudies,
} from '@/lib/model';
import { Metadata } from 'next';
import { Link } from 'next-view-transitions';
import { notFound } from 'next/navigation';

interface ModelCaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static paths for all model case studies
export async function generateStaticParams() {
  const slugs = getModelCaseStudySlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for each model case study
export async function generateMetadata({
  params,
}: ModelCaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getModelCaseStudyBySlug(slug);

  if (!caseStudy || !caseStudy.frontmatter.isPublished) {
    return {
      title: 'Model Not Found',
    };
  }

  const { title, description, image } = caseStudy.frontmatter;

  return {
    metadataBase: new URL(siteConfig.url),
    title: `${title} - Model Case Study`,
    description,
    openGraph: {
      title: `${title} - Model Case Study`,
      description,
      images: [image],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} - Model Case Study`,
      description,
      images: [image],
    },
  };
}

export default async function ModelCaseStudyPage({
  params,
}: ModelCaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = await getModelCaseStudyBySlug(slug);

  if (!caseStudy || !caseStudy.frontmatter.isPublished) {
    notFound();
  }

  const navigation = await getModelNavigation(slug);
  const relatedModels = await getRelatedModelCaseStudies(slug, 2);

  return (
    <Container className="py-16">
      <div className="space-y-12">
        {/* Back Button */}
        <div>
          <Button variant="ghost" asChild className="group">
            <Link href="/models" className="flex items-center space-x-2">
              <ArrowLeft className="size-4" />
              <span>Back to Models</span>
            </Link>
          </Button>
        </div>

        {/* Model Content */}
        <ModelContent
          frontmatter={caseStudy.frontmatter}
          content={caseStudy.content}
        />

        {/* Model Navigation */}
        <ModelNavigation
          previous={navigation.previous}
          next={navigation.next}
        />

        {/* Related Models */}
        {relatedModels.length > 0 && (
          <div className="space-y-6">
            <Separator />
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Related Models</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {relatedModels.map((model) => (
                  <div
                    key={model.slug}
                    className="group rounded-lg border bg-card p-6 transition-colors hover:bg-muted/50"
                  >
                    <Link href={`/models/${model.slug}`}>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold group-hover:text-primary">
                            {model.frontmatter.title}
                          </h3>
                          <div className="text-xs">
                            <div
                              className={`inline-block rounded px-2 py-1 text-xs font-medium ${
                                model.frontmatter.status === 'completed'
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                  : model.frontmatter.status === 'in-progress'
                                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                              }`}
                            >
                              {model.frontmatter.status
                                .charAt(0)
                                .toUpperCase() +
                                model.frontmatter.status.slice(1)}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {model.frontmatter.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {model.frontmatter.technologies
                            .slice(0, 3)
                            .map((tech) => (
                              <span
                                key={tech}
                                className="rounded bg-muted px-2 py-1 text-xs"
                              >
                                {tech}
                              </span>
                            ))}
                          {model.frontmatter.technologies.length > 3 && (
                            <span className="rounded bg-muted px-2 py-1 text-xs">
                              +{model.frontmatter.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Back to Models CTA */}
        <div className="text-center">
          <Separator className="mb-8" />
          <Button asChild size="lg">
            <Link href="/models">View All Models</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
