import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGoalStore } from '../store/goalStore';
import { Step } from '../types';
import { ChevronLeft, Plus, Tag } from 'lucide-react';

export function GoalDetail() {
  const { goalId } = useParams<{ goalId: string }>();
  const { goals, updateGoal } = useGoalStore();
  const [newStepTitle, setNewStepTitle] = useState('');
  const [newStepPriority, setNewStepPriority] = useState<Step['priority']>('not-urgent-important');
  const [newTag, setNewTag] = useState(''); // Keep tag logic here for now

  const goal = goals.find((g) => g.id === goalId);

  const handleAddStep = () => {
    if (!newStepTitle.trim() || !goal) return;
    const step: Step = {
      id: crypto.randomUUID(),
      goal_id: goal.id,
      title: newStepTitle,
      status: 'not-started' as const,
      priority: newStepPriority,
    };
    updateGoal({ ...goal, steps: [...goal.steps, step] });
    setNewStepTitle('');
    setNewStepPriority('not-urgent-important');
  };

  const handleAddTag = () => {
    if (!newTag.trim() || !goal) return;
    updateGoal({ ...goal, tags: [...(goal.tags || []), newTag.trim()] });
    setNewTag('');
  };

  if (!goal) {
    return (
      <div className="text-center p-6 text-red-500">
        Goal not found. <Link to="/goals" className="text-blue-500 hover:underline">Go back to goals</Link>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
       {/* Back Link */}
      <Link to="/goals" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-4">
        <ChevronLeft className="w-5 h-5 mr-1" />
        Back to Goals
      </Link>

      {/* Goal Title and Description */}
      <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">{goal.title}</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{goal.description}</p>
      <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">Priority: {goal.priority}</p>


      {/* Tags Section */}
      <div className="mb-6 border-t pt-4 mt-4 dark:border-gray-700">
        <h3 className="font-semibold mb-3 text-lg text-gray-800 dark:text-gray-200">Tags</h3>
         <div className="flex flex-wrap gap-2 mb-3">
            {(goal.tags || []).map((tag) => (
              <span key={tag} className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-200">
                {tag}
              </span>
            ))}
        </div>
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="flex-1 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm p-2"
            placeholder="Add new tag"
          />
          <button
            onClick={handleAddTag}
            className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-sm"
          >
            Add Tag
          </button>
        </div>
      </div>

       {/* Steps/Tasks Section */}
      <div className="border-t pt-4 mt-4 dark:border-gray-700">
        <h3 className="font-semibold mb-3 text-lg text-gray-800 dark:text-gray-200">Tasks / Steps</h3>
        <div className="space-y-2 mb-4">
          {goal.steps.map((step) => (
            <div key={step.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md flex items-center justify-between">
              <div>
                <span className="text-gray-800 dark:text-gray-200">{step.title}</span>
                <p className="text-xs text-gray-400 dark:text-gray-500">Priority: {step.priority}</p>
              </div>
              {/* TODO: Add step status update logic */}
              <span className="text-sm text-gray-500 dark:text-gray-400">{step.status}</span>
            </div>
          ))}
           {goal.steps.length === 0 && <p className="text-gray-500 dark:text-gray-400">No steps added yet.</p>}
        </div>
        <div className="flex flex-col sm:flex-row gap-2 border-t pt-4 mt-4 dark:border-gray-600">
           <input
              type="text"
              value={newStepTitle}
              onChange={(e) => setNewStepTitle(e.target.value)}
              className="flex-grow rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
              placeholder="Add new step title"
            />
            <select
               value={newStepPriority}
               onChange={(e) => setNewStepPriority(e.target.value as Step['priority'])}
               className="sm:w-auto w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 text-sm"
            >
              <option value="urgent-important">Urgent & Important</option>
              <option value="not-urgent-important">Not Urgent & Important</option>
              <option value="urgent-not-important">Urgent & Not Important</option>
              <option value="not-urgent-not-important">Not Urgent & Not Important</option>
            </select>
            <button
              onClick={handleAddStep}
              className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shrink-0"
              aria-label="Add step"
            >
              <Plus className="w-5 h-5" />
            </button>
        </div>
      </div>
    </div>
  );
} 