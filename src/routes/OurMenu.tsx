import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { CoffeeCard } from "@/components/coffee/CoffeeCard";
import { coffees } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categories = ["All", "Hot", "Iced", "Seasonal"] as const;

const ease = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
};

const cardItem = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease },
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
};

export const OurMenu = () => {
    const [category, setCategory] = useState<typeof categories[number]>("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filtered = coffees.filter((coffee) => {
        const matchCategory = category === "All" || coffee.category === category;
        const matchSearch = coffee.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchSearch;
    });

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
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="text-4xl md:text-6xl font-display font-bold text-primary mb-4"
                    >
                        Our Menu
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-primary/60 text-lg"
                    >
                        Discover your next favorite brew from our curated selection.
                    </motion.p>
                </motion.header>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.5 }}
                    className="flex flex-col md:flex-row gap-6 mb-12"
                >
                    <div className="flex gap-2 flex-wrap">
                        {categories.map((cat, i) => (
                            <motion.div
                                key={cat}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + i * 0.05 }}
                            >
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button
                                        variant={category === cat ? "default" : "outline"}
                                        onClick={() => setCategory(cat)}
                                        className={cn(
                                            "rounded-full px-6 h-12 font-bold transition-all duration-300",
                                            category === cat
                                                ? "shadow-lg shadow-primary/20"
                                                : "hover:bg-primary/5"
                                        )}
                                    >
                                        {cat}
                                    </Button>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="relative flex-grow max-w-sm">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30" size={20} />
                        <Input
                            placeholder="Search your brew..."
                            value={searchQuery}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                            className="pl-12 py-7 rounded-2xl border-primary/5 bg-primary/5 focus:bg-card focus:ring-accent/20 transition-all text-lg font-sans font-medium"
                        />
                    </div>
                </motion.div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={category + searchQuery}
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {filtered.map((coffee) => (
                            <motion.div key={coffee.id} variants={cardItem} layout>
                                <CoffeeCard coffee={coffee} />
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {filtered.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-20"
                    >
                        <p className="text-2xl font-display font-bold text-primary/30">No brews found</p>
                        <p className="text-primary/20 mt-2">Try a different search or category.</p>
                    </motion.div>
                )}
            </div>
        </PageTransition>
    );
};
