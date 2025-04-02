'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function JoinUs() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Glowing particles animation
  const Particles = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 md:w-2 md:h-2 rounded-full bg-blue-400"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.3,
              animation: `float ${Math.random() * 10 + 15}s linear infinite, pulse ${Math.random() * 2 + 2}s ease-in-out infinite alternate`
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <section id="join-us" className="py-24 relative" ref={sectionRef}>
      {/* Add a unique and subtle animation effect */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(20px, 20px) rotate(90deg); }
          50% { transform: translate(0, 40px) rotate(180deg); }
          75% { transform: translate(-20px, 20px) rotate(270deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(96, 165, 250, 0.4); }
          100% { transform: scale(1.5); box-shadow: 0 0 0 10px rgba(96, 165, 250, 0); }
        }
        
        @keyframes borderFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes textGlow {
          0% { text-shadow: 0 0 10px rgba(96, 165, 250, 0.7); }
          50% { text-shadow: 0 0 20px rgba(96, 165, 250, 0.9), 0 0 30px rgba(96, 165, 250, 0.5); }
          100% { text-shadow: 0 0 10px rgba(96, 165, 250, 0.7); }
        }
        
        @keyframes ripple {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
      
      {/* Floating particles */}
      <Particles />
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 animate-textGlow">
                Join Us!
              </span>
              {/* Moving dots around the title */}
              <div className="absolute -top-2 -right-2 w-1 h-1 bg-blue-500 rounded-full animate-ping"></div>
              <div className="absolute -bottom-2 -left-2 w-1 h-1 bg-purple-500 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
            </h2>
          </div>
          
          <div className={`relative backdrop-blur-sm p-8 rounded-2xl mb-12 overflow-hidden group transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} style={{ transitionDelay: '200ms' }}>
            {/* Animated border effect */}
            <div className="absolute inset-0 rounded-2xl z-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-blue-600/30 opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-2xl opacity-30 blur-xl group-hover:opacity-50 transition-all"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-2xl opacity-50 animate-borderFlow bg-[length:200%_auto] group-hover:opacity-70"></div>
              <div className="absolute inset-[3px] bg-gray-900/60 backdrop-blur-md rounded-xl z-0"></div>
            </div>
            
            <div className="relative z-10">
              <p className="text-xl md:text-2xl mb-6 text-blue-100 font-medium">
                📢 Join DNS if youre serious about taking your coding skills to the next level!
              </p>
              
              <div className="relative inline-block">
                <a 
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfkpwPDEtksKJmKOMDG8aWpJvU3A7FbLNk-x5nEx7B0qGSUtA/viewform?usp=dialog" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full transition-all duration-300 shadow-xl hover:shadow-blue-500/50 transform hover:-translate-y-1 hover:scale-105 group/btn"
                >
                  Apply Now
                  <ArrowRightIcon className="ml-2 h-5 w-5 transform group-hover/btn:translate-x-1 transition-transform" />
                </a>
                
                {/* Ripple effect around the button */}
                <div className="absolute inset-0 -m-1 rounded-full bg-blue-500/50 opacity-0 group-hover:animate-ripple"></div>
                <div className="absolute inset-0 -m-1 rounded-full bg-purple-500/50 opacity-0 group-hover:animate-ripple" style={{ animationDelay: '0.3s' }}></div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div 
              className={`relative backdrop-blur-sm p-6 rounded-xl overflow-hidden group transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              style={{ transitionDelay: '400ms' }}
            >
              {/* Hover effect border and background */}
              <div className="absolute inset-0 rounded-xl z-0 overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/30 opacity-50 group-hover:opacity-70 transition-opacity"></div>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-300 rounded-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
                <div className="absolute inset-[3px] bg-gray-900/60 backdrop-blur-md rounded-xl z-0"></div>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-4 text-blue-300 group-hover:text-blue-200 transition-colors duration-300">
                  WhatsApp Group
                  <div className="w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-500 mt-1"></div>
                </h3>
                <p className="text-blue-100 mb-4">Stay updated with our latest events, projects, and opportunities by joining our WhatsApp group for interested students.</p>
                <a 
                  href="https://chat.whatsapp.com/JVEUgCGHqvtEGiizlOqSrQ" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium"
                >
                  <span className="relative">
                    Join WhatsApp Group
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-500"></span>
                  </span>
                  <ArrowRightIcon className="ml-1 h-4 w-4 transform group-hover:translate-x-2 transition-transform duration-500" />
                </a>
              </div>
              
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-transparent border-r-blue-500/20 group-hover:border-r-blue-400/40 transition-colors duration-500 rounded-tr-xl"></div>
            </div>
            
            <div 
              className={`relative backdrop-blur-sm p-6 rounded-xl overflow-hidden group transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              style={{ transitionDelay: '600ms' }}
            >
              {/* Hover effect border and background */}
              <div className="absolute inset-0 rounded-xl z-0 overflow-hidden">
                <div className="absolute inset-0 bg-purple-900/30 opacity-50 group-hover:opacity-70 transition-opacity"></div>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-400 rounded-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
                <div className="absolute inset-[3px] bg-gray-900/60 backdrop-blur-md rounded-xl z-0"></div>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-4 text-purple-300 group-hover:text-purple-200 transition-colors duration-300">
                  Connect With Us
                  <div className="w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-500 mt-1"></div>
                </h3>
                <p className="text-blue-100 mb-4">Follow us on social media to see our projects, events, and connect with our community.</p>
                <div className="space-y-3">
                  {[
                    { name: '🌍 Website', url: 'https://rb.gy/7oy69k' },
                    { name: '📸 Instagram', url: 'https://www.instagram.com/dnssrm' },
                    { name: '💼 LinkedIn', url: 'https://www.linkedin.com/company/dns-developer-network-space-srm-vdp/' }
                  ].map((link, index) => (
                    <a 
                      key={index}
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between group/link"
                    >
                      <span className="text-blue-400 group-hover/link:text-purple-300 font-medium transition-colors duration-300 relative">
                        {link.name}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 group-hover/link:w-full transition-all duration-300"></span>
                      </span>
                      <ArrowRightIcon className="h-4 w-4 text-blue-400 group-hover/link:text-purple-300 transform group-hover/link:translate-x-1 transition-all duration-300" />
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-transparent border-r-purple-500/20 group-hover:border-r-purple-400/40 transition-colors duration-500 rounded-tr-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}