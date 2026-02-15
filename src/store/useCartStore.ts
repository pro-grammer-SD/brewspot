import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: string;
    coffeeId: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    size: 'S' | 'M' | 'L';
    milk: string;
    addons: string[];
}

interface CartState {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    total: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (newItem) => set((state) => {
                const existingItemIndex = state.items.findIndex(
                    (item) => item.coffeeId === newItem.coffeeId &&
                        item.size === newItem.size &&
                        item.milk === newItem.milk &&
                        JSON.stringify(item.addons) === JSON.stringify(newItem.addons)
                );

                if (existingItemIndex > -1) {
                    const updatedItems = [...state.items];
                    updatedItems[existingItemIndex].quantity += newItem.quantity;
                    return { items: updatedItems };
                }
                return { items: [...state.items, { ...newItem, id: Math.random().toString(36).substr(2, 9) }] };
            }),
            removeItem: (id) => set((state) => ({
                items: state.items.filter((item) => item.id !== id)
            })),
            updateQuantity: (id, quantity) => set((state) => ({
                items: state.items.map((item) =>
                    item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
                ).filter(item => item.quantity > 0)
            })),
            clearCart: () => set({ items: [] }),
            total: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        }),
        {
            name: 'brewspot-cart',
        }
    )
);
