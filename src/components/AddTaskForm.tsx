import { useState, KeyboardEvent } from 'react';
import { TaskType, TYPE_SYMBOLS, Project } from '@/types/bujo';
import { Calendar, Plus, Folder, X } from 'lucide-react';

interface AddTaskFormProps {
  dateStr: string;
  projects?: Project[];
  onAdd: (dateStr: string, content: string, type: TaskType, targetDate?: string, projectId?: string) => void;
}

export function AddTaskForm({ dateStr, onAdd, projects = [] }: AddTaskFormProps) {
  const [content, setContent] = useState('');
  const [type, setType] = useState<TaskType>('task');
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [optionalDate, setOptionalDate] = useState('');
  
  // Controles de visibilidade dos menus
  const [showProjectMenu, setShowProjectMenu] = useState(false);
  const [showDateMenu, setShowDateMenu] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!content.trim()) return;

    onAdd(dateStr, content.trim(), type, optionalDate || undefined, selectedProject || undefined);
    
    setContent('');
    setOptionalDate('');
    setShowDateMenu(false);
    setShowProjectMenu(false);
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
      
      {/* LINHA 1: Input de Texto */}
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Nova anotação..."
        className="w-full bg-transparent border-none p-1 text-base focus:outline-none placeholder:text-muted-foreground/60"
        autoComplete="off"
      />

      {/* LINHA 2: Barra de Ferramentas */}
      <div className="flex items-center justify-between">
        
        {/* Tipos */}
        <div className="flex gap-1 bg-muted/40 p-1 rounded-lg">
          {types.map(t => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`h-9 w-9 flex items-center justify-center text-sm font-bold rounded-md transition-all active:scale-95 ${
                type === t ? 'bg-background text-foreground shadow-sm border border-border/50' : 'text-muted-foreground'
              }`}
            >
              {TYPE_SYMBOLS[t]}
            </button>
          ))}
        </div>

        {/* Ações (Data e Projeto separados) */}
        <div className="flex items-center gap-2">
          
          {/* Botão PROJETO */}
          {projects.length > 0 && (
            <button
              type="button"
              onClick={() => { setShowProjectMenu(!showProjectMenu); setShowDateMenu(false); }}
              className={`h-10 w-10 flex items-center justify-center rounded-xl transition-colors ${
                selectedProject ? 'bg-blue-100 text-blue-600 border border-blue-200' : 'bg-muted/40 text-muted-foreground'
              }`}
            >
              <Folder className="w-5 h-5" />
            </button>
          )}

          {/* Botão DATA */}
          <button
            type="button"
            onClick={() => { setShowDateMenu(!showDateMenu); setShowProjectMenu(false); }}
            className={`h-10 w-10 flex items-center justify-center rounded-xl transition-colors ${
              optionalDate ? 'bg-orange-100 text-orange-600 border border-orange-200' : 'bg-muted/40 text-muted-foreground'
            }`}
          >
            <Calendar className="w-5 h-5" />
          </button>

          {/* Botão ADD */}
          <button
            type="submit"
            disabled={!content.trim()}
            className="h-10 px-5 bg-foreground text-background rounded-xl font-bold disabled:opacity-30 active:scale-95 transition-transform flex items-center justify-center"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* GAVETA DE PROJETO */}
      {showProjectMenu && (
        <div className="pt-2 border-t border-border/30 animate-in slide-in-from-top-2">
           <span className="text-xs text-muted-foreground ml-1 mb-1 block">Escolha o projeto:</span>
           <div className="flex flex-wrap gap-2">
             <button
                type="button"
                onClick={() => setSelectedProject('')}
                className={`px-3 py-2 text-xs rounded-lg border ${!selectedProject ? 'bg-blue-50 border-blue-200 text-blue-700' : 'border-border text-muted-foreground'}`}
             >
                Nenhum
             </button>
             {projects.map(p => (
               <button
                 key={p.id}
                 type="button"
                 onClick={() => setSelectedProject(p.id)}
                 className={`px-3 py-2 text-xs rounded-lg border transition-colors ${
                   selectedProject === p.id 
                     ? 'bg-blue-600 text-white border-blue-600' 
                     : 'bg-transparent border-border hover:bg-muted'
                 }`}
               >
                 {p.name}
               </button>
             ))}
           </div>
        </div>
      )}

      {/* GAVETA DE DATA */}
      {showDateMenu && (
        <div className="pt-2 border-t border-border/30 animate-in slide-in-from-top-2">
           <span className="text-xs text-muted-foreground ml-1 mb-1 block">Agendar para:</span>
           <div className="flex gap-2 items-center">
             <input
                type="date"
                value={optionalDate}
                onChange={(e) => setOptionalDate(e.target.value)}
                className="flex-1 bg-muted/30 border border-border/50 rounded-lg p-2 text-sm"
              />
              {optionalDate && (
                <button 
                  type="button" 
                  onClick={() => setOptionalDate('')}
                  className="p-2 text-muted-foreground hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
           </div>
        </div>
      )}
    </form>
  );
}
