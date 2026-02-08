import About from '@/components/landing/About';
import Blog from '@/components/landing/Blog';
import CTA from '@/components/landing/CTA';
import Experience from '@/components/landing/Experience';
import Github from '@/components/landing/Github';
import Hero from '@/components/landing/Hero';
import Models from '@/components/landing/Models';
import Papers from '@/components/landing/Papers';
import Work from '@/components/landing/Projects';

export const sectionConfigs = {
  engineering: [
    { id: 'hero', component: Hero, props: {} },
    { id: 'experience', component: Experience, props: {} },
    { id: 'work', component: Work, props: {} },
    { id: 'models', component: Models, props: { compact: true } },
    { id: 'papers', component: Papers, props: { minimal: true } },
    { id: 'about', component: About, props: {} },
    { id: 'github', component: Github, props: {} },
    { id: 'blog', component: Blog, props: {} },
    { id: 'cta', component: CTA, props: {} },
  ],
  research: [
    { id: 'hero', component: Hero, props: {} },
    { id: 'experience', component: Experience, props: {} },
    { id: 'models', component: Models, props: { expanded: true } },
    { id: 'papers', component: Papers, props: { highlighted: true } },
    { id: 'work', component: Work, props: {} },
    { id: 'about', component: About, props: {} },
    { id: 'github', component: Github, props: {} },
    { id: 'blog', component: Blog, props: {} },
    { id: 'cta', component: CTA, props: {} },
  ],
};
