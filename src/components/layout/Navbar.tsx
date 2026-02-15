import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useUIStore } from "@/store/useUIStore";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const cartItems = useCartStore((state) => state.items);
    const { toggleCart, toggleMobileMenu, isMobileMenuOpen } = useUIStore();

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Menu", path: "/menu" },
        { name: "Rewards", path: "/rewards" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 py-4 md:px-8",
                scrolled ? "bg-background/80 backdrop-blur-xl border-b border-primary/5 py-3" : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <motion.div
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20"
                    >
                        <Coffee size={28} />
                    </motion.div>
                    <span className="text-2xl font-display font-bold tracking-tight text-primary">
                        BrewSpot
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary/70 relative py-1",
                                location.pathname === link.path ? "text-primary" : "text-primary/50"
                            )}
                        >
                            {link.name}
                            {location.pathname === link.path && (
                                <motion.div
                                    layoutId="nav-underline"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                                />
                            )}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 md:gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full hover:bg-primary/5"
                        onClick={() => window.location.href = '/menu?focus=true'}
                    >
                        <Search size={20} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full hover:bg-primary/5 relative"
                        onClick={toggleCart}
                    >
                        <ShoppingBag size={20} />
                        <AnimatePresence>
                            {cartCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-background"
                                >
                                    {cartCount}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </Button>
                    <Link to="/profile">
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/5 hidden md:flex">
                            <User size={20} />
                        </Button>
                    </Link>
                    <ModeToggle />
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full md:hidden hover:bg-primary/5"
                        onClick={toggleMobileMenu}
                    >
                        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </Button>
                </div>
            </div>
            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 top-[72px] z-40 bg-background/95 backdrop-blur-xl md:hidden flex flex-col p-6 border-t border-primary/5"
                    >
                        <div className="flex flex-col gap-4 mt-4">
                            {navLinks.map((link, i) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={toggleMobileMenu}
                                >
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className={cn(
                                            "text-3xl font-display font-bold py-4 border-b border-primary/5 transition-colors",
                                            location.pathname === link.path ? "text-primary" : "text-primary/40 hover:text-primary"
                                        )}
                                    >
                                        {link.name}
                                    </motion.div>
                                </Link>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="mt-8 flex gap-4"
                            >
                                <Button className="flex-1 h-14 text-lg font-bold rounded-xl" onClick={() => { window.location.href = '/profile'; toggleMobileMenu(); }}>
                                    <User className="mr-2" />
                                    Profile
                                </Button>
                                <Button variant="outline" className="flex-1 h-14 text-lg font-bold rounded-xl border-primary/10" onClick={() => { window.location.href = '/menu'; toggleMobileMenu(); }}>
                                    <ShoppingBag className="mr-2" />
                                    Cart ({cartCount})
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
