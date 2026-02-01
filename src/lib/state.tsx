"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppState, Mystery } from './types';

interface StateContextType {
  state: AppState;
  setMystery: (mystery: Mystery | null) => void;
  setTheme: (theme: string) => void;
  setPlayerCount: (count: number) => void;
  updateMystery: (patch: Partial<Mystery>) => void;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

const STORAGE_KEY = 'fable_and_fact_state';

export function StateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    currentMystery: null,
    theme: "",
    playerCount: 6
  });

  const [isInitialized, setIsInitialized] = useState(false);

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setState(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load state", e);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, isInitialized]);

  const setMystery = (mystery: Mystery | null) => {
    setState(prev => ({ ...prev, currentMystery: mystery }));
  };

  const setTheme = (theme: string) => {
    setState(prev => ({ ...prev, theme }));
  };

  const setPlayerCount = (playerCount: number) => {
    setState(prev => ({ ...prev, playerCount }));
  };

  const updateMystery = (patch: Partial<Mystery>) => {
    setState(prev => {
      if (!prev.currentMystery) return prev;
      return {
        ...prev,
        currentMystery: { ...prev.currentMystery, ...patch }
      };
    });
  };

  if (!isInitialized) return null;

  return (
    <StateContext.Provider value={{ state, setMystery, setTheme, setPlayerCount, updateMystery }}>
      {children}
    </StateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within a StateProvider');
  }
  return context;
}
