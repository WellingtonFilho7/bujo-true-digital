import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Task, Project, TaskType } from '@/types/bujo';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export function useBujo() {
  const [tasks, setTasks] = useState<Record<string, Task[]>>({});
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const toISODate = useCallback((date: Date): string => {
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
    return adjustedDate.toISOString().split('T')[0];
  }, []);

  const startOfWeek = useCallback((date: Date): Date => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = (day === 0 ? -6 : 1) - day;
    d.setDate(d.getDate() + diff);
    return d;
  }, []);

  const fetchData = useCallback(async () => {
    if (!supabase) return;

    const { data: projData } = await supabase.from('projects').select('*');
    if (projData) setProjects(projData);

    const { data: taskData, error } = await supabase.from('tasks').select('*');
    
    if (error) {
      setErrorMsg("Erro ao carregar");
      return;
    }

    if (taskData) {
      const organized: Record<string, Task[]> = {};
      taskData.forEach((t: any) => {
        const d = t.date_str;
        if (!organized[d]) organized[d] = [];
        organized[d].push({
          id: t.id,
          content: t.content,
          type: t.type as TaskType,
          status: t.status,
          projectId: t.project_id
        });
      });
      setTasks(organized);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addTask = async (dateStr: string, content: string, type: TaskType, targetDate?: string) => {
    if (!supabase) {
      setErrorMsg("Sem conexão");
      return;
    }
    
    const finalDate = targetDate || dateStr;

    const { error } = await supabase.from('tasks').insert([{
      content: content.trim(),
      type: type,
      status: 'open',
      date_str: finalDate
    }]);

    if (error) {
      setErrorMsg(error.message);
      setTimeout(() => setErrorMsg(null), 5000);
    } else {
      await fetchData();
    }
  };

  const updateTaskStatus = async (dateStr: string, taskId: string, status: Task['status']) => {
    if (!supabase) return;
    const { error } = await supabase.from('tasks').update({ status }).eq('id', taskId);
    if (!error) await fetchData();
  };

  const deleteTask = async (dateStr: string, taskId: string) => {
    if (!supabase) return;
    const { error } = await supabase.from('tasks').delete().eq('id', taskId);
    if (!error) await fetchData();
  };

  const addProject = async (name: string) => {
    if (!supabase) return;
    const { error } = await supabase.from('projects').insert([{ name }]);
    if (!error) await fetchData();
  };

  return {
    data: { tasks, projects },
    currentDate,
    setCurrentDate,
    toISODate,
    startOfWeek,
    addTask,
    updateTaskStatus,
    deleteTask,
    addProject,
    errorMsg,
    getTasksForDate: (d: string) => tasks[d] || []
  };
}
