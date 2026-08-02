import { useLayoutEffect, useMemo, useRef, useState, Suspense, lazy, useCallback } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Cpu, Camera, Maximize2, Loader2 } from 'lucide-react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Draco decoder served locally so the site works offline
useGLTF.setDecoderPath('/draco/');

const Canvas = lazy(() =>
  import('@react-three/fiber').then((m) => ({ default: m.Canvas }))
);
const OrbitControls = lazy(() =>
  import('@react-three/drei').then((m) => ({ default: m.OrbitControls }))
);
const Environment = lazy(() =>
  import('@react-three/drei').then((m) => ({ default: m.Environment }))
);
const Lightformer = lazy(() =>
  import('@react-three/drei').then((m) => ({ default: m.Lightformer }))
);

export interface HotspotDef {
  id: string;
  label: string;
  title: string;
  description: string;
  partIds: string[];
  icon: 'display' | 'camera' | 'frame' | 'logo';
}

const HOTSPOTS: HotspotDef[] = [
  {
    id: 'display',
    label: 'Display',
    title: 'ProMotion LTPO OLED',
    description:
      'A 120Hz adaptive refresh rate display, dynamically tuned from 1Hz to 120Hz by the Always-On pipeline.',
    partIds: ['part_9', 'part_1', 'part_6'],
    icon: 'display',
  },
  {
    id: 'camera',
    label: 'Camera System',
    title: 'Pro Camera Array',
    description:
      'A triple-lens system fused with the Neural Engine for real-time computational photography, Smart HDR and Deep Fusion.',
    partIds: ['part_5', 'part_7', 'part_8', 'part_11', 'part_15', 'part_16', 'part_17', 'part_18'],
    icon: 'camera',
  },
  {
    id: 'frame',
    label: 'Titanium Frame',
    title: 'Grade 5 Titanium',
    description:
      'Aerospace-grade titanium alloy chassis — stronger than steel yet lighter, dissipating heat through the graphite layer beneath.',
    partIds: ['part_2', 'part_3', 'part_4', 'part_10'],
    icon: 'frame',
  },
  {
    id: 'logo',
    label: 'MagSafe',
    title: 'MagSafe & Wireless',
    description:
      'The circular magnet array centers power transfer, while the Qi2 coil and the A18 Pro PMIC negotiate 25W wireless charging.',
    partIds: ['part_14', 'part_12', 'part_13'],
    icon: 'logo',
  },
];

function HotspotIcon({ icon }: { icon: HotspotDef['icon'] }) {
  switch (icon) {
    case 'display':
      return <Maximize2 size={18} className="text-primary" />;
    case 'camera':
      return <Camera size={18} className="text-primary" />;
    case 'logo':
      return <Cpu size={18} className="text-primary" />;
    default:
      return <Cpu size={18} className="text-primary" />;
  }
}

function SceneModel({
  activeHotspot,
  onSelect,
  onPositionsReady,
}: {
  activeHotspot: string | null;
  onSelect: (id: string) => void;
  onPositionsReady: (positions: Record<string, [number, number, number]>) => void;
}) {
  const { scene } = useGLTF('/models/iphone17/iphone17.glb');

  // Compute world-space hotspot positions once the model matrix is available.
  // Hotspots are rendered as siblings of the rotated model, so world coords
  // keep them glued to the phone as it spins.
  useLayoutEffect(() => {
    scene.updateMatrixWorld(true);
    const positions: Record<string, [number, number, number]> = {};
    for (const hotspot of HOTSPOTS) {
      const centers: THREE.Vector3[] = [];
      for (const partId of hotspot.partIds) {
        scene.traverse((child) => {
          const mesh = child as THREE.Mesh;
          if (mesh.isMesh && (mesh.name === partId || mesh.parent?.name === partId)) {
            mesh.geometry.computeBoundingBox();
            const box = mesh.geometry.boundingBox;
            if (box) {
              const c = new THREE.Vector3();
              box.getCenter(c);
              mesh.localToWorld(c);
              centers.push(c);
            }
          }
        });
      }
      if (centers.length) {
        const avg = centers.reduce((a, b) => a.add(b), new THREE.Vector3()).divideScalar(centers.length);
        positions[hotspot.id] = [avg.x, avg.y, avg.z];
      }
    }
    onPositionsReady(positions);
  }, [scene, onPositionsReady]);

  return (
    <group rotation={[-Math.PI / 2, 0, 0]} scale={1.35}>
      <primitive object={scene} />
    </group>
  );
}

function Scene({
  activeHotspot,
  onSelect,
  autoRotate,
  onPositionsReady,
  hotspotPositions,
}: {
  activeHotspot: string | null;
  onSelect: (id: string) => void;
  autoRotate: boolean;
  onPositionsReady: (positions: Record<string, [number, number, number]>) => void;
  hotspotPositions: Record<string, [number, number, number]>;
}) {
  const hasHotspots = Object.keys(hotspotPositions).length > 0;
  return (
    <>
      <ambientLight intensity={0.55} />
      <spotLight
        position={[4, 6, 6]}
        angle={0.45}
        penumbra={1}
        intensity={2.4}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <spotLight position={[-6, 4, -4]} angle={0.5} penumbra={1} intensity={1.4} color="#4da3ff" />
      <pointLight position={[0, -3, 3]} intensity={0.7} color="#6ee7ff" />
      <pointLight position={[0, 2, 2.5]} intensity={0.5} color="#ffffff" />

      <Environment resolution={64}>
        <Lightformer intensity={2.5} position={[0, 4, -4]} scale={[8, 8, 1]} />
        <Lightformer
          intensity={1.4}
          position={[-5, 1, 1]}
          rotation-y={Math.PI / 2}
          scale={[6, 2, 1]}
          color="#3b82f6"
        />
        <Lightformer
          intensity={1.2}
          position={[5, 1, -1]}
          rotation-y={-Math.PI / 2}
          scale={[6, 2, 1]}
          color="#22d3ee"
        />
      </Environment>

      <SceneModel
        activeHotspot={activeHotspot}
        onSelect={onSelect}
        onPositionsReady={onPositionsReady}
      />

      {/* Hotspot markers — world-space siblings so they track the model rotation */}
      {hasHotspots &&
        HOTSPOTS.map((h) => {
          const pos = hotspotPositions[h.id];
          if (!pos) return null;
          const active = activeHotspot === h.id;
          return (
            <group key={h.id} position={pos}>
              <mesh
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(h.id);
                }}
              >
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshBasicMaterial transparent opacity={0} depthWrite={false} />
              </mesh>
              <mesh position={[0, 0.18, 0]}>
                <ringGeometry args={[0.055, 0.07, 32]} />
                <meshBasicMaterial
                  color={active ? '#3b82f6' : '#6b7280'}
                  transparent
                  opacity={active ? 1 : 0.55}
                  side={THREE.DoubleSide}
                />
              </mesh>
              <mesh position={[0, 0.18, 0]}>
                <sphereGeometry args={[0.015, 12, 12]} />
                <meshBasicMaterial
                  color={active ? '#3b82f6' : '#9ca3af'}
                  transparent
                  opacity={active ? 1 : 0.7}
                />
              </mesh>
            </group>
          );
        })}

      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom
        minDistance={2}
        maxDistance={5}
        autoRotate={autoRotate}
        autoRotateSpeed={1.2}
        rotateSpeed={0.8}
      />
    </>
  );
}

export default function HeroSection() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [hotspotPositions, setHotspotPositions] = useState<Record<string, [number, number, number]>>({});

  const selectHotspot = useCallback((id: string) => {
    setActiveHotspot((prev) => (prev === id ? null : id));
  }, []);

  const handlePositionsReady = useCallback((positions: Record<string, [number, number, number]>) => {
    setHotspotPositions(positions);
  }, []);

  const selected = HOTSPOTS.find((h) => h.id === activeHotspot) ?? null;

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-background pt-16">
      {/* Subtle background grid */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 container max-w-7xl mx-auto px-4 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center min-h-[calc(100vh-4rem)]">
        {/* Left: copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/50 text-xs font-medium text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Interactive 3D · iPhone 17 Pro
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
            Understanding the Engineering Behind{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              iOS
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
            Discover how Apple's hardware and software work together to deliver performance,
            efficiency, security, and intelligence.
          </p>

          {/* Hotspot selection chips */}
          <div className="flex flex-wrap gap-2 pt-2">
            {HOTSPOTS.map((h) => (
              <button
                key={h.id}
                onClick={() => selectHotspot(h.id)}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
                  activeHotspot === h.id
                    ? 'border-primary bg-primary/15 text-primary shadow-[0_0_20px_rgba(59,130,246,0.25)]'
                    : 'border-border bg-card/60 text-muted-foreground hover:text-foreground hover:border-foreground/30'
                }`}
              >
                {h.label}
              </button>
            ))}
          </div>

          {/* Info panel */}
          <div className="min-h-[120px]">
            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="p-5 rounded-xl border border-primary/30 bg-card/70 backdrop-blur-md"
              >
                <div className="flex items-center gap-3 mb-2">
                  <HotspotIcon icon={selected.icon} />
                  <h3 className="text-lg font-semibold">{selected.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{selected.description}</p>
              </motion.div>
            ) : (
              <div className="p-5 rounded-xl border border-border/60 bg-card/40 backdrop-blur-md">
                <p className="text-sm text-muted-foreground">
                  <span className="text-foreground font-medium">Explore the iPhone.</span> Click a
                  glowing hotspot or select a chip to learn how each subsystem works — then drag to
                  rotate the model, scroll to zoom.
                </p>
              </div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-4 flex items-center gap-4"
          >
            <button
              onClick={() => setAutoRotate((r) => !r)}
              className="px-8 py-3 bg-primary text-primary-foreground rounded font-semibold hover:bg-primary/90 transition-colors duration-200 inline-flex items-center gap-2"
            >
              <RotateCcw size={16} />
              {autoRotate ? 'Pause Rotation' : 'Resume Rotation'}
            </button>
          </motion.div>
        </motion.div>

        {/* Right: 3D canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative h-[420px] md:h-[560px] lg:h-[620px] rounded-2xl overflow-hidden border border-border/60 bg-gradient-to-b from-card/40 to-transparent"
        >
          <Suspense
            fallback={
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="animate-spin text-primary" size={32} />
                  <p className="text-sm">Loading 3D model…</p>
                </div>
              </div>
            }
          >
            <Canvas
              shadows
              dpr={[1, 2]}
              camera={{ position: [0, 0.4, 3.2], fov: 35 }}
              gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
            >
              <Scene
                activeHotspot={activeHotspot}
                onSelect={selectHotspot}
                autoRotate={autoRotate}
                onPositionsReady={handlePositionsReady}
                hotspotPositions={hotspotPositions}
              />
            </Canvas>
          </Suspense>

          {/* Hint overlay */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-background/60 backdrop-blur-md border border-border/60 text-[11px] text-muted-foreground">
            Drag to rotate · Scroll to zoom
          </div>
        </motion.div>
      </div>
    </div>
  );
}
