import { useState } from 'react';
import { useBujo } from '@/hooks/useBujo';
import { ViewType } from '@/types/bujo';
import { DailyView } from '@/components/views/DailyView';
import { WeeklyView } from '@/components/views/WeeklyView';
import { MonthlyView } from '@/components/views/MonthlyView';
import { ProjectsView } from '@/components/views/ProjectsView';
import { MigrationModal } from '@/components/MigrationModal';
import { Info, WifiOff, Wifi } from 'lucide-react'; // Import necessário para o botão de ajuda
import { useEffect, useState } from 'react';
import { toast } from '@/components/ui/sonner';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('daily');
  const [migrationTask, setMigrationTask] = useState<{ dateStr: string; taskId: string } | null>(null);
  const [showLegend, setShowLegend] = useState(false);

  const {
    data,
    currentDate,
    toISODate,
    startOfWeek,
    addTask,
    updateTaskStatus,
    deleteTask,
    addProject,
    deleteProject,
    getTasksForDate,
    migrateTask,
    errorMsg,
    isConnected
  } = useBujo();
  const readOnly = !isConnected;
  const [showInlineError, setShowInlineError] = useState(false);

  const views: { id: ViewType; label: string }[] = [
    { id: 'daily', label: 'Hoje' },
    { id: 'weekly', label: 'Semana' },
    { id: 'monthly', label: 'Mês' },
    { id: 'projects', label: 'Projetos' }
  ];

  const handleMigrate = (dateStr: string, taskId: string) => {
    setMigrationTask({ dateStr, taskId });
  };

  const handleMigrationSelect = async (target: 'tomorrow' | 'week' | 'month') => {
    if (!migrationTask) return;
    await migrateTask(migrationTask.dateStr, migrationTask.taskId, target);
    setMigrationTask(null);
  };

  useEffect(() => {
    if (errorMsg) {
      toast.error(errorMsg);
      setShowInlineError(true);
      const t = setTimeout(() => setShowInlineError(false), 6000);
      return () => clearTimeout(t);
    }
  }, [errorMsg]);

  return (
    <div className="h-screen flex flex-col max-w-xl mx-auto bg-white text-[#1a1a1a]">
      
      {/* HEADER: BuJo. + Ajuda */}
      <header className="pt-12 pb-2 px-5 flex items-end justify-between sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <div>
           <h1 className="text-3xl font-black tracking-tighter text-[#1a1a1a] leading-none">
             BuJo<span className="text-[#d65a38]">.</span>
           </h1>
           <p className="text-xs font-medium text-gray-400 mt-1 uppercase tracking-widest">
             {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric' })}
           </p>
        </div>

        <div className="flex items-center gap-2">
            <button 
                onClick={() => setShowLegend(!showLegend)}
                className="p-2 text-gray-300 hover:text-[#d65a38] transition-colors"
            >
                <Info className="w-6 h-6" />
            </button>
            <span
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                isConnected ? 'bg-[#6f8b82]/15 text-[#2f5149]' : 'bg-[#d65a38]/15 text-[#8a2f19]'
              }`}
            >
              {isConnected ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
              {isConnected ? 'Online' : 'Offline / Só leitura'}
            </span>
        </div>
      </header>

      {/* NAV */}
      <nav className="flex px-5 border-b border-gray-100 overflow-x-auto hide-scrollbar gap-6 mt-4">
        {views.map(v => (
          <button
            key={v.id}
            onClick={() => setCurrentView(v.id)}
            className={`pb-3 text-base transition-all relative shrink-0 px-1 rounded ${
              currentView === v.id 
                ? 'font-bold text-[#d65a38] bg-[#d65a38]/10'
                : 'font-medium text-gray-400 hover:text-[#1a1a1a]'
            }`}
          >
            {v.label}
            {currentView === v.id && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#d65a38]" />
            )}
          </button>
        ))}
      </nav>

      {errorMsg && showInlineError && (
        <div className="mx-4 mt-3 rounded-md border border-[#f9d3c5] bg-[#fff3ee] px-3 py-2 text-xs text-[#8a2f19] flex items-center justify-between">
          <span>{errorMsg}</span>
          <button onClick={() => setShowInlineError(false)} className="text-[#8a2f19] font-bold px-2">
            ×
          </button>
        </div>
      )}

      {/* MANUAL DE INSTRUÇÕES (LEGENDA) */}
      {showLegend && (
        <div className="bg-gray-50 border-b border-gray-100 p-6 animate-in slide-in-from-top-full duration-300">
            <div className="max-w-md mx-auto space-y-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-[#d65a38]">Método Rapid Logging</h3>
            
            <div className="grid gap-4">
                <section>
                <div className="flex items-center gap-2 font-bold text-sm underline decoration-[#d65a38]">
                    <span>• Tasks</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Ações. Têm estados: • (aberta), ✓ (feita), {'>'} (adiada), X (cancelada).</p>
                </section>

                <section>
                <div className="flex items-center gap-2 font-bold text-sm">
                    <span>O</span> <strong>Eventos</strong>
                </div>
                <p className="text-xs text-gray-500 mt-1">Datas e ocorrências. São registros objetivos e breves.</p>
                </section>

                <section>
                <div className="flex items-center gap-2 font-medium italic text-sm">
                    <span>–</span> Notas
                </div>
                <p className="text-xs text-gray-500 mt-1">Fatos, ideias e observações. Informações para não esquecer.</p>
                </section>
            </div>
            
            <button 
                onClick={() => setShowLegend(false)}
                className="w-full py-2 text-xs font-bold bg-[#1a1a1a] text-white rounded-sm"
            >
                Entendi
            </button>
            </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-hidden relative">
        <div className="h-full overflow-y-auto hide-scrollbar px-4 pt-6 pb-40">
          {currentView === 'daily' && (
            <DailyView
              currentDate={currentDate}
              toISODate={toISODate}
              getTasksForDate={getTasksForDate}
              addTask={addTask}
              deleteTask={deleteTask}
              updateTaskStatus={updateTaskStatus}
              onMigrate={handleMigrate}
              projects={data.projects} 
              readOnly={readOnly}
            />
          )}

          {currentView === 'weekly' && (
            <WeeklyView
              currentDate={currentDate}
              toISODate={toISODate}
              startOfWeek={startOfWeek}
              getTasksForDate={getTasksForDate}
              addTask={addTask}
              deleteTask={deleteTask}
              updateTaskStatus={updateTaskStatus}
              onMigrate={handleMigrate}
              projects={data.projects} 
              readOnly={readOnly}
            />
          )}

          {currentView === 'monthly' && (
            <MonthlyView
              currentDate={currentDate}
              toISODate={toISODate}
              getTasksForDate={getTasksForDate}
              addTask={addTask}
              deleteTask={deleteTask}
              updateTaskStatus={updateTaskStatus}
              onMigrate={handleMigrate}
              projects={data.projects} 
              readOnly={readOnly}
            />
          )}

          {currentView === 'projects' && (
            <ProjectsView
              projects={data.projects}
              allTasks={data.tasks}
              addProject={addProject}
              deleteProject={deleteProject}
              updateTaskStatus={updateTaskStatus}
              onMigrate={handleMigrate}
              deleteTask={deleteTask}
              readOnly={readOnly}
            />
          )}
        </div>
      </main>

      <MigrationModal
        open={!!migrationTask}
        onClose={() => setMigrationTask(null)}
        onSelect={handleMigrationSelect}
      />
    </div>
  );
};

// ESSA LINHA É A QUE ESTÁ FALTANDO NO SEU ARQUIVO:
export default Index;
