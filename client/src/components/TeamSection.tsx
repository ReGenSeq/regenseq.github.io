import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Building2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const team = [
  {
    name: "Dr. Kunal Pandit",
    role: "Technical Lead",
    initials: "KP",
    org: "New York Genome Center",
    description: "Senior Research Engineer and author of RegenSeq open-source control software for Illumina HiSeq 2500 systems.",
    image: "https://images.squarespace-cdn.com/content/v1/627e96178e8a965a2a04b415/1654954748529-MO49MWUTEGCT6O7ZEJ48/20201026_153623.jpg",
  },
  {
    name: "Dr. Maros Pleska",
    role: "Co-Technical Lead",
    initials: "MP",
    org: "New York Genome Center",
    description: "Research Scientist applying RegenSeq to spatial transcriptomics and proteomics with expertise in image processing.",
    image: "https://images.squarespace-cdn.com/content/v1/627e96178e8a965a2a04b415/73655136-cdf7-4826-a2fb-3780555fefd2/Maros+Pleska.jpg",
  },
  {
    name: "Dr. Daniel Domovic",
    role: "Entrepreneurial Lead",
    initials: "DD",
    org: "New York Genome Center",
    description: "Scientific Program Manager with computer science background and expertise in project management and stakeholder coordination.",
  },
  {
    name: "Kaspar Bumke",
    role: "Industry Mentor",
    initials: "KB",
    org: "Kitspace",
    description: "Electronic engineer and software developer running Kitspace open source platform with major contributions to OpenFlexure.",
  },
];

export function TeamSection() {
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

  const parallaxOffset = offset < 0 ? Math.abs(offset) * 0.2 : 0;

  return (
    <section 
      ref={sectionRef}
      id="team" 
      className="h-screen flex items-center snap-start snap-always overflow-hidden"
    >
      <div 
        className="max-w-7xl mx-auto px-4 md:px-8 w-full"
        style={{
          transform: `translateY(${-parallaxOffset}px)`,
        }}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Leadership Team
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Combining expertise in engineering, biology, software development, and open source community building
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <Card 
              key={index} 
              className="p-6 text-center hover-elevate bg-background"
              data-testid={`card-team-${index}`}
            >
              <Avatar className="w-20 h-20 mx-auto mb-4 bg-primary/10">
                {member.image && <AvatarImage src={member.image} alt={member.name} />}
                <AvatarFallback className="text-xl font-semibold text-primary">
                  {member.initials}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
              <p className="text-sm text-primary font-medium mb-2">{member.role}</p>
              <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-3">
                <Building2 className="h-3 w-3" />
                {member.org}
              </div>
              <p className="text-sm text-muted-foreground">{member.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
