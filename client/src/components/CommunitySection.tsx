import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code2, Heart, GitPullRequest, MessageCircle } from "lucide-react";

const ways = [
  {
    icon: Code2,
    title: "Contribute Code",
    description: "Add support for new instruments, develop protocols, or improve the core software",
  },
  {
    icon: GitPullRequest,
    title: "Submit Issues",
    description: "Report bugs, request features, or suggest improvements on GitHub",
  },
  {
    icon: MessageCircle,
    title: "Join Discussions",
    description: "Share your research, ask questions, and learn from the community",
  },
  {
    icon: Heart,
    title: "Spread the Word",
    description: "Help grow the ecosystem by sharing RegenSeq with colleagues and institutions",
  },
];

export function CommunitySection() {
  return (
    <section 
      id="community" 
      className="min-h-screen md:h-screen flex items-start md:snap-start md:snap-always overflow-y-auto md:overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full py-20 md:pt-28 lg:pt-32 md:pb-8">
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-heading-main font-bold text-foreground mb-3 sm:mb-4 md:mb-6 px-2">
            Join the Community
          </h2>
          <p className="text-subtitle text-muted-foreground max-w-3xl mx-auto px-2">
            RegenSeq is a community-driven project. Your contributions, questions, and feedback 
            help build a more accessible future for biological research
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-8 md:mb-10">
          {ways.map((way, index) => (
            <Card 
              key={index} 
              className="p-5 sm:p-6 text-center hover-elevate bg-background"
              data-testid={`card-community-${index}`}
            >
              <div className="rounded-lg bg-accent/10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <way.icon className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base">{way.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">{way.description}</p>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Card className="p-6 sm:p-8 max-w-2xl mx-auto bg-background">
            <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Ready to Get Started?</h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-5 sm:mb-6">
              Visit our GitHub repository to explore the code, read the documentation, 
              and start repurposing sequencers for your research
            </p>
            <Button 
              size="lg" 
              className="gap-2 w-full sm:w-auto"
              data-testid="button-get-started"
              onClick={() => window.open('https://github.com/nygctech/PySeq2500', '_blank')}
            >
              Get Started with RegenSeq
              <Code2 className="h-5 w-5" />
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
}
