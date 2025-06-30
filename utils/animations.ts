import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const templateShowcaseAnimations = {
  header: (element: HTMLElement) => {
    return gsap.from(element, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
  },
  
  cta: (element: HTMLElement) => {
    return gsap.from(element, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out'
    });
  },
  
  cardTransition: (direction: 'up' | 'down', cards: HTMLElement[]) => {
    return {
      exit: () => {
        // Prepare for transition by slightly fading all cards
        return gsap.to(cards, {
          opacity: 0.5,
          duration: 0.2,
          ease: 'power2.out'
        });
      },
      
      enter: () => {
        // For each card, animate to its new position
        return gsap.to(cards, {
          top: (i, el) => {
            // Get the current top position and extract the number
            const currentTop = el.style.top;
            const topValue = parseInt(currentTop) || 0;
            
            // If direction is up, cards move down (higher top value)
            // If direction is down, cards move up (lower top value)
            return direction === 'up' ? topValue + 30 : topValue - 30;
          },
          opacity: (i, el) => {
            // Calculate opacity based on position
            // Active card is fully visible, cards further in stack are increasingly dimmed
            return i === 0 ? 1 : Math.max(0.7 - (i * 0.2), 0.2);
          },
          rotateX: (i) => {
            // Add subtle rotation for cards in the stack (not the active card)
            return i > 0 && i <= 2 ? i * 2 : 0;
          },
          duration: 0.4,
          ease: 'power2.inOut',
          stagger: 0.05
        });
      }
    };
  }
};

export const setupScrollTrigger = (trigger: HTMLElement, animations: gsap.core.Timeline) => {
  return ScrollTrigger.create({
    trigger,
    start: 'top center',
    end: 'bottom center',
    toggleActions: 'play none none reverse',
    animation: animations
  });
};