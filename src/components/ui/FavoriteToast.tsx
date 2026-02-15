import { motion, AnimatePresence } from "framer-motion";
import { Heart, HeartOff } from "lucide-react";
import { useEffect, useState } from "react";

interface FavoriteToastProps {
    show: boolean;
    isFavorited: boolean;
    coffeeName: string;
    onClose: () => void;
}

export const FavoriteToast = ({ show, isFavorited, coffeeName, onClose }: FavoriteToastProps) => {
    const [visible, setVisible] = useState(show);

    useEffect(() => {
        if (show) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
                onClose();
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl bg-background/95 backdrop-blur-xl border border-border shadow-2xl"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", bounce: 0.6, delay: 0.1 }}
                    >
                        {isFavorited ? (
                            <Heart size={24} className="fill-red-500 text-red-500" />
                        ) : (
                            <HeartOff size={24} className="text-muted-foreground" />
                        )}
                    </motion.div>
                    <div>
                        <p className="font-sans font-bold text-foreground">
                            {isFavorited ? "Added to Favorites" : "Removed from Favorites"}
                        </p>
                        <p className="text-xs text-muted-foreground font-sans">{coffeeName}</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
