import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define types
export type UserData = {
  name: string;
  email: string;
  height: number;
  weight: number;
  age: number;
  gender: 'male' | 'female';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';
  goal: 'lose' | 'maintain' | 'gain';
  darkMode: boolean;
  notifications: boolean;
};

export type WeightEntry = {
  date: string;
  weight: number;
  calories: number;
};

export type WorkoutSession = {
  date: string;
  type: string;
  duration: number;
  workoutId: number;
};

export type MealPlan = {
  breakfast: FoodItem[];
  lunch: FoodItem[];
  dinner: FoodItem[];
  snacks: FoodItem[];
};

export type FoodItem = {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type RegisterData = {
  name: string;
  email: string;
  password: string;
  height: number;
  weight: number;
  age: number;
  gender: 'male' | 'female';
};

type Store = {
  user: UserData;
  weightEntries: WeightEntry[];
  workoutSessions: WorkoutSession[];
  mealPlan: MealPlan;
  calorieGoal: number;
  isAuthenticated: boolean;
  users: { email: string; password: string }[];
  updateUser: (data: Partial<UserData>) => void;
  addWeightEntry: (entry: WeightEntry) => void;
  removeWeightEntry: (date: string) => void;
  addWorkoutSession: (session: WorkoutSession) => void;
  removeWorkoutSession: (date: string, workoutId: number) => void;
  updateMealPlan: (mealPlan: MealPlan) => void;
  clearMealPlan: () => void;
  setCalorieGoal: (goal: number) => void;
  calculateTDEE: () => number;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (data: RegisterData) => boolean;
};

// Create store with persistence
export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      user: {
        name: 'Nishchay Sharma',
        email: 'user@example.com',
        height: 175,
        weight: 70,
        age: 30,
        gender: 'male',
        activityLevel: 'moderate',
        goal: 'maintain',
        darkMode: false,
        notifications: true,
      },
      weightEntries: [
        { date: '2024-01-01', weight: 75, calories: 2100 },
        { date: '2024-01-08', weight: 74.5, calories: 2050 },
        { date: '2024-01-15', weight: 74.2, calories: 2000 },
        { date: '2024-01-22', weight: 73.8, calories: 1950 },
        { date: '2024-01-29', weight: 73.5, calories: 2100 },
        { date: '2024-02-05', weight: 73.1, calories: 2000 },
        { date: '2024-02-12', weight: 72.8, calories: 1980 },
      ],
      workoutSessions: [
        { date: '2024-02-01', type: 'Strength', duration: 45, workoutId: 4 },
        { date: '2024-02-03', type: 'Cardio', duration: 30, workoutId: 7 },
        { date: '2024-02-05', type: 'Strength', duration: 50, workoutId: 6 },
        { date: '2024-02-08', type: 'HIIT', duration: 20, workoutId: 1 },
        { date: '2024-02-10', type: 'Strength', duration: 45, workoutId: 5 },
      ],
      mealPlan: {
        breakfast: [],
        lunch: [],
        dinner: [],
        snacks: []
      },
      calorieGoal: 2000,
      isAuthenticated: true,
      users: [{ email: 'user@example.com', password: 'password' }],
      
      updateUser: (data) => set((state) => ({ 
        user: { ...state.user, ...data } 
      })),
      
      addWeightEntry: (entry) => set((state) => ({ 
        weightEntries: [...state.weightEntries, entry] 
      })),
      
      removeWeightEntry: (date) => set((state) => ({
        weightEntries: state.weightEntries.filter(entry => entry.date !== date)
      })),
      
      addWorkoutSession: (session) => set((state) => ({ 
        workoutSessions: [...state.workoutSessions, session] 
      })),
      
      removeWorkoutSession: (date, workoutId) => set((state) => ({
        workoutSessions: state.workoutSessions.filter(
          session => !(session.date === date && session.workoutId === workoutId)
        )
      })),
      
      updateMealPlan: (mealPlan) => set(() => ({ mealPlan })),
      
      clearMealPlan: () => set(() => ({ 
        mealPlan: { breakfast: [], lunch: [], dinner: [], snacks: [] } 
      })),
      
      setCalorieGoal: (goal) => set(() => ({ calorieGoal: goal })),
      
      calculateTDEE: () => {
        const { age, gender, height, weight, activityLevel } = get().user;
        
        // Mifflin-St Jeor Equation
        let bmr;
        if (gender === 'male') {
          bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
          bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }
        
        // Activity multipliers
        const activityMultipliers = {
          sedentary: 1.2,
          light: 1.375,
          moderate: 1.55,
          active: 1.725,
          veryActive: 1.9,
        };
        
        return Math.round(bmr * activityMultipliers[activityLevel]);
      },
      
      login: (email, password) => {
        const { users } = get();
        const userExists = users.find(
          user => user.email === email && user.password === password
        );
        
        if (userExists) {
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },
      
      logout: () => set(() => ({ isAuthenticated: false })),
      
      register: (data) => {
        const { users } = get();
        const userExists = users.find(user => user.email === data.email);
        
        if (userExists) {
          return false;
        }
        
        set((state) => ({ 
          users: [...state.users, { email: data.email, password: data.password }],
          user: {
            name: data.name,
            email: data.email,
            height: data.height,
            weight: data.weight,
            age: data.age,
            gender: data.gender,
            activityLevel: 'moderate',
            goal: 'maintain',
            darkMode: false,
            notifications: true,
          },
          isAuthenticated: true
        }));
        
        return true;
      }
    }),
    {
      name: 'fitlife-storage',
    }
  )
);