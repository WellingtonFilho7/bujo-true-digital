import { useState } from 'react';
import { Task, TaskType } from '@/types/bujo';
import { TaskItem } from '@/components/TaskItem';
import { AddTaskForm } from '@/components/AddTaskForm';
import { cn } from '@/lib/utils';

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
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const startDay = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayStr = toISODate(new Date());

  const monthLabel = currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

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

  // Build calendar days
  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < startDay; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-lg font-bold uppercase tracking-tight capitalize mb-4">
        {monthLabel}
      </h2>

      <div className="flex-1 overflow-hidden flex flex-col lg:flex-row gap-4">
        {/* Calendar Grid */}
        <div className="lg:w-1/2">
          {/* Week headers */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {weekDays.map(d => (
              <div key={d} className="text-center text-[10px] font-bold text-muted-foreground uppercase">
                {d}
              </div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, i) => {
              if (day === null) {
                return <div key={`empty-${i}`} />;
              }

              const dateStr = toISODate(new Date(year, month, day));
              const tasks = getTasksForDate(dateStr);
              const openTasks = tasks.filter(t => t.status === 'open').length;
              const isToday = dateStr === todayStr;
              const isSelected = dateStr === selectedDate;

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(dateStr)}
                  className={cn(
                    "aspect-square flex flex-col items-center justify-center text-xs rounded transition-colors",
                    isToday && "bg-foreground text-background",
                    isSelected && !isToday && "border-2 border-foreground",
                    !isToday && !isSelected && "hover:bg-secondary"
                  )}
                >
                  <span className="font-medium">{day}</span>
                  {openTasks > 0 && (
                    <span className="text-[8px] leading-none">
                      {'•'.repeat(Math.min(openTasks, 3))}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Day Detail */}
        <div className="lg:w-1/2 border-t lg:border-t-0 lg:border-l border-border pt-4 lg:pt-0 lg:pl-4">
          {selectedDate ? (
            <>
              <h3 className="text-sm font-bold mb-2">
                Dia {new Date(selectedDate + 'T00:00:00').getUTCDate()}
              </h3>
              
              <div className="space-y-0.5 max-h-[200px] overflow-y-auto hide-scrollbar">
                {getTasksForDate(selectedDate).length === 0 ? (
                  <p className="text-muted-foreground text-xs italic">Sem tarefas.</p>
                ) : (
                  getTasksForDate(selectedDate).map(task => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      dateStr={selectedDate}
                      onToggleDone={handleToggleDone}
                      onCancel={handleCancel}
                      onMigrate={onMigrate}
                      compact
                    />
                  ))
                )}
              </div>

              <AddTaskForm dateStr={selectedDate} onAdd={addTask} compact />
            </>
          ) : (
            <p className="text-muted-foreground text-sm">
              Clique em um dia para ver detalhes.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
