import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Book,
  Download,
  ExternalLink,
  FlaskConical,
  Github,
  PlayCircle,
  Presentation,
  Search,
} from "lucide-react";
import { Link } from "wouter";

type ResourceLink = { text: string; href: string };

type ReferenceCard = {
  icon: React.ElementType;
  title: string;
  description: string;
  links?: ResourceLink[];
  downloadHref?: string;
};

const referenceCards: ReferenceCard[] = [
  {
    icon: Presentation,
    title: "Ecosystem Overview",
    description:
      "An overview of repurposed sequencers, control software, flow cells, protocols, and image processing.",
    downloadHref: "/RegenSeq_Open_Source_Ecosystem.pdf",
  },
  {
    icon: Book,
    title: "Documentation",
    description:
      "Repurpose an Illumina HiSeq 2500 system to function as an automated fluorescence microscope.",
    links: [{ text: "Read the Docs", href: "https://pyseq2500.readthedocs.io" }],
  },
  {
    icon: Book,
    title: "Protocols",
    description: "Step-by-step protocols and methods for RegenSeq workflows.",
    links: [
      {
        text: "View Protocols",
        href: "https://www.protocols.io/workspaces/regenseq",
      },
    ],
  },
  {
    icon: PlayCircle,
    title: "Video Tutorials",
    description: "RegenSeq demonstrations, tutorials, and project videos.",
    links: [{ text: "Watch on YouTube", href: "https://youtube.com/@ReGenSeq" }],
  },
  {
    icon: Github,
    title: "GitHub Repository",
    description: "RegenSeq control software and documentation.",
    links: [
      { text: "Legacy PySeq2500", href: "https://github.com/nygctech/PySeq2500" },
      { text: "ReGenSeq PySeq2500", href: "https://github.com/ReGenSeq/PySeq2500" },
    ],
  },
];

export function ResourcesSection() {
  return (
    <section id="resources" className="min-h-screen flex items-start overflow-y-auto">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 md:px-8 md:pt-28 md:pb-[15vh] lg:pt-32">
        <div className="mb-8 text-center sm:mb-10 md:mb-12">
          <h2 className="text-heading-main mb-3 px-2 font-bold text-foreground sm:mb-4 md:mb-6">
            Resources
          </h2>
          <p className="text-subtitle mx-auto max-w-3xl px-2 text-muted-foreground">
            Everything you need to get started with RegenSeq
          </p>
        </div>

        <div className="mx-auto max-w-6xl">
          <h3 className="mb-4 text-lg font-semibold text-foreground sm:mb-5">
            Get started with RegenSeq
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            <Card
              className="w-full border-primary/35 bg-primary/[0.045] p-5 hover-elevate sm:p-6"
              data-testid="card-resource-find-sequencer"
            >
              <div className="flex h-full flex-col">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                  <Search className="h-5 w-5" aria-hidden="true" />
                </div>
                <h4 className="mb-2 text-base font-semibold sm:text-lg">Find a Sequencer</h4>
                <p className="mb-5 flex-grow text-sm leading-relaxed text-muted-foreground sm:mb-6">
                  Get help finding a compatible instrument for your lab.
                </p>
                <Button
                  asChild
                  className="h-auto min-h-10 w-full whitespace-normal px-3 py-2 text-center text-sm leading-snug"
                  data-testid="button-resource-find-sequencer"
                >
                  <Link href="/community/find-a-sequencer">Find a Sequencer</Link>
                </Button>
              </div>
            </Card>

            <Card
              className="w-full border-primary/35 bg-primary/[0.045] p-5 hover-elevate sm:p-6"
              data-testid="card-resource-flowcells"
            >
              <div className="flex h-full flex-col">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                  <FlaskConical className="h-5 w-5" aria-hidden="true" />
                </div>
                <h4 className="mb-2 text-base font-semibold sm:text-lg">Get Flowcells</h4>
                <p className="mb-5 flex-grow text-sm leading-relaxed text-muted-foreground sm:mb-6">
                  Request starter flowcells or purchase additional flowcells.
                </p>
                <Button
                  asChild
                  className="h-auto min-h-10 w-full whitespace-normal px-3 py-2 text-center text-sm leading-snug"
                  data-testid="button-resource-flowcells"
                >
                  <Link href="/community/request-flowcells">
                    Request or Purchase Flowcells
                  </Link>
                </Button>
              </div>
            </Card>
          </div>

          <div className="mb-4 mt-10 sm:mb-5 sm:mt-12">
            <h3 className="text-lg font-semibold text-foreground">Explore the ecosystem</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Reference material, methods, and the open-source codebase.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {referenceCards.map((card, index) => (
              <Card
                key={card.title}
                className="flex w-full flex-col border-border/70 bg-card/80 p-4 sm:p-5"
                data-testid={`card-resource-${index}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted/70 text-muted-foreground">
                    <card.icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold leading-snug">{card.title}</h4>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      {card.description}
                    </p>
                  </div>
                </div>

                {card.downloadHref ? (
                  <Button
                    asChild
                    variant="outline"
                    className="mt-4 h-auto min-h-9 w-full whitespace-normal px-3 py-2 text-center text-xs leading-snug"
                  >
                    <a
                      href={card.downloadHref}
                      download
                      data-testid={`button-resource-${index}`}
                    >
                      Download presentation (PDF)
                      <Download className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </a>
                  </Button>
                ) : (
                  <div className="mt-4 flex flex-col gap-2">
                    {card.links?.map((resourceLink, linkIndex) => (
                      <Button
                        key={resourceLink.href}
                        asChild
                        variant="outline"
                        className="h-auto min-h-9 w-full justify-between whitespace-normal px-3 py-2 text-left text-xs leading-snug"
                      >
                        <a
                          href={resourceLink.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-testid={`button-resource-${index}-${linkIndex}`}
                        >
                          <span>{resourceLink.text}</span>
                          <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        </a>
                      </Button>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
