import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Sparkles, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';

// 1. THE LIQUID CORE
function CyberCore() {
  const meshRef = useRef(null);
  const materialRef = useRef(null);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    // Mouse Interaction vars
    const { x, y } = state.mouse;
    const time = state.clock.getElapsedTime();

    // A. Rotation: Look at mouse
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, y * 0.2, 0.1);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, x * 0.2, 0.1);

    // B. Color Morphing: Change color based on Mouse X position
    // If mouse is left: Blue. If mouse is right: Purple.
    const colorA = new THREE.Color('#0ea5e9'); // Sky Blue
    const colorB = new THREE.Color('#a855f7'); // Purple
    
    // Smoothly mix the colors
    const targetColor = colorA.clone().lerp(colorB, (x + 1) / 2); 
    materialRef.current.color.lerp(targetColor, 0.05);

    // C. Breathing Effect: Change distortion speed
    // If hovered, it moves faster!
    materialRef.current.distort = THREE.MathUtils.lerp(materialRef.current.distort, hovered ? 0.6 : 0.3, 0.05);
    materialRef.current.speed = hovered ? 4 : 1.5;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.2}>
      <Sphere 
        ref={meshRef} 
        args={[1.8, 64, 64]} // High detail sphere
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        scale={2}
      >
        <MeshDistortMaterial
          ref={materialRef}
          color="#4f46e5"
          attach="material"
          distort={0.4} // How "bumpy" it is
          speed={2}     // How fast it ripples
          roughness={0.2}
          metalness={0.9} // Make it look like liquid chrome
        />
      </Sphere>
      
      {/* Outer Glow Ring */}
      <mesh scale={4.5} rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[1, 0.01, 16, 100]} />
        <meshBasicMaterial color="white" transparent opacity={0.1} />
      </mesh>
    </Float>
  );
}

// 2. CAMERA RIG (Moves the whole world slightly)
function CameraRig() {
  useFrame((state) => {
    // Moves camera gently based on mouse pos
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.mouse.x * 2, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.mouse.y * 2, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        
        {/* Cinematic Lighting */}
        <ambientLight intensity={0.2} />
        {/* Blue Light Left */}
        <pointLight position={[-10, 0, 10]} intensity={3} color="#3b82f6" /> 
        {/* Purple Light Right */}
        <pointLight position={[10, 0, 10]} intensity={3} color="#a855f7" />  
        
        {/* Components */}
        <CameraRig />
        <CyberCore />

        {/* Space Dust */}
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        <Sparkles count={80} scale={10} size={2} speed={0.4} opacity={0.5} color="#cbd5e1" />
        
      </Canvas>
    </div>
  );
}