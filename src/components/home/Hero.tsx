"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Globe, Users } from "lucide-react";
import gsap from "gsap";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1.8 }); // after preloader

    if (titleRef.current) {
      tl.fromTo(
        titleRef.current.children,
        { opacity: 0, y: 40, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.2,
          ease: "power4.out",
        },
      );
    }
    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.8",
      );
    }
    if (buttonsRef.current) {
      tl.fromTo(
        buttonsRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        "-=0.6",
      );
    }
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-20"
    >
      <motion.div
        style={{ opacity, y: textY }}
        className="relative z-10 w-full px-4 md:px-6 lg:px-8 xl:px-12 text-left pointer-events-none flex flex-col lg:flex-row lg:justify-between items-center flex-wrap"
      >
        {/* Left Column: Text */}
        <div className="lg:w-[45%] w-full">
          {/* Headline */}
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <div
              className="text-white"
              style={{ textShadow: "0 0 30px rgba(255,255,255,0.2)" }}
            >
              DeepStation<span style={{ color: "#ef4444" }}>RIT</span>
            </div>
          </h1>
        </div>

        {/* Right Column: Descriptions & Actions */}
        <div className="lg:w-[35%] w-full flex flex-col justify-center items-end relative mt-16 lg:mt-0 pointer-events-auto text-right lg:pr-12">
          {/* Subtext */}
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed"
          >
            The official autonomous college chapter of the global DeepStation
            community. Join elite hackathons, expert-led sessions, and hands-on
            workshops shaping the future of AI at Ramaiah Institute of
            Technology.
          </p>

          {/* Buttons */}
          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row items-center justify-end gap-6 pointer-events-auto w-full"
          >
            <a
              href="#about"
              className="btn-primary group flex items-center gap-2"
            >
              <Globe className="w-5 h-5" />
              Explore Station
            </a>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdCCnxEaXhdrlBF413okiHch_0DbDmwmzaG11hdM46KgapgGg/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline flex items-center gap-2 transition-all hover:bg-white/10 group"
            >
              <span className="flex items-center gap-2 whitespace-nowrap">
                Apply as Volunteer
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
              </span>
            </a>
            {/* <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdCCnxEaXhdrlBF413okiHch_0DbDmwmzaG11hdM46KgapgGg/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 min-w-max bg-[#38a9f8] hover:bg-[#52A9F0] text-white text-lg px-10 pr-12 py-5 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(56,169,248,0.4)] hover:shadow-[0_0_40px_rgba(56,169,248,0.7)] active:scale-95 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
                Apply as Volunteer
                <ArrowRight className="w-5 h-5 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
              </span>

              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </a> */}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
