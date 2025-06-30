import React, { useEffect, useRef, useState } from 'react';
import { templateShowcaseAnimations } from '../utils/animations';
import gsap from 'gsap';

import { TemplateShowcaseProps } from '../types';

import { TEMPLATES_DATA } from '../constants';

export const TemplateShowcase: React.FC<TemplateShowcaseProps> = ({ isVisible }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
  const liveRegionRef = useRef<HTMLDivElement>(null);

  const TEMPLATES = TEMPLATES_DATA;

  useEffect(() => {
    if (!isVisible || !sectionRef.current) return;

    const headerAnimation = templateShowcaseAnimations.header(sectionRef.current.querySelector('.template-header') as HTMLElement);
    const ctaAnimation = templateShowcaseAnimations.cta(sectionRef.current.querySelector('.template-cta') as HTMLElement);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top center',
        end: 'bottom center',
        toggleActions: 'play none none reverse'
      }
    });

    tl.add(headerAnimation).add(ctaAnimation, '-=0.4');

    return () => {
      tl.kill();
    };
  }, [isVisible]);

  useEffect(() => {
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = `Now viewing ${TEMPLATES[currentIndex].title}, ${TEMPLATES[currentIndex].category}`;
    }
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        handleNavigation('up');
      } else if (event.key === 'ArrowDown') {
        handleNavigation('down');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex]);

  const handleNavigation = (direction: 'up' | 'down') => {
    // Calculate the new index based on direction
    const newIndex = direction === 'up' 
      ? (currentIndex - 1 + TEMPLATES_DATA.length) % TEMPLATES_DATA.length
      : (currentIndex + 1) % TEMPLATES_DATA.length;

    // Get all card elements
    const cards = Array.from(cardsRef.current?.children || []) as HTMLElement[];
    const { exit, enter } = templateShowcaseAnimations.cardTransition(direction, cards);

    // First slightly fade all cards
    exit().then(() => {
      // Update the current index state
      setCurrentIndex(newIndex);
      
      // Allow a brief moment for React to update the DOM with new positions
      setTimeout(() => {
        // Then animate cards to their new positions
        enter();
      }, 50);
    });
  };

  return (
    <section
      id="templates"
      className="relative py-24 bg-neutral-950 overflow-hidden min-h-screen flex flex-col items-center justify-center"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4 text-center mb-16">
        <h2 className="template-header text-5xl md:text-6xl font-bold mb-8 text-white tracking-tight">
          Template Showcase
        </h2>
        <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10">
          A collection of minimalist, professional templates designed for various purposes.
        </p>
        <div className="template-cta flex items-center justify-center gap-8">
          <a
            href="#"
            className="inline-block px-8 py-3 bg-white/10 hover:bg-white/20 transition-colors border border-white/20 text-white font-medium"
          >
            See More
          </a>
          <a
            href="https://behance.net"
            className="text-white/70 hover:text-white transition-colors flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            See on Behance
            <span className="text-lg">↗</span>
          </a>
        </div>
      </div>

      <div className="relative w-full max-w-4xl mx-auto">
        {/* Navigation Controls */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
          <button
            className="w-12 h-12 flex items-center justify-center bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all hover:scale-105 hover:shadow-lg group"
            onClick={() => handleNavigation('up')}
            aria-label="Previous template"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <button
            className="w-12 h-12 flex items-center justify-center bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all hover:scale-105 hover:shadow-lg group"
            onClick={() => handleNavigation('down')}
            aria-label="Next template"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300 group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <div
          ref={liveRegionRef}
          className="sr-only"
          aria-live="polite"
          aria-atomic="true"
        ></div>

        {/* Template Cards Stack */}
        <div ref={cardsRef} className="relative h-[550px] w-full overflow-hidden perspective-[1000px]">
          {TEMPLATES.map((template, index) => {
            // Calculate position in the stack relative to current index
            const position = index - currentIndex;
            const isActive = position === 0;
            // Set z-index so cards further from current have lower z-index
            const zIndex = TEMPLATES.length - Math.abs(position);
            // Define the maximum number of visible cards in the stack (current + 2 next)
            const maxVisiblePosition = 2; // Show current card + 2 cards below it
            
            // Calculate opacity based on position in stack
            // Active card is fully visible, cards further down the stack are increasingly dimmed
            const opacity = position === 0 ? 1 : 
                          (position > 0 && position <= maxVisiblePosition) ? Math.max(0.7 - (position * 0.2), 0.2) : 0;
            
            // Apply consistent top offset for stacking effect
            // Hide cards that are too far down in the stack or before current index
            const topOffset = (position >= 0 && position <= maxVisiblePosition) 
              ? position * 30 
              : 1000; // Push other cards way off screen
            
            return (
              <div
                  key={template.id}
                  className={`template-card absolute left-0 right-0 mx-auto w-full max-w-4xl h-[450px] transition-all duration-500 rounded-lg overflow-hidden shadow-lg ${isActive ? 'hover:scale-[1.02] shadow-[0_0_30px_rgba(10,30,60,0.5)]' : 'blur-[0.5px] grayscale-[20%] shadow-[0_5px_15px_rgba(0,0,0,0.2)]'}`}
                  style={{
                top: `${topOffset}px`,
                opacity: position >= 0 ? opacity : 0, // Hide previous cards completely
                zIndex,
                transform: position > 0 && position <= maxVisiblePosition ? `rotateX(${position * 2}deg)` : 'none',
                transformOrigin: 'center top',
              }}
              >
                <div className="relative w-full h-full bg-[#0a1e3c] rounded-lg overflow-hidden">
                  {/* Top bar with category */}
                  <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 z-10">
                    <div className="text-xs font-medium text-white/70 uppercase tracking-wider">
                      {template.topLabel}
                    </div>
                    <div className="text-xs font-medium text-white/70 uppercase tracking-wider">
                      {template.category}
                    </div>
                  </div>
                  
                  {/* Main content - Template image */}
                  <div className="w-full h-full flex items-center justify-center overflow-hidden">
                    <img 
                      src={template.image} 
                      alt={template.title} 
                      className={`w-full h-full object-cover transition-transform duration-700 ${isActive ? 'hover:scale-105' : ''}`}
                    />
                  </div>
                  
                  {/* Overlay with title and description */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <div className={`transform transition-transform duration-500 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-90'}`}>
                        <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">{template.title}</h3>
                        <p className="text-white/70 text-sm md:text-base max-w-md mb-4">
                          {template.description}
                        </p>
                        {isActive && (
                          <button className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm transition-colors duration-300 inline-flex items-center gap-2 group">
                            View Template
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </button>
                        )}
                      </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};