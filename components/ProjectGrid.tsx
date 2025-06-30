import React, { useEffect, useRef } from 'react';
import { PROJECTS_DATA } from '../constants';
import { AnimationStage } from '../types';

interface ProjectGridProps {
  currentStage: AnimationStage;
}

// --- Configurable Animation Variables ---
// Maximum scale factor for the item closest to the mouse cursor.
const MAX_SCALE = 1.2; // Adjusted for larger items (e.g., 1.2 means 120%)
// Minimum scale factor for items far from the mouse cursor (resting state).
const MIN_SCALE = 1.0;
// Influence Radius (in pixels): Defines how far the mouse's presence extends to affect item scaling.
const INFLUENCE_RADIUS = 200; // Increased for larger items
// CSS transition duration for the scaling animation.
const TRANSITION_DURATION = '0.15s'; // Slightly increased duration
// CSS transition easing function for the scaling animation.
const TRANSITION_EASING = 'ease-out';

// Thumbnail base size classes (larger and rectangular)
const THUMBNAIL_BASE_WIDTH_CLASS = "w-64"; // Approx 256px
const THUMBNAIL_BASE_HEIGHT_CLASS = "h-48"; // Approx 192px (4:3 aspect ratio)

export const ProjectGrid: React.FC<ProjectGridProps> = ({ currentStage }) => {
  const isVisible = currentStage >= AnimationStage.PROJECTS_FADE_IN;
  const containerRef = useRef<HTMLDivElement>(null);
  // Store refs to individual project item anchor elements
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isVisible) return;

    itemRefs.current = itemRefs.current.slice(0, PROJECTS_DATA.length);

    const handleMouseMove = (event: MouseEvent) => {
      if (!container) return;
      
      const containerRect = container.getBoundingClientRect();
      const mouseXInContainer = event.clientX - containerRect.left;

      itemRefs.current.forEach((itemEl) => {
        if (!itemEl) return;

        const itemRect = itemEl.getBoundingClientRect();
        // Calculate item center relative to the container's scroll position
        const itemCenterXInContainer = itemEl.offsetLeft + (itemRect.width / 2) - container.scrollLeft;
        
        const distance = Math.abs(mouseXInContainer - itemCenterXInContainer);

        let scale = MIN_SCALE;
        if (distance < INFLUENCE_RADIUS) {
          const normalizedDistance = distance / INFLUENCE_RADIUS;
          scale = MAX_SCALE - (normalizedDistance * (MAX_SCALE - MIN_SCALE));
          scale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale));
        }
        
        itemEl.style.transform = `scale(${scale})`;
      });
    };

    const handleMouseLeave = () => {
      itemRefs.current.forEach(itemEl => {
        if (itemEl) {
          itemEl.style.transform = `scale(${MIN_SCALE})`;
        }
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    itemRefs.current.forEach(itemEl => {
        if (itemEl) {
            itemEl.style.transition = `transform ${TRANSITION_DURATION} ${TRANSITION_EASING}`;
            // Scale from the center for card-like items
            itemEl.style.transformOrigin = 'center center';
            itemEl.style.transform = `scale(${MIN_SCALE})`;
        }
    });

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      itemRefs.current.forEach(itemEl => {
        if (itemEl) {
          itemEl.style.transform = '';
          itemEl.style.transition = '';
          itemEl.style.transformOrigin = '';
        }
      });
    };
  }, [isVisible]);

  return (
    <section
      id="works"
      ref={containerRef}
      className={`
        w-full overflow-x-auto overflow-y-hidden
        flex items-center gap-6 px-6 md:px-12 lg:px-24
        transition-opacity duration-1000 ease-in-out relative z-10
        ${isVisible ? 'opacity-100' : 'opacity-0'}
        scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-900
        hover:scrollbar-thumb-neutral-600
      `}
    >
      <div 
        ref={containerRef}
        className="inline-flex items-center space-x-4 md:space-x-6 lg:space-x-8 p-4 
                   overflow-x-auto custom-scrollbar custom-scrollbar-firefox"
        style={{
           // minHeight ensures container is interactive and can fit scaled items.
           // Approx: (Base Image Height * MAX_SCALE) + Text Height + Container Padding
           // (192px * 1.2) + ~50px + 32px = ~230 + 50 + 32 = ~312px
           minHeight: '320px', 
           // Ensure the scrollable area doesn't exceed viewport width too much, or set a max content width
           maxWidth: 'calc(100vw - 2rem)', // Example: full viewport width minus some margin
        }}
      >
        {PROJECTS_DATA.map((project, index) => (
          <a
            key={project.id}
            ref={(el: HTMLAnchorElement | null) => { itemRefs.current[index] = el; }}
            href={project.liveLink || '#'}
            target={project.liveLink ? '_blank' : '_self'}
            rel={project.liveLink ? 'noopener noreferrer' : ''}
            className="flex flex-col items-center flex-shrink-0" // flex-shrink-0 prevents items from shrinking
            aria-label={`View project: ${project.title}`}
            title={project.title}
          >
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className={`${THUMBNAIL_BASE_WIDTH_CLASS} ${THUMBNAIL_BASE_HEIGHT_CLASS} 
                         object-cover rounded-lg shadow-xl hover:shadow-2xl 
                         border border-neutral-700/50`} // Added subtle border
              draggable="false"
            />
            <div className={`mt-3 text-center px-1 ${THUMBNAIL_BASE_WIDTH_CLASS}`}> {/* Ensure text area matches image width */}
              <p className="text-base font-semibold uppercase tracking-wider text-neutral-100 truncate">
                {project.title}
              </p>
              <p className="text-xs uppercase tracking-wide text-neutral-400 mt-1 truncate">
                {project.categories.join(' + ')}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
