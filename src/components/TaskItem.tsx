import { Task, TaskType, TYPE_SYMBOLS, Project } from '@/types/bujo';
import { Check, ArrowRight, X, Trash2, Calendar, Circle } from 'lucide-react';
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
  const [isExpanded, setIsExpanded] = useState(false);
  const project = task.projectId ? projects.find(p => p.id === task.projectId) : null;

  const isDone = task.status === 'done';
  const isMigrated = task.status === 'migrated';
  const isCanceled = task.status === 'canceled';

  // Renderiza o ícone de status (apenas visual agora)
  const renderBullet = () => {
    if (isDone) return <Check className="w-4 h-4 text-[#6f8b82]" strokeWidth={3} />;
    if (isMigrated) return <ArrowRight className="w-4 h-4 text-[#f2a735]" strokeWidth={3} />;
    if (isCanceled) return <X className="w-4 h-4 text-gray-400" strokeWidth={3} />;
    
    return (
      <span className="text-lg font-bold leading-none text-gray-800">
        {TYPE_SYMBOLS[task.type as TaskType]}
      </span>
    );
  };

  const textStyle = () => {
    if (isDone) return 'text-gray-400 line-through decoration-[#6f8b82]/50';
    if (isMigrated) return 'text-gray-400 italic';
    if (isCanceled) return 'text-gray-300 line-through';
    return 'text-[#1a1a1a]';
  };

  return (
    <div className="group mb-1">
      {/* LINHA DA TAREFA - O clique em qualquer lugar expande */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className={`flex items-start gap-3 py-2.5 px-2 rounded-md transition-colors cursor-pointer ${
          isExpanded ? 'bg-gray-50' : 'hover:bg-gray-50/50'
        }`}
      >
        <div className="shrink-0 w-6 h-6 flex items-center justify-center mt-0.5">
          {renderBullet()}
        </div>

        <div className="flex-1 min-w-0">
          <div className={`text-base font-normal leading-snug ${textStyle()}`}>
            {task.content}
          </div>

          {(project || showDate) && (
            <div className="flex items-center gap-2 mt-1">
              {project && (
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#6f8b82]">
                  {project.name}
                </span>
              )}
              {showDate && (
                <div className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(dateStr + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* MENU DE AÇÕES - Opções claras por escrito */}
      {isExpanded && (
        <div className="ml-11 mr-2 mb-4 mt-1 p-1 bg-white border border-gray-100 rounded-md shadow-sm flex flex-wrap items-center gap-1 animate-in fade-in slide-in-from-top-1">
          
          <button 
            onClick={(e) => { e.stopPropagation(); onToggleDone(dateStr, task.id); setIsExpanded(false); }}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-sm text-xs font-bold transition-colors ${
              isDone ? 'bg-gray-100 text-gray-500' : 'bg-[#6f8b82]/10 text-[#6f8b82] hover:bg-[#6f8b82] hover:text-white'
            }`}
          >
            <Check className="w-3.5 h-3.5" /> {isDone ? 'Desmarcar' : 'Feito'}
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); onMigrate(dateStr, task.id); setIsExpanded(false); }}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#f2a735]/10 text-[#f2a735] hover:bg-[#f2a735] hover:text-white rounded-sm text-xs font-bold transition-colors"
          >
            <ArrowRight className="w-3.5 h-3.5" /> Adiar
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); onCancel(dateStr, task.id); setIsExpanded(false); }}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-500 hover:bg-gray-200 rounded-sm text-xs font-bold transition-colors"
          >
            <X className="w-3.5 h-3.5" /> Cancelar
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); if(confirm('Excluir permanentemente?')) onDelete(dateStr, task.id); }}
            className="p-2 text-gray-300 hover:text-[#d65a38] transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
