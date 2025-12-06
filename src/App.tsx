import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthGuard } from "@/components/AuthGuard";

import Index from "./pages/Index";
import Calculator from "./pages/Calculator";
import DietPlanner from "./pages/DietPlanner";
import Workouts from "./pages/Workouts";
import UserProfile from "./pages/UserProfile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Vérifie si l'utilisateur est connecté
  const isAuthenticated = () => !!localStorage.getItem("access_token");

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Routes publiques */}
              <Route
                path="/login"
                element={isAuthenticated() ? <Navigate to="/" replace /> : <Login />}
              />
              <Route
                path="/register"
                element={isAuthenticated() ? <Navigate to="/" replace /> : <Register />}
              />

              {/* Routes protégées */}
              <Route path="/" element={<AuthGuard><Index /></AuthGuard>} />
              <Route path="/calculator" element={<AuthGuard><Calculator /></AuthGuard>} />
              <Route path="/diet-planner" element={<AuthGuard><DietPlanner /></AuthGuard>} />
              <Route path="/workouts" element={<AuthGuard><Workouts /></AuthGuard>} />
              <Route path="/profile" element={<AuthGuard><UserProfile /></AuthGuard>} />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
