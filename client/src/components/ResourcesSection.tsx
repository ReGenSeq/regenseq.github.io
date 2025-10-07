import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, FileText, Book, MessageSquare, ExternalLink } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const resources = [
  {
    icon: Github,
    title: "GitHub Repository",
    description: "PySeq2500 control software and documentation",
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
    description: "Step-by-step protocols and methods for PySeq workflows",
    link: "https://www.protocols.io/workspaces/regenseq",
    buttonText: "View Protocols",
    highlight: false,
  },
];

export function ResourcesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setOffset(rect.top);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxOffset = offset < 0 ? Math.abs(offset) * 0.25 : 0;

  return (
    <section 
      ref={sectionRef}
      id="resources" 
      className="h-screen flex items-center snap-start snap-always overflow-hidden"
    >
      <div 
        className="max-w-7xl mx-auto px-4 md:px-8 w-full"
        style={{
          transform: `translateY(${-parallaxOffset}px)`,
        }}
      >
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4">
            Resources
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Everything you need to get started with PySeq
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto justify-items-center">
          {resources.map((resource, index) => (
            <Card 
              key={index} 
              className={`p-4 md:p-6 hover-elevate w-full max-w-sm md:max-w-none ${resource.highlight ? 'border-primary/50' : ''}`}
              data-testid={`card-resource-${index}`}
            >
              <div className="flex flex-col h-full">
                <div className={`rounded-lg ${resource.highlight ? 'bg-primary/10' : 'bg-muted/50'} w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mb-3 md:mb-4`}>
                  <resource.icon className={`h-5 w-5 md:h-6 md:w-6 ${resource.highlight ? 'text-primary' : 'text-foreground'}`} />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2">{resource.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-4 md:mb-6 flex-grow">{resource.description}</p>
                <Button
                  variant={resource.highlight ? "default" : "outline"}
                  size="sm"
                  className="w-full gap-2"
                  data-testid={`button-resource-${index}`}
                  onClick={() => window.open(resource.link, '_blank')}
                >
                  {resource.buttonText}
                  <ExternalLink className="h-3 w-3 md:h-4 md:w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
