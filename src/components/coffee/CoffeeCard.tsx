import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Settings2 } from "lucide-react";
import { Coffee } from "@/data/mockData";
import { Button } from "@/components/ui/button";

interface CoffeeCardProps {
    coffee: Coffee;
}

export const CoffeeCard = ({ coffee }: CoffeeCardProps) => {
    return (
        <Link to={`/customize/${coffee.id}`}>
            <motion.div
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.98 }}
                className="group glass-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full"
            >
                <div className="relative aspect-[4/5] overflow-hidden">
                    <motion.img
                        transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
                        whileHover={{ scale: 1.1 }}
                        src={coffee.image}
                        alt={coffee.name}
                        className="w-full h-full object-cover"
                    />
                    {coffee.bestSeller && (
                        <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider text-primary shadow-sm border border-border/50">
                            Best Seller
                        </div>
                    )}
                </div>

                <div className="p-5 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-display font-bold text-primary group-hover:text-accent transition-colors">
                            {coffee.name}
                        </h3>
                        <div className="flex items-center gap-1 text-sm font-medium">
                            <Star size={14} className="fill-yellow-400 text-yellow-400" />
                            <span>{coffee.rating}</span>
                        </div>
                    </div>

                    <p className="text-sm text-primary/60 line-clamp-2 mb-6">
                        {coffee.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                        <span className="text-xl font-bold text-primary">${coffee.price.toFixed(2)}</span>
                        <Button
                            size="icon"
                            className="rounded-xl w-10 h-10 bg-primary group-hover:bg-accent transition-all shadow-lg shadow-primary/20 group-hover:shadow-accent/30"
                        >
                            <Settings2 size={20} />
                        </Button>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};
