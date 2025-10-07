import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, FileText, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import heroImage from "@assets/generated_images/DNA_sequencing_microscopy_hero_image_61613447.png";

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden snap-start snap-always">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/75 to-primary/60" />
      </div>
      
      <div 
        className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-32 text-center"
        style={{
          transform: `translateY(${scrollY * 0.2}px)`,
          opacity: Math.max(0, 1 - scrollY / 500),
        }}
      >
        <Badge 
          className="mb-6 bg-accent/20 text-accent-foreground border-accent/30 backdrop-blur-sm"
          data-testid="badge-nsf-grant"
        >
          NSF POSE Phase 1 Award
        </Badge>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
          PySeq Open Source
          <br />
          Community
        </h1>
        
        <p className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto mb-12 leading-relaxed">
          Repurposing decommissioned DNA sequencers into flexible automation platforms 
          for spatial biology research
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 gap-2"
            data-testid="button-github"
            onClick={() => window.open('https://github.com/nygctech/PySeq2500', '_blank')}
          >
            <Github className="h-5 w-5" />
            View on GitHub
            <ArrowRight className="h-4 w-4" />
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            className="border-2 border-white text-white backdrop-blur-md bg-white/10 hover:bg-white/20"
            data-testid="button-paper"
            onClick={() => window.open('https://www.nature.com/articles/s41598-022-08740-w', '_blank')}
          >
            <FileText className="h-5 w-5" />
            Read the Paper
          </Button>
        </div>
      </div>
    </section>
  );
}
