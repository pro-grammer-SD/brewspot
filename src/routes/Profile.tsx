import { motion } from "framer-motion";
import { Settings, History, MapPin, CreditCard, Package, ArrowRight } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ease = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 0.08 * i, duration: 0.5, ease },
    }),
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
};

const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease },
    },
};

export const Profile = () => {

    return (
        <PageTransition>
            <div className="px-4 md:px-8 max-w-7xl mx-auto pb-20">
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="pt-10 mb-12 flex flex-col md:flex-row items-center justify-between gap-8"
                >
                    <motion.div
                        custom={0}
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="flex items-center gap-6"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", bounce: 0.4, delay: 0.2 }}
                            className="w-20 h-20 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center text-3xl font-display font-bold text-primary-foreground shadow-lg"
                        >
                            JD
                        </motion.div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-display font-bold text-primary">John Doe</h1>
                            <p className="text-primary/40">Gold Member · Since 2024</p>
                        </div>
                    </motion.div>
                    <motion.div
                        custom={1}
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button variant="outline" className="rounded-full gap-2 font-bold h-12 px-6">
                                <Settings size={16} /> Edit Profile
                            </Button>
                        </motion.div>
                    </motion.div>
                </motion.header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <motion.div
                        className="lg:col-span-4 space-y-6"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                    >
                        {[
                            { icon: <History size={20} />, title: "Orders", subtitle: "23 total orders", value: "$342.50" },
                            { icon: <MapPin size={20} />, title: "Saved Address", subtitle: "123 Coffee Lane, NY", value: null },
                            { icon: <CreditCard size={20} />, title: "Payment", subtitle: "Visa ending 4242", value: null },
                        ].map((item) => (
                            <motion.div
                                key={item.title}
                                variants={staggerItem}
                                whileHover={{ scale: 1.02, x: 5 }}
                                className="glass-panel p-6 rounded-3xl flex flex-col md:flex-row gap-6 items-center group hover:bg-primary/5 transition-colors cursor-pointer"
                            >
                                <motion.div
                                    whileHover={{ rotate: 10 }}
                                    className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                                >
                                    {item.icon}
                                </motion.div>
                                <div className="flex-grow text-center md:text-left">
                                    <h3 className="font-bold text-primary">{item.title}</h3>
                                    <p className="text-sm text-primary/40">{item.subtitle}</p>
                                </div>
                                {item.value && <span className="font-bold text-accent">{item.value}</span>}
                                <ArrowRight className="text-primary/20 group-hover:text-primary transition-colors" />
                            </motion.div>
                        ))}
                    </motion.div>

                    <div className="lg:col-span-8 space-y-8">
                        <motion.div
                            custom={2}
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            className="glass-panel p-8 rounded-3xl"
                        >
                            <h2 className="text-2xl font-display font-bold text-primary mb-6">Account Settings</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { label: "Full Name", value: "John Doe" },
                                    { label: "Email", value: "john@example.com" },
                                    { label: "Phone", value: "+1 (555) 000-0000" },
                                    { label: "Birthday", value: "January 1, 1990" },
                                ].map((field, i) => (
                                    <motion.div
                                        key={field.label}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + i * 0.1 }}
                                        className="space-y-2"
                                    >
                                        <label className="text-xs font-bold uppercase tracking-widest text-primary/40">{field.label}</label>
                                        <Input defaultValue={field.value} className="h-14 rounded-xl bg-surface border-primary/10 focus:border-accent transition-colors" />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            custom={3}
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            className="glass-panel p-8 rounded-3xl"
                        >
                            <h2 className="text-2xl font-display font-bold text-primary mb-6">Preferences</h2>
                            <div className="space-y-6">
                                {[
                                    { title: "Email Notifications", desc: "Receive order updates and promotions" },
                                    { title: "Push Notifications", desc: "Get notified about new arrivals" },
                                    { title: "Dark Mode", desc: "Toggle between light and dark themes" },
                                ].map((pref, i) => (
                                    <motion.div
                                        key={pref.title}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 + i * 0.1 }}
                                        className="flex items-center justify-between py-4 border-b border-primary/5 last:border-0"
                                    >
                                        <div>
                                            <h4 className="font-bold text-primary">{pref.title}</h4>
                                            <p className="text-sm text-primary/40">{pref.desc}</p>
                                        </div>
                                        <motion.button
                                            whileTap={{ scale: 0.9 }}
                                            className="relative w-12 h-7 rounded-full bg-accent/20 transition-colors"
                                        >
                                            <div className="absolute right-1 top-1 w-5 h-5 bg-accent rounded-full shadow-sm transition-all" />
                                        </motion.button>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            custom={4}
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                        >
                            <div className="bg-secondary/50 p-6 rounded-3xl border border-border mb-8">
                                <div className="flex items-center gap-4">
                                    <Package className="text-accent" />
                                    <div>
                                        <h3 className="font-bold text-primary">Recent Order</h3>
                                        <p className="text-sm text-primary/40">Vanilla Oat Latte · Feb 12, 2026</p>
                                    </div>
                                </div>
                            </div>
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button className="w-full bg-primary text-primary-foreground hover:bg-accent h-14 rounded-2xl font-bold transition-all shadow-lg">
                                    Save Changes
                                </Button>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};
