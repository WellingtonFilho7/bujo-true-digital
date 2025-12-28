import { useState, useEffect, useCallback } from 'react';
import { BujoData, Task, TaskType } from '@/types/bujo';

const STORAGE_KEY = 'bujo-data-v3';

const initialData: BujoData = {
  tasks: {},
  projects: []
};

export function useBujo() {
  const [data, setData] = useState<BujoData>(initialData);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch (e) {
        console.error('Error loading BuJo data:', e);
      }
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const toISODate = useCallback((date: Date): string => {
    return date.toISOString().split('T')[0];
  }, []);

  const startOfWeek = useCallback((date: Date): Date => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = (day === 0 ? -6 : 1) - day;
    d.setDate(d.getDate() + diff);
    return d;
  }, []);

  const addTask = useCallback((dateStr: string, content: string, type: TaskType, projectId?: string) => {
    setData(prev => {
      const tasks = prev.tasks[dateStr] || [];
      return {
        ...prev,
        tasks: {
          ...prev.tasks,
          [dateStr]: [...tasks, {
            id: Math.random().toString(36).substr(2, 9),
            content,
            type,
            status: 'open',
            projectId: projectId || null
          }]
        }
      };
    });
  }, []);

  const updateTaskStatus = useCallback((dateStr: string, taskId: string, status: Task['status']) => {
    setData(prev => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [dateStr]: (prev.tasks[dateStr] || []).map(t =>
          t.id === taskId ? { ...t, status } : t
        )
      }
    }));
  }, []);

  // --- AQUI ESTAVA FALTANDO ESSA FUNÇÃO ---
  const deleteTask = useCallback((dateStr: string, taskId: string) => {
    setData(prev => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [dateStr]: (prev.tasks[dateStr] || []).filter(t => t.id !== taskId)
      }
    }));
  }, []);
  // ----------------------------------------

  const migrateTask = useCallback((fromDate: string, taskId: string, toDate: string) => {
    setData(prev => {
      const task = prev.tasks[fromDate]?.find(t => t.id === taskId);
      if (!task) return prev;

      const newTasks = { ...prev.tasks };
      
      // Update original task status
      newTasks[fromDate] = newTasks[fromDate].map(t =>
        t.id === taskId ? { ...t, status: 'migrated' as const } : t
      );
      
      // Add to new date
      const targetTasks = newTasks[toDate] || [];
      newTasks[toDate] = [...targetTasks, {
        ...task,
        id: Math.random().toString(36).substr(2, 9),
        status: 'open' as const
      }];

      return { ...prev, tasks: newTasks };
    });
  }, []);

  const addProject = useCallback((name: string) => {
    setData(prev => ({
      ...prev,
      projects: [...prev.projects, { id: Date.now().toString(), name }]
    }));
  }, []);

  const deleteProject = useCallback((projectId: string) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== projectId)
    }));
  }, []);

  const getTasksForDate = useCallback((dateStr: string): Task[] => {
    return data.tasks[dateStr] || [];
  }, [data.tasks]);

  const exportData = useCallback(() => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = 'bujo-backup.json';
    a.click();
  }, [data]);

  const importData = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        setData(imported);
      } catch (err) {
        console.error('Error importing data:', err);
      }
    };
    reader.readAsText(file);
  }, []);

  return {
    data,
    currentDate,
    setCurrentDate,
    toISODate,
    startOfWeek,
    addTask,
    updateTaskStatus,
    deleteTask, // <--- E FALTAVA EXPORTAR ELA AQUI
    migrateTask,
    addProject,
    deleteProject,
    getTasksForDate,
    exportData,
    importData
  };
}
