import { useState, useEffect } from "react";
import { Plus, Utensils, Download, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import { useStore } from "@/lib/store";
import { foodDatabase } from "@/lib/data";
import { FoodItem } from "@/lib/store";

const DietPlanner = () => {
  const { user, calorieGoal, mealPlan, updateMealPlan } = useStore();
  const [goal, setGoal] = useState(user.goal);
  const [targetCalories, setTargetCalories] = useState(String(calorieGoal));

  // Initialize meal plan from store
  useEffect(() => {
    if (calorieGoal > 0) {
      setTargetCalories(String(calorieGoal));
    }
  }, [calorieGoal]);

  const addFood = (mealType: keyof typeof mealPlan, food: FoodItem) => {
    const updatedMealPlan = {
      ...mealPlan,
      [mealType]: [...mealPlan[mealType], food]
    };
    
    updateMealPlan(updatedMealPlan);
    
    toast({
      title: "Food Added",
      description: `${food.name} added to ${mealType}`,
    });
  };

  const removeFood = (mealType: keyof typeof mealPlan, index: number) => {
    const updatedMealPlan = {
      ...mealPlan,
      [mealType]: mealPlan[mealType].filter((_, i) => i !== index)
    };
    
    updateMealPlan(updatedMealPlan);
  };

  const generateMealPlan = () => {
    if (!goal || !targetCalories) {
      toast({
        title: "Missing Information",
        description: "Please select a goal and target calories.",
        variant: "destructive",
      });
      return;
    }

    const target = parseInt(targetCalories);
    const breakfastCals = Math.round(target * 0.25);
    const lunchCals = Math.round(target * 0.35);
    const dinnerCals = Math.round(target * 0.30);
    const snackCals = Math.round(target * 0.10);

    const newMeals = {
      breakfast: [] as FoodItem[],
      lunch: [] as FoodItem[],
      dinner: [] as FoodItem[],
      snacks: [] as FoodItem[]
    };

    // Simple algorithm to select foods close to target calories for each meal
    Object.keys(newMeals).forEach(mealType => {
      const typedMealType = mealType as keyof typeof newMeals;
      const mealTarget = typedMealType === 'breakfast' ? breakfastCals : 
                      typedMealType === 'lunch' ? lunchCals :
                      typedMealType === 'dinner' ? dinnerCals : snackCals;
      
      const availableFoods = foodDatabase[typedMealType];
      const selectedFood = availableFoods.find(food => 
        Math.abs(food.calories - mealTarget) <= 100
      ) || availableFoods[0];
      
      newMeals[typedMealType] = [selectedFood];
    });

    updateMealPlan(newMeals);
    
    toast({
      title: "Meal Plan Generated!",
      description: "Your personalized meal plan is ready.",
    });
  };

  const getTotalNutrition = () => {
    let total = { calories: 0, protein: 0, carbs: 0, fat: 0 };
    Object.values(mealPlan).flat().forEach(food => {
      total.calories += food.calories;
      total.protein += food.protein;
      total.carbs += food.carbs;
      total.fat += food.fat;
    });
    return total;
  };

  const downloadPlan = () => {
    const total = getTotalNutrition();
    let content = `FitLife Diet Plan\n================\n\n`;
    
    Object.entries(mealPlan).forEach(([mealType, foods]) => {
      content += `${mealType.toUpperCase()}:\n`;
      foods.forEach(food => {
        content += `- ${food.name} (${food.calories} cal)\n`;
      });
      content += '\n';
    });
    
    content += `DAILY TOTALS:\n`;
    content += `Calories: ${total.calories}\n`;
    content += `Protein: ${total.protein}g\n`;
    content += `Carbs: ${total.carbs}g\n`;
    content += `Fat: ${total.fat}g\n`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fitlife-diet-plan.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const total = getTotalNutrition();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Diet Planner</h1>
          <p className="text-lg text-gray-600">Plan your meals and track your nutrition</p>
        </div>

        {/* Goal Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Set Your Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="goal">Fitness Goal</Label>
                <Select value={goal} onValueChange={setGoal}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lose">Weight Loss</SelectItem>
                    <SelectItem value="maintain">Maintenance</SelectItem>
                    <SelectItem value="gain">Muscle Gain</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="calories">Target Calories</Label>
                <Input
                  id="calories"
                  type="number"
                  placeholder="2000"
                  value={targetCalories}
                  onChange={(e) => setTargetCalories(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={generateMealPlan} className="w-full bg-green-600 hover:bg-green-700">
                  Generate Meal Plan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Meal Planning */}
          <div className="lg:col-span-2 space-y-6">
            {Object.entries(mealPlan).map(([mealType, foods]) => (
              <Card key={mealType}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="capitalize">{mealType}</span>
                    <Select onValueChange={(value) => {
                      const selectedFood = foodDatabase[mealType as keyof typeof foodDatabase].find(f => f.name === value);
                      if (selectedFood) {
                        addFood(mealType as keyof typeof mealPlan, selectedFood);
                      }
                    }}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Add food" />
                      </SelectTrigger>
                      <SelectContent>
                        {foodDatabase[mealType as keyof typeof foodDatabase].map((food, index) => (
                          <SelectItem key={index} value={food.name}>
                            {food.name} ({food.calories} cal)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {foods.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No foods added yet</p>
                  ) : (
                    <div className="space-y-2">
                      {foods.map((food, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{food.name}</p>
                            <p className="text-sm text-gray-600">
                              {food.calories} cal | P: {food.protein}g | C: {food.carbs}g | F: {food.fat}g
                            </p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeFood(mealType as keyof typeof mealPlan, index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Nutrition Summary */}
          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Utensils className="mr-2 h-5 w-5" />
                  Daily Nutrition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">{total.calories}</p>
                    <p className="text-sm text-gray-600">Total Calories</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="font-medium text-red-700">Protein</span>
                      <span className="text-red-700 font-bold">{total.protein}g</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                      <span className="font-medium text-yellow-700">Carbs</span>
                      <span className="text-yellow-700 font-bold">{total.carbs}g</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="font-medium text-purple-700">Fat</span>
                      <span className="text-purple-700 font-bold">{total.fat}g</span>
                    </div>
                  </div>

                  {total.calories > 0 && (
                    <div className="space-y-2 pt-4">
                      <Button onClick={downloadPlan} variant="outline" className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Download Plan
                      </Button>
                      <Button 
                        onClick={() => toast({ title: "Share feature coming soon!" })} 
                        variant="outline" 
                        className="w-full"
                      >
                        <Share className="mr-2 h-4 w-4" />
                        Share Plan
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietPlanner;