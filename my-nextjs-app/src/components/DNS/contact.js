'use client';

import { useEffect, useState, useRef } from 'react';
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { CodeBracketIcon, CpuChipIcon, RocketLaunchIcon } from '@heroicons/react/24/solid';

export default function Contact() {
  const [showContactForm, setShowContactForm] = useState(true);
  const [revealMessage, setRevealMessage] = useState(false);
  const contactFormRef = useRef(null);
  
  // Intersection Observer for scroll-based visibility detection
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      
      // Only trigger the animation when the form comes into view
      if (entry.isIntersecting) {
        const timer1 = setTimeout(() => {
          setShowContactForm(false);
        }, 2000); // Start animation 2 seconds after the form is visible
        
        const timer2 = setTimeout(() => {
          setRevealMessage(true);
        }, 2500);
        
        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
        };
      }
    }, { 
      threshold: 0.4 // Form must be 40% visible before triggering
    });
    
    if (contactFormRef.current) {
      observer.observe(contactFormRef.current);
    }
    
    return () => {
      if (contactFormRef.current) {
        observer.unobserve(contactFormRef.current);
      }
    };
  }, []);

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Ice-themed background with tech circuit patterns */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-blue-700 to-black">
        {/* Circuit patterns overlay */}
        <div className="absolute inset-0 opacity-20" 
             style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.3\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
              backgroundSize: '24px 24px'}}></div>
      </div>
      
      {/* Floating code particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute text-blue-200 opacity-30 animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${10 + Math.random() * 20}s`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `rotate(${Math.random() * 360}deg)`,
              fontSize: `${Math.random() * 20 + 10}px`
            }}
          >
            {["</>", "{}", "[]", "//", "&&", "||", "==", "+=", "=>", "**"][Math.floor(Math.random() * 10)]}
          </div>
        ))}
      </div>
      
      {/* Iceberg clipath reveal effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-white"
           style={{
             clipPath: showContactForm ? 
               'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' : 
               'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
             transition: 'clip-path 1.5s cubic-bezier(0.7, 0, 0.3, 1)'
           }}>
        {/* Subtle grid pattern overlay for ice texture */}
        <div className="absolute inset-0 opacity-10" 
             style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%230f172a\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Initially visible content */}
        <div ref={contactFormRef} className={`transition-all duration-1000 ${showContactForm ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-36'}`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-300">
                Contact Us
              </span>
            </h2>
            <p className="text-lg text-blue-100 max-w-3xl mx-auto">
              Have questions or want to learn more? Reach out to us!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-blue-900/40 backdrop-blur-xl p-8 rounded-2xl border border-blue-700/50 shadow-lg transform hover:scale-[1.02] transition-all">
              <h3 className="text-2xl font-semibold mb-6 text-blue-300">Get In Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-800/50 p-3 rounded-full">
                    <MapPinIcon className="h-6 w-6 text-blue-200" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-white">Location</h4>
                    <p className="text-blue-100 mt-1">
                      SRM Institute of Science and Technology,<br />
                      Vadapalani Campus, Chennai - 600026
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-800/50 p-3 rounded-full">
                    <EnvelopeIcon className="h-6 w-6 text-blue-200" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-white">Email</h4>
                    <p className="text-blue-100 mt-1">
                      <a href="mailto:dns.srm.vdp@gmail.com" className="hover:text-blue-300 transition-colors">
                        dns.srm.vdp@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-800/50 p-3 rounded-full">
                    <PhoneIcon className="h-6 w-6 text-blue-200" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-white">Phone</h4>
                    <p className="text-blue-100 mt-1">
                      <a href="tel:+917668291228" className="hover:text-blue-300 transition-colors">
                        +91 76682 91228
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-900/40 backdrop-blur-xl p-8 rounded-2xl border border-blue-700/50 shadow-lg transform hover:scale-[1.02] transition-all">
              <h3 className="text-2xl font-semibold mb-6 text-blue-300">Send Message</h3>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-blue-100 mb-1">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full bg-blue-800/50 border border-blue-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Your Name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-blue-100 mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full bg-blue-800/50 border border-blue-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Your Email"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-blue-100 mb-1">Message</label>
                  <textarea 
                    id="message" 
                    rows="4" 
                    className="w-full bg-blue-800/50 border border-blue-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Your Message"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-400 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-400 hover:to-blue-300 transition-all shadow-lg hover:shadow-blue-500/30"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Revealed content (recruitment message) */}
        <div className={`transition-all duration-1000 transform ${revealMessage ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black">
              <span className="relative">
                <span className="absolute -top-6 right-0 text-blue-600 text-lg font-mono transform rotate-12 animate-pulse">&lt;code&gt;</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-500">
                  Why Contact When You Can Join Us?
                </span>
                <span className="absolute -bottom-6 left-0 text-blue-600 text-lg font-mono transform -rotate-12 animate-pulse">&lt;/code&gt;</span>
              </span>
            </h2>
            <div className="max-w-3xl mx-auto relative">
              <p className="text-xl text-black font-medium mt-8 mb-4 relative z-10">
                Proudly fill the recruitment form and become part of our tech club!
              </p>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200/30 to-white/30 blur-xl"></div>
            </div>
          </div>

          {/* Glassmorphism cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            {/* Tech feature box 1 - Glassmorphism style */}
            <div className="relative overflow-hidden group">
              {/* Background with gradient and blur */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-black/90 backdrop-filter backdrop-blur-xl rounded-xl"></div>
              
              {/* Border glow effect */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent)',
                    backgroundSize: '200% 100%',
                    animation: 'borderGlow 3s linear infinite'
                  }}>
              </div>
              
              {/* Content */}
              <div className="relative p-6 rounded-xl shadow-xl border border-blue-700/30 backdrop-blur-sm h-full z-10">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-800/50 mb-4 group-hover:bg-blue-700 transition-all group-hover:scale-110">
                    <CodeBracketIcon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Coding Wizards</h3>
                </div>
                <p className="text-blue-100">Join a team of coding enthusiasts who turn complex challenges into elegant solutions.</p>
              </div>
            </div>
            
            {/* Tech feature box 2 - Glassmorphism style */}
            <div className="relative overflow-hidden group">
              {/* Background with gradient and blur */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-800/80 to-black/90 backdrop-filter backdrop-blur-xl rounded-xl"></div>
              
              {/* Border glow effect */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent)',
                    backgroundSize: '200% 100%',
                    animation: 'borderGlow 3s linear infinite'
                  }}>
              </div>
              
              {/* Content */}
              <div className="relative p-6 rounded-xl shadow-xl border border-blue-700/30 backdrop-blur-sm h-full z-10">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-700/50 mb-4 group-hover:bg-blue-600 transition-all group-hover:scale-110">
                    <RocketLaunchIcon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Innovation Hub</h3>
                </div>
                <p className="text-blue-100">Be at the cutting edge of technology with our innovative projects and research opportunities.</p>
              </div>
            </div>
            
            {/* Tech feature box 3 - Glassmorphism style */}
            <div className="relative overflow-hidden group">
              {/* Background with gradient and blur */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-700/80 to-black/90 backdrop-filter backdrop-blur-xl rounded-xl"></div>
              
              {/* Border glow effect */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent)',
                    backgroundSize: '200% 100%',
                    animation: 'borderGlow 3s linear infinite'
                  }}>
              </div>
              
              {/* Content */}
              <div className="relative p-6 rounded-xl shadow-xl border border-blue-700/30 backdrop-blur-sm h-full z-10">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600/50 mb-4 group-hover:bg-blue-500 transition-all group-hover:scale-110">
                    <CpuChipIcon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Tech Club</h3>
                </div>
                <p className="text-blue-100">Connect with passionate tech enthusiasts, share ideas, and grow professionally together.</p>
              </div>
            </div>
          </div>

          {/* Super cool button with enhanced effects */}
          <div className="flex justify-center">
            <a 
              href="https://forms.gle/61GWS3qEfjHEGvff9" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-400 rounded-md shadow-lg overflow-hidden z-10"
            >
              {/* Enhanced glow effect */}
              <span className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg blur opacity-0 group-hover:opacity-70 transition-opacity duration-300 group-hover:animate-pulse"></span>
              
              {/* Digital circuit pattern overlay */}
              <span className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'1\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'1\'/%3E%3Cpath d=\'M3 13h10v1H3z\'/%3E%3Cpath d=\'M13 3v10h1V3z\'/%3E%3C/g%3E%3C/svg%3E")',
                }} 
              ></span>
              
              {/* Button content with cool hover effect */}
              <span className="relative flex items-center space-x-2 z-10">
                <span className="group-hover:-translate-y-1 transform transition-transform duration-300">Join Our Tech Squad</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300 group-hover:animate-pulse" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              
              {/* Bottom shine effect */}
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-white/0 via-white/80 to-white/0 transform translate-y-1 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100"></span>
              
              {/* Particle effect on hover */}
              <span className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <span
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full opacity-0 group-hover:animate-particle"
                    style={{
                      top: '50%',
                      left: '50%',
                      animationDelay: `${i * 0.1}s`,
                      transform: `rotate(${i * 45}deg)`,
                    }}
                  ></span>
                ))}
              </span>
            </a>
          </div>
          
          {/* Contact info still available */}
          <div className="mt-16 text-center text-black">
            <p className="font-semibold mb-2">Still have questions? Reach out directly:</p>
            <div className="flex justify-center space-x-8">
              <a href="mailto:dns.srm.vdp@gmail.com" className="flex items-center text-blue-700 hover:text-blue-500 transition-colors">
                <EnvelopeIcon className="h-5 w-5 mr-2" />
                <span>dns.srm.vdp@gmail.com</span>
              </a>
              <a href="tel:+917668291228" className="flex items-center text-blue-700 hover:text-blue-500 transition-colors">
                <PhoneIcon className="h-5 w-5 mr-2" />
                <span>+91 76682 91228</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add custom animation keyframes for enhanced effects */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          50% {
            transform: translateY(-30px) rotate(10deg);
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-60px) rotate(20deg);
            opacity: 0;
          }
        }
        
        @keyframes borderGlow {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }
        
        @keyframes particle {
          0% {
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(2) rotate(45deg) translateX(100px);
            opacity: 0;
          }
        }
        
        .animate-float {
          animation-name: float;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }
        
        .animate-particle {
          animation: particle 1.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
}