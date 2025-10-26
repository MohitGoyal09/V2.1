import { models } from '@/config/Models';
import {
  ModelCaseStudy,
  ModelCaseStudyFrontmatter,
  ModelCaseStudyPreview,
} from '@/types/model';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const modelsDirectory = path.join(process.cwd(), 'src/data/models');

/**
 * Get all model case study files from the models directory
 */
export function getModelCaseStudySlugs(): string[] {
  if (!fs.existsSync(modelsDirectory)) {
    return [];
  }

  const files = fs.readdirSync(modelsDirectory);
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

/**
 * Get model case study by slug with full content
 */
export function getModelCaseStudyBySlug(
  slug: string,
): ModelCaseStudy | null {
  try {
    const fullPath = path.join(modelsDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Validate frontmatter
    const frontmatter = data as ModelCaseStudyFrontmatter;
    if (!frontmatter.title || !frontmatter.description) {
      throw new Error(`Invalid frontmatter in ${slug}.mdx`);
    }

    return {
      slug,
      frontmatter,
      content,
    };
  } catch (error) {
    console.error(`Error reading model case study ${slug}:`, error);
    return null;
  }
}

/**
 * Get all model case studies with frontmatter only (for listing)
 */
export function getAllModelCaseStudies(): ModelCaseStudyPreview[] {
  const slugs = getModelCaseStudySlugs();

  const caseStudies = slugs
    .map((slug) => {
      const caseStudy = getModelCaseStudyBySlug(slug);
      if (!caseStudy) return null;

      return {
        slug: caseStudy.slug,
        frontmatter: caseStudy.frontmatter,
      };
    })
    .filter(
      (caseStudy): caseStudy is ModelCaseStudyPreview => caseStudy !== null,
    )
    .sort((a, b) => {
      // Sort by featured first, then by title
      if (a.frontmatter.featured && !b.frontmatter.featured) return -1;
      if (!a.frontmatter.featured && b.frontmatter.featured) return 1;
      return a.frontmatter.title.localeCompare(b.frontmatter.title);
    });

  return caseStudies;
}

/**
 * Get all published model case studies
 */
export function getPublishedModelCaseStudies(): ModelCaseStudyPreview[] {
  const allCaseStudies = getAllModelCaseStudies();
  return allCaseStudies.filter(
    (caseStudy) => caseStudy.frontmatter.isPublished,
  );
}

/**
 * Get model case studies by technology
 */
export function getModelCaseStudiesByTechnology(
  technology: string,
): ModelCaseStudyPreview[] {
  const publishedCaseStudies = getPublishedModelCaseStudies();
  return publishedCaseStudies.filter((caseStudy) =>
    caseStudy.frontmatter.technologies.some(
      (tech) => tech.toLowerCase() === technology.toLowerCase(),
    ),
  );
}

/**
 * Get all unique technologies from published case studies
 */
export function getAllModelTechnologies(): string[] {
  const publishedCaseStudies = getPublishedModelCaseStudies();
  const technologiesSet = new Set<string>();

  publishedCaseStudies.forEach((caseStudy) => {
    caseStudy.frontmatter.technologies.forEach((tech) => {
      technologiesSet.add(tech.toLowerCase());
    });
  });

  return Array.from(technologiesSet).sort();
}

/**
 * Get model navigation (next/previous) based on config Models order
 */
export function getModelNavigation(currentSlug: string): {
  previous: { title: string; slug: string } | null;
  next: { title: string; slug: string } | null;
} {
  // Find current model in config
  const currentModelIndex = models.findIndex(
    (model) => model.modelDetailsPageSlug === `/models/${currentSlug}`,
  );

  if (currentModelIndex === -1) {
    return { previous: null, next: null };
  }

  const previousModel =
    currentModelIndex > 0 ? models[currentModelIndex - 1] : null;
  const nextModel =
    currentModelIndex < models.length - 1
      ? models[currentModelIndex + 1]
      : null;

  return {
    previous: previousModel
      ? {
          title: previousModel.title,
          slug: previousModel.modelDetailsPageSlug.replace(
            '/models/',
            '',
          ),
        }
      : null,
    next: nextModel
      ? {
          title: nextModel.title,
          slug: nextModel.modelDetailsPageSlug.replace('/models/', ''),
        }
      : null,
  };
}

/**
 * Get related model case studies based on technologies (excluding the current one)
 */
export function getRelatedModelCaseStudies(
  currentSlug: string,
  maxModels = 2,
): ModelCaseStudyPreview[] {
  const currentCaseStudy = getModelCaseStudyBySlug(currentSlug);
  if (!currentCaseStudy || !currentCaseStudy.frontmatter.isPublished) {
    return [];
  }

  const allCaseStudies = getPublishedModelCaseStudies();
  const currentTechnologies = currentCaseStudy.frontmatter.technologies.map(
    (tech) => tech.toLowerCase(),
  );

  // Calculate relevance score based on shared technologies
  const caseStudiesWithScore = allCaseStudies
    .filter((caseStudy) => caseStudy.slug !== currentSlug)
    .map((caseStudy) => {
      const sharedTechnologies = caseStudy.frontmatter.technologies.filter(
        (tech) => currentTechnologies.includes(tech.toLowerCase()),
      );
      return {
        caseStudy,
        score: sharedTechnologies.length,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return caseStudiesWithScore
    .slice(0, maxModels)
    .map((item) => item.caseStudy);
}
