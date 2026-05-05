"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";

const SPRING = { ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

const events = [
  {
    icon: "🏆",
    tag: "Hackathon",
    tagColor: "badge-orange",
    title: "Google Hackathon w/ Sergey Brin",
    desc: 'Google co-founder Sergey Brin surprised 200+ hackers at our agentic AI sprint in March 2026. His verdict: "I see similar things in the Bay Area, and nothing like this level of enthusiasm."',
    img: "https://deepstation.ai/_next/image?url=%2Fimg%2Fgoogle-hackathon%2Fsergey-brin-deepstation.jpeg&w=1920&q=75",
    href: "https://deepstation.ai/hackathons",
    wide: true,
  },
  {
    icon: "🎤",
    tag: "Summit",
    tagColor: "badge-sky",
    title: "South Florida AI Summit",
    desc: "Expert speakers from Red Hat, Microsoft, and a16z shaped the future of AI at our flagship annual summit.",
    href: "https://deepstation.ai/south-florida-ai-summit",
    wide: false,
  },
  {
    icon: "📚",
    tag: "Education",
    tagColor: "badge-orange",
    title: "100+ Community Events",
    desc: "From hands-on workshops to expert presentations — we've hosted over 100 community-driven AI events worldwide.",
    href: "https://deepstation.ai",
    wide: false,
  },
  {
    icon: "🤖",
    tag: "Workshop",
    tagColor: "badge-purple",
    title: "Decoding the Agent with Crew AI",
    desc: "Join Ishan Dutta (Adobe, Ex-NVIDIA) for an exclusive session on decoding and building AI agents using Crew AI.",
    img: "/img/Decoding AI Agents Thumbnail (1).jpg.jpeg",
    href: "https://deepstation.ai",
    wide: false,
  },
];

export function Events() {
  const titleRef    = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  return (
    <section id="events" className="relative py-24 px-6 overflow-hidden bg-transparent">
      {/* Glow */}
      <div className="blob-sky w-[600px] h-[600px] -top-40 -right-20 opacity-20" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={titleRef} className="mb-14">
          <motion.span
            className="badge-sky mb-4 inline-block"
            initial={{ opacity: 0, x: -10 }}
            animate={titleInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ duration: 0.5, ...SPRING }}
          >
            🌟 Community Impact
          </motion.span>
          <div className="overflow-hidden">
            <motion.h2
              className="font-bold text-4xl lg:text-5xl text-white uppercase tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
              initial={{ y: "100%" }}
              animate={titleInView ? { y: "0%" } : { y: "100%" }}
              transition={{ duration: 0.85, delay: 0.1, ...SPRING }}
            >
              Things We&apos;ve Built.
            </motion.h2>
          </div>
        </div>

        {/* Event Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((ev, i) => (
            <motion.a
              key={ev.title}
              href={ev.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`card-happy group flex flex-col ${ev.wide ? "md:col-span-2 lg:col-span-2" : ""}`}
              initial={{ opacity: 0, y: 50 }}
              animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ...SPRING }}
            >
              {/* Image */}
              {ev.img && (
                <div className="relative h-52 overflow-hidden rounded-t-[1.5rem]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ev.img}
                    alt={ev.title}
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              )}

              <div className="p-7 flex flex-col flex-1">
                {!ev.img && (
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300"
                    style={{ background: "rgba(14,140,228,0.2)" }}
                  >
                    {ev.icon}
                  </div>
                )}

                <span className={`${ev.tagColor} mb-3 self-start`}>{ev.tag}</span>

                <h3
                  className="font-bold text-white text-xl mb-3 leading-tight group-hover:text-[#38a9f8] transition-colors duration-300"
                >
                  {ev.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed flex-1">{ev.desc}</p>

                <div className="flex items-center gap-1.5 mt-5 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: "#38a9f8" }}>
                  Learn More <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
