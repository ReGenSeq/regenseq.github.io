import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Building2 } from "lucide-react";
import kasparImage from "@assets/kaspar_1762799962953.png";
import danielImage from "@assets/daniel_1762800086816.webp";

const team = [
  {
    name: "Dr. Kunal Pandit",
    role: "Technical Lead",
    initials: "KP",
    org: "New York Genome Center",
    email: "kpandit@nygenome.org",
    description: "Senior Research Engineer at the New York Genome Center and principal author of RegenSeq's open-source PySeq2500 control software. Dr. Pandit leads hardware integration and instrument control development, enabling researchers to run custom spatial biology protocols on repurposed Illumina HiSeq 2500 sequencers.",
    image: "https://images.squarespace-cdn.com/content/v1/627e96178e8a965a2a04b415/1654954748529-MO49MWUTEGCT6O7ZEJ48/20201026_153623.jpg",
  },
  {
    name: "Dr. Maros Pleska",
    role: "Co-Technical Lead",
    initials: "MP",
    org: "New York Genome Center",
    email: "mpleska@nygenome.org",
    description: "Research Scientist at the New York Genome Center specializing in spatial transcriptomics and proteomics. Dr. Pleska applies RegenSeq workflows to multiplexed imaging experiments and contributes expertise in image processing and single-cell data analysis to the project.",
    image: "https://images.squarespace-cdn.com/content/v1/627e96178e8a965a2a04b415/73655136-cdf7-4826-a2fb-3780555fefd2/Maros+Pleska.jpg",
  },
  {
    name: "Dr. Daniel Domovic",
    role: "Entrepreneurial Lead",
    initials: "DD",
    org: "New York Genome Center",
    email: "ddomovic@nygenome.org",
    description: "Scientific Program Manager at the New York Genome Center with a computer science background. Dr. Domovic drives community outreach, partnership development, and stakeholder coordination, helping transition RegenSeq from a single-lab tool into a sustainable open-source ecosystem.",
    image: danielImage,
  },
  {
    name: "Kaspar Bumke",
    role: "Industry Mentor",
    initials: "KB",
    org: "Kitspace",
    email: "kaspar@kitspace.org",
    description: "Electronic engineer and software developer at Kitspace, an open-source platform for sharing electronics designs. Kaspar brings deep expertise in open hardware community building and has made major contributions to the OpenFlexure microscope project, advising RegenSeq on ecosystem governance and open-source best practices.",
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
          ))}
        </div>
      </div>
    </section>
  );
}
