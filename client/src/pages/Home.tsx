import { Navigation } from "@/components/Navigation";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { BackgroundLayer } from "@/components/BackgroundLayer";
import { ExplosionHero } from "@/components/ExplosionHero";
import { AboutSection } from "@/components/AboutSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { GrantSection } from "@/components/GrantSection";
import { TeamSection } from "@/components/TeamSection";
import { ResourcesSection } from "@/components/ResourcesSection";
import { CommunitySection } from "@/components/CommunitySection";
import { Footer } from "@/components/Footer";
import { useEffect, useState, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Home() {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const sections = containerRef.current?.querySelectorAll('section, footer');
    if (!sections) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const index = Array.from(sections).indexOf(entry.target as Element);
            if (index !== -1) {
              setActiveSectionIndex(index);
            }
          }
        });
      },
      {
        threshold: [0.5],
        root: containerRef.current,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="scroll-smooth md:snap-y md:snap-mandatory md:h-screen md:overflow-y-scroll"
    >
      <BackgroundLayer sectionIndex={activeSectionIndex} />
      <Navigation />
      <ScrollIndicator />
      <ExplosionHero />
      <AboutSection />
      <FeaturesSection />
      <GrantSection />
      <TeamSection />
      <ResourcesSection />
      <CommunitySection />
      <Footer />
    </div>
  );
}
