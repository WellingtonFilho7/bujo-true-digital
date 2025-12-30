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
    deleteProject,
    getTasksForDate,
    migrateTask
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
    <div className="h-screen flex flex-col max-w-xl mx-auto text-[#1a1c1e]">
      
      {/* HEADER LIMPO */}
      <header className="pt-12 pb-2 px-6 flex items-end justify-between sticky top-0 bg-white/90 backdrop-blur-sm z-50">
        <h1 className="text-xl font-black tracking-tight text-[#1a1c1e]">
          BuJo<span className="text-[#d65a38]">.</span>
        </h1>
        {/* Ponto indicador de conexão */}
        <div className={`w-2 h-2 rounded-full ${!data ? 'bg-red-400' : 'bg-[#6f8b82]'}`} />
      </header>

      {/* NAV TERROSA */}
      <nav className="flex px-6 border-b border-gray-100 overflow-x-auto hide-scrollbar">
        {views.map(v => (
          <button
            key={v.id}
            onClick={() => setCurrentView(v.id)}
            className={`mr-8 py-4 text-sm font-bold tracking-wide transition-all relative shrink-0 ${
              currentView === v.id 
                ? 'text-[#d65a38]' // Terracota no ativo
                : 'text-gray-400 hover:text-[#1a1c1e]'
            }`}
          >
            {v.label}
            {/* Linha ativa Terracota */}
            {currentView === v.id && (
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#d65a38] rounded-t-full" />
            )}
          </button>
        ))}
      </nav>

      {/* MAIN */}
      <main className="flex-1 overflow-hidden relative bg-white">
        <div className="h-full overflow-y-auto hide-scrollbar px-5 pt-6 pb-40">
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
              allTasks={data.tasks}
              addProject={addProject}
              deleteProject={deleteProject}
              updateTaskStatus={updateTaskStatus}
              onMigrate={handleMigrate}
              deleteTask={deleteTask}
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

export default Index;
