import { useState } from 'react';
import { Project } from '@/types/bujo';
import { Plus, Trash2, Folder } from 'lucide-react';

interface ProjectsViewProps {
  projects: Project[];
  addProject: (name: string) => void;
  deleteProject: (id: string) => void; // Agora aceitamos essa função
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
    <div className="h-full flex flex-col gap-6">
      <div className="space-y-1">
        <h2 className="text-xl font-bold tracking-tight">Projetos</h2>
        <p className="text-muted-foreground text-sm">Organize suas tarefas em coleções.</p>
      </div>

      {/* Lista de Projetos */}
      <div className="grid grid-cols-1 gap-3 overflow-y-auto pb-4">
        {projects.length === 0 ? (
          <div className="text-center py-10 border-2 border-dashed border-muted rounded-xl">
            <Folder className="w-10 h-10 text-muted-foreground mx-auto mb-2 opacity-50" />
            <p className="text-muted-foreground">Nenhum projeto criado</p>
          </div>
        ) : (
          projects.map((project) => (
            <div 
              key={project.id} 
              className="group flex items-center justify-between p-4 bg-card border border-border rounded-xl shadow-sm hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Folder className="w-5 h-5" />
                </div>
                <span className="font-medium text-base">{project.name}</span>
              </div>
              
              <button
                onClick={() => deleteProject(project.id)}
                className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                title="Excluir projeto"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Formulário de Adição */}
      <form onSubmit={handleSubmit} className="mt-auto pt-4 flex gap-2">
        <input
          type="text"
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
          placeholder="Nome do novo projeto..."
          className="flex-1 px-4 py-3 bg-muted/40 border border-transparent focus:border-primary focus:bg-background rounded-xl transition-all outline-none"
        />
        <button
          type="submit"
          disabled={!newProject.trim()}
          className="px-4 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 disabled:opacity-50"
        >
          <Plus className="w-6 h-6" />
        </button>
      </form>
    </div>
  );
}
