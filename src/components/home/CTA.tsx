"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Mail, Users } from "lucide-react";

const SPRING = { ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

export function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="join"
      className="relative py-24 px-6 overflow-hidden bg-transparent"
    >
      {/* Grid dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #52A9F0 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="blob-orange w-[600px] h-[600px] bottom-0 right-0 opacity-20" />

      <div className="w-full px-6 md:px-16 lg:px-24 xl:px-32 mx-auto text-left relative z-10 py-12">
        {/* Top divider line */}
        <motion.div
          className="h-px mb-12"
          style={{
            background:
              "linear-gradient(90deg, #52A9F0 0%, #0e8ce4 40%, transparent)",
          }}
          initial={{ width: 0 }}
          animate={isInView ? { width: "16rem" } : { width: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ...SPRING }}
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ...SPRING }}
          className="rounded-[3rem] glass p-12 md:p-20 relative overflow-hidden group w-full"
        >
          {/* Hover glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background:
                "linear-gradient(to bottom right, rgba(14,140,228,0.1), transparent, rgba(99,102,241,0.1))",
            }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row justify-between lg:gap-24 items-center">
            {/* Left Column: Headline */}
            <div className="lg:w-1/2 w-full">
              <motion.span
                className="badge-orange mb-6 inline-block"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.85 }
                }
                transition={{
                  delay: 0.2,
                  duration: 0.5,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
              >
                🚀 Open Applications
              </motion.span>

              <div className="overflow-hidden mb-4 lg:mb-0">
                <motion.h2
                  className="font-bold text-5xl lg:text-7xl text-white leading-[1.1] tracking-tighter"
                  style={{ fontFamily: "var(--font-display)" }}
                  initial={{ y: "100%" }}
                  animate={isInView ? { y: "0%" } : { y: "100%" }}
                  transition={{ duration: 0.9, delay: 0.15, ...SPRING }}
                >
                  Ready to <br className="hidden lg:block" />
                  Shape the <br />
                  <span className="text-gradient">Future of AI?</span>
                </motion.h2>
              </div>
            </div>

            {/* Right Column: Descriptions & Actions */}
            <div className="lg:w-[45%] w-full flex flex-col justify-center">
              <motion.p
                className="text-white text-xl lg:text-2xl mb-10 max-w-xl leading-relaxed font-medium"
                initial={{ opacity: 0, y: 15 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }
                }
                transition={{ delay: 0.4, duration: 0.7, ...SPRING }}
              >
                Join the official DeepStation x MSRIT chapter. Get access to
                exclusive workshops, mentors, compute resources, and a 4,000+
                global AI network.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row flex-wrap gap-6 justify-start"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.9 }
                }
                transition={{
                  delay: 0.55,
                  duration: 0.6,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
              >
                <a
                  href="#join"
                  className="btn-outline flex items-center gap-2 transition-all hover:bg-white/10"
                >
                  <Users
                    className="w-5 h-5 flex-shrink-0"
                    style={{ color: "#38a9f8" }}
                  />
                  <span className="whitespace-nowrap">Join Community</span>
                </a>

                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdtFhE22FG7EMhEPWN0l3PWw8EiKSxaTTpRttpONatOQzKH5Q/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-3 bg-[#ef4444] hover:bg-[#ff5f5f] text-white text-lg px-10 py-5 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:shadow-[0_0_40px_rgba(239,68,68,0.7)] active:scale-95 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Apply as Sponsor
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Bottom divider */}
        <motion.div
          className="h-px mt-12"
          style={{
            background:
              "linear-gradient(90deg, #0e8ce4 0%, #52A9F0 40%, transparent)",
          }}
          initial={{ width: 0 }}
          animate={isInView ? { width: "8rem" } : { width: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ...SPRING }}
        />
      </div>
    </section>
  );
}
