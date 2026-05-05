"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";

const coreMembers = [
  "Grant Kurz", "Harshit Agrawal", "Anaghaa Patil", "Mudit Saxena", "Amogh Shastry",
  "Kartikey mani Tripathi", "Siddharth Priyatam", "Nikita Hedge", "Shreyas Mane"
];

const generalMembers = [
  "Swayam Bohara", "Venkatesh Reddy", "Shaik Imran", "Ananya Kalmath",
  "Yashmita", "gursharan kaur", "Harshitha C P", "Vanshika", "Vibodharya Jampale Sathish",
  "Mihika Jain", "Akash Biswas", "Shriya Bhat", "Niranjan Nishore", "Sinchana",
  "Nysa Lakhotia", "Akash S", "Venkat Vaishnav", "Ishita Agarwal", "Supriya J",
  "Dakshitha S", "Mukul Prasad", "Sreejani Bhattacharya", "Vigyanth",
  "Rohan N Karadigudd", "Mohammed Mohsin Mahaboob Basha", "Omkar Tonne",
  "Subhash Kashyap K H", "Swastik R Phadke", "Pranav R Mane"
];

const imageMap: Record<string, string> = {
  "Grant Kurz": "/img/crew/grant kurz.jpeg",
  "Akash S": "/img/crew/Akash S.jpeg",
  "Anaghaa Patil": "/img/crew/anaghaa.jpg",
  "Harshit Agrawal": "/img/crew/Harshit.jpeg",
  "Mudit Saxena": "/img/crew/Mudit.jpeg",
  "Mukul Prasad": "/img/crew/Mukul.jpeg",
  "Niranjan Nishore": "/img/crew/Niranjan Nishore.jpeg",
  "Rohan N Karadigudd": "/img/crew/Rohan.jpeg",
  "Akash Biswas": "/img/crew/akash biswas.jpeg",
  "Amogh Shastry": "/img/crew/amogh.jpeg",
  "Ishita Agarwal": "/img/crew/ishita.jpeg",
  "Nikita Hedge": "/img/crew/nikita hedge.jpeg",
  "Nysa Lakhotia": "/img/crew/Nysa.png",
  "Siddharth Priyatam": "/img/crew/siddharth.jpeg",
  "Vanshika": "/img/crew/vanshika.jpeg",
  "Vibodharya Jampale Sathish": "/img/crew/Vibodharya_Jampale.jpg",
  "Vigyanth": "/img/crew/vigyant_nayak (1).jpeg",
  "Yashmita": "/img/crew/Yashmita Sudhir.png",
  "Kartikey mani Tripathi": "/img/crew/Kartikey.jpg",
  "Mohammed Mohsin Mahaboob Basha": "/img/crew/Mohammed Mohsin.jpg",
  "Pranav R Mane": "/img/crew/Pranav R Mane.jpg",
  "Venkat Vaishnav": "/img/crew/Venkat vaishanv.png",
  "Venkatesh Reddy": "/img/crew/Venkatesh Reddy K.jpeg",
  "Shreyas Mane": "/img/crew/Shreyas Mane.jpeg",
  "Mihika Jain": "/img/crew/Mihika.png",
  "Subhash Kashyap K H": "/img/crew/subhash.jpeg",
  "Shaik Imran": "/img/crew/shaik.jpg",
  "Omkar Tonne": "/img/crew/omkar.jpeg",
  "Swayam Bohara": "/img/crew/swayam.png",
  "Swastik R Phadke": "/img/crew/swastik.png",
  "Sinchana": "/img/crew/sinchana.jpeg"
};

const linkedinMap: Record<string, string> = {
  "Mukul Prasad": "https://www.linkedin.com/in/MukulPrasad1",
  "Akash Biswas": "https://www.linkedin.com/in/akash-biswas-887914342",
  "Sreejani Bhattacharya": "https://www.linkedin.com/in/sreejani-bhattacharya-966a20366",
  "gursharan kaur": "https://www.linkedin.com/in/gursharan-kaur-17168b316",
  "Vanshika": "https://www.linkedin.com/in/vanshika-lalwani-976140372",
  "Vigyanth": "https://www.linkedin.com/in/vigyant-nayak-a32479302",
  "Ananya Kalmath": "https://www.linkedin.com/in/ananya-kalmath-5a3a10299",
  "Venkatesh Reddy": "https://www.linkedin.com/in/venkatesh-reddy-k-6aba34333",
  "Akash S": "https://www.linkedin.com/in/akash-s-ksgd",
  "Yashmita": "https://www.linkedin.com/in/yashmita-s-4a5b5b1b8",
  "Vibodharya Jampale Sathish": "https://www.linkedin.com/in/vibodharya-jampale-sathish",
  "Subhash Kashyap K H": "https://www.linkedin.com/in/subhash-kashyap-k-h-648830358",
  "Rohan N Karadigudd": "https://www.linkedin.com/in/rohan-n-karadigudd-b51a58327",
  "Mihika Jain": "https://www.linkedin.com/in/mihika-jain-10173b326",
  "Kartikey mani Tripathi": "https://www.linkedin.com/in/kartikey-mani-tripathi-learner",
  "Nikita Hedge": "https://www.linkedin.com/in/nikita-ravindra-315498322",
  "Mohammed Mohsin Mahaboob Basha": "https://www.linkedin.com/in/mohammed-mohsin-817551335",
  "Swayam Bohara": "https://www.linkedin.com/in/swayam-bohara-98275b326",
  "Shriya Bhat": "https://in.linkedin.com/in/shriya-bhat-",
  "Omkar Tonne": "https://www.linkedin.com/in/omkar-tonne-1468a6311",
  "Sinchana": "https://www.linkedin.com/in/sinchana-jeppu-649102366",
  "Pranav R Mane": "https://www.linkedin.com/in/pranav-mane-024394324",
  "Supriya J": "https://www.linkedin.com/in/supriya-j-916909365",
  "Niranjan Nishore": "https://www.linkedin.com/in/niranjan-nishore-678b34332",
  "Shaik Imran": "https://www.linkedin.com/in/shaik-imran-281a6331a",
  "Swastik R Phadke": "https://www.linkedin.com/in/swastik-phadke",
  "Nysa Lakhotia": "https://www.linkedin.com/in/nysa-lakhotia",
  "Ishita Agarwal": "https://www.linkedin.com/in/ishita-agarwal-aa854536a",
  "Grant Kurz": "https://www.linkedin.com/in/grant-kurz",
  "Anaghaa Patil": "https://www.linkedin.com/in/anaghaa-patil",
  "Mudit Saxena": "https://www.linkedin.com/in/muditsaxena30",
  "Harshit Agrawal": "https://www.linkedin.com/in/harshitagrawal700",
  "Siddharth Priyatam": "https://www.linkedin.com/in/siddharth-priyatam-462632337",
  "Amogh Shastry": "https://www.linkedin.com/in/amoghshastry",
  "Shreyas Mane": "https://www.linkedin.com/in/shreyas-mane-15b9192b7",
  "Harshitha C P": "https://www.linkedin.com/in/harshitha-c-p-3505243b1",
  "Venkat Vaishnav": "https://www.linkedin.com/in/venkat-vaishnav-949b16403",
  "Dakshitha S": "https://www.linkedin.com/in/dakshitha-s-04105138b",
};

const bioMap: Record<string, string> = {
  "Grant Kurz": "Visionary leader architecting the future of AI. Specialized in computational architectures and accelerating DeepStation's core infrastructure.",
  "Harshit Agrawal": "Exceptional team leader and strategist, driving technical innovation and community growth with precision.",
  "Anaghaa Patil": "Empathetic and efficient team leader, bridging the gap between complex AI concepts and real-world execution.",
  "Mudit Saxena": "Technical powerhouse focused on building seamless, high-performance systems for the next generation of AI."
};

// Place N nodes evenly on a ring; cx/cy = center %, rx/ry = radii %, angleOffset = rotation
function ringPositions(count: number, cx: number, cy: number, rx: number, ry: number, angleOffset = -Math.PI / 2) {
  return Array.from({ length: count }, (_, i) => {
    const angle = angleOffset + (2 * Math.PI * i) / count;
    return {
      x: Number((cx + rx * Math.cos(angle)).toFixed(4)),
      y: Number((cy + ry * Math.sin(angle)).toFixed(4)),
    };
  });
}

export function Testimonials() {
  const [activeNode, setActiveNode] = useState<any>(null);

  const { nodes, edges } = useMemo(() => {
    // ── Three-ring layout ──────────────────────────────────────────
    // Center hub (1 node), inner ring (8 core), outer ring (30 general)
    const cx = 50, cy = 50; // canvas center in %

    // Core hub node (index 0 of coreMembers list = Grant Kurz)
    const hubName = coreMembers[0];
    const hubPos = { x: cx, y: cy };

    // Inner ring: remaining 8 core members
    const innerNames = coreMembers.slice(1); // 8 names
    const innerPos = ringPositions(innerNames.length, cx, cy, 16, 28);

    // Middle ring: first 16 general members
    const midNames = generalMembers.slice(0, 16);
    const midPos = ringPositions(midNames.length, cx, cy, 30, 40, -Math.PI / 2 + Math.PI / midNames.length);

    // Outer ring: last 14 general members
    const outerNames = generalMembers.slice(16);
    const outerPos = ringPositions(outerNames.length, cx, cy, 44, 46, -Math.PI / 2);

    // Build full nodes list
    const result: any[] = [];
    const addNode = (name: string, pos: { x: number; y: number }, ring: number) => {
      const words = name.split(" ");
      const initials = words.length > 1 ? words[0][0] + words[1][0] : words[0].slice(0, 2);
      result.push({
        id: result.length,
        name,
        initials: initials.toUpperCase(),
        image: imageMap[name] || null,
        linkedin: linkedinMap[name] || null,
        x: pos.x,
        y: pos.y,
        ring, // 0 = hub, 1 = inner, 2 = mid, 3 = outer
      });
    };

    addNode(hubName, hubPos, 0);
    innerNames.forEach((name, i) => addNode(name, innerPos[i], 1));
    midNames.forEach((name, i) => addNode(name, midPos[i], 2));
    outerNames.forEach((name, i) => addNode(name, outerPos[i], 3));

    // ── Edges: only draw clean ring-to-ring spokes ────────────────
    const lines: { source: number; target: number }[] = [];
    const hubIdx = 0;
    const innerStart = 1;
    const midStart = innerStart + innerNames.length;      // 9
    const outerStart = midStart + midNames.length;        // 25

    // Hub → every inner node
    for (let i = innerStart; i < midStart; i++) {
      lines.push({ source: hubIdx, target: i });
    }

    // Inner ring: connect each node to its two neighbors (chain)
    for (let i = innerStart; i < midStart; i++) {
      const next = innerStart + ((i - innerStart + 1) % innerNames.length);
      lines.push({ source: i, target: next });
    }

    // Each inner node → 2 closest mid-ring neighbors
    for (let i = innerStart; i < midStart; i++) {
      const innerNode = result[i];
      let dists = result.slice(midStart, outerStart).map((n, idx) => ({
        idx: midStart + idx,
        d: Math.hypot(n.x - innerNode.x, n.y - innerNode.y),
      }));
      dists.sort((a, b) => a.d - b.d);
      lines.push({ source: i, target: dists[0].idx });
      lines.push({ source: i, target: dists[1].idx });
    }

    // Mid ring: connect neighbors in a ring
    for (let i = midStart; i < outerStart; i++) {
      const next = midStart + ((i - midStart + 1) % midNames.length);
      lines.push({ source: i, target: next });
    }

    // Each mid node → 1 closest outer-ring neighbor
    for (let i = midStart; i < outerStart; i++) {
      const midNode = result[i];
      let dists = result.slice(outerStart).map((n, idx) => ({
        idx: outerStart + idx,
        d: Math.hypot(n.x - midNode.x, n.y - midNode.y),
      }));
      dists.sort((a, b) => a.d - b.d);
      lines.push({ source: i, target: dists[0].idx });
    }

    // Outer ring: neighbors in a ring
    for (let i = outerStart; i < result.length; i++) {
      const next = outerStart + ((i - outerStart + 1) % outerNames.length);
      lines.push({ source: i, target: next });
    }

    return { nodes: result, edges: lines };
  }, []);

  const nodeGlow = (ring: number) => {
    if (ring === 0) return "0 0 28px rgba(24,134,202,0.9), 0 0 8px rgba(82,169,240,0.6)";
    if (ring === 1) return "0 0 22px rgba(82,169,240,0.7), 0 0 6px rgba(82,169,240,0.4)";
    return "0 0 16px rgba(82,169,240,0.5), 0 0 4px rgba(82,169,240,0.3)";
  };

  const nodeBg = (ring: number) => {
    if (ring === 0) return "#1886CA";
    if (ring === 1) return "#0e3a6e";
    return "#020617";
  };

  return (
    <section className="min-h-screen relative overflow-hidden bg-transparent flex flex-col justify-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#020617]/50" style={{ boxShadow: "inset 0 0 100px rgba(24,134,202,0.15)" }} />
      </div>

      <div className="w-full px-4 lg:px-12 mx-auto relative z-10 text-left pt-12 pb-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Crew <span style={{ color: "#52A9F0" }}>Network</span>
        </motion.h2>
        <p className="text-slate-400 max-w-xl text-sm mb-6">
          The brilliant minds driving DeepStation MSRIT. Click a node to explore.
        </p>
      </div>

      {/* Network Canvas */}
      <div className="relative w-full flex-grow mx-auto overflow-hidden" style={{ minHeight: "520px" }}>
        {/* SVG edges */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {edges.map((edge, i) => {
            const s = nodes[edge.source];
            const t = nodes[edge.target];
            const isCore = s.ring <= 1 && t.ring <= 1;
            return (
              <motion.line
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: i * 0.008 }}
                key={i}
                x1={`${s.x}%`} y1={`${s.y}%`}
                x2={`${t.x}%`} y2={`${t.y}%`}
                stroke={isCore ? "rgba(82, 169, 240, 0.5)" : "rgba(82, 169, 240, 0.18)"}
                strokeWidth={isCore ? 2 : 1}
              />
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            onClick={() => setActiveNode(node)}
            initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
            whileInView={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
            viewport={{ once: true }}
            transition={{ delay: node.id * 0.015, type: "spring", stiffness: 220, damping: 18 }}
            whileHover={{ scale: 1.25, zIndex: 50, boxShadow: "0 0 45px rgba(82,169,240,1), 0 0 12px rgba(82,169,240,0.8)" }}
            className="absolute w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center cursor-pointer border border-[#52A9F0]/60 font-bold text-xs"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              background: nodeBg(node.ring),
              color: node.ring === 0 ? "#fff" : "#52A9F0",
              boxShadow: nodeGlow(node.ring),
              zIndex: node.ring === 0 ? 20 : node.ring === 1 ? 10 : 1,
            }}
          >
            {node.image ? (
              <img src={node.image} alt={node.name} className="w-full h-full object-cover rounded-full" style={{ objectPosition: ["Subhash Kashyap K H", "Mohammed Mohsin Mahaboob Basha", "Yashmita"].includes(node.name) ? "center" : "top" }} />
            ) : (
              node.initials
            )}
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div className="w-full px-4 lg:px-12 mx-auto relative z-10 pb-8 flex items-center gap-6 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full" style={{ background: "#1886CA", boxShadow: "0 0 16px rgba(24,134,202,0.9)" }} />
          <span className="text-slate-400 text-xs font-medium">Director</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full" style={{ background: "#0e3a6e", border: "1px solid #52A9F0", boxShadow: "0 0 12px rgba(82,169,240,0.7)" }} />
          <span className="text-slate-400 text-xs font-medium">Core Architects</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full" style={{ background: "#020617", border: "1px solid #52A9F0", boxShadow: "0 0 10px rgba(82,169,240,0.5)" }} />
          <span className="text-slate-400 text-xs font-medium">Operators</span>
        </div>
      </div>

      {/* Member Profile Modal */}
      <AnimatePresence>
        {activeNode && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
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
                  <img src={activeNode.image} className="w-full h-full object-cover opacity-90" alt={activeNode.name} style={{ objectPosition: ["Subhash Kashyap K H", "Mohammed Mohsin Mahaboob Basha", "Yashmita"].includes(activeNode.name) ? "center" : "top" }} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl font-bold bg-[#1886CA] text-white">
                    {activeNode.initials}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#020617] to-transparent opacity-60 pointer-events-none" />
              </div>

              {/* Modal Text Half */}
              <div className="relative z-10 w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center text-left">
                <button onClick={() => setActiveNode(null)} className="absolute top-6 right-6 text-slate-400 hover:text-white hover:rotate-90 transition-all duration-300">
                  <X size={24} />
                </button>

                <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: "#52A9F0" }}>
                  {activeNode.ring === 0 ? "Director" : activeNode.ring === 1 ? "Core Architect" : "DeepStation Operator"}
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-display)" }}>
                  {activeNode.name}
                </h2>

                <div className="w-12 h-1 mb-6" style={{ background: "linear-gradient(to right, #1886CA, transparent)" }} />

                <p className="text-slate-300 text-sm leading-relaxed mb-8 flex-grow">
                  {bioMap[activeNode.name] || "A valued member of the DeepStation community, contributing to our AI network."}
                </p>

                <a
                  href={activeNode.linkedin || `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(activeNode.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center justify-center gap-2 bg-transparent border border-[#1886CA] hover:bg-[#1886CA] active:scale-95 text-white px-6 py-3 rounded-full font-bold transition-all text-sm hover:shadow-[0_0_20px_rgba(24,134,202,0.4)]"
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
