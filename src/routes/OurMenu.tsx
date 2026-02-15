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

export const OurMenu = () => {
    const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredCoffees = coffees.filter((c) => {
        const matchesCategory = selectedCategory === "All" || c.category === selectedCategory;
        const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <PageTransition>
            <div className="px-4 md:px-8 max-w-7xl mx-auto pb-20">
                <header className="pt-10 mb-12">
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-primary mb-8">Our Menu</h1>

                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="flex w-full md:w-auto bg-primary/5 p-1.5 rounded-2xl overflow-x-auto no-scrollbar">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={cn(
                                        "relative px-6 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap z-0",
                                        selectedCategory === cat ? "text-primary-foreground" : "text-primary/50 hover:text-primary"
                                    )}
                                >
                                    {selectedCategory === cat && (
                                        <motion.div
                                            layoutId="category-pill"
                                            className="absolute inset-0 bg-primary rounded-xl -z-10 shadow-lg shadow-primary/20"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="relative w-full md:w-96 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-accent transition-colors" size={20} />
                            <Input
                                autoFocus={window.location.search.includes('focus=true')}
                                placeholder="Search your brew..."
                                value={searchQuery}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                                className="pl-12 py-7 rounded-2xl border-primary/5 bg-primary/5 focus:bg-white focus:ring-accent/20 transition-all text-lg font-medium"
                            />
                        </div>
                    </div>
                </header>

                <AnimatePresence mode="popLayout">
                    {filteredCoffees.length > 0 ? (
                        <motion.div
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
                        >
                            {filteredCoffees.map((coffee) => (
                                <motion.div
                                    key={coffee.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <CoffeeCard coffee={coffee} />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="py-32 flex flex-col items-center text-center"
                        >
                            <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mb-6">
                                <Search size={32} className="text-primary/10" />
                            </div>
                            <h3 className="text-2xl font-bold text-primary mb-2">No results found</h3>
                            <p className="text-primary/40">Try searching for something else or explore all categories.</p>
                            <Button
                                variant="outline"
                                className="mt-6 rounded-xl border-primary/10"
                                onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                            >
                                Clear all filters
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </PageTransition>
    );
};
