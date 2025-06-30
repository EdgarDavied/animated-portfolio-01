
export interface Project {
  id: string;
  title: string;
  categories: string[];
  imageUrl: string;
  liveLink?: string;
}

export enum AnimationStage {
  INITIAL,                 // Page just loaded, nothing shown or pre-animation state
  HERO_LINE_1_IN,          // First line of hero text ("CRAFTING BOLD &") animates in
  HERO_LINE_2_IN,          // Second line of hero text ("MEMORABLE WEBSITES") animates in
  HERO_SCALING_DOWN,       // Both hero lines are visible, now they scale down and move up
  NAV_FADE_IN,             // Navigation (logo, links, contact button) fades in
  SUBHEADING_FADE_IN,      // Subheading below hero text fades in
  PROJECTS_FADE_IN,        // Project grid fades in
  COMPLETE                 // All initial animations are done
}

export interface Template {
  id: number;
  title: string;
  image: string;
  category: string;
  description: string;
  topLabel: string;
}

export interface TemplateShowcaseProps {
  isVisible: boolean;
}
