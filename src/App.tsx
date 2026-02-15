import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { CartDrawer } from "@/components/coffee/CartDrawer";
import { Home } from "@/routes/Home";
import { OurMenu } from "@/routes/OurMenu";
import { Rewards } from "@/routes/Rewards";
import { Profile } from "@/routes/Profile";
import { Customization } from "@/routes/Customization";
import { Checkout } from "@/routes/Checkout";

const AppContent = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background text-primary font-sans relative overflow-x-hidden">
      <Navbar />
      <CartDrawer />

      <main className="pt-20">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<OurMenu />} />
            <Route path="/customize/:id" element={<Customization />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Global Background Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] left-[-10%] w-[30%] h-[50%] bg-accent/5 blur-[120px] rounded-full" />
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
