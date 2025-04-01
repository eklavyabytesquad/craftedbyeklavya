'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function Background3D() {
  const mountRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window === 'undefined') return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, dimensions.width / dimensions.height, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance" 
    });
    renderer.setSize(dimensions.width, dimensions.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
    renderer.setClearColor(0x0a0a0f, 1);

    // Add renderer to DOM
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    } else {
      console.error("Mount ref is not available");
      return;
    }

    // Create a grid/mesh for the base
    const createGridMesh = () => {
      const gridGroup = new THREE.Group();
      
      // Main grid
      const gridSize = 20;
      const divisions = 20;
      const gridHelper = new THREE.GridHelper(
        gridSize, 
        divisions, 
        0x9370db, // Purple for main lines
        0x4B0082  // Darker purple for secondary lines
      );
      
      // Rotate grid to be horizontal and move it down
      gridHelper.rotation.x = Math.PI / 2;
      gridHelper.position.y = -4;
      
      // Make grid lines fade with distance
      const gridMaterial = gridHelper.material;
      if (Array.isArray(gridMaterial)) {
        gridMaterial.forEach(mat => {
          mat.transparent = true;
          mat.opacity = 0.3;
          mat.depthWrite = false;
        });
      } else {
        gridMaterial.transparent = true;
        gridMaterial.opacity = 0.3;
        gridMaterial.depthWrite = false;
      }
      
      gridGroup.add(gridHelper);
      
      // Add glowing center plane
      const planeGeometry = new THREE.PlaneGeometry(gridSize * 0.8, gridSize * 0.8);
      const planeMaterial = new THREE.MeshBasicMaterial({
        color: 0x9370db,
        transparent: true,
        opacity: 0.1,
        side: THREE.DoubleSide
      });
      
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.rotation.x = Math.PI / 2;
      plane.position.y = -3.95; // Just above the grid
      gridGroup.add(plane);
      
      // Add subtle circular glow in center
      const circleGeometry = new THREE.CircleGeometry(4, 32);
      const circleMaterial = new THREE.MeshBasicMaterial({
        color: 0xffd700, // Gold
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide
      });
      
      const circle = new THREE.Mesh(circleGeometry, circleMaterial);
      circle.rotation.x = Math.PI / 2;
      circle.position.y = -3.9; // Just above the plane
      gridGroup.add(circle);
      
      scene.add(gridGroup);
      return gridGroup;
    };

    // Create a graph-like background
    const createGraph = () => {
      const nodesCount = dimensions.width < 768 ? 30 : 50; // Fewer nodes on mobile
      const nodes = [];
      const nodeGroup = new THREE.Group();
      
      // Create nodes
      for (let i = 0; i < nodesCount; i++) {
        const geometry = new THREE.SphereGeometry(0.05, 16, 16);
        const material = new THREE.MeshBasicMaterial({
          color: new THREE.Color().setHSL(0.75 + Math.random() * 0.2, 0.8, 0.6) // Purple-ish
        });
        
        const node = new THREE.Mesh(geometry, material);
        
        // Position nodes more centrally and within view
        const spreadFactor = dimensions.width < 768 ? 8 : 12;
        node.position.set(
          (Math.random() - 0.5) * spreadFactor,
          (Math.random() - 0.5) * spreadFactor,
          (Math.random() - 0.5) * 5
        );
        
        node.userData = {
          velocity: new THREE.Vector3(
            (Math.random() - 0.5) * 0.01,
            (Math.random() - 0.5) * 0.01,
            (Math.random() - 0.5) * 0.01
          )
        };
        
        nodes.push(node);
        nodeGroup.add(node);
      }
      
      // Create connections between nodes
      const lineMaterial = new THREE.LineBasicMaterial({ 
        color: 0x9370db, 
        transparent: true,
        opacity: 0.3
      });
      
      // Limit connections based on screen size for better performance
      const maxConnectionDistance = dimensions.width < 768 ? 2.5 : 3.5;
      const maxConnectionsPerNode = dimensions.width < 768 ? 3 : 5;
      
      for (let i = 0; i < nodes.length; i++) {
        // Find closest nodes
        const connections = [];
        for (let j = 0; j < nodes.length; j++) {
          if (i !== j) {
            const distance = nodes[i].position.distanceTo(nodes[j].position);
            if (distance < maxConnectionDistance) {
              connections.push({ node: nodes[j], distance });
            }
          }
        }
        
        // Sort by distance and take only the closest ones
        connections.sort((a, b) => a.distance - b.distance);
        const limitedConnections = connections.slice(0, maxConnectionsPerNode);
        
        // Create lines for limited connections
        for (const connection of limitedConnections) {
          const geometry = new THREE.BufferGeometry().setFromPoints([
            nodes[i].position,
            connection.node.position
          ]);
          
          const line = new THREE.Line(geometry, lineMaterial);
          nodeGroup.add(line);
          
          // Store reference to connected nodes
          line.userData = {
            from: nodes[i],
            to: connection.node
          };
        }
      }
      
      scene.add(nodeGroup);
      return nodeGroup;
    };

    // Add coding-related 3D objects
    const createCodingObjects = () => {
      const objectsGroup = new THREE.Group();
      
      // Scale factor based on screen size
      const scaleFactor = dimensions.width < 768 ? 0.4 : 0.5;
      
      // Brackets {}
      const createBracket = (x, y, z, rotationY) => {
        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.lineTo(0, 1);
        shape.lineTo(0.2, 1);
        shape.lineTo(0.2, 0.2);
        shape.lineTo(0.8, 0.2);
        shape.lineTo(0.8, 1);
        shape.lineTo(1, 1);
        shape.lineTo(1, 0);
        shape.lineTo(0, 0);
        
        const extrudeSettings = {
          steps: 1,
          depth: 0.1,
          bevelEnabled: true,
          bevelThickness: 0.05,
          bevelSize: 0.05,
          bevelOffset: 0,
          bevelSegments: 3
        };
        
        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        const material = new THREE.MeshBasicMaterial({ 
          color: 0xffd700, // Gold
          transparent: true,
          opacity: 0.8
        });
        
        const bracket = new THREE.Mesh(geometry, material);
        bracket.scale.set(scaleFactor, scaleFactor, scaleFactor);
        bracket.position.set(x, y, z);
        bracket.rotation.y = rotationY;
        
        bracket.userData = {
          rotationSpeed: (Math.random() - 0.5) * 0.01,
          floatSpeed: 0.005,
          floatAmplitude: 0.2,
          initialY: y,
          time: Math.random() * Math.PI * 2
        };
        
        objectsGroup.add(bracket);
        return bracket;
      };
      
      // Create brackets with positions adjusted for screen size and better visibility
      const bracketPositions = dimensions.width < 768 
        ? [[-2, 0.5, -2], [2, -0.5, -2], [0, 1.5, -1.5]] // Mobile positions
        : [[-3, 2, -2], [3, -1, -3], [4, 1, -1]];      // Desktop positions
      
      const brackets = bracketPositions.map((pos, i) => 
        createBracket(pos[0], pos[1], pos[2], Math.PI / (4 - i % 3))
      );
      
      // Create angle brackets <>
      const createAngleBracket = (x, y, z, rotationY) => {
        const shape = new THREE.Shape();
        shape.moveTo(0, 0.5);
        shape.lineTo(0.5, 0);
        shape.lineTo(0.5, 0.2);
        shape.lineTo(1, 0.2);
        shape.lineTo(1, 0.8);
        shape.lineTo(0.5, 0.8);
        shape.lineTo(0.5, 1);
        shape.lineTo(0, 0.5);
        
        const extrudeSettings = {
          steps: 1,
          depth: 0.1,
          bevelEnabled: true,
          bevelThickness: 0.05,
          bevelSize: 0.05,
          bevelOffset: 0,
          bevelSegments: 3
        };
        
        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        const material = new THREE.MeshBasicMaterial({ 
          color: 0xff69b4, // Pink
          transparent: true,
          opacity: 0.7
        });
        
        const bracket = new THREE.Mesh(geometry, material);
        bracket.scale.set(scaleFactor, scaleFactor, scaleFactor);
        bracket.position.set(x, y, z);
        bracket.rotation.y = rotationY;
        
        bracket.userData = {
          rotationSpeed: (Math.random() - 0.5) * 0.01,
          floatSpeed: 0.007,
          floatAmplitude: 0.3,
          initialY: y,
          time: Math.random() * Math.PI * 2
        };
        
        objectsGroup.add(bracket);
        return bracket;
      };
      
      // Angle bracket positions adjusted for screen size and better visibility
      const angleBracketPositions = dimensions.width < 768 
        ? [[-1.5, -1, -1.5], [1.5, 0, -2], [-1, -1.5, -1]] // Mobile positions
        : [[-2, -1.5, -2], [2, 1.5, -3], [-4, 0, 0]];  // Desktop positions
        
      const angleBrackets = angleBracketPositions.map((pos, i) => 
        createAngleBracket(pos[0], pos[1], pos[2], Math.PI / (5 + i % 3))
      );
      
      // Add code block shape
      const createCodeBlock = (x, y, z, rotationY) => {
        // Create a rounded rectangle
        const width = 1.2;
        const height = 0.8;
        const radius = 0.1;
        
        const shape = new THREE.Shape();
        shape.moveTo(0, radius);
        shape.lineTo(0, height - radius);
        shape.quadraticCurveTo(0, height, radius, height);
        shape.lineTo(width - radius, height);
        shape.quadraticCurveTo(width, height, width, height - radius);
        shape.lineTo(width, radius);
        shape.quadraticCurveTo(width, 0, width - radius, 0);
        shape.lineTo(radius, 0);
        shape.quadraticCurveTo(0, 0, 0, radius);
        
        const extrudeSettings = {
          depth: 0.05,
          bevelEnabled: true,
          bevelThickness: 0.02,
          bevelSize: 0.02,
          bevelOffset: 0,
          bevelSegments: 3
        };
        
        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        const material = new THREE.MeshBasicMaterial({ 
          color: 0xb19cd9, // Light purple
          transparent: true,
          opacity: 0.6
        });
        
        const codeBlock = new THREE.Mesh(geometry, material);
        codeBlock.scale.set(scaleFactor, scaleFactor, scaleFactor);
        codeBlock.position.set(x, y, z);
        codeBlock.rotation.y = rotationY;
        
        // Add "code lines" inside the block
        const addCodeLines = (parent, count, width, y, z) => {
          for (let i = 0; i < count; i++) {
            const lineWidth = 0.5 + Math.random() * 0.4;
            const lineGeometry = new THREE.PlaneGeometry(lineWidth * width, 0.03);
            const lineMaterial = new THREE.MeshBasicMaterial({
              color: 0xffd700, // Gold
              transparent: true,
              opacity: 0.8,
              side: THREE.DoubleSide
            });
            
            const line = new THREE.Mesh(lineGeometry, lineMaterial);
            line.position.set(width/2 - 0.1, y - i * 0.1, z);
            parent.add(line);
          }
        };
        
        // Add code lines
        addCodeLines(codeBlock, 5, width, height - 0.15, 0.06);
        
        codeBlock.userData = {
          rotationSpeed: (Math.random() - 0.5) * 0.005,
          floatSpeed: 0.003,
          floatAmplitude: 0.15,
          initialY: y,
          time: Math.random() * Math.PI * 2
        };
        
        objectsGroup.add(codeBlock);
        return codeBlock;
      };
      
      // Create a few code blocks
      const codeBlockPositions = dimensions.width < 768 
        ? [[0, 0, -3], [-1.5, 1, -2.5], [1.8, -1.2, -2]] // Mobile positions
        : [[-2.5, 0, -3], [0, 2, -2.5], [2.5, -2, -2]];  // Desktop positions
      
      const codeBlocks = codeBlockPositions.map((pos, i) => 
        createCodeBlock(pos[0], pos[1], pos[2], Math.PI / (3 + i % 4))
      );
      
      scene.add(objectsGroup);
      return { objectsGroup, brackets, angleBrackets, codeBlocks };
    };

    const gridMesh = createGridMesh();
    const graph = createGraph();
    const { objectsGroup, brackets, angleBrackets, codeBlocks } = createCodingObjects();

    // Adjust camera and scene for better viewing
    if (dimensions.width < 768) {
      camera.position.z = 7; // Move camera back a bit on mobile
      camera.position.y = 1; // Lift camera slightly on mobile
      graph.position.z = -1; // Move graph back
      objectsGroup.position.z = -1; // Move objects back
    } else {
      camera.position.z = 5;
      camera.position.y = 0.5;
    }
    
    // Tilt camera slightly downward for better view of the grid
    camera.rotation.x = -0.2;
    
    // Animation variables for smoother movement
    let time = 0;
    let cameraMovement = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0
    };

    // Animation loop with performance optimization
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      time += 0.005;
      
      // Smoothly move camera based on mouse position or time
      if (dimensions.width >= 768) {
        // Desktop: Add subtle camera movement
        cameraMovement.targetX = Math.sin(time * 0.5) * 0.5;
        cameraMovement.targetY = Math.cos(time * 0.3) * 0.3;
      } else {
        // Mobile: Even more subtle movement
        cameraMovement.targetX = Math.sin(time * 0.3) * 0.3;
        cameraMovement.targetY = Math.cos(time * 0.2) * 0.2;
      }
      
      // Smooth camera movement
      cameraMovement.x += (cameraMovement.targetX - cameraMovement.x) * 0.02;
      cameraMovement.y += (cameraMovement.targetY - cameraMovement.y) * 0.02;
      
      camera.position.x = cameraMovement.x;
      camera.position.y = Math.max(0.3, camera.position.y + cameraMovement.y * 0.05);
      
      // Look at center point
      camera.lookAt(0, 0, 0);
      
      // Animate the grid
      if (gridMesh) {
        // Pulse effect for the grid
        const gridChildren = gridMesh.children;
        if (gridChildren.length >= 3) {
          const plane = gridChildren[1];
          const circle = gridChildren[2];
          
          if (plane.material) {
            plane.material.opacity = 0.05 + Math.sin(time * 2) * 0.05;
          }
          
          if (circle.material) {
            circle.material.opacity = 0.15 + Math.sin(time * 3) * 0.1;
          }
        }
      }
      
      // Animate graph nodes
      graph.children.forEach(child => {
        if (child.type === 'Mesh') {
          // Animate nodes
          child.position.add(child.userData.velocity);
          
          // Boundary check - reverse direction if hitting edges
          const boundsX = dimensions.width < 768 ? 4 : 6;
          const boundsY = dimensions.width < 768 ? 4 : 6;
          const boundsZ = 5;
          
          if (Math.abs(child.position.x) > boundsX) {
            child.userData.velocity.x *= -1;
          }
          if (Math.abs(child.position.y) > boundsY) {
            child.userData.velocity.y *= -1;
          }
          if (Math.abs(child.position.z) > boundsZ) {
            child.userData.velocity.z *= -1;
          }
        } else if (child.type === 'Line') {
          // Update line positions to connect moving nodes
          const positions = child.geometry.attributes.position;
          positions.setXYZ(0, 
            child.userData.from.position.x, 
            child.userData.from.position.y, 
            child.userData.from.position.z
          );
          positions.setXYZ(1, 
            child.userData.to.position.x, 
            child.userData.to.position.y, 
            child.userData.to.position.z
          );
          positions.needsUpdate = true;
        }
      });
      
      // Animate coding objects
      [...brackets, ...angleBrackets, ...codeBlocks].forEach(obj => {
        // Rotate
        obj.rotation.y += obj.userData.rotationSpeed;
        
        // Float up and down
        obj.userData.time += obj.userData.floatSpeed;
        obj.position.y = obj.userData.initialY + 
                        Math.sin(obj.userData.time) * obj.userData.floatAmplitude;
      });
      
      // Rotate the entire graph slowly
      graph.rotation.y += 0.0005;
      
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize and document height changes
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      const documentHeight = Math.max(
        document.body.scrollHeight, 
        document.documentElement.scrollHeight
      );
      
      setDimensions({ width: newWidth, height: Math.max(newHeight, documentHeight) });
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      
      // Adjust camera position based on new dimensions
      if (newWidth < 768) {
        camera.position.z = 7;
        camera.position.y = 1;
      } else {
        camera.position.z = 5;
        camera.position.y = 0.5;
      }
      
      // Tilt camera
      camera.rotation.x = -0.2;
    };

    // Initial sizing
    handleResize();

    // Watch for size changes
    window.addEventListener('resize', handleResize);
    
    // Also check size on scroll
    window.addEventListener('scroll', () => {
      setTimeout(handleResize, 100);
    });
    
    // Add mouse/touch interaction for desktop
    const handleMouseMove = (event) => {
      if (dimensions.width >= 768) {
        // Desktop: track actual mouse position
        cameraMovement.targetX = (event.clientX / window.innerWidth - 0.5) * 1.5;
        cameraMovement.targetY = (event.clientY / window.innerHeight - 0.5) * 0.8;
      }
    };
    
    // Add touch interaction for mobile
    const handleTouchMove = (event) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        cameraMovement.targetX = (touch.clientX / window.innerWidth - 0.5) * 1;
        cameraMovement.targetY = (touch.clientY / window.innerHeight - 0.5) * 0.5;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Check size periodically to account for dynamic content loading
    const resizeInterval = setInterval(handleResize, 2000);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      clearInterval(resizeInterval);
      
      if (mountRef.current && renderer.domElement) {
        try {
          mountRef.current.removeChild(renderer.domElement);
        } catch (e) {
          console.error("Error removing renderer", e);
        }
      }
      
      // Dispose of geometries and materials to prevent memory leaks
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      
      renderer.dispose();
    };
  }, [dimensions.width, dimensions.height]);

  return (
    <div 
      ref={mountRef} 
      className="fixed top-0 left-0 w-full h-full z-0"
      style={{
        minHeight: '100vh',
        height: '100%',
        pointerEvents: 'none',
        touchAction: 'none', // This prevents the element from handling touch actions
        userSelect: 'none'// Prevent text selection // Allow clicks to pass through to underlying elements
      }}
    />
  );
}