import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/components/protected-route";
import AuthGuard from "@/components/auth-guard";
import Index from "./pages/Index";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { AppLayout } from "./components/app-layout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import Privacy from "./pages/Legal/Privacy";
import Terms from "./pages/Legal/Terms";
import CookiePolicy from "./pages/Legal/CookiePolicy";
import Checkout from "./pages/Checkout/Checkout";
import DashboardPage from "./pages/dashboard/page";
import JobsPage from "./pages/dashboard/jobs/page";
import SitesPage from "./pages/dashboard/sites";
import PostsPage from "./pages/dashboard/posts";
import UsagePage from "./pages/dashboard/usage";
import AccountPage from "./pages/dashboard/account";
import BillingPage from "./pages/dashboard/billing";
import NotificationPage from "./pages/dashboard/notifications";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<AuthGuard><Login /></AuthGuard>} />
            <Route path="/register" element={<AuthGuard><Register /></AuthGuard>} />
            <Route path="/forgot-password" element={<AuthGuard><ForgotPassword /></AuthGuard>} />
            <Route path="/reset-password" element={<AuthGuard><ResetPassword /></AuthGuard>} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/jobs"
              element={
                <ProtectedRoute>
                  <JobsPage />
                </ProtectedRoute>
              }
            />
             <Route
              path="/dashboard/sites"
              element={
                <ProtectedRoute>
                  <SitesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/posts"
              element={
                <ProtectedRoute>
                  <PostsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/usage"
              element={
                <ProtectedRoute>
                  <UsagePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/billing"
              element={
                <ProtectedRoute>
                  <BillingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/account"
              element={
                <ProtectedRoute>
                  <AccountPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/notifications"
              element={
                <ProtectedRoute>
                  <NotificationPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
