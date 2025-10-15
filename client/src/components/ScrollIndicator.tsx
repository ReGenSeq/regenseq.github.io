import { useEffect, useState } from "react";

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "features", label: "Features" },
  { id: "grant", label: "NSF Grant" },
  { id: "team", label: "Team" },
  { id: "resources", label: "Resources" },
  { id: "community", label: "Community" },
  { id: "footer", label: "Footer" },
];

export function ScrollIndicator() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    // Get all section elements
    const sectionElements = sections.map(section => {
      if (section.id === "hero") {
        return document.querySelector('section:first-of-type');
      } else if (section.id === "footer") {
        return document.querySelector('footer');
      } else {
        return document.getElementById(section.id);
      }
    }).filter(Boolean) as Element[];

    if (sectionElements.length === 0) return;

    // Track intersection ratios for all sections
    const intersectionRatios = new Map<Element, number>();

    // Find the scroll container - check for the main container with scroll
    const scrollContainer = document.querySelector('[class*="snap-y"]') || 
                           document.querySelector('[class*="overflow-y-scroll"]') || 
                           null;

    const observer = new IntersectionObserver(
      (entries) => {
        // Update intersection ratios
        entries.forEach(entry => {
          intersectionRatios.set(entry.target, entry.intersectionRatio);
        });

        // Find section with highest intersection ratio
        let maxRatio = 0;
        let maxIndex = 0;

        sectionElements.forEach((element, index) => {
          const ratio = intersectionRatios.get(element) || 0;
          if (ratio > maxRatio) {
            maxRatio = ratio;
            maxIndex = index;
          }
        });

        // Update active section
        setActiveSection(maxIndex);
      },
      {
        root: scrollContainer,
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: "-10% 0px -10% 0px"
      }
    );

    // Observe all sections
    sectionElements.forEach(element => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (index: number) => {
    const section = sections[index];
    let element: Element | null = null;
    
    if (section.id === "hero") {
      element = document.querySelector('section:first-of-type');
    } else if (section.id === "footer") {
      element = document.querySelector('footer');
    } else {
      element = document.getElementById(section.id);
    }
    
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
      {sections.map((section, index) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(index)}
          className="group relative"
          data-testid={`scroll-indicator-${section.id}`}
          aria-label={`Scroll to ${section.label}`}
        >
          <div
            className={`w-3 h-3 rounded-full border-2 transition-all ${
              activeSection === index
                ? "bg-primary border-primary scale-125"
                : "bg-background border-muted-foreground/40 hover:border-primary hover:scale-110"
            }`}
          />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-card border border-border rounded-md text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {section.label}
          </span>
        </button>
      ))}
    </div>
  );
}
