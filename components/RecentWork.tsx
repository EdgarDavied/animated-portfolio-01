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

  // Initialize scroll animations when component mounts
  useEffect(() => {
    if (!sectionRef.current || !isVisible) return;

    // Initialize GSAP animations with improved initial states
    gsap.set(sectionRef.current, { opacity: 0, y: 30 });
    gsap.set(projectsRef.current, { opacity: 0, y: 40, skewY: 2 });
    
    // Initialize thumbnail scales with more dramatic initial states
    const projectContainers = document.querySelectorAll('.mb-16');
    projectContainers.forEach((container) => {
      // Get left and right preview containers
      const leftPreview = container.querySelector('.md\\:block.w-1\\/3:first-of-type');
      const rightPreview = container.querySelector('.md\\:flex.w-1\\/3:last-of-type');
      
      // Set initial states for thumbnails with more dramatic values
      if (leftPreview) {
        const thumbnails = leftPreview.querySelectorAll('div.rounded-lg');
        gsap.set(thumbnails, { scale: 0.9, opacity: 0.7 });
      }
      
      if (rightPreview) {
        const thumbnail = rightPreview.querySelector('div.rounded-lg');
        if (thumbnail) {
          gsap.set(thumbnail, { scale: 0.9, opacity: 0.7 });
        }
      }
    });

    // Create enhanced scroll trigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%', // Start slightly earlier
        end: 'top 20%',
        toggleActions: 'play none none reverse',
        markers: false,
        scrub: 0.2, // Add subtle scrub effect for smoother scrolling experience
      },
    });

    // More engaging entrance animation for the section
    tl.to(sectionRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
    })
    // Staggered entrance for project titles with a slight skew correction
    .to(projectsRef.current, {
      opacity: 0.3, // All projects start with same opacity when no project is active
      y: 0,
      skewY: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'back.out(1.2)',
    }, "-=0.6")
    // Add a subtle highlight effect to each project title sequentially
    .to(projectsRef.current, {
      textShadow: '0 0 5px rgba(255,255,255,0.2)',
      duration: 0.3,
      stagger: 0.1,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: 1,
    }, "-=0.2");

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      tl.kill();
    };
  }, [activeProject, isVisible]);

  // Animation for project hover with enhanced in/out effects
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
    
    // Get the left and right preview containers for this project
    const leftPreview = projectContainer.querySelector('.md\\:block.w-1\\/3:first-of-type');
    const rightPreview = projectContainer.querySelector('.md\\:flex.w-1\\/3:last-of-type');
    
    // Animate thumbnails inside the left preview with staggered entrance
    if (leftPreview) {
      const thumbnails = leftPreview.querySelectorAll('div.rounded-lg');
      gsap.fromTo(thumbnails, 
        { scale: 0.95, opacity: 0.7, y: 10 },
        {
          scale: 1.05,
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'back.out(1.5)',
          delay: 0.05, // Small delay to let the container appear first
          clearProps: 'y' // Clear transform after animation completes
        }
      );
    }

    // Animate thumbnail inside the right preview with a different entrance
    if (rightPreview) {
      const rightPreviewThumbnail = rightPreview.querySelector('div.rounded-lg');
      gsap.fromTo(rightPreviewThumbnail,
        { scale: 0.95, opacity: 0.7, y: -10 },
        {
          scale: 1.05,
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'back.out(1.5)',
          delay: 0.15, // Slightly longer delay for right side
          clearProps: 'y' // Clear transform after animation completes
        }
      );
    }

    // Animate project titles with enhanced effects
    projectsRef.current.forEach((ref, index) => {
      if (ref) {
        const isActive = PROJECTS_DATA[index].id === projectId;
        
        if (isActive) {
          // Create a more dramatic entrance effect for active project
          gsap.fromTo(ref, 
            { textShadow: 'none' },
            { 
              textShadow: '0 0 15px rgba(255,255,255,0.5)', 
              duration: 0.4,
              ease: 'power3.out'
            }
          );
          
          // Add a subtle pulse animation to the active title
          gsap.to(ref, {
            keyframes: [
              { textShadow: '0 0 15px rgba(255,255,255,0.5)', duration: 0.4 },
              { textShadow: '0 0 10px rgba(255,255,255,0.3)', duration: 0.4 },
              { textShadow: '0 0 15px rgba(255,255,255,0.5)', duration: 0.4 }
            ],
            repeat: 0,
            ease: 'power1.inOut',
            delay: 0.4
          });
        }
      }
    });
  };

  // Reset active project when mouse leaves with smooth out effects
  const handleProjectLeave = () => {
    // Get the currently active project before setting to null
    const currentActive = activeProject;
    
    // Find the active project container before resetting
    let activeContainer = null;
    let leftPreview = null;
    let rightPreview = null;
    
    if (currentActive) {
      const projectIndex = PROJECTS_DATA.findIndex(p => p.id === currentActive);
      const projectContainers = document.querySelectorAll('.mb-16');
      activeContainer = projectContainers[projectIndex];
      
      if (activeContainer) {
        leftPreview = activeContainer.querySelector('.md\\:block.w-1\\/3:first-of-type');
        rightPreview = activeContainer.querySelector('.md\\:flex.w-1\\/3:last-of-type');
      }
    }
    
    // Animate out the thumbnails with a smooth fade
    if (leftPreview) {
      const thumbnails = leftPreview.querySelectorAll('div.rounded-lg');
      gsap.to(thumbnails, {
        scale: 0.98,
        opacity: 0.7,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power1.inOut',
      });
    }
    
    if (rightPreview) {
      const rightPreviewThumbnail = rightPreview.querySelector('div.rounded-lg');
      gsap.to(rightPreviewThumbnail, {
        scale: 0.98,
        opacity: 0.7,
        duration: 0.5,
        ease: 'power1.inOut',
      });
    }
    
    // Reset all project titles to default state with a smooth transition
    projectsRef.current.forEach((ref) => {
      if (ref) {
        gsap.to(ref, {
          textShadow: 'none',
          duration: 0.5,
          ease: 'power3.out',
        });
      }
    });
    
    // Set no project as active when mouse leaves (after animations start)
    setActiveProject(null);
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
                className={`hidden md:block w-1/3 ${activeProject === project.id ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-[-20px]'} transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] ${activeProject === project.id ? 'pointer-events-auto' : 'pointer-events-none'}`}
                ref={index === 0 ? leftPreviewRef : undefined}
              >
                {/* Always show thumbnails, not just for active project */}
                  <div className="flex flex-row gap-3 w-full">
                    {/* First thumbnail */}
                    <div className="w-full aspect-[3/2] rounded-lg overflow-hidden shadow-md relative">
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
                  </div>

              </div>
              
              {/* Project Title - Center on mobile, between previews on desktop */}
              <div 
                className="w-full md:w-1/3 text-center"
                ref={(el: HTMLDivElement | null) => { projectsRef.current[index] = el; }}
                onMouseEnter={() => handleProjectHover(project.id)}
                onMouseLeave={handleProjectLeave}
              >
                <div 
                  className={`text-4xl md:text-5xl lg:text-6xl font-mono tracking-tight cursor-pointer relative`} 
                  style={{ 
                    opacity: activeProject === project.id ? 1 : 0.25,
                    color: activeProject === project.id ? '#ffffff' : '#888888',
                    filter: activeProject === project.id ? 'brightness(1.2)' : 'none',
                    transition: 'color 0.4s cubic-bezier(0.25,0.1,0.25,1.0), opacity 0.4s cubic-bezier(0.25,0.1,0.25,1.0), filter 0.4s cubic-bezier(0.25,0.1,0.25,1.0), transform 0.4s cubic-bezier(0.25,0.1,0.25,1.0)'
                  }}
                >
                  <span className="relative z-10 inline-block">
                    <span 
                      className={activeProject === project.id ? 'active-title' : ''}
                      style={{
                        textShadow: activeProject === project.id ? '0 0 1px #fff' : 'none',
                        position: 'relative',
                        display: 'inline-block',
                        transform: activeProject === project.id ? 'translateY(-2px)' : 'none'
                      }}
                    >
                      <style dangerouslySetInnerHTML={{ __html: `
                        .active-title::before {
                          content: '';
                          position: absolute;
                          bottom: -4px;
                          left: 0;
                          width: 100%;
                          height: 1px;
                          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 100%);
                          animation: lineGlow 2s ease-in-out infinite;
                        }
                        @keyframes lineGlow {
                          0% { opacity: 0.3; transform: scaleX(0.8); }
                          50% { opacity: 1; transform: scaleX(1); }
                          100% { opacity: 0.3; transform: scaleX(0.8); }
                        }
                      `}} />
                      {project.title}
                    </span>
                    {activeProject === project.id && (
                      <>
                        <span 
                          className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full" 
                          style={{
                            opacity: 0.7,
                            boxShadow: '0 0 5px rgba(255,255,255,0.5)',
                            animation: 'pulseAnimation 2s ease-in-out infinite'
                          }}
                        ></span>
                        <span 
                          className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-white rounded-full" 
                          style={{
                            opacity: 0.5,
                            boxShadow: '0 0 3px rgba(255,255,255,0.3)',
                            animation: 'pulseAnimation 2s ease-in-out infinite 0.5s'
                          }}
                        ></span>
                        <style dangerouslySetInnerHTML={{ __html: `
                          @keyframes pulseAnimation {
                            0% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
                            50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.4; }
                            100% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
                          }
                        `}} />
                      </>
                    )}
                  </span>
                </div>
                <div className="text-xs text-neutral-500 mt-2 tracking-wider">
                  {project.categories.join(' • ')}
                </div>
              </div>
              
              {/* Right Preview Container - Only visible when this project is hovered */}
              <div 
                className={`hidden md:flex w-1/3 ${activeProject === project.id ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-[20px]'} transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] ${activeProject === project.id ? 'pointer-events-auto' : 'pointer-events-none'}`}
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
        
        <div className="text-center mt-12 mb-4">
          <a 
            href="#works" 
            className="inline-flex items-center text-sm text-neutral-400 hover:text-white transition-all duration-300 group relative overflow-hidden px-4 py-2"
            onMouseEnter={(e) => {
              const target = e.currentTarget;
              gsap.to(target, {
                color: '#ffffff',
                textShadow: '0 0 8px rgba(255,255,255,0.3)',
                duration: 0.3,
                ease: 'power2.out'
              });
              
              // Animate the pseudo-element line
              const line = target.querySelector('.link-line');
              if (line) {
                gsap.fromTo(line, 
                  { width: '0%', left: '0%' },
                  { width: '100%', duration: 0.4, ease: 'power2.inOut' }
                );
              }
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget;
              gsap.to(target, {
                color: '#a3a3a3',
                textShadow: 'none',
                duration: 0.3,
                ease: 'power2.out'
              });
              
              // Animate the pseudo-element line out
              const line = target.querySelector('.link-line');
              if (line) {
                gsap.to(line, { 
                  width: '0%', 
                  left: '100%',
                  duration: 0.4, 
                  ease: 'power2.inOut' 
                });
              }
            }}
          >
            <span className="relative z-10 tracking-wider font-light">SEE ALL WORKS</span>
            <div className="link-line absolute bottom-0 h-[1px] bg-white opacity-70" style={{ width: '0%' }}></div>
            <svg 
              className="ml-2 w-4 h-4 transform group-hover:translate-x-2 transition-all duration-300 ease-out" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
      
      {/* Mobile preview with enhanced animations (only visible on small screens) */}
      <div className="block md:hidden mt-8">
        {activeProject && (
          <div 
            className="rounded-lg overflow-hidden h-[40vh] shadow-lg relative"
            style={{
                animation: 'fadeInScale 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards'
            }}
          >
            <style dangerouslySetInnerHTML={{ __html: `
              @keyframes fadeInScale {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
              }
              @keyframes floatAnimation {
                0% { transform: translateY(0); }
                50% { transform: translateY(-5px); }
                100% { transform: translateY(0); }
              }
              .floating-image {
                animation: floatAnimation 4s ease-in-out infinite;
              }
            `}} />
            <img
              src={`/images/${activeProject === '1' ? 'wisdom.jpg' : activeProject === '2' ? 'portfolio.jpg' : 'agency.jpg'}`}
              alt="Project Preview"
              className="w-full h-full object-cover"
              style={{
                animation: 'floatAnimation 3s ease-in-out infinite'
              }}
              id="mobile-preview-img"
              onLoad={(e) => console.log(`Mobile image loaded successfully: ${e.currentTarget.src}`)}
              onError={(e) => console.error(`Error loading mobile image: ${e.currentTarget.src}`, e)}
            />
            <div className="text-xs text-white bg-black bg-opacity-50 p-1 absolute bottom-0 left-0 right-0">
              Using direct path: {`/images/${activeProject === '1' ? 'wisdom.jpg' : activeProject === '2' ? 'portfolio.jpg' : 'agency.jpg'}`}
            </div>
            <a 
              href="#" 
              className="absolute bottom-4 right-4 bg-white bg-opacity-10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-light tracking-wider hover:bg-opacity-20 transition-all duration-300"
              style={{
                animation: 'fadeInUp 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
                animationDelay: '0.3s',
                opacity: 0,
                transform: 'translateY(10px)'
              }}
            >
              View Project
            </a>
          </div>
        )}
      </div>
      
      {/* Add keyframe styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes floatAnimation {
          0% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0); }
        }
        @keyframes lineGlow {
          0% { opacity: 0.3; transform: scaleX(0.8); }
          50% { opacity: 1; transform: scaleX(1); }
          100% { opacity: 0.3; transform: scaleX(0.8); }
        }
        @keyframes pulseAnimation {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
          50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.4; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
        }
      `}} />
    </section>
  );
};