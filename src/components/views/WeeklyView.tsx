import { useState } from 'react';
import { Task, TaskType } from '@/types/bujo';
import { TaskItem } from '@/components/TaskItem';
import { AddTaskForm } from '@/components/AddTaskForm';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface WeeklyViewProps {
  currentDate: Date;
  toISODate: (date: Date) => string;
  startOfWeek: (date: Date) => Date;
  getTasksForDate: (dateStr: string) => Task[];
  addTask: (dateStr: string, content: string, type: TaskType) => void;
  updateTaskStatus: (dateStr: string, taskId: string, status: Task['status']) => void;
  onMigrate: (dateStr: string, taskId: string) => void;
  deleteTask: (dateStr: string, taskId: string) => void;
}

export function WeeklyView({
  currentDate, toISODate, startOfWeek, getTasksForDate, addTask, updateTaskStatus, onMigrate, deleteTask
}: WeeklyViewProps) {
  const [viewDate, setViewDate] = useState(new Date(currentDate));
  const weekStartDate = startOfWeek(viewDate);
  const dateStr = toISODate(weekStartDate);
  const tasks = getTasksForDate(dateStr);

  const handleSmartAdd = (currentListDate: string, content: string, type: TaskType, specificDate?: string) => {
    if (specificDate) {
      // ATENÇÃO: Se o usuário selecionar uma data específica, salvamos NAQUELA data (Daily Log)
      // Ou seja, vai sumir desta lista (que é da semana geral) e aparecerá no Daily View daquele dia.
      // Isso é o comportamento correto de um banco de dados.
      addTask(specificDate, content, type);
    } else {
      addTask(currentListDate, content, type);
    }
  };

  const handleToggleDone = (dStr: string, taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) updateTaskStatus(dStr, taskId, task.status === 'done' ? 'open' : 'done');
  };

  // Formatação do Título
  const weekEndDate = new Date(weekStartDate); weekEndDate.setDate(weekEndDate.getDate() + 6);
  const startFmt = weekStartDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  const endFmt = weekEndDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => { const d = new Date(viewDate); d.setDate(d.getDate() - 7); setViewDate(d); }} className="p-1 hover:bg-accent rounded-full"><ChevronLeft className="w-5 h-5" /></button>
        <h2 className="text-lg font-bold uppercase tracking-tight text-center">Semana ({startFmt} - {endFmt})</h2>
        <button onClick={() => { const d = new Date(viewDate); d.setDate(d.getDate() + 7); setViewDate(d); }} className="p-1 hover:bg-accent rounded-full"><ChevronRight className="w-5 h-5" /></button>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {tasks.length === 0 ? <p className="text-muted-foreground text-sm italic text-center mt-10">Lista da semana vazia.</p> : (
          <div className="space-y-0.5">
            {tasks.map(task => (
              <TaskItem key={task.id} task={task} dateStr={dateStr} onToggleDone={handleToggleDone} onCancel={(d, id) => updateTaskStatus(d, id, 'canceled')} onMigrate={onMigrate} onDelete={deleteTask} />
            ))}
          </div>
        )}
      </div>
      <div className="pt-4 border-t border-border mt-4">
        <AddTaskForm dateStr={dateStr} onAdd={handleSmartAdd} />
      </div>
    </div>
  );
}
