import { Task, TaskType, TYPE_SYMBOLS, Project } from '@/types/bujo';
import { Check, ArrowRight, X, Trash2, Calendar, Info } from 'lucide-react';
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

export function TaskItem({ task, dateStr, onToggleDone, onCancel, onMigrate, onDelete, showDate = false, projects = [] }: TaskItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const project = task.projectId ? projects.find(p => p.id === task.projectId) : null;

  const isDone = task.status === 'done';
  const isMigrated = task.status === 'migrated';
  const isCanceled = task.status === 'canceled';

  const renderBullet = () => {
    if (task.type === 'task') {
      if (isDone) return <Check className="w-4 h-4 text-[#6f8b82]" strokeWidth={3} />;
      if (isMigrated) return <ArrowRight className="w-4 h-4 text-[#f2a735]" strokeWidth={3} />;
      if (isCanceled) return <X className="w-4 h-4 text-gray-400" strokeWidth={3} />;
      return <span className="text-2xl leading-none text-gray-800">•</span>;
    }
    return <span className="text-lg font-bold leading-none text-gray-800">{TYPE_SYMBOLS[task.type as TaskType]}</span>;
  };

  const textStyle = () => {
    let base = "text-base leading-snug ";
    
    // Diferenciação por tipo (Metodologia BuJo)
    if (task.type === 'event') base += "font-bold "; // Eventos em Negrito
    if (task.type === 'note') base += "italic text-gray-600 "; // Notas em Itálico
    
    // Estados da Task
    if (isDone) base += "text-gray-400 line-through decoration-[#6f8b82]/50 ";
    if (isMigrated) base += "text-gray-400 ";
    if (isCanceled) base += "text-gray-300 line-through ";
    
    return base;
  };

  return (
    <div className="group mb-1">
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className={`flex items-start gap-3 py-2.5 px-2 rounded-md transition-colors cursor-pointer ${isExpanded ? 'bg-gray-50' : 'hover:bg-gray-50/50'}`}
      >
        <div className="shrink-0 w-6 h-6 flex items-center justify-center mt-0.5">
          {renderBullet()}
        </div>

        <div className="flex-1 min-w-0">
          <div className={textStyle()}>{task.content}</div>
          {project && (
            <span className="text-[10px] uppercase tracking-wider font-bold text-[#6f8b82] mt-1 block">
              {project.name}
            </span>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="ml-11 mr-2 mb-4 mt-1 p-1 bg-white border border-gray-100 rounded-md shadow-sm flex flex-wrap items-center gap-1 animate-in fade-in slide-in-from-top-1">
          
          {/* SÓ MOSTRA ESTADOS SE FOR TASK */}
          {task.type === 'task' ? (
            <>
              <button 
                onClick={(e) => { e.stopPropagation(); onToggleDone(dateStr, task.id); setIsExpanded(false); }}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-sm text-xs font-bold ${isDone ? 'bg-gray-100 text-gray-500' : 'bg-[#6f8b82]/10 text-[#6f8b82]'}`}
              >
                <Check className="w-3.5 h-3.5" /> {isDone ? 'Desmarcar' : 'Feito'}
              </button>

              <button 
                onClick={(e) => { e.stopPropagation(); onMigrate(dateStr, task.id); setIsExpanded(false); }}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#f2a735]/10 text-[#f2a735] rounded-sm text-xs font-bold"
              >
                <ArrowRight className="w-3.5 h-3.5" /> Adiar
              </button>

              <button 
                onClick={(e) => { e.stopPropagation(); onCancel(dateStr, task.id); setIsExpanded(false); }}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-500 rounded-sm text-xs font-bold"
              >
                <X className="w-3.5 h-3.5" /> Cancelar
              </button>
            </>
          ) : (
            <div className="flex-1 px-3 py-2 text-xs text-gray-400 font-medium">
              {task.type === 'event' ? 'Evento' : 'Nota'} (sem ações de estado)
            </div>
          )}

          <button 
            onClick={(e) => { e.stopPropagation(); if(confirm('Excluir permanentemente?')) onDelete(dateStr, task.id); }}
            className="p-2 text-gray-300 hover:text-[#d65a38]"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
