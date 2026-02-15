import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useUIStore } from "@/store/useUIStore";
import { Button } from "@/components/ui/button";

export const CartDrawer = () => {
    const { isCartOpen, setCartOpen } = useUIStore();
    const { items, updateQuantity, removeItem, total } = useCartStore();

    const cartTotal = total();

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
                        <div className="p-6 flex items-center justify-between border-b border-primary/5">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="text-primary" />
                                <h2 className="text-2xl font-display font-bold text-primary">Your Bag</h2>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setCartOpen(false)}
                                className="rounded-full"
                            >
                                <X size={20} />
                            </Button>
                        </div>

                        <div className="flex-grow overflow-hidden flex flex-col">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center space-y-6 pt-20">
                                    <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center text-primary/20 mb-4 animate-pulse">
                                        <ShoppingBag size={48} />
                                    </div>
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
                                </div>
                            ) : (
                                <div className="flex-grow overflow-auto p-6 space-y-6">
                                    {items.map((item) => (
                                        <motion.div
                                            layout
                                            key={item.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
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
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="p-1 px-2 hover:text-accent transition-colors"
                                                        >
                                                            <Minus size={14} />
                                                        </button>
                                                        <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="p-1 px-2 hover:text-accent transition-colors"
                                                        >
                                                            <Plus size={14} />
                                                        </button>
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
                            )}
                        </div>

                        <div className="p-6 bg-surface border-t border-primary/5 space-y-4">
                            <div className="flex justify-between items-end">
                                <span className="text-primary/60 font-medium text-sm">Total</span>
                                <span className="text-3xl font-display font-bold text-primary">${cartTotal.toFixed(2)}</span>
                            </div>
                            <Button
                                disabled={items.length === 0}
                                className="w-full py-7 rounded-2xl bg-primary hover:bg-accent transition-all shadow-xl shadow-primary/20 hover:shadow-accent/30 text-lg font-bold gap-2"
                            >
                                Checkout
                                <ArrowRight size={20} />
                            </Button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
