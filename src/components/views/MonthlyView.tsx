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
}

export function MonthlyView({
  currentDate,
  toISODate,
  getTasksForDate,
  addTask,
  updateTaskStatus,
  onMigrate
}: MonthlyViewProps) {
  // Estado local para navegação
  const [viewDate, setViewDate] = useState(new Date(currentDate));

  // Define a chave do mês (dia 1 do mês visualizado)
  const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
  const dateStr = toISODate(firstDayOfMonth);
  const tasks = getTasksForDate(dateStr);

  // Navegação
  const handlePrevMonth = () => {
    const newDate = new Date(viewDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setViewDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(viewDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setViewDate(newDate);
  };

  // Formatação manual para garantir "de" minúsculo
  const monthName = viewDate.toLocaleDateString('pt-BR', { month: 'long' });
  const year = viewDate.getFullYear();
  // Capitaliza apenas a primeira letra do mês
  const monthTitle = `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} de ${year}`;

  // Handlers
  const handleToggleDone = (dStr: string, taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) updateTaskStatus(dStr, taskId, task.status === 'done' ? 'open' : 'done');
  };

  const handleCancel = (dStr: string, taskId: string) => updateTaskStatus(dStr, taskId, 'canceled');

  return (
    <div className="h-full flex flex-col">
      {/* Header com Navegação */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={handlePrevMonth} className="p-1 hover:bg-accent rounded-full">
          <ChevronLeft className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-bold uppercase tracking-tight text-center">
          {monthTitle}
        </h2>

        <button onClick={handleNextMonth} className="p-1 hover:bg-accent rounded-full">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {tasks.length === 0 ? (
          <p className="text-muted-foreground text-sm italic text-center mt-10">
            Nenhuma tarefa para este mês.
          </p>
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
