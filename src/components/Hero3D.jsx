import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Text, Trail, Line } from '@react-three/drei';
import * as THREE from 'three';

// 1. THE MOUSE RIG (Keeps it interactive)
function Rig() {
  useFrame((state) => {
    const { x, y } = state.mouse;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, x * 2, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, y * 2, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

// 2. A SINGLE ATOM RING WITH CODE ELECTRONS
function AtomRing({ radius, color, rotation, speed, codeSnippets }) {
  const ringRef = useRef();
  
  // Create 'electrons' (Text) associated with this ring
  const electrons = useMemo(() => {
    return codeSnippets.map((text, i) => ({
      text,
      angle: (i / codeSnippets.length) * Math.PI * 2, // Evenly spread
      ref: { current: null } // Placeholder ref
    }));
  }, [codeSnippets]);

  useFrame((state) => {
    if (!ringRef.current) return;
    
    // Rotate the entire ring group for visual effect
    const t = state.clock.getElapsedTime() * speed;
    
    // Update Ring Rotation
    // ringRef.current.rotation.z = t; // Optional: Spin the ring geometry itself

    // Update Electron Positions along the ring path
    electrons.forEach((el) => {
      if (el.ref.current) {
        // Calculate position on the circle
        // The ring is already rotated via the group prop, so we just move in local Circle (X/Y)
        const currentAngle = el.angle - t; 
        el.ref.current.position.x = Math.cos(currentAngle) * radius;
        el.ref.current.position.y = Math.sin(currentAngle) * radius;
        el.ref.current.position.z = 0; // Flat on the ring plane

        // Ensure text is always upright facing camera
        el.ref.current.quaternion.copy(state.camera.quaternion);
      }
    });
  });

  return (
    <group rotation={rotation} ref={ringRef}>
      
      {/* VISUAL RING PATH */}
      <mesh>
        <torusGeometry args={[radius, 0.02, 32, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>

      {/* CODE "ELECTRONS" */}
      {electrons.map((el, i) => (
        <group key={i}>
            <Text
              ref={(obj) => (el.ref.current = obj)} // Assign ref manually
              fontSize={0.25}
              color={color}
              font="https://fonts.gstatic.com/s/jetbrainsmono/v13/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0pnF8R-0.woff2"
              anchorX="center"
              anchorY="middle"
            >
              {el.text}
            </Text>
        </group>
      ))}
    </group>
  );
}

// 3. THE MAIN ATOM COMPONENT
function CodingAtom() {
  return (
    <group scale={1.1}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        
        {/* CENTER NUCLEUS */}
        <mesh>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color="#00ffff" wireframe />
        </mesh>
        <mesh>
           <sphereGeometry args={[0.8, 16, 16]} />
           <meshBasicMaterial color="#00ffff" transparent opacity={0.15} />
        </mesh>

        {/* ORBIT 1: CHEMISTRY & BASICS (Blue) */}
        {/* Tilted 60 degrees X */}
        <AtomRing 
            radius={3.5} 
            color="#3b82f6" 
            rotation={[Math.PI / 3, 0, 0]} 
            speed={0.5} 
            codeSnippets={["import numpy", "H2 + O2", "reaction_rate()"]}
        />

        {/* ORBIT 2: AI & DATA (Purple) */}
        {/* Tilted -60 degrees X */}
        <AtomRing 
            radius={4} 
            color="#a855f7" 
            rotation={[-Math.PI / 3, 0, 0]} 
            speed={0.4} 
            codeSnippets={["torch.load()", "model.fit()", "optimize"]}
        />

        {/* ORBIT 3: DEV & SYSTEMS (Cyan) */}
        {/* Flat Y rotation */}
        <AtomRing 
            radius={4.5} 
            color="#22d3ee" 
            rotation={[0, Math.PI / 2, 0]} 
            speed={0.6} 
            codeSnippets={["npm start", "docker build", "git push"]}
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
        eventSource={document.body} // Vital for interactions
      >
        <Suspense fallback={null}>
            {/* Interactive Camera Rig */}
            <Rig />
            
            {/* The Atom Scene */}
            <CodingAtom />
        </Suspense>

        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade />
      </Canvas>
    </div>
  );
}