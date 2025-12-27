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
  const start = startOfWeek(currentDate);
  const days: { date: Date; dateStr: string; label: string }[] = [];

  for (let i = 0; i < 7; i++) {
    const day = new Date(start);
    day.setDate(day.getDate() + i);
    days.push({
      date: day,
      dateStr: toISODate(day),
      label: day.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric' })
    });
  }

  const handleToggleDone = (dateStr: string, taskId: string) => {
    const tasks = getTasksForDate(dateStr);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      updateTaskStatus(dateStr, taskId, task.status === 'done' ? 'open' : 'done');
    }
  };

  const handleCancel = (dateStr: string, taskId: string) => {
    updateTaskStatus(dateStr, taskId, 'canceled');
  };

  const weekLabel = `Semana de ${start.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}`;

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-lg font-bold uppercase tracking-tight mb-4">
        {weekLabel}
      </h2>

      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
          {days.map(day => {
            const tasks = getTasksForDate(day.dateStr);
            const isToday = day.dateStr === toISODate(new Date());

            return (
              <div 
                key={day.dateStr}
                className={`border rounded p-2 ${
                  isToday ? 'border-foreground bg-secondary/50' : 'border-border'
                }`}
              >
                <h3 className="text-xs font-bold uppercase mb-2 capitalize">
                  {day.label}
                </h3>
                
                <div className="space-y-0.5 min-h-[60px]">
                  {tasks.map(task => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      dateStr={day.dateStr}
                      onToggleDone={handleToggleDone}
                      onCancel={handleCancel}
                      onMigrate={onMigrate}
                      compact
                    />
                  ))}
                </div>

                <AddTaskForm dateStr={day.dateStr} onAdd={addTask} compact />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
