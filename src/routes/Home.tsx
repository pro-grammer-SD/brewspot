import { motion } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { CoffeeCard } from "@/components/coffee/CoffeeCard";
import { coffees } from "@/data/mockData";

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
        transition: { staggerChildren: 0.12, delayChildren: 0.3 },
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

export const Home = () => {
    const featured = coffees.filter(c => c.bestSeller);

    return (
        <PageTransition>
            {/* Hero Section */}
            <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent pointer-events-none" />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent pointer-events-none"
                />
                <div className="container px-4 md:px-8 max-w-7xl mx-auto text-center relative z-10">
                    <motion.div
                        custom={0}
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-xs font-bold tracking-widest uppercase text-primary/60 mb-8"
                    >
                        <Sparkles size={14} className="text-accent" />
                        Artisan Coffee Experience
                    </motion.div>

                    <motion.h1
                        custom={1}
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="text-5xl sm:text-6xl md:text-8xl font-display font-bold text-primary leading-[0.9] mb-8"
                    >
                        Crafted with
                        <br />
                        <motion.span
                            initial={{ backgroundPosition: "0% 50%" }}
                            animate={{ backgroundPosition: "100% 50%" }}
                            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                            className="bg-gradient-to-r from-accent via-primary to-accent bg-[length:200%_auto] bg-clip-text text-transparent"
                        >
                            Passion
                        </motion.span>
                    </motion.h1>

                    <motion.p
                        custom={2}
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="text-lg md:text-2xl text-primary/40 max-w-2xl mx-auto mb-12 leading-relaxed"
                    >
                        Experience the finest single-origin beans, roasted to perfection and delivered to your door.
                    </motion.p>

                    <motion.div
                        custom={3}
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link to="/menu">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button size="lg" className="h-16 px-10 rounded-full text-lg gap-2 shadow-xl shadow-primary/20 font-bold">
                                    Start Brewing <ArrowRight size={20} />
                                </Button>
                            </motion.div>
                        </Link>
                        <Link to="/rewards">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button size="lg" variant="outline" className="h-16 px-10 rounded-full text-lg border-2 font-bold">
                                    Join Rewards
                                </Button>
                            </motion.div>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Featured Section */}
            <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center justify-between mb-12"
                >
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-2 text-accent text-xs font-bold tracking-widest uppercase mb-4"
                        >
                            <TrendingUp size={16} />
                            Top Picks
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-5xl font-display font-bold text-primary"
                        >
                            Featured Brews
                        </motion.h2>
                    </div>
                    <Link to="/menu">
                        <motion.div whileHover={{ scale: 1.05, x: 5 }} whileTap={{ scale: 0.95 }}>
                            <Button variant="ghost" className="text-primary/40 hover:text-primary gap-1 font-bold">
                                View All <ArrowRight size={16} />
                            </Button>
                        </motion.div>
                    </Link>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {featured.length > 0 ? featured.map((coffee) => (
                        <motion.div key={coffee.id} variants={staggerItem}>
                            <CoffeeCard coffee={coffee} />
                        </motion.div>
                    )) : coffees.slice(0, 4).map((coffee) => (
                        <motion.div key={coffee.id} variants={staggerItem}>
                            <CoffeeCard coffee={coffee} />
                        </motion.div>
                    ))}
                </motion.div>
            </section>
        </PageTransition>
    );
};
