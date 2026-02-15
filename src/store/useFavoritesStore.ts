import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
    favoriteIds: string[];
    toggleFavorite: (coffeeId: string) => void;
    isFavorite: (coffeeId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({
            favoriteIds: [],
            toggleFavorite: (coffeeId) => set((state) => ({
                favoriteIds: state.favoriteIds.includes(coffeeId)
                    ? state.favoriteIds.filter((id) => id !== coffeeId)
                    : [...state.favoriteIds, coffeeId],
            })),
            isFavorite: (coffeeId) => get().favoriteIds.includes(coffeeId),
        }),
        {
            name: 'brewspot-favorites',
        }
    )
);
