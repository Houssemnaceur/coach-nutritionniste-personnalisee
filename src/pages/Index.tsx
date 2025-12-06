import { Link } from "react-router-dom";
import { Calculator, Utensils, Dumbbell, TrendingUp, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { useStore } from "@/lib/store";

const Index = () => {
  const { user } = useStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Transform Your
            <span className="text-green-600"> Health Journey</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            "The groundwork for all happiness is good health." - Leigh Hunt
          </p>
          <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
            Your complete fitness companion for calorie tracking, meal planning, and workout routines. Start your transformation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/calculator">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg">
                Calculate My Calories
                <Calculator className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/diet-planner">
              <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 text-lg">
                Start Diet Plan
                <Utensils className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Everything You Need for Your Fitness Journey
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <Calculator className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Calorie Calculator</h3>
                <p className="text-gray-600">Calculate your daily calorie needs and macro breakdown based on your goals.</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <Utensils className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Diet Planner</h3>
                <p className="text-gray-600">Plan balanced meals and track your nutrition throughout the day.</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <Dumbbell className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Workout Routines</h3>
                <p className="text-gray-600">Access home and gym workouts tailored to your fitness level.</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Progress Tracker</h3>
                <p className="text-gray-600">Monitor your progress with detailed charts and analytics.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Success Stories
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"Lost 20 pounds in 3 months using the calorie calculator and meal planner. The interface is so easy to use!"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                    S
                  </div>
                  <div>
                    <p className="font-semibold">Salim kachouti</p>
                    <p className="text-sm text-gray-500">Lost 20 lbs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"The workout routines are perfect for my home gym setup. I've gained 15 pounds of muscle!"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                    M
                  </div>
                  <div>
                    <p className="font-semibold">ons saanoun</p>
                    <p className="text-sm text-gray-500">Gained 15 lbs muscle</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"Finally found a platform that tracks everything I need. The progress charts keep me motivated!"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                    E
                  </div>
                  <div>
                    <p className="font-semibold"> hamma</p>
                    <p className="text-sm text-gray-500">Maintained goal weight</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8">Join thousands of people who have transformed their health with Fit+.</p>
          <Link to="/calculator">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Dumbbell className="h-8 w-8 text-green-600 mr-2" />
                <span className="text-xl font-bold">Fit+</span>
              </div>
              <p className="text-gray-400">Your complete fitness companion for a healthier lifestyle.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/calculator" className="text-gray-400 hover:text-white transition-colors">Calorie Calculator</Link></li>
                <li><Link to="/diet-planner" className="text-gray-400 hover:text-white transition-colors">Diet Planner</Link></li>
                <li><Link to="/workouts" className="text-gray-400 hover:text-white transition-colors">Workouts</Link></li>
                <li><Link to="/progress" className="text-gray-400 hover:text-white transition-colors">Progress Tracker</Link></li>
                <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <p className="text-gray-400">Stay updated with health tips and fitness motivation.</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Fit+. All rights reserved. Created by houssem</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;