import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Building2 } from "lucide-react";
import kasparImage from "@assets/kaspar_1762799962953.png";
import danielImage from "@assets/daniel_1762800086816.webp";
import { teamMembers } from "@/data/team";

/**
 * Local asset overrides for members whose photos are bundled assets rather
 * than external URLs.  Keys match the member's `name` field in team.ts.
 */
const localImages: Record<string, string> = {
  "Dr. Daniel Domovic": danielImage,
  "Kaspar Bumke": kasparImage,
};

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
          {teamMembers.map((member, index) => {
            const imageSrc = localImages[member.name] ?? member.imageUrl;
            return (
              <Card 
                key={index} 
                className="p-5 sm:p-6 text-center hover-elevate bg-background"
                data-testid={`card-team-${index}`}
              >
                <Avatar className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-primary/10">
                  {imageSrc && <AvatarImage src={imageSrc} alt={member.name} />}
                  <AvatarFallback className="text-lg sm:text-xl font-semibold text-primary">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <a 
                  href={`mailto:${member.email}`}
                  className="font-semibold text-base sm:text-lg mb-1 inline-block hover:text-primary transition-colors"
                  data-testid={`link-email-${member.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {member.name}
                </a>
                <p className="text-xs sm:text-sm text-primary font-medium mb-2">{member.role}</p>
                <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-2 sm:mb-3">
                  <Building2 className="h-3 w-3" />
                  {member.org}
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">{member.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
