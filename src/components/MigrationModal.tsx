import { X, Calendar, ArrowRight, SkipForward } from 'lucide-react';

interface MigrationModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (target: 'tomorrow' | 'week' | 'month') => void;
}

export function MigrationModal({ open, onClose, onSelect }: MigrationModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Overlay escuro */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Conteúdo do Modal */}
      <div className="relative w-full max-w-sm bg-white rounded-lg shadow-xl p-4 border border-gray-200 animate-in slide-in-from-bottom-5 sm:zoom-in-95 duration-300">
        
        <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
          <h3 className="text-base font-bold text-[#1a1a1a]">Mover tarefa</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-[#d65a38]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col gap-1">
          {/* Opção: Amanhã */}
          <button
            onClick={() => onSelect('tomorrow')}
            className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 transition-colors group text-left"
          >
            <div className="p-1.5 bg-[#f2a735]/10 rounded-sm text-[#f2a735] group-hover:bg-[#f2a735] group-hover:text-white transition-colors">
              <ArrowRight className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-sm font-semibold text-[#1a1a1a]">Amanhã</span>
              <span className="text-xs text-gray-500">Adiar para o próximo dia</span>
            </div>
          </button>

          {/* Opção: Próxima Semana */}
          <button
            onClick={() => onSelect('week')}
            className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 transition-colors group text-left"
          >
            <div className="p-1.5 bg-gray-100 rounded-sm text-gray-500 group-hover:bg-[#f2a735] group-hover:text-white transition-colors">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-sm font-semibold text-[#1a1a1a]">Próxima Semana</span>
              <span className="text-xs text-gray-500">Agendar para segunda-feira</span>
            </div>
          </button>

          {/* Opção: Próximo Mês */}
          <button
            onClick={() => onSelect('month')}
            className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 transition-colors group text-left"
          >
            <div className="p-1.5 bg-gray-100 rounded-sm text-gray-500 group-hover:bg-[#f2a735] group-hover:text-white transition-colors">
              <SkipForward className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-sm font-semibold text-[#1a1a1a]">Próximo Mês</span>
              <span className="text-xs text-gray-500">Mover para dia 1º</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
