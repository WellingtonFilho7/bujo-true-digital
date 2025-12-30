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
      {/* Fundo escuro desfocado */}
      <div 
        className="fixed inset-0 bg-[#1a1c1e]/20 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* O Card do Modal */}
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 border border-gray-100 scale-100 animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-300">
        
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-[#1a1c1e]">Para quando?</h3>
          <button onClick={onClose} className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-[#d65a38]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {/* Opção: Amanhã */}
          <button
            onClick={() => onSelect('tomorrow')}
            className="flex items-center gap-4 p-4 rounded-2xl bg-[#f2a735]/10 text-[#f2a735] hover:bg-[#f2a735] hover:text-white transition-all group"
          >
            <div className="p-2 bg-white rounded-xl shadow-sm group-hover:bg-white/20">
              <ArrowRight className="w-6 h-6" />
            </div>
            <div className="text-left">
              <span className="block font-bold text-lg">Amanhã</span>
              <span className="text-xs opacity-70 font-medium uppercase tracking-wider">Adiar 24h</span>
            </div>
          </button>

          {/* Opção: Próxima Semana */}
          <button
            onClick={() => onSelect('week')}
            className="flex items-center gap-4 p-4 rounded-2xl bg-[#6f8b82]/10 text-[#6f8b82] hover:bg-[#6f8b82] hover:text-white transition-all group"
          >
            <div className="p-2 bg-white rounded-xl shadow-sm group-hover:bg-white/20">
              <Calendar className="w-6 h-6" />
            </div>
            <div className="text-left">
              <span className="block font-bold text-lg">Próxima Semana</span>
              <span className="text-xs opacity-70 font-medium uppercase tracking-wider">Jogar pra segunda</span>
            </div>
          </button>

          {/* Opção: Próximo Mês */}
          <button
            onClick={() => onSelect('month')}
            className="flex items-center gap-4 p-4 rounded-2xl bg-gray-100 text-gray-500 hover:bg-[#d65a38] hover:text-white transition-all group"
          >
            <div className="p-2 bg-white rounded-xl shadow-sm group-hover:bg-white/20">
              <SkipForward className="w-6 h-6" />
            </div>
            <div className="text-left">
              <span className="block font-bold text-lg">Próximo Mês</span>
              <span className="text-xs opacity-70 font-medium uppercase tracking-wider">Limpar a mesa</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
