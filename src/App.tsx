import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Watch from "./pages/Watch";
import Auth from "./pages/Auth";
import PubStream from "./pages/PubStream";
import PubStreamWatch from "./pages/PubStreamWatch";
import ChannelPage from "./pages/ChannelPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/watch/:id" element={<Watch />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/pub-stream" element={
              <ProtectedRoute>
                <PubStream />
              </ProtectedRoute>
            } />
            <Route path="/pub-stream/watch/:id" element={
              <ProtectedRoute>
                <PubStreamWatch />
              </ProtectedRoute>
            } />
            <Route path="/pub-stream/channel/:id" element={
              <ProtectedRoute>
                <ChannelPage />
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
