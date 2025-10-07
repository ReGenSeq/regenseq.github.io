import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Globe2, Leaf, Shield } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const impacts = [
  {
    icon: Users,
    title: "Accessibility",
    description: "Increase throughput and accessibility of advanced single-cell assays, enabling broader research communities to generate high-quality data for studying diseases like cancer and neurodegeneration.",
  },
  {
    icon: Globe2,
    title: "Democratization",
    description: "Lower cost and expertise barriers to automation, expanding access to cutting-edge methods beyond elite institutions and democratizing scientific research.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "Model sustainable resource management by repurposing obsolete scientific instruments, fostering collaboration and environmentally responsible innovation.",
  },
  {
    icon: Shield,
    title: "Transparency",
    description: "Give users full control over data and processing, enhancing transparency, security, and privacy compared to commercial closed-box platforms.",
  },
];

export function GrantSection() {
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
      id="grant" 
      className="h-screen flex items-center bg-background snap-start snap-always overflow-hidden"
    >
      <div 
        className="max-w-7xl mx-auto px-4 md:px-8 w-full"
        style={{
          transform: `translateY(${-parallaxOffset}px)`,
        }}
      >
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-primary text-primary-foreground" data-testid="badge-nsf">
            NSF POSE Phase 1
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Creating an Open Source Ecosystem
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Funded by the National Science Foundation to build a sustainable, community-driven 
            platform for repurposing DNA sequencers as automation platforms
          </p>
        </div>
        
        <div>
          <h3 className="text-2xl font-semibold text-center mb-6">Broader Impacts</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {impacts.map((impact, index) => (
              <Card key={index} className="p-6 hover-elevate" data-testid={`card-impact-${index}`}>
                <div className="flex gap-4">
                  <div className="rounded-lg bg-primary/10 w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <impact.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">{impact.title}</h4>
                    <p className="text-muted-foreground text-sm">{impact.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
