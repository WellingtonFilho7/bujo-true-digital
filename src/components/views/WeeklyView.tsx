import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Task, TaskType, Project } from "@/types/bujo"; // Adicionei Project
import { TaskItem } from "@/components/TaskItem";
import { AddTaskForm } from "@/components/AddTaskForm";

type TaskWithOriginalDate = Task & { originalDate: string };

interface WeeklyViewProps {
  currentDate: Date;
  toISODate: (date: Date) => string;
  startOfWeek: (date: Date) => Date;
  getTasksForDate: (dateStr: string) => Task[];
  projects: Project[]; // Nova prop
  
  // Assinatura atualizada
  addTask: (dateStr: string, content: string, type: TaskType, targetDate?: string, projectId?: string) => void;
  
  updateTaskStatus: (dateStr: string, taskId: string, status: Task["status"]) => void;
  onMigrate: (dateStr: string, taskId: string) => void;
  deleteTask: (dateStr: string, taskId: string) => void;
}

export function WeeklyView({
  currentDate,
  toISODate,
  startOfWeek,
  getTasksForDate,
  projects, // Recebendo
  addTask,
  updateTaskStatus,
  onMigrate,
  deleteTask,
}: WeeklyViewProps) {
  const [viewDate, setViewDate] = useState(new Date(currentDate));
  const weekStartDate = startOfWeek(viewDate);

  const weekDays = useMemo(() => {
    const days: { date: Date; dateStr: string }[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(weekStartDate);
      d.setDate(d.getDate() + i);
      // Mantendo a correção do "bug da meia-noite"
      d.setHours(12, 0, 0, 0); 
      days.push({ date: d, dateStr: toISODate(d) });
    }
    return days;
  }, [weekStartDate, toISODate]);

  const allWeekTasks: TaskWithOriginalDate[] = useMemo(() => {
    const out: TaskWithOriginalDate[] = [];
    for (const day of weekDays) {
      const dayTasks = getTasksForDate(day.dateStr);
      for (const t of dayTasks) {
        out.push({ ...t, originalDate: day.dateStr });
      }
    }
    return out;
  }, [weekDays, getTasksForDate]);

  // Atualizado para receber projectId
  const handleSmartAdd = (
    listBaseDateStr: string,
    content: string,
    type: TaskType,
    specificDate?: string,
    projectId?: string
  ) => {
    const finalDate = specificDate || listBaseDateStr;
    addTask(finalDate, content, type, undefined, projectId);
  };

  const handleToggleDone = (dateStr: string, taskId: string) => {
    const task = allWeekTasks.find((t) => t.id === taskId && t.originalDate === dateStr);
    if (!task) return;
    updateTaskStatus(dateStr, taskId, task.status === "done" ? "open" : "done");
  };

  const weekEndDate = new Date(weekStartDate);
  weekEndDate.setDate(weekEndDate.getDate() + 6);

  const startFmt = weekStartDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  });
  const endFmt = weekEndDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  });

  const weekBaseDate = new Date(weekStartDate);
  weekBaseDate.setHours(12, 0, 0, 0);
  const weekBaseDateStr = toISODate(weekBaseDate);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => {
            const d = new Date(viewDate);
            d.setDate(d.getDate() - 7);
            setViewDate(d);
          }}
          className="p-1 hover:bg-accent rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-bold uppercase tracking-tight text-center">
          Semana ({startFmt} - {endFmt})
        </h2>

        <button
          onClick={() => {
            const d = new Date(viewDate);
            d.setDate(d.getDate() + 7);
            setViewDate(d);
          }}
          className="p-1 hover:bg-accent rounded-full"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {allWeekTasks.length === 0 ? (
          <p className="text-muted-foreground text-sm italic text-center mt-10">
            Semana livre.
          </p>
        ) : (
          <div className="space-y-0.5">
            {allWeekTasks.map((task) => (
              <TaskItem
                key={`${task.originalDate}-${task.id}`}
                task={task}
                dateStr={task.originalDate}
                onToggleDone={handleToggleDone}
                onCancel={(d, id) => updateTaskStatus(d, id, "canceled")}
                onMigrate={onMigrate}
                onDelete={deleteTask}
                showDate={true}
                projects={projects}
              />
            ))}
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-border mt-4">
        {/* Passando projects */}
        <AddTaskForm dateStr={weekBaseDateStr} onAdd={handleSmartAdd} projects={projects} />
      </div>
    </div>
  );
}
