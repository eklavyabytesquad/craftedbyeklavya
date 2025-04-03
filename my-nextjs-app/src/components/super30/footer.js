// components/Footer.jsx
import React, { useEffect, useRef } from 'react';

const Footer = () => {
  const canvasRef = useRef(null);
  
  // Digital circuit animation effect - unique technical prop not used in other components
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    
    // Create nodes for circuit effect
    const nodes = [];
    const nodeCount = Math.floor(width / 100); // Adjust density
    
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1,
        vx: Math.random() * 0.5 - 0.25,
        vy: Math.random() * 0.5 - 0.25
      });
    }
    
    // Create connections between nodes
    const connections = [];
    for (let i = 0; i < nodes.length; i++) {
      const connectionsCount = Math.floor(Math.random() * 2) + 1;
      for (let j = 0; j < connectionsCount; j++) {
        const target = Math.floor(Math.random() * nodes.length);
        if (target !== i) {
          connections.push({
            source: i,
            target,
            progress: 0,
            speed: Math.random() * 0.02 + 0.003,
            active: Math.random() > 0.7,
            color: Math.random() > 0.8 ? '#4da6ff' : '#66ccff'
          });
        }
      }
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update nodes
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;
        
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      });
      
      // Draw connections and data packets
      connections.forEach(connection => {
        const source = nodes[connection.source];
        const target = nodes[connection.target];
        
        // Draw line
        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
        
        // Draw data packets if connection is active
        if (connection.active) {
          connection.progress += connection.speed;
          if (connection.progress > 1) {
            connection.progress = 0;
            connection.active = Math.random() > 0.5;
          }
          
          const packetX = source.x + (target.x - source.x) * connection.progress;
          const packetY = source.y + (target.y - source.y) * connection.progress;
          
          ctx.beginPath();
          ctx.arc(packetX, packetY, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = connection.color;
          ctx.fill();
        } else if (Math.random() > 0.995) {
          connection.active = true;
        }
      });
      
      // Draw nodes
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(59, 130, 246, 0.6)';
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <footer className="relative overflow-hidden border-t border-blue-800/50">
      {/* Circuit animation layer */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-20"></canvas>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand and Description */}
          <div className="md:col-span-1">
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-white mb-4 inline-flex items-center">
              <div className="w-8 h-8 mr-2 bg-blue-800/50 rounded-lg flex items-center justify-center border border-blue-400/30">
                <span className="text-blue-300 text-lg font-mono">S30</span>
              </div>
              SUPER30
            </div>
            
            <div className="backdrop-blur-lg bg-white/5 rounded-xl p-5 border border-blue-400/20 relative overflow-hidden group mb-6">
              {/* Glowing corners */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-blue-400/50 rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-blue-400/50 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-blue-400/50 rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-blue-400/50 rounded-br-lg"></div>
              
              <p className="text-blue-100/80">
                An exclusive tech bootcamp designed to transform college students into job-ready developers in just 4 weeks. Created and mentored by Eklavya Singh.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <a href="https://github.com/eklavyabytesquad" target="_blank" rel="noopener noreferrer" className="group">
                <div className="w-10 h-10 backdrop-blur-md bg-white/5 rounded-lg flex items-center justify-center border border-blue-400/20 transition-all duration-300 group-hover:bg-white/10 group-hover:border-blue-400/40 group-hover:shadow-blue-400/20 group-hover:shadow-lg">
                  <svg className="w-5 h-5 text-blue-300 group-hover:text-blue-200 transition-colors" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
              </a>
              
              <a href="https://www.linkedin.com/in/theeklavyasingh/" target="_blank" rel="noopener noreferrer" className="group">
                <div className="w-10 h-10 backdrop-blur-md bg-white/5 rounded-lg flex items-center justify-center border border-blue-400/20 transition-all duration-300 group-hover:bg-white/10 group-hover:border-blue-400/40 group-hover:shadow-blue-400/20 group-hover:shadow-lg">
                  <svg className="w-5 h-5 text-blue-300 group-hover:text-blue-200 transition-colors" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </div>
              </a>
              
              <a href="https://www.instagram.com/theeklavyasingh/" target="_blank" rel="noopener noreferrer" className="group">
                <div className="w-10 h-10 backdrop-blur-md bg-white/5 rounded-lg flex items-center justify-center border border-blue-400/20 transition-all duration-300 group-hover:bg-white/10 group-hover:border-blue-400/40 group-hover:shadow-blue-400/20 group-hover:shadow-lg">
                  <svg className="w-5 h-5 text-blue-300 group-hover:text-blue-200 transition-colors" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
              </a>
              
              <a href="https://twitter.com/eklavyasingh_" target="_blank" rel="noopener noreferrer" className="group">
                <div className="w-10 h-10 backdrop-blur-md bg-white/5 rounded-lg flex items-center justify-center border border-blue-400/20 transition-all duration-300 group-hover:bg-white/10 group-hover:border-blue-400/40 group-hover:shadow-blue-400/20 group-hover:shadow-lg">
                  <svg className="w-5 h-5 text-blue-300 group-hover:text-blue-200 transition-colors" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </div>
              </a>
            </div>
          </div>
          
          {/* Quick Navigation */}
          <div>
            <div className="backdrop-blur-lg bg-white/5 rounded-xl p-6 border border-blue-400/20 relative overflow-hidden group h-full">
              {/* Glowing corners */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-blue-400/50 rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-blue-400/50 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-blue-400/50 rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-blue-400/50 rounded-br-lg"></div>
              
              <h3 className="text-lg font-semibold text-blue-200 mb-4 inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Navigation
              </h3>
              
              <nav>
                <ul className="space-y-2">
                  <li>
                    <a href="#about" className="text-blue-100/70 hover:text-blue-200 transition-colors flex items-center group/link">
                      <div className="w-2 h-2 bg-blue-500/50 rounded-full mr-2 group-hover/link:bg-blue-400 transition-colors"></div>
                      About Program
                    </a>
                  </li>
                  <li>
                    <a href="#curriculum" className="text-blue-100/70 hover:text-blue-200 transition-colors flex items-center group/link">
                      <div className="w-2 h-2 bg-blue-500/50 rounded-full mr-2 group-hover/link:bg-blue-400 transition-colors"></div>
                      Curriculum
                    </a>
                  </li>
                  <li>
                    <a href="#features" className="text-blue-100/70 hover:text-blue-200 transition-colors flex items-center group/link">
                      <div className="w-2 h-2 bg-blue-500/50 rounded-full mr-2 group-hover/link:bg-blue-400 transition-colors"></div>
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#rewards" className="text-blue-100/70 hover:text-blue-200 transition-colors flex items-center group/link">
                      <div className="w-2 h-2 bg-blue-500/50 rounded-full mr-2 group-hover/link:bg-blue-400 transition-colors"></div>
                      Rewards
                    </a>
                  </li>
                  <li>
                    <a href="#mentor" className="text-blue-100/70 hover:text-blue-200 transition-colors flex items-center group/link">
                      <div className="w-2 h-2 bg-blue-500/50 rounded-full mr-2 group-hover/link:bg-blue-400 transition-colors"></div>
                      Mentor
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          
          {/* Contact */}
          <div>
            <div className="backdrop-blur-lg bg-white/5 rounded-xl p-6 border border-blue-400/20 relative overflow-hidden group h-full">
              {/* Glowing corners */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-blue-400/50 rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-blue-400/50 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-blue-400/50 rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-blue-400/50 rounded-br-lg"></div>
              
              <h3 className="text-lg font-semibold text-blue-200 mb-4 inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
                Connect with Eklavya
              </h3>
              
              <ul className="space-y-4">
                <li className="flex items-start group/contact">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-800/50 rounded-lg flex items-center justify-center mr-3 border border-blue-400/30 group-hover/contact:border-blue-400/60 transition-all">
                    <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-blue-200 font-medium block mb-1">Phone</span>
                    <a href="tel:+917668291228" className="text-blue-100/70 hover:text-blue-200 transition-colors group-hover/contact:text-blue-200">+91 76682 91228</a>
                  </div>
                </li>
                
                <li className="flex items-start group/contact">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-800/50 rounded-lg flex items-center justify-center mr-3 border border-blue-400/30 group-hover/contact:border-blue-400/60 transition-all">
                    <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-blue-200 font-medium block mb-1">Email</span>
                    <a href="mailto:eklavya@theeklavyasingh.com" className="text-blue-100/70 hover:text-blue-200 transition-colors group-hover/contact:text-blue-200 break-all">eklavya@theeklavyasingh.com</a>
                  </div>
                </li>
                
                <li className="group/contact">
                  <div className="mt-4 bg-gradient-to-r from-blue-900/50 to-blue-800/50 rounded-lg p-3 border border-blue-500/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full filter blur-xl opacity-70"></div>
                    <p className="text-blue-100/80 text-sm">
                      Coding is not just about building software; it is about solving problems and creating experiences that impact lives.
                    </p>
                    <div className="mt-2 text-right text-blue-300 text-xs font-medium">- Eklavya Singh</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-blue-800/30 text-center relative">
          <div className="inline-block bg-blue-900/30 px-5 py-1.5 rounded-full border border-blue-400/20 text-blue-400 text-sm font-mono mb-3">
            <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
            super30_bootcamp.sys
          </div>
          <p className="text-blue-300/50">
            &copy; {new Date().getFullYear()} Developed by Eklavya Singh. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;