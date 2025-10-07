import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check } from "lucide-react";
import { Link } from "wouter";
import logo1 from "@assets/generated_images/Simple_curved_arrow_P_logo_6b9c102b.png";
import logo2 from "@assets/generated_images/RS_monogram_embroidery_logo_ec5a7515.png";
import logo3 from "@assets/generated_images/RegenSeq_bold_wordmark_embroidery_c5dd6b68.png";
import logo4 from "@assets/generated_images/Letter_R_arrow_cycle_embroidery_6d28ce9a.png";
import logo5 from "@assets/generated_images/Elegant_P_loop_brand_mark_e9e5734f.png";

const logos = [
  {
    id: 1,
    name: "Curved Arrow",
    description: "Single smooth curved arrow forming a P shape with thick clean lines",
    image: logo1,
    style: "Bold & Simple"
  },
  {
    id: 2,
    name: "RS Monogram",
    description: "Letters R and S combined into single geometric monogram with thick lines",
    image: logo2,
    style: "Strong & Unified"
  },
  {
    id: 3,
    name: "RegenSeq Wordmark",
    description: "Bold modern typography with thick letterforms, clean and professional",
    image: logo3,
    style: "Typography Bold"
  },
  {
    id: 4,
    name: "R with Arrow",
    description: "Letter R combined with circular arrow element, thick strokes",
    image: logo4,
    style: "Abstract & Dynamic"
  },
  {
    id: 5,
    name: "Loop Mark",
    description: "Single elegant curved line forming a P loop, highly scalable",
    image: logo5,
    style: "Refined & Minimal"
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
