import { useState, KeyboardEvent } from 'react';
import { TaskType, TYPE_SYMBOLS, Project } from '@/types/bujo';
import { Calendar, Plus, Folder, X } from 'lucide-react';

interface AddTaskFormProps {
  dateStr: string;
  projects?: Project[];
  onAdd: (dateStr: string, content: string, type: TaskType, targetDate?: string, projectId?: string) => void;
  disabled?: boolean;
}

export function AddTaskForm({ dateStr, onAdd, projects = [], disabled = false }: AddTaskFormProps) {
  const [content, setContent] = useState('');
  const [type, setType] = useState<TaskType>('task');
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [optionalDate, setOptionalDate] = useState('');
  const [showExtras, setShowExtras] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (disabled || !content.trim()) return;

    onAdd(dateStr, content.trim(), type, optionalDate || undefined, selectedProject || undefined);
    
    setContent('');
    setOptionalDate('');
    setShowExtras(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const types: TaskType[] = ['task', 'event', 'note'];

  return (
  <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 pb-[calc(env(safe-area-inset-bottom)+1rem)] z-40 shadow-[0_-1px_3px_rgba(0,0,0,0.05)]">
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-3 flex flex-col gap-2">
        
        {/* LINHA SUPERIOR: TIPO + TEXTO */}
        <div className="flex items-center gap-2">
           {/* Seletor de Tipo (Pequeno e sutil) */}
           <div className="flex bg-gray-100 rounded-sm p-0.5">
            {types.map(t => (
                <button
                key={t}
                type="button"
                onClick={() => !disabled && setType(t)}
                disabled={disabled}
                className={`w-10 h-10 flex items-center justify-center text-sm font-bold rounded-sm transition-colors ${
                    type === t ? 'bg-white shadow-sm text-[#1a1a1a]' : 'text-gray-400 hover:text-gray-600'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                {TYPE_SYMBOLS[t]}
                </button>
            ))}
           </div>

           <input
             type="text"
             value={content}
             onChange={(e) => setContent(e.target.value)}
             onFocus={() => setShowExtras(true)}
             onKeyDown={handleKeyDown}
             placeholder="Nova entrada..."
             className="flex-1 bg-transparent border-none text-base text-[#1a1a1a] placeholder:text-gray-400 focus:outline-none p-3 disabled:opacity-60"
             autoComplete="off"
             disabled={disabled}
           />
        </div>

        {/* LINHA INFERIOR: EXTRAS + BOTÃO ADD */}
        {/* Só mostra os controles se estiver digitando ou focado */}
        {(showExtras || content) && (
            <div className="flex items-center justify-between border-t border-gray-100 pt-2 animate-in slide-in-from-top-1">
                
                <div className="flex gap-2">
                    {/* Botão PROJETO (Quadrado, Borda fina) */}
                    {projects.length > 0 && (
                        <div className="relative">
                            <select
                                value={selectedProject}
                                onChange={(e) => setSelectedProject(e.target.value)}
                                className={`appearance-none h-11 pl-8 pr-3 text-xs font-medium border rounded-sm focus:outline-none cursor-pointer
                                    ${selectedProject ? 'bg-[#6f8b82]/10 border-[#6f8b82] text-[#6f8b82]' : 'bg-white border-gray-200 text-gray-500'}
                                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                                `}
                                disabled={disabled}
                            >
                                <option value="">Sem Projeto</option>
                                {projects.map(p => (
                                    <option key={p.id} value={p.id}>{p.name}</option>
                                ))}
                            </select>
                            <Folder className={`absolute left-2 top-2 w-4 h-4 pointer-events-none ${selectedProject ? 'text-[#6f8b82]' : 'text-gray-400'}`} />
                        </div>
                    )}

                    {/* Botão DATA (Igual ao de projeto) */}
                    <div className="relative">
                         <input
                            type="date"
                            value={optionalDate}
                            onChange={(e) => setOptionalDate(e.target.value)}
                            className={`h-11 pl-8 pr-2 text-xs font-medium border rounded-sm focus:outline-none cursor-pointer
                                ${optionalDate ? 'bg-[#f2a735]/10 border-[#f2a735] text-[#f2a735]' : 'bg-white border-gray-200 text-transparent w-10'}
                                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                            `}
                            disabled={disabled}
                         />
                         {!optionalDate && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-gray-400">
                                <Calendar className="w-4 h-4" />
                            </div>
                         )}
                         {optionalDate && <Calendar className="absolute left-2 top-2 w-4 h-4 text-[#f2a735] pointer-events-none" />}
                    </div>
                </div>

                <div className="flex gap-2">
                    {/* Botão Fechar */}
                    <button type="button" onClick={() => setShowExtras(false)} className="h-11 w-11 flex items-center justify-center text-gray-400 hover:bg-gray-100 rounded-sm">
                        <X className="w-4 h-4" />
                    </button>

                    {/* Botão ADD (Terracota, Quadrado) */}
                    <button
                        type="submit"
                        disabled={!content.trim() || disabled}
                        className="h-11 px-5 bg-[#d65a38] text-white text-sm font-bold rounded-sm shadow-sm disabled:opacity-50 hover:bg-[#c54e2e] transition-colors"
                    >
                        Adicionar
                    </button>
                </div>
            </div>
        )}
      </form>
    </div>
  );
}
