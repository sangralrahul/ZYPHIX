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

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col pb-16 md:pb-0" style={{ background: '#0A0E1A', color: 'white' }}>
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
      <Route path="/now" component={ZyphixNow} />
      <Route path="/eats" component={ZyphixEats} />
      <Route path="/book" component={ZyphixBook} />
      <Route path="/map" component={KiranaMap} />
      <Route path="/offers" component={Offers} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Layout>
            <Router />
          </Layout>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
