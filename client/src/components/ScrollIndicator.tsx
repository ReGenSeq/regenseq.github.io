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
    const handleScroll = () => {
      const sectionElements = sections.map(section => {
        if (section.id === "hero") {
          return document.querySelector('section:first-of-type');
        } else if (section.id === "footer") {
          return document.querySelector('footer');
        } else {
          return document.getElementById(section.id);
        }
      });

      // Find which section has the most visible area in viewport
      let maxVisibleIndex = 0;
      let maxVisibleArea = 0;

      sectionElements.forEach((element, index) => {
        if (!element) return;
        
        const rect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Calculate visible area of this section
        const visibleTop = Math.max(0, rect.top);
        const visibleBottom = Math.min(viewportHeight, rect.bottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        
        if (visibleHeight > maxVisibleArea) {
          maxVisibleArea = visibleHeight;
          maxVisibleIndex = index;
        }
      });

      setActiveSection(maxVisibleIndex);
    };

    // Check on scroll and after a short delay for snap-scroll
    let timeoutId: number;
    const scrollHandler = () => {
      handleScroll();
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(handleScroll, 150);
    };

    // Get the scroll container (the main div with overflow-y-scroll)
    const scrollContainer = document.querySelector('.h-screen.overflow-y-scroll');
    const target = scrollContainer || window;

    target.addEventListener("scroll", scrollHandler, { passive: true });
    handleScroll();
    
    return () => {
      target.removeEventListener("scroll", scrollHandler);
      clearTimeout(timeoutId);
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
