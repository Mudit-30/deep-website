"use client";

import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useState } from "react";

// ── Static imports ─────────────────────────────────────────────
import { Preloader }       from "@/components/home/Preloader";
import { Hero }            from "@/components/home/Hero";
import { CountdownTimer }  from "@/components/home/CountdownTimer";
import { ExploreTicker }   from "@/components/home/ExploreTicker";
import { About }           from "@/components/home/About";
import { Events }          from "@/components/home/Events";
import { MissionArchive }  from "@/components/home/MissionArchive";
import { Team }            from "@/components/home/Team";
import { CTA }             from "@/components/home/CTA";
import { Footer }          from "@/components/home/Footer";
import { StarNav }         from "@/components/home/StarNav";

// ── Dynamic import: Three.js scene must NOT run on server ──────
const PlanetScene = dynamic(() => import("@/components/three/PlanetScene"), {
  ssr: false,
  loading: () => null,
});

const Testimonials = dynamic(() => import("@/components/home/Testimonials").then(m => m.Testimonials), {
  ssr: false,
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* ── Preloader ─── */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
      

      <main className="relative min-h-screen bg-[#020617] text-slate-200 overflow-x-hidden">
        {/* ── Scroll progress bar ── */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 origin-left z-[60]"
          style={{ scaleX, background: "#0e8ce4" }}
        />

        {/* ── Fixed UI Overlay Elements ── */}
        <StarNav />

        {/* ── Nebula galaxy background (CSS) ── */}
        <div className="fixed inset-0 z-[-10] pointer-events-none overflow-hidden">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, #0c1b3d 0%, #020617 100%)" }} />
          {/* Nebula clouds */}
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full opacity-40"
            style={{ background: "rgba(37,99,235,0.1)", filter: "blur(150px)", animation: "pulse 4s ease-in-out infinite" }} />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full opacity-40"
            style={{ background: "rgba(99,102,241,0.1)", filter: "blur(150px)", animation: "pulse 4s ease-in-out infinite", animationDelay: "2s" }} />
          <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full opacity-30"
            style={{ background: "rgba(14,140,228,0.05)", filter: "blur(120px)", animation: "pulse 4s ease-in-out infinite", animationDelay: "4s" }} />
        </div>

        {/* ── 3D Planet Canvas (fixed background) ── */}
        <div className="fixed inset-0 z-10 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
            <PlanetScene scrollYProgress={scrollYProgress} />
          </Canvas>
        </div>

        {/* ── Page content ── */}
        {/* 1. Hero */}
        <section id="home" className="relative z-20 min-h-screen w-full flex flex-col justify-center"><Hero /></section>

        {/* 2. Countdown to next event */}
        <section id="hackathon" className="relative z-20 w-full"><CountdownTimer /></section>

        {/* 3. Scrolling AI topics ticker */}
        <section id="blogs" className="relative z-20 w-full"><ExploreTicker /></section>

        {/* 4. About + 3D feature cards + stats */}
        <section id="about" className="relative z-20 w-full"><About /></section>

        {/* 5. Events / Community Impact */}
        <section id="events" className="relative z-20 w-full"><Events /></section>

        {/* 6. Testimonials carousel (Crew Network) */}
        <section id="network" className="relative z-20 w-full"><Testimonials /></section>

        {/* 7. Mission Archive bento grid */}
        <section id="mission" className="relative z-20 w-full"><MissionArchive /></section>

        {/* 8. Team */}
        <section id="team" className="relative z-20 min-h-screen w-full flex flex-col justify-center"><Team /></section>

        {/* 9. CTA — Join Now */}
        <section className="relative z-20 min-h-screen w-full flex flex-col justify-center"><CTA /></section>

        {/* 10. Footer */}
        <section className="relative z-20 w-full flex flex-col justify-end"><Footer /></section>
      </main>
    </>
  );
}
