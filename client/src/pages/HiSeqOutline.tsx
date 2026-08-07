import { HiSeq2500Outline } from "@/components/HiSeq2500Outline";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";

export default function HiSeqOutline() {
  return (
    <div className="min-h-screen bg-background p-8">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="gap-2" data-testid="button-back">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            HiSeq 2500 Sequencer Outline
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A technical line drawing of the Illumina HiSeq 2500 DNA sequencing system
          </p>
        </div>
        
        <Card className="p-8">
          <div className="w-full max-w-4xl mx-auto text-foreground">
            <HiSeq2500Outline />
          </div>
        </Card>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground max-w-3xl mx-auto">
            The HiSeq 2500 is a large-scale benchtop DNA sequencer featuring an integrated monitor, 
            precision fluidics system, dual flow cell chambers, and sophisticated temperature control. 
            This outline shows the main instrument cabinet, control panel, flow cell chamber, 
            and swivel-mounted monitor.
          </p>
        </div>
      </div>
    </div>
  );
}
