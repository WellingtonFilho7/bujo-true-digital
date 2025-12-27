import React, { useState } from 'react';
import { Plus, Calendar, ArrowRight, Check, X, Circle, Minus } from 'lucide-react';
import { ViewProps } from '@/types/bujo';

export const MonthlyView: React.FC<ViewProps> = ({
  currentDate,
  toISODate,
  getTasksForDate,
  addTask,
  updateTaskStatus,
  onMigrate
}) => {
  const [newItemContent, setNewItemContent] = useState('');
  const [newItemType, setNewItemType] = useState<'task' | 'event' | 'note'>('task');
  const [optionalDate, setOptionalDate] = useState<string>('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Usamos o dia 1 do mês como "Balde" do mês
  const monthKey = toISODate(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1));
  const tasks = getTasksForDate(monthKey);

  const handleAdd = () => {
    if (!newItemContent.trim()) return;
    
    const contentToSave = optionalDate 
      ? `[${new Date(optionalDate).toLocaleDateString('pt-BR', {day:'2-digit'})}] ${newItemContent}`
      : newItemContent;

    addTask(monthKey, newItemType, contentToSave);
    setNewItemContent('');
    setOptionalDate('');
    setShowDatePicker(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="border-b-2 border-foreground pb-2 mb-4">
        <h2 className="text-xl font-bold uppercase tracking-tight">
          Monthly Log
        </h2>
        <p className="text-xs text-muted-foreground">
          {currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
        </p>
      </div>

      <ul className="space-y-3 min-h-[200px]">
        {tasks.length === 0 && (
          <li className="text-sm text-muted-foreground italic text-center py-8">
            Nenhum plano para este mês ainda.
          </li>
        )}
        
        {tasks.map(task => (
          <li key={task.id} className="group flex items-start gap-3 text-sm hover:bg-accent/50 p-2 rounded-md transition-colors">
            <button
              onClick={() => updateTaskStatus(monthKey, task.id, task.status === 'done' ? 'open' : 'done')}
              className="mt-0.5 min-w-[20px] font-bold text-foreground"
            >
              {task.status === 'done' ? <Check className="w-4 h-4" /> : 
               task.status === 'canceled' ? <X className="w-4 h-4" /> :
               task.type === 'task' ? <Circle className="w-3 h-3 fill-foreground" /> :
               task.type === 'event' ? <Circle className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
            </button>

            <span className={`flex-1 leading-normal ${task.status !== 'open' ? 'line-through text-muted-foreground' : ''}`}>
              {task.content}
            </span>

            {task.status === 'open' && (
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => onMigrate?.(monthKey, task.id)}
                  title="Migrar para Próximo Mês"
                  className="p-1 hover:bg-foreground hover:text-background rounded"
                >
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button 
                  onClick={() => updateTaskStatus(monthKey, task.id, 'canceled')}
                  className="p-1 hover:bg-destructive hover:text-destructive-foreground rounded"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* INPUT IDENTICO AO WEEKLY */}
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
            placeholder="Meta para o mês..."
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
