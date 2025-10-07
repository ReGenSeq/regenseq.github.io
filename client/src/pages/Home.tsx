import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { GrantSection } from "@/components/GrantSection";
import { TeamSection } from "@/components/TeamSection";
import { ResourcesSection } from "@/components/ResourcesSection";
import { CommunitySection } from "@/components/CommunitySection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <GrantSection />
      <TeamSection />
      <ResourcesSection />
      <CommunitySection />
      <Footer />
    </div>
  );
}
