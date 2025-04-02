import React from 'react';
import { GoalMatrix } from './GoalMatrix';

export function TasksPage() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Tasks Overview
      </h2>
      <GoalMatrix />
       {/* Add dark mode styles to GoalMatrix if needed later */}
    </div>
  );
} 