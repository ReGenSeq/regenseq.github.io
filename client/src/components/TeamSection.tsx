import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Building2 } from "lucide-react";
import kasparImage from "@assets/kaspar_1762799962953.png";

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
    image: kasparImage,
  },
];

export function TeamSection() {
  return (
    <section 
      id="team" 
      className="min-h-screen flex items-start overflow-y-auto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full py-20 md:pt-28 lg:pt-32 md:pb-[15vh]">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-heading-main font-bold text-foreground mb-3 sm:mb-4 md:mb-6 px-2">
            Leadership Team
          </h2>
          <p className="text-subtitle text-muted-foreground max-w-3xl mx-auto px-2">
            Combining expertise in engineering, biology, software development, and open source community building
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {team.map((member, index) => (
            <Card 
              key={index} 
              className="p-5 sm:p-6 text-center hover-elevate bg-background"
              data-testid={`card-team-${index}`}
            >
              <Avatar className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-primary/10">
                {member.image && <AvatarImage src={member.image} alt={member.name} />}
                <AvatarFallback className="text-lg sm:text-xl font-semibold text-primary">
                  {member.initials}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-base sm:text-lg mb-1">{member.name}</h3>
              <p className="text-xs sm:text-sm text-primary font-medium mb-2">{member.role}</p>
              <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-2 sm:mb-3">
                <Building2 className="h-3 w-3" />
                {member.org}
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">{member.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
