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
    deleteProject, // Importado do hook
    getTasksForDate,
    migrateTask,
    errorMsg
  } = useBujo();

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

  return (
    <div className="h-screen flex flex-col max-w-xl mx-auto bg-background text-foreground font-sans">
      
      {/* HEADER: Mais limpo e moderno */}
      <header className="px-6 py-4 flex items-center justify-between bg-background/80 backdrop-blur-md sticky top-0 z-50 border-b border-border/40">
        <h1 className="text-xl font-black tracking-tight uppercase">BuJo Digital</h1>
        {errorMsg && (
          <span className="text-[10px] px-2 py-1 rounded-full bg-red-500/10 text-red-500 font-bold animate-pulse">
            {errorMsg}
          </span>
        )}
      </header>

      {/* NAV: Botões maiores e mais claros */}
      <nav className="flex p-1 mx-4 mt-2 bg-muted/30 rounded-xl">
        {views.map(v => (
          <button
            key={v.id}
            onClick={() => setCurrentView(v.id)}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
              currentView === v.id 
                ? 'bg-background text-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {v.label}
          </button>
        ))}
      </nav>

      {/* MAIN: Espaçamento melhorado */}
  <main className="flex-1 overflow-hidden p-4 sm:p-6">
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
          />
        )}

        {currentView === 'projects' && (
          <ProjectsView
            projects={data.projects}
            allTasks={data.tasks} // IMPORTANTE: Passando as tarefas aqui
            addProject={addProject}
            deleteProject={deleteProject}
            // Passando funções de manipulação para poder editar dentro da view de projeto
            updateTaskStatus={updateTaskStatus}
            onMigrate={handleMigrate}
            deleteTask={deleteTask}
          />
        )}
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
