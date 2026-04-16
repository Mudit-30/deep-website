import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set target date to April 29
    const targetTime = new Date("2026-04-29T00:00:00+05:30").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: "Days", value: timeLeft.days, id: "days" },
    { label: "Hours", value: timeLeft.hours, id: "hours" },
    { label: "Minutes", value: timeLeft.minutes, id: "minutes" },
    { label: "Seconds", value: timeLeft.seconds, id: "seconds" },
  ];

  return (
    <section className="relative py-24 w-full overflow-hidden bg-transparent">
      {/* Sonar Ring Animation Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="absolute w-[400px] h-[400px] border border-brand-500/20 rounded-full animate-sonar" />
        <div className="absolute w-[400px] h-[400px] border border-brand-500/20 rounded-full animate-sonar" style={{ animationDelay: "1s" }} />
        <div className="absolute w-[400px] h-[400px] border border-brand-500/20 rounded-full animate-sonar" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#52A9F0] text-xs font-bold tracking-[0.3em] uppercase block mb-8"
        >
          Next Mission Launches In
        </motion.span>

        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {timeUnits.map((unit) => (
            <motion.div
              key={unit.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="flex flex-col items-center"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 glass-card rounded-2xl flex items-center justify-center mb-4 border-[#1886CA]/30 shadow-[0_0_30px_rgba(24,134,202,0.2)] group hover:border-[#52A9F0]/60 transition-colors duration-500">
                <span className="text-4xl md:text-6xl font-display font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] group-hover:text-[#52A9F0] transition-colors duration-500">
                  {unit.value.toString().padStart(2, "0")}
                </span>
              </div>
              <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">
                {unit.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
