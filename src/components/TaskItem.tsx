import { Task, TYPE_SYMBOLS, STATUS_SYMBOLS } from '@/types/bujo';
import { cn } from '@/lib/utils';
import { Trash2 } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  dateStr: string;
  onToggleDone: (dateStr: string, taskId: string) => void;
  onCancel: (dateStr: string, taskId: string) => void;
  onMigrate: (dateStr: string, taskId: string) => void;
  onDelete: (dateStr: string, taskId: string) => void; // Nova prop
  compact?: boolean;
}

export function TaskItem({ 
  task, dateStr, onToggleDone, onCancel, onMigrate, onDelete, compact = false 
}: TaskItemProps) {
  const symbol = task.status === 'open' ? TYPE_SYMBOLS[task.type] : STATUS_SYMBOLS[task.status];
  const isCompleted = ['done', 'canceled', 'migrated'].includes(task.status);

  return (
    <div className={cn("group flex items-start gap-2 py-1.5 task-enter", compact && "py-1")}>
      <button
        onClick={() => onToggleDone(dateStr, task.id)}
        disabled={task.status === 'canceled' || task.status === 'migrated'}
        className={cn(
          "w-5 h-5 flex items-center justify-center text-sm font-bold transition-colors shrink-0",
          isCompleted ? "text-muted-foreground" : "text-foreground hover:text-primary"
        )}
      >
        {symbol}
      </button>

      <div className={cn("flex-1 text-sm leading-snug break-words", isCompleted && "line-through text-muted-foreground")}>
        {task.content}
      </div>

      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
        {task.status === 'open' && (
          <>
            <button onClick={() => onMigrate(dateStr, task.id)} className="w-5 h-5 flex items-center justify-center hover:bg-foreground hover:text-background rounded transition-colors" title="Migrar">
              ↦
            </button>
            <button onClick={() => onCancel(dateStr, task.id)} className="w-5 h-5 flex items-center justify-center hover:bg-yellow-500 hover:text-white rounded transition-colors" title="Cancelar">
              ✖
            </button>
          </>
        )}
        {/* Botão de Deletar sempre visível */}
        <button onClick={() => onDelete(dateStr, task.id)} className="w-5 h-5 flex items-center justify-center hover:bg-red-600 hover:text-white rounded transition-colors" title="Excluir Permanentemente">
          <Trash2 className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
