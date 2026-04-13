import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
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
import { Blog } from "@/pages/Blog";
import { Investors } from "@/pages/Investors";
import { MerchantSetup } from "@/pages/MerchantSetup";
import { DeliverySetup } from "@/pages/DeliverySetup";
import { RestaurantSetup } from "@/pages/RestaurantSetup";
import { SplashVideo } from "@/pages/SplashVideo";
import { ZyphixNow } from "@/pages/ZyphixNow";
import { ZyphixEats } from "@/pages/ZyphixEats";
import { ZyphixBook } from "@/pages/ZyphixBook";
import { KiranaMap } from "@/pages/KiranaMap";
import { Offers } from "@/pages/Offers";
import { AppComingSoon } from "@/pages/AppComingSoon";
import { Account } from "@/pages/Account";
import { AuthProvider } from "@/context/AuthContext";
import { AuthModal } from "@/components/AuthModal";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";

const queryClient = new QueryClient();

const DARK_ROUTES = ['/now', '/eats', '/book', '/offers', '/kirana-map'];

function DarkLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: '#0A0E1A', color: '#fff' }}>
      <Navbar />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 16px 96px', boxSizing: 'border-box' as const }}>
        {children}
      </div>
      <BottomNav />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/light" component={HomeLight} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/blog" component={Blog} />
      <Route path="/investors" component={Investors} />
      <Route path="/merchant-setup" component={MerchantSetup} />
      <Route path="/delivery-setup" component={DeliverySetup} />
      <Route path="/restaurant-setup" component={RestaurantSetup} />
      <Route path="/splash-video" component={SplashVideo} />
      <Route path="/now">
        <DarkLayout><ZyphixNow /></DarkLayout>
      </Route>
      <Route path="/eats">
        <DarkLayout><ZyphixEats /></DarkLayout>
      </Route>
      <Route path="/book">
        <DarkLayout><ZyphixBook /></DarkLayout>
      </Route>
      <Route path="/offers">
        <DarkLayout><Offers /></DarkLayout>
      </Route>
      <Route path="/kirana-map">
        <DarkLayout><KiranaMap /></DarkLayout>
      </Route>
      <Route path="/app" component={AppComingSoon} />
      <Route path="/account">
        <DarkLayout><Account /></DarkLayout>
      </Route>
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
