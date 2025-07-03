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

  // Don't set any project as active by default - only show on hover
  useEffect(() => {
    // Initialize with no active project
    setActiveProject(null);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !isVisible) return;

    // Initialize GSAP animations
    gsap.set(sectionRef.current, { opacity: 0 });
    gsap.set(projectsRef.current, { opacity: 0.3, y: 20 });
    
    // Initialize thumbnail scales only - let CSS handle container visibility
    const projectContainers = document.querySelectorAll('.mb-16');
    projectContainers.forEach((container) => {
      // Get left and right preview containers
      const leftPreview = container.querySelector('.md\\:block.w-1\\/4:first-of-type');
      const rightPreview = container.querySelector('.md\\:flex.w-1\\/4:last-of-type');
      
      // Set initial states for thumbnails only - don't touch container opacity/position
      if (leftPreview) {
        const thumbnails = leftPreview.querySelectorAll('div.rounded-lg');
        gsap.set(thumbnails, { scale: 1 });
      }
      
      if (rightPreview) {
        const thumbnail = rightPreview.querySelector('div.rounded-lg');
        if (thumbnail) {
          gsap.set(thumbnail, { scale: 1 });
        }
      }
    });

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
      opacity: 0.3, // All projects start with same opacity when no project is active
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
    }, "-=0.4");
    
    // We don't animate the previews on initial load anymore
    // They will be shown/hidden based on hover state via CSS transitions

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      tl.kill();
    };
  }, [activeProject, isVisible]);

  // Animation for project hover
  const handleProjectHover = (projectId: string) => {
    // If already active, don't do anything
    if (activeProject === projectId) return;
    
    setActiveProject(projectId);
    const project = PROJECTS_DATA.find(p => p.id === projectId);
    
    if (!project) return;

    // Find the project index and container
    const projectIndex = PROJECTS_DATA.findIndex(p => p.id === projectId);
    const projectContainers = document.querySelectorAll('.mb-16');
    const projectContainer = projectContainers[projectIndex];
    
    if (!projectContainer) return;
    
    // The CSS transitions will handle showing/hiding the preview containers
    // based on the activeProject state
    
    // Get the left and right preview containers for this project
    const leftPreview = projectContainer.querySelector('.md\\:block.w-1\\/4:first-of-type');
    const rightPreview = projectContainer.querySelector('.md\\:flex.w-1\\/4:last-of-type');
    
    // Animate thumbnails inside the left preview
    if (leftPreview) {
      const thumbnails = leftPreview.querySelectorAll('div.rounded-lg');
      gsap.to(thumbnails, {
        scale: 1.05,
        duration: 0.4,
        stagger: 0.08,
        ease: 'power2.out',
        delay: 0.1, // Small delay to let the container appear first
      });
    }

    // Animate thumbnail inside the right preview
    if (rightPreview) {
      const rightPreviewThumbnail = rightPreview.querySelector('div.rounded-lg');
      gsap.to(rightPreviewThumbnail, {
        scale: 1.05,
        duration: 0.4,
        ease: 'power2.out',
        delay: 0.1, // Small delay to let the container appear first
      });
    }

    // Animate project titles
    projectsRef.current.forEach((ref, index) => {
      if (ref) {
        const isActive = PROJECTS_DATA[index].id === projectId;
        
        gsap.to(ref, {
          opacity: isActive ? 1 : 0.15,
          scale: isActive ? 1.03 : 0.95,
          duration: 0.4,
          ease: 'power2.out',
        });
        
        // Add a subtle glow effect for the active project
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

  // Reset active project when mouse leaves
  const handleProjectLeave = () => {
    // Set no project as active when mouse leaves
    setActiveProject(null);
    
    // Reset all project titles to default state
    projectsRef.current.forEach((ref) => {
      if (ref) {
        gsap.to(ref, {
          opacity: 0.3,
          scale: 1,
          textShadow: 'none',
          duration: 0.4,
          ease: 'power2.out',
        });
      }
    });
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

      {/* Project List with Inline Previews */}
      <div className="w-full max-w-6xl mx-auto">
        {PROJECTS_DATA.map((project, index) => (
          <div key={project.id} className="mb-16 relative">
            {/* Project Row - Contains project name and previews */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative">
              {/* Left Preview Container - Only visible when this project is hovered */}
              <div 
                className={`hidden md:block w-1/4 ${activeProject === project.id ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-[-20px]'} transition-all duration-400 ease-out ${activeProject === project.id ? 'pointer-events-auto' : 'pointer-events-none'}`}
                ref={index === 0 ? leftPreviewRef : undefined}
              >
                {/* Always show thumbnails, not just for active project */}
                  <div className="flex flex-row gap-3 w-full">
                    {/* First thumbnail */}
                    <div className="w-1/2 aspect-[3/2] rounded-lg overflow-hidden shadow-md relative">
                      <img
                        src={`/images/${project.id === '1' ? 'wisdom.jpg' : project.id === '2' ? 'portfolio.jpg' : 'agency.jpg'}`}
                        alt={`${project.title} preview 1`}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        onLoad={(e) => console.log(`Image loaded successfully: ${e.currentTarget.src}`)}
                        onError={(e) => console.error(`Error loading image: ${e.currentTarget.src}`, e)}
                      />
                      <div className="text-xs text-white bg-black bg-opacity-50 p-1 absolute bottom-0 left-0 right-0">
                        Using direct path: {`/images/${project.id === '1' ? 'wisdom.jpg' : project.id === '2' ? 'portfolio.jpg' : 'agency.jpg'}`}
                      </div>
                    </div>
                    {/* Second thumbnail */}
                    <div className="w-1/2 aspect-[3/2] rounded-lg overflow-hidden shadow-md relative">
                      <img
                        src={`/images/${project.id === '1' ? 'wisdom.jpg' : project.id === '2' ? 'portfolio.jpg' : 'agency.jpg'}`}
                        alt={`${project.title} preview 2`}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        onLoad={(e) => console.log(`Image loaded successfully: ${e.currentTarget.src}`)}
                        onError={(e) => console.error(`Error loading image: ${e.currentTarget.src}`, e)}
                      />
                      <div className="text-xs text-white bg-black bg-opacity-50 p-1 absolute bottom-0 left-0 right-0">
                        Using direct path: {`/images/${project.id === '1' ? 'wisdom.jpg' : project.id === '2' ? 'portfolio.jpg' : 'agency.jpg'}`}
                      </div>
                    </div>
                  </div>

              </div>
              
              {/* Project Title - Center on mobile, between previews on desktop */}
              <div 
                className="w-full md:w-2/4 text-center"
                ref={(el: HTMLDivElement | null) => { projectsRef.current[index] = el; }}
                onMouseEnter={() => handleProjectHover(project.id)}
                onMouseLeave={handleProjectLeave}
              >
                <div className={`text-4xl md:text-5xl lg:text-6xl font-mono tracking-tight cursor-pointer transition-all duration-500 ease-out relative ${activeProject === project.id ? 'text-white' : 'text-neutral-500'}`}>
                  <span className="relative z-10 inline-block">
                    {project.title}
                    {activeProject === project.id && (
                      <span className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full opacity-70"></span>
                    )}
                  </span>
                </div>
                <div className="text-xs text-neutral-500 mt-2 tracking-wider">
                  {project.categories.join(' • ')}
                </div>
              </div>
              
              {/* Right Preview Container - Only visible when this project is hovered */}
              <div 
                className={`hidden md:flex w-1/4 ${activeProject === project.id ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-[20px]'} transition-all duration-400 ease-out ${activeProject === project.id ? 'pointer-events-auto' : 'pointer-events-none'}`}
                ref={index === 0 ? rightPreviewRef : undefined}
              >
                {/* Single thumbnail on the right side */}
                <div className="w-full">
                  <div className="w-full aspect-[3/2] rounded-lg overflow-hidden shadow-md relative">
                    <img
                      src={`/images/${project.id === '1' ? 'wisdom.jpg' : project.id === '2' ? 'portfolio.jpg' : 'agency.jpg'}`}
                      alt={`${project.title} preview`}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      onLoad={(e) => console.log(`Image loaded successfully: ${e.currentTarget.src}`)}
                      onError={(e) => console.error(`Error loading image: ${e.currentTarget.src}`, e)}
                    />
                    <div className="text-xs text-white bg-black bg-opacity-50 p-1 absolute bottom-0 left-0 right-0">
                      Using direct path: {`/images/${project.id === '1' ? 'wisdom.jpg' : project.id === '2' ? 'portfolio.jpg' : 'agency.jpg'}`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="text-center mt-8">
          <a href="#works" className="inline-flex items-center text-sm text-neutral-400 hover:text-white transition-colors duration-300 group">
            <span className="group-hover:underline">SEE ALL WORKS</span>
            <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
      
      {/* Mobile preview (only visible on small screens) */}
      <div className="block md:hidden mt-8">
        {activeProject && (
          <div className="rounded-lg overflow-hidden h-[40vh] shadow-lg relative">
            <img
              src={`/images/${activeProject === '1' ? 'wisdom.jpg' : activeProject === '2' ? 'portfolio.jpg' : 'agency.jpg'}`}
              alt="Project preview"
              className="w-full h-full object-cover"
              id="mobile-preview-img"
              onLoad={(e) => console.log(`Mobile image loaded successfully: ${e.currentTarget.src}`)}
              onError={(e) => console.error(`Error loading mobile image: ${e.currentTarget.src}`, e)}
            />
            <div className="text-xs text-white bg-black bg-opacity-50 p-1 absolute bottom-0 left-0 right-0">
              Using direct path: {`/images/${activeProject === '1' ? 'wisdom.jpg' : activeProject === '2' ? 'portfolio.jpg' : 'agency.jpg'}`}
            </div>
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