import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Portfolio from "./pages/Portfolio";
import Projects from "./pages/Projects";
import Remerciements from "./pages/Remerciements";
import NotFound from "./pages/NotFound";

// TODO: Admin components - currently disabled
// import DashboardLayout from "./components/DashboardLayout";
// import Overview from "./pages/dashboard/Overview";
// import Projects from "./pages/dashboard/Projects";
// import Skills from "./pages/dashboard/Skills";
// import CVGenerator from "./pages/dashboard/CVGenerator";
// import Settings from "./pages/dashboard/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/remerciements" element={<Remerciements />} />
          
          {/* TODO: Admin routes - currently disabled */}
          {/* <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Overview />} />
            <Route path="projects" element={<Projects />} />
            <Route path="skills" element={<Skills />} />
            <Route path="cv" element={<CVGenerator />} />
            <Route path="settings" element={<Settings />} />
          </Route> */}
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
