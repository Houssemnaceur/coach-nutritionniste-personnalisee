import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthGuard } from "@/components/AuthGuard";

import Progress from "./pages/progress";
import Index from "./pages/Index";
import Calculator from "./pages/Calculator";
import DietPlanner from "./pages/DietPlanner";
import Workouts from "./pages/Workouts";
import UserProfile from "./pages/UserProfile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog"
import BlogPost from "./pages/BlogPost";

const queryClient = new QueryClient();

const App = () => {
  const isAuthenticated = () => !!localStorage.getItem("access_token");

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route
                path="/login"
                element={isAuthenticated() ? <Navigate to="/" replace /> : <Login />}
              />
              <Route
                path="/register"
                element={isAuthenticated() ? <Navigate to="/" replace /> : <Register />}
              />

              <Route path="/" element={<AuthGuard><Index /></AuthGuard>} />
              <Route path="/calculator" element={<AuthGuard><Calculator /></AuthGuard>} />
              <Route path="/diet-planner" element={<AuthGuard><DietPlanner /></AuthGuard>} />
              <Route path="/workouts" element={<AuthGuard><Workouts /></AuthGuard>} />
              <Route path="/progress" element={<AuthGuard><Progress /></AuthGuard>} />
              <Route path="/profile" element={<AuthGuard><UserProfile /></AuthGuard>} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;