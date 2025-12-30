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
      <div className="space-y-1">
        <h2 className="text-xl font-bold tracking-tight">Meus Projetos</h2>
        <p className="text-muted-foreground text-sm">Crie pastas para organizar suas tarefas.</p>
      </div>

      {/* Lista de Projetos */}
      <div className="flex-1 overflow-y-auto space-y-3 pb-4">
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-muted rounded-xl bg-muted/10">
            <FolderOpen className="w-10 h-10 text-muted-foreground mb-2 opacity-50" />
            <p className="text-muted-foreground text-sm">Nenhum projeto ainda</p>
          </div>
        ) : (
          projects.map((project) => (
            <div 
              key={project.id} 
              className="flex items-center justify-between p-3 bg-card border border-border rounded-xl shadow-sm"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="shrink-0 p-2 bg-primary/10 rounded-lg text-primary">
                    <Folder className="w-5 h-5" />
                </div>
                <span className="font-medium text-sm truncate">{project.name}</span>
              </div>
              
              <button
                onClick={() => {
                  if (confirm('Tem certeza que deseja excluir este projeto?')) {
                    deleteProject(project.id);
                  }
                }}
                className="shrink-0 p-2 text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                title="Excluir projeto"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Formulário de Adição */}
      <form onSubmit={handleSubmit} className="mt-auto pt-2 flex gap-2">
        <input
          type="text"
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
          placeholder="Nome do projeto..."
          className="flex-1 px-4 py-3 bg-muted border border-transparent focus:border-primary focus:bg-background rounded-xl outline-none transition-all"
        />
        <button
          type="submit"
          disabled={!newProject.trim()}
          className="px-4 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 disabled:opacity-50 flex items-center justify-center"
        >
          <Plus className="w-6 h-6" />
        </button>
      </form>
    </div>
  );
}
