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

  // Lógica para detectar e separar a data do texto
  // Procura por algo no formato [DD/MM] no início da string
  const dateRegex = /^\[(\d{2}\/\d{2})\]\s*(.*)/;
  const match = task.content.match(dateRegex);

  let displayDate = null;
  let displayContent = task.content;

  if (match) {
    displayDate = match[1]; // A parte da data (ex: 28/12)
    displayContent = match[2]; // O resto do texto
  }

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

      {/* Content Container */}
      <div className={cn(
        "flex-1 text-sm leading-snug break-words flex flex-wrap gap-1 items-baseline",
        isCompleted && "line-through text-muted-foreground",
        compact && "text-xs"
      )}>
        {/* Se houver data, mostra como Badge */}
        {displayDate && (
          <span className="inline-block bg-muted text-muted-foreground px-1.5 py-0.5 rounded text-[10px] font-mono tracking-tighter mr-1 no-underline">
            {displayDate}
          </span>
        )}
        
        {/* Texto da tarefa */}
        <span>{displayContent}</span>
      </div>

      {/* Actions */}
      {task.status === 'open' && (
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          <button
            onClick={() => onMigrate(dateStr, task.id)}
            className="w-5 h-5 text-xs border border-border rounded flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
            title="Migrar >"
          >
            ↦
          </button>
          <button
            onClick={() => onCancel(dateStr, task.id)}
            className="w-5 h-5 text-xs border border-border rounded flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-colors"
            title="Cancelar X"
          >
            ✖
          </button>
        </div>
      )}
    </div>
  );
}
