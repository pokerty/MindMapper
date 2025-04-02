import React from 'react';
import { Goal, MatrixQuadrant } from '../types';
import { useGoalStore } from '../store/goalStore';
import { Clock, Trash2, Users, CheckCircle } from 'lucide-react';

export const GoalMatrix = () => {
  const { goals } = useGoalStore();

  const quadrantConfig: Record<string, MatrixQuadrant> = {
    'urgent-important': {
      title: 'Do Now',
      color: 'bg-red-100 border-red-500',
      action: 'Do it immediately',
      description: 'Critical tasks that need immediate attention',
    },
    'not-urgent-important': {
      title: 'Schedule',
      color: 'bg-blue-100 border-blue-500',
      action: 'Plan it',
      description: 'Important tasks that require proper planning',
    },
    'urgent-not-important': {
      title: 'Delegate',
      color: 'bg-green-100 border-green-500',
      action: 'Assign to others',
      description: 'Tasks that can be delegated to save time',
    },
    'not-urgent-not-important': {
      title: 'Delete',
      color: 'bg-amber-100 border-amber-500',
      action: 'Eliminate',
      description: 'Tasks to eliminate or do later if time permits',
    },
  };

  const getQuadrantIcon = (quadrant: string) => {
    switch (quadrant) {
      case 'urgent-important':
        return <CheckCircle className="w-5 h-5 text-red-600" />;
      case 'not-urgent-important':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'urgent-not-important':
        return <Users className="w-5 h-5 text-green-600" />;
      case 'not-urgent-not-important':
        return <Trash2 className="w-5 h-5 text-amber-600" />;
      default:
        return null;
    }
  };

  const matrixQuadrants = {
    'urgent-important': goals.filter((g) => g.priority === 'urgent-important'),
    'not-urgent-important': goals.filter(
      (g) => g.priority === 'not-urgent-important'
    ),
    'urgent-not-important': goals.filter(
      (g) => g.priority === 'urgent-not-important'
    ),
    'not-urgent-not-important': goals.filter(
      (g) => g.priority === 'not-urgent-not-important'
    ),
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Tasks Matrix</h2>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(matrixQuadrants).map(([quadrant, goals]) => {
          const config = quadrantConfig[quadrant];
          return (
            <div
              key={quadrant}
              className={`rounded-lg border-2 p-4 ${config.color}`}
            >
              <div className="flex items-center gap-2 mb-3">
                {getQuadrantIcon(quadrant)}
                <h3 className="text-lg font-semibold">{config.title}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">{config.description}</p>
              <p className="text-sm font-medium mb-4">Action: {config.action}</p>
              <div className="space-y-2">
                {goals.map((goal) => (
                  <div
                    key={goal.id}
                    className="p-3 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h4 className="font-medium">{goal.title}</h4>
                    <p className="text-sm text-gray-600">{goal.description}</p>
                    {goal.tags && goal.tags.length > 0 && (
                      <div className="flex gap-2 mt-2">
                        {goal.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};