import { useState } from "react";
import { Play, Clock, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import { useStore } from "@/lib/store";
import { workoutDatabase } from "@/lib/data";

const Workouts = () => {
  const [activeWorkout, setActiveWorkout] = useState<any>(null);
  const { addWorkoutSession } = useStore();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const startWorkout = (workout: any) => {
    setActiveWorkout(workout);
    toast({
      title: "Workout Started!",
      description: `${workout.title} is now active. Good luck!`,
    });
  };

  const completeWorkout = () => {
    if (!activeWorkout) return;
    
    // Log the workout session
    addWorkoutSession({
      date: new Date().toISOString().split('T')[0],
      type: activeWorkout.muscleGroup,
      duration: activeWorkout.duration,
      workoutId: activeWorkout.id
    });
    
    setActiveWorkout(null);
    toast({
      title: "Workout Complete!",
      description: "Great job finishing your workout!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Workout Routines</h1>
          <p className="text-lg text-gray-600">Choose from home workouts, gym routines, or HIIT sessions</p>
        </div>

        <Tabs defaultValue="home" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="home">Home Workouts</TabsTrigger>
            <TabsTrigger value="gym">Gym Workouts</TabsTrigger>
            <TabsTrigger value="hiit">HIIT & Cardio</TabsTrigger>
          </TabsList>

          {Object.entries(workoutDatabase).map(([category, categoryWorkouts]) => (
            <TabsContent key={category} value={category}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryWorkouts.map((workout) => (
                  <Card key={workout.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-lg">{workout.title}</CardTitle>
                        <Badge className={getDifficultyColor(workout.difficulty)}>
                          {workout.difficulty}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {workout.duration} min
                        </div>
                        <div className="flex items-center">
                          <Target className="h-4 w-4 mr-1" />
                          {workout.muscleGroup}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{workout.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        <h4 className="font-semibold text-sm">Exercises:</h4>
                        {workout.exercises.slice(0, 3).map((exercise: any, index: number) => (
                          <div key={index} className="text-sm text-gray-600">
                            • {exercise.name} - {exercise.sets} sets × {exercise.reps}
                          </div>
                        ))}
                        {workout.exercises.length > 3 && (
                          <div className="text-sm text-gray-500">
                            +{workout.exercises.length - 3} more exercises
                          </div>
                        )}
                      </div>

                      <Button 
                        onClick={() => startWorkout(workout)}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Start Workout
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Active Workout Modal */}
        {activeWorkout && (
          <Card className="fixed inset-4 z-50 bg-white shadow-2xl overflow-auto">
            <CardHeader className="bg-green-600 text-white">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  <Zap className="mr-2 h-5 w-5" />
                  {activeWorkout.title}
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setActiveWorkout(null)}
                  className="text-white hover:bg-green-700"
                >
                  ✕
                </Button>
              </div>
              <p className="text-green-100">
                {activeWorkout.duration} minutes • {activeWorkout.muscleGroup}
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {activeWorkout.exercises.map((exercise: any, index: number) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">{exercise.name}</h3>
                      <Badge variant="outline">{index + 1} of {activeWorkout.exercises.length}</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Sets:</span>
                        <p className="font-medium">{exercise.sets}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Reps:</span>
                        <p className="font-medium">{exercise.reps}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Rest:</span>
                        <p className="font-medium">{exercise.rest || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button 
                  onClick={completeWorkout}
                  size="lg"
                  className="bg-green-600 hover:bg-green-700"
                >
                  Complete Workout
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Workouts;