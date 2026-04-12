import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { Home } from "@/pages/Home";
import { HomeLight } from "@/pages/HomeLight";
import { Privacy } from "@/pages/Privacy";
import { Terms } from "@/pages/Terms";
import { About } from "@/pages/About";
import { Contact } from "@/pages/Contact";
import { MerchantSetup } from "@/pages/MerchantSetup";
import { DeliverySetup } from "@/pages/DeliverySetup";
import { RestaurantSetup } from "@/pages/RestaurantSetup";
import { SplashVideo } from "@/pages/SplashVideo";
import { AuthProvider } from "@/context/AuthContext";
import { AuthModal } from "@/components/AuthModal";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomeLight} />
      <Route path="/dark" component={Home} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/merchant-setup" component={MerchantSetup} />
      <Route path="/delivery-setup" component={DeliverySetup} />
      <Route path="/restaurant-setup" component={RestaurantSetup} />
      <Route path="/splash-video" component={SplashVideo} />
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
