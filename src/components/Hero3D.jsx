import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Text, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

// 1. A SINGLE LINE OF CODE THAT ORBITS
function CodeElectron({ text, radius, speed, yOffset, color }) {
  const ref = useRef();
  
  // Random start position
  const angle = Math.random() * Math.PI * 2;

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() * speed;
    
    // Circular Orbit Math
    ref.current.position.x = Math.cos(t + angle) * radius;
    ref.current.position.z = Math.sin(t + angle) * radius;
    // Bobbing up and down
    ref.current.position.y = Math.sin(t * 2) * 0.5 + yOffset;
    
    // Always face the camera (Billboarding)
    ref.current.lookAt(state.camera.position);
  });

  return (
    <Text
      ref={ref}
      fontSize={0.4}
      color={color}
      font="https://fonts.gstatic.com/s/jetbrainsmono/v13/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0pnF8R-0.woff2" // Coding Font
      characters="abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+"
    >
      {text}
    </Text>
  );
}

// 2. THE NUCLEAR CORE (Volatile Energy)
function NuclearCore() {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    // Pulse scale with time
    const t = clock.getElapsedTime();
    const scalePulse = 2 + Math.sin(t * 3) * 0.1; 
    meshRef.current.scale.set(scalePulse, scalePulse, scalePulse);
  });

  return (
    <Float floatIntensity={1} speed={5}>
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        {/* Glowing Emissive Material */}
        <MeshDistortMaterial
          color="#22d3ee"      // Cyan Core
          emissive="#0ea5e9"   // Inner Glow
          emissiveIntensity={2} 
          distort={0.6}        // Very unstable/liquid
          speed={4}            // Fast movement
          roughness={0}
        />
      </Sphere>
      
      {/* Energy Haze around it */}
      <mesh scale={2.8}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.05} />
      </mesh>
    </Float>
  );
}

function ElectronRing({ radius, rotation }) {
  return (
    <mesh rotation={rotation}>
      <torusGeometry args={[radius, 0.01, 16, 100]} />
      <meshBasicMaterial color="white" transparent opacity={0.1} />
    </mesh>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 40 }}>
        
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 0, 0]} intensity={5} color="#22d3ee" /> {/* Light coming from center */}

        {/* 1. THE NUCLEUS */}
        <NuclearCore />

        {/* 2. THE PYTHON ORBITS */}
        <group rotation={[0.2, 0.2, 0]}>
          <ElectronRing radius={3.5} rotation={[Math.PI / 2.5, 0, 0]} />
          <ElectronRing radius={4.5} rotation={[0, Math.PI / 2.5, 0]} />
          
          <CodeElectron text="import numpy as np" radius={3.5} speed={0.8} yOffset={1} color="#4ade80" />
          <CodeElectron text="def atomic_reaction():" radius={4.5} speed={0.6} yOffset={-1} color="#c084fc" />
          <CodeElectron text="while(alive): build()" radius={3.5} speed={0.5} yOffset={-0.5} color="#60a5fa" />
          <CodeElectron text="<MeshDistort />" radius={5} speed={0.3} yOffset={1.5} color="#f472b6" />
        </group>

        {/* 3. ATMOSPHERE */}
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        
      </Canvas>
    </div>
  );
}