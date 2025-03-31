'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';

// Improved 3D Cube Component for Main Page
export function AnimatedCube() {
  const meshRef = useRef();
  const spotLightRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      
      // More interesting animation
      meshRef.current.rotation.x = Math.sin(t * 0.8) * 0.3;
      meshRef.current.rotation.y += 0.02; // Faster rotation
      meshRef.current.position.y = Math.sin(t) * 0.5;
      
      // Pulsating effect
      const scale = 1 + Math.sin(t * 2) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });
  
  return (
    <group>
      {/* Rotating spotlight for dramatic effect */}
      <spotLight
        ref={spotLightRef}
        position={[0, 10, 0]}
        angle={0.2}
        penumbra={1}
        intensity={2}
        color="#9333EA"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      
      <mesh 
        ref={meshRef} 
        rotation={[0.5, 0.5, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[3, 3, 3]} />
        <meshPhysicalMaterial
          color="#9333EA"
          metalness={0.8}
          roughness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={1.5}
          transmission={0.1}
          reflectivity={1}
          emissive="#4C0499"
          emissiveIntensity={0.5}
        />
        {/* Adding visible edges */}
        <Edges 
          scale={1.02} 
          threshold={15} 
          color="#F0ABFF" 
        />
      </mesh>
      
      {/* Add a subtle platform/ground */}
      <mesh 
        position={[0, -4, 0]} 
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial 
          color="#14002A" 
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>
    </group>
  );
}