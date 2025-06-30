
import { Project } from './types';

export const PROJECTS_DATA: Project[] = [
  { 
    id: '1', 
    title: 'DESIGN CLUB', 
    categories: ['WEBDESIGN', 'WEBFLOW'], 
    imageUrl: 'https://picsum.photos/seed/designclub/800/600',
    liveLink: '#'
  },
  { 
    id: '2', 
    title: 'JOYEUX REPAS', 
    categories: ['BRANDING', 'FOOD INDUSTRY'], 
    imageUrl: 'https://picsum.photos/seed/joyeuxrepas/800/600',
    liveLink: '#' 
  },
  { 
    id: '3', 
    title: 'STUDIO FUGU', 
    categories: ['LOCALIZATION', 'SAAS'], 
    imageUrl: 'https://picsum.photos/seed/studiofugu/800/600',
    liveLink: '#'
  },
  { 
    id: '4', 
    title: 'AKROLAB', 
    categories: ['CULTURE', 'CREATIVITY'], 
    imageUrl: 'https://picsum.photos/seed/akrolab/800/600',
    liveLink: '#'
  },
  { 
    id: '5', 
    title: 'FACTOR E', 
    categories: ['INNOVATION', 'IMPACT'], 
    imageUrl: 'https://picsum.photos/seed/factore/800/600',
    liveLink: '#'
  },
  { 
    id: '6', 
    title: 'DROP', 
    categories: ['SOCIAL', 'MARKETING'], 
    imageUrl: 'https://picsum.photos/seed/drop/800/600',
    liveLink: '#'
  },
];

export const NAV_LINKS = [
  { label: 'HOME', href: '#' },
  { label: 'WORKS', href: '#works' },
  { label: 'ABOUT', href: '#about' },
  { label: 'TEMPLATES', href: '#templates' },
];

import { Template } from './types';

export const TEMPLATES_DATA: Template[] = [
  {
    id: 1,
    title: 'Wisdom Blog',
    image: '/images/wisdom.jpg',
    category: 'BLOG TEMPLATE',
    description: 'We Write Things About Arts, Design, History, Politics & Science.',
    topLabel: 'WISDOM'
  },
  {
    id: 2,
    title: 'Portfolio Pro',
    image: '/images/portfolio.jpg',
    category: 'PORTFOLIO TEMPLATE',
    description: 'Showcase your creative work with this elegant, minimalist portfolio template.',
    topLabel: 'PORTFOLIO'
  },
  {
    id: 3,
    title: 'Agency Flow',
    image: '/images/agency.jpg',
    category: 'AGENCY TEMPLATE',
    description: 'A professional template for creative agencies and design studios.',
    topLabel: 'AGENCY'
  },
  // Add more templates as needed
];
