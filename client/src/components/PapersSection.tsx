import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink } from "lucide-react";

const papers = [
  {
    type: "Journal Article",
    venue: "Nature Scientific Reports · 2022",
    title: "Repurposing an Illumina HiSeq 2500 sequencer as a high-throughput spatial biology platform",
    description: "Peer-reviewed publication describing the PySeq2500 system for automated fluorescence imaging using decommissioned DNA sequencers.",
    link: "https://www.nature.com/articles/s41598-022-08740-w",
    buttonText: "Read Paper",
    highlight: true,
  },
  {
    type: "Preprint",
    venue: "bioRxiv · 2021",
    title: "An open source Python code base and flow cell design for repurposing HiSeq 2500",
    description: "Early preprint introducing the open source codebase and custom flow cell design that enables the HiSeq 2500 to perform spatial biology assays.",
    link: "https://www.biorxiv.org/content/10.1101/2021.06.25.449721v1",
    buttonText: "Read Preprint",
    highlight: false,
  },
];

export function PapersSection() {
  return (
    <section
      id="papers"
      className="min-h-screen flex items-start overflow-y-auto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full py-20 md:pt-28 lg:pt-32 md:pb-[15vh]">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-heading-main font-bold text-foreground mb-3 sm:mb-4 md:mb-6 px-2">
            Papers
          </h2>
          <p className="text-subtitle text-muted-foreground max-w-3xl mx-auto px-2">
            Scientific publications and preprints from the RegenSeq project
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {papers.map((paper, index) => (
            <Card
              key={index}
              className={`p-6 sm:p-8 hover-elevate flex flex-col ${paper.highlight ? 'border-primary/50' : ''}`}
              data-testid={`card-paper-${index}`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`rounded-lg ${paper.highlight ? 'bg-primary/10' : 'bg-muted/50'} w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shrink-0`}>
                  <FileText className={`h-5 w-5 sm:h-6 sm:w-6 ${paper.highlight ? 'text-primary' : 'text-foreground'}`} />
                </div>
                <div>
                  <span className={`text-xs font-semibold uppercase tracking-wider ${paper.highlight ? 'text-primary' : 'text-muted-foreground'}`}>
                    {paper.type}
                  </span>
                  <p className="text-xs text-muted-foreground mt-0.5">{paper.venue}</p>
                </div>
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 leading-snug">{paper.title}</h3>
              <p className="text-sm text-muted-foreground mb-6 flex-grow leading-relaxed">{paper.description}</p>
              <Button
                variant={paper.highlight ? "default" : "outline"}
                className="w-full gap-2 text-sm"
                data-testid={`button-paper-${index}`}
                onClick={() => window.open(paper.link, '_blank')}
              >
                {paper.buttonText}
                <ExternalLink className="h-4 w-4" />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
