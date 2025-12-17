import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Sparkles, Text, Trail } from '@react-three/drei';
import * as THREE from 'three';

// 1. THE CAMERA RIG (MAKES IT INTERACTIVE)
function Rig() {
  useFrame((state) => {
    // Read mouse position (x: -1 to 1, y: -1 to 1)
    const { x, y } = state.mouse;
    
    // Smoothly tilt the camera to follow the mouse
    // "lerp" makes it smooth/lazy instead of jittery
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, x * 2, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, y * 2, 0.05);
    
    // Force camera to always look at the center (The Atom)
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

// 2. FLOATING CODE
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
      fontSize={0.25}
      color={color}
      anchorX="center"
      anchorY="middle"
      font="https://fonts.gstatic.com/s/jetbrainsmono/v13/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0pnF8R-0.woff2"
    >
      {text}
    </Text>
  );
}

// 3. THE ATOMIC CORE
function NuclearCore() {
  const meshRef = useRef();
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if(meshRef.current) {
        meshRef.current.rotation.x = t * 0.3;
        meshRef.current.rotation.y = t * 0.5;
    }
  });

  return (
    <group scale={1.2}>
        <Float speed={5} rotationIntensity={1} floatIntensity={1}>
            {/* The Reactor Geometry */}
            <mesh ref={meshRef}>
                <icosahedronGeometry args={[1, 1]} />
                <meshBasicMaterial color="#00ffff" wireframe />
            </mesh>
            
            {/* Inner Energy */}
            <mesh>
                <sphereGeometry args={[0.8, 16, 16]} />
                <meshBasicMaterial color="#00ffff" transparent opacity={0.15} />
            </mesh>
        </Float>
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 w-full h-full">
      {/* eventSource={document.body} is the SECRET SAUCE. 
          It tells the 3D scene to listen to the mouse on the WHOLE page, 
          even if you are hovering over a React button. */}
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 45 }}
        eventSource={document.body} 
      >
        
        {/* Adds the interaction */}
        <Rig />

        <Suspense fallback={null}>
            <NuclearCore />
            <group rotation={[0.2, 0, 0]}>
                <CodeElectron text="import atomic" radius={5} speed={0.5} yOffset={1.5} color="#00ffff" />
                <CodeElectron text="def research():" radius={6} speed={0.4} yOffset={-1.5} color="#c084fc" />
                <CodeElectron text="return output" radius={4.5} speed={0.6} yOffset={0} color="#34d399" />
            </group>
        </Suspense>

        {/* Dense Starfield */}
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade />
        
        {/* Floating Sparkles close to camera */}
        <Sparkles count={50} scale={10} size={4} speed={0.4} opacity={0.5} color="#ffffff" />
        
      </Canvas>
    </div>
  );
}