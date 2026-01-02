import { render, screen } from "@testing-library/react";
import Index from "./Index";

describe("Index page", () => {
  it("renderiza título e abas principais", () => {
    render(<Index />);

    expect(screen.getByText(/BuJo/i)).toBeInTheDocument();
    ["Hoje", "Semana", "Mês", "Projetos"].forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });
});
