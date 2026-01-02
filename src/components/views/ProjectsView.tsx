import { useState, useMemo } from 'react';
import { Project, Task } from '@/types/bujo';
import { TaskItem } from '@/components/TaskItem';
import { Plus, Trash2, Folder, ArrowLeft, FolderOpen } from 'lucide-react';

interface ProjectsViewProps {
  projects: Project[];
  allTasks?: Record<string, Task[]>;
  addProject: (name: string) => void;
  deleteProject: (id: string) => void;
  updateTaskStatus?: (dateStr: string, taskId: string, status: Task['status']) => void;
  onMigrate?: (dateStr: string, taskId: string) => void;
  deleteTask?: (dateStr: string, taskId: string) => void;
  readOnly?: boolean;
}

export function ProjectsView({ 
  projects, 
  allTasks = {}, 
  addProject, 
  deleteProject,
  updateTaskStatus,
  onMigrate,
  deleteTask,
  readOnly = false,
}: ProjectsViewProps) {
  const [newProject, setNewProject] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const project = useMemo(
    () => (selectedProjectId ? projects.find((p) => p.id === selectedProjectId) ?? null : null),
    [projects, selectedProjectId]
  );
  const projectTasks = useMemo(() => {
    if (!selectedProjectId) return [];
    const found: { task: Task; dateStr: string }[] = [];
    Object.entries(allTasks).forEach(([dateStr, tasks]) => {
      tasks.forEach((task) => {
        if (task.projectId === selectedProjectId) {
          found.push({ task, dateStr });
        }
      });
    });
    return found.sort((a, b) => a.dateStr.localeCompare(b.dateStr));
  }, [allTasks, selectedProjectId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (readOnly || !newProject.trim()) return;
    addProject(newProject);
    setNewProject('');
  };

  // --- MODO DETALHE (DENTRO DA PASTA) ---
  if (selectedProjectId) {
    if (!project) return <div onClick={() => setSelectedProjectId(null)}>Voltar</div>;

    return (
        <div className="h-full flex flex-col bg-white">
            {/* Cabeçalho Minimalista */}
            <div className="flex items-center gap-2 mb-2 pb-4 border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm">
                <button 
                    onClick={() => setSelectedProjectId(null)} 
                    className="p-2 -ml-2 hover:bg-gray-100 rounded-sm text-gray-500 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <Folder className="w-5 h-5 text-[#6f8b82]" /> {/* Sálvia */}
                        <h2 className="text-xl font-semibold text-[#1a1a1a]">{project.name}</h2>
                    </div>
                    <span className="text-[11px] uppercase tracking-wide text-gray-400">Projetos / {project.name}</span>
                </div>
            </div>
            
            <div className="flex-1 overflow-y-auto pb-20">
                {projectTasks.length === 0 ? (
                    <div className="mt-10 text-center">
                        <p className="text-sm text-gray-400">Nenhuma tarefa nesta pasta.</p>
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
    <div className="h-full flex flex-col bg-white">
      <div className="mb-6 px-1">
        <h2 className="text-xl font-bold text-[#1a1a1a]">Projetos</h2>
        <p className="text-gray-400 text-xs">Áreas de foco</p>
      </div>

      <div className="flex-1 overflow-y-auto pb-32">
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 border border-dashed border-gray-200 rounded-md bg-gray-50/50 mx-1">
            <FolderOpen className="w-6 h-6 text-gray-300 mb-2" />
            <p className="text-gray-400 text-xs">Nenhum projeto criado</p>
          </div>
        ) : (
          <div className="flex flex-col">
            {projects.map((project) => (
              <div 
                key={project.id} 
                onClick={() => setSelectedProjectId(project.id)}
                className="group flex items-center justify-between py-3 px-2 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                    {/* Ícone Sálvia */}
                    <Folder className="w-5 h-5 text-[#6f8b82]" />
                    <span className="text-base text-[#1a1a1a] font-medium">{project.name}</span>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (readOnly) return;
                    if (confirm('Apagar este projeto e suas tarefas?')) {
                      deleteProject(project.id);
                    }
                  }}
                  className="p-2 text-gray-300 hover:text-[#d65a38] hover:bg-[#d65a38]/10 rounded-sm transition-colors disabled:opacity-50"
                  disabled={readOnly}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* INPUT FIXO (Estilo Notion/Reto) */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 pb-safe z-40">
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-3 flex gap-2">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-sm">
                <Folder className="w-4 h-4 text-gray-400" />
            </div>
            <input
                type="text"
                value={newProject}
                onChange={(e) => setNewProject(e.target.value)}
                placeholder="Nome do novo projeto..."
                className="flex-1 bg-transparent text-[#1a1a1a] placeholder:text-gray-400 text-base focus:outline-none disabled:opacity-60"
                disabled={readOnly}
            />
            <button
                type="submit"
                disabled={!newProject.trim() || readOnly}
                className="h-8 px-4 bg-[#1a1a1a] text-white text-sm font-bold rounded-sm disabled:opacity-50 hover:bg-black transition-colors"
            >
                Criar
            </button>
        </form>
      </div>
    </div>
  );
}
