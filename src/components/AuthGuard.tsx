import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface AuthGuardProps {
  children: ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  // Vérifie si le token existe dans localStorage
  const isAuthenticated = !!localStorage.getItem("access_token");

  if (!isAuthenticated) {
    // Redirige vers login si pas authentifié
    return <Navigate to="/login" replace />;
  }

  // Sinon, affiche les composants enfants
  return <>{children}</>;
};
