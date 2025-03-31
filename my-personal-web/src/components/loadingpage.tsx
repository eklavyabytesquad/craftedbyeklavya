'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  PerspectiveCamera, 
  Html, 
  Environment, 
  Edges,
  Stars,
  CameraShake
} from '@react-three/drei';
import * as THREE from 'three';

// Add type definitions for component props
interface DustParticle {
  scale: number;
  position: [number, number, number];
  speed: number;
}

interface NebulaColorData {
  color: string;
  emissive: string;
}


interface RingData {
  radius: number;
  tubeRadius: number;
  color: string;
  rotationSpeed: number;
  position: [number, number, number];
}

// Camera Animation Controller
function CameraController() {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3(0, 0, 20));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  
  useFrame((state, delta) => {
    // Smoothly change camera position every 8 seconds
    const time = state.clock.getElapsedTime();
    const period = 8;
    const phase = (time % period) / period;
    
    if (phase < 0.25) {
      // Move to position 1
      targetPosition.current.set(Math.sin(time * 0.1) * 15, Math.cos(time * 0.1) * 5, 20);
      targetLookAt.current.set(0, 0, 0);
    } else if (phase < 0.5) {
      // Move to position 2
      targetPosition.current.set(-10, 15 * Math.sin(time * 0.1), 15);
      targetLookAt.current.set(5, -5, 0);
    } else if (phase < 0.75) {
      // Move to position 3
      targetPosition.current.set(10 * Math.cos(time * 0.15), 5, 15 * Math.sin(time * 0.1));
      targetLookAt.current.set(0, Math.sin(time * 0.2) * 5, 0);
    } else {
      // Move to position 4
      targetPosition.current.set(0, 15 * Math.sin(time * 0.1), 20);
      targetLookAt.current.set(Math.sin(time * 0.3) * 10, Math.cos(time * 0.3) * 8, 0);
    }
    
    // Smoothly interpolate camera position and lookAt
    camera.position.lerp(targetPosition.current, delta * 0.8);
    
    // Create a temporary vector for the lookAt target
    const currentLookAt = new THREE.Vector3();
    currentLookAt.copy(state.camera.position).add(state.camera.getWorldDirection(new THREE.Vector3()).multiplyScalar(10));
    
    // Smoothly interpolate the lookAt
    currentLookAt.lerp(targetLookAt.current, delta * 1.5);
    camera.lookAt(currentLookAt);
  });
  
  return null;
}

// Enhanced Cosmic Background with more elements
export function CosmicBackground() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Smoother rotation
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.02;
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.01) * 0.1;
    }
  });
  
  // Generate nebula colors
  const nebulaColors = useMemo(() => [
    { color: "#4C0099", emissive: "#7B00FF" },
    { color: "#3A0075", emissive: "#9D00FF" },
    { color: "#6600CC", emissive: "#8A2BE2" },
    { color: "#0E0E66", emissive: "#5050FF" },
    { color: "#660066", emissive: "#FF00FF" }
  ], []);
  
  // Generate more nebulae with better distribution
  const nebulae = useMemo(() => {
    return Array.from({ length: 8 }).map(() => {
      const scale = 25 + Math.random() * 40;
      const colorIndex = Math.floor(Math.random() * nebulaColors.length);
      const position = [
        (Math.random() - 0.5) * 160,
        (Math.random() - 0.5) * 160,
        (Math.random() - 0.5) * 160 - 60
      ];
      const rotation = [
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      ];
      
      return {
        scale,
        position,
        rotation,
        colorData: nebulaColors[colorIndex]
      };
    });
  }, [nebulaColors]);
  
  // Cosmic dust particles
  const dustParticles = useMemo(() => {
    return Array.from({ length: 200 }).map(() => {
      const scale = 0.1 + Math.random() * 0.4;
      const position = [
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 200 - 20
      ];
      
      return {
        scale,
        position,
        speed: 0.2 + Math.random() * 0.5
      };
    });
  }, []);
  
  // Animated dust particles
  const Dust = ({ particles }: { particles: DustParticle[] }) => {
    const pointsRef = useRef<THREE.Points>(null);
    
    useFrame(({ clock }) => {
      if (pointsRef.current) {
        const positions = pointsRef.current.geometry.attributes.position.array;
        const time = clock.getElapsedTime();
        
        for (let i = 0; i < particles.length; i++) {
          const i3 = i * 3;
          const { speed } = particles[i];
          
          // Spiral motion
          positions[i3] += Math.sin(time * speed + i) * 0.03;
          positions[i3 + 1] += Math.cos(time * speed + i) * 0.03;
          positions[i3 + 2] += (Math.sin(time * 0.2) * 0.02);
          
          // Reset particles that go too far
          const distance = Math.sqrt(
            positions[i3] ** 2 + 
            positions[i3 + 1] ** 2 + 
            positions[i3 + 2] ** 2
          );
          
          if (distance > 100) {
            positions[i3] = (Math.random() - 0.5) * 200;
            positions[i3 + 1] = (Math.random() - 0.5) * 200;
            positions[i3 + 2] = (Math.random() - 0.5) * 200 - 20;
          }
        }
        
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
      }
    });
    
    const pointPositions = useMemo(() => {
      const positions = new Float32Array(particles.length * 3);
      particles.forEach((particle, i) => {
        const i3 = i * 3;
        positions[i3] = particle.position[0];
        positions[i3 + 1] = particle.position[1];
        positions[i3 + 2] = particle.position[2];
      });
      return positions;
    }, [particles]);
    
    return (
      <points ref={pointsRef}>
        <bufferGeometry>
        <bufferAttribute
  attach="attributes-position"
  args={[pointPositions, 3]}
/>
        </bufferGeometry>
        <pointsMaterial
          size={0.8}
          color="#FFFFFF"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
    );
  };
  
  return (
    <group ref={groupRef}>
      <Stars radius={150} depth={80} count={6000} factor={6} saturation={0.5} fade speed={1.5} />
      
      {/* Nebula shapes */}
      {nebulae.map((nebula, i) => (
        <mesh key={`nebula-${i}`} position={nebula.position} rotation={nebula.rotation}>
          <sphereGeometry args={[nebula.scale, 8, 8]} />
          <meshStandardMaterial 
            color={nebula.colorData.color} 
            emissive={nebula.colorData.emissive}
            emissiveIntensity={0.2}
            transparent
            opacity={0.08}
            wireframe={true}
          />
        </mesh>
      ))}
      
      {/* Cosmic dust */}
      <Dust particles={dustParticles} />
      
      {/* Glowing cosmic rings */}
      <CosmicRings nebulaColors={nebulaColors} />
    </group>
  );
}

// Improved Tech Cube with better materials and visual appeal
export function EnhancedCube({ position, rotation, size, technology, cubeRef }: {
  position: [number, number, number];
  rotation: [number, number, number];
  size: number;
  technology: string;
  cubeRef: (node: THREE.Mesh | null) => void;
}) {
  // Expanded color palette (purples/blues/teals)
  const colors = [
    "#9333EA", // Main Purple
    "#8B5CF6", // Lighter Purple
    "#7C3AED", // Vibrant Purple
    "#6D28D9", // Deep Purple
    "#4F46E5", // Indigo
    "#3B82F6", // Blue
    "#06B6D4", // Cyan
    "#0EA5E9", // Light Blue
    "#8B5CF6", // Violet
  ];
  
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  // Pulsing glow effect
  const [glowIntensity, setGlowIntensity] = useState(0.3);
  
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    setGlowIntensity(0.3 + Math.sin(time * 1.5 + Math.random() * 10) * 0.15);
  });
    
  return (
    <mesh
      ref={cubeRef}
      position={position}
      rotation={rotation}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[size, size, size]} />
      <meshPhysicalMaterial
        color={color}
        metalness={0.8}
        roughness={0.1}
        clearcoat={1}
        clearcoatRoughness={0.1}
        envMapIntensity={1.5}
        transmission={0.1}
        reflectivity={1}
        emissive={color}
        emissiveIntensity={glowIntensity}
      />
      {/* Sharper edges for better definition */}
      <Edges 
        scale={1.02} 
        threshold={15} 
        color="#FFFFFF" 
      />
      
      {/* Improved label for the technology */}
      <Html
        position={[0, 0, size/2 + 0.2]}
        center
        distanceFactor={12}
        occlude
      >
        <div className="bg-gray-900 bg-opacity-50 px-3 py-1.5 rounded-md shadow-lg text-white text-sm font-medium whitespace-nowrap border border-purple-500 backdrop-blur-sm transform transition-all duration-300 hover:scale-110">
          {technology}
        </div>
      </Html>
    </mesh>
  );
}

// Updated TechKeyword component with faster animation
export function TechKeyword({ text, position, rotation, color = "#9333EA" }: {
  text: string;
  position: [number, number, number];
  rotation: [number, number, number];
  color?: string;
}) {
  const meshRef = useRef<THREE.Group>(null);
  
  // Add a faster and more pronounced floating animation
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      meshRef.current.position.y = position[1] + Math.sin(t * 1.2) * 0.8; // Increased speed and amplitude
      meshRef.current.rotation.x = rotation[0] + Math.sin(t * 0.6) * 0.15;
      meshRef.current.rotation.y = rotation[1] + Math.sin(t * 0.5) * 0.15;
    }
  });
  
  return (
    <group ref={meshRef} position={position} rotation={rotation}>
      {/* Create text using simple geometries */}
      <mesh>
        <boxGeometry args={[text.length * 0.8, 1.5, 0.2]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.8}
          roughness={0.1}
          clearcoat={1}
          emissive={color}
          emissiveIntensity={0.6}
        />
        <Edges 
          scale={1.01} 
          threshold={15} 
          color="#FFFFFF" 
        />
      </mesh>
      
      {/* Add the text label */}
      <Html
        position={[0, 0, 0.2]}
        center
        distanceFactor={10}
        occlude
      >
        <div className="bg-transparent px-3 py-1.5 text-white text-lg font-bold whitespace-nowrap transform transition-all duration-300">
          {text}
        </div>
      </Html>
    </group>
  );
}

// TechCubes component
// Cosmic Rings Component
function CosmicRings({ nebulaColors }: { nebulaColors: NebulaColorData[] }) {
  const rings = useMemo(() => {
    return Array.from({ length: 3 }).map((_, i) => {
      return {
        radius: 40 + i * 20,
        tubeRadius: 0.05 + Math.random() * 0.1,
        color: nebulaColors[Math.floor(Math.random() * nebulaColors.length)].emissive,
        rotationSpeed: 0.05 + Math.random() * 0.1,
        position: [0, 0, -20 - i * 10]
      };
    });
  }, [nebulaColors]);

  return (
    <>
      {rings.map((ring, i) => (
        <CosmicRing key={`ring-${i}`} ring={ring} />
      ))}
    </>
  );
}

// Individual Cosmic Ring
function CosmicRing({ ring }: { ring: RingData }) {
  const tubeRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (tubeRef.current) {
      const time = clock.getElapsedTime();
      tubeRef.current.rotation.x = time * ring.rotationSpeed * 0.1;
      tubeRef.current.rotation.y = time * ring.rotationSpeed * 0.2;
    }
  });
  
  return (
    <mesh ref={tubeRef} position={ring.position}>
      <torusGeometry args={[ring.radius, ring.tubeRadius, 16, 100]} />
      <meshStandardMaterial 
        color={ring.color} 
        emissive={ring.color}
        emissiveIntensity={2}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

export function TechCubes() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Expanded list of technologies for more cubes - wrapped in useMemo
  const technologies = useMemo(() => [
    "React", "Next.js", "TypeScript", "Tailwind", 
    "Node", "Express", "MongoDB", "Supabase", 
    "JavaScript", "CSS", "HTML", "Firebase", 
    "AWS", "Vercel", "Render", "GitHub",
    "React Native", "Redux", "GraphQL", "Vue",
    "Angular", "Svelte", "Three.js", "D3",
    "Figma", "REST API", "WebSockets", "Electron"
  ], []);
  
  const cubes = useMemo(() => {
    // Using useMemo to avoid recalculations on every render
    return technologies.map((tech, index) => {
      // Distribute cubes in a more balanced way in a spherical pattern
      const phi = Math.acos(-1 + (2 * index) / technologies.length);
      const theta = Math.sqrt(technologies.length * Math.PI) * phi;
      const radius = 12 + Math.random() * 5; // Adjusted radius for more space
      
      const position = [
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      ];
      
      return {
        position,
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ],
        velocity: [
          (Math.random() - 0.5) * 0.12, // Increased for faster movement
          (Math.random() - 0.5) * 0.12,
          (Math.random() - 0.5) * 0.12
        ],
        angularVelocity: [
          (Math.random() - 0.5) * 0.03, // Increased for faster rotation
          (Math.random() - 0.5) * 0.03,
          (Math.random() - 0.5) * 0.03
        ],
        technology: tech,
        size: 1.1 + Math.random() * 0.3,
        dampingFactor: 0.995 // Increased for smoother movement with less deceleration
      };
    });
  }, [technologies]);
  
  const cubeRefs = useRef<Array<THREE.Mesh | null>>([]);
  
  useFrame(({ clock }) => {
    // Smoother group rotation with increased speed
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(t * 0.08) * 0.2; // Increased rotation speed
      groupRef.current.rotation.x = Math.cos(t * 0.08) * 0.15;
    }
    
    // More optimized cube movement with increased animation speed
    cubes.forEach((cube, i) => {
      const cubeRef = cubeRefs.current[i];
      if (!cubeRef) return;
      
      // Apply velocity with damping - using lerp for smoother motion
      cubeRef.position.x += cube.velocity[0];
      cubeRef.position.y += cube.velocity[1];
      cubeRef.position.z += cube.velocity[2];
      
      // Apply improved damping for smoother animation
      cube.velocity[0] *= cube.dampingFactor;
      cube.velocity[1] *= cube.dampingFactor;
      cube.velocity[2] *= cube.dampingFactor;
      
      // Smoother rotation using lerp
      cubeRef.rotation.x += cube.angularVelocity[0];
      cubeRef.rotation.y += cube.angularVelocity[1];
      cubeRef.rotation.z += cube.angularVelocity[2];
      
      // Improved boundary check with softer bounces
      ['x', 'y', 'z'].forEach((axis, index) => {
        if (Math.abs(cubeRef.position[axis]) > 18) {
          // Gentler bounce with maintained momentum
          cube.velocity[index] *= -0.98;
          // Add a small offset to prevent sticking at boundaries
          cubeRef.position[axis] = Math.sign(cubeRef.position[axis]) * 17.9;
        }
      });
      
      // More frequent small impulses for livelier movement
      if (Math.random() < 0.02) { // Increased probability
        cube.velocity[0] += (Math.random() - 0.5) * 0.1;
        cube.velocity[1] += (Math.random() - 0.5) * 0.1;
        cube.velocity[2] += (Math.random() - 0.5) * 0.1;
      }
      
      // Improved collision detection with smoother response
      for (let j = i + 1; j < cubes.length; j++) {
        const otherCubeRef = cubeRefs.current[j];
        if (!otherCubeRef) continue;
        
        const distance = cubeRef.position.distanceTo(otherCubeRef.position);
        const minDistance = (cube.size + cubes[j].size) / 1.8;
        
        if (distance < minDistance) {
          // Calculate normal vector between cubes
          const normal = new THREE.Vector3()
            .subVectors(cubeRef.position, otherCubeRef.position)
            .normalize();
          
          // Apply improved impulse with higher values for more energetic collisions
          cube.velocity[0] += normal.x * 0.12;
          cube.velocity[1] += normal.y * 0.12;
          cube.velocity[2] += normal.z * 0.12;
          
          cubes[j].velocity[0] -= normal.x * 0.12;
          cubes[j].velocity[1] -= normal.y * 0.12;
          cubes[j].velocity[2] -= normal.z * 0.12;
          
          // Improved separation to prevent sticking
          const correctionAmount = (minDistance - distance) * 0.6;
          cubeRef.position.add(normal.clone().multiplyScalar(correctionAmount));
          otherCubeRef.position.sub(normal.clone().multiplyScalar(correctionAmount));
        }
      }
    });
  });
  
  return (
    <group ref={groupRef}>
      {/* Main floating tech cubes */}
      {cubes.map((cube, i) => (
        <EnhancedCube
          key={i}
          cubeRef={el => cubeRefs.current[i] = el}
          position={cube.position}
          rotation={cube.rotation}
          size={cube.size}
          technology={cube.technology}
        />
      ))}
      
      {/* Keyword highlight boxes with increased animation speed */}
      <TechKeyword 
        text="REACT" 
        position={[-15, 8, -5]} 
        rotation={[0, 0.3, 0]} 
        color="#61DAFB" 
      />
      <TechKeyword 
        text="TYPESCRIPT" 
        position={[12, -7, -10]} 
        rotation={[0, -0.4, 0]} 
        color="#3178C6" 
      />
      <TechKeyword 
        text="NEXT.JS" 
        position={[0, 12, 5]} 
        rotation={[0.1, 0, 0]} 
        color="#FFFFFF" 
      />
      <TechKeyword 
        text="TAILWIND CSS" 
        position={[-12, -10, 0]} 
        rotation={[0.2, 0.3, 0]} 
        color="#38BDF8" 
      />
      <TechKeyword 
        text="THREE.JS" 
        position={[15, 0, -15]} 
        rotation={[0, -0.2, 0.1]} 
        color="#FF4500" 
      />
    </group>
  );
}

// Enhanced 3D Button component
function CoolButton({ onClick }: { onClick: () => void }) {
  const buttonGroupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (buttonGroupRef.current) {
      const time = clock.getElapsedTime();
      // Subtle hovering effect
      buttonGroupRef.current.position.y = Math.sin(time * 1.5) * 0.1;
      // Subtle rotation
      buttonGroupRef.current.rotation.y = Math.sin(time * 0.5) * 0.1;
    }
  });
  
  return (
    <group ref={buttonGroupRef}>
      <mesh onClick={onClick} position={[0, 0, 0]} castShadow>
        <boxGeometry args={[6, 1.5, 0.4]} />
        <meshPhysicalMaterial
          color="#7C3AED"
          metalness={0.7}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={1.5}
          transmission={0.1}
          emissive="#7C3AED"
          emissiveIntensity={0.3}
        />
        <Edges 
          scale={1.05} 
          threshold={15} 
          color="#FFFFFF" 
        />
      </mesh>
      <Html
        position={[0, 0, 0.3]}
        center
        distanceFactor={10}
      >
        <div className="text-white text-lg font-bold tracking-wide flex items-center space-x-2">
          <span>ENTER</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-bounce-x" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </Html>
    </group>
  );
}

// Enhanced Loading Page with modern, techy appearance
export function LoadingPage() {
  const [countdown, setCountdown] = useState(5);
  const [showButton, setShowButton] = useState(false);
  const [textVisible, setTextVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile device on component mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle countdown
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowButton(true);
      setTimeout(() => {
        setTextVisible(false);
      }, 500);
    }
  }, [countdown]);

  const handleEnter = () => {
    console.log('Navigating to main page');
    // Add your navigation logic here
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 overflow-hidden">
      {/* Main Canvas */}
      <div className="absolute inset-0">
        <Canvas 
          shadows 
          dpr={[1, 1.5]} // Lower DPR for better mobile performance
          gl={{ 
            antialias: true,
            alpha: false,
            powerPreference: "high-performance"
          }}
          camera={{ position: [0, 0, 20], fov: isMobile ? 80 : 70 }}
          performance={{ min: 0.5 }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 20]} />
          <color attach="background" args={['#090020']} />
          
          {/* Camera Controls */}
          <CameraController />
          
          {/* Add subtle camera shake */}
          <CameraShake 
            maxYaw={0.02} 
            maxPitch={0.02} 
            maxRoll={0.02} 
            yawFrequency={0.2} 
            pitchFrequency={0.2} 
            rollFrequency={0.2} 
          />
          
          {/* Cosmic background */}
          <CosmicBackground />
          
          {/* Improved lighting */}
          <ambientLight intensity={0.5} />
          <spotLight 
            position={[10, 15, 15]} 
            angle={0.4} 
            penumbra={1} 
            intensity={3} 
            castShadow 
            shadow-mapSize={[1024, 1024]}
          />
          <spotLight 
            position={[-15, -10, -10]} 
            angle={0.3} 
            penumbra={1} 
            intensity={2} 
            color="#9333EA"
            castShadow 
          />
          <spotLight 
            position={[0, -15, 5]} 
            angle={0.4} 
            penumbra={0.8} 
            intensity={1.5} 
            color="#3B82F6"
            castShadow 
          />
          
          {/* Environment for better reflections */}
          <Environment preset="night" />
          
          {/* Tech Cubes */}
          <TechCubes />
          
          {/* 3D Button at the bottom */}
          {showButton && (
            <mesh position={[0, -12, 0]}>
              <CoolButton onClick={handleEnter} />
            </mesh>
          )}
        </Canvas>
      </div>
      
      {/* Mobile optimizations - additional controls for touch devices */}
      {isMobile && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          <button 
            className="bg-purple-800 bg-opacity-60 backdrop-blur-sm text-white px-12 py-4 rounded-xl border border-purple-500 shadow-lg transform transition-all duration-300 active:scale-95 text-lg font-bold"
            onClick={handleEnter}
          >
            ENTER
          </button>
        </div>
      )}
      
      {/* Loading overlay for initial animation */}
      {textVisible && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black to-transparent bg-opacity-70 transition-opacity duration-500">
          <div className="text-center">
            <div className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-wider">
              EKLAVYA<span className="text-purple-500">SINGH</span>
            </div>
            <div className="text-lg md:text-xl text-purple-300">
              Entering in {countdown}...
            </div>
          </div>
        </div>
      )}
      
      {/* Custom animations */}
      <style jsx global>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        @keyframes reverse-spin {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-reverse-spin {
          animation: reverse-spin 20s linear infinite;
        }
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }
        .animate-bounce-x {
          animation: bounce-x 1s infinite;
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          html, body {
            overflow: hidden;
          }
        }
      `}</style>
    </div>
  );
}