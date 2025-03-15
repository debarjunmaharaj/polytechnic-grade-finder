
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";

import Index from "./pages/Index";
import GroupResults from "./pages/GroupResults";
import InstituteResults from "./pages/InstituteResults";
import LatestResults from "./pages/LatestResults";
import PointResults from "./pages/PointResults";
import Favorites from "./pages/Favorites";
import Admin from "./pages/Admin";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/group-results" element={<GroupResults />} />
            <Route path="/institute-results" element={<InstituteResults />} />
            <Route path="/latest-results" element={<LatestResults />} />
            <Route path="/point-results" element={<PointResults />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
