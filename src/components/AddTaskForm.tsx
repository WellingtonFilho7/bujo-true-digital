import { useState, KeyboardEvent } from 'react';
import { TaskType, TYPE_SYMBOLS } from '@/types/bujo';
import { Calendar } from 'lucide-react';

interface AddTaskFormProps {
  dateStr: string;
  // Agora aceita um argumento opcional 'targetDate'
  onAdd: (dateStr: string, content: string, type: TaskType, targetDate?: string) => void;
  compact?: boolean;
}

export function AddTaskForm({ dateStr, onAdd, compact = false }: AddTaskFormProps) {
  const [content, setContent] = useState('');
  const [type, setType] = useState<TaskType>('task');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [optionalDate, setOptionalDate] = useState('');

  const handleSubmit = () => {
    if (!content.trim()) return;

    // Passamos a data escolhida (se houver) para a função onAdd
    // O componente Pai decidirá onde salvar
    onAdd(dateStr, content.trim(), type, optionalDate || undefined);
    
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
    <div className={`flex flex-col gap-2 mt-2`}>
      <div className={`flex items-center gap-2 ${compact ? 'flex-col' : ''}`}>
        <div className="flex gap-0.5 shrink-0">
          {types.map(t => (
            <button
              key={t}
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
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escrever..."
          className={`flex-1 bg-transparent border-b border-dashed border-muted-foreground/50 px-1 py-1 text-sm focus:outline-none focus:border-foreground transition-colors ${compact ? 'w-full' : ''}`}
        />

        <button
          onClick={() => setShowDatePicker(!showDatePicker)}
          className={`p-1 rounded transition-colors ${optionalDate ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground'}`}
        >
          <Calendar className="w-4 h-4" />
        </button>

        <button
          onClick={handleSubmit}
          disabled={!content.trim()}
          className="px-3 py-1 text-xs font-bold bg-foreground text-background disabled:opacity-30"
        >
          ADD
        </button>
      </div>

      {showDatePicker && (
        <div className="flex items-center gap-2 text-xs animate-in slide-in-from-top-1 pl-7">
          <span className="text-muted-foreground">Agendar para:</span>
          <input
            type="date"
            value={optionalDate}
            onChange={(e) => setOptionalDate(e.target.value)}
            className="bg-transparent border border-input rounded p-1 text-foreground"
          />
        </div>
      )}
    </div>
  );
}
