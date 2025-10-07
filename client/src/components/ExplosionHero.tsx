import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, FileText, ArrowRight } from "lucide-react";

export function ExplosionHero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden snap-start snap-always">
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-32 text-center">
        <Badge 
          className="mb-6 bg-accent/20 text-accent-foreground border-accent/30"
          data-testid="badge-nsf-grant"
        >
          NSF POSE Phase 1 Award
        </Badge>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight">
          RegenSeq Open Source
          <br />
          Community
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
          Repurposing decommissioned DNA sequencers into flexible automation platforms 
          for spatial biology research
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Button 
            size="lg" 
            className="gap-2"
            data-testid="button-github"
            onClick={() => window.open('https://github.com/nygctech/PySeq2500', '_blank')}
          >
            <Github className="h-5 w-5" />
            View on GitHub
            <ArrowRight className="h-4 w-4" />
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            className="gap-2"
            data-testid="button-paper"
            onClick={() => window.open('https://www.nature.com/articles/s41598-022-08740-w', '_blank')}
          >
            <FileText className="h-5 w-5" />
            Read the Paper
          </Button>
        </div>
      </div>
    </section>
  );
}
