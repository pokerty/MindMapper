import React from 'react';
import { useGoalStore } from '../store/goalStore';
import { Step, Goal } from '../types';
import { GoalMatrix } from './GoalMatrix'; // Assuming we want to reuse/adapt this

// Define an extended type for steps that includes goal context
interface StepWithContext extends Step {
  goalTitle: string;
}

// Helper function to categorize steps based on goal priority
const categorizeSteps = (goals: Goal[]) => {
  // Use StepWithContext for the categorized steps
  const stepsByCategory: { [key: string]: StepWithContext[] } = {
    'urgent-important': [],
    'not-urgent-important': [],
    'urgent-not-important': [],
    'not-urgent-not-important': [],
  };

  goals.forEach(goal => {
    goal.steps.forEach(step => {
      // Create the object with the extended type
      const stepWithContext: StepWithContext = { ...step, goalTitle: goal.title };
      // *** Categorize by step.priority instead of goal.priority ***
      if (step.priority) { // Check if priority exists (for potentially older data)
         stepsByCategory[step.priority].push(stepWithContext);
      } else {
         // Optional: Handle steps without priority (e.g., default category)
         // stepsByCategory['not-urgent-not-important'].push(stepWithContext);
      }
    });
  });

  return stepsByCategory;
};

export function TasksOverview() {
  const { goals } = useGoalStore();
  const stepsByCategory = categorizeSteps(goals);

  // TODO: Adapt GoalMatrix or create a new visualization here
  // For now, just list the steps by category

  const quadrants = [
    { id: 'urgent-important', title: 'Urgent & Important', action: 'Do Now', color: 'bg-red-100 dark:bg-red-900' },
    { id: 'not-urgent-important', title: 'Not Urgent but Important', action: 'Schedule', color: 'bg-yellow-100 dark:bg-yellow-900' },
    { id: 'urgent-not-important', title: 'Urgent but Not Important', action: 'Delegate', color: 'bg-blue-100 dark:bg-blue-900' },
    { id: 'not-urgent-not-important', title: 'Not Urgent & Not Important', action: 'Delete', color: 'bg-green-100 dark:bg-green-900' },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Tasks Overview (Eisenhower Matrix)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quadrants.map(quad => (
          <div key={quad.id} className={`rounded-lg shadow p-4 ${quad.color}`}>
            <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">{quad.title}</h3>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Action: {quad.action}</p>
            <div className="space-y-2">
              {stepsByCategory[quad.id].length > 0 ? (
                stepsByCategory[quad.id].map((step: StepWithContext) => (
                   // Basic step display - can be enhanced
                  <div key={step.id} className="p-2 bg-white dark:bg-gray-700 rounded shadow-sm">
                     <p className="font-medium text-gray-900 dark:text-gray-100">{step.title}</p>
                     <p className="text-sm text-gray-500 dark:text-gray-400">From Goal: {step.goalTitle}</p>
                     <p className="text-xs text-gray-400 dark:text-gray-500">Status: {step.status}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">No tasks in this category.</p>
              )}
            </div>
          </div>
        ))}
      </div>
       {/* Or pass stepsByCategory to an adapted GoalMatrix component */}
       {/* <GoalMatrix stepsByCategory={stepsByCategory} /> */}
    </div>
  );
} 