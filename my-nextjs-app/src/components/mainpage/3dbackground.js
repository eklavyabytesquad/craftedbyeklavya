'use client';

import { useEffect, useState } from 'react';

export default function Background() {
  // State to track window dimensions
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  // Generate random nodes for the graph effect
  const generateNodes = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 0.5 + 0.3, // Size between 0.3 and 0.8rem
      animationDuration: `${Math.random() * 10 + 20}s`, // Animation between 20 and 30 seconds
      animationDelay: `${Math.random() * -20}s`, // Random delay for more natural movement
      color: Math.random() > 0.7 ? 'bg-purple-400' : 'bg-indigo-500'
    }));
  };

  // Generate coding elements (brackets, code blocks)
  const generateCodingElements = (count) => {
    const elements = [];
    const types = ['curly', 'angle', 'codeblock'];
    
    for (let i = 0; i < count; i++) {
      elements.push({
        id: i,
        type: types[i % types.length],
        left: `${Math.random() * 90 + 5}%`,
        top: `${Math.random() * 90 + 5}%`,
        rotationStart: Math.random() * 360,
        rotationEnd: Math.random() * 360 + 360,
        scale: Math.random() * 0.7 + 0.3,
        animationDuration: `${Math.random() * 15 + 25}s`,
        animationDelay: `${Math.random() * -10}s`,
        floatDuration: `${Math.random() * 5 + 10}s`
      });
    }
    
    return elements;
  };

  // Determine number of elements based on screen size
  const isMobile = dimensions.width < 768;
  const nodeCount = isMobile ? 30 : 50;
  const elementsCount = isMobile ? 6 : 12;

  const [nodes] = useState(() => generateNodes(nodeCount));
  const [codingElements] = useState(() => generateCodingElements(elementsCount));

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden bg-gradient-to-b from-gray-900 to-indigo-950 pointer-events-none">
      {/* Grid overlay */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute bottom-0 left-0 right-0 h-1/2 w-full overflow-hidden perspective perspective-1000">
          <div className="absolute top-0 left-0 right-0 bottom-0 grid grid-cols-20 grid-rows-20 transform rotate-x-60 scale-y-150 origin-bottom opacity-20">
            {Array.from({ length: 21 }).map((_, i) => (
              <div 
                key={`h-${i}`} 
                className="col-span-full h-px bg-purple-500/50"
                style={{ gridRow: i + 1 }}
              />
            ))}
            {Array.from({ length: 21 }).map((_, i) => (
              <div 
                key={`v-${i}`} 
                className="row-span-full w-px bg-purple-500/50"
                style={{ gridColumn: i + 1 }}
              />
            ))}
          </div>
          {/* Center glow effect */}
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-purple-400/20 blur-lg animate-pulse-slow"></div>
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-yellow-400/10 blur-xl animate-pulse-slow"></div>
        </div>
      </div>

      {/* Nodes */}
      <div className="absolute inset-0">
        {nodes.map((node) => (
          <div
            key={node.id}
            className={`absolute rounded-full ${node.color} shadow-glow-sm`}
            style={{
              left: node.left,
              top: node.top,
              width: `${node.size}rem`,
              height: `${node.size}rem`,
              animationDuration: node.animationDuration,
              animationDelay: node.animationDelay,
              animation: 'float-around linear infinite'
            }}
          />
        ))}
      </div>

      {/* Coding elements */}
      {codingElements.map((element) => {
        if (element.type === 'curly') {
          // Curly bracket
          return (
            <div
              key={`element-${element.id}`}
              className="absolute opacity-80"
              style={{
                left: element.left,
                top: element.top,
                animation: `float-vertical ${element.floatDuration} ease-in-out infinite, spin ${element.animationDuration} linear infinite`,
                animationDelay: element.animationDelay,
                transform: `scale(${element.scale})`
              }}
            >
              <div className="relative w-8 h-8 text-yellow-400 text-3xl font-bold">
                {'{'}
              </div>
            </div>
          );
        } else if (element.type === 'angle') {
          // Angle bracket
          return (
            <div
              key={`element-${element.id}`}
              className="absolute opacity-70"
              style={{
                left: element.left,
                top: element.top,
                animation: `float-vertical ${element.floatDuration} ease-in-out infinite, spin ${element.animationDuration} linear infinite`,
                animationDelay: element.animationDelay,
                transform: `scale(${element.scale})`
              }}
            >
              <div className="relative w-8 h-8 text-pink-400 text-3xl font-bold">
                {'<'}
              </div>
            </div>
          );
        } else {
          // Code block
          return (
            <div
              key={`element-${element.id}`}
              className="absolute opacity-60"
              style={{
                left: element.left,
                top: element.top,
                animation: `float-vertical ${element.floatDuration} ease-in-out infinite, spin-slow ${element.animationDuration} linear infinite`,
                animationDelay: element.animationDelay,
                transform: `scale(${element.scale})`
              }}
            >
              <div className="relative w-20 h-12 bg-purple-800/40 rounded-lg p-2 border border-purple-500/30">
                <div className="w-2/3 h-1 bg-yellow-400/80 rounded-full mb-1"></div>
                <div className="w-3/4 h-1 bg-yellow-400/60 rounded-full mb-1"></div>
                <div className="w-1/2 h-1 bg-yellow-400/80 rounded-full"></div>
              </div>
            </div>
          );
        }
      })}

      {/* CSS for the animations */}
      <style jsx>{`
        @keyframes float-around {
          0% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(50px, 25px);
          }
          50% {
            transform: translate(-20px, 60px);
          }
          75% {
            transform: translate(-40px, -30px);
          }
          100% {
            transform: translate(0, 0);
          }
        }

        @keyframes float-vertical {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(20deg);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.3;
          }
        }

        .perspective {
          perspective: 1000px;
        }

        .rotate-x-60 {
          transform: rotateX(60deg);
        }

        .shadow-glow-sm {
          box-shadow: 0 0 10px 2px currentColor;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}