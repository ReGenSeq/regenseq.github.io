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
    <section 
      id="features" 
      className="min-h-screen flex items-start overflow-y-auto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full py-20 md:pt-28 lg:pt-32 md:pb-[15vh]">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-heading-main font-bold text-foreground mb-3 sm:mb-4 md:mb-6 px-2">
            Technical Capabilities
          </h2>
          <p className="text-subtitle-lg text-muted-foreground max-w-3xl mx-auto px-2">
            RegenSeq provides comprehensive control of all sequencer components for 
            sophisticated automated workflows
          </p>
          <p className="mt-4 sm:mt-6 max-w-3xl mx-auto text-sm sm:text-base text-muted-foreground px-2">
            PySeq2500 exposes every subsystem of the HiSeq 2500 through a clean Python API, 
            letting researchers compose complex multi-day experiments from simple, reusable 
            building blocks. The capabilities below make the platform suitable for applications 
            ranging from cyclic immunofluorescence to in-situ sequencing.
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
