
import React from 'react';
import { AnimationStage } from '../types';

interface HeroProps {
  currentStage: AnimationStage;
}

export const Hero: React.FC<HeroProps> = ({ currentStage }) => {
  const line1In = currentStage >= AnimationStage.HERO_LINE_1_IN;
  const line2In = currentStage >= AnimationStage.HERO_LINE_2_IN;
  const scalingDown = currentStage >= AnimationStage.HERO_SCALING_DOWN;
  const finalPosition = currentStage >= AnimationStage.NAV_FADE_IN; // Hero text fully settled when nav appears

  // Base styles for hero text lines
  const lineBaseStyle = "font-black uppercase transition-all ease-in-out";
  
  // Timings for animations
  const lineAnimDuration = "duration-700"; // How long each line takes to fade/slide in
  const scaleAnimDuration = "duration-1000"; // How long the scaling/moving takes

  return (
    <div 
      className={`relative text-center w-full flex flex-col items-center justify-center transition-all ease-in-out ${scaleAnimDuration}
                  ${scalingDown ? 'lg:scale-[0.35] md:scale-[0.45] scale-[0.55]' : 'scale-100'} 
                  ${scalingDown ? (finalPosition ? 'absolute top-8 md:top-12 lg:top-10' : 'absolute top-1/2 -translate-y-1/2') : 'my-16 md:my-24 lg:my-32'}
                  ${scalingDown ? 'transform-origin-center' : ''}
                  ${finalPosition ? 'opacity-80' : 'opacity-100'} 
                  px-4
                 `}
      style={{
        // Using style for transform-origin as Tailwind might not cover all dynamic needs here
        transformOrigin: scalingDown ? 'center top' : 'center center',
        // When scaling down, it's effectively part of the header area, so allow header to overlap
        zIndex: scalingDown ? 40 : 10, 
      }}
    >
      {/* Line 1 */}
      <h1 
        className={`${lineBaseStyle} ${lineAnimDuration} text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-neutral-200
                    ${line1In ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        CRAFTING BOLD &
      </h1>
      {/* Line 2 */}
      <h1 
        className={`${lineBaseStyle} ${lineAnimDuration} text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-neutral-200
                    ${line2In ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        style={{ transitionDelay: line1In && !line2In ? '150ms' : '0ms' }} // Stagger line 2 slightly
      >
        MEMORABLE WEBSITES
      </h1>
    </div>
  );
};
