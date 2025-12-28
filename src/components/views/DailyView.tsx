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
}

export function DailyView({
  currentDate,
  toISODate,
  getTasksForDate,
  addTask,
  updateTaskStatus,
  onMigrate
}: DailyViewProps) {
  const [viewDate, setViewDate] = useState(new Date(currentDate));
  
  const dateStr = toISODate(viewDate);
  const tasks = getTasksForDate(dateStr);

  const handlePrevDay = () => {
    const newDate = new Date(viewDate);
    newDate.setDate(newDate.getDate() - 1);
    setViewDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(viewDate);
    newDate.setDate(newDate.getDate() + 1);
    setViewDate(newDate);
  };

  const handleToggleDone = (dStr: string, taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) updateTaskStatus(dStr, taskId, task.status === 'done' ? 'open' : 'done');
  };

  const handleCancel = (dStr: string, taskId: string) => updateTaskStatus(dStr, taskId, 'canceled');

  // Formatação: "Segunda-feira, 27 de maio"
  const weekday = viewDate.toLocaleDateString('pt-BR', { weekday: 'long' });
  const dayMonth = viewDate.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' });
  const dateTitle = `${weekday}, ${dayMonth}`;

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <button onClick={handlePrevDay} className="p-1 hover:bg-accent rounded-full">
          <ChevronLeft className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-bold uppercase tracking-tight capitalize text-center leading-tight">
          {dateTitle}
        </h2>

        <button onClick={handleNextDay} className="p-1 hover:bg-accent rounded-full">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {tasks.length === 0 ? (
          <p className="text-muted-foreground text-sm italic text-center mt-10">Nada anotado para este dia.</p>
        ) : (
          <div className="space-y-0.5">
            {tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                dateStr={dateStr}
                onToggleDone={handleToggleDone}
                onCancel={handleCancel}
                onMigrate={onMigrate}
              />
            ))}
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-border mt-4">
        <AddTaskForm dateStr={dateStr} onAdd={addTask} />
      </div>
    </div>
  );
}
