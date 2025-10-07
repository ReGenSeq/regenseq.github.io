import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, FileText, ArrowRight } from "lucide-react";

// Import cover images
import sequencer1 from "@assets/stock_images/close_up_dna_sequenc_c9cca818.jpg";
import sequencer2 from "@assets/stock_images/close_up_dna_sequenc_ea703b20.jpg";
import sequencer3 from "@assets/stock_images/close_up_dna_sequenc_1510ad44.jpg";
import microscope1 from "@assets/stock_images/modern_microscope_cl_bc3cb6f3.jpg";
import microscope2 from "@assets/stock_images/modern_microscope_cl_284f6f0d.jpg";
import microscope3 from "@assets/stock_images/modern_microscope_cl_7f50b6d0.jpg";

const coverImages = [
  { left: sequencer1, right: microscope1 },
  { left: sequencer2, right: microscope2 },
  { left: sequencer3, right: microscope3 },
];

export function ExplosionHero() {
  const [exploded, setExploded] = useState(false);
  const [currentImageSet, setCurrentImageSet] = useState(0);

  useEffect(() => {
    // Trigger explosion after a short delay
    const explosionTimer = setTimeout(() => {
      setExploded(true);
    }, 500);

    // Rotate through image sets
    const imageRotation = setInterval(() => {
      setCurrentImageSet((prev) => (prev + 1) % coverImages.length);
    }, 8000);

    return () => {
      clearTimeout(explosionTimer);
      clearInterval(imageRotation);
    };
  }, []);

  const currentImages = coverImages[currentImageSet];

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden snap-start snap-always bg-background">
      {/* Left image panel - slides to the left */}
      <div
        className={`absolute inset-y-0 left-0 w-1/2 transition-all ease-out ${
          exploded ? "-translate-x-full opacity-70" : "translate-x-0"
        }`}
        style={{
          backgroundImage: `url(${currentImages.left})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transitionDuration: "1500ms",
          transitionTimingFunction: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-primary/60" />
      </div>

      {/* Right image panel - slides to the right */}
      <div
        className={`absolute inset-y-0 right-0 w-1/2 transition-all ease-out ${
          exploded ? "translate-x-full opacity-70" : "translate-x-0"
        }`}
        style={{
          backgroundImage: `url(${currentImages.right})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transitionDuration: "1500ms",
          transitionTimingFunction: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-secondary/30 to-secondary/60" />
      </div>

      {/* Center content - fades in after explosion */}
      <div
        className={`relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-32 text-center transition-all duration-1000 delay-500 ${
          exploded ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <Badge 
          className="mb-6 bg-accent/20 text-accent-foreground border-accent/30 backdrop-blur-sm"
          data-testid="badge-nsf-grant"
        >
          NSF POSE Phase 1 Award
        </Badge>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight">
          PySeq Open Source
          <br />
          Community
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
          Repurposing decommissioned DNA sequencers into flexible automation platforms 
          for spatial biology research
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Button 
            size="lg" 
            className="gap-2"
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
            className="gap-2"
            data-testid="button-paper"
            onClick={() => window.open('https://www.nature.com/articles/s41598-022-08740-w', '_blank')}
          >
            <FileText className="h-5 w-5" />
            Read the Paper
          </Button>
        </div>
      </div>

      {/* Image indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {coverImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageSet(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentImageSet === index
                ? "bg-primary w-8"
                : "bg-muted-foreground/40 hover:bg-muted-foreground/60"
            }`}
            data-testid={`image-indicator-${index}`}
            aria-label={`Show image set ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
