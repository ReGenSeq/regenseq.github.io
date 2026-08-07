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
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="RegenSeq" />
        <meta property="og:image" content="https://regenseq.github.io/og-image.png" />
        <meta property="og:image:width" content="1408" />
        <meta property="og:image:height" content="768" />
        <meta property="og:image:alt" content="Repurposed Illumina HiSeq 2500 sequencer for spatial biology research" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="RegenSeq | Open Source DNA Sequencer Repurposing" />
        <meta name="twitter:description" content="NSF-funded toolkit for repurposing HiSeq 2500 sequencers into automation platforms for spatial biology research." />
        <meta name="twitter:image" content="https://regenseq.github.io/og-image.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is ReGenSeq?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "ReGenSeq is an NSF POSE Phase I–funded open source ecosystem that repurposes decommissioned Illumina HiSeq 2500 DNA sequencers into flexible automation platforms for spatial biology, spatial transcriptomics, and proteomics research. It is developed at the Technology Innovation Laboratory at the New York Genome Center (NYGC)."
              }
            },
            {
              "@type": "Question",
              "name": "What is PySeq2500?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "PySeq2500 is the open source Python control software at the heart of ReGenSeq. It allows researchers to control a repurposed Illumina HiSeq 2500 sequencer as an automated fluorescence microscope for spatial biology workflows."
              }
            },
            {
              "@type": "Question",
              "name": "How can I get a repurposed HiSeq 2500 sequencer?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "You can submit a request through the ReGenSeq community's 'Find a Sequencer' form at https://regenseq.github.io/community/find-a-sequencer. The community will help match you with a nearby decommissioned instrument."
              }
            },
            {
              "@type": "Question",
              "name": "How can I get custom flowcells for the HiSeq 2500?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Custom HiSeq flowcells are available from the ReGenSeq community for $50 each. Submit a request at https://regenseq.github.io/community/request-flowcells and the team will follow up on availability."
              }
            },
            {
              "@type": "Question",
              "name": "Is ReGenSeq free to use?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. ReGenSeq (PySeq2500) is open source software released under a permissive license. The source code is freely available on GitHub at https://github.com/ReGenSeq/PySeq2500."
              }
            },
            {
              "@type": "Question",
              "name": "What research applications does ReGenSeq support?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "ReGenSeq supports spatial transcriptomics, spatial proteomics, cyclic immunofluorescence (CyCIF), multiplexed imaging, and other single-cell spatial assays. It transforms a decommissioned DNA sequencer into a programmable fluorescence microscopy platform."
              }
            }
          ]
        })}</script>
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
