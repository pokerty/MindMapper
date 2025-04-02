import React from 'react';
import { Link } from 'react-router-dom';
import { useGoalStore } from '../store/goalStore';

export const MainGoals = () => {
  const { goals } = useGoalStore();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Main Goals</h2>
      {goals.length === 0 && (
         <p className="text-gray-500 dark:text-gray-400">No goals added yet. Click the button below to add one!</p>
      )}
      <div className="space-y-4">
        {goals.map((goal) => (
          <Link
             to={`/goal/${goal.id}`}
             key={goal.id}
             className="block bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
           >
            <div
              className="p-4"
            >
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{goal.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 truncate">{goal.description || 'No description'}</p>
                {(goal.tags && goal.tags.length > 0) && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {goal.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {/* Removed the priority tag */}
                {/* <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Priority: {goal.priority}</p> */}
            </div>
           </Link>
        ))}
      </div>
    </div>
  );
};