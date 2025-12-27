import { useState, KeyboardEvent } from 'react';
import { TaskType, TYPE_SYMBOLS } from '@/types/bujo';
import { Calendar } from 'lucide-react'; // Certifique-se que lucide-react está instalado

interface AddTaskFormProps {
  dateStr: string;
  onAdd: (dateStr: string, content: string, type: TaskType) => void;
  compact?: boolean;
}

export function AddTaskForm({ dateStr, onAdd, compact = false }: AddTaskFormProps) {
  const [content, setContent] = useState('');
  const [type, setType] = useState<TaskType>('task');
  
  // Novos estados para a data opcional
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [optionalDate, setOptionalDate] = useState('');

  const handleSubmit = () => {
    if (!content.trim()) return;

    let finalContent = content.trim();

    // Se houver data selecionada, formata e coloca no início do texto
    if (optionalDate) {
      // Pega YYYY-MM-DD e extrai dia e mês sem problemas de fuso horário
      const [_, month, day] = optionalDate.split('-');
      const dateTag = `[${day}/${month}]`;
      finalContent = `${dateTag} ${finalContent}`;
    }

    onAdd(dateStr, finalContent, type);
    
    // Limpa os campos
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

        {/* Input Text */}
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

        {/* Date Toggle Button */}
        <button
          onClick={() => setShowDatePicker(!showDatePicker)}
          className={`p-1 rounded transition-colors ${
            optionalDate ? 'text-foreground font-bold' : 'text-muted-foreground hover:text-foreground'
          }`}
          title="Agendar data"
        >
          <Calendar className="w-4 h-4" />
        </button>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!content.trim()}
          className="px-3 py-1 text-xs font-bold bg-foreground text-background disabled:opacity-30 transition-opacity"
        >
          ADD
        </button>
      </div>

      {/* Date Picker (Aparece condicionalmente) */}
      {showDatePicker && (
        <div className="flex items-center gap-2 text-xs animate-in slide-in-from-top-1 pl-7">
          <span className="text-muted-foreground">Data visual:</span>
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
