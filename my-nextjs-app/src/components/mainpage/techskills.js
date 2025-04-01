'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Import all tech icons based on your assets folder
import jsIcon from './assets/js.png';
import reactIcon from './assets/react.png';
import nextIcon from './assets/next.png';
import threeIcon from './assets/three.png';
import tailwindIcon from './assets/tailwind.png';
import nodeIcon from './assets/node.png';
import mongoIcon from './assets/mongo.png';
import tsIcon from './assets/ts.png';
import gitIcon from './assets/git.png';
import figmaIcon from './assets/figma.png';
import awsIcon from './assets/aws.png';
import htmlIcon from './assets/html.png';
import cssIcon from './assets/css.png';
import graphqlIcon from './assets/graphql.png';
import dockerIcon from './assets/docker.png';
import firebaseIcon from './assets/firebase.png';
import expressIcon from './assets/express.png';

const TechSkillsGlobe = () => {
  const containerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverSkill, setHoverSkill] = useState(null);
  const globe = useRef(null);
  const mixer = useRef(null);
  const clock = useRef(new THREE.Clock());
  const renderer = useRef(null);
  const scene = useRef(null);
  const camera = useRef(null);
  const controls = useRef(null);
  const nodeObjects = useRef([]);
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());

  // Define your skills with their associated icon paths
  const skills = [
    { name: 'JavaScript', icon: jsIcon.src, color: '#F7DF1E' },
    { name: 'React', icon: reactIcon.src, color: '#61DAFB' },
    { name: 'Next.js', icon: nextIcon.src, color: '#000000' },
    { name: 'Three.js', icon: threeIcon.src, color: '#000000' },
    { name: 'TailwindCSS', icon: tailwindIcon.src, color: '#38B2AC' },
    { name: 'Node.js', icon: nodeIcon.src, color: '#339933' },
    { name: 'MongoDB', icon: mongoIcon.src, color: '#47A248' },
    { name: 'TypeScript', icon: tsIcon.src, color: '#3178C6' },
    { name: 'Git', icon: gitIcon.src, color: '#F05032' },
    { name: 'Figma', icon: figmaIcon.src, color: '#F24E1E' },
    { name: 'AWS', icon: awsIcon.src, color: '#FF9900' },
    { name: 'HTML5', icon: htmlIcon.src, color: '#E34F26' },
    { name: 'CSS3', icon: cssIcon.src, color: '#1572B6' },
    { name: 'GraphQL', icon: graphqlIcon.src, color: '#E10098' },
    { name: 'Docker', icon: dockerIcon.src, color: '#2496ED' },
    { name: 'Express', icon: expressIcon.src, color: '#000000' },
    { name: 'Firebase', icon: firebaseIcon.src, color: '#FFCA28' },
  ];

  useEffect(() => {
    // Initialize the scene
    const initThree = () => {
      if (!containerRef.current) return;

      // Get container dimensions
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      // Create scene
      scene.current = new THREE.Scene();
      
      // Set background to match the portfolio theme
      scene.current.background = new THREE.Color('#1e0639');
      
      // Create ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.current.add(ambientLight);

      // Create directional light
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 3, 5);
      scene.current.add(directionalLight);

      // Create camera
      camera.current = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.current.position.z = 8;
      
      // Adjust camera for mobile
      if (window.innerWidth <= 768) {
        camera.current.position.z = 10; // Move camera further back on mobile
      }

      // Create renderer with transparency
      renderer.current = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true 
      });
      renderer.current.setSize(width, height);
      renderer.current.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
      containerRef.current.appendChild(renderer.current.domElement);

      // Add orbit controls
      controls.current = new OrbitControls(camera.current, renderer.current.domElement);
      controls.current.enableDamping = true;
      controls.current.dampingFactor = 0.05;
      controls.current.rotateSpeed = 0.5;
      controls.current.enableZoom = true;
      controls.current.zoomSpeed = 0.5;
      controls.current.minDistance = 5;
      controls.current.maxDistance = 15; // Increased max distance for better mobile viewing
      
      // Set initial rotation for better viewing on load
      controls.current.rotateSpeed = window.innerWidth <= 768 ? 0.7 : 0.5; // Faster rotation on mobile
      
      // Create the globe
      createGlobe();
      
      // Add nodes representing skills
      createSkillNodes();
      
      // Add connections between nodes
      createConnections();
      
      // Add window resize handler
      window.addEventListener('resize', handleResize);
      
      // Start animation loop
      animate();
    };

    const createGlobe = () => {
      // Create a globe sphere with a wireframe
      const globeGeometry = new THREE.SphereGeometry(3, 32, 32);
      
      // Create a semi-transparent material with the same purple theme
      const globeMaterial = new THREE.MeshPhongMaterial({
        color: 0x41246e, 
        transparent: true,
        opacity: 0.2,
        wireframe: true,
        emissive: 0x41246e,
        emissiveIntensity: 0.3,
      });
      
      globe.current = new THREE.Mesh(globeGeometry, globeMaterial);
      scene.current.add(globe.current);
      
      // Add outer glow effect
      const glowGeometry = new THREE.SphereGeometry(3.2, 32, 32);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x9c27b0, 
        transparent: true,
        opacity: 0.05,
        side: THREE.BackSide
      });
      
      const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
      scene.current.add(glowMesh);
    };

    const createSkillNodes = () => {
      const loader = new THREE.TextureLoader();
      nodeObjects.current = [];
      
      // Calculate positions on a sphere
      skills.forEach((skill, index) => {
        // Get a position on the sphere using fibonacci distribution
        const phi = Math.acos(-1 + (2 * index) / skills.length);
        const theta = Math.sqrt(skills.length * Math.PI) * phi;
        
        const x = 3.2 * Math.cos(theta) * Math.sin(phi);
        const y = 3.2 * Math.sin(theta) * Math.sin(phi);
        const z = 3.2 * Math.cos(phi);

        // Create node
        const nodeGeometry = new THREE.SphereGeometry(0.15, 16, 16); // Reduced segments for performance
        
        // Create a material that uses the skill color
        const nodeMaterial = new THREE.MeshPhongMaterial({
          color: new THREE.Color(skill.color || 0xffffff),
          emissive: new THREE.Color(skill.color || 0xffffff),
          emissiveIntensity: 0.3,
          transparent: true,
          opacity: 0.8,
        });
        
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
        node.position.set(x, y, z);
        node.userData = { skill: skill.name };
        
        scene.current.add(node);
        nodeObjects.current.push(node);
        
        // Create icon display
        const iconSize = 0.4; // Increased size for better visibility
        const iconGeometry = new THREE.PlaneGeometry(iconSize, iconSize);
        
        // If we have an icon for this skill, try to load it
        if (skill.icon) {
          loader.load(skill.icon, 
            // Success callback
            (texture) => {
              const iconMaterial = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                side: THREE.DoubleSide
              });
              
              const iconMesh = new THREE.Mesh(iconGeometry, iconMaterial);
              iconMesh.position.set(x * 1.15, y * 1.15, z * 1.15);
              
              // Make icon always face outward from center
              iconMesh.lookAt(0, 0, 0);
              iconMesh.rotateY(Math.PI); // Rotate to face outward
              iconMesh.userData = { skill: skill.name };
              
              scene.current.add(iconMesh);
              nodeObjects.current.push(iconMesh);
            },
            // Progress callback
            undefined,
            // Error callback
            (error) => {
              console.error(`Error loading texture for ${skill.name}:`, error);
              createFallbackIcon(skill, iconGeometry, x, y, z);
            }
          );
        } else {
          // Create a fallback colored plane for skills without icons
          createFallbackIcon(skill, iconGeometry, x, y, z);
        }
      });
    };
    
    // Helper function to create fallback icons
    const createFallbackIcon = (skill, iconGeometry, x, y, z) => {
      const iconMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(skill.color || 0xffffff),
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide
      });
      
      const iconMesh = new THREE.Mesh(iconGeometry, iconMaterial);
      iconMesh.position.set(x * 1.15, y * 1.15, z * 1.15);
      
      // Make icon always face outward from center
      iconMesh.lookAt(0, 0, 0);
      iconMesh.rotateY(Math.PI); 
      iconMesh.userData = { skill: skill.name };
      
      scene.current.add(iconMesh);
      nodeObjects.current.push(iconMesh);
    };

    const createConnections = () => {
      // Create connections between nearby nodes
      const connectionMaterial = new THREE.LineBasicMaterial({ 
        color: 0xaaaaff, 
        transparent: true, 
        opacity: 0.2 
      });
      
      // Adjust the connection density based on screen size (fewer on mobile)
      const connectionThreshold = window.innerWidth <= 768 ? 0.9 : 0.85;
      
      for (let i = 0; i < skills.length - 1; i++) {
        for (let j = i + 1; j < skills.length; j++) {
          // Only connect some nodes (not all)
          if (Math.random() > connectionThreshold) {
            const i2 = i * 2; // Because we have both sphere and icon for each skill
            const j2 = j * 2;
            
            if (i2 < nodeObjects.current.length && j2 < nodeObjects.current.length) {
              const node1 = nodeObjects.current[i2];
              const node2 = nodeObjects.current[j2];
              
              const points = [];
              points.push(node1.position.clone());
              points.push(node2.position.clone());
              
              const connectionGeometry = new THREE.BufferGeometry().setFromPoints(points);
              const line = new THREE.Line(connectionGeometry, connectionMaterial);
              scene.current.add(line);
            }
          }
        }
      }
    };

    const handleResize = () => {
      if (!containerRef.current || !camera.current || !renderer.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.current.aspect = width / height;
      camera.current.updateProjectionMatrix();
      
      // Adjust camera position based on screen size
      if (window.innerWidth <= 768) {
        camera.current.position.z = Math.min(10, camera.current.position.z);
      }
      
      renderer.current.setSize(width, height);
    };

    const handleMouseMove = (event) => {
      if (!containerRef.current || !camera.current) return;
      
      // Calculate mouse position in normalized device coordinates
      const rect = containerRef.current.getBoundingClientRect();
      mouse.current.x = ((event.clientX - rect.left) / containerRef.current.clientWidth) * 2 - 1;
      mouse.current.y = -((event.clientY - rect.top) / containerRef.current.clientHeight) * 2 + 1;
    };
    
    // Handle touch events for mobile
    const handleTouchMove = (event) => {
      if (!containerRef.current || !camera.current || !event.touches[0]) return;
      
      const touch = event.touches[0];
      const rect = containerRef.current.getBoundingClientRect();
      mouse.current.x = ((touch.clientX - rect.left) / containerRef.current.clientWidth) * 2 - 1;
      mouse.current.y = -((touch.clientY - rect.top) / containerRef.current.clientHeight) * 2 + 1;
      
      // Prevent page scrolling when interacting with the globe
      event.preventDefault();
    };

    const checkIntersection = () => {
      if (!camera.current || nodeObjects.current.length === 0) return;
      
      // Update the picking ray with the camera and mouse position
      raycaster.current.setFromCamera(mouse.current, camera.current);
      
      // Calculate objects intersecting the picking ray
      const intersects = raycaster.current.intersectObjects(nodeObjects.current);
      
      if (intersects.length > 0) {
        const hoveredSkill = intersects[0].object.userData.skill;
        setIsHovering(true);
        setHoverSkill(hoveredSkill);
        document.body.style.cursor = 'pointer';
      } else {
        setIsHovering(false);
        setHoverSkill(null);
        document.body.style.cursor = 'auto';
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      
      if (controls.current) {
        controls.current.update();
      }
      
      if (globe.current) {
        // Adjust rotation speed based on device
        const rotationSpeed = window.innerWidth <= 768 ? 0.0015 : 0.001;
        globe.current.rotation.y += rotationSpeed;
      }
      
      checkIntersection();
      
      if (renderer.current && scene.current && camera.current) {
        renderer.current.render(scene.current, camera.current);
      }
    };

    // Initialize
    initThree();
    
    // Add mouse and touch event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      
      if (containerRef.current && renderer.current) {
        containerRef.current.removeChild(renderer.current.domElement);
      }
      
      // Dispose of materials, geometries, etc
      if (scene.current) {
        scene.current.traverse((object) => {
          if (object.geometry) object.geometry.dispose();
          
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[450px] md:min-h-[600px] lg:min-h-[700px]">
      {/* Globe container */}
      <div 
        ref={containerRef} 
        className="w-full h-full min-h-[450px] md:min-h-[600px] lg:min-h-[700px]"
      ></div>
      
      {/* Skill tooltip - improved visibility */}
      {isHovering && hoverSkill && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-purple-900/90 backdrop-blur-md px-6 py-3 rounded-lg border border-purple-500/80 shadow-lg shadow-purple-500/30 z-10 text-center">
          <span className="text-white font-bold text-lg">{hoverSkill}</span>
        </div>
      )}
      
      {/* Mobile-friendly instruction overlay */}
      <div className="absolute bottom-4 left-0 right-0 text-center text-gray-300 px-4 py-2 bg-purple-900/50 backdrop-blur-sm mx-6 rounded-full">
        <p className="text-xs md:text-sm">
          <span className="hidden md:inline">Drag to rotate | Scroll to zoom | </span>
          <span className="md:hidden">Swipe to rotate | Pinch to zoom | </span>
          Hover over nodes to see skills
        </p>
      </div>
    </div>
  );
};

export default TechSkillsGlobe;