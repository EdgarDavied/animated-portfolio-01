
import React from 'react';
import { NAV_LINKS } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-16 bg-white border-t border-neutral-200">
      <div className="container mx-auto px-6 md:px-12">
        {/* Top Section with CTA */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
          <div className="mb-8 md:mb-0 max-w-4xl">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase">
              Have a project in mind?<br />
              Let's talk about it!
            </h2>
          </div>
          <div>
            <a 
              href="#contact" 
              className="inline-block px-6 py-2 border border-black hover:bg-black hover:text-white transition-colors duration-300 text-sm font-medium rounded-none"
            >
              DISCOVER
            </a>
          </div>
        </div>
        
        {/* Middle Section with Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-6 border-t border-neutral-200">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-medium">Works</h3>
          </div>
          
          <div className="flex space-x-8">
            {/* Social Media Icons */}
            <a href="#" aria-label="LinkedIn" className="text-black hover:text-neutral-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="#" aria-label="Dribbble" className="text-black hover:text-neutral-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path>
              </svg>
            </a>
            <a href="#" aria-label="Website" className="text-black hover:text-neutral-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
            </a>
            <a href="#" aria-label="Email" className="text-black hover:text-neutral-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          </div>
        </div>
        
        {/* Bottom Section with Sitemap and Copyright */}
        <div className="flex flex-col md:flex-row justify-between pt-6">
          <div className="mb-6 md:mb-0">
            <p className="text-xs uppercase text-neutral-500 font-medium tracking-wider mb-3">SITEMAP</p>
            <nav className="flex flex-col space-y-1">
              {NAV_LINKS.map(link => (
                <a 
                  key={link.label} 
                  href={link.href} 
                  className="text-xs uppercase text-black hover:text-neutral-600 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a href="#contact" className="text-xs uppercase text-black hover:text-neutral-600 transition-colors">CONTACT</a>
            </nav>
          </div>
          
          <div className="text-right">
            <p className="text-xs uppercase text-neutral-500 font-medium tracking-wider">ELIOT BERGON © 2023</p>
            <p className="text-xs uppercase text-neutral-500 font-medium tracking-wider mt-1">DESIGN & CREDITS</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
