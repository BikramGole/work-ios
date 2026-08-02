import { useLayoutEffect, useCallback, useState, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Loader2, RotateCcw } from 'lucide-react';
import { useGLTF } from '@react-three/drei';
import { Vector3, DoubleSide, PCFShadowMap } from 'three';
import type { Mesh as ThreeMesh } from 'three';
import { HOTSPOTS } from './hotspotData';

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
  useLayoutEffect(() => {
    scene.updateMatrixWorld(true);
    const positions: Record<string, [number, number, number]> = {};
    for (const hotspot of HOTSPOTS) {
      const centers: Vector3[] = [];
      for (const partId of hotspot.partIds) {
        scene.traverse((child) => {
          const mesh = child as ThreeMesh;
          if (mesh.isMesh && (mesh.name === partId || mesh.parent?.name === partId)) {
            mesh.geometry.computeBoundingBox();
            const box = mesh.geometry.boundingBox;
            if (box) {
              const c = new Vector3();
              box.getCenter(c);
              mesh.localToWorld(c);
              centers.push(c);
            }
          }
        });
      }
      if (centers.length) {
        const avg = centers.reduce((a, b) => a.add(b), new Vector3()).divideScalar(centers.length);
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
                  side={DoubleSide}
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

function ModelCanvas({
  activeHotspot,
  onSelect,
  autoRotate,
}: {
  activeHotspot: string | null;
  onSelect: (id: string) => void;
  autoRotate: boolean;
}) {
  const [hotspotPositions, setHotspotPositions] = useState<Record<string, [number, number, number]>>({});

  const handlePositionsReady = useCallback((positions: Record<string, [number, number, number]>) => {
    setHotspotPositions(positions);
  }, []);

  return (
    <Canvas
      shadows={{ type: PCFShadowMap }}
      dpr={[1, 2]}
      camera={{ position: [0, 0.4, 3.2], fov: 35 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Scene
        activeHotspot={activeHotspot}
        onSelect={onSelect}
        autoRotate={autoRotate}
        onPositionsReady={handlePositionsReady}
        hotspotPositions={hotspotPositions}
      />
    </Canvas>
  );
}

export default function HeroModel({
  activeHotspot,
  onSelect,
  autoRotate,
  onToggleRotate,
}: {
  activeHotspot: string | null;
  onSelect: (id: string) => void;
  autoRotate: boolean;
  onToggleRotate: () => void;
}) {
  return (
    <div className="relative h-full">
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
        <ModelCanvas
          activeHotspot={activeHotspot}
          onSelect={onSelect}
          autoRotate={autoRotate}
        />
      </Suspense>

      {/* Hint overlay */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-background/60 backdrop-blur-md border border-border/60 text-[11px] text-muted-foreground">
        Drag to rotate · Scroll to zoom
      </div>

      {/* Pause/resume */}
      <motion.button
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        onClick={onToggleRotate}
        className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-background/60 backdrop-blur-md border border-border/60 text-[11px] text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors inline-flex items-center gap-1.5"
      >
        <RotateCcw size={12} />
        {autoRotate ? 'Pause' : 'Resume'}
      </motion.button>
    </div>
  );
}
