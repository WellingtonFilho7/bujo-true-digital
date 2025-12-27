import { useState, KeyboardEvent } from 'react';
import { TaskType, TYPE_SYMBOLS } from '@/types/bujo';

interface AddTaskFormProps {
  dateStr: string;
  onAdd: (dateStr: string, content: string, type: TaskType) => void;
  compact?: boolean;
}

export function AddTaskForm({ dateStr, onAdd, compact = false }: AddTaskFormProps) {
  const [content, setContent] = useState('');
  const [type, setType] = useState<TaskType>('task');

  const handleSubmit = () => {
    if (!content.trim()) return;
    onAdd(dateStr, content.trim(), type);
    setContent('');
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const types: TaskType[] = ['task', 'event', 'note'];

  return (
    <div className={`flex items-center gap-2 mt-2 ${compact ? 'flex-col' : ''}`}>
      {/* Type Selector */}
      <div className="flex gap-0.5 shrink-0">
        {types.map(t => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`w-6 h-6 text-sm font-bold rounded transition-colors ${
              type === t 
                ? 'bg-foreground text-background' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
            title={t === 'task' ? 'Tarefa' : t === 'event' ? 'Evento' : 'Nota'}
          >
            {TYPE_SYMBOLS[t]}
          </button>
        ))}
      </div>

      {/* Input */}
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Escrever..."
        className={`flex-1 bg-transparent border-b border-dashed border-muted-foreground/50 px-1 py-1 text-sm focus:outline-none focus:border-foreground transition-colors ${
          compact ? 'w-full' : ''
        }`}
      />

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!content.trim()}
        className="px-3 py-1 text-xs font-bold bg-foreground text-background disabled:opacity-30 transition-opacity"
      >
        ADD
      </button>
    </div>
  );
}
