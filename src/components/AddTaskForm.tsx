import { useState, KeyboardEvent } from 'react';
import { TaskType, TYPE_SYMBOLS, Project } from '@/types/bujo';
import { Calendar, Plus, Folder } from 'lucide-react';

interface AddTaskFormProps {
  dateStr: string;
  projects?: Project[]; // Novo prop opcional
  onAdd: (dateStr: string, content: string, type: TaskType, targetDate?: string, projectId?: string) => void;
  compact?: boolean;
}

export function AddTaskForm({ dateStr, onAdd, projects = [], compact = false }: AddTaskFormProps) {
  const [content, setContent] = useState('');
  const [type, setType] = useState<TaskType>('task');
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [showOptions, setShowOptions] = useState(false);
  const [optionalDate, setOptionalDate] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!content.trim()) return;

    onAdd(dateStr, content.trim(), type, optionalDate || undefined, selectedProject || undefined);
    
    setContent('');
    setOptionalDate('');
    setShowOptions(false);
    // Não limpamos o projeto para facilitar inserção em massa no mesmo projeto, 
    // mas se preferir limpar, descomente a linha abaixo:
    // setSelectedProject(''); 
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const types: TaskType[] = ['task', 'event', 'note'];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4 bg-background/50 p-3 rounded-xl border border-border/40 shadow-sm">
      <div className={`flex items-center gap-3 ${compact ? 'flex-col items-stretch' : ''}`}>
        
        {/* Seletor de Tipo */}
        <div className="flex gap-1 shrink-0 bg-muted/30 p-1 rounded-lg">
          {types.map(t => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`w-8 h-8 flex items-center justify-center text-sm font-bold rounded-md transition-all ${
                type === t ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              {TYPE_SYMBOLS[t]}
            </button>
          ))}
        </div>

        {/* Input Principal */}
        <input
          type="text"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="O que vamos fazer?"
          className="flex-1 bg-transparent border-none px-2 py-2 text-base focus:outline-none placeholder:text-muted-foreground/50"
          autoComplete="off"
        />

        {/* Botões de Ação */}
        <div className="flex items-center gap-1">
           {/* Botão de Opções Extras (Data e Projeto) */}
          <button
            type="button"
            onClick={() => setShowOptions(!showOptions)}
            className={`p-2 rounded-lg transition-colors ${
               (optionalDate || selectedProject) ? 'bg-accent/50 text-accent-foreground' : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            {(optionalDate || selectedProject) ? <Plus className="w-5 h-5" /> : <Calendar className="w-5 h-5" />}
          </button>

          <button
            type="submit"
            disabled={!content.trim()}
            className="p-2 bg-primary text-primary-foreground rounded-lg disabled:opacity-30 hover:opacity-90 transition-opacity"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Área de Opções Expansível */}
      {showOptions && (
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border/30 animate-in slide-in-from-top-2">
          
          {/* Seletor de Data */}
          <div className="flex items-center gap-2 bg-muted/30 px-2 py-1 rounded-md">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <input
              type="date"
              value={optionalDate}
              onChange={(e) => setOptionalDate(e.target.value)}
              className="bg-transparent border-none text-sm text-foreground focus:ring-0 p-0"
            />
          </div>

          {/* Seletor de Projeto */}
          {projects.length > 0 && (
            <div className="flex items-center gap-2 bg-muted/30 px-2 py-1 rounded-md">
              <Folder className="w-4 h-4 text-muted-foreground" />
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="bg-transparent border-none text-sm text-foreground focus:ring-0 p-0 pr-2 cursor-pointer"
              >
                <option value="">Sem projeto</option>
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}
    </form>
  );
}
