import { Task, TYPE_SYMBOLS, STATUS_SYMBOLS } from '@/types/bujo';
import { cn } from '@/lib/utils';

interface TaskItemProps {
  task: Task;
  dateStr: string;
  onToggleDone: (dateStr: string, taskId: string) => void;
  onCancel: (dateStr: string, taskId: string) => void;
  onMigrate: (dateStr: string, taskId: string) => void;
  compact?: boolean;
}

export function TaskItem({ 
  task, 
  dateStr, 
  onToggleDone, 
  onCancel, 
  onMigrate,
  compact = false 
}: TaskItemProps) {
  const symbol = task.status === 'open' 
    ? TYPE_SYMBOLS[task.type] 
    : STATUS_SYMBOLS[task.status];
  
  const isDone = task.status === 'done';
  const isCanceled = task.status === 'canceled';
  const isMigrated = task.status === 'migrated';
  const isCompleted = isDone || isCanceled || isMigrated;

  return (
    <div 
      className={cn(
        "group flex items-start gap-2 py-1.5 task-enter",
        compact && "py-1"
      )}
    >
      {/* Symbol / Checkbox */}
      <button
        onClick={() => onToggleDone(dateStr, task.id)}
        disabled={isCanceled || isMigrated}
        className={cn(
          "w-5 h-5 flex items-center justify-center text-sm font-bold transition-colors shrink-0",
          isCompleted ? "text-muted-foreground" : "text-foreground hover:text-primary"
        )}
        title={isDone ? "Reabrir" : "Marcar como feito"}
      >
        {symbol}
      </button>

      {/* Content */}
      <span 
        className={cn(
          "flex-1 text-sm leading-snug break-words",
          isCompleted && "line-through text-muted-foreground",
          compact && "text-xs"
        )}
      >
        {task.content}
      </span>

      {/* Actions */}
      {task.status === 'open' && (
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          <button
            onClick={() => onMigrate(dateStr, task.id)}
            className="w-5 h-5 text-xs border border-border rounded flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
            title="Migrar"
          >
            ↦
          </button>
          <button
            onClick={() => onCancel(dateStr, task.id)}
            className="w-5 h-5 text-xs border border-border rounded flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-colors"
            title="Cancelar"
          >
            ✖
          </button>
        </div>
      )}
    </div>
  );
}
