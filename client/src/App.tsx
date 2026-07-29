import { Router, Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import Home from "@/pages/Home";
import HiSeqOutline from "@/pages/HiSeqOutline";
import LogoSelection from "@/pages/LogoSelection";
import BackgroundSelection from "@/pages/BackgroundSelection";
import CommunityGuidelines from "@/pages/CommunityGuidelines";
import RequestFlowcells from "@/pages/RequestFlowcells";
import FindSequencer from "@/pages/FindSequencer";
import NotFound from "@/pages/not-found";

function Routes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/community-guidelines" component={CommunityGuidelines} />
      <Route path="/community/request-flowcells" component={RequestFlowcells} />
      <Route path="/community/find-a-sequencer" component={FindSequencer} />
      <Route path="/hiseq-outline" component={HiSeqOutline} />
      <Route path="/logo-selection" component={LogoSelection} />
      <Route path="/background-selection" component={BackgroundSelection} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router base={import.meta.env.BASE_URL}>
            <Routes />
          </Router>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
