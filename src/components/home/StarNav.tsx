"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";

export function StarNav() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const navLinks = [
    { name: "Home", target: "home", isRoute: false },
    { name: "Events", target: "events", isRoute: false },
    { name: "Hackathon", target: "hackathon", isRoute: false },
    { name: "Blogs", target: "blogs", isRoute: false },
    { name: "Mission", target: "mission", isRoute: false },
    { name: "Team", target: "team", isRoute: false },
    { name: "Network", target: "network", isRoute: false },
  ];

  const handleNavClick = (link: typeof navLinks[0]) => {
    setIsOpen(false);
    
    setTimeout(() => {
      if (link.isRoute) {
        router.push(link.target);
      } else {
        const element = document.getElementById(link.target);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, 300);
  };

  return (
    <div className="fixed top-6 left-6 z-[100] flex items-center">
      {/* The Star Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        className="relative z-10 p-3 bg-slate-900/60 backdrop-blur-md border border-cyan-500/30 rounded-full shadow-[0_0_15px_rgba(14,165,233,0.3)] hover:shadow-[0_0_25px_rgba(14,165,233,0.6)] cursor-pointer flex items-center justify-center overflow-hidden group"
      >
        <Star className="text-cyan-400 w-6 h-6 group-hover:text-cyan-300 transition-colors" />
        <div className="absolute inset-0 bg-cyan-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.button>

      {/* The Horizontal Expanding Navigation Bar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0, marginLeft: 0 }}
            animate={{ width: "auto", opacity: 1, marginLeft: 16 }}
            exit={{ width: 0, opacity: 0, marginLeft: 0 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            className="overflow-hidden flex items-center"
          >
            <div className="flex items-center space-x-2 bg-slate-900/60 backdrop-blur-md border border-cyan-500/30 px-6 py-3 rounded-full shadow-[0_0_15px_rgba(14,165,233,0.2)]">
              {navLinks.map((link, idx) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: idx * 0.05 + 0.1, duration: 0.3 }}
                  onClick={() => handleNavClick(link)}
                  className="px-4 py-1.5 text-sm font-medium text-slate-300 hover:text-cyan-300 hover:bg-slate-800/50 rounded-full transition-all tracking-wide"
                >
                  {link.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
