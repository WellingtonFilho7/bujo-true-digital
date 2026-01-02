import { render, screen, fireEvent } from "@testing-library/react";
import { ProjectsView } from "./ProjectsView";
import type { Task } from "@/types/bujo";

const noop = () => {};

describe("ProjectsView", () => {
  const projects = [{ id: "p1", name: "Projeto A" }];
  const tasksByDate: Record<string, Task[]> = {
    "2024-01-01": [
      { id: "t1", content: "Tarefa 1", type: "task", status: "open", projectId: "p1" },
    ],
  };

  it("lista projetos e abre visão detalhada com tarefas", () => {
    render(
      <ProjectsView
        projects={projects}
        allTasks={tasksByDate}
        addProject={noop}
        deleteProject={noop}
        updateTaskStatus={noop}
        onMigrate={noop}
        deleteTask={noop}
      />,
    );

    const projectItem = screen.getByText("Projeto A");
    expect(projectItem).toBeInTheDocument();

    fireEvent.click(projectItem);

    expect(screen.getByRole("heading", { name: "Projeto A" })).toBeInTheDocument();
    expect(screen.getByText("Tarefa 1")).toBeInTheDocument();
  });
});
