
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProjectGrid } from './components/ProjectGrid';
import { WorkProcess } from './components/WorkProcess';
import { RecentWork } from './components/RecentWork';
import { Footer } from './components/Footer';
import { TemplateShowcase } from './components/TemplateShowcase';
import { AnimationStage } from './types'; // Import AnimationStage

const App: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<AnimationStage>(AnimationStage.INITIAL);
  const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);

  useEffect(() => {
    // This effect ensures that animations start after the initial paint.
    setIsPageLoaded(true);
  }, []);

  useEffect(() => {
    if (!isPageLoaded) return;

    // Sequence of timeouts to progress through animation stages
    // Durations are estimates and can be tweaked
    const timeouts = [
      { stage: AnimationStage.HERO_LINE_1_IN, delay: 200 },        // Initial delay before first line
      { stage: AnimationStage.HERO_LINE_2_IN, delay: 700 },        // Delay after line 1 starts animating (duration of line 1 anim)
      { stage: AnimationStage.HERO_SCALING_DOWN, delay: 700 },     // Delay after line 2 starts
      { stage: AnimationStage.NAV_FADE_IN, delay: 1000 },          // Delay after hero starts scaling (duration of scale anim)
      { stage: AnimationStage.SUBHEADING_FADE_IN, delay: 500 },    // Delay after nav starts fading
      { stage: AnimationStage.PROJECTS_FADE_IN, delay: 500 },     // Delay after subheading starts fading
      { stage: AnimationStage.COMPLETE, delay: 700 }               // Delay after projects start fading
    ];

    let accumulatedDelay = 0;
    const timeoutIds: NodeJS.Timeout[] = [];

    timeouts.forEach(item => {
      accumulatedDelay += item.delay;
      const timeoutId = setTimeout(() => {
        setCurrentStage(item.stage);
      }, accumulatedDelay);
      timeoutIds.push(timeoutId);
    });
    
    return () => {
      timeoutIds.forEach(clearTimeout); // Cleanup timeouts on unmount
    };

  }, [isPageLoaded]);

  // Calculate header height for main content padding - approximate
  // This padding is intended to clear space for the fixed Header and the scaled-down Hero text.
  const headerHeight = currentStage >= AnimationStage.NAV_FADE_IN ? 'pt-28 md:pt-32' : 'pt-0';

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-200 font-sans relative overflow-x-hidden">
      <Header currentStage={currentStage} />
      
      {/* Added 'relative' class to make 'main' a positioning context for the absolute Hero */}
      <main className={`relative flex-grow flex flex-col items-center justify-center transition-all duration-500 ${headerHeight}`}>
        <Hero currentStage={currentStage} />
        {currentStage >= AnimationStage.SUBHEADING_FADE_IN && (
           <p 
             className={`
               mt-1 text-center text-neutral-400 
               text-xs sm:text-sm font-normal tracking-wider leading-snug 
               max-w-xl px-4
               transition-opacity duration-1000 ease-in-out
               ${currentStage >= AnimationStage.SUBHEADING_FADE_IN ? 'opacity-100' : 'opacity-0'}`}
           >
             I&apos;M ELIOT, FREELANCE WEBDESIGNER &amp; WEBFLOW DEVELOPER SINCE 2018.
             <br />
             BASED IN LYON, FRANCE.
           </p>
        )}
        <ProjectGrid currentStage={currentStage} />
      </main>

      {/* Work Process section */}
      <section className="w-full relative z-30 bg-neutral-950">
        <WorkProcess isVisible={currentStage >= AnimationStage.PROJECTS_FADE_IN} />
      </section>

      {/* Recent Work section */}
      <div className="w-full relative z-20">
        <RecentWork isVisible={currentStage >= AnimationStage.PROJECTS_FADE_IN} />
      </div>

      {/* Template Showcase section */}
      <div className="w-full relative z-20">
        <TemplateShowcase isVisible={currentStage >= AnimationStage.PROJECTS_FADE_IN} />
      </div>
      
      <Footer />
    </div>
  );
};

export default App;