import { lazy, Suspense } from "react";
import { Router, Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import Home from "@/pages/Home";

const CommunityGuidelines = lazy(() => import("@/pages/CommunityGuidelines"));
const RequestFlowcells = lazy(() => import("@/pages/RequestFlowcells"));
const FindSequencer = lazy(() => import("@/pages/FindSequencer"));
const HiSeqOutline = lazy(() => import("@/pages/HiSeqOutline"));
const LogoSelection = lazy(() => import("@/pages/LogoSelection"));
const BackgroundSelection = lazy(() => import("@/pages/BackgroundSelection"));
const Meeting = lazy(() => import("@/pages/Meeting"));
const NotFound = lazy(() => import("@/pages/not-found"));

function Routes() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center" aria-live="polite">
          <p className="text-sm text-muted-foreground">Loading page…</p>
        </main>
      }
    >
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/community-guidelines" component={CommunityGuidelines} />
        <Route path="/community/request-flowcells" component={RequestFlowcells} />
        <Route path="/community/find-a-sequencer" component={FindSequencer} />
        <Route path="/hiseq-outline" component={HiSeqOutline} />
        <Route path="/logo-selection" component={LogoSelection} />
        <Route path="/background-selection" component={BackgroundSelection} />
        <Route path="/meeting" component={Meeting} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  // Wouter appends the router base to link paths. Remove the trailing slash
  // so the root deployment does not produce malformed URLs such as "//".
  const routerBase = import.meta.env.BASE_URL.replace(/\/$/, "");

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router base={routerBase}>
            <Routes />
          </Router>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
