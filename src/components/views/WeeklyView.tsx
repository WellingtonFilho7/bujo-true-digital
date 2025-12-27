import { Task, TaskType } from '@/types/bujo';
import { TaskItem } from '@/components/TaskItem';
import { AddTaskForm } from '@/components/AddTaskForm';

interface WeeklyViewProps {
  currentDate: Date;
  toISODate: (date: Date) => string;
  startOfWeek: (date: Date) => Date;
  getTasksForDate: (dateStr: string) => Task[];
  addTask: (dateStr: string, content: string, type: TaskType) => void;
  updateTaskStatus: (dateStr: string, taskId: string, status: Task['status']) => void;
  onMigrate: (dateStr: string, taskId: string) => void;
}

export function WeeklyView({
  currentDate,
  toISODate,
  startOfWeek,
  getTasksForDate,
  addTask,
  updateTaskStatus,
  onMigrate
}: WeeklyViewProps) {
  // Define a chave da semana (usando o primeiro dia da semana como referência do "Bucket")
  const weekStartDate = startOfWeek(currentDate);
  const dateStr = toISODate(weekStartDate);
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

  const weekTitle = `Semana de ${weekStartDate.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })}`;

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-lg font-bold uppercase tracking-tight capitalize mb-4">
        {weekTitle}
      </h2>

      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {tasks.length === 0 ? (
          <p className="text-muted-foreground text-sm italic">Nenhuma tarefa para esta semana.</p>
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
