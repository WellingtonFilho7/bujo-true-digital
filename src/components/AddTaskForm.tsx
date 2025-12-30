import { useState, KeyboardEvent } from 'react';
import { TaskType, TYPE_SYMBOLS, Project } from '@/types/bujo';
import { Calendar, Plus, Folder, FolderOpen } from 'lucide-react';

interface AddTaskFormProps {
  dateStr: string;
  projects?: Project[];
  onAdd: (dateStr: string, content: string, type: TaskType, targetDate?: string, projectId?: string) => void;
  compact?: boolean; // Mantido para compatibilidade, mas o design será fluido
}

export function AddTaskForm({ dateStr, onAdd, projects = [] }: AddTaskFormProps) {
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
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const types: TaskType[] = ['task', 'event', 'note'];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4 bg-card border border-border/60 p-3 rounded-xl shadow-sm">
      
      {/* LINHA 1: O Input de Texto (Ocupa a largura toda) */}
      <input
        type="text"
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Nova anotação..."
        className="w-full bg-transparent border-none p-1 text-base focus:outline-none placeholder:text-muted-foreground/60"
        autoComplete="off"
      />

      {/* LINHA 2: Barra de Ferramentas */}
      <div className="flex items-center justify-between">
        
        {/* Esquerda: Seletor de Tipo ( • o - ) */}
        <div className="flex gap-1 bg-muted/40 p-1 rounded-lg">
          {types.map(t => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              // Aumentei o tamanho do toque para 36px (h-9 w-9)
              className={`h-9 w-9 flex items-center justify-center text-sm font-bold rounded-md transition-all active:scale-95 ${
                type === t ? 'bg-background text-foreground shadow-sm border border-border/50' : 'text-muted-foreground'
              }`}
            >
              {TYPE_SYMBOLS[t]}
            </button>
          ))}
        </div>

        {/* Direita: Botões de Ação */}
        <div className="flex items-center gap-2">
          {/* Botão de Opções (Pasta/Data) */}
          <button
            type="button"
            onClick={() => setShowOptions(!showOptions)}
            className={`h-10 w-10 flex items-center justify-center rounded-xl transition-colors ${
               (optionalDate || selectedProject) 
                 ? 'bg-blue-100 text-blue-600' 
                 : 'bg-muted/40 text-muted-foreground'
            }`}
          >
            {(selectedProject) ? <Folder className="w-5 h-5" /> : <Calendar className="w-5 h-5" />}
          </button>

          {/* Botão ADD (Maior e com cor de destaque) */}
          <button
            type="submit"
            disabled={!content.trim()}
            className="h-10 px-5 bg-foreground text-background rounded-xl font-bold disabled:opacity-30 active:scale-95 transition-transform flex items-center justify-center"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* LINHA 3 (Condicional): Gaveta de Opções */}
      {showOptions && (
        <div className="pt-3 border-t border-border/30 animate-in slide-in-from-top-2 flex flex-col gap-3">
          
          {/* Seletor de Data */}
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground ml-1">Agendar para:</span>
            <input
              type="date"
              value={optionalDate}
              onChange={(e) => setOptionalDate(e.target.value)}
              className="w-full bg-muted/30 border border-border/50 rounded-lg p-2 text-sm"
            />
          </div>

          {/* Seletor de Projeto */}
          {projects.length > 0 && (
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground ml-1">Salvar no projeto:</span>
              <div className="relative">
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="w-full bg-muted/30 border border-border/50 rounded-lg p-2 text-sm appearance-none"
                >
                  <option value="">(Nenhum - solto no dia)</option>
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
                <FolderOpen className="absolute right-3 top-2.5 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          )}
        </div>
      )}
    </form>
  );
}
