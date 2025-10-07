import { useEffect, useState } from "react";
import { HiSeq2500Outline } from "./HiSeq2500Outline";
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

const backgroundImages: Record<number, string> = {
  1: bg1,
  2: bg2,
  3: bg3,
  4: bg4,
  5: bg5,
  6: bg6,
  7: bg7,
  8: bg8,
  9: bg9,
  10: bg10,
};

interface BackgroundLayerProps {
  sectionIndex: number;
}

export function BackgroundLayer({ sectionIndex }: BackgroundLayerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedBgId, setSelectedBgId] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
    const saved = localStorage.getItem('selectedBackground');
    if (saved) {
      setSelectedBgId(parseInt(saved));
    }
  }, []);

  const translateY = sectionIndex * -150;
  const selectedImage = selectedBgId ? backgroundImages[selectedBgId] : null;

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: -1,
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.5s ease-in-out",
      }}
    >
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{
          transform: `translateY(${translateY}px) scale(1.5)`,
          willChange: "transform",
        }}
      >
        {selectedImage ? (
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `url(${selectedImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "grayscale(100%)",
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-foreground/10">
            <HiSeq2500Outline />
          </div>
        )}
      </div>
    </div>
  );
}
