import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp, Volume2, VolumeX, Play, Pause } from "lucide-react";
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
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);

    const toggleMute = useCallback(() => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(!isMuted);
        }
    }, [isMuted]);

    const togglePlayPause = useCallback(() => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsPlaying(true);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    }, []);

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

            {/* ── Cinematic Video Ad ── */}
            <section className="py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 60, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease }}
                    className="relative rounded-3xl overflow-hidden group"
                >
                    {/* Video – no native controls */}
                    <video
                        ref={videoRef}
                        src="/ad.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full aspect-video object-cover"
                    />

                    {/* Bottom gradient scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
                    {/* Side vignette */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 pointer-events-none" />

                    {/* Top-left badge */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.5, ease }}
                        className="absolute top-5 left-5 md:top-8 md:left-8 z-10"
                    >
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 text-white text-xs font-bold tracking-widest uppercase">
                            <motion.div
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-2 h-2 rounded-full bg-red-500"
                            />
                            Now Showing
                        </div>
                    </motion.div>

                    {/* Bottom-left text overlay */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6, duration: 0.6, ease }}
                        className="absolute bottom-6 left-5 md:bottom-10 md:left-8 z-10 max-w-lg"
                    >
                        <h3 className="text-2xl md:text-4xl font-display font-bold text-white leading-tight mb-2">
                            The BrewSpot Story
                        </h3>
                        <p className="text-sm md:text-base text-white/60 leading-relaxed">
                            From bean to cup — discover the craft behind every sip.
                        </p>
                    </motion.div>

                    {/* Bottom-right controls */}
                    <div className="absolute bottom-6 right-5 md:bottom-10 md:right-8 z-10 flex items-center gap-2">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={togglePlayPause}
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 flex items-center justify-center text-white transition-colors hover:bg-white/20 cursor-pointer"
                            aria-label={isPlaying ? "Pause" : "Play"}
                        >
                            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleMute}
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 flex items-center justify-center text-white transition-colors hover:bg-white/20 cursor-pointer"
                            aria-label={isMuted ? "Unmute" : "Mute"}
                        >
                            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                        </motion.button>
                    </div>

                    {/* Hover ring glow */}
                    <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10 group-hover:ring-accent/30 transition-all duration-700 pointer-events-none" />
                </motion.div>
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
