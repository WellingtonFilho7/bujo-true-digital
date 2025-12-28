import { useState, useRef, useEffect } from 'react';
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    data,
    currentDate,
    toISODate,
    startOfWeek,
    addTask,
    updateTaskStatus,
    migrateTask,
    addProject,
    deleteProject,
    getTasksForDate,
    exportData,
    importData
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

    const fromDate = new Date(migrationTask.dateStr);
    let toDate: Date;

    if (target === 'tomorrow') {
      toDate = new Date(fromDate);
      toDate.setDate(toDate.getDate() + 1);
    } else if (target === 'week') {
      toDate = new Date(fromDate);
      toDate.setDate(toDate.getDate() + 7);
    } else {
      toDate = new Date(fromDate.getFullYear(), fromDate.getMonth() + 1, 1);
    }

    migrateTask(migrationTask.dateStr, migrationTask.taskId, toISODate(toDate));
    setMigrationTask(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      importData(file);
    }
  };

  // Add PWA install prompt
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  return (
    <div className="h-screen flex flex-col max-w-2xl mx-auto pt-safe pb-safe">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b-2 border-foreground sticky top-0 bg-background z-50 pt-2">
        <h1 className="text-lg font-bold tracking-tight uppercase">BuJo</h1>
        
        <div className="flex items-center gap-3 text-xs">
          <button 
            onClick={exportData}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Salvar
          </button>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Restaurar
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="flex border-b border-border bg-background">
        {views.map(v => (
          <button
            key={v.id}
            onClick={() => setCurrentView(v.id)}
            className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
              currentView === v.id 
                ? 'text-foreground border-b-2 border-foreground -mb-px' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {v.label}
          </button>
        ))}
      </nav>

      {/* Main Content */}
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
          />
        )}

        {currentView === 'projects' && (
          <ProjectsView
            projects={data.projects}
            addProject={addProject}
            deleteProject={deleteProject}
          />
        )}
      </main>

      {/* Migration Modal */}
      <MigrationModal
        open={!!migrationTask}
        onClose={() => setMigrationTask(null)}
        onSelect={handleMigrationSelect}
      />
    </div>
  );
};

export default Index;
