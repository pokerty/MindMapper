import React, { useState } from 'react';
import { useGoalStore } from '../store/goalStore';
import { Goal } from '../types';
import { PlusCircle, X } from 'lucide-react';

export const AddGoalForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { addGoal } = useGoalStore();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    steps: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newGoal: Goal = {
      id: crypto.randomUUID(),
      title: formData.title,
      description: formData.description,
      priority: 'not-urgent-important',
      status: 'not-started',
      created_at: new Date().toISOString(),
      steps: [],
      tags: [],
    };
    addGoal(newGoal);
    setIsOpen(false);
    setFormData({
      title: '',
      description: '',
      steps: [],
    });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors"
      >
        <PlusCircle className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Add New Goal</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md"
                >
                  Add Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};