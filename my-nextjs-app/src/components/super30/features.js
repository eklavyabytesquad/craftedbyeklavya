import React, { useEffect, useRef, useState } from 'react';

const FeaturesSection = () => {
  const sectionRef = useRef(null);
  const featureRefs = useRef([]);
  const [isInView, setIsInView] = useState(false);
  
  const features = [
    {
      title: "Expert Mentorship",
      description: "Learn directly from Eklavya Singh, an award-winning developer with multiple hackathon victories and industry experience.",
      icon: (
        <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      delay: 100
    },
    {
      title: "Practical Learning",
      description: "Build real projects throughout the program with guided support from experienced mentors.",
      icon: (
        <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      delay: 200
    },
    {
      title: "Complete Resources",
      description: "Access all learning materials, lecture recordings, and resources for future reference after the program.",
      icon: (
        <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
      delay: 300
    },
    {
      title: "Final Hackathon",
      description: "Form teams of 5 and compete to build innovative solutions with exciting prizes for winners.",
      icon: (
        <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      delay: 400
    },
    {
      title: "Attendance Rewards",
      description: "Special recognition and bonuses for students with perfect attendance throughout the program.",
      icon: (
        <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      delay: 500
    },
    {
      title: "Limited Batch Size",
      description: "Our exclusive program is limited to only 30 students to ensure personalized attention and quality learning.",
      icon: (
        <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      delay: 600
    }
  ];

  useEffect(() => {
    // Initialize refs array
    featureRefs.current = featureRefs.current.slice(0, features.length);
    
    // Create an Intersection Observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when the section enters viewport
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the section is visible
    );
    
    // Start observing the section
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Scroll animation for individual feature cards
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-feature');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );
    
    // Observe each feature card
    featureRefs.current.forEach(ref => {
      if (ref) {
        cardObserver.observe(ref);
      }
    });
    
    return () => {
      // Clean up observers
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      
      featureRefs.current.forEach(ref => {
        if (ref) {
          cardObserver.unobserve(ref);
        }
      });
    };
  }, []);

  return (
    <section 
      id="features" 
      ref={sectionRef}
      className="py-20 relative bg-transparent overflow-hidden"
    >
      {/* Google Fonts Import */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&family=Roboto+Mono:wght@300;400;500&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
      `}</style>

      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Circuit Board Pattern */}
        <div className="absolute w-full h-full opacity-10">
          <div className="circuit-board"></div>
        </div>
        
        {/* Grid Pattern */}
        <div className="absolute w-full h-full opacity-10">
          <svg width="100%" height="100%">
            <pattern id="grid-pattern" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#4f86f7" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header with animated reveal */}
          <div className={`text-center mb-16 transition-all duration-1000 transform ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Enhanced 3D-like heading */}
            <div className="perspective">
              <h2 className="text-5xl font-bold mb-6 text-white font-orbitron tracking-wider heading-3d">
                <span className="text-layer text-blue-200">PROGRAM FEATURES</span>
                <span className="text-layer text-blue-400">PROGRAM FEATURES</span>
                <span className="text-layer text-blue-600">PROGRAM FEATURES</span>
                <span className="text-layer text-blue-800">PROGRAM FEATURES</span>
              </h2>
              <div className="heading-reflection"></div>
            </div>
            
            <p className="text-lg text-blue-100 max-w-3xl mx-auto font-space-grotesk mt-20">
              What makes Super30 different from other bootcamps? We have designed every aspect 
              of the program to maximize your learning and career potential.
            </p>
          </div>
          
          {/* Cards Grid with staggered animation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                ref={el => featureRefs.current[index] = el}
                className="glassmorphism-card opacity-0 translate-y-10 transition-all duration-500 transform group relative"
                style={{ transitionDelay: `${feature.delay}ms` }}
              >
                {/* Card Inner */}
                <div className="relative z-10 h-full p-6">
                  {/* Card Header with Icon */}
                  <div className="flex items-center mb-6">
                    <div className="cyber-icon-container mr-4">
                      <div className="cyber-icon-bg"></div>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl text-white font-orbitron tracking-wide">
                      {feature.title}
                    </h3>
                  </div>
                  
                  {/* Separator Line */}
                  <div className="cyber-line mb-4"></div>
                  
                  {/* Description */}
                  <p className="text-blue-100 mb-6 font-space-grotesk">
                    {feature.description}
                  </p>
                </div>

                {/* Decorative Corner Elements */}
                <div className="absolute top-0 right-0 w-8 h-8 corner-decoration"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 corner-decoration rotate-180"></div>
                
                {/* Animated Border */}
                <div className="glowing-border"></div>
                
                {/* Scan Line Effect */}
                <div className="scan-line"></div>
                
                {/* Binary Data Corner */}
                <div className="absolute bottom-2 right-2 text-xs font-mono text-blue-400/30 binary-data">
                  01
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS for styling and animations */}
      <style jsx>{`
        /* Font Classes */
        .font-orbitron {
          font-family: 'Orbitron', sans-serif;
        }
        
        .font-space-grotesk {
          font-family: 'Space Grotesk', sans-serif; 
        }
        
        .font-mono {
          font-family: 'Roboto Mono', monospace;
        }
        
        /* 3D Text Heading */
        .perspective {
          perspective: 500px;
          position: relative;
        }
        
        .heading-3d {
          position: relative;
          transform-style: preserve-3d;
          transform: rotateX(10deg);
          text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
        }
        
        .text-layer {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
        }
        
        .text-layer:nth-child(1) {
          transform: translateZ(20px);
        }
        
        .text-layer:nth-child(2) {
          transform: translateZ(15px);
        }
        
        .text-layer:nth-child(3) {
          transform: translateZ(10px);
        }
        
        .text-layer:nth-child(4) {
          transform: translateZ(5px);
        }
        
        .heading-reflection {
          margin-top: 2px;
          height: 30px;
          width: 100%;
          background: linear-gradient(to bottom, rgba(79, 134, 247, 0.2), transparent);
          transform: rotateX(180deg) translateY(-40px);
          opacity: 0.3;
          filter: blur(4px);
        }
        
        /* Animations */
        @keyframes scanLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        
        @keyframes borderFlow {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }
        
        @keyframes cornerBlink {
          0%, 100% { opacity: 0.7; border-color: rgba(59, 130, 246, 0.7); }
          50% { opacity: 1; border-color: rgba(96, 165, 250, 1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        
        /* Card Styling */
        .glassmorphism-card {
          background: rgba(13, 25, 42, 0.7);
          backdrop-filter: blur(8px);
          border-radius: 8px;
          border: 1px solid rgba(59, 130, 246, 0.2);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 
                      inset 0 0 60px rgba(59, 130, 246, 0.1);
          overflow: hidden;
          height: 100%;
          transition: all 0.3s ease;
        }
        
        .glassmorphism-card:hover {
          border-color: rgba(59, 130, 246, 0.4);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5), 
                      inset 0 0 80px rgba(59, 130, 246, 0.15);
          transform: translateY(-5px);
        }
        
        /* Animated Glowing Border */
        .glowing-border {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 8px;
          pointer-events: none;
          z-index: 1;
        }
        
        .glassmorphism-card:hover .glowing-border::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 7px;
          padding: 1px;
          background: linear-gradient(90deg, #4f86f7, #2563eb, #4f86f7);
          background-size: 200% 100%;
          animation: borderFlow 3s linear infinite;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }
        
        /* Corner Decorations */
        .corner-decoration {
          border-top: 2px solid rgba(59, 130, 246, 0.7);
          border-right: 2px solid rgba(59, 130, 246, 0.7);
          border-radius: 0 2px 0 0;
          animation: cornerBlink 2s infinite;
        }
        
        /* Cyber Icon Styling */
        .cyber-icon-container {
          position: relative;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .cyber-icon-bg {
          position: absolute;
          inset: 0;
          background: rgba(59, 130, 246, 0.1);
          border-radius: 6px;
          border: 1px solid rgba(59, 130, 246, 0.3);
          animation: pulse 2s infinite;
        }
        
        /* Cyber Line */
        .cyber-line {
          height: 1px;
          width: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(59, 130, 246, 0.5), 
            transparent
          );
        }
        
        /* Scan Line Effect */
        .scan-line {
          position: absolute;
          height: 5px;
          width: 100%;
          background: linear-gradient(180deg,
            rgba(59, 130, 246, 0),
            rgba(59, 130, 246, 0.3),
            rgba(59, 130, 246, 0)
          );
          z-index: 1;
          opacity: 0;
          transition: opacity 0.3s;
        }
        
        .glassmorphism-card:hover .scan-line {
          opacity: 1;
          animation: scanLine 2s linear infinite;
        }
        
        /* Binary Data */
        .binary-data {
          animation: blink 1.5s infinite;
        }
        
        /* Circuit Board Pattern */
        .circuit-board {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(circle at 25px 25px, rgba(59, 130, 246, 0.15) 2px, transparent 0),
            linear-gradient(to right, rgba(59, 130, 246, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.15) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        
        /* Animation Classes */
        .animate-feature {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  );
};

export default FeaturesSection;