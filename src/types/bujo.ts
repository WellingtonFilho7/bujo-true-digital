export type TaskType = 'task' | 'event' | 'note';
export type TaskStatus = 'open' | 'done' | 'canceled' | 'migrated';

export interface Task {
  id: string;
  content: string;
  type: TaskType;
  status: TaskStatus;
  projectId?: string | null;
}

export interface Project {
  id: string;
  name: string;
}

export interface BujoData {
  tasks: Record<string, Task[]>;
  projects: Project[];
}

export type ViewType = 'daily' | 'weekly' | 'monthly' | 'projects';

export const TYPE_SYMBOLS: Record<TaskType, string> = {
  task: '•',
  event: '○',
  note: '–'
};

export const STATUS_SYMBOLS: Record<TaskStatus, string> = {
  open: '',
  done: '✔',
  canceled: '✖',
  migrated: '↦'
};
