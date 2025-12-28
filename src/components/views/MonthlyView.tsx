import { useState, useMemo } from 'react';
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
  
  // --- NOVA LÓGICA DE INTEGRAÇÃO ---
  const allMonthTasks = useMemo(() => {
    const tasks = [];
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Pega último dia do mês

    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(year, month, day);
      const dStr = toISODate(d);
      const tasksForDay = getTasksForDate(dStr).map(t => ({ ...t, originalDate: dStr }));
      tasks.push(...tasksForDay);
    }
    return tasks;
  }, [viewDate, toISODate, getTasksForDate]);
  // ---------------------------------

  const handleSmartAdd = (currentListDate: string, content: string, type: TaskType, specificDate?: string) => {
    if (specificDate) {
      addTask(specificDate, content, type);
    } else {
      // Se não der data, salva no dia 1 do mês (Master List Mensal)
      addTask(currentListDate, content, type);
    }
  };

  const handleToggleDone = (dStr: string, taskId: string) => {
    const task = allMonthTasks.find(t => t.id === taskId);
    if (task) updateTaskStatus(dStr, taskId, task.status === 'done' ? 'open' : 'done');
  };

  const monthName = viewDate.toLocaleDateString('pt-BR', { month: 'long' });
  const monthTitle = `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} de ${viewDate.getFullYear()}`;
  const firstDayStr = toISODate(new Date(viewDate.getFullYear(), viewDate.getMonth(), 1));

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => { const d = new Date(viewDate); d.setMonth(d.getMonth() - 1); setViewDate(d); }} className="p-1 hover:bg-accent rounded-full"><ChevronLeft className="w-5 h-5" /></button>
        <h2 className="text-lg font-bold uppercase tracking-tight text-center">{monthTitle}</h2>
        <button onClick={() => { const d = new Date(viewDate); d.setMonth(d.getMonth() + 1); setViewDate(d); }} className="p-1 hover:bg-accent rounded-full"><ChevronRight className="w-5 h-5" /></button>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {allMonthTasks.length === 0 ? <p className="text-muted-foreground text-sm italic text-center mt-10">Mês livre.</p> : (
          <div className="space-y-0.5">
            {allMonthTasks.map(task => (
              <TaskItem 
                key={`${task.originalDate}-${task.id}`} 
                task={task} 
                dateStr={task.originalDate} 
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
        <AddTaskForm dateStr={firstDayStr} onAdd={handleSmartAdd} />
      </div>
    </div>
  );
}
