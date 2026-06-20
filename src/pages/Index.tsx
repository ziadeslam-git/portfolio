import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Journey from "@/components/Journey";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BootSequence from "@/components/BootSequence";
import CustomCursor from "@/components/CustomCursor";
import AmbientAudio from "@/components/AmbientAudio";
import { SceneContext } from "@/components/3d/SceneContext";
import { Hero3D } from "@/components/3d/Hero3D";
import { AmbientNetwork } from "@/components/3d/AmbientNetwork";
import { MorphElement } from "@/components/MorphElement";

const Index = () => {
  const [bootComplete, setBootComplete] = useState(false);

  useEffect(() => {
    document.title = "Ziad ELkholy - Backend Developer";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Ziad ELkholy - Backend Developer specializing in ASP.NET Core, C#, and scalable architectures.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white relative selection:bg-primary/30 selection:text-white" id="root-container">
      {!bootComplete && <BootSequence onComplete={() => setBootComplete(true)} />}
      
      <CustomCursor />
      <AmbientAudio />

      {/* Global 3D Background rendering BEHIND all DOM content */}
      {bootComplete && (
        <>
          {/* Background Ambient Network with Depth Blur */}
          <div className="fixed inset-0 z-0 pointer-events-none blur-[3px] opacity-80 mix-blend-screen">
            <SceneContext>
              <AmbientNetwork />
            </SceneContext>
          </div>
          
          {/* Foreground 3D Elements (Sharp) */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <SceneContext>
              <Hero3D />
            </SceneContext>
          </div>
        </>
      )}

      {/* R3F HTML Portal: This sits above the 3D Canvas (z-40) but below the Navigation (z-50) */}
      <div id="r3f-html-portal" className="fixed inset-0 z-40 pointer-events-none" />

      {/* Navigation is completely isolated in its own stacking context at z-50 */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-opacity duration-1000 ${bootComplete ? 'opacity-100' : 'opacity-0'}`}>
        <Navigation />
      </div>

      {/* DOM Content Overlay */}
      {/* We use z-10 for DOM content so it sits above the Canvas (z-0) but below the Portal (z-40) and Nav (z-50) */}
      <div className={`relative z-10 transition-opacity duration-1000 ${bootComplete ? 'opacity-100' : 'opacity-0'} pointer-events-none`}>
        <main className="flex flex-col">
          <Hero />
          
          <div className="network-convergence-trigger h-24" />
          
          <div className="pt-24 pointer-events-auto">
            <About />
            <Journey />
            <Education />
          </div>
          
          <div className="network-convergence-trigger h-24" />
          
          <div className="pt-24 pointer-events-auto">
            <Skills />
          </div>
          
          <div className="network-convergence-trigger h-24" />
          
          <div className="pt-24 pointer-events-auto">
            <Projects />
          </div>
          
          <div className="network-convergence-trigger h-24" />
          <div className="pt-24 pointer-events-auto">
            <Contact />
          </div>
        </main>
        
        <div className="pointer-events-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Index;
