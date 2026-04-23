"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Sphere, Float, Stars, Icosahedron, Box } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { MotionValue } from "framer-motion";

// ── Planet material (custom GLSL) ─────────────────────────────
const PlanetMaterial = {
  uniforms: {
    time: { value: 0 },
    color1: { value: new THREE.Color("#020b1a") }, // Very deep midnight blue
    color2: { value: new THREE.Color("#0ea5e9") }, // Vibrant Cyan
    glowColor: { value: new THREE.Color("#38bdf8") }, // Bright sky blue glow
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vUv      = uv;
      vNormal  = normalize(normalMatrix * normal);
      vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform vec3 color1;
    uniform vec3 color2;
    uniform vec3 glowColor;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
    float snoise(vec3 v){
      const vec2 C = vec2(1.0/6.0,1.0/3.0);
      const vec4 D = vec4(0.0,0.5,1.0,2.0);
      vec3 i  = floor(v+dot(v,C.yyy));
      vec3 x0 = v-i+dot(i,C.xxx);
      vec3 g  = step(x0.yzx,x0.xyz);
      vec3 l  = 1.0-g;
      vec3 i1 = min(g.xyz,l.zxy);
      vec3 i2 = max(g.xyz,l.zxy);
      vec3 x1 = x0-i1+1.0*C.xxx;
      vec3 x2 = x0-i2+2.0*C.xxx;
      vec3 x3 = x0-1.0+3.0*C.xxx;
      i = mod(i,289.0);
      vec4 p = permute(permute(permute(
               i.z+vec4(0.0,i1.z,i2.z,1.0))
              +i.y+vec4(0.0,i1.y,i2.y,1.0))
              +i.x+vec4(0.0,i1.x,i2.x,1.0));
      float n_ = 1.0/7.0;
      vec3 ns  = n_*D.wyz-D.xzx;
      vec4 j   = p-49.0*floor(p*ns.z*ns.z);
      vec4 x_  = floor(j*ns.z);
      vec4 y_  = floor(j-7.0*x_);
      vec4 x   = x_*ns.x+ns.yyyy;
      vec4 y   = y_*ns.x+ns.yyyy;
      vec4 h   = 1.0-abs(x)-abs(y);
      vec4 b0  = vec4(x.xy,y.xy);
      vec4 b1  = vec4(x.zw,y.zw);
      vec4 s0  = floor(b0)*2.0+1.0;
      vec4 s1  = floor(b1)*2.0+1.0;
      vec4 sh  = -step(h,vec4(0.0));
      vec4 a0  = b0.xzyw+s0.xzyw*sh.xxyy;
      vec4 a1  = b1.xzyw+s1.xzyw*sh.zzww;
      vec3 p0  = vec3(a0.xy,h.x);
      vec3 p1  = vec3(a0.zw,h.y);
      vec3 p2  = vec3(a1.xy,h.z);
      vec3 p3  = vec3(a1.zw,h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      vec4 m = max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
      m = m*m;
      return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
    }

    void main(){
      float noise = snoise(vPosition*1.5+time*0.2);
      vec3 color  = mix(color1,color2,noise*0.5+0.5);
      vec3 viewDir = normalize(cameraPosition-vPosition);
      float fresnel = clamp(1.0-dot(viewDir,vNormal),0.0,1.0);
      fresnel = pow(fresnel,3.0);
      vec3 finalColor = color+glowColor*fresnel*2.0;
      float wave = sin(vPosition.y*5.0-time*2.0)*0.5+0.5;
      finalColor += glowColor*wave*0.2;
      gl_FragColor = vec4(finalColor,0.4+fresnel*0.6);
    }
  `,
};

// ── Sub-components ─────────────────────────────────────────────
function PlanetOccluder() {
  return (
    <Sphere args={[1.9, 32, 32]}>
      <meshBasicMaterial color="#020617" depthWrite={true} />
    </Sphere>
  );
}



function PlanetMiddle({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const ref = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.15; // rotate on axis with good speed
    }
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
      const scroll = scrollYProgress.get();
      // Delay the glowing explosion effect until later down the scroll
      const intensity = scroll < 0.75 ? 1 + (scroll / 0.75) * 0.5 : 1.5 + ((scroll - 0.75) / 0.25) * 3;
      materialRef.current.uniforms.glowColor.value.setRGB(
        0.32 * intensity,
        0.66 * intensity,
        0.94 * intensity
      );
    }
  });
  return (
    <Sphere ref={ref} args={[2, 64, 64]}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={PlanetMaterial.vertexShader}
        fragmentShader={PlanetMaterial.fragmentShader}
        uniforms={THREE.UniformsUtils.clone(PlanetMaterial.uniforms)}
        transparent
        // Retain additive blending but lower base opacity for a better hollow/glittering look if desired
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </Sphere>
  );
}

function PlanetOuter({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05; // increased speed slightly
      ref.current.rotation.z = state.clock.elapsedTime * 0.02;

      const scroll = scrollYProgress.get();
      const scale = scroll < 0.75 ? 1 + (scroll / 0.75) * 0.2 : 1.2 + ((scroll - 0.75) / 0.25) * 2;
      ref.current.scale.set(scale, scale, scale);
    }
  });
  return (
    <Sphere ref={ref} args={[2.05, 32, 32]}>
      <meshBasicMaterial color="#1886CA" wireframe transparent opacity={0.15} blending={THREE.AdditiveBlending} />
    </Sphere>
  );
}



function FloatingShapes() {
  return (
    <>
      <Float speed={2} rotationIntensity={2} floatIntensity={2} position={[4, 2, -3]}>
        <Icosahedron args={[0.3, 0]}>
          <meshStandardMaterial color="#0065A5" wireframe />
        </Icosahedron>
      </Float>
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2} position={[-4, -2, -2]}>
        <Box args={[0.4, 0.4, 0.4]}>
          <meshStandardMaterial color="#1886CA" wireframe />
        </Box>
      </Float>
      <Float speed={2.5} rotationIntensity={2} floatIntensity={2} position={[3, -3, 1]}>
        <Icosahedron args={[0.2, 0]}>
          <meshStandardMaterial color="#52A9F0" wireframe />
        </Icosahedron>
      </Float>
    </>
  );
}

function CameraController({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    const scroll = scrollYProgress.get();

    let targetZ = 8;
    // Delay the "explosion" zoom until 75% of the scroll is complete (after about 2 pages)
    if (scroll < 0.75) {
      targetZ = THREE.MathUtils.lerp(8, 3, scroll / 0.75);
    } else {
      targetZ = THREE.MathUtils.lerp(3, 0.1, (scroll - 0.75) / 0.25);
    }

    const targetX = mouse.current.x * 0.5;
    const targetY = mouse.current.y * 0.5;
    
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);

    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ── Main export ────────────────────────────────────────────────
export default function PlanetScene({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  return (
    <>
      <fog attach="fog" args={["#020617", 2, 15]} />

      <ambientLight intensity={0.5} color="#1886CA" />
      <pointLight position={[0, 0, 0]} intensity={2} color="#52A9F0" />
      <directionalLight position={[5, 3, 5]} intensity={1} color="#0065A5" />

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      <group>
        <PlanetOccluder />
        <PlanetMiddle scrollYProgress={scrollYProgress} />
        <PlanetOuter scrollYProgress={scrollYProgress} />
      </group>

      <FloatingShapes />
      <CameraController scrollYProgress={scrollYProgress} />

      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={1.5} />
      </EffectComposer>
    </>
  );
}
