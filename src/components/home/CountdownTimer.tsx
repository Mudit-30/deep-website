"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0, hours: 0, minutes: 0, seconds: 0,
  });

  useEffect(() => {
    // DeepStation Next Event — set to April 29
    const targetTime = new Date("2026-04-29T00:00:00+05:30").getTime();

    const tick = () => {
      const now  = Date.now();
      const diff = targetTime - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick(); // immediate first tick avoids 1s blank flash
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: "Days",    value: timeLeft.days    },
    { label: "Hours",   value: timeLeft.hours   },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="relative py-24 w-full overflow-hidden bg-transparent">
      {/* Sonar rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="absolute w-[400px] h-[400px] border border-brand-500/20 rounded-full animate-sonar" style={{ borderColor: "rgba(14,140,228,0.2)" }} />
        <div className="absolute w-[400px] h-[400px] border border-brand-500/20 rounded-full animate-sonar" style={{ borderColor: "rgba(14,140,228,0.2)", animationDelay: "1s" }} />
        <div className="absolute w-[400px] h-[400px] border border-brand-500/20 rounded-full animate-sonar" style={{ borderColor: "rgba(14,140,228,0.2)", animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-bold tracking-[0.3em] uppercase block mb-8 text-white"
        >
          Next Mission Launches In
        </motion.span>

        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {timeUnits.map((unit) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="flex flex-col items-center"
            >
              <div
                className="w-24 h-24 md:w-32 md:h-32 glass-card rounded-2xl flex items-center justify-center mb-4 group hover:border-[#52A9F0]/60 transition-colors duration-500"
                style={{ borderColor: "rgba(24,134,202,0.3)", boxShadow: "0 0 30px rgba(24,134,202,0.2)" }}
              >
                <span
                  className="text-4xl md:text-6xl font-bold group-hover:transition-colors duration-500"
                  style={{ 
                    fontFamily: "var(--font-display)", 
                    color: unit.label === "Seconds" ? "#ef4444" : "white",
                    textShadow: unit.label === "Seconds" ? "0 0 15px rgba(239,68,68,0.3)" : "0 0 15px rgba(255,255,255,0.3)" 
                  }}
                >
                  {unit.value.toString().padStart(2, "0")}
                </span>
              </div>
              <span className="text-white text-sm font-bold uppercase tracking-widest">
                {unit.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
