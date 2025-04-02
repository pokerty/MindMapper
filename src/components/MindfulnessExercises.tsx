import React, { useState, useEffect } from 'react';
import { Timer, BookOpen, Brain, CheckCircle } from 'lucide-react';

interface Exercise {
  id: string;
  title: string;
  description: string;
  duration: number;
  type: 'breathing' | 'journaling' | 'meditation';
  icon: React.ElementType;
}

const exercises: Exercise[] = [
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

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const MindfulnessExercises = () => {
  const [activeTimerId, setActiveTimerId] = useState<string | null>(null);
  const [remainingTime, setRemainingTime] = useState<number>(0);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined;

    if (activeTimerId && remainingTime > 0) {
      intervalId = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (remainingTime === 0 && activeTimerId) {
      console.log(`Exercise ${activeTimerId} finished!`);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [activeTimerId, remainingTime]);

  const startTimer = (exerciseId: string, duration: number) => {
    setActiveTimerId(exerciseId);
    setRemainingTime(duration);
  };

  const stopTimer = () => {
    setActiveTimerId(null);
    setRemainingTime(0);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Mindfulness Exercises</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercises.map((exercise) => {
          const Icon = exercise.icon;
          const isTimerActive = activeTimerId === exercise.id;
          const isTimerFinished = isTimerActive && remainingTime === 0;

          return (
            <div
              key={exercise.id}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col ${isTimerActive ? 'border-2 border-blue-500 dark:border-blue-400' : 'border border-transparent'}`}
            >
              <div className="flex items-center mb-4">
                <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2 shrink-0" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{exercise.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm flex-grow">{exercise.description}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Duration: {exercise.duration / 60} minutes
              </p>

              {isTimerActive && (
                <div className="text-center my-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  {isTimerFinished ? (
                    <div className="flex items-center justify-center text-green-600 dark:text-green-400">
                      <CheckCircle className="w-6 h-6 mr-2" />
                      <span className="text-lg font-semibold">Finished!</span>
                    </div>
                  ) : (
                    <span className="text-4xl font-bold text-gray-800 dark:text-gray-100 tabular-nums">
                      {formatTime(remainingTime)}
                    </span>
                  )}
                </div>
              )}

              <div className="mt-auto pt-4 border-t dark:border-gray-700">
                {isTimerActive ? (
                  <button
                    onClick={stopTimer}
                    disabled={isTimerFinished}
                    className={`w-full rounded-md py-2 transition-colors text-white ${isTimerFinished ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600'}`}
                  >
                    {isTimerFinished ? 'Completed' : 'Stop Timer'}
                  </button>
                ) : (
                  <button
                    onClick={() => startTimer(exercise.id, exercise.duration)}
                    className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
                  >
                    Start Exercise
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};