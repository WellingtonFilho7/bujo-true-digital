import { Task, TaskType, TYPE_SYMBOLS, Project } from '@/types/bujo';
import { Check, ArrowRight, X, Trash2, Calendar } from 'lucide-react';
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

  // Lógica de Ícones e Cores
  const isDone = task.status === 'done';
  const isMigrated = task.status === 'migrated';
  const isCanceled = task.status === 'canceled';

  // Renderiza o ícone esquerdo (A "Bolinha" que vira coisas)
  const renderBullet = () => {
    if (isDone) return <Check className="w-5 h-5 text-[#6f8b82]" strokeWidth={2.5} />; // Sálvia
    if (isMigrated) return <ArrowRight className="w-5 h-5 text-[#f2a735]" strokeWidth={2.5} />; // Mostarda
    if (isCanceled) return <X className="w-5 h-5 text-gray-400" strokeWidth={2.5} />;
    
    // Estado normal (Aberto) - Usa o símbolo do tipo (•, o, -)
    return (
      <span className="text-xl font-bold leading-none text-gray-800 hover:text-[#d65a38] transition-colors">
        {TYPE_SYMBOLS[task.type as TaskType]}
      </span>
    );
  };

  // Estilo do Texto
  const textStyle = () => {
    if (isDone) return 'text-gray-400 line-through decoration-[#6f8b82]'; // Risco Sálvia
    if (isMigrated) return 'text-gray-300';
    if (isCanceled) return 'text-gray-300 line-through';
    return 'text-[#1a1a1a]';
  };

  return (
    <div className="group mb-1">
      {/* LINHA DA TAREFA */}
      <div className="flex items-start gap-3 py-2 px-2 hover:bg-gray-50 rounded-md transition-colors">
        
        {/* 1. O BULLET (Clicável para completar) */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleDone(dateStr, task.id); }}
          className="shrink-0 w-6 h-6 flex items-center justify-center mt-0.5 rounded hover:bg-gray-100 transition-colors"
        >
          {renderBullet()}
        </button>

        {/* 2. O CONTEÚDO (Clicável para expandir opções) */}
        <div 
          className="flex-1 min-w-0 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className={`text-base font-normal leading-snug font-inter ${textStyle()}`}>
            {task.content}
          </div>

          {/* Metadados (Projeto e Data) - Pequenos e elegantes */}
          {(project || showDate) && (
            <div className="flex items-center gap-2 mt-1">
              {project && (
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#6f8b82] border border-[#6f8b82]/30 px-1 rounded-sm">
                  {project.name}
                </span>
              )}
              {showDate && (
                <div className="flex items-center gap-1 text-[10px] text-[#f2a735] font-medium">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(dateStr + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 3. MENU DE AÇÕES (Expandido embaixo, estilo Notion Properties) */}
      {isExpanded && (
        <div className="ml-11 mr-2 mb-4 p-2 bg-gray-50 border border-gray-100 rounded-md flex items-center justify-between gap-2 animate-in slide-in-from-top-1">
          <div className="flex gap-2">
            <button 
                onClick={() => { onMigrate(dateStr, task.id); setIsExpanded(false); }}
                className="flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 shadow-sm rounded-sm text-xs font-medium text-[#1a1a1a] hover:text-[#f2a735] hover:border-[#f2a735]"
            >
                <ArrowRight className="w-3 h-3" /> Adiar
            </button>
            
            <button 
                onClick={() => { onCancel(dateStr, task.id); setIsExpanded(false); }}
                className="flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 shadow-sm rounded-sm text-xs font-medium text-[#1a1a1a] hover:text-gray-500"
            >
                <X className="w-3 h-3" /> Cancelar
            </button>
          </div>

          <button 
            onClick={() => { onDelete(dateStr, task.id); }}
            className="p-1.5 text-gray-400 hover:text-[#d65a38] hover:bg-[#d65a38]/10 rounded-sm transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
