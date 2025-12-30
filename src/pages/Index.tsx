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
    <div className="h-screen flex flex-col max-w-xl mx-auto bg-white text-[#1a1a1a]">
      
      {/* HEADER: A MARCA DO APP (Bold e com Ponto Terracota) */}
      <header className="pt-12 pb-2 px-5 flex items-end justify-between sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <div>
           <h1 className="text-3xl font-black tracking-tighter text-[#1a1a1a] leading-none">
             BuJo<span className="text-[#d65a38]">.</span>
           </h1>
           {/* Data de hoje bem discreta embaixo do logo */}
           <p className="text-xs font-medium text-gray-400 mt-1 uppercase tracking-widest">
             {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric' })}
           </p>
        </div>

        {/* Status minimalista */}
        <div className={`mb-2 w-1.5 h-1.5 rounded-full ${!data ? 'bg-[#d65a38]' : 'bg-[#6f8b82]'}`} />
      </header>

      {/* NAV: Simples e Elegante */}
      <nav className="flex px-5 border-b border-gray-100 overflow-x-auto hide-scrollbar gap-8 mt-4">
        {views.map(v => (
          <button
            key={v.id}
            onClick={() => setCurrentView(v.id)}
            className={`pb-3 text-sm transition-all relative shrink-0 ${
              currentView === v.id 
                ? 'font-bold text-[#d65a38]' // Ativo: Terracota
                : 'font-medium text-gray-400 hover:text-[#1a1a1a]'
            }`}
          >
            {v.label}
            {/* Linha indicadora apenas no ativo */}
            {currentView === v.id && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#d65a38]" />
            )}
          </button>
        ))}
      </nav>

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
