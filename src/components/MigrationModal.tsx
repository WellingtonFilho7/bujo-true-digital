import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface MigrationModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (target: 'tomorrow' | 'week' | 'month') => void;
}

export function MigrationModal({ open, onClose, onSelect }: MigrationModalProps) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-xs">
        <DialogHeader>
          <DialogTitle className="text-base font-bold">Adiar Tarefa</DialogTitle>
        </DialogHeader>
        
        <p className="text-sm text-muted-foreground mb-4">
          Para quando você quer mover?
        </p>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => onSelect('tomorrow')}
            className="w-full py-2 text-sm font-medium border border-border rounded hover:bg-secondary transition-colors text-left px-3"
          >
            ↦ Para Amanhã
          </button>
          <button
            onClick={() => onSelect('week')}
            className="w-full py-2 text-sm font-medium border border-border rounded hover:bg-secondary transition-colors text-left px-3"
          >
            ↦ Próxima Semana (+7 dias)
          </button>
          <button
            onClick={() => onSelect('month')}
            className="w-full py-2 text-sm font-medium border border-border rounded hover:bg-secondary transition-colors text-left px-3"
          >
            ↦ Próximo Mês
          </button>
          <button
            onClick={onClose}
            className="w-full py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Cancelar
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
