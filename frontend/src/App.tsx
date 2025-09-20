import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ProtectedRoute, LoadingScreen, FloatingLanguageToggle } from "@/components/common";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import Freelancers from "./pages/Freelancers";
import Companies from "./pages/Companies";
import { Login, Register } from "./pages/auth";
import Pricing from "./pages/Pricing";
import { Dashboard, FreelancerDashboard, CompanyDashboard } from "./pages/dashboard";
import Profile from "./pages/Profile";
import Category from "./pages/Category";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Toaster />
      <Sonner />
      <FloatingLanguageToggle />
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/freelancers" element={<Freelancers />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/category/:slug" element={<Category />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Protected Admin Dashboard */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Protected Freelancer Dashboard */}
            <Route
              path="/freelancer/dashboard"
              element={
                <ProtectedRoute allowedRoles={['freelancer']}>
                  <FreelancerDashboard />
                </ProtectedRoute>
              }
            />

            {/* Protected Company Dashboard */}
            <Route
              path="/company/dashboard"
              element={
                <ProtectedRoute allowedRoles={['employer']}>
                  <CompanyDashboard />
                </ProtectedRoute>
              }
            />

            {/* General Protected Dashboard */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <AppContent />
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;