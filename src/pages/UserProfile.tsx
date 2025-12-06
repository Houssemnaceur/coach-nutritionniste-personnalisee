import { useState, useEffect } from "react";
import { User, Settings, Moon, Sun, Shield, LogOut } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import { useStore } from "@/lib/store";
import { useTheme } from "@/components/ThemeProvider";

const UserProfile = () => {
  const { user, updateUser, logout } = useStore();
  const { toggleTheme } = useTheme();
  
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    height: String(user.height),
    weight: String(user.weight),
    darkMode: user.darkMode,
    notifications: user.notifications
  });

  // Update form when user data changes
  useEffect(() => {
    setFormData({
      name: user.name,
      email: user.email,
      height: String(user.height),
      weight: String(user.weight),
      darkMode: user.darkMode,
      notifications: user.notifications
    });
  }, [user]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveChanges = () => {
    updateUser({
      name: formData.name,
      email: formData.email,
      height: parseFloat(formData.height),
      weight: parseFloat(formData.weight),
      notifications: formData.notifications
    });
    
    toast({
      title: "Profile Updated",
      description: "Your profile changes have been saved successfully.",
    });
  };

  const handleDarkModeToggle = () => {
    const newDarkMode = !formData.darkMode;
    setFormData(prev => ({ ...prev, darkMode: newDarkMode }));
    updateUser({ darkMode: newDarkMode });
    toggleTheme();
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 dark:text-white">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Your Profile</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">Manage your account settings and preferences</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div>
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                    <User className="h-12 w-12 text-green-600 dark:text-green-400" />
                  </div>
                  <h2 className="text-xl font-bold dark:text-white">{user.name}</h2>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">{user.email}</p>
                  <p className="text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full capitalize">
                    {user.goal === 'lose' ? 'Weight Loss' : 
                     user.goal === 'gain' ? 'Muscle Gain' : 'Maintenance'}
                  </p>
                </div>

                <Separator className="my-6 dark:bg-gray-700" />

                <nav className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start dark:text-white dark:hover:bg-gray-700">
                    <User className="mr-2 h-4 w-4" />
                    Personal Info
                  </Button>
                  <Button variant="ghost" className="w-full justify-start dark:text-white dark:hover:bg-gray-700">
                    <Settings className="mr-2 h-4 w-4" />
                    Preferences
                  </Button>
                  <Button variant="ghost" className="w-full justify-start dark:text-white dark:hover:bg-gray-700">
                    <Shield className="mr-2 h-4 w-4" />
                    Privacy
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900 dark:hover:text-red-400"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="dark:text-gray-300">Full Name</Label>
                    <Input 
                      id="name" 
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="dark:text-gray-300">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="height" className="dark:text-gray-300">Height (cm)</Label>
                    <Input 
                      id="height" 
                      type="number" 
                      value={formData.height}
                      onChange={(e) => handleInputChange("height", e.target.value)}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="weight" className="dark:text-gray-300">Weight (kg)</Label>
                    <Input 
                      id="weight" 
                      type="number" 
                      value={formData.weight}
                      onChange={(e) => handleInputChange("weight", e.target.value)}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode" className="dark:text-gray-300">Dark Mode</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Switch between light and dark theme</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sun className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <Switch 
                      id="dark-mode" 
                      checked={formData.darkMode}
                      onCheckedChange={handleDarkModeToggle}
                    />
                    <Moon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </div>
                </div>

                <Separator className="dark:bg-gray-700" />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifications" className="dark:text-gray-300">Notifications</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive workout and meal reminders</p>
                  </div>
                  <Switch 
                    id="notifications" 
                    checked={formData.notifications}
                    onCheckedChange={(checked) => handleInputChange("notifications", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={saveChanges} className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;