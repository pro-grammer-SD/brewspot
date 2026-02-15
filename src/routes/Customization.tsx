import { useState, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Flame, Clock, Heart, ArrowRight } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { coffees } from "@/data/mockData";
import { Slider } from "@/components/ui/slider";
import { useCartStore } from "@/store/useCartStore";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import { FavoriteToast } from "@/components/ui/FavoriteToast";

const SIZES = ["S", "M", "L"] as const;
const MILKS = ["Whole Milk", "Oat Milk", "Almond Milk", "Soy Milk"] as const;
const ADDONS = [
    { id: "syrup", name: "Vanilla Syrup", price: 0.5 },
    { id: "caramel", name: "Caramel Drizzle", price: 0.75 },
    { id: "oat", name: "Extra Shot", price: 1.0 },
    { id: "cream", name: "Whipped Cream", price: 0.4 },
];

const ease = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 0.15 * i, duration: 0.5, ease },
    }),
};

export const Customization = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const addItem = useCartStore((state) => state.addItem);
    const { toggleFavorite, isFavorite } = useFavoritesStore();

    const coffee = useMemo(() => coffees.find((c) => c.id === id) || coffees[0], [id]);

    const [size, setSize] = useState<typeof SIZES[number]>("M");
    const [milk, setMilk] = useState<typeof MILKS[number]>("Whole Milk");
    const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
    const [sweetness, setSweetness] = useState([50]);
    const [showToast, setShowToast] = useState(false);
    const [toastFavorited, setToastFavorited] = useState(false);

    const favorited = isFavorite(coffee.id);

    const totalPrice = useMemo(() => {
        let total = coffee.price;
        if (size === "S") total -= 0.5;
        if (size === "L") total += 0.75;

        selectedAddons.forEach((addonId) => {
            const addon = ADDONS.find((a) => a.id === addonId);
            if (addon) total += addon.price;
        });

        return total;
    }, [coffee, size, selectedAddons]);

    const handleAddToCart = () => {
        addItem({
            id: Math.random().toString(36).substr(2, 9),
            coffeeId: coffee.id,
            name: coffee.name,
            price: totalPrice,
            image: coffee.image,
            quantity: 1,
            size,
            milk,
            addons: selectedAddons,
        });
        navigate(-1);
    };

    const handleToggleFavorite = useCallback(() => {
        const willBeFavorited = !favorited;
        toggleFavorite(coffee.id);
        setToastFavorited(willBeFavorited);
        setShowToast(true);
    }, [favorited, coffee.id, toggleFavorite]);

    return (
        <PageTransition>
            <div className="px-4 md:px-8 max-w-7xl mx-auto pb-20 pt-10">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Button
                        variant="ghost"
                        onClick={() => navigate(-1)}
                        className="mb-8 rounded-2xl hover:bg-primary/5 group"
                    >
                        <ChevronLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Menu
                    </Button>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                    <motion.div
                        className="lg:col-span-6"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        <motion.div
                            layoutId={`image-${coffee.id}`}
                            className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl shadow-primary/20"
                        >
                            <img src={coffee.image} alt={coffee.name} className="w-full h-full object-cover" />
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="absolute inset-x-8 bottom-8 flex justify-between"
                            >
                                <div className="px-6 py-4 bg-background/90 backdrop-blur-md rounded-3xl flex items-center gap-6 shadow-xl border border-border/50">
                                    <div className="flex flex-col items-center">
                                        <div className="text-accent mb-1"><Flame size={20} /></div>
                                        <span className="text-xs font-bold text-primary opacity-40 uppercase">Kcal</span>
                                        <span className="font-bold font-mono text-primary">240</span>
                                    </div>
                                    <div className="w-px h-8 bg-border" />
                                    <div className="flex flex-col items-center">
                                        <div className="text-accent mb-1"><Clock size={20} /></div>
                                        <span className="text-xs font-bold text-primary opacity-40 uppercase">Mins</span>
                                        <span className="font-bold font-mono text-primary">5-8</span>
                                    </div>
                                </div>
                                <motion.div whileTap={{ scale: 0.85 }} whileHover={{ scale: 1.1 }}>
                                    <Button
                                        size="icon"
                                        onClick={handleToggleFavorite}
                                        className={`w-16 h-16 rounded-3xl backdrop-blur-md border transition-all duration-300 ${favorited
                                            ? "bg-red-500/20 border-red-500/40 text-red-500 hover:bg-red-500/30"
                                            : "bg-background/20 border-border/20 text-foreground hover:bg-background/40"
                                            }`}
                                    >
                                        <motion.div
                                            key={favorited ? "filled" : "empty"}
                                            initial={{ scale: 0, rotate: -30 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ type: "spring", bounce: 0.6 }}
                                        >
                                            <Heart size={28} className={favorited ? "fill-red-500" : ""} />
                                        </motion.div>
                                    </Button>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    <div className="lg:col-span-6 space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <h1 className="text-4xl md:text-6xl font-display font-bold text-primary mb-4">{coffee.name}</h1>
                            <p className="text-xl text-primary/40 leading-relaxed max-w-xl">{coffee.description}</p>
                        </motion.div>

                        <div className="space-y-12">
                            <motion.section custom={1} variants={sectionVariants} initial="hidden" animate="visible">
                                <h3 className="text-xl font-sans font-bold mb-6 flex items-center gap-2">
                                    Choose Size
                                    <span className="text-xs text-primary/30 font-normal uppercase tracking-widest bg-primary/5 px-2 py-1 rounded-md ml-2">Required</span>
                                </h3>
                                <div className="flex gap-4">
                                    {SIZES.map((s) => (
                                        <motion.button
                                            key={s}
                                            onClick={() => setSize(s)}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`flex-1 py-6 rounded-3xl border-2 transition-all font-bold text-xl ${size === s
                                                ? "border-accent bg-accent/5 text-accent shadow-lg shadow-accent/5"
                                                : "border-border bg-secondary text-primary/30 hover:border-primary/10"
                                                }`}
                                        >
                                            {s}
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.section>

                            <motion.section custom={2} variants={sectionVariants} initial="hidden" animate="visible">
                                <h3 className="text-xl font-sans font-bold mb-6">Select Milk</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {MILKS.map((m) => (
                                        <motion.button
                                            key={m}
                                            onClick={() => setMilk(m)}
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            className={`py-5 px-6 rounded-2xl border transition-all text-sm font-sans font-bold ${milk === m
                                                ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                                                : "bg-secondary border-border text-primary/50 hover:bg-primary/5"
                                                }`}
                                        >
                                            <span className="relative z-10">{m}</span>
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.section>

                            <motion.section custom={3} variants={sectionVariants} initial="hidden" animate="visible">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-sans font-bold">Sweetness Level</h3>
                                    <motion.span
                                        key={sweetness[0]}
                                        initial={{ scale: 1.3, color: "hsl(var(--accent))" }}
                                        animate={{ scale: 1, color: "hsl(var(--accent))" }}
                                        className="text-accent font-bold"
                                    >
                                        {sweetness[0]}%
                                    </motion.span>
                                </div>
                                <div className="px-2">
                                    <Slider
                                        value={sweetness}
                                        onValueChange={setSweetness}
                                        max={100}
                                        step={25}
                                        className="cursor-pointer"
                                    />
                                </div>
                                <div className="flex justify-between mt-4 text-[10px] font-bold text-primary/30 uppercase tracking-widest">
                                    <span>Unsweet</span>
                                    <span>Light</span>
                                    <span>Balanced</span>
                                    <span>Extra</span>
                                </div>
                            </motion.section>

                            <motion.section custom={4} variants={sectionVariants} initial="hidden" animate="visible">
                                <h3 className="text-xl font-sans font-bold mb-6">Add Extras</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {ADDONS.map((addon) => (
                                        <motion.button
                                            key={addon.id}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => {
                                                setSelectedAddons(prev =>
                                                    prev.includes(addon.id) ? prev.filter(id => id !== addon.id) : [...prev, addon.id]
                                                );
                                            }}
                                            className={`p-5 rounded-3xl border transition-all flex items-center justify-between font-sans ${selectedAddons.includes(addon.id)
                                                ? "bg-accent/10 border-accent/20"
                                                : "bg-secondary border-border hover:border-primary/10"
                                                }`}
                                        >
                                            <div className="flex items-center gap-4 text-left">
                                                <motion.div
                                                    animate={{ scale: selectedAddons.includes(addon.id) ? 1 : 0.9, backgroundColor: selectedAddons.includes(addon.id) ? "hsl(var(--accent))" : "transparent" }}
                                                    className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-colors ${selectedAddons.includes(addon.id) ? "bg-accent border-accent text-white" : "border-primary/10"
                                                        }`}>
                                                    {selectedAddons.includes(addon.id) && <ArrowRight size={14} />}
                                                </motion.div>
                                                <span className={`font-bold ${selectedAddons.includes(addon.id) ? "text-primary" : "text-primary/50"}`}>
                                                    {addon.name}
                                                </span>
                                            </div>
                                            <span className="text-xs font-bold text-accent">+${addon.price.toFixed(2)}</span>
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.section>
                        </div>

                        <motion.div
                            custom={5}
                            variants={sectionVariants}
                            initial="hidden"
                            animate="visible"
                            className="pt-8 border-t border-primary/5"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <span className="text-sm font-medium text-primary/40 uppercase tracking-widest">Total Price</span>
                                    <motion.div
                                        key={totalPrice}
                                        initial={{ scale: 1.1 }}
                                        animate={{ scale: 1 }}
                                        className="text-4xl font-display font-bold text-primary"
                                    >
                                        ${totalPrice.toFixed(2)}
                                    </motion.div>
                                </div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button
                                        size="lg"
                                        onClick={handleAddToCart}
                                        className="h-20 px-12 rounded-[2.5rem] bg-primary hover:bg-accent text-xl font-sans font-bold gap-3 shadow-2xl shadow-primary/20 transition-all"
                                    >
                                        Add to Bag
                                        <ArrowRight size={24} />
                                    </Button>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <FavoriteToast
                show={showToast}
                isFavorited={toastFavorited}
                coffeeName={coffee.name}
                onClose={() => setShowToast(false)}
            />
        </PageTransition>
    );
};
