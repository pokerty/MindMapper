import React, { useEffect } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Layout, Target, Brain, BarChart, ListChecks, Sun, Moon } from 'lucide-react';
import { MainGoals } from './components/MainGoals';
import { AddGoalForm } from './components/AddGoalForm';
import { MindfulnessExercises } from './components/MindfulnessExercises';
import { GoalDetail } from './components/GoalDetail';
import { TasksOverview } from './components/TasksOverview';
import { useThemeStore } from './stores/themeStore';

function App() {
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const location = useLocation();

  useEffect(() => {
    console.log('[App.tsx useEffect] Running effect. isDarkMode:', isDarkMode);
    if (isDarkMode) {
      console.log('[App.tsx useEffect] Adding dark class');
      document.documentElement.classList.add('dark');
    } else {
      console.log('[App.tsx useEffect] Removing dark class');
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const tabs = [
    { id: '/goals', label: 'Goals', icon: Target },
    { id: '/tasks', label: 'Tasks', icon: ListChecks },
    { id: '/mindfulness', label: 'Mindfulness', icon: Brain },
    { id: '/progress', label: 'Progress', icon: BarChart },
  ];

  const getActiveTabId = () => {
    const currentPath = location.pathname;
    if (currentPath.startsWith('/goal/') || currentPath === '/goals') return '/goals';
    if (currentPath === '/tasks') return '/tasks';
    if (currentPath === '/mindfulness') return '/mindfulness';
    if (currentPath === '/progress') return '/progress';
    return '/goals';
  };
  const activeTabId = getActiveTabId();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Layout className="w-8 h-8 text-blue-600" />
              <h1 className="ml-2 text-xl font-bold text-gray-900 dark:text-gray-100">
                MindMapper
              </h1>
            </div>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <Sun className="h-6 w-6" />
              ) : (
                <Moon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map(({ id, label, icon: Icon }) => (
              <Link
                key={id}
                to={id}
                className={`${
                  activeTabId === id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'
                } flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
              >
                <Icon className="w-5 h-5 mr-2" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Navigate to="/goals" replace />} />

          <Route path="/goals" element={(
            <div className="space-y-8">
              <MainGoals />
              <AddGoalForm />
            </div>
          )} />

          <Route path="/goal/:goalId" element={<GoalDetail />} />

          <Route path="/tasks" element={<TasksOverview />} />

          <Route path="/mindfulness" element={<MindfulnessExercises />} />

          <Route path="/progress" element={(
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Progress Tracking</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Progress tracking visualization coming soon...
              </p>
            </div>
          )} />

          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;