import { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Sparkles, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';

// 1. THE LIQUID CORE
function CyberCore() {
  const meshRef = useRef(null);
  const materialRef = useRef(null);
  const [hovered, setHover] = useState(false);
  
  // Gets the screen size in "3D units" (not pixels)
  const { viewport } = useThree();
  
  // MOBILE CHECK: If screen width < 5 units, it's mobile.
  // We shrink the scale: Desktop = 2.0, Mobile = 1.3
  const responsiveScale = viewport.width < 5 ? 1.3 : 2.2;

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    // A. MOUSE INTERACTION
    // Use the mouse position to drive rotation and color
    const { x, y } = state.mouse;

    // Smooth Look-At Logic
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, y * 0.4, 0.05);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, x * 0.4, 0.05);

    // B. COLOR MORPH LOGIC (Verified)
    // Map mouse X (-1 to 1) -> (0 to 1) for color mixing
    const colorMixFactor = (x + 1) / 2;
    
    // Define your colors
    const blue = new THREE.Color('#3b82f6');  // Recruiter Blue
    const purple = new THREE.Color('#a855f7'); // Tech Purple
    const emerald = new THREE.Color('#10b981'); // Academic Green (Optional mix)

    // Create a target color that mixes based on position
    // If you go far right (Tech), it turns Purple. Left (Recruiter) = Blue.
    const targetColor = blue.clone().lerp(purple, colorMixFactor);

    // Smoothly transition the actual material color
    materialRef.current.color.lerp(targetColor, 0.05);

    // C. HOVER / DISTORTION
    materialRef.current.distort = THREE.MathUtils.lerp(materialRef.current.distort, hovered ? 0.6 : 0.3, 0.05);
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.2}>
      <Sphere 
        ref={meshRef} 
        args={[1, 64, 64]} 
        // IMPORTANT: We explicitly scale based on screen width
        scale={responsiveScale}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <MeshDistortMaterial
          ref={materialRef}
          color="#3b82f6"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.9}
        />
      </Sphere>
      
      {/* Outer Ring - Also Scales */}
      <mesh scale={responsiveScale * 2.2} rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[1, 0.01, 16, 100]} />
        <meshBasicMaterial color="white" transparent opacity={0.1} />
      </mesh>
    </Float>
  );
}

function CameraRig() {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.mouse.x * 0.5, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.mouse.y * 0.5, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 w-full h-full">
      {/* 
        CRITICAL FIX: eventSource={document.body} 
        This tells the 3D scene: "Listen to the mouse EVERYWHERE on the page, 
        even if the user is hovering over a button or text."
      */}
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 45 }}
        eventSource={document.body}
        eventPrefix="client"
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[-10, 0, 10]} intensity={2} color="#3b82f6" />
        <pointLight position={[10, 0, 10]} intensity={2} color="#a855f7" />

        <CameraRig />
        <CyberCore />

        {/* Dense Starfield for Coolness */}
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
}