import { useState } from 'react';
import { Task, TaskType } from '@/types/bujo';
import { TaskItem } from '@/components/TaskItem';
import { AddTaskForm } from '@/components/AddTaskForm';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DailyViewProps {
  currentDate: Date;
  toISODate: (date: Date) => string;
  getTasksForDate: (dateStr: string) => Task[];
  addTask: (dateStr: string, content: string, type: TaskType) => void;
  updateTaskStatus: (dateStr: string, taskId: string, status: Task['status']) => void;
  onMigrate: (dateStr: string, taskId: string) => void;
  deleteTask: (dateStr: string, taskId: string) => void; // Recebe do hook
}

export function DailyView({
  currentDate, toISODate, getTasksForDate, addTask, updateTaskStatus, onMigrate, deleteTask
}: DailyViewProps) {
  const [viewDate, setViewDate] = useState(new Date(currentDate));
  const dateStr = toISODate(viewDate);
  const tasks = getTasksForDate(dateStr);

  // Lógica Inteligente de Adição
  const handleSmartAdd = (currentListDate: string, content: string, type: TaskType, specificDate?: string) => {
    if (specificDate) {
      // Se o usuário escolheu uma data, salvamos nela!
      addTask(specificDate, content, type);
    } else {
      // Se não, salvamos no dia atual da visualização
      addTask(currentListDate, content, type);
    }
  };

  const handleToggleDone = (dStr: string, taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) updateTaskStatus(dStr, taskId, task.status === 'done' ? 'open' : 'done');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => { const d = new Date(viewDate); d.setDate(d.getDate() - 1); setViewDate(d); }} className="p-1 hover:bg-accent rounded-full"><ChevronLeft className="w-5 h-5" /></button>
        <h2 className="text-lg font-bold uppercase tracking-tight capitalize text-center leading-tight">
          {viewDate.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
        </h2>
        <button onClick={() => { const d = new Date(viewDate); d.setDate(d.getDate() + 1); setViewDate(d); }} className="p-1 hover:bg-accent rounded-full"><ChevronRight className="w-5 h-5" /></button>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {tasks.length === 0 ? <p className="text-muted-foreground text-sm italic text-center mt-10">Nada anotado.</p> : (
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
