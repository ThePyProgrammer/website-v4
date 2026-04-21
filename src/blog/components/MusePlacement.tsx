import { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';
import type { GLTF } from 'three-stdlib';
import * as THREE from 'three';

const MUSE_ELECTRODES = [
  { id: 'TP9', x: -0.82, y: 0.55, z: -0.38, region: 'behind left ear' },
  { id: 'AF7', x: -0.55, y: 0.90, z: 0.58, region: 'left forehead' },
  { id: 'AF8', x: 0.55, y: 0.90, z: 0.58, region: 'right forehead' },
  { id: 'TP10', x: 0.82, y: 0.55, z: -0.38, region: 'behind right ear' },
] as const;

const ELECTRODE_COLOR = '#00d4fd';

function HeadModel() {
  const gltf = useGLTF('/3d/bci/head.glb') as GLTF;
  const groupRef = useRef<THREE.Group>(null!);

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(gltf.scene);
    const center = box.getCenter(new THREE.Vector3());
    gltf.scene.position.sub(center);
    gltf.scene.scale.set(1.1, 1.13, 1.1);

    gltf.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.computeVertexNormals();
        mesh.material = new THREE.MeshStandardMaterial({
          color: 0x2a2a3e,
          transparent: true,
          opacity: 0.5,
          metalness: 0.1,
          roughness: 0.8,
          wireframe: true,
          side: THREE.DoubleSide,
        });
      }
    });
  }, [gltf]);

  return (
    <group ref={groupRef}>
      <primitive object={gltf.scene} />
    </group>
  );
}

function ElectrodeMarker({ electrode, hovered, onHover }: {
  electrode: typeof MUSE_ELECTRODES[number];
  hovered: boolean;
  onHover: (id: string | null) => void;
}) {
  const RADIUS = 1.05;
  const HEAD_SCALE = { x: 0.85, y: 1.1, z: 1.05 };
  const ELECTRODE_OFFSET = 0.22;
  const baseX = electrode.x * RADIUS * HEAD_SCALE.x;
  const baseY = electrode.y * RADIUS * HEAD_SCALE.y;
  const baseZ = electrode.z * RADIUS * HEAD_SCALE.z;
  // Offset radially outward in XZ plane only (don't push upward)
  const radial = new THREE.Vector2(baseX, baseZ);
  const radialLen = radial.length() || 1;
  const x = baseX + (baseX / radialLen) * ELECTRODE_OFFSET;
  const y = baseY;
  const z = baseZ + (baseZ / radialLen) * ELECTRODE_OFFSET;
  const normal = new THREE.Vector3(x, y, z).normalize();
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (meshRef.current) {
      const scale = hovered ? 1.5 : 1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group position={[x, y, z]}>
      <mesh
        ref={meshRef}
        onPointerEnter={() => onHover(electrode.id)}
        onPointerLeave={() => onHover(null)}
      >
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial
          color={ELECTRODE_COLOR}
          emissive={ELECTRODE_COLOR}
          emissiveIntensity={hovered ? 1.2 : 0.6}
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>
      <Html
        position={[normal.x * 0.18, normal.y * 0.18, normal.z * 0.18]}
        center
        distanceFactor={6}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        <div className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap transition-opacity ${
          hovered ? 'opacity-100' : 'opacity-60'
        }`} style={{ color: ELECTRODE_COLOR }}>
          {electrode.id}
        </div>
      </Html>
    </group>
  );
}

function MuseBand() {
  const RADIUS = 1.05;
  const HEAD_SCALE = { x: 0.85, y: 1.1, z: 1.05 };
  const BAND_OFFSET = 0.22; // radial outward offset in XZ

  // Build a spline through electrode positions, routing above the ears
  const points = [
    // TP9 end cap - below and behind
    new THREE.Vector3(-0.85 * RADIUS * HEAD_SCALE.x, 0.25 * RADIUS * HEAD_SCALE.y, -0.42 * RADIUS * HEAD_SCALE.z),
    // TP9
    new THREE.Vector3(-0.82 * RADIUS * HEAD_SCALE.x, 0.35 * RADIUS * HEAD_SCALE.y, -0.38 * RADIUS * HEAD_SCALE.z),
    // Sharp rise - still behind ear, going up fast
    new THREE.Vector3(-0.78 * RADIUS * HEAD_SCALE.x, 0.65 * RADIUS * HEAD_SCALE.y, -0.30 * RADIUS * HEAD_SCALE.z),
    // Above ear - stays high, starts coming forward
    new THREE.Vector3(-0.72 * RADIUS * HEAD_SCALE.x, 0.82 * RADIUS * HEAD_SCALE.y, -0.05 * RADIUS * HEAD_SCALE.z),
    // Left temple - high and forward
    new THREE.Vector3(-0.62 * RADIUS * HEAD_SCALE.x, 0.88 * RADIUS * HEAD_SCALE.y, 0.30 * RADIUS * HEAD_SCALE.z),
    // AF7
    new THREE.Vector3(-0.55 * RADIUS * HEAD_SCALE.x, 0.90 * RADIUS * HEAD_SCALE.y, 0.58 * RADIUS * HEAD_SCALE.z),
    // Forehead center
    new THREE.Vector3(0.0, 0.98 * RADIUS * HEAD_SCALE.y, 0.65 * RADIUS * HEAD_SCALE.z),
    // AF8
    new THREE.Vector3(0.55 * RADIUS * HEAD_SCALE.x, 0.90 * RADIUS * HEAD_SCALE.y, 0.58 * RADIUS * HEAD_SCALE.z),
    // Right temple - high and forward
    new THREE.Vector3(0.62 * RADIUS * HEAD_SCALE.x, 0.88 * RADIUS * HEAD_SCALE.y, 0.30 * RADIUS * HEAD_SCALE.z),
    // Above right ear - stays high
    new THREE.Vector3(0.72 * RADIUS * HEAD_SCALE.x, 0.82 * RADIUS * HEAD_SCALE.y, -0.05 * RADIUS * HEAD_SCALE.z),
    // Sharp descent behind right ear
    new THREE.Vector3(0.78 * RADIUS * HEAD_SCALE.x, 0.65 * RADIUS * HEAD_SCALE.y, -0.30 * RADIUS * HEAD_SCALE.z),
    // TP10
    new THREE.Vector3(0.82 * RADIUS * HEAD_SCALE.x, 0.35 * RADIUS * HEAD_SCALE.y, -0.38 * RADIUS * HEAD_SCALE.z),
    // TP10 end cap - below and behind
    new THREE.Vector3(0.85 * RADIUS * HEAD_SCALE.x, 0.25 * RADIUS * HEAD_SCALE.y, -0.42 * RADIUS * HEAD_SCALE.z),
  ];

  // Push points radially outward in XZ plane only (don't shift upward)
  const adjusted = points.map(p => {
    const radial = new THREE.Vector2(p.x, p.z);
    const len = radial.length() || 1;
    return new THREE.Vector3(
      p.x + (p.x / len) * BAND_OFFSET,
      p.y,
      p.z + (p.z / len) * BAND_OFFSET,
    );
  });

  const curve = new THREE.CatmullRomCurve3(adjusted);

  return (
    <group>
      {/* Main band body */}
      <mesh>
        <tubeGeometry args={[curve, 128, 0.05, 12, false]} />
        <meshStandardMaterial
          color="#555566"
          emissive="#00d4fd"
          emissiveIntensity={0.05}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      {/* Inner glow line */}
      <mesh>
        <tubeGeometry args={[curve, 128, 0.03, 12, false]} />
        <meshStandardMaterial
          color="#00d4fd"
          emissive="#00d4fd"
          emissiveIntensity={0.4}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}

function Scene({ hovered, onHover }: { hovered: string | null; onHover: (id: string | null) => void }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 4, 5]} intensity={2} />
      <directionalLight position={[-3, 2, -2]} intensity={0.8} />
      <directionalLight position={[0, 0, 5]} intensity={0.5} />
      <hemisphereLight args={['#1a1a2e', '#000000', 0.4]} />

      <group position={[0, -0.14, 0]}>
        <HeadModel />
        <MuseBand />
        {MUSE_ELECTRODES.map((e) => (
          <ElectrodeMarker
            key={e.id}
            electrode={e}
            hovered={hovered === e.id}
            onHover={onHover}
          />
        ))}
      </group>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.8}
      />
    </>
  );
}

export function MusePlacement() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="my-8 overflow-hidden bg-black">
      <div className="bg-[#262528] px-6 py-2 flex items-center gap-4">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 bg-[#ff7351]/40" />
          <div className="w-2.5 h-2.5 bg-[#00d4fd]/40" />
          <div className="w-2.5 h-2.5 bg-[#00d2fd]/40" />
        </div>
        <span className="font-headline text-[10px] text-[#00d4fd]/60 tracking-widest uppercase">
          muse_v1_electrode_placement
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-stretch">
        {/* 3D Canvas */}
        <div className="flex-1 h-[320px] md:h-[360px] cursor-grab active:cursor-grabbing">
          <Canvas camera={{ position: [0, 0.5, 5.5], fov: 35 }} gl={{ antialias: true }}>
            <Suspense fallback={null}>
              <Scene hovered={hovered} onHover={setHovered} />
            </Suspense>
          </Canvas>
        </div>

        {/* Legend */}
        <div className="md:w-[200px] p-5 md:border-l border-t md:border-t-0 border-[#48474a]/30 flex flex-col justify-center space-y-3">
          {MUSE_ELECTRODES.map((e) => (
            <div
              key={e.id}
              onMouseEnter={() => setHovered(e.id)}
              onMouseLeave={() => setHovered(null)}
              className={`flex items-center gap-3 font-mono text-sm cursor-default transition-opacity ${
                hovered && hovered !== e.id ? 'opacity-25' : 'opacity-100'
              }`}
            >
              <span className="text-[#00d4fd] font-bold w-10">{e.id}</span>
              <span className="text-[#f9f5f8]/60 text-xs">{e.region}</span>
            </div>
          ))}
          <div className="pt-2 border-t border-[#48474a]/30 font-mono text-[10px] text-[#adaaad]/50">
            4 channels @ ~250 Hz · drag to rotate
          </div>
        </div>
      </div>
    </div>
  );
}
