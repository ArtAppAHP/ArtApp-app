import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Artwork, Museum } from '@/types/artwork';

interface AppState {
  artworks: Artwork[];
  museums: Museum[];
  addArtwork: (artwork: Artwork) => void;
  removeArtwork: (id: string) => void;
  addMuseum: (museum: Museum) => void;
  updateMuseum: (id: string, museum: Partial<Museum>) => void;
  removeMuseum: (id: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      artworks: [],
      museums: [],
      addArtwork: (artwork) =>
        set((s) => ({ artworks: [...s.artworks, artwork] })),
      removeArtwork: (id) =>
        set((s) => ({ artworks: s.artworks.filter((a) => a.id !== id) })),
      addMuseum: (museum) =>
        set((s) => ({ museums: [...s.museums, museum] })),
      updateMuseum: (id, data) =>
        set((s) => ({
          museums: s.museums.map((m) => (m.id === id ? { ...m, ...data } : m)),
        })),
      removeMuseum: (id) =>
        set((s) => ({ museums: s.museums.filter((m) => m.id !== id) })),
    }),
    { name: 'art-gallery-storage' }
  )
);
