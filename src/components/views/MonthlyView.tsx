import { Task, TaskType } from '@/types/bujo';
import { TaskItem } from '@/components/TaskItem';
import { AddTaskForm } from '@/components/AddTaskForm';

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
  // Define a chave do mês (usando o dia 1 do mês como referência do "Bucket")
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const dateStr = toISODate(firstDayOfMonth);
  const tasks = getTasksForDate(dateStr);

  const handleToggleDone = (dStr: string, taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      updateTaskStatus(dStr, taskId, task.status === 'done' ? 'open' : 'done');
    }
  };

  const handleCancel = (dStr: string, taskId: string) => {
    updateTaskStatus(dStr, taskId, 'canceled');
  };

  const monthTitle = currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-lg font-bold uppercase tracking-tight capitalize mb-4">
        {monthTitle}
      </h2>

      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {tasks.length === 0 ? (
          <p className="text-muted-foreground text-sm italic">Nenhuma tarefa para este mês.</p>
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
