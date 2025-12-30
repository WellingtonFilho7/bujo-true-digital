import { useState } from 'react';
import { Project } from '@/types/bujo';
import { Plus, Trash2, Folder, FolderOpen } from 'lucide-react';

interface ProjectsViewProps {
  projects: Project[];
  addProject: (name: string) => void;
  deleteProject: (id: string) => void;
}

export function ProjectsView({ projects, addProject, deleteProject }: ProjectsViewProps) {
  const [newProject, setNewProject] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.trim()) return;
    addProject(newProject);
    setNewProject('');
  };

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="space-y-1 px-1">
        <h2 className="text-lg font-bold tracking-tight">Projetos</h2>
        <p className="text-muted-foreground text-xs">Pastas para organizar tarefas.</p>
      </div>

      {/* Lista de Projetos */}
      <div className="flex-1 overflow-y-auto space-y-3 pb-20"> {/* pb-20 dá espaço pro scroll não ficar escondido */}
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-muted rounded-xl bg-muted/10 mx-1">
            <FolderOpen className="w-8 h-8 text-muted-foreground mb-2 opacity-50" />
            <p className="text-muted-foreground text-xs">Nenhum projeto ainda</p>
          </div>
        ) : (
          projects.map((project) => (
            <div 
              key={project.id} 
              className="flex items-center justify-between p-3 bg-card border border-border rounded-xl shadow-sm active:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="shrink-0 p-2 bg-primary/10 rounded-lg text-primary">
                    <Folder className="w-5 h-5" />
                </div>
                <span className="font-medium text-sm truncate">{project.name}</span>
              </div>
              
              {/* Botão de Lixeira - Sempre visível e com área de toque boa */}
              <button
                onClick={() => {
                  if (confirm('Apagar este projeto?')) {
                    deleteProject(project.id);
                  }
                }}
                className="shrink-0 h-10 w-10 flex items-center justify-center text-red-500 bg-red-50 rounded-lg active:bg-red-200 transition-colors ml-2"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Formulário Fixo no Rodapé */}
      <form onSubmit={handleSubmit} className="pt-2 flex gap-2">
        <input
          type="text"
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
          placeholder="Novo projeto..."
          className="flex-1 h-12 px-4 bg-muted border border-transparent focus:border-primary focus:bg-background rounded-xl outline-none text-base"
        />
        <button
          type="submit"
          disabled={!newProject.trim()}
          className="h-12 w-14 bg-foreground text-background rounded-xl font-bold disabled:opacity-50 flex items-center justify-center shadow-md active:scale-95 transition-transform"
        >
          <Plus className="w-6 h-6" />
        </button>
      </form>
    </div>
  );
}
