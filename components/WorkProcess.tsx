import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Define the animated text segments for the explanation section
const EXPLANATION_TEXT = {
  prefix: 'I work with',
  animatedWords: [
    {
      id: 'individuals',
      text: 'individuals',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <circle cx="12" cy="7" r="4"></circle>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        </svg>
      ),
    },
    {
      id: 'studios',
      text: 'studios',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
        </svg>
      ),
    },
    {
      id: 'companies',
      text: 'companies',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
          <line x1="12" y1="6" x2="12" y2="10"></line>
          <line x1="12" y1="14" x2="12" y2="18"></line>
        </svg>
      ),
    },
  ],
  suffix: 'to turn their vision into powerful',
  finalWord: {
    id: 'websites',
    text: 'websites',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>
    ),
  },
};


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
  
  // Refs for animation elements
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const stepsRef = useRef<Array<HTMLDivElement | null>>(Array(WORK_PROCESS_STEPS.length).fill(null));
  
  // Refs for explanation section
  const explanationSectionRef = useRef<HTMLDivElement>(null);
  const explanationPrefixRef = useRef<HTMLSpanElement>(null);
  const explanationAnimatedWordsRef = useRef<Array<HTMLSpanElement | null>>(Array(EXPLANATION_TEXT.animatedWords.length).fill(null));
  const explanationIconsRef = useRef<Array<HTMLSpanElement | null>>(Array(EXPLANATION_TEXT.animatedWords.length).fill(null));
  const explanationSuffixRef = useRef<HTMLSpanElement>(null);
  const explanationFinalWordRef = useRef<HTMLSpanElement>(null);
  const explanationFinalIconRef = useRef<HTMLSpanElement>(null);
  const aboutButtonRef = useRef<HTMLAnchorElement>(null);

  // Set up scroll-driven animations
  useEffect(() => {
    if (!sectionRef.current) return;

    // Initially set all elements to be invisible
    gsap.set(headingRef.current, { opacity: 0, y: 30 });
    gsap.set(descriptionRef.current, { opacity: 0, y: 20 });
    stepsRef.current.forEach((step) => {
      if (step) gsap.set(step, { opacity: 0, y: 20 });
    });
    
    // Set initial state for explanation section elements
    gsap.set(explanationSectionRef.current, { opacity: 1 });
    gsap.set(explanationPrefixRef.current, { opacity: 0, y: 30 });
    
    // Set initial state for animated words and icons with stronger blur effect
    explanationAnimatedWordsRef.current.forEach((word) => {
      if (word) gsap.set(word, { opacity: 0, filter: 'blur(12px)', y: 20 });
    });
    
    explanationIconsRef.current.forEach((icon) => {
      if (icon) gsap.set(icon, { opacity: 0, scale: 0.2, rotation: -10 });
    });
    
    gsap.set(explanationSuffixRef.current, { opacity: 0, y: 30 });
    gsap.set(explanationFinalWordRef.current, { opacity: 0, filter: 'blur(12px)', y: 20 });
    gsap.set(explanationFinalIconRef.current, { opacity: 0, scale: 0.2, rotation: -10 });
    gsap.set(aboutButtonRef.current, { opacity: 0, y: 30 });
    
    // Create a timeline for scroll-based animations
    const tl = gsap.timeline({
      scrollTrigger: {
        // Use the ProjectGrid section as the trigger point
        trigger: "#works", 
        // Start animation when the bottom of ProjectGrid scrolls out of view
        start: "bottom 80%", 
        // End animation after scrolling a reasonable distance
        end: "bottom top", 
        // Smooth scrubbing effect tied to scroll position
        scrub: 0.5, 
        // Set to true for debugging
        markers: false, 
        // Play on enter, reverse on leave
        toggleActions: "play none none reverse",
        // Invalidate on refresh to ensure proper recalculation
        invalidateOnRefresh: true,
        // Anticipate user's scroll direction
        anticipatePin: 1
      }
    });

    // Label the start of the timeline
    tl.addLabel("start", 0);

    // Step A: Heading fades in
    tl.to(headingRef.current, { 
      opacity: 1, 
      y: 0, 
      duration: 0.3,
      ease: "power2.out" 
    }, "start");
    
    // Label for after heading animation
    tl.addLabel("headingDone", "start+=0.3");
    
    // Step B: Description fades in after heading
    tl.to(descriptionRef.current, { 
      opacity: 1, 
      y: 0, 
      duration: 0.3,
      ease: "power2.out" 
    }, "headingDone");
    
    // Label for after description animation
    tl.addLabel("descriptionDone", "headingDone+=0.3");
    
    // Step C: Each step card animates one at a time
    stepsRef.current.forEach((step, index) => {
      if (!step) return;
      
      const stepLabel = `step${index}`;
      const prevStepLabel = index === 0 ? "descriptionDone" : `step${index-1}+=0.2`;
      
      // Add label for this step
      tl.addLabel(stepLabel, prevStepLabel);
      
      // Animate the step
      tl.to(step, { 
        opacity: 1, 
        y: 0, 
        duration: 0.2,
        ease: "power2.out" 
      }, stepLabel);
    });
    
    // Label for after all steps are animated
    tl.addLabel("stepsDone", `step${WORK_PROCESS_STEPS.length-1}+=0.5`);
    
    // Create a separate timeline for the explanation section with its own scroll trigger
    const explanationTl = gsap.timeline({
      scrollTrigger: {
        trigger: explanationSectionRef.current,
        start: "top 80%", // Start earlier when the top of the section is 80% from the top of viewport
        end: "center 20%", // End when the center of the section is 20% from the top of viewport
        scrub: 0.8, // Smoother scrubbing effect for more natural animation
        markers: false,
        toggleActions: "play none none reverse",
        pin: false, // Don't pin the section
        anticipatePin: 1, // Anticipate pin to improve performance
      }
    });
    
    // Create floating animations for icons once they appear
    const createFloatingAnimation = (element: HTMLElement | null) => {
      if (!element) return;
      
      // Random values for more natural movement
      const randomY = Math.random() * 6 + 4; // Random value between 4-10
      const randomDuration = Math.random() * 1 + 2; // Random duration between 2-3 seconds
      
      gsap.to(element, {
        y: randomY,
        duration: randomDuration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 0.5, // Random delay for out-of-sync movement
      });
    };
    
    // Animate the prefix text first with a subtle fade and rise
    explanationTl.to(explanationPrefixRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power3.out"
    }, 0);
    
    // Animate each word and its icon sequentially with enhanced effects
    explanationAnimatedWordsRef.current.forEach((word, index) => {
      if (!word) return;
      
      // Calculate staggered start times with more spacing for dramatic effect
      const startTime = 0.4 + (index * 0.25);
      
      // Animate the word with enhanced blur transition
      explanationTl.to(word, {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 0.5,
        ease: "power3.out"
      }, startTime);
      
      // Animate the icon with a more dramatic entrance
        if (explanationIconsRef.current[index]) {
          explanationTl.to(explanationIconsRef.current[index], {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.4,
            ease: "back.out(2.5)", // More pronounced bounce effect
            onComplete: () => createFloatingAnimation(explanationIconsRef.current[index])
          }, startTime + 0.15);
        }
    });
    
    // Animate the suffix text with slightly longer delay for rhythm
    const suffixStartTime = 0.4 + (explanationAnimatedWordsRef.current.length * 0.25) + 0.3;
    explanationTl.to(explanationSuffixRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power3.out"
    }, suffixStartTime);
    
    // Animate the final word and icon with more emphasis
    const finalWordStartTime = suffixStartTime + 0.4;
    explanationTl.to(explanationFinalWordRef.current, {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      duration: 0.5,
      ease: "power3.out"
    }, finalWordStartTime);
    
    explanationTl.to(explanationFinalIconRef.current, {
       opacity: 1,
       scale: 1,
       rotation: 0,
       duration: 0.4,
       ease: "back.out(2.5)", // More pronounced bounce effect
       onComplete: () => createFloatingAnimation(explanationFinalIconRef.current)
     }, finalWordStartTime + 0.15);
    
    // Animate the about button with a slight delay and more dramatic entrance
    explanationTl.to(aboutButtonRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power3.out"
    }, finalWordStartTime + 0.6);

    // Clean up ScrollTrigger on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="w-full py-32 bg-black text-white mt-20 relative z-50"
      aria-label="My Work Process"
      id="work-process"
    >
      <div className="container mx-auto px-6 max-w-6xl">
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
      
      {/* Explanation Section - Fullscreen Value Proposition */}
      <div 
        ref={explanationSectionRef}
        className="min-h-screen flex items-center justify-center bg-black py-24 mt-32 border-t border-neutral-800"
      >
        <div className="max-w-4xl mx-auto text-center px-6">
          <p className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-16 max-w-[70%] mx-auto">
            <span ref={explanationPrefixRef} className="block mb-4 md:mb-6 opacity-90">I work with</span>
            
            {EXPLANATION_TEXT.animatedWords.map((word, index) => (
              <React.Fragment key={word.id}>
                <span 
                  className="relative inline-flex items-center font-bold" 
                  ref={el => { explanationAnimatedWordsRef.current[index] = el; }}
                >
                  {word.text}
                  <span 
                    className="inline-flex ml-2 transform" 
                    ref={el => { explanationIconsRef.current[index] = el; }}
                  >
                    {word.icon}
                  </span>
                </span>
                {index < EXPLANATION_TEXT.animatedWords.length - 1 && (
                  <span className="mx-2">{index === EXPLANATION_TEXT.animatedWords.length - 2 ? ' and ' : ', '}</span>
                )}
              </React.Fragment>
            ))}
            
            <span ref={explanationSuffixRef} className="block my-4 md:my-6 opacity-90"> {EXPLANATION_TEXT.suffix} </span>
            
            <span 
              className="relative inline-flex items-center font-bold" 
              ref={explanationFinalWordRef}
            >
              {EXPLANATION_TEXT.finalWord.text}
              <span 
                className="inline-flex ml-2 transform" 
                ref={explanationFinalIconRef}
              >
                {EXPLANATION_TEXT.finalWord.icon}
              </span>
            </span>
            <span>.</span>
          </p>
          
          <a 
            href="#about" 
            className="inline-flex items-center mt-12 px-8 py-4 bg-white text-black font-medium rounded-none transition-all duration-300 relative overflow-hidden group transform hover:translate-y-[-2px]" 
            ref={aboutButtonRef}
          >
            <span className="absolute inset-0 w-0 bg-neutral-200 transition-all duration-300 ease-out group-hover:w-full"></span>
            <span className="relative flex items-center gap-2">
              <span className="w-2 h-2 bg-black rounded-full"></span>
              ABOUT ME
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};