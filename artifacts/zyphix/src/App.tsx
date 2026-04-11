import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";

import { Home } from "@/pages/Home";
import { ZyphixNow } from "@/pages/ZyphixNow";
import { ZyphixEats } from "@/pages/ZyphixEats";
import { ZyphixBook } from "@/pages/ZyphixBook";
import { KiranaMap } from "@/pages/KiranaMap";
import { Offers } from "@/pages/Offers";

const queryClient = new QueryClient();

function SubLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col pb-16 md:pb-0" style={{ background: 'var(--z-bg)', color: 'white' }}>
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/now">
        <SubLayout><ZyphixNow /></SubLayout>
      </Route>
      <Route path="/eats">
        <SubLayout><ZyphixEats /></SubLayout>
      </Route>
      <Route path="/book">
        <SubLayout><ZyphixBook /></SubLayout>
      </Route>
      <Route path="/map">
        <SubLayout><KiranaMap /></SubLayout>
      </Route>
      <Route path="/offers">
        <SubLayout><Offers /></SubLayout>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
