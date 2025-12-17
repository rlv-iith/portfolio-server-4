import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Text } from '@react-three/drei';
import * as THREE from 'three';

// 1. THE CAMERA RIG (Interaction Logic)
// Placed OUTSIDE the suspense so interaction works immediately
function Rig() {
  useFrame((state) => {
    const { x, y } = state.mouse;
    // Gentle parallax effect
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, x * 1.5, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, y * 1.5, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

// 2. SINGLE ELECTRON (A floating text snippet)
function CodeElectron({ text, radius, speed, angleOffset, color }) {
  const ref = useRef();
  
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() * speed;
    
    // Calculate position on the ring
    const currentAngle = angleOffset + t; 
    
    // Circular motion logic
    ref.current.position.x = Math.cos(currentAngle) * radius;
    ref.current.position.y = Math.sin(currentAngle) * radius;
    ref.current.position.z = 0; // Flat on ring plane

    // Force text to face the screen always, even if ring is tilted
    ref.current.quaternion.copy(state.camera.quaternion);
  });

  return (
    <Text
      ref={ref}
      fontSize={0.25}
      color={color}
      // Removed font URL to ensure it never crashes
      anchorX="center"
      anchorY="middle"
    >
      {text}
    </Text>
  );
}

// 3. AN ORBITAL RING CONTAINER
function AtomRing({ rotation, color, radius, speed, codes }) {
    return (
        <group rotation={rotation}>
            {/* Visual Ring Path */}
            <mesh>
                <torusGeometry args={[radius, 0.02, 64, 100]} />
                <meshBasicMaterial color={color} transparent opacity={0.3} />
            </mesh>

            {/* Code Particles on this ring */}
            {codes.map((text, i) => (
                <CodeElectron 
                    key={i}
                    text={text}
                    radius={radius}
                    speed={speed}
                    angleOffset={(i / codes.length) * Math.PI * 2} // Spread evenly
                    color={color}
                />
            ))}
        </group>
    )
}

// 4. THE CENTRAL NUCLEUS
function Nucleus() {
    return (
        <group>
             {/* Glowing Wireframe Core */}
             <mesh>
                <icosahedronGeometry args={[0.7, 5]} />
                <meshBasicMaterial color="#00ffff" wireframe />
             </mesh>
             {/* Inner Solid Core (faint) */}
             <mesh>
                <icosahedronGeometry args={[0.1, 0]} />
                <meshBasicMaterial color="#fbff00ff" transparent opacity={1} />
             </mesh>
        </group>
    )
}

// 5. THE MAIN SCENE
function CodingAtom() {
  return (
    <group scale={1.2}>
      <Float speed={4} rotationIntensity={0.5} floatIntensity={0.5}>
        
        <Nucleus />

        {/* Ring 1: Chemistry (Blue) - Tilted X */}
        <AtomRing 
            rotation={[Math.PI / 3, 0, 0]}
            color="#3b82f6" 
            radius={1.2} 
            speed={0.5} 
            codes={['import numpy', 'H2O', 'Reaction']}
        />

        {/* Ring 2: AI (Purple) - Tilted -X */}
        <AtomRing 
            rotation={[-Math.PI / 3, 0, 0]}
            color="#a855f7" 
            radius={1.8} 
            speed={0.4} 
            codes={['torch.load', 'Agent', 'Optimize']}
        />

        {/* Ring 3: Code (Cyan) - Flat Y */}
        <AtomRing 
            rotation={[0, Math.PI / 4, 0]}
            color="#22d3ee" 
            radius={1.5} 
            speed={0.6} 
            codes={['git push', 'deploy', 'v4.0']}
        />

      </Float>
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 w-full h-full">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 45 }}
        eventSource={document.body} 
      >
        {/* INTERACTION (RIG) IS NOW OUTSIDE SUSPENSE */}
        {/* This means stars move even if the atom hasn't loaded yet */}
        <Rig />

        <Suspense fallback={null}>
            <CodingAtom />
        </Suspense>

        {/* Dense Starfield */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
      </Canvas>
    </div>
  );
}