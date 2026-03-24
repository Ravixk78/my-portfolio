import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';

function AnimatedSphere() {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <Sphere args={[1.2, 128, 128]} scale={2}>
        <MeshDistortMaterial
          color="#006633" // Dark Green base
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0}
          emissive="#00ff88" // Neon Green emissive
          emissiveIntensity={0.3}
        />
      </Sphere>
    </Float>
  );
}

function SmallSphere({ position, color }) {
  const mesh = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.position.y += Math.sin(time + position[0]) * 0.005;
  });

  return (
    <Float speed={4} rotationIntensity={3} floatIntensity={2}>
      <Sphere ref={mesh} args={[0.2, 32, 32]} position={position}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} roughness={0} />
      </Sphere>
    </Float>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#050505] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full hero-gradient pointer-events-none" />
      <Canvas camera={{ position: [0, 0, 7], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#00ff88" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#006644" />
        <spotLight position={[0, 5, 0]} angle={0.2} penumbra={1} intensity={1} />
        
        <AnimatedSphere />
        
        <SmallSphere position={[-5, 3, -3]} color="#00ff88" />
        <SmallSphere position={[5, -3, -2]} color="#00cc66" />
        <SmallSphere position={[-4, -4, 0]} color="#ffffff" />
        <SmallSphere position={[4, 4, -4]} color="#00ffaa" />
      </Canvas>
    </div>
  );
}
