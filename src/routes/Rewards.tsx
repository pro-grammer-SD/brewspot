import { motion } from "framer-motion";
import { Award, Gift, Coffee, Zap } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import confetti from "canvas-confetti";

export const Rewards = () => {
    const points = 850;
    const nextReward = 1000;
    const rewardProgress = (points / nextReward) * 100;

    const handleClaim = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#D4A373', '#ffffff', '#000000']
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
                <header className="pt-10 mb-12">
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-primary mb-4">BrewPoints</h1>
                    <p className="text-primary/60 text-lg">You're making great progress towards your next reward!</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-12">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative overflow-hidden bg-[#1a1a1a] dark:bg-black/40 border border-primary/20 p-8 md:p-12 rounded-[2rem] text-white shadow-2xl"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                                <div className="text-center md:text-left">
                                    <div className="flex items-center justify-center md:justify-start gap-2 text-primary font-bold uppercase tracking-widest text-xs mb-4">
                                        <Award size={16} />
                                        Gold Brewer Status
                                    </div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-7xl md:text-9xl font-display font-bold mb-4 text-primary"
                                    >
                                        {points}
                                    </motion.div>
                                    <div className="text-xl font-medium opacity-80">Available Points</div>
                                </div>

                                <div className="w-full md:w-96 space-y-6">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="font-bold text-primary">Next Reward</span>
                                        <span className="text-sm opacity-60">{points} / {nextReward} pts</span>
                                    </div>
                                    <div className="relative h-4 bg-white/10 rounded-full overflow-hidden border border-white/5">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${rewardProgress}%` }}
                                            transition={{ duration: 1.5, ease: "circOut" }}
                                            className="absolute inset-0 bg-primary shadow-[0_0_10px_rgba(212,163,115,0.5)]"
                                        />
                                    </div>
                                    <p className="text-center text-sm opacity-60">Just {nextReward - points} points away from a free drink!</p>
                                    <Button className="w-full py-7 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-lg shadow-lg shadow-primary/20">
                                        Redeem Points
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:col-span-12">
                        <h3 className="text-2xl font-display font-bold mb-8 text-primary">Claimable Rewards</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {rewardsGrid.map((reward, i) => (
                                <motion.div
                                    key={reward.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className={cn(
                                        "p-6 rounded-3xl border transition-all duration-300 group cursor-pointer flex flex-col items-center text-center",
                                        reward.unlocked
                                            ? "glass-card border-primary/10 hover:border-primary/30"
                                            : "opacity-50 grayscale border-transparent bg-secondary/50"
                                    )}
                                >
                                    <div className={cn(
                                        "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-6",
                                        reward.unlocked ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                                    )}>
                                        {reward.icon}
                                    </div>
                                    <h4 className="text-lg font-bold mb-2 text-foreground">{reward.title}</h4>
                                    <p className="text-sm text-muted-foreground mb-6">{reward.description}</p>
                                    <div className="mt-auto flex flex-col items-center gap-4 w-full">
                                        <span className="text-lg font-bold text-primary">{reward.points} <span className="text-xs opacity-60 uppercase">pts</span></span>
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
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};
