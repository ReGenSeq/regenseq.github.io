import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check } from "lucide-react";
import { Link } from "wouter";
import logo1 from "@assets/generated_images/Minimal_P_with_DNA_line_0f50d51e.png";
import logo2 from "@assets/generated_images/Minimal_circle_sequencing_lanes_32e47afa.png";
import logo3 from "@assets/generated_images/Clean_PySeq_wordmark_typography_87be8c39.png";
import logo4 from "@assets/generated_images/Three_dots_connected_P_shape_1f632a34.png";
import logo5 from "@assets/generated_images/Overlapping_rectangles_P_minimal_b92e811d.png";
import logo6 from "@assets/generated_images/Modern_recycling_repurposing_logo_minimal_c92ed17b.png";

const logos = [
  {
    id: 1,
    name: "Letter P with DNA",
    description: "Simple monochrome letter P with subtle DNA helix line detail",
    image: logo1,
    style: "Minimal & Clean"
  },
  {
    id: 2,
    name: "Sequencing Lanes",
    description: "Abstract geometric circle with parallel lines representing sequencing",
    image: logo2,
    style: "Geometric & Simple"
  },
  {
    id: 3,
    name: "PySeq Wordmark",
    description: "Clean typography wordmark with modern sans-serif font",
    image: logo3,
    style: "Typography Focused"
  },
  {
    id: 4,
    name: "Connected Dots",
    description: "Three dots connected by lines forming an abstract P shape",
    image: logo4,
    style: "Minimal & Modern"
  },
  {
    id: 5,
    name: "Overlapping Shapes",
    description: "Letter P made from two overlapping rounded rectangles",
    image: logo5,
    style: "Geometric Minimal"
  },
  {
    id: 6,
    name: "Repurposing Cycle",
    description: "Modern circular arrows with scientific equipment icons representing the repurposing process",
    image: logo6,
    style: "Concept Driven"
  }
];

export default function LogoSelection() {
  const [selectedLogo, setSelectedLogo] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="gap-2" data-testid="button-back">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Choose Your PySeq Logo
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select the logo design that best represents the PySeq open source community
          </p>
          {selectedLogo && (
            <Badge className="mt-4" data-testid="badge-selected">
              Logo {selectedLogo} Selected
            </Badge>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {logos.map((logo) => (
            <Card
              key={logo.id}
              className={`p-6 hover-elevate active-elevate-2 cursor-pointer transition-all ${
                selectedLogo === logo.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedLogo(logo.id)}
              data-testid={`card-logo-${logo.id}`}
            >
              <div className="relative">
                {selectedLogo === logo.id && (
                  <div className="absolute top-2 right-2 z-10">
                    <div className="bg-primary text-primary-foreground rounded-full p-1">
                      <Check className="h-5 w-5" data-testid={`icon-selected-${logo.id}`} />
                    </div>
                  </div>
                )}
                
                <div className="aspect-square bg-white rounded-lg mb-4 flex items-center justify-center p-4">
                  <img
                    src={logo.image}
                    alt={logo.name}
                    className="w-full h-full object-contain"
                    data-testid={`img-logo-${logo.id}`}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {logo.name}
                    </h3>
                    <Badge variant="secondary" className="text-xs whitespace-nowrap">
                      {logo.style}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {logo.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {selectedLogo && (
          <div className="text-center">
            <Card className="p-6 max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                You've selected: {logos.find(l => l.id === selectedLogo)?.name}
              </h3>
              <p className="text-muted-foreground mb-4">
                This logo will represent the PySeq open source community across the website and materials.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button
                  size="lg"
                  onClick={() => {
                    alert(`Logo ${selectedLogo} confirmed! The ${logos.find(l => l.id === selectedLogo)?.name} design has been selected.`);
                  }}
                  data-testid="button-confirm"
                >
                  Confirm Selection
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setSelectedLogo(null)}
                  data-testid="button-clear"
                >
                  Clear Selection
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
