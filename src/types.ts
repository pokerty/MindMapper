export interface Goal {
  id: string;
  title: string;
  description: string;
  priority: 'urgent-important' | 'not-urgent-important' | 'urgent-not-important' | 'not-urgent-not-important';
  status: 'not-started' | 'in-progress' | 'completed';
  created_at: string;
  steps: Step[];
  tags: string[];
}

export interface Step {
  id: string;
  goal_id: string;
  title: string;
  status: 'not-started' | 'in-progress' | 'completed';
  priority: 'urgent-important' | 'not-urgent-important' | 'urgent-not-important' | 'not-urgent-not-important';
  due_date?: string;
}

export interface MindfulnessExercise {
  id: string;
  title: string;
  description: string;
  duration: number;
  type: 'breathing' | 'journaling' | 'meditation';
}

export interface MatrixQuadrant {
  title: string;
  color: string;
  action: string;
  description: string;
}