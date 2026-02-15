import { motion } from "framer-motion";
import { Award, Gift, Coffee, Zap } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

const ease = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 0.1 * i, duration: 0.6, ease },
    }),
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
};

const staggerItem = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease },
    },
};

export const Rewards = () => {
    const points = 850;
    const nextReward = 1000;
    const rewardProgress = (points / nextReward) * 100;

    const handleClaim = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#f59e0b', '#fbbf24', '#d97706']
        });
    };

    const rewardsGrid = [
        { title: "Free Pastry", description: "Any muffin, croissant, or scone.", points: 400, icon: <Gift size={24} />, unlocked: true },
        { title: "Extra Shot", description: "Add a shot to any beverage.", points: 150, icon: <Zap size={24} />, unlocked: true },
        { title: "$5 Off Order", description: "Apply to any order over $10.", points: 600, icon: <Award size={24} />, unlocked: true },
        { title: "Free Artisan Drink", description: "Any drink of your choice.", points: 1000, icon: <Coffee size={24} />, unlocked: false },
    ];

    return (
        <PageTransition>
            <div className="px-4 md:px-8 max-w-7xl mx-auto pb-20">
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="pt-10 mb-12"
                >
                    <motion.h1
                        custom={0}
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="text-4xl md:text-6xl font-display font-bold text-primary mb-4"
                    >
                        BrewPoints
                    </motion.h1>
                    <motion.p
                        custom={1}
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="text-primary/60 text-lg"
                    >
                        You're making great progress towards your next reward!
                    </motion.p>
                </motion.header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-12">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="relative overflow-hidden bg-[#1a1a1a] dark:bg-black/40 border border-primary/20 p-8 md:p-12 rounded-[2rem] text-white shadow-2xl"
                        >
                            <motion.div
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none"
                            />
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4, duration: 0.6 }}
                                    className="text-center md:text-left"
                                >
                                    <div className="flex items-center justify-center md:justify-start gap-2 text-primary font-bold uppercase tracking-widest text-xs mb-4">
                                        <motion.div
                                            animate={{ rotate: [0, 10, -10, 0] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            <Award size={16} />
                                        </motion.div>
                                        Gold Brewer Status
                                    </div>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.5, type: "spring", bounce: 0.3 }}
                                        className="text-7xl md:text-9xl font-display font-bold mb-4 text-primary"
                                    >
                                        {points}
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 0.8 }}
                                        transition={{ delay: 0.6 }}
                                        className="text-xl font-medium"
                                    >
                                        Available Points
                                    </motion.div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5, duration: 0.6 }}
                                    className="w-full md:w-96 space-y-6"
                                >
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="font-bold text-primary">Next Reward</span>
                                        <span className="text-sm opacity-60">{points} / {nextReward} pts</span>
                                    </div>
                                    <div className="relative h-4 bg-white/10 rounded-full overflow-hidden border border-white/5">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${rewardProgress}%` }}
                                            transition={{ duration: 1.5, ease: "circOut", delay: 0.6 }}
                                            className="absolute inset-0 bg-accent shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                                        />
                                    </div>
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 0.6 }}
                                        transition={{ delay: 0.8 }}
                                        className="text-center text-sm"
                                    >
                                        Just {nextReward - points} points away from a free drink!
                                    </motion.p>
                                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                        <Button className="w-full py-7 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-lg shadow-lg shadow-primary/20">
                                            Redeem Points
                                        </Button>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:col-span-12">
                        <motion.h3
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-2xl font-display font-bold mb-8 text-primary"
                        >
                            Claimable Rewards
                        </motion.h3>
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                        >
                            {rewardsGrid.map((reward) => (
                                <motion.div
                                    key={reward.title}
                                    variants={staggerItem}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={cn(
                                        "p-6 rounded-3xl border transition-all duration-300 group cursor-pointer flex flex-col items-center text-center",
                                        reward.unlocked
                                            ? "glass-card border-primary/10 hover:border-primary/30"
                                            : "opacity-50 grayscale border-transparent bg-secondary/50"
                                    )}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.15, rotate: 8 }}
                                        className={cn(
                                            "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform",
                                            reward.unlocked ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                                        )}
                                    >
                                        {reward.icon}
                                    </motion.div>
                                    <h4 className="text-lg font-bold mb-2 text-foreground">{reward.title}</h4>
                                    <p className="text-sm text-muted-foreground mb-6">{reward.description}</p>
                                    <div className="mt-auto flex flex-col items-center gap-4 w-full">
                                        <span className="text-lg font-bold text-primary">{reward.points} <span className="text-xs opacity-60 uppercase">pts</span></span>
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                                            <Button
                                                variant={reward.unlocked ? "default" : "secondary"}
                                                disabled={!reward.unlocked}
                                                onClick={handleClaim}
                                                className={cn(
                                                    "rounded-xl px-8 w-full font-bold",
                                                    reward.unlocked ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90" : ""
                                                )}
                                            >
                                                Claim
                                            </Button>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};
