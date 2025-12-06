import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Dumbbell, Mail, Lock, User, Ruler, Weight, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import api from "@/lib/api"; // ← très important

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    height: "",
    weight: "",
    age: "",
    gender: "male",
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenderChange = (value: string) => {
    setFormData({ ...formData, gender: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirm_password) {
      toast({ title: "Erreur", description: "Les mots de passe ne correspondent pas", variant: "destructive" });
      setIsLoading(false);
      return;
    }

    try {
      const res = await api.post("/auth/register/", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirm_password,
        age: formData.age ? parseInt(formData.age) : null,
        height: formData.height ? parseFloat(formData.height) : null,
        weight: formData.weight ? parseFloat(formData.weight) : null,
        gender: formData.gender,
      });

      // Connexion automatique après inscription
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);

      toast({ title: "Succès !", description: "Compte créé avec succès" });
      navigate("/");
    } catch (err: any) {
      const msg = err.response?.data?.detail || err.response?.data?.email?.[0] || "Erreur lors de l'inscription";
      toast({ title: "Erreur", description: msg, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Dumbbell className="h-12 w-12 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Créer votre compte</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input id="name" name="name" placeholder="Houssem" className="pl-10" value={formData.name} onChange={handleChange} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input id="email" name="email" type="email" placeholder="vous@example.com" className="pl-10" value={formData.email} onChange={handleChange} required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input id="password" name="password" type="password" className="pl-10" value={formData.password} onChange={handleChange} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm_password">Confirmer</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input id="confirm_password" name="confirm_password" type="password" className="pl-10" value={formData.confirm_password} onChange={handleChange} required />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height">Taille (cm)</Label>
                <div className="relative">
                  <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input id="height" name="height" type="number" placeholder="175" className="pl-10" value={formData.height} onChange={handleChange} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Poids (kg)</Label>
                <div className="relative">
                  <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input id="weight" name="weight" type="number" placeholder="70" className="pl-10" value={formData.weight} onChange={handleChange} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Âge</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input id="age" name="age" type="number" placeholder="30" className="pl-10" value={formData.age} onChange={handleChange} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Genre</Label>
              <RadioGroup value={formData.gender} onValueChange={handleGenderChange} className="flex space-x-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Homme</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Femme</Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full bg-green-600 hover:bg-green-700">
              {isLoading ? "Création..." : "Créer le compte"}
            </Button>

            <div className="text-center text-sm">
              Déjà un compte ?{" "}
              <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">
                Se connecter
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;