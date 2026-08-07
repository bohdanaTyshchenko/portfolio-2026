"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { useHydrated } from "./useHydrated";

export type PortfolioMode = "creative" | "professional";

const STORAGE_KEY = "portfolio-mode";

const listeners = new Set<() => void>();

/** In-memory mode keeps React in sync with localStorage across tabs and toggles. */
let clientMode: PortfolioMode | null = null;

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function readStoredMode(): PortfolioMode {
  if (typeof window === "undefined") {
    return "professional";
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "creative" ? "creative" : "professional";
}

function getSnapshot(): PortfolioMode {
  if (clientMode === null) {
    clientMode = readStoredMode();
  }

  return clientMode;
}

function getServerSnapshot(): PortfolioMode {
  return "professional";
}

function writeStoredMode(mode: PortfolioMode) {
  clientMode = mode;

  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, mode);
    document.documentElement.dataset.portfolioMode = mode;
  }

  emitChange();
}

type PortfolioModeContextValue = {
  mode: PortfolioMode;
  setMode: (mode: PortfolioMode) => void;
  toggleMode: () => void;
};

const PortfolioModeContext = createContext<PortfolioModeContextValue | null>(
  null,
);

export function PortfolioModeProvider({ children }: { children: ReactNode }) {
  const mode = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    clientMode = readStoredMode();
    document.documentElement.dataset.portfolioMode = clientMode;

    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) {
        return;
      }

      clientMode = readStoredMode();
      emitChange();
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setMode = useCallback((nextMode: PortfolioMode) => {
    writeStoredMode(nextMode);
  }, []);

  const toggleMode = useCallback(() => {
    writeStoredMode(getSnapshot() === "creative" ? "professional" : "creative");
  }, []);

  return (
    <PortfolioModeContext.Provider value={{ mode, setMode, toggleMode }}>
      {children}
    </PortfolioModeContext.Provider>
  );
}

export function usePortfolioMode() {
  const context = useContext(PortfolioModeContext);

  if (!context) {
    throw new Error("usePortfolioMode must be used within PortfolioModeProvider");
  }

  return context;
}

export function isProfessionalMode(mode: PortfolioMode) {
  return mode === "professional";
}

export function portraitSrcForMode(mode: PortfolioMode) {
  return mode === "professional"
    ? "/images/professional-portrait.png"
    : "/images/figma/portrait-fun.png";
}

/** Mode for render: always "professional" until hydrated to match SSR markup. */
export function useDisplayMode(): PortfolioMode {
  const { mode } = usePortfolioMode();
  const hydrated = useHydrated();

  return hydrated ? mode : "professional";
}
