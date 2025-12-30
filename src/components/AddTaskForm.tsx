import { useState, KeyboardEvent } from 'react';
import { TaskType, Project } from '@/types/bujo';
import { Calendar, Plus, Folder, X } from 'lucide-react';

interface AddTaskFormProps {
  dateStr: string;
  projects?: Project[];
  onAdd: (dateStr: string, content: string, type: TaskType, targetDate?: string, projectId?: string) => void;
}

export function AddTaskForm({ dateStr, onAdd, projects = [] }: AddTaskFormProps) {
  const [content, setContent] = useState('');
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [optionalDate, setOptionalDate] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!content.trim()) return;

    onAdd(dateStr, content.trim(), 'task', optionalDate || undefined, selectedProject || undefined);
    
    setContent('');
    setOptionalDate('');
    setIsExpanded(false);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-100 pb-safe z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 flex flex-col gap-3">
        
        <div className="flex gap-3">
            <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onFocus={() => setIsExpanded(true)}
                placeholder="Nova tarefa..."
                className="flex-1 bg-[#f8f9fa] text-[#2d2a26] placeholder:text-gray-300 rounded-2xl px-5 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-[#d65a38]/20 transition-all"
            />
            
            {/* BOTÃO TERRACOTA DE AÇÃO */}
            <button
                type="submit"
                disabled={!content.trim()}
                className="w-14 h-14 bg-[#d65a38] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-[#d65a38]/30 disabled:opacity-50 disabled:shadow-none active:scale-90 transition-all"
            >
                <Plus className="w-7 h-7" strokeWidth={3} />
            </button>
        </div>

        {/* OPÇÕES EXTRAS COLORIDAS */}
        {(isExpanded || content) && (
            <div className="flex gap-2 px-1 animate-in slide-in-from-bottom-2 overflow-x-auto hide-scrollbar">
                
                {/* Projeto (VERDE SÁLVIA) */}
                {projects.length > 0 && (
                    <div className="relative">
                        <select
                            value={selectedProject}
                            onChange={(e) => setSelectedProject(e.target.value)}
                            className="appearance-none bg-[#6f8b82]/10 text-[#6f8b82] font-black text-xs px-4 py-3 pr-8 rounded-xl border border-[#6f8b82]/20 focus:outline-none tracking-wide"
                        >
                            <option value="">+ PROJETO</option>
                            {projects.map(p => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>
                        <Folder className="absolute right-2.5 top-2.5 w-3.5 h-3.5 text-[#6f8b82] pointer-events-none" />
                    </div>
                )}

                {/* Data (MOSTARDA) */}
                <div className="relative">
                     <input
                        type="date"
                        value={optionalDate}
                        onChange={(e) => setOptionalDate(e.target.value)}
                        className={`bg-[#f2a735]/10 text-[#f2a735] font-black text-xs px-4 py-3 rounded-xl border border-[#f2a735]/20 focus:outline-none tracking-wide ${!optionalDate ? 'w-28 text-transparent' : ''}`}
                     />
                     {!optionalDate && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-[#f2a735] font-black text-xs gap-1.5 tracking-wide">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>AGENDAR</span>
                        </div>
                     )}
                </div>

                <button type="button" onClick={() => setIsExpanded(false)} className="ml-auto p-2 bg-gray-50 rounded-full text-gray-300 hover:text-[#d65a38]">
                    <X className="w-4 h-4" />
                </button>
            </div>
        )}
      </form>
    </div>
  );
}
