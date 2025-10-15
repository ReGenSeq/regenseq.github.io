import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, FileText, Book, MessageSquare, ExternalLink } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const resources = [
  {
    icon: Github,
    title: "GitHub Repository",
    description: "RegenSeq control software and documentation",
    link: "https://github.com/nygctech/PySeq2500",
    buttonText: "View Repository",
    highlight: true,
  },
  {
    icon: FileText,
    title: "Scientific Publication",
    description: "Nature Scientific Reports paper (2022)",
    link: "https://www.nature.com/articles/s41598-022-08740-w",
    buttonText: "Read Paper",
    highlight: true,
  },
  {
    icon: Book,
    title: "Documentation",
    description: "Repurpose an Illumina HiSeq 2500 system to function as an automated fluorescence microscope",
    link: "https://pyseq2500.readthedocs.io",
    buttonText: "Read the Docs",
    highlight: false,
  },
  {
    icon: FileText,
    title: "bioRxiv Preprint",
    description: "An open source Python code base and flow cell design for repurposing HiSeq 2500",
    link: "https://www.biorxiv.org/content/10.1101/2021.06.25.449721v1",
    buttonText: "Read Preprint",
    highlight: false,
  },
  {
    icon: Book,
    title: "RegenSeq Protocols",
    description: "Step-by-step protocols and methods for RegenSeq workflows",
    link: "https://www.protocols.io/workspaces/regenseq",
    buttonText: "View Protocols",
    highlight: false,
  },
];

export function ResourcesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setOffset(rect.top);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const parallaxOffset = !isMobile && offset < 0 ? Math.abs(offset) * 0.25 : 0;

  return (
    <section 
      ref={sectionRef}
      id="resources" 
      className="h-screen flex items-center snap-start snap-always overflow-y-auto md:overflow-hidden"
    >
      <div 
        className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full py-20 md:py-6"
        style={{
          transform: `translateY(${-parallaxOffset}px)`,
        }}
      >
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 px-2">
            Resources
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-2">
            Everything you need to get started with RegenSeq
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-6xl mx-auto">
          {resources.map((resource, index) => (
            <Card 
              key={index} 
              className={`p-5 sm:p-6 hover-elevate w-full ${resource.highlight ? 'border-primary/50' : ''}`}
              data-testid={`card-resource-${index}`}
            >
              <div className="flex flex-col h-full">
                <div className={`rounded-lg ${resource.highlight ? 'bg-primary/10' : 'bg-muted/50'} w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-3 sm:mb-4`}>
                  <resource.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${resource.highlight ? 'text-primary' : 'text-foreground'}`} />
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-2">{resource.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 sm:mb-6 flex-grow">{resource.description}</p>
                <Button
                  variant={resource.highlight ? "default" : "outline"}
                  className="w-full gap-2 text-sm"
                  data-testid={`button-resource-${index}`}
                  onClick={() => window.open(resource.link, '_blank')}
                >
                  {resource.buttonText}
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
