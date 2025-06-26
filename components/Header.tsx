
import React from 'react';
import { AnimationStage } from '../types';
import { NAV_LINKS } from '../constants';

const Logo: React.FC = () => (
  <a href="#" aria-label="Homepage">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-white hover:text-neutral-300 transition-colors">
      <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.5" />
      <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16px" fontWeight="600" fill="currentColor">e</text>
    </svg>
  </a>
);

const Navigation: React.FC = () => (
  <nav className="space-x-6 md:space-x-8">
    {NAV_LINKS.map(link => (
      <a 
        key={link.label} 
        href={link.href} 
        className="text-sm uppercase tracking-wider text-neutral-400 hover:text-white transition-colors duration-300"
      >
        {link.label}
      </a>
    ))}
  </nav>
);

const ContactButton: React.FC = () => (
  <a 
    href="#contact" 
    className="flex items-center space-x-2 bg-neutral-800 hover:bg-neutral-700 text-white text-sm uppercase tracking-wider py-2 px-4 rounded-md transition-colors duration-300"
  >
    <span className="w-2 h-2 bg-white rounded-full"></span>
    <span>Contact</span>
  </a>
);

interface HeaderProps {
  currentStage: AnimationStage;
}

export const Header: React.FC<HeaderProps> = ({ currentStage }) => {
  const isNavVisible = currentStage >= AnimationStage.NAV_FADE_IN;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 p-4 md:p-6 transition-opacity duration-1000 ease-in-out
                  ${isNavVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Logo />
        <div className="hidden md:flex">
          <Navigation />
        </div>
        <ContactButton />
      </div>
      {/* Mobile navigation placeholder - could be a dropdown */}
      <div className="md:hidden flex justify-center mt-4">
          <Navigation />
      </div>
    </header>
  );
};
