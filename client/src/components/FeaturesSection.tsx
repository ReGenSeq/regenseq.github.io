import { Card } from "@/components/ui/card";
import { Thermometer, Droplets, Camera, FlaskConical, FileCode, Clock } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const features = [
  {
    icon: Camera,
    title: "4-Channel Imaging",
    description: "Simultaneous multi-channel fluorescence image acquisition with precise positioning",
  },
  {
    icon: Thermometer,
    title: "Temperature Control",
    description: "Integrated stage temperature control for stable, reproducible experiments",
  },
  {
    icon: Droplets,
    title: "Automated Fluidics",
    description: "Programmable reagent exchange with precise pump and valve control",
  },
  {
    icon: FlaskConical,
    title: "Custom Flow Cells",
    description: "Inexpensive, easily assembled flow cells compatible with standard samples",
  },
  {
    icon: FileCode,
    title: "Python-Based",
    description: "Editable configuration and protocol files for complete experimental control",
  },
  {
    icon: Clock,
    title: "Multi-Day Workflows",
    description: "Stable operation over extended experiments with unattended execution",
  },
];

export function FeaturesSection() {
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

  const parallaxOffset = !isMobile && offset < 0 ? Math.abs(offset) * 0.2 : 0;

  return (
    <section 
      ref={sectionRef}
      id="features" 
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
            Technical Capabilities
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
            RegenSeq provides comprehensive control of all sequencer components for 
            sophisticated automated workflows
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-5 sm:p-6 hover-elevate bg-background"
              data-testid={`card-feature-${index}`}
            >
              <feature.icon className="h-7 w-7 sm:h-8 sm:w-8 text-primary mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
