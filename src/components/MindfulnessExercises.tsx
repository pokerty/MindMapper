import React, { useState } from 'react';
import { Timer, BookOpen, Brain } from 'lucide-react';

const exercises = [
  {
    id: '1',
    title: 'Box Breathing',
    description: 'Breathe in for 4 counts, hold for 4, exhale for 4, hold for 4.',
    duration: 300,
    type: 'breathing',
    icon: Timer,
  },
  {
    id: '2',
    title: 'Gratitude Journal',
    description: 'Write down three things you\'re grateful for today.',
    duration: 600,
    type: 'journaling',
    icon: BookOpen,
  },
  {
    id: '3',
    title: 'Mind Clearing',
    description: 'Take 5 minutes to write down all thoughts clouding your mind.',
    duration: 300,
    type: 'meditation',
    icon: Brain,
  },
];

export const MindfulnessExercises = () => {
  const [activeExercise, setActiveExercise] = useState<string | null>(null);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Mindfulness Exercises</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {exercises.map((exercise) => {
          const Icon = exercise.icon;
          return (
            <div
              key={exercise.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <Icon className="w-6 h-6 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold">{exercise.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{exercise.description}</p>
              <p className="text-sm text-gray-500 mb-4">
                Duration: {exercise.duration / 60} minutes
              </p>
              <button
                onClick={() => setActiveExercise(exercise.id)}
                className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition-colors"
              >
                Start Exercise
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};