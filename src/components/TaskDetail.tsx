import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useGoalStore } from '../store/goalStore';
import { Step, Goal } from '../types';
import { ChevronLeft, Check, X, Circle } from 'lucide-react'; // Import icons for status

export function TaskDetail() {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const { goals, updateGoal } = useGoalStore();
  const [task, setTask] = useState<Step | null>(null);
  const [parentGoal, setParentGoal] = useState<Goal | null>(null);

  // Find the task and its parent goal on mount or when goals change
  useEffect(() => {
    let foundTask: Step | null = null;
    let foundGoal: Goal | null = null;
    for (const goal of goals) {
      const step = goal.steps.find(s => s.id === taskId);
      if (step) {
        foundTask = step;
        foundGoal = goal;
        break;
      }
    }
    setTask(foundTask);
    setParentGoal(foundGoal);
  }, [goals, taskId]);

  const handleStatusChange = (newStatus: Step['status']) => {
    if (!task || !parentGoal) return;

    const updatedSteps = parentGoal.steps.map(step =>
      step.id === taskId ? { ...step, status: newStatus } : step
    );

    updateGoal({ ...parentGoal, steps: updatedSteps });

    // Optimistically update local state as well
    setTask(prev => prev ? { ...prev, status: newStatus } : null);
  };

  if (!task || !parentGoal) {
    return (
      <div className="text-center p-6 text-red-500 dark:text-red-400">
        Task not found. <Link to="/goals" className="text-blue-500 hover:underline">Go back to goals</Link>
      </div>
    );
  }

  const statusOptions: Step['status'][] = ['not-started', 'in-progress', 'completed'];
  const statusIcons = {
    'not-started': <Circle className="w-4 h-4 mr-2 text-gray-500" />,
    'in-progress': <Circle className="w-4 h-4 mr-2 text-yellow-500 animate-pulse" />,
    'completed': <Check className="w-4 h-4 mr-2 text-green-500" />,
  };


  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-2xl mx-auto">
       {/* Back Link to Parent Goal */}
      <Link to={`/goal/${parentGoal.id}`} className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-4 text-sm">
        <ChevronLeft className="w-5 h-5 mr-1" />
        Back to Goal: {parentGoal.title}
      </Link>

      {/* Task Title */}
      <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">{task.title}</h2>
       {/* Task Priority */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Priority: {task.priority}</p>


      {/* Status Update Section */}
      <div className="border-t pt-4 mt-4 dark:border-gray-700">
        <h3 className="font-semibold mb-3 text-lg text-gray-800 dark:text-gray-200">Update Status</h3>
         <div className="flex flex-col sm:flex-row gap-2 items-start">
            <span className="text-gray-700 dark:text-gray-300 mt-2">Current Status:</span>
            <div className="flex-grow flex flex-wrap gap-2">
              {statusOptions.map(status => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  disabled={task.status === status}
                  className={`flex items-center px-3 py-2 text-sm rounded-md border transition-colors ${
                    task.status === status
                      ? 'bg-blue-100 dark:bg-blue-900 border-blue-500 dark:border-blue-400 text-blue-700 dark:text-blue-200 font-medium'
                      : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
                >
                  {statusIcons[status]}
                  {status.replace('-', ' ')}
                </button>
              ))}
            </div>
         </div>
      </div>

       {/* TODO: Add other task details or editing capabilities here if needed */}

    </div>
  );
} 