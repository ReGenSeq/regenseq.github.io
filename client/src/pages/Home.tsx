import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { BackgroundLayer } from "@/components/BackgroundLayer";
import { ExplosionHero } from "@/components/ExplosionHero";
import { AboutSection } from "@/components/AboutSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { GrantSection } from "@/components/GrantSection";
import { TeamSection } from "@/components/TeamSection";
import { ResourcesSection } from "@/components/ResourcesSection";
import { PapersSection } from "@/components/PapersSection";
import { CommunitySection } from "@/components/CommunitySection";
import { Footer } from "@/components/Footer";
import { useEffect, useState, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Home() {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Scroll to hash on load (e.g. /#community from another page)
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const id = hash.slice(1);
    let attempts = 0;
    const interval = setInterval(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        clearInterval(interval);
      } else if (++attempts >= 20) {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

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
      className="scroll-smooth md:h-screen md:overflow-y-scroll"
    >
      <Helmet>
        <title>RegenSeq | Repurpose DNA Sequencers for Spatial Biology</title>
        <meta name="description" content="Open source toolkit to repurpose Illumina HiSeq 2500 sequencers as automation platforms for spatial biology and proteomics research." />
        <link rel="canonical" href="https://regenseq.github.io/" />
        <meta property="og:title" content="RegenSeq | Open Source DNA Sequencer Repurposing" />
        <meta property="og:description" content="NSF-funded toolkit for repurposing HiSeq 2500 sequencers into automation platforms for spatial biology research." />
        <meta property="og:url" content="https://regenseq.github.io/" />
      </Helmet>
      <BackgroundLayer sectionIndex={activeSectionIndex} />
      <Navigation />
      <ScrollIndicator />
      <ExplosionHero />
      <AboutSection />
      <FeaturesSection />
      <GrantSection />
      <TeamSection />
      <ResourcesSection />
      <PapersSection />
      <CommunitySection />
      <Footer />
    </div>
  );
}
