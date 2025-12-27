import { useState } from 'react';
import { Project } from '@/types/bujo';

interface ProjectsViewProps {
  projects: Project[];
  addProject: (name: string) => void;
  deleteProject: (projectId: string) => void;
}

export function ProjectsView({ projects, addProject, deleteProject }: ProjectsViewProps) {
  const [newName, setNewName] = useState('');

  const handleAdd = () => {
    if (!newName.trim()) return;
    addProject(newName.trim());
    setNewName('');
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-lg font-bold uppercase tracking-tight mb-4">
        Projetos
      </h2>

      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {projects.length === 0 ? (
          <p className="text-muted-foreground text-sm italic">
            Nenhum projeto criado.
          </p>
        ) : (
          <div className="space-y-2">
            {projects.map(project => (
              <div 
                key={project.id}
                className="flex items-center justify-between border border-border rounded p-3 group"
              >
                <span className="font-medium">
                  <span className="text-muted-foreground">#</span> {project.name}
                </span>
                <button
                  onClick={() => deleteProject(project.id)}
                  className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-destructive transition-all"
                >
                  remover
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-border mt-4 flex gap-2">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Nome do projeto..."
          className="flex-1 bg-transparent border-b border-dashed border-muted-foreground/50 px-1 py-1 text-sm focus:outline-none focus:border-foreground transition-colors"
        />
        <button
          onClick={handleAdd}
          disabled={!newName.trim()}
          className="px-3 py-1 text-xs font-bold bg-foreground text-background disabled:opacity-30 transition-opacity"
        >
          CRIAR
        </button>
      </div>
    </div>
  );
}
