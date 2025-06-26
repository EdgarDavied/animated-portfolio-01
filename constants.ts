
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
