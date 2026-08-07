import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Book, ExternalLink, FlaskConical, Search, Users } from "lucide-react";
import { Link } from "wouter";

type ExternalButton = { text: string; link: string };

type CardDef = {
  icon: React.ElementType;
  title: string;
  description: string;
  highlight?: boolean;
  externalButtons?: ExternalButton[];
  internalHref?: string;
  buttonText?: string;
};

const allCards: CardDef[] = [
  {
    icon: Github,
    title: "GitHub Repository",
    description: "RegenSeq control software and documentation",
    highlight: true,
    externalButtons: [
      { text: "Legacy PySeq2500", link: "https://github.com/nygctech/PySeq2500" },
      { text: "ReGenSeq PySeq2500", link: "https://github.com/ReGenSeq/PySeq2500" },
    ],
  },
  {
    icon: Book,
    title: "Documentation",
    description: "Repurpose an Illumina HiSeq 2500 system to function as an automated fluorescence microscope",
    externalButtons: [{ text: "Read the Docs", link: "https://pyseq2500.readthedocs.io" }],
  },
  {
    icon: Book,
    title: "RegenSeq Protocols",
    description: "Step-by-step protocols and methods for RegenSeq workflows",
    externalButtons: [{ text: "View Protocols", link: "https://www.protocols.io/workspaces/regenseq" }],
  },
  {
    icon: FlaskConical,
    title: "Request or Purchase Flowcells",
    description:
      "Request flowcells for your project or purchase additional flowcells for $50 each. Tell us how many you need and how you plan to use them.",
    internalHref: "/community/request-flowcells",
    buttonText: "Request Flowcells",
  },
  {
    icon: Search,
    title: "Find a Sequencer",
    description:
      "Looking for access to a sequencer? Tell us who you are, where you are located, and what you want to accomplish.",
    internalHref: "/community/find-a-sequencer",
    buttonText: "Find a Sequencer",
  },
  {
    icon: Users,
    title: "Community & Media",
    description:
      "Watch ReGenSeq demonstrations and tutorials, and follow project news and community updates.",
    externalButtons: [
      { text: "Watch on YouTube", link: "https://youtube.com/@ReGenSeq" },
      { text: "Follow on Bluesky", link: "https://bsky.app/profile/regenseq.bsky.social" },
    ],
  },
];

export function ResourcesSection() {
  return (
    <section
      id="resources"
      className="min-h-screen flex items-start overflow-y-auto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full py-20 md:pt-28 lg:pt-32 md:pb-[15vh]">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-heading-main font-bold text-foreground mb-3 sm:mb-4 md:mb-6 px-2">
            Resources
          </h2>
          <p className="text-subtitle text-muted-foreground max-w-3xl mx-auto px-2">
            Everything you need to get started with RegenSeq
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-6xl mx-auto">
          {allCards.map((card, index) => (
            <Card
              key={index}
              className={`p-5 sm:p-6 hover-elevate w-full ${card.highlight ? "border-primary/50" : ""}`}
              data-testid={`card-resource-${index}`}
            >
              <div className="flex flex-col h-full">
                <div
                  className={`rounded-lg ${card.highlight ? "bg-primary/10" : "bg-muted/50"} w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-3 sm:mb-4`}
                >
                  <card.icon
                    className={`h-5 w-5 sm:h-6 sm:w-6 ${card.highlight ? "text-primary" : "text-foreground"}`}
                  />
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 sm:mb-6 flex-grow">{card.description}</p>

                {card.externalButtons ? (
                  <div className="flex flex-col gap-2">
                    {card.externalButtons.map((btn, btnIndex) => (
                      <Button
                        key={btnIndex}
                        variant={btnIndex === 0 ? "outline" : "default"}
                        className="w-full gap-2 text-sm"
                        data-testid={`button-resource-${index}-${btnIndex}`}
                        onClick={() => window.open(btn.link, "_blank")}
                      >
                        {btn.text}
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    ))}
                  </div>
                ) : (
                  <Link href={card.internalHref!}>
                    <Button
                      variant="outline"
                      className="w-full gap-2 text-sm"
                      data-testid={`button-resource-${index}`}
                    >
                      {card.buttonText}
                    </Button>
                  </Link>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
