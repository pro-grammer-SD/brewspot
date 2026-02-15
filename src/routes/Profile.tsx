import { motion } from "framer-motion";
import { Settings, History, MapPin, CreditCard, Package, ArrowRight } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Profile = () => {

    return (
        <PageTransition>
            <div className="px-4 md:px-8 max-w-7xl mx-auto pb-20">
                <header className="pt-10 mb-12 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-8">
                        <div className="relative">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] bg-accent rotate-3 shadow-xl"></div>
                            <img
                                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6"
                                alt="User"
                                className="absolute inset-0 w-24 h-24 md:w-32 md:h-32 rounded-[2rem] object-cover -rotate-3 border-4 border-white shadow-2xl"
                            />
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-6xl font-display font-bold text-primary mb-2">Alex Johnson</h1>
                            <p className="text-primary/40 font-medium">Coffee Connoisseur • Gold Status</p>
                        </div>
                    </div>
                    <Button variant="outline" className="rounded-2xl gap-2 px-6 h-14 border-primary/10">
                        <Settings size={20} />
                        Account Settings
                    </Button>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 space-y-8">
                        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-primary/5 shadow-sm">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-display font-bold flex items-center gap-3">
                                    <History size={24} className="text-accent" />
                                    Recent Orders
                                </h3>
                                <Button variant="ghost" className="text-accent font-bold">View All</Button>
                            </div>

                            <section className="mt-12">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="space-y-1">
                                        <h3 className="text-2xl font-display font-bold text-primary">Recent Orders</h3>
                                        <p className="text-sm text-primary/40">Track and reorder your favorites</p>
                                    </div>
                                    <Button variant="link" className="text-accent font-bold">View All History</Button>
                                </div>

                                <div className="grid gap-6">
                                    {[1, 2].map((i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="glass-panel p-6 rounded-3xl flex flex-col md:flex-row gap-6 items-center group hover:bg-white/50 dark:hover:bg-zinc-900/50 transition-colors"
                                        >
                                            <div className="flex items-center gap-6 flex-grow w-full md:w-auto">
                                                <div className="w-20 h-20 bg-primary/5 rounded-2xl flex items-center justify-center text-primary/20 group-hover:scale-105 transition-transform">
                                                    <Package size={32} />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <h4 className="font-bold text-xl text-primary">Order #24{i}92</h4>
                                                        <span className="px-3 py-1 bg-green-500/10 text-green-600 rounded-lg text-xs font-bold uppercase tracking-wider">Delivered</span>
                                                    </div>
                                                    <p className="text-sm font-mono text-primary/40 mb-2">Oct {20 - i}, 2023 at 9:4{i} AM</p>
                                                    <p className="font-bold text-lg">$24.50</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                                                <Button className="rounded-xl px-6 bg-primary text-primary-foreground hover:bg-primary/90 font-bold shadow-lg shadow-primary/20">
                                                    Reorder
                                                </Button>
                                                <Button variant="outline" size="icon" className="rounded-xl border-primary/10">
                                                    <ArrowRight size={20} className="text-primary/40" />
                                                </Button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>

                            <section className="pt-12 mt-12 border-t border-primary/5">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                                        <Settings size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-display font-bold text-primary">Account Settings</h3>
                                        <p className="text-sm text-primary/40">Manage your preferences and details</p>
                                    </div>
                                </div>

                                <div className="glass-panel p-8 rounded-[2rem] space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-primary/40">Full Name</label>
                                            <Input defaultValue="Alex Johnson" className="h-14 rounded-xl bg-surface/50 border-primary/10" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-primary/40">Email</label>
                                            <Input defaultValue="alex@example.com" className="h-14 rounded-xl bg-surface/50 border-primary/10" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-primary/40">Notification Preferences</label>
                                        <div className="flex items-center gap-4 p-4 rounded-xl border border-primary/5 bg-primary/5">
                                            <div className="flex-grow">
                                                <h4 className="font-bold text-primary">Order Updates</h4>
                                                <p className="text-sm text-primary/40">Receive updates about your order status</p>
                                            </div>
                                            <div className="w-12 h-6 bg-accent rounded-full relative">
                                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-4 flex justify-end">
                                        <Button className="h-12 px-8 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90">
                                            Save Changes
                                        </Button>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-primary p-8 rounded-[2.5rem] text-primary-foreground">
                            <h3 className="text-xl font-display font-bold mb-6">Saved Payment</h3>
                            <div className="bg-white/10 p-6 rounded-3xl border border-white/10 mb-8">
                                <div className="flex justify-between items-start mb-10">
                                    <CreditCard size={32} />
                                    <span className="font-bold italic">VISA</span>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs opacity-40 uppercase tracking-widest font-bold">Card Number</p>
                                    <p className="text-lg font-bold font-mono tracking-widest">•••• •••• •••• 4242</p>
                                </div>
                            </div>
                            <Button className="w-full bg-white text-primary hover:bg-white/90 h-14 rounded-2xl font-bold">
                                Top Up Balance
                            </Button>
                        </div>

                        <div className="bg-white rounded-[2.5rem] p-8 border border-primary/5 shadow-sm">
                            <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-3">
                                <MapPin size={24} className="text-accent" />
                                Store Near You
                            </h3>
                            <div className="p-4 rounded-2xl bg-primary/5 mb-6">
                                <h4 className="font-bold mb-1">BrewSpot Central</h4>
                                <p className="text-sm text-primary/40">123 Artisan Ave, Coffee City</p>
                            </div>
                            <Button variant="outline" className="w-full h-14 rounded-2xl border-primary/10">Switch Store</Button>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};
