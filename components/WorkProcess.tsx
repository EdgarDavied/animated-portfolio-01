import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EXPLANATION_TEXT = {
  line1: {
    prefix: 'I work with',
    word: {
      id: 'individuals',
      text: 'Individuals',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <circle cx="12" cy="7" r="4"></circle>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        </svg>
      ),
    },
  },
  line2: {
    id: 'studios-companies',
    text: 'studios and companies',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
        <line x1="12" y1="6" x2="12" y2="10"></line>
        <line x1="12" y1="14" x2="12" y2="18"></line>
      </svg>
    ),
  },
  line3: 'to turn visions into',
  line4: {
    id: 'websites',
    text: 'powerful websites',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>
    ),
  },
};

interface WorkProcessProps {
  isVisible?: boolean;
}

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

export const WorkProcess: React.FC<WorkProcessProps> = ({ isVisible = false }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const explanationSectionRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (!isVisible || !sectionRef.current) return;

    const heading = sectionRef.current.querySelector('h2');
    const paragraph = sectionRef.current.querySelector('p');
    const steps = sectionRef.current.querySelectorAll('.step-item');
    const explanation = explanationSectionRef.current;

    // Kill previous ScrollTriggers to avoid conflicts
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Set initial states
    gsap.set([heading, paragraph, ...steps, explanation], { opacity: 0, y: 30 });
    gsap.set(sectionRef.current, { opacity: 1 });


    // Main section animation
    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    if (heading) {
      mainTl.to(heading, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
    }
    if (paragraph) {
      mainTl.to(paragraph, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4');
    }
    if (steps.length > 0) {
      mainTl.to(steps, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.2,
        ease: 'power3.out',
      }, '-=0.4');
    }

    // Explanation section animation
    if (explanation) {
      gsap.fromTo(
        explanation,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: explanation,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className={`w-full py-32 bg-black text-white mt-20 relative z-30 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      aria-label="My Work Process"
      id="work-process"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider mb-8">
            My Work Process
          </h2>
          <p className="text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            From deep research to final launch, here's how I bring projects to life—methodically, creatively, without the fluff.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-12 md:gap-16 lg:gap-24">
          {WORK_PROCESS_STEPS.map((step) => (
            <div key={step.id} className="flex flex-col items-center w-40 step-item">
              <div className="w-28 h-28 rounded-full border border-white flex items-center justify-center mb-8 transition-all duration-300 hover:border-2 hover:scale-105">
                <div className="text-white">{step.icon}</div>
              </div>
              <h3 className="text-xl font-medium uppercase tracking-wide text-center">{step.label}</h3>
            </div>
          ))}
        </div>
      </div>

      <div
        ref={explanationSectionRef}
        className="min-h-screen flex items-center justify-center bg-black py-24 mt-32 border-t border-neutral-800"
      >
        <div className="max-w-4xl mx-auto text-center px-6">
          <div className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight tracking-tight mb-16 max-w-[95%] mx-auto flex flex-col items-center justify-center">
            <div className="mb-4 md:mb-5">
              <span className="inline opacity-90">{EXPLANATION_TEXT.line1.prefix}</span>{' '}
              <span className="relative inline-flex items-center font-medium">
                {EXPLANATION_TEXT.line1.word.text}
                <span className="inline-flex ml-1 transform">{EXPLANATION_TEXT.line1.word.icon}</span>
              </span>
              <span className="mx-1">, </span>
              <span className="relative inline-flex items-center font-medium">
                studios
                <span className="inline-flex ml-1 transform">{EXPLANATION_TEXT.line2.icon}</span>
                {' and companies'}
              </span>
            </div>
            <div className="mb-4 md:mb-5">
              <span className="inline opacity-90">{EXPLANATION_TEXT.line3}</span>
            </div>
            <div>
              <span className="relative inline-flex items-center font-medium">
                {EXPLANATION_TEXT.line4.text}
                <span className="inline-flex ml-1 transform">{EXPLANATION_TEXT.line4.icon}</span>
              </span>
            </div>
          </div>
          <a
            href="#about"
            className="inline-flex items-center mt-12 px-8 py-4 bg-white text-black font-medium rounded-none transition-all duration-300 relative overflow-hidden group transform hover:translate-y-[-2px] hover:shadow-lg"
          >
            <span className="absolute inset-0 w-0 bg-neutral-200 transition-all duration-300 ease-out group-hover:w-full"></span>
            <span className="relative z-10 tracking-wider">ABOUT ME</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 relative z-10 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};