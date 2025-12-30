import { useState, useMemo } from 'react';
import { Project, Task } from '@/types/bujo';
import { TaskItem } from '@/components/TaskItem';
import { Plus, Trash2, Folder, FolderOpen, ArrowLeft } from 'lucide-react';

interface ProjectsViewProps {
  projects: Project[];
  allTasks?: Record<string, Task[]>;
  addProject: (name: string) => void;
  deleteProject: (id: string) => void;
  updateTaskStatus?: (dateStr: string, taskId: string, status: Task['status']) => void;
  onMigrate?: (dateStr: string, taskId: string) => void;
  deleteTask?: (dateStr: string, taskId: string) => void;
}

export function ProjectsView({ 
  projects, 
  allTasks = {}, 
  addProject, 
  deleteProject,
  updateTaskStatus,
  onMigrate,
  deleteTask
}: ProjectsViewProps) {
  const [newProject, setNewProject] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.trim()) return;
    addProject(newProject);
    setNewProject('');
  };

  // --- MODO DETALHE (DENTRO DA PASTA) ---
  if (selectedProjectId) {
    const project = projects.find(p => p.id === selectedProjectId);
    
    const projectTasks = useMemo(() => {
        const found: { task: Task, dateStr: string }[] = [];
        Object.entries(allTasks).forEach(([dateStr, tasks]) => {
            tasks.forEach(task => {
                if (task.projectId === selectedProjectId) {
                    found.push({ task, dateStr });
                }
            });
        });
        return found.sort((a, b) => a.dateStr.localeCompare(b.dateStr));
    }, [allTasks, selectedProjectId]);

    if (!project) return <div onClick={() => setSelectedProjectId(null)}>Voltar</div>;

    return (
        <div className="h-full flex flex-col">
            {/* Cabeçalho da Pasta */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <button onClick={() => setSelectedProjectId(null)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full text-gray-500">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#6f8b82]">Projeto</span>
                    <h2 className="text-2xl font-bold text-[#1a1c1e] leading-none">{project.name}</h2>
                </div>
            </div>
            
            <div className="flex-1 overflow-y-auto pb-20">
                {projectTasks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center mt-10 text-gray-300">
                        <FolderOpen className="w-12 h-12 mb-2 opacity-50" />
                        <p className="text-sm font-medium">Pasta vazia</p>
                    </div>
                ) : (
                    <div className="space-y-1">
                        {projectTasks.map(({ task, dateStr }) => (
                             <TaskItem
                                key={task.id}
                                task={task}
                                dateStr={dateStr}
                                showDate={true}
                                projects={projects}
                                onToggleDone={(d, id) => updateTaskStatus?.(d, id, task.status === 'done' ? 'open' : 'done')}
                                onCancel={(d, id) => updateTaskStatus?.(d, id, 'canceled')}
                                onMigrate={(d, id) => onMigrate?.(d, id)}
                                onDelete={(d, id) => deleteTask?.(d, id)}
                             />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
  }

  // --- MODO LISTA (VER TODAS AS PASTAS) ---
  return (
    <div className="h-full flex flex-col">
      <div className="space-y-1 px-1 mb-4">
        <h2 className="text-2xl font-bold tracking-tight text-[#1a1c1e]">Projetos</h2>
        <p className="text-gray-400 text-sm font-medium">Organize suas áreas de foco.</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pb-32 px-1">
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-100 rounded-2xl bg-gray-50/50">
            <FolderOpen className="w-8 h-8 text-gray-300 mb-2" />
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Nenhum projeto</p>
          </div>
        ) : (
          projects.map((project) => (
            <div 
              key={project.id} 
              onClick={() => setSelectedProjectId(project.id)}
              className="group flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-[#6f8b82]/30 active:scale-[0.98] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4 overflow-hidden">
                <div className="shrink-0 p-3 bg-[#6f8b82]/10 rounded-xl text-[#6f8b82]">
                    <Folder className="w-6 h-6" />
                </div>
                <span className="font-bold text-lg text-[#1a1c1e] truncate">{project.name}</span>
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm('Apagar este projeto e suas tarefas?')) {
                    deleteProject(project.id);
                  }
                }}
                className="shrink-0 w-10 h-10 flex items-center justify-center text-gray-300 hover:text-[#d65a38] hover:bg-[#d65a38]/10 rounded-xl transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* INPUT ESTILO NOVO */}
      <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-100 pb-safe z-40">
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 flex gap-3">
            <input
            type="text"
            value={newProject}
            onChange={(e) => setNewProject(e.target.value)}
            placeholder="Novo projeto..."
            className="flex-1 bg-[#f8f9fa] text-[#1a1c1e] placeholder:text-gray-300 rounded-2xl px-5 py-4 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-[#6f8b82]/20 transition-all"
            />
            <button
            type="submit"
            disabled={!newProject.trim()}
            className="w-16 bg-[#1a1c1e] text-white rounded-2xl font-bold flex items-center justify-center shadow-lg disabled:opacity-50 active:scale-95 transition-transform"
            >
            <Plus className="w-7 h-7" />
            </button>
        </form>
      </div>
    </div>
  );
}
