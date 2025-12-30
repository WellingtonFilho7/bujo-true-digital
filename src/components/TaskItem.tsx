import { Task, TaskType, TYPE_SYMBOLS, Project } from '@/types/bujo';
import { X, Check, ArrowRight, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface TaskItemProps {
  task: Task;
  dateStr: string;
  onToggleDone: (dateStr: string, taskId: string) => void;
  onCancel: (dateStr: string, taskId: string) => void;
  onMigrate: (dateStr: string, taskId: string) => void;
  onDelete: (dateStr: string, taskId: string) => void;
  showDate?: boolean;
  projects?: Project[]; // Novo prop: lista de projetos para buscar o nome
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Busca o nome do projeto pelo ID
  const project = task.projectId ? projects.find(p => p.id === task.projectId) : null;

  const getStatusStyles = () => {
    if (task.status === 'done') return 'text-muted-foreground line-through decoration-1 opacity-60';
    if (task.status === 'canceled') return 'text-muted-foreground line-through decoration-red-400 decoration-2 opacity-60';
    if (task.status === 'migrated') return 'text-muted-foreground opacity-50';
    return 'text-foreground';
  };

  return (
    <div className="group relative flex items-start gap-3 py-2 px-3 hover:bg-accent/20 rounded-lg transition-colors">
      
      {/* Símbolo Clicável (Bullet) */}
      <button
        onClick={() => onToggleDone(dateStr, task.id)}
        className="mt-0.5 shrink-0 w-6 h-6 flex items-center justify-center text-sm font-bold text-muted-foreground hover:text-primary transition-colors"
      >
        {task.status === 'migrated' ? '>' : TYPE_SYMBOLS[task.type as TaskType]}
      </button>

      {/* Conteúdo */}
      <div 
        className="flex-1 min-w-0 cursor-pointer" 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div className={`text-sm leading-snug break-words ${getStatusStyles()}`}>
          {task.content}
        </div>
        
        {/* Metadados (Data e Projeto) */}
        <div className="flex gap-2 mt-1">
          {showDate && (
            <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground font-medium">
              {new Date(dateStr + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
            </span>
          )}
          
          {/* ETIQUETA DO PROJETO - CORREÇÃO VISUAL */}
          {project && (
            <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">
              {project.name}
            </span>
          )}
        </div>
      </div>

      {/* Menu de Ações (Aparece ao clicar no texto) */}
      {isMenuOpen && (
        <div className="absolute right-2 top-8 z-10 flex items-center gap-1 p-1 bg-popover border border-border rounded-lg shadow-lg animate-in fade-in zoom-in-95">
          <button onClick={() => onToggleDone(dateStr, task.id)} className="p-2 hover:bg-accent rounded text-green-600"><Check className="w-4 h-4" /></button>
          <button onClick={() => onMigrate(dateStr, task.id)} className="p-2 hover:bg-accent rounded text-blue-600"><ArrowRight className="w-4 h-4" /></button>
          <button onClick={() => onCancel(dateStr, task.id)} className="p-2 hover:bg-accent rounded text-orange-600"><X className="w-4 h-4" /></button>
          <div className="w-px h-4 bg-border mx-1" />
          <button onClick={() => onDelete(dateStr, task.id)} className="p-2 hover:bg-red-100 rounded text-red-600"><Trash2 className="w-4 h-4" /></button>
        </div>
      )}
    </div>
  );
}
