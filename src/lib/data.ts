import { FoodItem } from './store';

// Food database
export const foodDatabase: Record<string, FoodItem[]> = {
  breakfast: [
    { name: "Oatmeal with berries", calories: 280, protein: 8, carbs: 54, fat: 5 },
    { name: "Greek yogurt with nuts", calories: 250, protein: 20, carbs: 15, fat: 12 },
    { name: "Scrambled eggs (2)", calories: 160, protein: 14, carbs: 2, fat: 11 },
    { name: "Whole grain toast", calories: 80, protein: 3, carbs: 15, fat: 1 },
    { name: "Protein pancakes", calories: 340, protein: 25, carbs: 30, fat: 12 },
    { name: "Avocado toast", calories: 220, protein: 6, carbs: 22, fat: 12 },
    { name: "Smoothie bowl", calories: 310, protein: 15, carbs: 45, fat: 8 }
  ],
  lunch: [
    { name: "Grilled chicken salad", calories: 320, protein: 35, carbs: 12, fat: 14 },
    { name: "Quinoa bowl", calories: 380, protein: 14, carbs: 58, fat: 12 },
    { name: "Turkey sandwich", calories: 420, protein: 28, carbs: 42, fat: 16 },
    { name: "Lentil soup", calories: 230, protein: 18, carbs: 40, fat: 1 },
    { name: "Tuna wrap", calories: 350, protein: 30, carbs: 35, fat: 10 },
    { name: "Buddha bowl", calories: 450, protein: 20, carbs: 60, fat: 15 },
    { name: "Chicken burrito bowl", calories: 520, protein: 32, carbs: 55, fat: 18 }
  ],
  dinner: [
    { name: "Baked salmon with vegetables", calories: 450, protein: 40, carbs: 20, fat: 24 },
    { name: "Lean beef stir-fry", calories: 380, protein: 32, carbs: 25, fat: 16 },
    { name: "Grilled tofu with rice", calories: 340, protein: 20, carbs: 45, fat: 12 },
    { name: "Chicken breast with sweet potato", calories: 420, protein: 38, carbs: 35, fat: 8 },
    { name: "Turkey meatballs with zucchini noodles", calories: 360, protein: 35, carbs: 15, fat: 18 },
    { name: "Shrimp and vegetable stir-fry", calories: 310, protein: 28, carbs: 20, fat: 12 },
    { name: "Vegetable curry with chickpeas", calories: 380, protein: 15, carbs: 50, fat: 14 }
  ],
  snacks: [
    { name: "Apple with almond butter", calories: 190, protein: 6, carbs: 20, fat: 12 },
    { name: "Protein shake", calories: 150, protein: 25, carbs: 5, fat: 3 },
    { name: "Mixed nuts (1 oz)", calories: 170, protein: 6, carbs: 6, fat: 15 },
    { name: "Greek yogurt", calories: 120, protein: 15, carbs: 9, fat: 3 },
    { name: "Protein bar", calories: 200, protein: 20, carbs: 20, fat: 8 },
    { name: "Cottage cheese with berries", calories: 140, protein: 18, carbs: 10, fat: 2 },
    { name: "Hummus with vegetables", calories: 160, protein: 5, carbs: 15, fat: 10 }
  ]
};

// Workout database
export const workoutDatabase = {
  home: [
    {
      id: 1,
      title: "Full Body HIIT",
      duration: 20,
      difficulty: "Intermediate",
      muscleGroup: "Full Body",
      exercises: [
        { name: "Jumping Jacks", sets: 3, reps: "30 sec", rest: "10 sec" },
        { name: "Push-ups", sets: 3, reps: 12, rest: "30 sec" },
        { name: "Squats", sets: 3, reps: 15, rest: "30 sec" },
        { name: "Burpees", sets: 3, reps: 8, rest: "45 sec" },
      ],
      description: "High-intensity circuit to burn calories and build strength."
    },
    {
      id: 2,
      title: "Upper Body Strength",
      duration: 30,
      difficulty: "Beginner",
      muscleGroup: "Upper Body",
      exercises: [
        { name: "Wall Push-ups", sets: 3, reps: 10, rest: "30 sec" },
        { name: "Tricep Dips (Chair)", sets: 3, reps: 8, rest: "30 sec" },
        { name: "Pike Push-ups", sets: 3, reps: 6, rest: "45 sec" },
        { name: "Arm Circles", sets: 2, reps: "30 sec", rest: "15 sec" },
      ],
      description: "Build upper body strength with bodyweight exercises."
    },
    {
      id: 3,
      title: "Core Crusher",
      duration: 15,
      difficulty: "Advanced",
      muscleGroup: "Core",
      exercises: [
        { name: "Plank", sets: 3, reps: "45 sec", rest: "15 sec" },
        { name: "Mountain Climbers", sets: 3, reps: "30 sec", rest: "30 sec" },
        { name: "Russian Twists", sets: 3, reps: 20, rest: "30 sec" },
        { name: "Dead Bug", sets: 3, reps: "10 each", rest: "30 sec" },
      ],
      description: "Intense core workout to build a strong midsection."
    }
  ],
  gym: [
    {
      id: 4,
      title: "Push Day",
      duration: 45,
      difficulty: "Intermediate",
      muscleGroup: "Chest, Shoulders, Triceps",
      exercises: [
        { name: "Bench Press", sets: 4, reps: "8-10", rest: "2 min" },
        { name: "Overhead Press", sets: 3, reps: "8-10", rest: "90 sec" },
        { name: "Incline Dumbbell Press", sets: 3, reps: "10-12", rest: "90 sec" },
        { name: "Tricep Dips", sets: 3, reps: "10-12", rest: "60 sec" },
        { name: "Lateral Raises", sets: 3, reps: "12-15", rest: "60 sec" },
      ],
      description: "Complete push workout targeting chest, shoulders, and triceps."
    },
    {
      id: 5,
      title: "Pull Day",
      duration: 45,
      difficulty: "Intermediate",
      muscleGroup: "Back, Biceps",
      exercises: [
        { name: "Deadlifts", sets: 4, reps: "6-8", rest: "2 min" },
        { name: "Pull-ups", sets: 3, reps: "8-10", rest: "90 sec" },
        { name: "Barbell Rows", sets: 3, reps: "8-10", rest: "90 sec" },
        { name: "Bicep Curls", sets: 3, reps: "10-12", rest: "60 sec" },
        { name: "Face Pulls", sets: 3, reps: "12-15", rest: "60 sec" },
      ],
      description: "Complete pull workout for back and bicep development."
    },
    {
      id: 6,
      title: "Leg Day",
      duration: 50,
      difficulty: "Advanced",
      muscleGroup: "Legs, Glutes",
      exercises: [
        { name: "Squats", sets: 4, reps: "8-10", rest: "2 min" },
        { name: "Romanian Deadlifts", sets: 3, reps: "10-12", rest: "90 sec" },
        { name: "Bulgarian Split Squats", sets: 3, reps: "10 each", rest: "90 sec" },
        { name: "Leg Press", sets: 3, reps: "12-15", rest: "90 sec" },
        { name: "Calf Raises", sets: 4, reps: "15-20", rest: "60 sec" },
      ],
      description: "Comprehensive leg workout for strength and muscle building."
    }
  ],
  hiit: [
    {
      id: 7,
      title: "Cardio Blast",
      duration: 12,
      difficulty: "Beginner",
      muscleGroup: "Cardiovascular",
      exercises: [
        { name: "High Knees", sets: 4, reps: "20 sec", rest: "10 sec" },
        { name: "Jump Squats", sets: 4, reps: "20 sec", rest: "10 sec" },
        { name: "Boxing Punches", sets: 4, reps: "20 sec", rest: "10 sec" },
        { name: "Rest", sets: 1, reps: "60 sec", rest: "" },
      ],
      description: "Quick cardio blast to get your heart pumping."
    },
    {
      id: 8,
      title: "Tabata Torch",
      duration: 16,
      difficulty: "Advanced",
      muscleGroup: "Full Body",
      exercises: [
        { name: "Burpees", sets: 8, reps: "20 sec", rest: "10 sec" },
        { name: "Mountain Climbers", sets: 8, reps: "20 sec", rest: "10 sec" },
        { name: "Jump Lunges", sets: 8, reps: "20 sec", rest: "10 sec" },
        { name: "Plank Jacks", sets: 8, reps: "20 sec", rest: "10 sec" },
      ],
      description: "Intense Tabata protocol for maximum calorie burn."
    }
  ]
};

// Blog posts
export const blogPosts = [
  {
    id: 1,
    title: "10 Essential Nutrition Tips for Optimal Health",
    excerpt: "Discover the key nutritional principles that can transform your health and fitness journey.",
    content: `
      # 10 Essential Nutrition Tips for Optimal Health
      
      Nutrition is the foundation of good health and fitness. Here are ten essential tips to optimize your nutrition:
      
      ## 1. Focus on Whole Foods
      
      Prioritize unprocessed foods like fruits, vegetables, lean proteins, whole grains, and healthy fats. These provide essential nutrients without added sugars or preservatives.
      
      ## 2. Stay Hydrated
      
      Drink at least 8 glasses of water daily. Hydration affects everything from energy levels to recovery.
      
      ## 3. Mind Your Protein Intake
      
      Aim for 0.8-1g of protein per pound of bodyweight, especially if you're active or trying to build muscle.
      
      ## 4. Don't Fear Carbs
      
      Carbohydrates are your body's primary energy source. Focus on complex carbs like sweet potatoes, oats, and brown rice.
      
      ## 5. Include Healthy Fats
      
      Avocados, nuts, seeds, and olive oil provide essential fatty acids that support hormone production and brain health.
      
      ## 6. Eat the Rainbow
      
      Different colored fruits and vegetables contain different phytonutrients. Aim for variety in your diet.
      
      ## 7. Practice Portion Control
      
      Even healthy foods can contribute to weight gain if consumed in excess. Learn appropriate portion sizes.
      
      ## 8. Plan Your Meals
      
      Meal planning helps prevent impulsive, unhealthy food choices when you're hungry.
      
      ## 9. Limit Added Sugars
      
      Excess sugar consumption is linked to numerous health issues. Check labels for hidden sugars.
      
      ## 10. Be Consistent, Not Perfect
      
      Follow the 80/20 rule: eat nutritious foods 80% of the time, and enjoy treats in moderation the other 20%.
    `,
    date: "2024-03-15",
    author: "houssem",
    category: "Nutrition",
    tags: ["diet", "health", "macros"],
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3"
  },
  {
    id: 2,
    title: "The Science Behind Effective Strength Training",
    excerpt: "Learn the physiological principles that make strength training so effective for building muscle and improving health.",
    content: `
      # The Science Behind Effective Strength Training
      
      Strength training is more than just lifting weights—it's a science-backed approach to improving body composition and overall health.
      
      ## Progressive Overload
      
      The fundamental principle of strength training is progressive overload—gradually increasing the weight, frequency, or number of repetitions to continually challenge your muscles.
      
      ## Muscle Hypertrophy
      
      When you lift weights, you create microscopic tears in muscle fibers. During recovery, these fibers repair and grow back stronger and larger, a process called hypertrophy.
      
      ## Neural Adaptations
      
      In the early stages of strength training, most gains come from improved neural connections rather than muscle growth. Your brain becomes more efficient at recruiting muscle fibers.
      
      ## Hormonal Response
      
      Strength training triggers the release of growth hormone, testosterone, and other anabolic hormones that facilitate muscle growth and fat metabolism.
      
      ## Metabolic Benefits
      
      Building muscle increases your basal metabolic rate, helping you burn more calories even at rest.
      
      ## Recovery Importance
      
      Muscles grow during rest, not during exercise. Adequate recovery between workouts is essential for progress.
      
      ## Training Variables
      
      Manipulating sets, reps, tempo, and rest periods allows you to target different fitness goals:
      - Strength: High weight, low reps (1-5)
      - Hypertrophy: Moderate weight, moderate reps (8-12)
      - Endurance: Lower weight, high reps (15+)
      
      ## Compound vs. Isolation
      
      Compound movements (squats, deadlifts) work multiple muscle groups and trigger greater hormonal responses than isolation exercises (bicep curls).
      
      ## Consistency is Key
      
      The most effective training program is one you can stick with consistently over time.
    `,
    date: "2024-03-10",
    author: "houssem",
    category: "Fitness",
    tags: ["strength", "muscle", "workout"],
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3"
  },
  {
    id: 3,
    title: "How to Design a Sustainable Meal Plan",
    excerpt: "Create a balanced meal plan that you can actually stick to long-term with these practical strategies.",
    date: "2024-03-05",
    author: "houssem",
    category: "Nutrition",
    tags: ["meal-prep", "diet", "planning"],
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3"
  },
  {
    id: 4,
    title: "The Benefits of High-Intensity Interval Training",
    excerpt: "Discover why HIIT workouts are so effective and how to incorporate them into your fitness routine.",
    date: "2024-02-28",
    author: "houssem",
    category: "Fitness",
    tags: ["hiit", "cardio", "fat-loss"],
    image: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&q=80&w=1474&ixlib=rb-4.0.3"
  },
  {
    id: 5,
    title: "Sleep and Recovery: The Missing Piece in Your Fitness Journey",
    excerpt: "Learn why quality sleep is crucial for fitness progress and how to optimize your recovery.",
    date: "2024-02-20",
    author: "houssem",
    category: "Wellness",
    tags: ["sleep", "recovery", "health"],
    image: "https://images.unsplash.com/photo-1531353826977-0941b4779a1c?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3"
  },
  {
    id: 6,
    title: "Beginner's Guide to Protein: How Much Do You Really Need?",
    excerpt: "Cut through the confusion about protein requirements with this science-based guide.",
    date: "2024-02-15",
    author: "houssem",
    category: "Nutrition",
    tags: ["protein", "muscle", "diet"],
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=1374&ixlib=rb-4.0.3"
  }
];