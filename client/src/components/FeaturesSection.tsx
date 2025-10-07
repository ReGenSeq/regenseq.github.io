import { Card } from "@/components/ui/card";
import { Thermometer, Droplets, Camera, FlaskConical, FileCode, Clock } from "lucide-react";

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
  return (
    <section id="features" className="py-16 md:py-24 lg:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Technical Capabilities
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            PySeq2500 provides comprehensive control of all sequencer components for 
            sophisticated automated workflows
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 hover-elevate bg-background"
              data-testid={`card-feature-${index}`}
            >
              <feature.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
