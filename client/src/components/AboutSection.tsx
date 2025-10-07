import { Card } from "@/components/ui/card";
import { Microscope, Recycle, Code2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";

export function AboutSection() {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setOffset(rect.top);
      }
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxOffset = offset < 0 ? Math.abs(offset) * 0.3 : 0;

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="h-screen flex items-center bg-background snap-start snap-always overflow-hidden"
    >
      <div 
        className="max-w-7xl mx-auto px-4 md:px-8 w-full"
        style={{
          transform: `translateY(${-parallaxOffset}px)`,
        }}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What is PySeq?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            An open source Python toolkit that transforms obsolete DNA sequencers 
            into powerful automation platforms for cutting-edge biological research
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-8 hover-elevate" data-testid="card-repurpose">
            <div className="rounded-lg bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
              <Recycle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Repurpose & Reuse</h3>
            <p className="text-muted-foreground">
              Convert decommissioned Illumina HiSeq 2500 sequencers—once costing hundreds 
              of thousands—into accessible research tools available on the secondary market.
            </p>
          </Card>
          
          <Card className="p-8 hover-elevate" data-testid="card-automation">
            <div className="rounded-lg bg-secondary/10 w-12 h-12 flex items-center justify-center mb-4">
              <Microscope className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Advanced Automation</h3>
            <p className="text-muted-foreground">
              Precise control of temperature, fluidics, and imaging for complex spatial 
              biology applications including multiplexed immunofluorescence and proteomics.
            </p>
          </Card>
          
          <Card className="p-8 hover-elevate" data-testid="card-opensource">
            <div className="rounded-lg bg-accent/10 w-12 h-12 flex items-center justify-center mb-4">
              <Code2 className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Open Source</h3>
            <p className="text-muted-foreground">
              Fully open Python codebase with customizable protocols—no specialized 
              engineering expertise required. Community-driven development and support.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
