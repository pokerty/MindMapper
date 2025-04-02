import React from 'react';
import { Link } from 'react-router-dom';
import { useGoalStore } from '../store/goalStore';
import { Step } from '../types'; // Import Step type

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
          <div // Change Link to div to allow nesting interactive elements (Links for steps)
             key={goal.id}
             className="block bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
           >
            <div className="p-4">
               {/* Link the Goal Title itself */}
              <Link to={`/goal/${goal.id}`} className="hover:underline">
                 <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-1">{goal.title}</h3>
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate mb-2">{goal.description || 'No description'}</p>
              {/* Display Tag (assuming only one now) */}
              {(goal.tags && goal.tags.length > 0) && (
                 <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-200 mb-3">
                   Tag: {goal.tags[0]}
                 </span>
              )}

              {/* Display first 3 steps/tasks */}
              {goal.steps && goal.steps.length > 0 && (
                <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Tasks:</h4>
                  <ul className="list-none pl-0 space-y-1">
                    {goal.steps.slice(0, 3).map((step: Step) => (
                      <li key={step.id}>
                         {/* Link each task */}
                        <Link
                          to={`/task/${step.id}`}
                          className="text-sm text-blue-600 dark:text-blue-400 hover:underline truncate block"
                          title={step.title}
                        >
                          - {step.title} ({step.status})
                        </Link>
                      </li>
                    ))}
                    {goal.steps.length > 3 && (
                       <li className="text-xs text-gray-400 dark:text-gray-500">...and {goal.steps.length - 3} more</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
           </div>
        ))}
      </div>
    </div>
  );
};