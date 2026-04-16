"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import {
  forceSimulation,
  forceCenter,
  forceManyBody,
  forceCollide,
  forceLink,
  forceX,
  forceY,
  type SimulationNodeDatum,
  type SimulationLinkDatum,
} from "d3-force";

/* ─── Data ──────────────────────────────────────────────────────────── */

const coreMembers = [
  "Grant Kurz", "Harshit Agrawal", "Anaghaa Patil", "Mudit Saxena", "Amogh Shastry",
  "Kartikey mani Tripathi", "Siddharth Priyatam", "Nikita Hedge", "Shyreyas",
];

const generalMembers = [
  "Swayam Bohara", "Venkatesh Reddy", "Shaik Imran", "Ananya Kalmath",
  "Yashmita", "gursharan kaur", "Harshita", "Vanshika", "Vibodharya Jampale Sathish",
  "Mihika Jain", "Akash Biswas", "Shriya Bhat", "Niranjan Nishore", "Sinchana",
  "Nysa Lakhotia", "Akash S", "Venkat", "Ishita Agarwal", "Supriya J",
  "Dakshitha S", "Mukul Prasad", "Sreejani Bhattacharya", "Vigyanth", "Deshena",
  "Rohan N Karadigudd", "Mohammed Mohsin Mahaboob Basha", "Omkar Tonne",
  "Subhash Kashyap K H", "Swastik R Phadke", "Pranav R Mane",
];

const imageMap: Record<string, string> = {
  "Grant Kurz": "/img/crew/grant kurz.jpeg",
  "Akash S": "/img/crew/Akash S.jpeg",
  "Anaghaa Patil": "/img/crew/Anaghaa.jpeg",
  "Harshit Agrawal": "/img/crew/Harshit.jpeg",
  "Mudit Saxena": "/img/crew/Mudit.jpeg",
  "Mukul Prasad": "/img/crew/Mukul.jpeg",
  "Niranjan Nishore": "/img/crew/Niranjan Nichore.jpeg",
  "Rohan N Karadigudd": "/img/crew/Rohan.jpeg",
  "Akash Biswas": "/img/crew/akash biswas.jpeg",
  "Amogh Shastry": "/img/crew/amogh.jpeg",
  "Ishita Agarwal": "/img/crew/ishita.jpeg",
  "Nikita Hedge": "/img/crew/nikita ravindra.jpeg",
  "Nysa Lakhotia": "/img/crew/nysa.jpeg",
  "Siddharth Priyatam": "/img/crew/siddharth.jpeg",
  "Sinchana": "/img/crew/sinchana.jpeg",
  "Vanshika": "/img/crew/vanshika.jpeg",
  "Vibodharya Jampale Sathish": "/img/crew/vibodharya.jpeg",
  "Vigyanth": "/img/crew/vigyanth.jpeg",
  "Yashmita": "/img/crew/yashmita Sudhir.jpeg",
};

/* ─── Types ─────────────────────────────────────────────────────────── */

interface MemberNode extends SimulationNodeDatum {
  id: number;
  name: string;
  initials: string;
  image: string | null;
  isFounder: boolean;
}

interface MemberEdge extends SimulationLinkDatum<MemberNode> {
  source: number;
  target: number;
}

/* ─── Constants ─────────────────────────────────────────────────────── */

const NODE_RADIUS = 30; // 60px diameter / 2
const COLLISION_PAD = 8;

/* ─── CSS for keyframe animations (injected once) ──────────────────── */

const STYLE_ID = "network-constellation-styles";

const injectStyles = () => {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    @keyframes founderPulse {
      0%   { box-shadow: 0 0 12px 4px rgba(99,210,255,0.45), 0 0 30px 8px rgba(99,210,255,0.15); }
      50%  { box-shadow: 0 0 20px 8px rgba(99,210,255,0.65), 0 0 50px 16px rgba(99,210,255,0.25); }
      100% { box-shadow: 0 0 12px 4px rgba(99,210,255,0.45), 0 0 30px 8px rgba(99,210,255,0.15); }
    }

    @keyframes edgePulse {
      0%   { opacity: 0.5; }
      100% { opacity: 1.0; }
    }

    .founder-aura {
      animation: founderPulse 3s ease-in-out infinite;
    }

    .edge-base {
      animation: edgePulse 3s ease-in-out infinite alternate;
    }

    .crew-network-header {
      position: absolute;
      bottom: 28px;
      left: 32px;
      z-index: 10;
      pointer-events: none;
      background: transparent;
      width: auto;
      height: auto;
    }
  `;
  document.head.appendChild(style);
};

/* ─── Build graph data ─────────────────────────────────────────────── */

function buildGraph() {
  const nodes: MemberNode[] = [];

  const addNode = (name: string, isFounder: boolean) => {
    const words = name.split(" ");
    const initials = words.length > 1 ? words[0][0] + words[1][0] : words[0].slice(0, 2);
    nodes.push({
      id: nodes.length,
      name,
      initials: initials.toUpperCase(),
      image: imageMap[name] || null,
      isFounder,
      // d3 will populate x, y
    });
  };

  // Founder first
  addNode(coreMembers[0], true);
  // Core members
  coreMembers.slice(1).forEach((n) => addNode(n, false));
  // General members
  generalMembers.forEach((n) => addNode(n, false));

  const edges: MemberEdge[] = [];
  const coreCount = coreMembers.length; // 9 (index 0 = founder)

  // Founder → every core member
  for (let i = 1; i < coreCount; i++) {
    edges.push({ source: 0, target: i });
  }

  // Core members interconnect as a ring
  for (let i = 1; i < coreCount; i++) {
    const next = 1 + ((i - 1 + 1) % (coreCount - 1));
    edges.push({ source: i, target: next });
  }

  // Each core → 2 closest general (by index proximity, evenly distributed)
  const genStart = coreCount;
  const genCount = generalMembers.length;
  for (let i = 1; i < coreCount; i++) {
    const ratio = (i - 1) / (coreCount - 1);
    const genIdx = Math.floor(ratio * genCount);
    edges.push({ source: i, target: genStart + genIdx % genCount });
    edges.push({ source: i, target: genStart + (genIdx + 1) % genCount });
  }

  // General members as a ring
  for (let i = 0; i < genCount; i++) {
    const next = (i + 1) % genCount;
    edges.push({ source: genStart + i, target: genStart + next });
  }

  return { nodes, edges };
}

/* ─── Component ────────────────────────────────────────────────────── */

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<MemberNode | null>(null);
  const [dims, setDims] = useState({ w: 900, h: 600 });
  const [tick, setTick] = useState(0); // forces re-render on simulation ticks

  // Stable graph data
  const graphRef = useRef<ReturnType<typeof buildGraph> | null>(null);
  if (!graphRef.current) {
    graphRef.current = buildGraph();
  }
  const { nodes, edges } = graphRef.current;

  // Inject keyframe styles
  useEffect(() => {
    injectStyles();
  }, []);

  // Observe container size to match the viewport for max spread
  useEffect(() => {
    const measure = () => {
      setDims({ w: window.innerWidth, h: window.innerHeight });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Run d3-force simulation
  useEffect(() => {
    const cx = dims.w / 2;
    const cy = dims.h / 2;

    // Seed positions: founder at center, rest scattered
    nodes.forEach((n, i) => {
      if (i === 0) {
        n.x = cx;
        n.y = cy;
      } else if (n.x === undefined || n.y === undefined) {
        const angle = (2 * Math.PI * i) / nodes.length;
        const radius = 100 + Math.random() * 150;
        n.x = cx + Math.cos(angle) * radius;
        n.y = cy + Math.sin(angle) * radius;
      }
    });

    const sim = forceSimulation(nodes)
      .force("center", forceCenter(cx, cy).strength(0.03))
      .force("x", forceX(cx).strength(0.02))
      .force("y", forceY(cy).strength(0.04))
      .force("charge", forceManyBody().strength(-350))
      .force("collide", forceCollide<MemberNode>(NODE_RADIUS + 30).strength(0.9).iterations(3))
      .force(
        "link",
        forceLink<MemberNode, MemberEdge>(edges)
          .id((d) => d.id)
          .distance(130)
          .strength(0.3)
      )
      .alphaDecay(0.015)
      .velocityDecay(0.35)
      .on("tick", () => {
        // Clamp nodes within bounds (padding=20)
        const pad = 20;
        nodes.forEach((n) => {
          n.x = Math.max(NODE_RADIUS + pad, Math.min(dims.w - NODE_RADIUS - pad, n.x ?? cx));
          n.y = Math.max(NODE_RADIUS + pad, Math.min(dims.h - NODE_RADIUS - pad, n.y ?? cy));
        });
        setTick((t) => t + 1);
      });

    return () => {
      sim.stop();
    };
  }, [dims.w, dims.h]);

  // Resolve source/target (d3 replaces indices with object refs after linking)
  const resolveNode = useCallback(
    (ref: number | MemberNode): MemberNode => {
      if (typeof ref === "number") return nodes[ref];
      return ref;
    },
    [nodes]
  );

  return (
    <section className="w-full h-screen relative overflow-hidden bg-transparent">
      {/* Atmosphere overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{ background: "rgba(2,6,23,0.5)", boxShadow: "inset 0 0 100px rgba(24,134,202,0.15)" }}
        />
      </div>

      {/* (Title extracted to crew-network-header bottom left) */}

      {/* ── Network Canvas ─────────────────────────────────────────── */}
      <div
        ref={containerRef}
        className="absolute top-0 left-0 pointer-events-none overflow-hidden z-[1]"
        style={{ width: "100vw", height: "100vh" }}
      >
        {/* Radial bloom behind the graph */}
        <div
          className="absolute pointer-events-none z-0"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "70%",
            height: "70%",
            background: "radial-gradient(circle, rgba(30,80,180,0.28) 0%, rgba(10,30,80,0.12) 45%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(18px)",
          }}
        />

        {/* SVG Edges */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-[1]">
          <defs>
            <filter id="edgeGlow3">
              <feGaussianBlur stdDeviation="3" />
            </filter>
            <filter id="edgeGlow08">
              <feGaussianBlur stdDeviation="0.8" />
            </filter>
          </defs>
          {edges.map((edge, i) => {
            const s = resolveNode(edge.source as unknown as number | MemberNode);
            const t = resolveNode(edge.target as unknown as number | MemberNode);
            if (s.x == null || s.y == null || t.x == null || t.y == null) return null;
            return (
              <g key={i}>
                {/* Layer 1 — deep glow halo */}
                <line
                  x1={s.x}
                  y1={s.y}
                  x2={t.x}
                  y2={t.y}
                  stroke="rgba(100, 220, 255, 0.35)"
                  strokeWidth={6}
                  filter="url(#edgeGlow3)"
                />
                {/* Layer 2 — mid glow */}
                <line
                  x1={s.x}
                  y1={s.y}
                  x2={t.x}
                  y2={t.y}
                  stroke="rgba(150, 235, 255, 0.6)"
                  strokeWidth={2.5}
                  filter="url(#edgeGlow08)"
                />
                {/* Layer 3 — core bright line */}
                <line
                  x1={s.x}
                  y1={s.y}
                  x2={t.x}
                  y2={t.y}
                  stroke="rgba(220, 245, 255, 0.95)"
                  strokeWidth={1.2}
                />
              </g>
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((node) => {
          if (node.x == null || node.y == null) return null;
          return (
            <motion.div
              key={node.id}
              onClick={() => setActiveNode(node)}
              whileHover={{
                scale: 1.18,
                zIndex: 50,
                boxShadow: "0 0 40px rgba(99,210,255,0.9), 0 0 12px rgba(99,210,255,0.7)",
              }}
              className={`absolute rounded-full flex items-center justify-center cursor-pointer z-[2] pointer-events-auto ${
                node.isFounder ? "founder-aura" : ""
              }`}
              style={{
                width: 60,
                height: 60,
                left: node.x - 30,
                top: node.y - 30,
                border: "2px solid rgba(99, 210, 255, 0.55)",
                background: node.image
                  ? "#0a1628"
                  : "radial-gradient(135deg, #1a3a6e 0%, #0a1628 100%)",
                boxShadow: node.isFounder
                  ? undefined
                  : node.image
                    ? undefined
                    : "inset 0 0 12px rgba(99,210,255,0.15), 0 0 8px rgba(99,210,255,0.2)",
                willChange: "left, top",
              }}
            >
              {node.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={node.image}
                  alt={node.name}
                  className="w-full h-full object-cover rounded-full"
                  draggable={false}
                />
              ) : (
                <span
                  className="select-none"
                  style={{
                    color: "#e8f4ff",
                    fontFamily: "'DM Sans', var(--font-display), sans-serif",
                    fontWeight: 600,
                    fontSize: "15px",
                    letterSpacing: "0.05em",
                  }}
                >
                  {node.initials}
                </span>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* ── Fixed Bottom-Left Header & Legend ──────────────────────── */}
      <div className="crew-network-header flex flex-col gap-4">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Crew <span style={{ color: "#52A9F0" }}>Network</span>
          </motion.h2>
          <p className="text-slate-400 max-w-xl text-sm">
            The brilliant minds driving DeepStation MSRIT. Click a node to explore.
          </p>
        </div>

        <div className="flex items-center gap-6 flex-wrap mt-2">
          <div className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded-full founder-aura"
              style={{ background: "#0a1628", border: "2px solid rgba(99,210,255,0.6)" }}
            />
            <span className="text-slate-400 text-xs font-medium">Founder</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded-full"
              style={{ background: "#0a1628", border: "2px solid rgba(99,210,255,0.6)" }}
            />
            <span className="text-slate-400 text-xs font-medium">Members</span>
          </div>
        </div>
      </div>

      {/* ── Member Profile Modal ───────────────────────────────────── */}
      <AnimatePresence>
        {activeNode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-[#020617]/80 backdrop-blur-md"
            onClick={() => setActiveNode(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-auto md:h-[400px] rounded-[2rem] overflow-hidden glass-card flex flex-col md:flex-row items-stretch shadow-[0_0_50px_rgba(24,134,202,0.15)]"
              style={{ borderColor: "rgba(24,134,202,0.3)", background: "#020617" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Image Half */}
              <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden bg-[#020617] border-b md:border-b-0 md:border-r border-[#52A9F0]/20">
                {activeNode.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={activeNode.image}
                    className="w-full h-full object-cover opacity-90"
                    alt={activeNode.name}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl font-bold bg-[#0a1628] text-[#63d2ff]">
                    {activeNode.initials}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#020617] to-transparent opacity-60 pointer-events-none" />
              </div>

              {/* Modal Text Half */}
              <div className="relative z-10 w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center text-left">
                <button
                  onClick={() => setActiveNode(null)}
                  className="absolute top-6 right-6 text-slate-400 hover:text-white hover:rotate-90 transition-all duration-300"
                >
                  <X size={24} />
                </button>

                <p
                  className="text-xs font-bold tracking-[0.2em] uppercase mb-2"
                  style={{ color: "#63d2ff" }}
                >
                  {activeNode.isFounder ? "Founder" : "Member"}
                </p>
                <h2
                  className="text-3xl md:text-4xl font-bold text-white mb-6"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {activeNode.name}
                </h2>

                <div className="w-12 h-1 mb-6" style={{ background: "linear-gradient(to right, #63d2ff, transparent)" }} />

                <p className="text-slate-300 text-sm leading-relaxed mb-8 flex-grow">
                  {activeNode.isFounder
                    ? "Leading the neural network of our community forward. Specialized in computational architectures and accelerating DeepStation's core infrastructure."
                    : "Vital node within the DeepStation mesh. Focused on algorithmic exploration and integrating advanced systems into real-world applications."}
                </p>

                <a
                  href={`https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(activeNode.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center justify-center gap-2 bg-transparent border border-[#63d2ff] hover:bg-[#63d2ff]/20 active:scale-95 text-white px-6 py-3 rounded-full font-bold transition-all text-sm hover:shadow-[0_0_20px_rgba(99,210,255,0.4)]"
                >
                  Connect on LinkedIn <ExternalLink size={16} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
