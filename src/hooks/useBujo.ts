import { useState, useEffect, useCallback } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Task, Project, TaskType, TaskStatus } from "@/types/bujo";

type TasksByDate = Record<string, Task[]>;

function createSupabaseClient(): SupabaseClient | null {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

  if (!supabaseUrl || !supabaseAnonKey) return null;
  return createClient(supabaseUrl, supabaseAnonKey);
}

const supabase = createSupabaseClient();

export function useBujo() {
  const [tasks, setTasks] = useState<TasksByDate>({});
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // YYYY-MM-DD no fuso local
  const toISODate = useCallback((date: Date): string => {
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
    return adjustedDate.toISOString().split("T")[0];
  }, []);

  const startOfWeek = useCallback((date: Date): Date => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = (day === 0 ? -6 : 1) - day; // segunda
    d.setDate(d.getDate() + diff);
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const normalizeTasks = useCallback((rows: any[]): TasksByDate => {
    const organized: TasksByDate = {};
    for (const t of rows) {
      // Se date_str vier como "2025-12-29" ok.
      // Se vier como date do Supabase, normalmente também chega string.
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
    if (!supabase) {
      setErrorMsg("Sem conexão (env do Supabase ausente)");
      return;
    }

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

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addTask = useCallback(
    async (dateStr: string, content: string, type: TaskType, targetDate?: string) => {
      if (!supabase) {
        setErrorMsg("Sem conexão");
        return;
      }

      const finalDate = (targetDate || dateStr).trim();
      const trimmed = content.trim();
      if (!trimmed) return;

      const { error } = await supabase.from("tasks").insert([
        {
          content: trimmed,
          type,
          status: "open",
          date_str: finalDate,
        },
      ]);

      if (error) {
        setErrorMsg(error.message);
        setTimeout(() => setErrorMsg(null), 5000);
        return;
      }

      await fetchData();
    },
    [fetchData]
  );

  const updateTaskStatus = useCallback(
    async (dateStr: string, taskId: string, status: TaskStatus) => {
      if (!supabase) return;

      const { error } = await supabase.from("tasks").update({ status }).eq("id", taskId);

      if (error) {
        setErrorMsg(error.message);
        setTimeout(() => setErrorMsg(null), 5000);
        return;
      }

      await fetchData();
    },
    [fetchData]
  );

  const deleteTask = useCallback(
    async (dateStr: string, taskId: string) => {
      if (!supabase) return;

      const { error } = await supabase.from("tasks").delete().eq("id", taskId);

      if (error) {
        setErrorMsg(error.message);
        setTimeout(() => setErrorMsg(null), 5000);
        return;
      }

      await fetchData();
    },
    [fetchData]
  );

  const addProject = useCallback(
    async (name: string) => {
      if (!supabase) return;

      const trimmed = name.trim();
      if (!trimmed) return;

      const { error } = await supabase.from("projects").insert([{ name: trimmed }]);

      if (error) {
        setErrorMsg(error.message);
        setTimeout(() => setErrorMsg(null), 5000);
        return;
      }

      await fetchData();
    },
    [fetchData]
  );

  const getTasksForDate = useCallback(
    (d: string) => tasks[d] || [],
    [tasks]
  );

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
    getTasksForDate,
  };
}
