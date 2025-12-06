import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Dumbbell, Mail, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import api from "@/lib/api"; // TRÈS IMPORTANT

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer email et mot de passe",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const res = await api.post("/auth/login/", {
        email,
        password,
      });

      // On sauvegarde les tokens JWT
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);

      toast({
        title: "Connecté !",
        description: `Bienvenue ${res.data.user.name || res.data.user.email}`,
      });

      navigate("/");
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.detail ||
        err.response?.data?.non_field_errors?.[0] ||
        "Email ou mot de passe incorrect";

      toast({
        title: "Erreur de connexion",
        description: errorMsg,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Dumbbell className="h-12 w-12 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Connexion</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="vous@example.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isLoading}
            >
              {isLoading ? "Connexion..." : "Se connecter"}
            </Button>

            <div className="text-center text-sm">
              Pas encore de compte ?{" "}
              <Link to="/register" className="text-green-600 hover:text-green-700 font-medium">
                S'inscrire
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;