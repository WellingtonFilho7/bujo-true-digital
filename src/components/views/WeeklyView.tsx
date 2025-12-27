import React, { useState } from 'react';
import { Plus, Calendar, ArrowRight, Check, X, Circle, Minus } from 'lucide-react';
import { ViewProps } from '@/types/bujo';

export const WeeklyView: React.FC<ViewProps> = ({
  currentDate,
  toISODate,
  startOfWeek,
  getTasksForDate,
  addTask,
  updateTaskStatus,
  onMigrate
}) => {
  const [newItemContent, setNewItemContent] = useState('');
  const [newItemType, setNewItemType] = useState<'task' | 'event' | 'note'>('task');
  const [optionalDate, setOptionalDate] = useState<string>('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Usamos o início da semana como o "Balde" para armazenar a lista mestre
  const weekStartDate = startOfWeek!(currentDate);
  const weekKey = toISODate(weekStartDate);
  const tasks = getTasksForDate(weekKey);

  const handleAdd = () => {
    if (!newItemContent.trim()) return;
    
    // Se tiver data opcional, salvamos no conteúdo ou metadata (adaptação visual)
    const contentToSave = optionalDate 
      ? `[${new Date(optionalDate).toLocaleDateString('pt-BR', {day:'2-digit', month:'2-digit'})}] ${newItemContent}`
      : newItemContent;

    addTask(weekKey, newItemType, contentToSave);
    setNewItemContent('');
    setOptionalDate('');
    setShowDatePicker(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="border-b-2 border-foreground pb-2 mb-4">
        <h2 className="text-xl font-bold uppercase tracking-tight">
          Weekly Log
        </h2>
        <p className="text-xs text-muted-foreground">
          Semana de {weekStartDate.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })}
        </p>
      </div>

      {/* LISTA MESTRE (Zero Calendário) */}
      <ul className="space-y-3 min-h-[200px]">
        {tasks.length === 0 && (
          <li className="text-sm text-muted-foreground italic text-center py-8">
            Nenhuma tarefa planejada para esta semana.
          </li>
        )}
        
        {tasks.map(task => (
          <li key={task.id} className="group flex items-start gap-3 text-sm hover:bg-accent/50 p-2 rounded-md transition-colors">
            {/* Símbolo / Checkbox */}
            <button
              onClick={() => updateTaskStatus(weekKey, task.id, task.status === 'done' ? 'open' : 'done')}
              className="mt-0.5 min-w-[20px] font-bold text-foreground"
            >
              {task.status === 'done' ? <Check className="w-4 h-4" /> : 
               task.status === 'canceled' ? <X className="w-4 h-4" /> :
               task.type === 'task' ? <Circle className="w-3 h-3 fill-foreground" /> :
               task.type === 'event' ? <Circle className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
            </button>

            {/* Conteúdo */}
            <span className={`flex-1 leading-normal ${task.status !== 'open' ? 'line-through text-muted-foreground' : ''}`}>
              {task.content}
            </span>

            {/* Ações (Migrar / Cancelar) */}
            {task.status === 'open' && (
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => onMigrate?.(weekKey, task.id)}
                  title="Migrar para Próxima Semana"
                  className="p-1 hover:bg-foreground hover:text-background rounded"
                >
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button 
                  onClick={() => updateTaskStatus(weekKey, task.id, 'canceled')}
                  className="p-1 hover:bg-destructive hover:text-destructive-foreground rounded"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* INPUT COM DATA OPCIONAL */}
      <div className="flex flex-col gap-2 pt-4 border-t border-border bg-background sticky bottom-0">
        <div className="flex items-center gap-2">
          <select 
            value={newItemType}
            onChange={(e) => setNewItemType(e.target.value as any)}
            className="bg-transparent border border-input rounded p-1 text-xs"
          >
            <option value="task">•</option>
            <option value="event">○</option>
            <option value="note">–</option>
          </select>

          <input
            type="text"
            value={newItemContent}
            onChange={(e) => setNewItemContent(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="Nova entrada na semana..."
            className="flex-1 bg-transparent border-b border-input p-1 text-sm focus:outline-none focus:border-foreground"
          />

          <button 
            onClick={() => setShowDatePicker(!showDatePicker)}
            className={`p-2 rounded hover:bg-accent ${optionalDate ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <Calendar className="w-4 h-4" />
          </button>

          <button 
            onClick={handleAdd}
            className="bg-foreground text-background p-2 rounded hover:opacity-90"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Date Picker Popover Discreto */}
        {showDatePicker && (
          <div className="flex items-center gap-2 text-xs animate-in slide-in-from-top-2">
            <span className="text-muted-foreground">Data visual (opcional):</span>
            <input 
              type="date" 
              value={optionalDate}
              onChange={(e) => setOptionalDate(e.target.value)}
              className="bg-background border border-input rounded p-1"
            />
          </div>
        )}
      </div>
    </div>
  );
};
