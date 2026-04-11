import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { Home } from "@/pages/Home";
import { Privacy } from "@/pages/Privacy";
import { Terms } from "@/pages/Terms";
import { About } from "@/pages/About";
import { Contact } from "@/pages/Contact";
import { MerchantSetup } from "@/pages/MerchantSetup";
import { DeliverySetup } from "@/pages/DeliverySetup";
import { AuthProvider } from "@/context/AuthContext";
import { AuthModal } from "@/components/AuthModal";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/merchant-setup" component={MerchantSetup} />
      <Route path="/delivery-setup" component={DeliverySetup} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
            <AuthModal />
          </WouterRouter>
        </AuthProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
