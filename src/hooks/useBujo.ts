import { useState, useEffect, useCallback } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Task, Project, TaskType, TaskStatus } from "@/types/bujo";

type TaskRow = {
  id: string;
  content: string;
  type: TaskType;
  status: TaskStatus;
  date_str: string;
  project_id?: string | null;
};

type TasksByDate = Record<string, Task[]>;

function createSupabaseClient(): SupabaseClient | null {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

  if (!supabaseUrl || !supabaseAnonKey) return null;
  return createClient(supabaseUrl, supabaseAnonKey);
}

const supabase = createSupabaseClient();

export function useBujo() {
  const hasSupabase = !!supabase;
  const [tasks, setTasks] = useState<TasksByDate>({});
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Fuso horário corrigido
  const toISODate = useCallback((date: Date): string => {
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
    return adjustedDate.toISOString().split("T")[0];
  }, []);

  const startOfWeek = useCallback((date: Date): Date => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = (day === 0 ? -6 : 1) - day;
    d.setDate(d.getDate() + diff);
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  // Normalização de dados
  const normalizeTasks = useCallback((rows: TaskRow[]): TasksByDate => {
    const organized: TasksByDate = {};
    for (const t of rows) {
      const dateStr = String(t.date_str);
      if (!organized[dateStr]) organized[dateStr] = [];
      organized[dateStr].push({
        id: t.id,
        content: t.content,
        type: t.type as TaskType,
        status: t.status as TaskStatus,
        projectId: t.project_id ?? null,
      });
    }
    return organized;
  }, []);

  const fetchData = useCallback(async () => {
    if (!supabase) { setErrorMsg("Sem conexão com Supabase"); return; }
    setErrorMsg(null);

    const [{ data: projData, error: projErr }, { data: taskData, error: taskErr }] =
      await Promise.all([
        supabase.from("projects").select("*").order("created_at", { ascending: true }),
        supabase.from("tasks").select("*").order("date_str", { ascending: true }),
      ]);

    if (projErr || taskErr) {
      setErrorMsg(taskErr?.message || projErr?.message || "Erro ao carregar");
      return;
    }

    if (projData) setProjects(projData as Project[]);
    if (taskData) setTasks(normalizeTasks(taskData));
  }, [normalizeTasks]);

  useEffect(() => { fetchData(); }, [fetchData]);

  // ATUALIZADO: Agora aceita projectId
  const addTask = useCallback(
    async (dateStr: string, content: string, type: TaskType, targetDate?: string, projectId?: string) => {
      if (!supabase) {
        setErrorMsg("Sem conexão com Supabase");
        return;
      }

      const finalDate = (targetDate || dateStr).trim();
      const trimmed = content.trim();
      if (!trimmed) return;

      const { error } = await supabase.from("tasks").insert([{
        content: trimmed,
        type,
        status: "open",
        date_str: finalDate,
        project_id: projectId || null, // Salva o projeto!
      }]);

      if (error) {
        setErrorMsg(error.message);
        setTimeout(() => setErrorMsg(null), 5000);
      } else {
        await fetchData();
      }
    },
    [fetchData]
  );

  const updateTaskStatus = useCallback(async (dateStr: string, taskId: string, status: TaskStatus) => {
      if (!supabase) {
        setErrorMsg("Sem conexão com Supabase");
        return;
      }
      const { error } = await supabase.from("tasks").update({ status }).eq("id", taskId);
      if (!error) await fetchData();
    }, [fetchData]);

  // Migração (mantida igual)
  const migrateTask = async (fromDateStr: string, taskId: string, target: 'tomorrow' | 'week' | 'month') => {
    if (!supabase) { setErrorMsg("Sem conexão com Supabase"); return; }
    try {
      const base = new Date(fromDateStr + 'T12:00:00');
      let targetDateStr = '';
      
      if (target === 'tomorrow') {
        base.setDate(base.getDate() + 1);
      } else if (target === 'week') {
        // Envia para a próxima segunda-feira
        const day = base.getDay(); // 0-dom, 1-seg
        const daysToNextMonday = (8 - day) % 7 || 7;
        base.setDate(base.getDate() + daysToNextMonday);
      } else {
        base.setMonth(base.getMonth() + 1);
        base.setDate(1);
      }
      const offset = base.getTimezoneOffset();
      const adjusted = new Date(base.getTime() - offset * 60000);
      targetDateStr = adjusted.toISOString().split('T')[0];

      const { data: original } = await supabase.from('tasks').select('*').eq('id', taskId).single();
      if (!original) return;

      await supabase.from('tasks').update({ status: 'migrated' }).eq('id', taskId);
      await supabase.from('tasks').insert([{
        content: original.content,
        type: original.type,
        status: 'open',
        date_str: targetDateStr,
        project_id: original.project_id
      }]);
      await fetchData();
    } catch (err) { console.error(err); }
  };

  const deleteTask = useCallback(async (dateStr: string, taskId: string) => {
      if (!supabase) { setErrorMsg("Sem conexão com Supabase"); return; }
      const { error } = await supabase.from("tasks").delete().eq("id", taskId);
      if (!error) await fetchData();
    }, [fetchData]);

  const addProject = useCallback(async (name: string) => {
      if (!supabase) { setErrorMsg("Sem conexão com Supabase"); return; }
      const trimmed = name.trim();
      if (!trimmed) return;
      const { error } = await supabase.from("projects").insert([{ name: trimmed }]);
      if (!error) await fetchData();
    }, [fetchData]);

  // NOVO: Função para deletar projeto
  const deleteProject = useCallback(async (id: string) => {
    if (!supabase) { setErrorMsg("Sem conexão com Supabase"); return; }
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) {
        setErrorMsg("Não foi possível apagar (verifique se tem tarefas)");
        setTimeout(() => setErrorMsg(null), 4000);
    } else {
        await fetchData();
    }
  }, [fetchData]);

  const getTasksForDate = useCallback((d: string) => tasks[d] || [], [tasks]);

  return {
    data: { tasks, projects },
    currentDate,
    setCurrentDate,
    toISODate,
    startOfWeek,
    addTask,
    updateTaskStatus,
    migrateTask,    
    deleteTask,
    addProject,
    deleteProject, // Exportando a nova função
    errorMsg,
    isConnected: hasSupabase && !errorMsg,
    getTasksForDate,
  };
}
