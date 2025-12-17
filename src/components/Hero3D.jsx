import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Text, Float, Stars, Torus, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// 1. FLOATING CODE SNIPPETS (The "Electrons")
// Adjusted: Smaller text, wider orbit radius so it doesn't block "Ramuni"
function CodeElectron({ text, radius, speed, yOffset, color }) {
  const ref = useRef();
  // Random starting position on the circle
  const angle = Math.random() * Math.PI * 2;

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() * speed;
    
    // Orbit Math
    ref.current.position.x = Math.cos(t + angle) * radius;
    ref.current.position.z = Math.sin(t + angle) * radius;
    ref.current.position.y = Math.sin(t * 1.5) * 0.5 + yOffset;
    
    // Always look at camera
    ref.current.lookAt(state.camera.position);
  });

  return (
    <Text
      ref={ref}
      fontSize={0.25} // Smaller font to look elegant
      color={color}
      anchorX="center"
      anchorY="middle"
      font="https://fonts.gstatic.com/s/jetbrainsmono/v13/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0pnF8R-0.woff2"
    >
      {text}
    </Text>
  );
}

// 2. THE NUCLEAR / AI CORE (Wireframe Energy)
function AtomicCore() {
  const meshRef = useRef();
  const outerRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Complex rotation
    if(meshRef.current) {
        meshRef.current.rotation.x = t * 0.4;
        meshRef.current.rotation.y = t * 0.6;
    }
    if(outerRef.current) {
        outerRef.current.rotation.z = -t * 0.2;
        outerRef.current.rotation.x = Math.cos(t * 0.5) * 0.5;
    }
  });

  return (
    <group scale={1.2}> {/* Overall size of the core */}
        <Float speed={5} rotationIntensity={1} floatIntensity={1}>
            {/* Inner "Nucleus" - Dense Wireframe */}
            <mesh ref={meshRef}>
                <icosahedronGeometry args={[1, 1]} />
                <meshStandardMaterial 
                    color="#22d3ee" 
                    emissive="#22d3ee"
                    emissiveIntensity={2}
                    wireframe 
                />
            </mesh>

            {/* Energy Field (Ghost Sphere) */}
            <mesh>
                <sphereGeometry args={[1.2, 32, 32]} />
                <meshStandardMaterial color="#000" transparent opacity={0.1} />
            </mesh>
            
            {/* Orbital Rings (Atomic Look) */}
            <group ref={outerRef}>
                <Torus args={[1.8, 0.02, 32, 100]} rotation={[Math.PI / 2, 0, 0]}>
                    <meshBasicMaterial color="#3b82f6" transparent opacity={0.3} />
                </Torus>
                <Torus args={[2.2, 0.02, 32, 100]} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
                    <meshBasicMaterial color="#a855f7" transparent opacity={0.3} />
                </Torus>
            </group>
        </Float>
    </group>
  );
}

// 3. MOUSE INTERACTIVE SPARKLES
function InteractiveSparkles() {
    const ref = useRef();
    useFrame((state) => {
        if(!ref.current) return;
        // Sway based on mouse
        const { x, y } = state.mouse;
        ref.current.rotation.x = -y * 0.2;
        ref.current.rotation.y = x * 0.2;
    });
    
    return (
        <group ref={ref}>
            <Sparkles count={80} scale={12} size={3} speed={0.4} opacity={0.5} color="#cbd5e1" />
        </group>
    );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
      <Canvas camera={{ position: [0, 1, 9], fov: 40 }}>
        <fog attach="fog" args={['#000', 8, 30]} />
        <ambientLight intensity={1} />
        <pointLight position={[0, 0, 0]} intensity={5} color="#22d3ee" distance={10} />

        {/* The Atom */}
        <AtomicCore />

        {/* Orbiting Code - Pushed to radius 5-6 to avoid blocking center */}
        <group rotation={[0.2, 0, 0]}>
          <CodeElectron text="class Agent:" radius={5} speed={0.4} yOffset={1.5} color="#4ade80" />
          <CodeElectron text="return impact" radius={5.5} speed={0.3} yOffset={-1.5} color="#c084fc" />
          <CodeElectron text="reaction()" radius={4.5} speed={0.5} yOffset={2} color="#60a5fa" />
          <CodeElectron text="<Orbitron />" radius={6} speed={0.2} yOffset={-0.5} color="#f472b6" />
        </group>

        <InteractiveSparkles />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade />
      </Canvas>
    </div>
  );
}