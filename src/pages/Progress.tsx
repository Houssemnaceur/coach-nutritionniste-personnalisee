import { useState } from "react";
import { TrendingUp, Calendar, Weight, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { toast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import { useStore } from "@/lib/store";

const Progress = () => {
  const { user, weightEntries, workoutSessions, addWeightEntry } = useStore();
  const [weightInput, setWeightInput] = useState("");

  const logWeight = () => {
    if (!weightInput) {
      toast({
        title: "Missing Weight",
        description: "Please enter your current weight.",
        variant: "destructive",
      });
      return;
    }

    const newEntry = {
      date: new Date().toISOString().split('T')[0],
      weight: parseFloat(weightInput),
      calories: 2000 // Default calories for demo
    };

    addWeightEntry(newEntry);
    setWeightInput("");
    
    toast({
      title: "Weight Logged!",
      description: `Your weight of ${weightInput} kg has been recorded.`,
    });
  };

  const getCurrentStats = () => {
    if (weightEntries.length < 2) return null;
    
    const latest = weightEntries[weightEntries.length - 1];
    const previous = weightEntries[weightEntries.length - 2];
    const change = latest.weight - previous.weight;
    
    return {
      currentWeight: latest.weight,
      change: change,
      trend: change < 0 ? "losing" : change > 0 ? "gaining" : "maintaining"
    };
  };

  // Process workout data for chart
  const processWorkoutData = () => {
    // Group by week
    const workoutsByWeek = workoutSessions.reduce((acc: any, session) => {
      const date = new Date(session.date);
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      const weekKey = weekStart.toISOString().split('T')[0];
      
      if (!acc[weekKey]) {
        acc[weekKey] = { week: `Week ${acc.length + 1}`, sessions: 0, duration: 0 };
      }
      
      acc[weekKey].sessions += 1;
      acc[weekKey].duration += session.duration;
      
      return acc;
    }, {});
    
    return Object.values(workoutsByWeek);
  };

  const stats = getCurrentStats();
  const workoutData = processWorkoutData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Progress Tracker</h1>
          <p className="text-lg text-gray-600">Monitor your fitness journey with detailed analytics</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Weight className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-700">
                {stats ? `${stats.currentWeight} kg` : `${user.weight} kg`}
              </p>
              <p className="text-sm text-gray-600">Current Weight</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-700">
                {stats ? `${stats.change > 0 ? '+' : ''}${stats.change.toFixed(1)} kg` : "No change"}
              </p>
              <p className="text-sm text-gray-600">Weight Change</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-orange-700">
                {workoutSessions.length}
              </p>
              <p className="text-sm text-gray-600">Total Workouts</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-700">
                {Math.round(workoutSessions.reduce((sum, session) => sum + session.duration, 0) / 60)}h
              </p>
              <p className="text-sm text-gray-600">Total Exercise Time</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Weight and Calorie Tracking */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Weight Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weightEntries}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(date) => new Date(date).toLocaleDateString()}
                    />
                    <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                    <Tooltip 
                      labelFormatter={(date) => new Date(date).toLocaleDateString()}
                      formatter={(value) => [`${value} kg`, 'Weight']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="weight" 
                      stroke="#10B981" 
                      strokeWidth={3}
                      dot={{ fill: '#10B981', strokeWidth: 2, r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Workout Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={workoutData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => [value, name === 'sessions' ? 'Sessions' : 'Minutes']} />
                    <Bar dataKey="sessions" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Input Panel */}
          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Log Your Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="weight">Current Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    placeholder="72.5"
                    value={weightInput}
                    onChange={(e) => setWeightInput(e.target.value)}
                  />
                </div>
                
                <Button onClick={logWeight} className="w-full bg-green-600 hover:bg-green-700">
                  Log Weight
                </Button>

                {stats && (
                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-2">Progress Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-green-700">Current:</span>
                        <span className="font-medium">{stats.currentWeight} kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700">Change:</span>
                        <span className={`font-medium ${stats.change < 0 ? 'text-blue-600' : 'text-orange-600'}`}>
                          {stats.change > 0 ? '+' : ''}{stats.change.toFixed(1)} kg
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700">Trend:</span>
                        <span className="font-medium capitalize">{stats.trend}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Recent Activity</h3>
                  <div className="space-y-2 text-sm">
                    {workoutSessions.slice(-3).map((session, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-blue-700">{new Date(session.date).toLocaleDateString()}:</span>
                        <span className="font-medium">{session.type} ({session.duration} min)</span>
                      </div>
                    ))}
                    {workoutSessions.length === 0 && (
                      <p className="text-gray-500">No recent workouts</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;