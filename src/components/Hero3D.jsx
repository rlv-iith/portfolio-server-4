import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Sparkles, Text, Trail } from '@react-three/drei';
import * as THREE from 'three';

// 1. FLOATING CODE WITH GLOW
function CodeElectron({ text, radius, speed, yOffset, color }) {
  const ref = useRef();
  const angle = Math.random() * Math.PI * 2;

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() * speed;
    ref.current.position.x = Math.cos(t + angle) * radius;
    ref.current.position.z = Math.sin(t + angle) * radius;
    ref.current.position.y = Math.sin(t * 1.5) * 0.5 + yOffset;
    ref.current.lookAt(state.camera.position);
  });

  return (
    <Text
      ref={ref}
      fontSize={0.3} // Text size
      color={color}
      font="https://fonts.gstatic.com/s/jetbrainsmono/v13/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0pnF8R-0.woff2"
      anchorX="center"
      anchorY="middle"
    >
      {text}
    </Text>
  );
}

// 2. THE HIGH-ENERGY REACTOR
function NuclearCore() {
  const meshRef = useRef();
  const ringRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Energetic spin
    if(meshRef.current) {
        meshRef.current.rotation.x = t * 0.5;
        meshRef.current.rotation.y = t * 0.8;
    }
    // Counter-spin rings
    if(ringRef.current) {
        ringRef.current.rotation.z = t * 0.3;
        ringRef.current.rotation.x = Math.sin(t * 0.5) * 0.5;
    }
  });

  return (
    <group scale={1.5}>
        <Float speed={5} rotationIntensity={1} floatIntensity={1}>
            
            {/* CORE: A complex Knot shape represents 'folding protein' or 'energy' */}
            <mesh ref={meshRef}>
                <torusKnotGeometry args={[0.8, 0.2, 100, 16]} />
                {/* meshBasicMaterial ALWAYS SHOWS UP, even in pitch black */}
                <meshBasicMaterial color="#00ffff" wireframe />
            </mesh>

            {/* Inner Glow Sphere */}
            <mesh>
                <sphereGeometry args={[0.6, 32, 32]} />
                <meshBasicMaterial color="#0099ff" transparent opacity={0.3} />
            </mesh>

            {/* Orbit Rings */}
            <group ref={ringRef}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[2, 0.02, 16, 100]} />
                    <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
                </mesh>
                <mesh rotation={[0, Math.PI / 2, 0]}>
                    <torusGeometry args={[2.5, 0.02, 16, 100]} />
                    <meshBasicMaterial color="#a855f7" transparent opacity={0.2} />
                </mesh>
            </group>

        </Float>
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 w-full h-full">
      <Canvas camera={{ position: [0, 1, 9], fov: 45 }}>
        
        {/* Lights (Backup) */}
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={5} color="#00ffff" />
        
        <Suspense fallback={null}>
            {/* The Reactor */}
            <NuclearCore />

            {/* Orbiting Python Code */}
            <group rotation={[0.2, 0, 0]}>
                <CodeElectron text="import react" radius={5} speed={0.5} yOffset={2} color="#00ffff" />
                <CodeElectron text="def main():" radius={6} speed={0.4} yOffset={-2} color="#c084fc" />
                <CodeElectron text="return future" radius={4.5} speed={0.6} yOffset={0} color="#34d399" />
            </group>
        </Suspense>

        {/* Lots of Stars & Sparkles */}
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade />
        <Sparkles count={50} scale={10} size={5} speed={0.4} opacity={0.5} color="#ffffff" />
        
      </Canvas>
    </div>
  );
}