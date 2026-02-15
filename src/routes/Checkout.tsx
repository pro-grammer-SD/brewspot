import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, CreditCard, MapPin, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store/useCartStore";
import { cn } from "@/lib/utils";

const STEPS = ["Shipping", "Payment", "Ordering"] as const;

export const Checkout = () => {
    const { items, total, clearCart } = useCartStore();
    const [step, setStep] = useState<typeof STEPS[number]>("Shipping");
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (step === "Shipping") {
            setStep("Payment");
        } else {
            setIsProcessing(true);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            setIsProcessing(false);
            setOrderComplete(true);
            clearCart();
        }
    };

    if (orderComplete) {
        return (
            <PageTransition>
                <div className="min-h-screen flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center max-w-md w-full glass-panel p-12 rounded-[2.5rem]"
                    >
                        <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-8 text-accent">
                            <Check size={48} strokeWidth={3} />
                        </div>
                        <h1 className="text-4xl font-display font-bold text-primary mb-4">Order Confirmed!</h1>
                        <p className="text-primary/60 mb-8 text-lg">Your perfect brew is being prepared and will be on its way shortly.</p>
                        <Link to="/">
                            <Button className="w-full h-14 rounded-2xl text-lg font-bold">
                                Return Home
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </PageTransition>
        );
    }

    return (
        <PageTransition>
            <div className="min-h-screen pt-24 pb-20 px-4 md:px-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-7">
                        <div className="mb-12">
                            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">Checkout</h1>
                            <div className="flex items-center gap-4 text-sm font-bold tracking-widest uppercase">
                                <span className={cn("flex items-center gap-2", step === "Shipping" ? "text-accent" : "text-primary/30")}>
                                    <MapPin size={16} /> Shipping
                                </span>
                                <ChevronRight size={16} className="text-primary/20" />
                                <span className={cn("flex items-center gap-2", step === "Payment" ? "text-accent" : "text-primary/30")}>
                                    <CreditCard size={16} /> Payment
                                </span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <AnimatePresence mode="wait">
                                {step === "Shipping" ? (
                                    <motion.div
                                        key="shipping"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="space-y-6"
                                    >
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-primary/40">First Name</label>
                                                <Input required placeholder="John" className="h-14 rounded-xl bg-surface/50 border-primary/10" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-primary/40">Last Name</label>
                                                <Input required placeholder="Doe" className="h-14 rounded-xl bg-surface/50 border-primary/10" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-primary/40">Email Address</label>
                                            <Input required type="email" placeholder="john@example.com" className="h-14 rounded-xl bg-surface/50 border-primary/10" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-primary/40">Street Address</label>
                                            <Input required placeholder="123 Coffee Lane" className="h-14 rounded-xl bg-surface/50 border-primary/10" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-primary/40">City</label>
                                                <Input required placeholder="New York" className="h-14 rounded-xl bg-surface/50 border-primary/10" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-primary/40">Zip Code</label>
                                                <Input required placeholder="10001" className="h-14 rounded-xl bg-surface/50 border-primary/10" />
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="payment"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="space-y-6"
                                    >
                                        <div className="p-6 rounded-2xl border border-primary/10 bg-primary/5 mb-6">
                                            <div className="flex items-center gap-4 mb-4">
                                                <CreditCard className="text-accent" />
                                                <span className="font-bold text-lg">Credit / Debit Card</span>
                                            </div>
                                            <div className="space-y-4">
                                                <Input required placeholder="Card Number" className="h-14 rounded-xl bg-surface border-primary/10 font-mono" />
                                                <div className="grid grid-cols-2 gap-4">
                                                    <Input required placeholder="MM/YY" className="h-14 rounded-xl bg-surface border-primary/10 font-mono" />
                                                    <Input required placeholder="CVC" className="h-14 rounded-xl bg-surface border-primary/10 font-mono" />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <Button
                                type="submit"
                                disabled={isProcessing}
                                className="w-full h-16 rounded-2xl text-xl font-bold mt-8 shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                            >
                                {isProcessing ? (
                                    "Processing..."
                                ) : step === "Shipping" ? (
                                    <>Continue to Payment <ChevronRight className="ml-2" /></>
                                ) : (
                                    `Pay $${total().toFixed(2)}`
                                )}
                            </Button>
                        </form>
                    </div>

                    <div className="lg:col-span-5">
                        <div className="glass-panel p-8 rounded-[2.5rem] sticky top-32">
                            <h3 className="text-2xl font-display font-bold text-primary mb-8 flex items-center gap-3">
                                <ShoppingBag size={24} />
                                Order Summary
                            </h3>

                            <div className="space-y-6 mb-8 max-h-96 overflow-auto pr-2 custom-scrollbar">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-16 h-16 rounded-xl bg-primary/5 overflow-hidden flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-start">
                                                <span className="font-bold text-primary/80">{item.name}</span>
                                                <span className="font-mono font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                            <p className="text-xs text-primary/40 font-medium">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 pt-6 border-t border-primary/10">
                                <div className="flex justify-between text-sm">
                                    <span className="text-primary/60">Subtotal</span>
                                    <span className="font-mono font-bold">${total().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-primary/60">Shipping</span>
                                    <span className="font-mono font-bold text-accent">Free</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold pt-4 text-primary">
                                    <span>Total</span>
                                    <span className="font-display">${total().toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};
