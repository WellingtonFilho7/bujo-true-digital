import "@testing-library/jest-dom";
import { vi } from "vitest";

// Basic matchMedia stub for components relying on it (e.g. next-themes)
if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  });
}

// Stable theme hook for tests
vi.mock("next-themes", () => ({
  useTheme: () => ({ theme: "light" }),
}));

// Confirm stub to avoid jsdom alerts
if (typeof globalThis.confirm === "undefined") {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  globalThis.confirm = vi.fn(() => true);
}
