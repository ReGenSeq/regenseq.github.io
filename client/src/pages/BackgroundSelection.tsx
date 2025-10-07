import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check } from "lucide-react";
import { Link, useLocation } from "wouter";
import bg1 from "@assets/generated_images/Technical_blueprint_HiSeq_2500_e13e3779.png";
import bg2 from "@assets/generated_images/Monochrome_photo_HiSeq_2500_83e19cb6.png";
import bg3 from "@assets/generated_images/Ink_sketch_HiSeq_2500_6e3311bb.png";
import bg4 from "@assets/generated_images/Wireframe_3D_HiSeq_2500_bcbb3e57.png";
import bg5 from "@assets/generated_images/Engraving_style_HiSeq_2500_8521325f.png";
import bg6 from "@assets/generated_images/Silhouette_HiSeq_2500_79688799.png";
import bg7 from "@assets/generated_images/Architectural_elevation_HiSeq_2500_44fe7227.png";
import bg8 from "@assets/generated_images/Stippled_illustration_HiSeq_2500_b2cb1e01.png";
import bg9 from "@assets/generated_images/Isometric_drawing_HiSeq_2500_b3bef357.png";
import bg10 from "@assets/generated_images/Close-up_detail_HiSeq_2500_67107863.png";

const backgrounds = [
  {
    id: 1,
    name: "Technical Blueprint",
    description: "Clean engineering schematic with detailed line art",
    image: bg1,
    style: "Blueprint"
  },
  {
    id: 2,
    name: "Monochrome Photo",
    description: "High contrast photographic style with dramatic lighting",
    image: bg2,
    style: "Photographic"
  },
  {
    id: 3,
    name: "Ink Sketch",
    description: "Hand-drawn technical illustration with cross-hatching",
    image: bg3,
    style: "Artistic"
  },
  {
    id: 4,
    name: "Wireframe 3D",
    description: "CAD-style geometric line work render",
    image: bg4,
    style: "3D Technical"
  },
  {
    id: 5,
    name: "Engraving Style",
    description: "Vintage technical drawing with fine parallel lines",
    image: bg5,
    style: "Vintage"
  },
  {
    id: 6,
    name: "Silhouette",
    description: "Minimal solid black shape design",
    image: bg6,
    style: "Minimal"
  },
  {
    id: 7,
    name: "Architectural Elevation",
    description: "Precise engineering drawing with measurements",
    image: bg7,
    style: "Engineering"
  },
  {
    id: 8,
    name: "Stippled Illustration",
    description: "Pointillism technique with detailed dot shading",
    image: bg8,
    style: "Pointillism"
  },
  {
    id: 9,
    name: "Isometric Drawing",
    description: "3D perspective technical diagram",
    image: bg9,
    style: "Isometric"
  },
  {
    id: 10,
    name: "Close-up Detail",
    description: "Photographic close-up of control panel and chamber",
    image: bg10,
    style: "Detail Shot"
  }
];

export default function BackgroundSelection() {
  const [, setLocation] = useLocation();
  const [selectedBg, setSelectedBg] = useState<number | null>(() => {
    const saved = localStorage.getItem('selectedBackground');
    return saved ? parseInt(saved) : null;
  });

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
            Choose Your Background Image
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select the HiSeq 2500 background image style for your site
          </p>
          {selectedBg && (
            <Badge className="mt-4" data-testid="badge-selected">
              Background {selectedBg} Selected
            </Badge>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {backgrounds.map((bg) => (
            <Card
              key={bg.id}
              className={`p-6 hover-elevate active-elevate-2 cursor-pointer transition-all ${
                selectedBg === bg.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedBg(bg.id)}
              data-testid={`card-bg-${bg.id}`}
            >
              <div className="relative">
                {selectedBg === bg.id && (
                  <div className="absolute top-2 right-2 z-10">
                    <div className="bg-primary text-primary-foreground rounded-full p-1">
                      <Check className="h-5 w-5" data-testid={`icon-selected-${bg.id}`} />
                    </div>
                  </div>
                )}
                
                <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center p-4 overflow-hidden">
                  <img
                    src={bg.image}
                    alt={bg.name}
                    className="w-full h-full object-cover"
                    data-testid={`img-bg-${bg.id}`}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {bg.name}
                    </h3>
                    <Badge variant="secondary" className="text-xs whitespace-nowrap">
                      {bg.style}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {bg.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {selectedBg && (
          <div className="text-center">
            <Card className="p-6 max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                You've selected: {backgrounds.find(b => b.id === selectedBg)?.name}
              </h3>
              <p className="text-muted-foreground mb-4">
                This image will be used as the scrolling background across all sections.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button
                  size="lg"
                  onClick={() => {
                    if (selectedBg) {
                      localStorage.setItem('selectedBackground', selectedBg.toString());
                      setLocation('/');
                    }
                  }}
                  data-testid="button-confirm"
                >
                  Confirm Selection
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setSelectedBg(null)}
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
