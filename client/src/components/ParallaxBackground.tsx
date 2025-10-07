import { useEffect, useState } from "react";
import dnaImage from "@assets/stock_images/dna_double_helix_str_dfd0fdda.jpg";
import microscopeImage from "@assets/stock_images/laboratory_microscop_e8e82979.jpg";
import sequencerImage from "@assets/stock_images/dna_sequencing_machi_ea099a44.jpg";

export function ParallaxBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-secondary/3 to-accent/3" />
      
      <div
        className="absolute opacity-15"
        style={{
          right: `${20 - scrollY * 0.15}%`,
          top: "10%",
          width: "300px",
          height: "300px",
          transform: `translateY(${scrollY * 0.1}px) rotate(${scrollY * 0.05}deg)`,
        }}
      >
        <img 
          src={dnaImage} 
          alt="" 
          className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-screen"
        />
      </div>

      <div
        className="absolute opacity-12"
        style={{
          right: `${60 - scrollY * 0.25}%`,
          top: "35%",
          width: "400px",
          height: "400px",
          transform: `translateY(${scrollY * 0.08}px) rotate(${-scrollY * 0.03}deg)`,
        }}
      >
        <img 
          src={microscopeImage} 
          alt="" 
          className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-screen"
        />
      </div>

      <div
        className="absolute opacity-10"
        style={{
          right: `${40 - scrollY * 0.2}%`,
          top: "60%",
          width: "500px",
          height: "350px",
          transform: `translateY(${scrollY * 0.12}px) rotate(${scrollY * 0.02}deg)`,
        }}
      >
        <img 
          src={sequencerImage} 
          alt="" 
          className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-screen"
        />
      </div>

      <div
        className="absolute opacity-15"
        style={{
          right: `${-30 - scrollY * 0.18}%`,
          top: "80%",
          width: "350px",
          height: "350px",
          transform: `translateY(${scrollY * 0.09}px) rotate(${scrollY * 0.04}deg)`,
        }}
      >
        <img 
          src={dnaImage} 
          alt="" 
          className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-screen"
        />
      </div>

      <div
        className="absolute opacity-12"
        style={{
          right: `${10 - scrollY * 0.22}%`,
          top: "120%",
          width: "450px",
          height: "450px",
          transform: `translateY(${scrollY * 0.07}px) rotate(${-scrollY * 0.06}deg)`,
        }}
      >
        <img 
          src={microscopeImage} 
          alt="" 
          className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-screen"
        />
      </div>

      <div
        className="absolute opacity-10"
        style={{
          right: `${50 - scrollY * 0.17}%`,
          top: "150%",
          width: "480px",
          height: "340px",
          transform: `translateY(${scrollY * 0.11}px) rotate(${scrollY * 0.03}deg)`,
        }}
      >
        <img 
          src={sequencerImage} 
          alt="" 
          className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-screen"
        />
      </div>

      <div
        className="absolute opacity-15"
        style={{
          right: `${-20 - scrollY * 0.19}%`,
          top: "180%",
          width: "320px",
          height: "320px",
          transform: `translateY(${scrollY * 0.1}px) rotate(${scrollY * 0.05}deg)`,
        }}
      >
        <img 
          src={dnaImage} 
          alt="" 
          className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-screen"
        />
      </div>

      <div
        className="absolute opacity-12"
        style={{
          right: `${30 - scrollY * 0.16}%`,
          top: "220%",
          width: "420px",
          height: "420px",
          transform: `translateY(${scrollY * 0.08}px) rotate(${-scrollY * 0.04}deg)`,
        }}
      >
        <img 
          src={sequencerImage} 
          alt="" 
          className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-screen"
        />
      </div>
    </div>
  );
}
