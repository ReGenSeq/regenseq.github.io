import { useEffect, useState } from "react";
import heroImage from "@assets/generated_images/DNA_sequencing_microscopy_hero_image_61613447.png";

interface BackgroundLayerProps {
  sectionIndex: number;
}

export function BackgroundLayer({ sectionIndex }: BackgroundLayerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const translateY = sectionIndex * -150;

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
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translateY(${translateY}px) scale(1.2)`,
          willChange: "transform",
        }}
      >
        <div className="absolute inset-0 bg-background/80 dark:bg-background/85" />
      </div>
    </div>
  );
}
