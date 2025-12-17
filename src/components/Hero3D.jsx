import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Text, Float, Stars, Torus } from '@react-three/drei';
import * as THREE from 'three';

// 1. PYTHON CODE ORBITING (No external font dependency to avoid crashes)
function CodeElectron({ text, radius, speed, yOffset, color }) {
  const ref = useRef();
  const angle = Math.random() * Math.PI * 2;

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() * speed;
    ref.current.position.x = Math.cos(t + angle) * radius;
    ref.current.position.z = Math.sin(t + angle) * radius;
    ref.current.position.y = Math.sin(t * 2) * 0.5 + yOffset;
    ref.current.lookAt(state.camera.position);
  });

  return (
    <Text
      ref={ref}
      fontSize={0.35} // Slightly smaller code for cleaner look
      color={color}
      anchorX="center"
      anchorY="middle"
      // Default font avoids network loading errors
    >
      {text}
    </Text>
  );
}

// 2. THE NUCLEAR CORE
function NuclearCore() {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const scalePulse = 2.2 + Math.sin(t * 4) * 0.1; // Faster pulse
    meshRef.current.scale.set(scalePulse, scalePulse, scalePulse);
  });

  return (
    <Float floatIntensity={1} speed={5}>
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#00f0ff"        // Cyan
          emissive="#00f0ff"     // Strong Cyan Glow
          emissiveIntensity={3}  // Very Bright
          distort={0.5} 
          speed={5} 
          roughness={0}
        />
      </Sphere>
      
      {/* Visual Ring for Orbit Path */}
      <Torus args={[3.5, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
      </Torus>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
      <Canvas camera={{ position: [0, 1, 9], fov: 45 }}>
        
        {/* Cinematic Fog for Depth (Hides edges of screen) */}
        <fog attach="fog" args={['#000', 8, 25]} />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 0]} intensity={8} color="#00f0ff" distance={10} />

        {/* The Action */}
        <NuclearCore />

        {/* Floating Python Code */}
        <group rotation={[0.2, 0, 0]}>
          <CodeElectron text="import numpy as np" radius={3.5} speed={0.6} yOffset={1} color="#4ade80" />
          <CodeElectron text="def reaction():" radius={4.0} speed={0.5} yOffset={-1.5} color="#c084fc" />
          <CodeElectron text="return impact" radius={3.5} speed={0.7} yOffset={0} color="#60a5fa" />
          <CodeElectron text="class Agent:" radius={3.2} speed={0.4} yOffset={1.2} color="#f472b6" />
        </group>

        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade />
        
      </Canvas>
    </div>
  );
}