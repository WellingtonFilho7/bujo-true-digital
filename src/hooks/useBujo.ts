import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Task, Project, TaskType } from '@/types/bujo';

// Buscando as variáveis que você configurou na Vercel
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Criando a conexão com o banco de dados
const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export function useBujo() {
  const [tasks, setTasks] = useState<Record<string, Task[]>>({});
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Função para formatar a data (ajustada para o fuso horário local)
  const toISODate = useCallback((date: Date): string => {
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
    return adjustedDate.toISOString().split('T')[0];
  }, []);

  // Função para calcular o início da semana
  const startOfWeek = useCallback((date: Date): Date => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = (day === 0 ? -6 : 1) - day;
    d.setDate(d.getDate() + diff);
    return d;
  }, []);

  // Busca todos os dados do Supabase
  const fetchData = useCallback(async () => {
    if (!supabase) return;

    // Busca Projetos
    const { data: projData } = await supabase.from('projects').select('*');
    if (projData) setProjects(projData);

    // Busca Tarefas
    const { data: taskData } = await supabase.from('tasks').select('*');
    if (taskData) {
      const organized: Record<string, Task[]> = {};
      taskData.forEach((t: any) => {
        const d = t.date_str;
        if (!organized[d]) organized[d] = [];
        organized[d].push({
          id: t.id,
          content: t.content,
          type: t.type,
          status: t.status,
          projectId: t.project_id
        });
      });
      setTasks(organized);
    }
  }, []);

  // Carrega os dados automaticamente ao abrir o app
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Adiciona uma nova tarefa ao banco
  const addTask = async (dateStr: string, content: string, type: TaskType, projectId?: string) => {
    if (!supabase) return;
    const { error } = await supabase.from('tasks').insert([{
      content,
      type,
      status: 'open',
      date_str: dateStr,
      project_id: projectId || null
    }]);
    if (!error) fetchData();
  };

  // Atualiza o status de uma tarefa (ex: marcar como concluída)
  const updateTaskStatus = async (dateStr: string, taskId: string, status: Task['status']) => {
    if (!supabase) return;
    const { error } = await supabase.from('tasks')
      .update({ status })
      .eq('id', taskId);
    if (!error) fetchData();
  };

  // Exclui uma tarefa permanentemente
  const deleteTask = async (dateStr: string, taskId: string) => {
    if (!supabase) return;
    const { error } = await supabase.from('tasks').delete().eq('id', taskId);
    if (!error) fetchData();
  };

  // Adiciona um novo projeto
  const addProject = async (name: string) => {
    if (!supabase) return;
    const { error } = await supabase.from('projects').insert([{ name }]);
    if (!error) fetchData();
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
    getTasksForDate: (d: string) => tasks[d] || []
  };
}
