# 🌌 DeepStation x MSRIT

**AI Education, Made for India.**  
The official autonomous college chapter of the DeepStation AI community at Ramaiah Institute of Technology.

Welcome to the mission control of our digital home. This project is a high-fidelity, interactive web experience built to showcase our community, events, and vision for the future of AI.

---

## 🚀 Vision
DeepStation x MSRIT is more than a tech club; it's an ecosystem for AI innovators. We bridge the gap between theoretical AI and real-world implementation through hackathons, workshops, and a global network of collaborators.

---

## 🛠️ Tech Stack
This project uses a modern, cutting-edge stack to deliver a premium experience:

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **3D Graphics**: [Three.js](https://threejs.org/) with [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Magic UI](https://magicui.design/) & [Lucide Icons](https://lucide.dev/)

---

## 📂 Project Structure (The "What Does This Do?" Guide)

To help you navigate the codebase, here is a map of the most important files and directories:

### `src/app/`
- **`layout.tsx`**: The "Skeleton" of the site. It defines the fonts (Inter & Space Grotesk), global styles, and SEO metadata.
- **`page.tsx`**: The "Main Hub". This file assembles every section of the website into a single scrolling experience.
- **`globals.css`**: Contains our custom design tokens, nebula animations, and glassmorphism styles.

### `src/components/home/` (Phase 1 Sections)
- **`Hero.tsx`**: The first thing people see. High-impact typography and the gateway to the station.
- **`About.tsx`**: Our origin story and "Core Offerings" as interactive cards.
- **`Team.tsx`**: Meet the crew members powering the project.
- **`Events.tsx`**: Live updates on our latest workshops and hackathons.
- **`MissionArchive.tsx`**: A visual bento-grid showcasing our history and impact.
- **`Testimonials.tsx`**: Feedback from our community innovators.
- **`Preloader.tsx`**: The custom loading animation that plays when you first visit the site.

### `src/components/three/`
- **`PlanetScene.tsx`**: The Three.js code that renders the rotating 3D planet. It is connected to the scroll progress, so it reacts as you move down the page.

### `src/components/magicui/`
- A collection of pre-built, highly-animated components (like `Particles`, `HyperText`, and `Confetti`) used to add "wow factor" and micro-interactions.

### `src/hooks/`
- **`useScrollReveal.ts`**: A custom React hook that triggers animations exactly when a section becomes visible on your screen.

---

## 📥 Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (LTS version recommended).

### 2. Installation
Clone the repository and install the dependencies:
```bash
git clone https://github.com/Mudit-30/deep-website.git
cd deep-website
npm install
```

### 3. Run the Development Server
Launch the site locally:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the result.

---

## 🤝 How to Contribute
We love seeing new faces at the Station! Whether you're fixing a typo or adding a new 3D feature:

1. **Explore**: Look through the `src/components/home` folder to see how sections are built.
2. **Experiment**: Try modifying colors in `globals.css` or text in `page.tsx`.
3. **Submit**: Fork the repo, make your changes on a new branch, and open a Pull Request.

**Beginner Tip**: Start by tweaking the text or icons in `src/components/home/About.tsx` to get a feel for how React components and Tailwind CSS work together.

---

## 🔗 Connect with Us
- **Official Site**: [deepstation.ai](https://deepstation.ai)
- **WhatsApp**: [Join our Chapter](https://chat.whatsapp.com/Dcx4t7hvCcdIDCOc9FeQAq)
- **LinkedIn**: [DeepStation](https://linkedin.com/company/deepstation)

---
*Built with ❤️ by the DeepStation Crew.*
