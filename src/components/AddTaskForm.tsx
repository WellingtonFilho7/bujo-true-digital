import { useState, KeyboardEvent } from 'react';
import { TaskType, TYPE_SYMBOLS } from '@/types/bujo';
import { Calendar, Plus } from 'lucide-react';

interface AddTaskFormProps {
  dateStr: string;
  onAdd: (dateStr: string, content: string, type: TaskType, targetDate?: string) => void;
  compact?: boolean;
}

export function AddTaskForm({ dateStr, onAdd, compact = false }: AddTaskFormProps) {
  const [content, setContent] = useState('');
  const [type, setType] = useState<TaskType>('task');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [optionalDate, setOptionalDate] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault(); // Previne recarregar a página
    if (!content.trim()) return;

    // Envia a tarefa para o Supabase através do hook useBujo
    onAdd(dateStr, content.trim(), type, optionalDate || undefined);
    
    // Limpa o formulário após salvar
    setContent('');
    setOptionalDate('');
    setShowDatePicker(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const types: TaskType[] = ['task', 'event', 'note'];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-2">
      <div className={`flex items-center gap-2 ${compact ? 'flex-col' : ''}`}>
        <div className="flex gap-0.5 shrink-0">
          {types.map(t => (
            <button
              key={t}
              type="button" // Evita que este botão submeta o form
              onClick={() => setType(t)}
              className={`w-6 h-6 text-sm font-bold rounded transition-colors ${
                type === t ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {TYPE_SYMBOLS[t]}
            </button>
          ))}
        </div>

        <input
          type="text"
          id="task-content-input"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escrever..."
          className={`flex-1 bg-transparent border-b border-dashed border-muted-foreground/50 px-1 py-1 text-sm focus:outline-none focus:border-foreground transition-colors ${compact ? 'w-full' : ''}`}
        />

        <button
          type="button"
          onClick={() => setShowDatePicker(!showDatePicker)}
          className={`p-1 rounded transition-colors ${optionalDate ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground'}`}
        >
          <Calendar className="w-4 h-4" />
        </button>

        <button
          type="submit"
          disabled={!content.trim()}
          className="px-3 py-1 text-xs font-bold bg-foreground text-background disabled:opacity-30 flex items-center gap-1"
        >
          <Plus className="w-3 h-3" /> ADD
        </button>
      </div>

      {showDatePicker && (
        <div className="flex items-center gap-2 text-xs animate-in slide-in-from-top-1 pl-7">
          <span className="text-muted-foreground">Agendar para:</span>
          <input
            type="date"
            name="optionalDate"
            value={optionalDate}
            onChange={(e) => setOptionalDate(e.target.value)}
            className="bg-transparent border border-input rounded p-1 text-foreground"
          />
        </div>
      )}
    </form>
  );
}
