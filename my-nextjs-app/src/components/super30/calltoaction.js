// components/CTASection.jsx
import React, { useState, useEffect, useRef } from 'react';

const CTASection = () => {
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

  return (
    <section id="cta" className="relative py-16 overflow-hidden" ref={sectionRef}>
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-full h-full bg-gradient-to-br from-blue-950/40 via-transparent to-blue-900/40"></div>
        
        {/* Animated grid lines */}
        <div className="absolute w-full h-full border-b border-blue-500/10 animate-pulse"></div>
        <div className="absolute w-full h-full border-r border-blue-500/10 animate-pulse"></div>
        
        {/* Animated particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-blue-400/20 animate-float"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 5}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
        
        {/* Glowing orbs */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-600/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-blue-400/10 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className={`backdrop-blur-xl bg-white/10 rounded-2xl border border-blue-400/30 shadow-xl p-8 md:p-12 relative overflow-hidden group transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            {/* Animated border effect */}
            <div className="absolute inset-0 border-2 border-blue-400/0 rounded-2xl group-hover:border-blue-400/30 transition-all duration-700"></div>
            
            {/* Glowing corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-400/50 rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-400/50 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-400/50 rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-400/50 rounded-br-lg"></div>
            
            <div className="text-center relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-white">
                Join Super30 Today!
              </h2>
              
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Limited to only 30 students. Fill the form if interested and secure your spot for just ₹399!
              </p>
              
              <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12 mb-10">
                <div className="flex flex-col items-center group/stat">
                  <div className="w-16 h-16 bg-blue-800/50 rounded-full flex items-center justify-center mb-2 border border-blue-400/50 shadow-lg group-hover/stat:shadow-blue-500/30 transition-all duration-300">
                    <span className="text-3xl font-bold text-blue-200">30</span>
                  </div>
                  <span className="text-blue-300">Limited Seats</span>
                </div>
                
                <div className="w-px h-16 bg-blue-500/30 hidden md:block"></div>
                
                <div className="flex flex-col items-center group/stat">
                  <div className="w-16 h-16 bg-blue-800/50 rounded-full flex items-center justify-center mb-2 border border-blue-400/50 shadow-lg group-hover/stat:shadow-blue-500/30 transition-all duration-300">
                    <span className="text-3xl font-bold text-blue-200">4</span>
                  </div>
                  <span className="text-blue-300">Week Program</span>
                </div>
                
                <div className="w-px h-16 bg-blue-500/30 hidden md:block"></div>
                
                <div className="flex flex-col items-center group/stat">
                  <div className="w-16 h-16 bg-blue-800/50 rounded-full flex items-center justify-center mb-2 border border-blue-400/50 shadow-lg group-hover/stat:shadow-blue-500/30 transition-all duration-300">
                    <span className="text-3xl font-bold text-blue-200">₹399</span>
                  </div>
                  <span className="text-blue-300">All-Inclusive</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="relative group/btn inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg blur-sm opacity-70 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  <a 
                    href="https://forms.gle/Nbosgmm9LXCoQ5Tu8" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="relative bg-blue-900 hover:bg-blue-800 px-8 py-4 rounded-lg text-white font-bold inline-flex items-center transition-all duration-300 border border-blue-500/50 group-hover/btn:border-blue-400 z-10 shadow-xl hover:shadow-blue-500/30 transform hover:-translate-y-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Register Now
                  </a>
                </div>
                
                <a 
                  href="#about" 
                  className="bg-transparent border border-blue-400 text-blue-300 hover:text-white hover:border-white font-medium px-8 py-4 rounded-lg transition-all duration-300 inline-flex items-center justify-center transform hover:-translate-y-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Learn More
                </a>
              </div>
              
              {/* Terminal-like element */}
              <div className="max-w-lg mx-auto mt-8 bg-black/60 rounded-lg overflow-hidden text-left">
                <div className="flex items-center px-3 py-2 bg-blue-900/50 border-b border-blue-500/30">
                  <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                  <div className="text-xs text-blue-300 ml-2 font-mono">super30_info.sh</div>
                </div>
                <div className="p-3 font-mono text-sm">
                  <div className="text-blue-400 mb-1">$ <span className="text-white">echo</span> <span className="text-green-400">"We'll contact you after reviewing your application"</span></div>
                  <div className="text-blue-200">{">"} Fill the form if interested. We'll call you for payment after confirmation.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add keyframes for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default CTASection;