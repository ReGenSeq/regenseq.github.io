import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, FileText, Book, MessageSquare, ExternalLink } from "lucide-react";

const resources = [
  {
    icon: Github,
    title: "GitHub Repository",
    description: "PySeq2500 control software and documentation",
    link: "https://github.com/nygctech/PySeq2500",
    buttonText: "View Repository",
    highlight: true,
  },
  {
    icon: FileText,
    title: "Scientific Publication",
    description: "Nature Scientific Reports paper (2022)",
    link: "https://www.nature.com/articles/s41598-022-08740-w",
    buttonText: "Read Paper",
    highlight: true,
  },
  {
    icon: Book,
    title: "Documentation",
    description: "Setup guides, protocols, and API reference",
    link: "https://github.com/nygctech/PySeq2500#readme",
    buttonText: "View Docs",
    highlight: false,
  },
  {
    icon: MessageSquare,
    title: "Community Forum",
    description: "Get help and share your experiences",
    link: "https://github.com/nygctech/PySeq2500/discussions",
    buttonText: "Join Discussion",
    highlight: false,
  },
];

export function ResourcesSection() {
  return (
    <section id="resources" className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Resources & Links
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Everything you need to get started with PySeq
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {resources.map((resource, index) => (
            <Card 
              key={index} 
              className={`p-8 hover-elevate ${resource.highlight ? 'border-primary/50' : ''}`}
              data-testid={`card-resource-${index}`}
            >
              <div className="flex flex-col h-full">
                <div className={`rounded-lg ${resource.highlight ? 'bg-primary/10' : 'bg-muted/50'} w-12 h-12 flex items-center justify-center mb-4`}>
                  <resource.icon className={`h-6 w-6 ${resource.highlight ? 'text-primary' : 'text-foreground'}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                <p className="text-muted-foreground mb-6 flex-grow">{resource.description}</p>
                <Button
                  variant={resource.highlight ? "default" : "outline"}
                  className="w-full gap-2"
                  data-testid={`button-resource-${index}`}
                  onClick={() => window.open(resource.link, '_blank')}
                >
                  {resource.buttonText}
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
