import { useState } from 'react';
import { Task, TaskType } from '@/types/bujo';
import { TaskItem } from '@/components/TaskItem';
import { AddTaskForm } from '@/components/AddTaskForm';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MonthlyViewProps {
  currentDate: Date;
  toISODate: (date: Date) => string;
  getTasksForDate: (dateStr: string) => Task[];
  addTask: (dateStr: string, content: string, type: TaskType) => void;
  updateTaskStatus: (dateStr: string, taskId: string, status: Task['status']) => void;
  onMigrate: (dateStr: string, taskId: string) => void;
  deleteTask: (dateStr: string, taskId: string) => void;
}

export function MonthlyView({
  currentDate, toISODate, getTasksForDate, addTask, updateTaskStatus, onMigrate, deleteTask
}: MonthlyViewProps) {
  const [viewDate, setViewDate] = useState(new Date(currentDate));
  const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
  const dateStr = toISODate(firstDayOfMonth);
  const tasks = getTasksForDate(dateStr);

  const handleSmartAdd = (currentListDate: string, content: string, type: TaskType, specificDate?: string) => {
    if (specificDate) {
      // Se definiu data (ex: 15/02), salva no dia 15/02 (aparecerá no Daily Log do dia 15)
      // Se quiser que apareça na lista MESTRE do mês, a lógica seria converter para o dia 1 daquele mês.
      // Mas o comportamento padrão de "Agendar" geralmente é para um dia específico.
      addTask(specificDate, content, type);
    } else {
      addTask(currentListDate, content, type);
    }
  };

  const handleToggleDone = (dStr: string, taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) updateTaskStatus(dStr, taskId, task.status === 'done' ? 'open' : 'done');
  };

  const monthName = viewDate.toLocaleDateString('pt-BR', { month: 'long' });
  const monthTitle = `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} de ${viewDate.getFullYear()}`;

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => { const d = new Date(viewDate); d.setMonth(d.getMonth() - 1); setViewDate(d); }} className="p-1 hover:bg-accent rounded-full"><ChevronLeft className="w-5 h-5" /></button>
        <h2 className="text-lg font-bold uppercase tracking-tight text-center">{monthTitle}</h2>
        <button onClick={() => { const d = new Date(viewDate); d.setMonth(d.getMonth() + 1); setViewDate(d); }} className="p-1 hover:bg-accent rounded-full"><ChevronRight className="w-5 h-5" /></button>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {tasks.length === 0 ? <p className="text-muted-foreground text-sm italic text-center mt-10">Lista do mês vazia.</p> : (
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
