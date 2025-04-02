import { create } from 'zustand';
import { Goal, Step } from '../types';

interface GoalStore {
  goals: Goal[];
  setGoals: (goals: Goal[]) => void;
  addGoal: (goal: Goal) => void;
  updateGoal: (goal: Goal) => void;
  addStep: (goalId: string, step: Step) => void;
  updateStep: (goalId: string, step: Step) => void;
}

export const useGoalStore = create<GoalStore>((set) => ({
  goals: [],
  setGoals: (goals) => set({ goals }),
  addGoal: (goal) => set((state) => ({ goals: [...state.goals, goal] })),
  updateGoal: (goal) =>
    set((state) => ({
      goals: state.goals.map((g) => (g.id === goal.id ? goal : g)),
    })),
  addStep: (goalId, step) =>
    set((state) => ({
      goals: state.goals.map((goal) =>
        goal.id === goalId
          ? { ...goal, steps: [...goal.steps, step] }
          : goal
      ),
    })),
  updateStep: (goalId, step) =>
    set((state) => ({
      goals: state.goals.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              steps: goal.steps.map((s) => (s.id === step.id ? step : s)),
            }
          : goal
      ),
    })),
}));