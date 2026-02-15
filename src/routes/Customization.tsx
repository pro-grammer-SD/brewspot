import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Flame, Clock, Heart, ArrowRight } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { coffees } from "@/data/mockData";
import { Slider } from "@/components/ui/slider";
import { useCartStore } from "@/store/useCartStore";

const SIZES = ["S", "M", "L"] as const;
const MILKS = ["Whole Milk", "Oat Milk", "Almond Milk", "Soy Milk"] as const;
const ADDONS = [
    { id: "syrup", name: "Vanilla Syrup", price: 0.5 },
    { id: "caramel", name: "Caramel Drizzle", price: 0.75 },
    { id: "oat", name: "Extra Shot", price: 1.0 },
    { id: "cream", name: "Whipped Cream", price: 0.4 },
];

export const Customization = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const addItem = useCartStore((state) => state.addItem);

    const coffee = useMemo(() => coffees.find((c) => c.id === id) || coffees[0], [id]);

    const [size, setSize] = useState<typeof SIZES[number]>("M");
    const [milk, setMilk] = useState<typeof MILKS[number]>("Whole Milk");
    const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
    const [sweetness, setSweetness] = useState([50]);

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

    return (
        <PageTransition>
            <div className="px-4 md:px-8 max-w-7xl mx-auto pb-20 pt-10">
                <Button
                    variant="ghost"
                    onClick={() => navigate(-1)}
                    className="mb-8 rounded-2xl hover:bg-primary/5 group"
                >
                    <ChevronLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Menu
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                    <div className="lg:col-span-6">
                        <motion.div
                            layoutId={`image-${coffee.id}`}
                            className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl shadow-primary/20"
                        >
                            <img src={coffee.image} alt={coffee.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-x-8 bottom-8 flex justify-between">
                                <div className="px-6 py-4 bg-white/90 backdrop-blur-md rounded-3xl flex items-center gap-6 shadow-xl">
                                    <div className="flex flex-col items-center">
                                        <div className="text-accent mb-1"><Flame size={20} /></div>
                                        <span className="text-xs font-bold text-primary opacity-40 uppercase">Kcal</span>
                                        <span className="font-bold font-mono text-primary">240</span>
                                    </div>
                                    <div className="w-px h-8 bg-black/5" />
                                    <div className="flex flex-col items-center">
                                        <div className="text-accent mb-1"><Clock size={20} /></div>
                                        <span className="text-xs font-bold text-primary opacity-40 uppercase">Mins</span>
                                        <span className="font-bold font-mono text-primary">5-8</span>
                                    </div>
                                </div>
                                <Button size="icon" className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md hover:bg-white/40 text-white border border-white/20">
                                    <Heart size={28} />
                                </Button>
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:col-span-6 space-y-12">
                        <div>
                            <h1 className="text-4xl md:text-6xl font-display font-bold text-primary mb-4">{coffee.name}</h1>
                            <p className="text-xl text-primary/40 leading-relaxed max-w-xl">{coffee.description}</p>
                        </div>

                        <div className="space-y-12">
                            <section>
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    Choose Size
                                    <span className="text-xs text-primary/30 font-normal uppercase tracking-widest bg-primary/5 px-2 py-1 rounded-md ml-2">Required</span>
                                </h3>
                                <div className="flex gap-4">
                                    {SIZES.map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => setSize(s)}
                                            className={`flex-1 py-6 rounded-3xl border-2 transition-all font-bold text-xl ${size === s
                                                ? "border-accent bg-accent/5 text-accent shadow-lg shadow-accent/5"
                                                : "border-primary/5 bg-primary/5 text-primary/30 hover:border-primary/10"
                                                }`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h3 className="text-xl font-bold mb-6">Select Milk</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {MILKS.map((m) => (
                                        <button
                                            key={m}
                                            onClick={() => setMilk(m)}
                                            className={`py-5 px-6 rounded-2xl border transition-all text-sm font-bold ${milk === m
                                                ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                                                : "bg-white border-primary/10 text-primary/50 hover:bg-primary/5"
                                                }`}
                                        >
                                            <span className="relative z-10">{m}</span>
                                        </button>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-bold">Sweetness Level</h3>
                                    <span className="text-accent font-bold">{sweetness[0]}%</span>
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
                            </section>

                            <section>
                                <h3 className="text-xl font-bold mb-6">Add Extras</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {ADDONS.map((addon) => (
                                        <button
                                            key={addon.id}
                                            onClick={() => {
                                                setSelectedAddons(prev =>
                                                    prev.includes(addon.id) ? prev.filter(id => id !== addon.id) : [...prev, addon.id]
                                                );
                                            }}
                                            className={`p-5 rounded-3xl border transition-all flex items-center justify-between ${selectedAddons.includes(addon.id)
                                                ? "bg-accent/10 border-accent/20"
                                                : "bg-white border-primary/5 hover:border-primary/10"
                                                }`}
                                        >
                                            <div className="flex items-center gap-4 text-left">
                                                <div className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-colors ${selectedAddons.includes(addon.id) ? "bg-accent border-accent text-white" : "border-primary/10"
                                                    }`}>
                                                    {selectedAddons.includes(addon.id) && <ArrowRight size={14} />}
                                                </div>
                                                <span className={`font-bold ${selectedAddons.includes(addon.id) ? "text-primary" : "text-primary/50"}`}>
                                                    {addon.name}
                                                </span>
                                            </div>
                                            <span className="text-xs font-bold text-accent">+${addon.price.toFixed(2)}</span>
                                        </button>
                                    ))}
                                </div>
                            </section>
                        </div>

                        <div className="pt-8 border-t border-primary/5">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <span className="text-sm font-medium text-primary/40 uppercase tracking-widest">Total Price</span>
                                    <div className="text-4xl font-display font-bold text-primary">${totalPrice.toFixed(2)}</div>
                                </div>
                                <Button
                                    size="lg"
                                    onClick={handleAddToCart}
                                    className="h-20 px-12 rounded-[2.5rem] bg-primary hover:bg-accent text-xl font-bold gap-3 shadow-2xl shadow-primary/20 transition-all hover:scale-105 active:scale-95"
                                >
                                    Add to Bag
                                    <ArrowRight size={24} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};
