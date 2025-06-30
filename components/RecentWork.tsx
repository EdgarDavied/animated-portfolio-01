import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS_DATA } from '../constants';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface RecentWorkProps {
  isVisible?: boolean;
}

export const RecentWork: React.FC<RecentWorkProps> = ({ isVisible = true }) => {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<(HTMLDivElement | null)[]>([]);
  const leftPreviewRef = useRef<HTMLDivElement>(null);
  const rightPreviewRef = useRef<HTMLDivElement>(null);

  // Set first project as active by default
  useEffect(() => {
    if (PROJECTS_DATA.length > 0) {
      setActiveProject(PROJECTS_DATA[0].id);
    }
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !isVisible) return;

    // Initialize GSAP animations
    gsap.set(sectionRef.current, { opacity: 0 });
    gsap.set(projectsRef.current, { opacity: 0.3, y: 20 });
    gsap.set([leftPreviewRef.current, rightPreviewRef.current], { opacity: 0, scale: 0.95 });

    // Create scroll trigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
        markers: false,
      },
    });

    tl.to(sectionRef.current, {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
    })
    .to(projectsRef.current, {
      opacity: (i) => PROJECTS_DATA[i].id === activeProject ? 1 : 0.3,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
    }, "-=0.4")
    .to([leftPreviewRef.current, rightPreviewRef.current], {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
    }, "-=0.3");

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      tl.kill();
    };
  }, [activeProject]);

  const handleProjectHover = (projectId: string) => {
    setActiveProject(projectId);
    const project = PROJECTS_DATA.find(p => p.id === projectId);
    
    if (!project) return;

    // Animate left preview with slide-in and scale effect
    gsap.to(leftPreviewRef.current, {
      opacity: 1,
      scale: 1,
      x: 0,
      duration: 0.6,
      ease: 'power3.out',
    });

    // Animate right preview with a different animation
    gsap.to(rightPreviewRef.current, {
      opacity: 1,
      scale: 1,
      x: 0,
      duration: 0.6,
      ease: 'power3.out',
    });

    // Create a more dramatic effect for project titles
    projectsRef.current.forEach((ref, index) => {
      if (ref) {
        const isActive = PROJECTS_DATA[index].id === projectId;
        
        // More dramatic animation for active project
        gsap.to(ref, {
          opacity: isActive ? 1 : 0.15,  // More contrast between active and inactive
          scale: isActive ? 1.05 : 0.92,  // Subtle scale difference
          x: isActive ? 30 : 0,           // More pronounced movement
          fontWeight: isActive ? 'bold' : 'normal',
          letterSpacing: isActive ? '0.02em' : 'normal',
          duration: 0.5,
          ease: 'power3.out',
        });
        
        // Add a subtle color animation for the active project
        if (isActive) {
          gsap.fromTo(ref, 
            { textShadow: 'none' },
            { 
              textShadow: '0 0 10px rgba(255,255,255,0.3)', 
              duration: 0.8,
              ease: 'power2.inOut'
            }
          );
        }
      }
    });
  };

  // We're not using handleProjectLeave anymore since we want to keep one project active at all times
  const handleProjectLeave = () => {
    // Instead of resetting to null, we could optionally reset to the first project
    // setActiveProject(PROJECTS_DATA[0].id);
    
    // Or we can keep the current active project
    // This function is kept for potential future use
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-neutral-950 py-24 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-neutral-800 z-10"
      id="recent-works"
    >
      {/* Intro Header */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-16 md:mb-24">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <h2 className="text-xl md:text-2xl font-light tracking-tight text-neutral-200">
            Here is a selection of my most recent works
          </h2>
          <svg
            className="w-5 h-5 text-neutral-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <span className="text-sm text-neutral-400 opacity-60 transform transition-all duration-300 hover:opacity-100">
          Hover on names for a closer look
        </span>
      </div>

      {/* Project List and Previews Container */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative">
        {/* Left Preview */}
        <div
          ref={leftPreviewRef}
          className="hidden md:block md:col-span-4 sticky top-24 h-[70vh] overflow-hidden rounded-lg opacity-0 transform translate-x-[-20px]"
          style={{ transformOrigin: 'center left' }}
        >
          {activeProject && (
            <img
              src={PROJECTS_DATA.find(p => p.id === activeProject)?.imageUrl}
              alt="Project preview"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          )}
        </div>

        {/* Project List */}
        <div className="md:col-span-4 flex flex-col items-start justify-center space-y-12 py-12">
          {PROJECTS_DATA.map((project, index) => (
            <div
              key={project.id}
              ref={el => { projectsRef.current[index] = el; }}
              className={`text-4xl md:text-5xl lg:text-6xl font-mono tracking-tight cursor-pointer transition-all duration-500 ease-out relative ${activeProject === project.id ? 'text-white' : 'text-neutral-500'}`}
              onMouseEnter={() => handleProjectHover(project.id)}
              onMouseLeave={handleProjectLeave}
            >
              <span className="relative z-10 inline-block">
                {project.title}
                {activeProject === project.id && (
                  <span className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full opacity-70"></span>
                )}
              </span>
              <div className="text-xs text-neutral-500 mt-2 tracking-wider">
                {project.categories.join(' • ')}
              </div>
            </div>
          ))}
          
          <a href="#works" className="mt-12 inline-flex items-center text-sm text-neutral-400 hover:text-white transition-colors duration-300 group">
            <span className="group-hover:underline">SEE ALL WORKS</span>
            <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>

        {/* Right Preview - Floating UI Elements */}
        <div
          ref={rightPreviewRef}
          className="hidden md:block md:col-span-4 sticky top-24 h-[70vh] overflow-hidden opacity-0 transform translate-x-[20px]"
          style={{ transformOrigin: 'center right' }}
        >
          {activeProject && (
            <div className="relative w-full h-full">
              {/* Main image slightly rotated */}
              <div className="absolute top-[10%] right-[5%] w-[80%] h-[60%] rounded-lg overflow-hidden shadow-2xl transform rotate-2 transition-all duration-700 hover:rotate-0">
                <img
                  src={PROJECTS_DATA.find(p => p.id === activeProject)?.imageUrl}
                  alt="Project UI element"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Secondary floating element */}
              <div className="absolute bottom-[15%] left-[10%] w-[60%] h-[40%] rounded-lg overflow-hidden shadow-2xl transform -rotate-3 transition-all duration-700 hover:rotate-0">
                <img
                  src={PROJECTS_DATA.find(p => p.id === activeProject)?.imageUrl}
                  alt="Project UI element"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile preview (only visible on small screens) */}
      <div className="block md:hidden mt-8">
        {activeProject && (
          <div className="rounded-lg overflow-hidden h-[40vh] shadow-lg">
            <img
              src={PROJECTS_DATA.find(p => p.id === activeProject)?.imageUrl}
              alt="Project preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        {/* Mobile view project link */}
        {activeProject && PROJECTS_DATA.find(p => p.id === activeProject)?.liveLink && (
          <a 
            href={PROJECTS_DATA.find(p => p.id === activeProject)?.liveLink || '#'} 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center text-sm text-neutral-400 hover:text-white transition-colors duration-300 group"
          >
            <span className="group-hover:underline">VIEW PROJECT</span>
            <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        )}
      </div>
    </section>
  );
};