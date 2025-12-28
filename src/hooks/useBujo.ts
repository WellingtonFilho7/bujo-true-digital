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
      console.error("Erro ao buscar tarefas:", error.message);
      return;
    }

    // LOG DE TESTE: Vamos ver o que o banco está devolvendo
    console.log("Tarefas vindas do banco:", taskData);

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
    if (!supabase) return;
    
    // Se o usuário usou o "Agendar para", usamos a targetDate, senão a dateStr normal
    const finalDate = targetDate || dateStr;

    const { error } = await supabase.from('tasks').insert([{
      content,
      type,
      status: 'open',
      date_str: finalDate,
      project_id: null
    }]);

    if (error) {
      console.error("Erro ao inserir:", error.message);
    } else {
      await fetchData(); // Força a atualização da lista
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

  return {
    data: { tasks, projects },
    currentDate,
    setCurrentDate,
    toISODate,
    startOfWeek,
    addTask,
    updateTaskStatus,
    deleteTask,
    getTasksForDate: (d: string) => tasks[d] || []
  };
}
