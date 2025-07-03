
import { Project } from './types';

export const PROJECTS_DATA: Project[] = [
  { 
    id: '1', 
    title: 'DESIGN CLUB', 
    categories: ['WEBDESIGN', 'WEBFLOW'], 
    imageUrl: 'http://localhost:5173/images/wisdom.jpg',
    liveLink: '#'
  },
  { 
    id: '2', 
    title: 'JOYEUX REPAS', 
    categories: ['BRANDING', 'FOOD INDUSTRY'], 
    imageUrl: 'http://localhost:5173/images/portfolio.jpg',
    liveLink: '#' 
  },
  { 
    id: '3', 
    title: 'STUDIO FUGU', 
    categories: ['LOCALIZATION', 'SAAS'], 
    imageUrl: 'http://localhost:5173/images/agency.jpg',
    liveLink: '#'
  },
  { 
    id: '4', 
    title: 'AKROLAB', 
    categories: ['CULTURE', 'CREATIVITY'], 
    imageUrl: 'http://localhost:5173/images/wisdom.jpg',
    liveLink: '#'
  },
  { 
    id: '5', 
    title: 'FACTOR E', 
    categories: ['INNOVATION', 'IMPACT'], 
    imageUrl: 'http://localhost:5173/images/portfolio.jpg',
    liveLink: '#'
  },
  { 
    id: '6', 
    title: 'DROP', 
    categories: ['SOCIAL', 'MARKETING'], 
    imageUrl: 'http://localhost:5173/images/agency.jpg',
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
    image: 'http://localhost:5173/images/wisdom.jpg',
    category: 'BLOG TEMPLATE',
    description: 'We Write Things About Arts, Design, History, Politics & Science.',
    topLabel: 'WISDOM'
  },
  {
    id: 2,
    title: 'Portfolio Pro',
    image: 'http://localhost:5173/images/portfolio.jpg',
    category: 'PORTFOLIO TEMPLATE',
    description: 'Showcase your creative work with this elegant, minimalist portfolio template.',
    topLabel: 'PORTFOLIO'
  },
  {
    id: 3,
    title: 'Agency Flow',
    image: 'http://localhost:5173/images/agency.jpg',
    category: 'AGENCY TEMPLATE',
    description: 'A professional template for creative agencies and design studios.',
    topLabel: 'AGENCY'
  },
  // Add more templates as needed
];
