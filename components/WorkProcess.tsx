import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface WorkProcessProps {
  // This will be used to trigger the animation when the component is in view
  isVisible?: boolean;
}

// Define the work process steps
const WORK_PROCESS_STEPS = [
  {
    id: 'research',
    label: 'Research',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    ),
  },
  {
    id: 'analyze',
    label: 'Analyze',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
      </svg>
    ),
  },
  {
    id: 'design',
    label: 'Design',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
        <path d="M2 2l7.586 7.586"></path>
        <circle cx="11" cy="11" r="2"></circle>
      </svg>
    ),
  },
  {
    id: 'launch',
    label: 'Launch',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M22 2L11 13"></path>
        <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
      </svg>
    ),
  },
];

export const WorkProcess: React.FC<WorkProcessProps> = ({ isVisible = true }) => {
  const [isAnimated, setIsAnimated] = useState(false);
  
  // Refs for animation elements
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const stepsRef = useRef<Array<HTMLDivElement | null>>(Array(WORK_PROCESS_STEPS.length).fill(null));

  // Set up manual animation without ScrollTrigger
  useEffect(() => {
    if (!isVisible || isAnimated) return;
    
    // Simple animation sequence with delays
    const animateElements = () => {
      // Animate heading
      gsap.fromTo(headingRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
      
      // Animate description after heading
      gsap.fromTo(descriptionRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.6, delay: 0.3, ease: 'power2.out' }
      );
      
      // Animate steps with staggered delay
      gsap.fromTo(stepsRef.current, 
        { opacity: 0, y: 20 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          delay: 0.6, 
          stagger: 0.15, 
          ease: 'back.out(1.7)' 
        }
      );
      
      setIsAnimated(true);
    };
    
    // Start animation after a short delay
    const timer = setTimeout(animateElements, 500);
    
    return () => clearTimeout(timer);
  }, [isVisible, isAnimated]);

  return (
    <section 
      ref={sectionRef}
      className="w-full py-32 bg-black text-white mt-20"
      aria-label="My Work Process"
      id="work-process"
    >
      <div className="container mx-auto px-6 max-w-6xl" style={{ opacity: 1 }}>
        <div className="text-center mb-20">
          <h2 
            ref={headingRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider mb-8"
          >
            My Work Process
          </h2>
          <p 
            ref={descriptionRef}
            className="text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed"
          >
            From deep research to final launch, here's how I bring projects to life—methodically, creatively, without the fluff.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-12 md:gap-16 lg:gap-24">
          {WORK_PROCESS_STEPS.map((step, index) => (
            <div 
              key={step.id}
              ref={el => { stepsRef.current[index] = el; }}
              className="flex flex-col items-center w-40"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-28 h-28 rounded-full border border-white flex items-center justify-center mb-8 transition-all duration-300 hover:border-2 hover:scale-105">
                <div className="text-white">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-xl font-medium uppercase tracking-wide text-center">{step.label}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};