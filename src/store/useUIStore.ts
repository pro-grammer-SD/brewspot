import { create } from 'zustand';

interface UIState {
    isCartOpen: boolean;
    isMobileMenuOpen: boolean;
    isSearchOpen: boolean;
    setCartOpen: (open: boolean) => void;
    setMobileMenuOpen: (open: boolean) => void;
    setSearchOpen: (open: boolean) => void;
    toggleCart: () => void;
    toggleMobileMenu: () => void;
    toggleSearch: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    isCartOpen: false,
    isMobileMenuOpen: false,
    isSearchOpen: false,
    setCartOpen: (open) => set({ isCartOpen: open }),
    setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
    setSearchOpen: (open) => set({ isSearchOpen: open }),
    toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
    toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
    toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
}));
