import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, CreditCard, MapPin, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store/useCartStore";

const STEPS = ["Shipping", "Payment", "Ordering"] as const;

const ease = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 0.08 * i, duration: 0.5, ease },
    }),
};

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
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", bounce: 0.4 }}
                        className="text-center max-w-md w-full glass-panel p-12 rounded-[2.5rem]"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
                            className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-8 text-accent"
                        >
                            <Check size={48} strokeWidth={3} />
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-4xl font-display font-bold text-primary mb-4"
                        >
                            Order Confirmed!
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-primary/60 mb-8 text-lg"
                        >
                            Your perfect brew is being prepared and will be on its way shortly.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            <Link to="/">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button className="w-full h-14 rounded-2xl text-lg font-bold">
                                        Return Home
                                    </Button>
                                </motion.div>
                            </Link>
                        </motion.div>
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
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-12"
                        >
                            <motion.h1
                                custom={0}
                                variants={fadeUp}
                                initial="hidden"
                                animate="visible"
                                className="text-4xl md:text-5xl font-display font-bold text-primary mb-6"
                            >
                                Checkout
                            </motion.h1>
                            <motion.div
                                custom={1}
                                variants={fadeUp}
                                initial="hidden"
                                animate="visible"
                                className="flex items-center gap-4 text-sm font-bold tracking-widest uppercase"
                            >
                                <motion.span
                                    animate={{ color: step === "Shipping" ? "hsl(var(--accent))" : "hsl(var(--primary) / 0.3)" }}
                                    className="flex items-center gap-2"
                                >
                                    <MapPin size={16} /> Shipping
                                </motion.span>
                                <ChevronRight size={16} className="text-primary/20" />
                                <motion.span
                                    animate={{ color: step === "Payment" ? "hsl(var(--accent))" : "hsl(var(--primary) / 0.3)" }}
                                    className="flex items-center gap-2"
                                >
                                    <CreditCard size={16} /> Payment
                                </motion.span>
                            </motion.div>
                        </motion.div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <AnimatePresence mode="wait">
                                {step === "Shipping" ? (
                                    <motion.div
                                        key="shipping"
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 30 }}
                                        transition={{ duration: 0.4 }}
                                        className="space-y-6"
                                    >
                                        {[
                                            {
                                                cols: 2, fields: [
                                                    { label: "First Name", placeholder: "John", type: "text" },
                                                    { label: "Last Name", placeholder: "Doe", type: "text" },
                                                ]
                                            },
                                            {
                                                cols: 1, fields: [
                                                    { label: "Email Address", placeholder: "john@example.com", type: "email" },
                                                ]
                                            },
                                            {
                                                cols: 1, fields: [
                                                    { label: "Street Address", placeholder: "123 Coffee Lane", type: "text" },
                                                ]
                                            },
                                            {
                                                cols: 2, fields: [
                                                    { label: "City", placeholder: "New York", type: "text" },
                                                    { label: "Zip Code", placeholder: "10001", type: "text" },
                                                ]
                                            },
                                        ].map((row, ri) => (
                                            <motion.div
                                                key={ri}
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.1 * ri }}
                                                className={`grid grid-cols-${row.cols} gap-6`}
                                            >
                                                {row.fields.map((field) => (
                                                    <div key={field.label} className="space-y-2">
                                                        <label className="text-xs font-bold uppercase tracking-widest text-primary/40">{field.label}</label>
                                                        <Input required type={field.type || "text"} placeholder={field.placeholder} className="h-14 rounded-xl bg-surface/50 border-primary/10 focus:border-accent transition-colors" />
                                                    </div>
                                                ))}
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="payment"
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 30 }}
                                        transition={{ duration: 0.4 }}
                                        className="space-y-6"
                                    >
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.1 }}
                                            className="p-6 rounded-2xl border border-primary/10 bg-primary/5 mb-6"
                                        >
                                            <div className="flex items-center gap-4 mb-4">
                                                <CreditCard className="text-accent" />
                                                <span className="font-bold text-lg">Credit / Debit Card</span>
                                            </div>
                                            <div className="space-y-4">
                                                <Input required placeholder="Card Number" className="h-14 rounded-xl bg-surface border-primary/10 font-mono focus:border-accent transition-colors" />
                                                <div className="grid grid-cols-2 gap-4">
                                                    <Input required placeholder="MM/YY" className="h-14 rounded-xl bg-surface border-primary/10 font-mono focus:border-accent transition-colors" />
                                                    <Input required placeholder="CVC" className="h-14 rounded-xl bg-surface border-primary/10 font-mono focus:border-accent transition-colors" />
                                                </div>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <Button
                                        type="submit"
                                        disabled={isProcessing}
                                        className="w-full h-16 rounded-2xl text-xl font-bold mt-8 shadow-xl transition-all"
                                    >
                                        {isProcessing ? (
                                            <motion.span
                                                animate={{ opacity: [1, 0.5, 1] }}
                                                transition={{ duration: 1, repeat: Infinity }}
                                            >
                                                Processing...
                                            </motion.span>
                                        ) : step === "Shipping" ? (
                                            <>Continue to Payment <ChevronRight className="ml-2" /></>
                                        ) : (
                                            `Pay $${total().toFixed(2)}`
                                        )}
                                    </Button>
                                </motion.div>
                            </motion.div>
                        </form>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="lg:col-span-5"
                    >
                        <div className="glass-panel p-8 rounded-[2.5rem] sticky top-32">
                            <h3 className="text-2xl font-display font-bold text-primary mb-8 flex items-center gap-3">
                                <ShoppingBag size={24} />
                                Order Summary
                            </h3>

                            <div className="space-y-6 mb-8 max-h-96 overflow-auto pr-2 custom-scrollbar">
                                {items.map((item, i) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * i }}
                                        className="flex gap-4"
                                    >
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
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="space-y-3 pt-6 border-t border-primary/10"
                            >
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
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </PageTransition>
    );
};
