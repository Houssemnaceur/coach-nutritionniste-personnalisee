import { Link, useNavigate } from "react-router-dom";
import { Dumbbell, Menu, X, User, LogOut, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  // Met à jour le nom quand le token change
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setUserName(null);
      return;
    }
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserName(payload.name || payload.email?.split("@")[0] || "Utilisateur");
    } catch {
      setUserName("Utilisateur");
    }
  }, []); // exécuté une seule fois au montage

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUserName(null);

    toast({
      title: "Déconnecté",
      description: "À bientôt !",
    });

    navigate("/login", { replace: true });
    setIsOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <Dumbbell className="h-8 w-8 text-green-600 dark:text-green-400 mr-2" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">Fit+</span>
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-green-600 transition">Home</Link>
            <Link to="/calculator" className="text-gray-700 dark:text-gray-300 hover:text-green-600 transition">Calculator</Link>
            <Link to="/diet-planner" className="text-gray-700 dark:text-gray-300 hover:text-green-600 transition">Diet</Link>
            <Link to="/workouts" className="text-gray-700 dark:text-gray-300 hover:text-green-600 transition">Workouts</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {userName ? (
              <>
                <Link to="/profile" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-green-600">
                  <User className="h-5 w-5 mr-1" />
                  <span className="hidden lg:inline">{userName}</span>
                </Link>
                <Button onClick={handleLogout} variant="ghost" className="text-red-600 hover:text-red-700">
                  <LogOut className="h-5 w-5 mr-1" />
                  <span className="hidden lg:inline">Logout</span>
                </Button>
              </>
            ) : null}
          </div>

          <div className="md:hidden flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            {userName && (
              <Button onClick={handleLogout} variant="ghost" className="text-red-600">
                <LogOut className="h-5 w-5" />
              </Button>
            )}
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="space-y-1 px-2 pt-2">
              <Link to="/" className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsOpen(false)}>Home</Link>
              <Link to="/calculator" className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsOpen(false)}>Calculator</Link>
              <Link to="/diet-planner" className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsOpen(false)}>Diet</Link>
              <Link to="/workouts" className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsOpen(false)}>Workouts</Link>
              <Link to="/profile" className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsOpen(false)}>Profile</Link>
              {userName && (
                <button onClick={handleLogout} className="w-full text-left px-3 py-2 rounded text-red-600 hover:bg-red-50">
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;