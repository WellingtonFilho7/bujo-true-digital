import { Task, Project } from '@/types/bujo';
import { Check, Trash2, Folder, X, ArrowRight, RotateCcw } from 'lucide-react';
import { useState } from 'react';

interface TaskItemProps {
  task: Task;
  dateStr: string;
  onToggleDone: (dateStr: string, taskId: string) => void;
  onCancel: (dateStr: string, taskId: string) => void;
  onMigrate: (dateStr: string, taskId: string) => void;
  onDelete: (dateStr: string, taskId: string) => void;
  showDate?: boolean;
  projects?: Project[];
}

// Função para gerar uma cor baseada no ID do projeto usando SUA paleta
const getProjectColorClass = (id?: string | null) => {
  if (!id) return 'bg-[#6f8b82]'; // Padrão Sálvia
  
  // Variações das suas cores
  const colors = [
    'bg-[#d65a38]', // Terracota
    'bg-[#f2a735]', // Mostarda
    'bg-[#6f8b82]', // Sálvia
    'bg-[#4a6d7c]', // Azul Petróleo (complementar)
  ];
  const index = id.charCodeAt(0) % colors.length;
  return colors[index];
};

export function TaskItem({
  task,
  dateStr,
  onToggleDone,
  onCancel,
  onMigrate,
  onDelete,
  showDate = false,
  projects = []
}: TaskItemProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const project = task.projectId ? projects.find(p => p.id === task.projectId) : null;
  
  const isDone = task.status === 'done';
  const isMigrated = task.status === 'migrated';

  // Define a cor de fundo do card
  const cardBg = isDone 
    ? (project ? getProjectColorClass(project.id) : 'bg-[#6f8b82]') // Feito: Cor Cheia
    : 'bg-[#f8f9fa] border border-[#f1f5f9]'; // Aberto: Cinza Claro

  return (
    <div className="relative mb-3 group px-1">
        {/* CARD PRINCIPAL */}
        <div 
            onClick={() => onToggleDone(dateStr, task.id)}
            className={`
                relative flex items-center justify-between p-4 rounded-2xl cursor-pointer shadow-sm
                ${cardBg}
                ${isMigrated ? 'opacity-50 grayscale' : ''}
                transition-all duration-300 active:scale-[0.98]
            `}
        >
            <div className="flex flex-col gap-1 overflow-hidden">
                <span className={`text-lg font-bold leading-tight ${isDone ? 'text-white' : 'text-[#2d2a26]'}`}>
                    {task.content}
                </span>

                {/* Metadados */}
                {(project || showDate) && (
                    <div className="flex gap-2 items-center mt-1">
                        {project && (
                            <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full ${isDone ? 'bg-white/20' : 'bg-[#6f8b82]/10'}`}>
                                <Folder className={`w-3 h-3 ${isDone ? 'text-white' : 'text-[#6f8b82]'}`} />
                                <span className={`text-[10px] font-black uppercase tracking-widest ${isDone ? 'text-white' : 'text-[#6f8b82]'}`}>
                                    {project.name}
                                </span>
                            </div>
                        )}
                        {showDate && (
                            <span className={`text-[11px] font-medium ${isDone ? 'text-white/80' : 'text-gray-400'}`}>
                                {new Date(dateStr + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Checkbox Visual */}
            <div className="shrink-0 pl-3">
                {isDone ? (
                    <div className="bg-white/20 p-1.5 rounded-full backdrop-blur-md animate-in zoom-in spin-in-180">
                        <Check className="w-5 h-5 text-white" strokeWidth={4} />
                    </div>
                ) : (
                    <div className="w-6 h-6 border-2 border-gray-200 rounded-full bg-white shadow-inner" />
                )}
            </div>
        </div>
        
        {/* Menu "..." Flutuante */}
        <button 
            onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }}
            className="absolute -right-1 -top-2 w-8 h-8 bg-white shadow-md border border-gray-100 rounded-full flex items-center justify-center text-gray-300 hover:text-[#d65a38] z-10 opacity-0 group-hover:opacity-100 transition-opacity"
        >
            <span className="text-lg font-bold mb-2">...</span>
        </button>

        {/* Menu Aberto */}
        {isMenuOpen && (
             <div className="absolute right-0 -bottom-12 z-20 flex items-center gap-2 bg-white border border-gray-100 p-2 rounded-xl shadow-xl animate-in fade-in zoom-in-95">
                <button onClick={() => onMigrate(dateStr, task.id)} className="p-2 bg-[#f2a735]/10 text-[#f2a735] rounded-lg"><ArrowRight className="w-4 h-4" /></button>
                <button onClick={() => onCancel(dateStr, task.id)} className="p-2 bg-[#f2a735]/10 text-[#f2a735] rounded-lg"><RotateCcw className="w-4 h-4" /></button>
                <button onClick={() => onDelete(dateStr, task.id)} className="p-2 bg-[#d65a38]/10 text-[#d65a38] rounded-lg"><Trash2 className="w-4 h-4" /></button>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 text-gray-400"><X className="w-4 h-4" /></button>
            </div>
        )}
    </div>
  );
}
