import { useState, useMemo } from 'react';
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

  // --- NOVA LÓGICA DE INTEGRAÇÃO ---
  // Gera os 7 dias da semana e busca as tarefas de cada um
  const allWeekTasks = useMemo(() => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(weekStartDate);
      d.setDate(d.getDate() + i);
      const dStr = toISODate(d);
      const tasksForDay = getTasksForDate(dStr).map(t => ({ ...t, originalDate: dStr }));
      days.push(...tasksForDay);
    }
    return days;
  }, [weekStartDate, toISODate, getTasksForDate]);
  // ---------------------------------

  const handleSmartAdd = (currentListDate: string, content: string, type: TaskType, specificDate?: string) => {
    if (specificDate) {
      addTask(specificDate, content, type);
    } else {
      // Se não especificar data, salva na segunda-feira da semana (como master list da semana)
      addTask(currentListDate, content, type);
    }
  };

  const handleToggleDone = (dStr: string, taskId: string) => {
    const task = allWeekTasks.find(t => t.id === taskId);
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
        {allWeekTasks.length === 0 ? <p className="text-muted-foreground text-sm italic text-center mt-10">Semana livre.</p> : (
          <div className="space-y-0.5">
            {allWeekTasks.map(task => (
              <TaskItem 
                key={`${task.originalDate}-${task.id}`} // Chave única combinando data e ID
                task={task} 
                dateStr={task.originalDate} // Passa a data real da tarefa
                onToggleDone={handleToggleDone} 
                onCancel={(d, id) => updateTaskStatus(d, id, 'canceled')} 
                onMigrate={onMigrate} 
                onDelete={deleteTask}
                showDate={true} // Mostra a data visualmente
              />
            ))}
          </div>
        )}
      </div>
      <div className="pt-4 border-t border-border mt-4">
        <AddTaskForm dateStr={toISODate(weekStartDate)} onAdd={handleSmartAdd} />
      </div>
    </div>
  );
}
