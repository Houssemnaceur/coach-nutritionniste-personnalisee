import { useState, useEffect } from "react";
import { Calculator as CalculatorIcon, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import { useStore } from "@/lib/store";

const Calculator = () => {
  const { user, updateUser, setCalorieGoal, calculateTDEE } = useStore();
  
  const [formData, setFormData] = useState({
    age: String(user.age),
    gender: user.gender,
    height: String(user.height),
    weight: String(user.weight),
    activityLevel: user.activityLevel,
    goal: user.goal,
  });
  
  const [results, setResults] = useState<{
    bmr: number;
    tdee: number;
    goalCalories: number;
    protein: number;
    carbs: number;
    fat: number;
  } | null>(null);

  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
  };

  // Calculate TDEE on component mount if user data is available
  useEffect(() => {
    if (user.age && user.gender && user.height && user.weight && user.activityLevel && user.goal) {
      calculateResults();
    }
  }, []);

  const calculateResults = () => {
    if (!formData.age || !formData.gender || !formData.height || !formData.weight || !formData.activityLevel || !formData.goal) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to calculate your TDEE.",
        variant: "destructive",
      });
      return;
    }

    const age = parseFloat(formData.age);
    const height = parseFloat(formData.height);
    const weight = parseFloat(formData.weight);

    // Update user data in store
    updateUser({
      age,
      gender: formData.gender as 'male' | 'female',
      height,
      weight,
      activityLevel: formData.activityLevel as any,
      goal: formData.goal as any,
    });

    // Mifflin-St Jeor Equation
    let bmr;
    if (formData.gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const tdee = bmr * activityMultipliers[formData.activityLevel as keyof typeof activityMultipliers];
    
    let goalCalories;
    switch (formData.goal) {
      case "lose":
        goalCalories = tdee - 500; // 500 calorie deficit
        break;
      case "gain":
        goalCalories = tdee + 500; // 500 calorie surplus
        break;
      default:
        goalCalories = tdee; // maintenance
    }

    // Set calorie goal in store
    setCalorieGoal(Math.round(goalCalories));

    // Macro breakdown (40% carbs, 30% protein, 30% fat)
    const protein = (goalCalories * 0.3) / 4; // 4 calories per gram
    const carbs = (goalCalories * 0.4) / 4;
    const fat = (goalCalories * 0.3) / 9; // 9 calories per gram

    setResults({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      goalCalories: Math.round(goalCalories),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fat: Math.round(fat),
    });

    toast({
      title: "Calculation Complete!",
      description: "Your personalized calorie and macro breakdown is ready.",
    });
  };

  const downloadResults = () => {
    if (!results) return;
    
    const content = `
FitLife Calorie Calculator Results
=====================================

BMR (Basal Metabolic Rate): ${results.bmr} calories
TDEE (Total Daily Energy Expenditure): ${results.tdee} calories
Goal Calories: ${results.goalCalories} calories

Macronutrient Breakdown:
- Protein: ${results.protein}g
- Carbohydrates: ${results.carbs}g
- Fat: ${results.fat}g

Generated on: ${new Date().toLocaleDateString()}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fitlife-calorie-results.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Calorie Calculator</h1>
          <p className="text-lg text-gray-600">Calculate your daily calorie needs and macro breakdown</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalculatorIcon className="mr-2 h-5 w-5" />
                Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select 
                    value={formData.gender} 
                    onValueChange={(value) => setFormData({ ...formData, gender: value as 'male' | 'female' })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="175"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="70"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="activity">Activity Level</Label>
                <Select 
                  value={formData.activityLevel} 
                  onValueChange={(value) => setFormData({ ...formData, activityLevel: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (little/no exercise)</SelectItem>
                    <SelectItem value="light">Light (light exercise 1-3 days/week)</SelectItem>
                    <SelectItem value="moderate">Moderate (moderate exercise 3-5 days/week)</SelectItem>
                    <SelectItem value="active">Active (hard exercise 6-7 days/week)</SelectItem>
                    <SelectItem value="veryActive">Very Active (very hard exercise, physical job)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="goal">Fitness Goal</Label>
                <Select 
                  value={formData.goal} 
                  onValueChange={(value) => setFormData({ ...formData, goal: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lose">Weight Loss</SelectItem>
                    <SelectItem value="maintain">Maintain Weight</SelectItem>
                    <SelectItem value="gain">Weight Gain</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={calculateResults} 
                className="w-full bg-green-600 hover:bg-green-700"
                size="lg"
              >
                Calculate My Calories
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <CardTitle>Your Results</CardTitle>
            </CardHeader>
            <CardContent>
              {results ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-blue-600 mb-1">BMR</p>
                      <p className="text-2xl font-bold text-blue-700">{results.bmr}</p>
                      <p className="text-xs text-blue-600">calories/day</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-green-600 mb-1">TDEE</p>
                      <p className="text-2xl font-bold text-green-700">{results.tdee}</p>
                      <p className="text-xs text-green-600">calories/day</p>
                    </div>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-orange-600 mb-1">Goal Calories</p>
                    <p className="text-3xl font-bold text-orange-700">{results.goalCalories}</p>
                    <p className="text-xs text-orange-600">calories/day</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Daily Macronutrients</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                        <span className="font-medium text-red-700">Protein</span>
                        <span className="text-red-700 font-bold">{results.protein}g</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                        <span className="font-medium text-yellow-700">Carbohydrates</span>
                        <span className="text-yellow-700 font-bold">{results.carbs}g</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <span className="font-medium text-purple-700">Fat</span>
                        <span className="text-purple-700 font-bold">{results.fat}g</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button onClick={downloadResults} variant="outline" className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button 
                      onClick={() => toast({ title: "Email feature coming soon!" })} 
                      variant="outline" 
                      className="flex-1"
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Email
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-12">
                  <CalculatorIcon className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <p>Fill out the form to see your personalized results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Calculator;