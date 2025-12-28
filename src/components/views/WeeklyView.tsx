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
}

// Função auxiliar para pegar o número da semana ISO
function getWeekNumber(d: Date) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return weekNo;
}

export function WeeklyView({
  currentDate, // Data de hoje (recebida do hook)
  toISODate,
  startOfWeek,
  getTasksForDate,
  addTask,
  updateTaskStatus,
  onMigrate
}: WeeklyViewProps) {
  // Estado local para navegação (inicia na data atual, mas pode mudar)
  const [viewDate, setViewDate] = useState(new Date(currentDate));

  // Define a semana baseada na data que estamos visualizando (viewDate)
  const weekStartDate = startOfWeek(viewDate);
  const weekEndDate = new Date(weekStartDate);
  weekEndDate.setDate(weekEndDate.getDate() + 6);
  
  // Chave para buscar tarefas (Bucket da semana)
  const dateStr = toISODate(weekStartDate);
  const tasks = getTasksForDate(dateStr);

  // Navegação
  const handlePrevWeek = () => {
    const newDate = new Date(viewDate);
    newDate.setDate(newDate.getDate() - 7);
    setViewDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(viewDate);
    newDate.setDate(newDate.getDate() + 7);
    setViewDate(newDate);
  };

  // Formatação do Cabeçalho "Semana XX (dd/mm - dd/mm)"
  const weekNum = getWeekNumber(weekStartDate);
  const startFmt = weekStartDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  const endFmt = weekEndDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  const weekTitle = `Semana ${weekNum} (${startFmt} - ${endFmt})`;

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
        <button onClick={handlePrevWeek} className="p-1 hover:bg-accent rounded-full">
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <h2 className="text-lg font-bold uppercase tracking-tight text-center">
          {weekTitle}
        </h2>

        <button onClick={handleNextWeek} className="p-1 hover:bg-accent rounded-full">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {tasks.length === 0 ? (
          <p className="text-muted-foreground text-sm italic text-center mt-10">
            Nenhuma tarefa para esta semana.
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
