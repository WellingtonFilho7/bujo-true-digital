import { useState } from 'react';
import { useBujo } from '@/hooks/useBujo';
import { ViewType } from '@/types/bujo';
import { DailyView } from '@/components/views/DailyView';
import { WeeklyView } from '@/components/views/WeeklyView';
import { MonthlyView } from '@/components/views/MonthlyView';
import { ProjectsView } from '@/components/views/ProjectsView';
import { MigrationModal } from '@/components/MigrationModal';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('daily');
  const [migrationTask, setMigrationTask] = useState<{ dateStr: string; taskId: string } | null>(null);

  const {
    data,
    currentDate,
    toISODate,
    startOfWeek,
    addTask,
    updateTaskStatus,
    deleteTask,
    addProject,
    getTasksForDate,
    errorMsg
  } = useBujo();

  const views: { id: ViewType; label: string }[] = [
    { id: 'daily', label: 'Hoje' },
    { id: 'weekly', label: 'Semana' },
    { id: 'monthly', label: 'Mês' },
    { id: 'projects', label: 'Proj' }
  ];

  const handleMigrate = (dateStr: string, taskId: string) => {
    setMigrationTask({ dateStr, taskId });
  };

  const handleMigrationSelect = (target: 'tomorrow' | 'week' | 'month') => {
    if (!migrationTask) return;
    // Lógica de migração será implementada após o banco estar 100%
    setMigrationTask(null);
  };

  return (
    <div className="h-screen flex flex-col max-w-2xl mx-auto pt-safe pb-safe bg-background">
      <header className="flex items-center justify-between px-4 py-3 border-b-2 border-foreground sticky top-0 bg-background z-50">
        <h1 className="text-lg font-bold uppercase">BuJo</h1>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${
            errorMsg ? 'bg-red-500 text-white animate-pulse' : 'bg-green-100 text-green-700'
          }`}>
            {errorMsg ? `ERRO: ${errorMsg}` : 'BANCO ONLINE'}
          </span>
        </div>
      </header>

      <nav className="flex border-b border-border bg-background">
        {views.map(v => (
          <button
            key={v.id}
            onClick={() => setCurrentView(v.id)}
            className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider ${
              currentView === v.id ? 'text-foreground border-b-2 border-foreground' : 'text-muted-foreground'
            }`}
          >
            {v.label}
          </button>
        ))}
      </nav>

      <main className="flex-1 overflow-hidden p-4">
        {currentView === 'daily' && (
          <DailyView
            currentDate={currentDate}
            toISODate={toISODate}
            getTasksForDate={getTasksForDate}
            addTask={addTask}
            deleteTask={deleteTask}
            updateTaskStatus={updateTaskStatus}
            onMigrate={handleMigrate}
          />
        )}
        {currentView === 'projects' && (
          <ProjectsView
            projects={data.projects}
            addProject={addProject}
            deleteProject={() => {}} 
          />
        )}
        {/* Outras views podem ser adicionadas conforme necessário */}
      </main>

      <MigrationModal
        open={!!migrationTask}
        onClose={() => setMigrationTask(null)}
        onSelect={handleMigrationSelect}
      />
    </div>
  );
};

export default Index;
