import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Stars, TorusKnot } from '@react-three/drei';
import * as THREE from 'three';

function InteractiveShape() {
  const meshRef = useRef(null);
  
  // This hook runs 60 times per second to handle animation
  useFrame((state) => {
    if (!meshRef.current) return;

    // 1. Get Mouse Position (x and y are between -1 and 1)
    const { x, y } = state.mouse;

    // 2. Smoothly rotate the object to look at the mouse
    // We use "lerp" (Linear Interpolation) to make the movement lazy/smooth, not instant
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, y * 0.5, 0.1);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, x * 0.5, 0.1);

    // 3. Constant slow spin (so it moves even if you don't touch it)
    // meshRef.current.rotation.z += 0.002;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={meshRef}>
        
        {/* INNER CORE: The Wireframe Globe */}
        <mesh scale={2.8}>
          <icosahedronGeometry args={[1, 2]} />
          <meshStandardMaterial 
            color="#4f46e5" 
            wireframe 
            emissive="#4f46e5"
            emissiveIntensity={0.5} 
            transparent
            opacity={0.3}
          />
        </mesh>

        {/* OUTER RING: A Sci-Fi Torus for complexity */}
        <mesh scale={4.2} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1, 0.02, 16, 100]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
        </mesh>
        
        {/* CROSS RINGS: Creates the "Atom" or "AI Brain" look */}
        <mesh scale={4.2} rotation={[0, Math.PI / 4, 0]}>
          <torusGeometry args={[1, 0.02, 16, 100]} />
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.8} />
        </mesh>

      </group>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 w-full h-full">
      <Canvas camera={{ position: [0, 0, 8] }}>
        
        {/* 1. LIGHTING */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#8b5cf6" />
        <pointLight position={[-10, -10, -10]} intensity={2} color="#06b6d4" />

        {/* 2. THE PARTICLES (Fireflies effect) */}
        {/* Close, fast particles */}
        <Sparkles count={50} scale={5} size={4} speed={0.4} opacity={0.5} color="#22d3ee" />
        {/* Far, slow particles (Depth) */}
        <Sparkles count={100} scale={12} size={2} speed={0.1} opacity={0.2} color="#ffffff" />
        
        {/* Background Stars */}
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade />

        {/* 3. THE INTERACTIVE OBJECT */}
        <InteractiveShape />

      </Canvas>
    </div>
  );
}