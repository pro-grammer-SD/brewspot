import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, ArrowRight, Heart, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import { useUIStore } from "@/store/useUIStore";
import { Button } from "@/components/ui/button";
import { coffees } from "@/data/mockData";
import { Link } from "react-router-dom";

export const CartDrawer = () => {
    const { isCartOpen, setCartOpen } = useUIStore();
    const { items, updateQuantity, removeItem, total } = useCartStore();
    const { favoriteIds, toggleFavorite } = useFavoritesStore();

    const cartTotal = total();
    const favoriteCoffees = coffees.filter(c => favoriteIds.includes(c.id));

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setCartOpen(false)}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background z-50 border-l border-primary/5 shadow-2xl flex flex-col"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="p-6 flex items-center justify-between border-b border-primary/5"
                        >
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="text-primary" />
                                <h2 className="text-2xl font-display font-bold text-primary">Your Bag</h2>
                            </div>
                            <motion.div whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setCartOpen(false)}
                                    className="rounded-full"
                                >
                                    <X size={20} />
                                </Button>
                            </motion.div>
                        </motion.div>

                        <div className="flex-grow overflow-hidden flex flex-col">
                            {items.length === 0 && favoriteCoffees.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="flex flex-col items-center justify-center h-full text-center space-y-6 pt-20"
                                >
                                    <motion.div
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center text-primary/20 mb-4"
                                    >
                                        <ShoppingBag size={48} />
                                    </motion.div>
                                    <div>
                                        <h3 className="text-2xl font-display font-bold text-primary mb-2">Your Bag is Empty</h3>
                                        <p className="text-primary/40 px-8">Looks like you haven't added any coffee to your bag yet.</p>
                                    </div>
                                    <Button
                                        onClick={() => { setCartOpen(false); window.location.href = '/menu'; }}
                                        className="rounded-full px-8 py-6 text-lg font-bold shadow-lg shadow-primary/10 mt-4"
                                    >
                                        Start ordering
                                    </Button>
                                </motion.div>
                            ) : (
                                <div className="flex-grow overflow-auto p-6 space-y-6">
                                    {/* Favorites Section */}
                                    {favoriteCoffees.length > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <div className="flex items-center gap-2 mb-4">
                                                <Heart size={16} className="fill-red-500 text-red-500" />
                                                <h3 className="text-sm font-sans font-bold uppercase tracking-widest text-primary/50">Favorites</h3>
                                            </div>
                                            <div className="space-y-3 mb-8">
                                                {favoriteCoffees.map((coffee, i) => (
                                                    <motion.div
                                                        key={coffee.id}
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.1 * i }}
                                                        className="flex gap-3 items-center p-3 rounded-2xl bg-secondary/50 border border-border/50 group"
                                                    >
                                                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-primary/5 flex-shrink-0">
                                                            <img src={coffee.image} alt={coffee.name} className="w-full h-full object-cover" />
                                                        </div>
                                                        <div className="flex-grow min-w-0">
                                                            <h4 className="font-bold text-sm text-primary truncate">{coffee.name}</h4>
                                                            <p className="text-xs text-primary/40">${coffee.price.toFixed(2)}</p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Link to={`/customize/${coffee.id}`} onClick={() => setCartOpen(false)}>
                                                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                                                    <Button size="sm" variant="ghost" className="rounded-xl text-xs font-bold text-accent hover:bg-accent/10">
                                                                        Order
                                                                    </Button>
                                                                </motion.div>
                                                            </Link>
                                                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                                                <Button
                                                                    size="icon"
                                                                    variant="ghost"
                                                                    onClick={() => toggleFavorite(coffee.id)}
                                                                    className="rounded-full w-8 h-8 text-red-500/50 hover:text-red-500 hover:bg-red-500/10"
                                                                >
                                                                    <Trash2 size={14} />
                                                                </Button>
                                                            </motion.div>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Cart Items */}
                                    {items.length > 0 && (
                                        <div>
                                            {favoriteCoffees.length > 0 && (
                                                <div className="flex items-center gap-2 mb-4">
                                                    <ShoppingBag size={16} className="text-primary/50" />
                                                    <h3 className="text-sm font-sans font-bold uppercase tracking-widest text-primary/50">In Your Bag</h3>
                                                </div>
                                            )}
                                            <div className="space-y-6">
                                                {items.map((item, i) => (
                                                    <motion.div
                                                        layout
                                                        key={item.id}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.05 * i }}
                                                        className="flex gap-4"
                                                    >
                                                        <div className="w-20 h-24 rounded-xl overflow-hidden bg-primary/5 flex-shrink-0">
                                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                        </div>
                                                        <div className="flex-grow py-1">
                                                            <div className="flex justify-between items-start mb-1">
                                                                <h4 className="font-bold text-primary">{item.name}</h4>
                                                                <span className="font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                                                            </div>
                                                            <p className="text-xs text-primary/40 mb-3">
                                                                {item.size}, {item.milk}
                                                            </p>
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center bg-primary/5 rounded-lg">
                                                                    <motion.button
                                                                        whileTap={{ scale: 0.85 }}
                                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                        className="p-1 px-2 hover:text-accent transition-colors"
                                                                    >
                                                                        <Minus size={14} />
                                                                    </motion.button>
                                                                    <motion.span
                                                                        key={item.quantity}
                                                                        initial={{ scale: 1.3 }}
                                                                        animate={{ scale: 1 }}
                                                                        className="w-8 text-center text-sm font-bold"
                                                                    >
                                                                        {item.quantity}
                                                                    </motion.span>
                                                                    <motion.button
                                                                        whileTap={{ scale: 0.85 }}
                                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                        className="p-1 px-2 hover:text-accent transition-colors"
                                                                    >
                                                                        <Plus size={14} />
                                                                    </motion.button>
                                                                </div>
                                                                <button
                                                                    onClick={() => removeItem(item.id)}
                                                                    className="text-xs text-red-500 font-medium hover:underline"
                                                                >
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {items.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="p-6 bg-surface border-t border-primary/5 space-y-4"
                            >
                                <div className="flex justify-between items-end">
                                    <span className="text-primary/60 font-medium text-sm">Total</span>
                                    <motion.span
                                        key={cartTotal}
                                        initial={{ scale: 1.2 }}
                                        animate={{ scale: 1 }}
                                        className="text-3xl font-display font-bold text-primary"
                                    >
                                        ${cartTotal.toFixed(2)}
                                    </motion.span>
                                </div>
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <Button
                                        disabled={items.length === 0}
                                        className="w-full py-7 rounded-2xl bg-primary hover:bg-accent transition-all shadow-xl shadow-primary/20 hover:shadow-accent/30 text-lg font-bold gap-2"
                                    >
                                        Checkout
                                        <ArrowRight size={20} />
                                    </Button>
                                </motion.div>
                            </motion.div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
