import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code2, Heart, GitPullRequest, MessageCircle } from "lucide-react";
import { useEffect, useState, useRef } from "react";

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
    description: "Help grow the ecosystem by sharing PySeq with colleagues and institutions",
  },
];

export function CommunitySection() {
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
      id="community" 
      className="h-screen flex items-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 snap-start snap-always overflow-hidden"
    >
      <div 
        className="max-w-7xl mx-auto px-4 md:px-8 w-full"
        style={{
          transform: `translateY(${-parallaxOffset}px)`,
        }}
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Join the Community
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            PySeq is a community-driven project. Your contributions, questions, and feedback 
            help build a more accessible future for biological research
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {ways.map((way, index) => (
            <Card 
              key={index} 
              className="p-6 text-center hover-elevate bg-background"
              data-testid={`card-community-${index}`}
            >
              <div className="rounded-lg bg-accent/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <way.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">{way.title}</h3>
              <p className="text-sm text-muted-foreground">{way.description}</p>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Card className="inline-block p-8 max-w-2xl bg-background">
            <h3 className="text-2xl font-semibold mb-4">Ready to Get Started?</h3>
            <p className="text-muted-foreground mb-6">
              Visit our GitHub repository to explore the code, read the documentation, 
              and start repurposing sequencers for your research
            </p>
            <Button 
              size="lg" 
              className="gap-2"
              data-testid="button-get-started"
              onClick={() => window.open('https://github.com/nygctech/PySeq2500', '_blank')}
            >
              Get Started with PySeq
              <Code2 className="h-5 w-5" />
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
}
