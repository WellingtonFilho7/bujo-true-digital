import { Task, TaskType } from '@/types/bujo';
import { TaskItem } from '@/components/TaskItem';
import { AddTaskForm } from '@/components/AddTaskForm';

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
  const dateStr = toISODate(currentDate);
  const tasks = getTasksForDate(dateStr);

  const handleToggleDone = (dateStr: string, taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      updateTaskStatus(dateStr, taskId, task.status === 'done' ? 'open' : 'done');
    }
  };

  const handleCancel = (dateStr: string, taskId: string) => {
    updateTaskStatus(dateStr, taskId, 'canceled');
  };

  const dateTitle = currentDate.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-lg font-bold uppercase tracking-tight capitalize mb-4">
        {dateTitle}
      </h2>

      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {tasks.length === 0 ? (
          <p className="text-muted-foreground text-sm italic">Nada anotado hoje.</p>
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
