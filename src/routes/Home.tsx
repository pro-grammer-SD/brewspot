import { motion } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { CoffeeCard } from "@/components/coffee/CoffeeCard";
import { coffees } from "@/data/mockData";

export const Home = () => {
    const featured = coffees.filter(c => c.bestSeller);

    return (
        <PageTransition>
            <div className="px-4 md:px-8 max-w-7xl mx-auto pb-20">
                <section className="relative pt-10 pb-20 md:pt-20 md:pb-32 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full text-primary font-bold text-sm mb-8"
                    >
                        <Sparkles size={16} className="text-accent" />
                        Seasonal Blends Now Available
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-display font-bold text-primary leading-[0.9] tracking-tight mb-8"
                    >
                        Your Perfect Brew, <br />
                        <span className="text-accent italic">Delivered.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="max-w-2xl text-lg md:text-xl text-primary/60 mb-12"
                    >
                        Artisanal coffee sourced from the finest beans, roasted with intention, and brought straight to your doorstep.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Link to="/menu">
                            <Button size="lg" className="h-16 px-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-xl font-bold gap-2 shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                                Start Brewing
                                <ArrowRight size={20} />
                            </Button>
                        </Link>
                        <Link to="/rewards">
                            <Button size="lg" variant="outline" className="h-16 px-10 rounded-full border-2 border-primary/20 text-primary text-xl font-bold gap-2 hover:bg-primary/5 transition-all hover:scale-105 active:scale-95">
                                Join Rewards
                            </Button>
                        </Link>
                    </motion.div>
                </section>

                <section className="pt-20">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <div className="flex items-center gap-2 text-accent font-bold mb-2 uppercase tracking-widest text-xs">
                                <TrendingUp size={16} />
                                Popular Now
                            </div>
                            <h2 className="text-3xl md:text-5xl font-display font-bold">Featured Picks</h2>
                        </div>
                        <Link to="/menu">
                            <Button variant="link" className="text-primary font-bold gap-1 text-lg">
                                View All
                                <ArrowRight size={20} />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {featured.map((coffee, i) => (
                            <motion.div
                                key={coffee.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <CoffeeCard coffee={coffee} />
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};
