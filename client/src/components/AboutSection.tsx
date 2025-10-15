import { Card } from "@/components/ui/card";
import { Microscope, Recycle, Code2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export function AboutSection() {
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

  const parallaxOffset = !isMobile && offset < 0 ? Math.abs(offset) * 0.3 : 0;

  return (
    <section 
      ref={sectionRef}
      id="about" 
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
            What is RegenSeq?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
            An open source Python toolkit that transforms obsolete DNA sequencers 
            into powerful automation platforms for cutting-edge biological research
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <Card className="p-5 sm:p-6 md:p-8 hover-elevate" data-testid="card-repurpose">
            <div className="rounded-lg bg-primary/10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-3 sm:mb-4">
              <Recycle className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Repurpose & Reuse</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Convert decommissioned Illumina HiSeq 2500 sequencers—once costing hundreds 
              of thousands—into accessible research tools available on the secondary market.
            </p>
          </Card>
          
          <Card className="p-5 sm:p-6 md:p-8 hover-elevate" data-testid="card-automation">
            <div className="rounded-lg bg-secondary/10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-3 sm:mb-4">
              <Microscope className="h-5 w-5 sm:h-6 sm:w-6 text-secondary" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Advanced Automation</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Precise control of temperature, fluidics, and imaging for complex spatial 
              biology applications including multiplexed immunofluorescence and proteomics.
            </p>
          </Card>
          
          <Card className="p-5 sm:p-6 md:p-8 hover-elevate" data-testid="card-opensource">
            <div className="rounded-lg bg-accent/10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-3 sm:mb-4">
              <Code2 className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Open Source</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Fully open Python codebase with customizable protocols—no specialized 
              engineering expertise required. Community-driven development and support.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
