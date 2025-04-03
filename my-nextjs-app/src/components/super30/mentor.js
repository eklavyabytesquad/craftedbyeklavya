// components/MentorSection.jsx
import React, { useState, useEffect } from 'react';

const MentorSection = () => {
  // Animation for count-up effect
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('stats-section');
      if (element) {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight && !isVisible) {
          setIsVisible(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible]);
  
  useEffect(() => {
    if (isVisible && count < 30) {
      const timer = setTimeout(() => {
        setCount(prevCount => prevCount + 1);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [count, isVisible]);

  const experiences = [
    {
      title: "President at Developer Network Space (DNS)",
      period: "Apr 2025 - Present",
      description: "Leading the exclusive club for developers and coders, connecting talented individuals to collaborate on quality projects and participate in hackathons."
    },
    {
      title: "IET Volunteer",
      period: "Aug 2023 - Present",
      description: "Managed annual events for IET India Chennai Chapter, learned professional networking, event management, and leadership skills."
    },
    {
      title: "Software Development Engineer Intern at Miniture",
      period: "Sep 2024 - Feb 2025",
      description: "Managed Miniture.in website on Shopify, resolved SEO issues, and fixed bugs in the React Native mobile application."
    },
    {
      title: "Outreach Executive at E-Cell IIT Madras",
      period: "Feb 2024 - Jun 2024",
      description: "Generated ₹15,000 worth of sales for E-summit, received recognition with free passes and merchandise. Learned sales, lead identification, and pitching skills."
    }
  ];

  const achievements = [
    "First Prize Winner at Hack O Holics Hackathon (₹20,000 prize)",
    "2nd Runner-Up at St Josephs College (₹10,000 prize)",
    "First Prize in Python Problem Solving Contest",
    "Second Winner at Web Wonders and Code Webs competitions",
    "Shortlisted for Flipkart Grid (top 8000 out of 2.5 lakh+ teams)",
    "Founder of Developers Network SRM",
    "Featured in news media for innovative tech solutions"
  ];

  return (
    <div className="min-h-screen text-white bg-transparent relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute w-full h-full bg-gradient-to-br from-blue-950/40 via-transparent to-blue-900/40"></div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          {/* Animated grid lines */}
          <div className="absolute w-full h-full border-b border-blue-500/10 animate-pulse"></div>
          <div className="absolute w-full h-full border-r border-blue-500/10 animate-pulse"></div>
          
          {/* Animated particles */}
          {Array.from({ length: 20 }).map((_, i) => (
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
      </div>
      
      {/* Main Content Container */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-16">
          {/* Profile Info */}
          <div className="lg:w-1/2 w-full">
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-blue-400/30 shadow-xl transition-all duration-500 hover:shadow-blue-400/20 hover:border-blue-400/40 relative overflow-hidden group">
              {/* Animated border effect */}
              <div className="absolute inset-0 border-2 border-blue-400/0 rounded-2xl group-hover:border-blue-400/30 transition-all duration-700"></div>
              
              {/* Glowing corners */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-400/50 rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-400/50 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-400/50 rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-400/50 rounded-br-lg"></div>
              
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start relative z-10">
                <div className="relative group">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-700"></div>
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-blue-400/50 shadow-lg shadow-blue-500/30 transition-transform duration-500 group-hover:scale-105 relative z-10">
                    <img 
                      src="https://pknfpxunrdaidfveqfha.supabase.co/storage/v1/object/public/images/super30/eklavya.jpg" 
                      alt="Eklavya Singh" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-2 rounded-full shadow-lg shadow-blue-500/50 z-20 animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                
                <div className="text-center md:text-left " id="mentor">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white mb-2">
                    Eklavya Singh
                  </h1>
                  <p className="text-blue-300 text-lg md:text-xl font-medium mb-2">
                    Lead Instructor at Super30 | Full Stack Developer
                  </p>
                  <p className="text-blue-100/80 mb-4 flex items-center justify-center md:justify-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Chennai, Tamil Nadu, India
                  </p>
                  
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 shadow-md shadow-blue-500/20 hover:shadow-blue-500/40 flex items-center transform hover:translate-y-[-2px]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      Connect
                    </button>
                    <button className="bg-transparent hover:bg-blue-700/30 text-blue-300 font-medium px-4 py-2 rounded-lg border border-blue-400/50 transition-all duration-300 flex items-center transform hover:translate-y-[-2px] hover:border-blue-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Super30 Stats */}
          <div id="stats-section" className="lg:w-1/2 w-full">
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-blue-400/30 shadow-xl relative overflow-hidden group transition-all duration-500 hover:shadow-blue-400/20 hover:border-blue-400/40">
              {/* Animated border effect */}
              <div className="absolute inset-0 border-2 border-blue-400/0 rounded-2xl group-hover:border-blue-400/30 transition-all duration-700"></div>
              
              {/* Glowing corners */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-400/50 rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-400/50 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-400/50 rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-400/50 rounded-br-lg"></div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white relative z-10">
                Super30 Bootcamp
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                <div className="text-center transform transition-all duration-500 hover:scale-110 group/stat">
                  <div className="w-20 h-20 mx-auto bg-blue-600/20 rounded-full flex items-center justify-center mb-4 border border-blue-400/50 shadow-lg group-hover/stat:shadow-blue-500/30 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/20 opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-300 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-4xl font-bold text-white mb-2 relative">
                    <span className="relative z-10">4</span>
                    <div className="absolute inset-0 bg-blue-500/20 blur-md -z-10 opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="text-blue-300 font-medium">WEEKS</div>
                </div>
                
                <div className="text-center transform transition-all duration-500 hover:scale-110 group/stat">
                  <div className="w-20 h-20 mx-auto bg-blue-600/20 rounded-full flex items-center justify-center mb-4 border border-blue-400/50 shadow-lg group-hover/stat:shadow-blue-500/30 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/20 opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-300 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div className="text-4xl font-bold text-white mb-2 relative">
                    <span className="relative z-10">{count}</span>
                    <div className="absolute inset-0 bg-blue-500/20 blur-md -z-10 opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="text-blue-300 font-medium">STUDENTS</div>
                </div>
                
                <div className="text-center transform transition-all duration-500 hover:scale-110 group/stat">
                  <div className="w-20 h-20 mx-auto bg-blue-600/20 rounded-full flex items-center justify-center mb-4 border border-blue-400/50 shadow-lg group-hover/stat:shadow-blue-500/30 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/20 opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-300 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-4xl font-bold text-white mb-2 relative">
                    <span className="relative z-10">100%</span>
                    <div className="absolute inset-0 bg-blue-500/20 blur-md -z-10 opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="text-blue-300 font-medium">PRACTICAL</div>
                </div>
              </div>
            </div>
            
            {/* Code snippet */}
            <div className="mt-6 backdrop-blur-xl bg-white/5 rounded-2xl p-4 border border-blue-400/30 shadow-lg overflow-hidden hover:border-blue-400/50 transition-all duration-300 relative group">
              {/* Animated border effect */}
              <div className="absolute inset-0 border-2 border-blue-400/0 rounded-2xl group-hover:border-blue-400/30 transition-all duration-700"></div>
              
              {/* Terminal header */}
              <div className="flex items-center mb-2 px-2">
                <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                <div className="text-xs text-blue-300 ml-2">super30_init.js</div>
              </div>
              
              <pre className="text-blue-200 text-sm md:text-base overflow-x-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-900/30 p-2 font-mono">
                <code className="font-mono">
{`function initializeSuper30Bootcamp() {
  const students = selectTopTalent(30);
  const curriculum = optimizeForRapidGrowth();
  const techStack = [React, Auth, SQL];
  launchProgram(students, curriculum, techStack);
  return job-ready-developers;
}`}
                </code>
              </pre>
              
              {/* Blinking cursor effect */}
              <div className="h-4 w-2 bg-blue-400 opacity-75 animate-blink ml-4"></div>
            </div>
          </div>
        </div>
        
        {/* About Instructor */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          <div className="lg:col-span-2">
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-blue-400/30 shadow-xl h-full transition-all duration-500 hover:shadow-blue-400/20 hover:border-blue-400/40 relative overflow-hidden group">
              {/* Animated border effect */}
              <div className="absolute inset-0 border-2 border-blue-400/0 rounded-2xl group-hover:border-blue-400/30 transition-all duration-700"></div>
              
              {/* Glowing corners */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-400/50 rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-400/50 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-400/50 rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-400/50 rounded-br-lg"></div>
              
              <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center relative z-10">
                <span className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-2 rounded-lg mr-3 shadow-md shadow-blue-500/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                ABOUT EKLAVYA
              </h2>
              
              <p className="text-blue-100 mb-4 leading-relaxed relative z-10">
                Eklavya is an award-winning developer and educator with a passion for building innovative solutions and nurturing tech talent. With extensive experience in full-stack development and multiple hackathon victories, he has established himself as a prominent figure in the developer community. As the founder of Developers Network SRM, he has created a thriving ecosystem for budding developers to collaborate and excel.
              </p>
              
              <p className="text-blue-100 mb-4 leading-relaxed relative z-10">
                His teaching methodology bridges the gap between academic concepts and real-world application, empowering students to become industry-ready professionals. Eklavya's work has been recognized in media outlets, and his projects span from institutional platforms to social impact solutions. With Super30, he aims to transform passionate beginners into confident, skilled developers through intensive, hands-on training.
              </p>
              
              <div className="mt-6 p-6 rounded-lg bg-gradient-to-br from-blue-800/40 to-blue-900/40 border border-blue-500/30 relative z-10 transform transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-blue-500/10">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full filter blur-2xl"></div>
                <h3 className="font-semibold text-blue-300 mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  A Message from Eklavya
                </h3>
                <p className="text-blue-100 italic">
                  "My goal with Super30 is to bridge the gap between academic learning and real-world development. 
                  I'm passionate about helping students discover their potential and giving them the practical skills 
                  to succeed in the tech industry. Having gone through the journey from a beginner to a professional developer,
                  I understand the challenges and roadblocks that students face. With Super30, I aim to provide not just technical knowledge,
                  but also industry insights, practical experience, and a supportive community that will help you thrive in your tech career.
                  Join us for an intensive month of coding, creating, and growing together!"
                </p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-blue-400/30 shadow-xl h-full transition-all duration-500 hover:shadow-blue-400/20 hover:border-blue-400/40 relative overflow-hidden group">
              {/* Animated border effect */}
              <div className="absolute inset-0 border-2 border-blue-400/0 rounded-2xl group-hover:border-blue-400/30 transition-all duration-700"></div>
              
              {/* Glowing corners */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-400/50 rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-400/50 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-400/50 rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-400/50 rounded-br-lg"></div>
              
              <h2 className="text-2xl font-bold mb-6 flex items-center relative z-10">
                <span className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-2 rounded-lg mr-3 shadow-md shadow-blue-500/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </span>
                WHY JOIN SUPER30
              </h2>
              
              <div className="space-y-4 relative z-10">
                <div className="p-4 bg-gradient-to-r from-blue-800/30 to-blue-900/30 rounded-lg border border-blue-500/20 transform transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-blue-500/10 group/feature">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600/40 flex items-center justify-center mr-3 group-hover/feature:bg-blue-500/60 transition-colors duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-blue-200">4X LEARNING SPEED</h3>
                    </div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-blue-800/30 to-blue-900/30 rounded-lg border border-blue-500/20 transform transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-blue-500/10 group/feature">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600/40 flex items-center justify-center mr-3 group-hover/feature:bg-blue-500/60 transition-colors duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-blue-200">AI-ENHANCED</h3>
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-blue-800/30 to-blue-900/30 rounded-lg border border-blue-500/20 transform transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-blue-500/10 group/feature">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600/40 flex items-center justify-center mr-3 group-hover/feature:bg-blue-500/60 transition-colors duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-blue-200">CAREER ACCELERATOR</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Experience Section */}
        <div className="mb-16">
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-blue-400/30 shadow-xl transition-all duration-500 hover:shadow-blue-400/20 hover:border-blue-400/40 relative overflow-hidden group">
            {/* Animated border effect */}
            <div className="absolute inset-0 border-2 border-blue-400/0 rounded-2xl group-hover:border-blue-400/30 transition-all duration-700"></div>
            
            {/* Glowing corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-400/50 rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-400/50 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-400/50 rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-400/50 rounded-br-lg"></div>
            
            <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center relative z-10">
              <span className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-2 rounded-lg mr-3 shadow-md shadow-blue-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              EXPERIENCE
            </h2>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-600/50 transform md:translate-x-0 translate-x-5"></div>
              
              {experiences.map((exp, index) => (
                <div key={index} className={`mb-10 md:mb-16 flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 text-right' : 'md:pl-12'}`}>
                    <div className="backdrop-blur-lg bg-white/5 rounded-xl p-6 border border-blue-400/20 transition-all duration-300 hover:bg-white/10 hover:scale-105 hover:border-blue-400/40 shadow-lg relative overflow-hidden group/card">
                      {/* Animated border glow */}
                      <div className="absolute inset-0 border border-blue-400/0 rounded-xl group-hover/card:border-blue-400/30 transition-all duration-700"></div>
                      
                      {/* Glowing corner effect */}
                      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-blue-400/50 rounded-tl-lg"></div>
                      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-blue-400/50 rounded-tr-lg"></div>
                      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-blue-400/50 rounded-bl-lg"></div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-blue-400/50 rounded-br-lg"></div>
                      
                      <h3 className="text-xl font-bold text-blue-200 mb-1 relative z-10">{exp.title}</h3>
                      <p className="text-blue-300 text-sm mb-3 relative z-10">{exp.period}</p>
                      <p className="text-blue-100 relative z-10">{exp.description}</p>
                    </div>
                  </div>
                  
                  <div className="relative flex items-center justify-center z-10">
                    <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full border-4 border-blue-900 shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-300"></div>
                  </div>
                  
                  <div className="hidden md:block md:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Achievements & Connect Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {/* Achievements */}
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-blue-400/30 shadow-xl transition-all duration-500 hover:shadow-blue-400/20 hover:border-blue-400/40 relative overflow-hidden group">
            {/* Animated border effect */}
            <div className="absolute inset-0 border-2 border-blue-400/0 rounded-2xl group-hover:border-blue-400/30 transition-all duration-700"></div>
            
            {/* Glowing corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-400/50 rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-400/50 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-400/50 rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-400/50 rounded-br-lg"></div>
            
            <h2 className="text-2xl font-bold mb-6 flex items-center relative z-10">
              <span className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-2 rounded-lg mr-3 shadow-md shadow-blue-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </span>
              ACHIEVEMENTS
            </h2>
            
            <ul className="space-y-4 relative z-10">
              {achievements.map((achievement, index) => (
                <li key={index} className="flex items-start transform transition-all duration-300 hover:translate-x-2 group/achievement">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center mr-3 mt-0.5 group-hover/achievement:bg-blue-500/50 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-blue-100">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Connect */}
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-blue-400/30 shadow-xl transition-all duration-500 hover:shadow-blue-400/20 hover:border-blue-400/40 relative overflow-hidden group">
            {/* Animated border effect */}
            <div className="absolute inset-0 border-2 border-blue-400/0 rounded-2xl group-hover:border-blue-400/30 transition-all duration-700"></div>
            
            {/* Glowing corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-400/50 rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-400/50 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-400/50 rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-400/50 rounded-br-lg"></div>
            
            <h2 className="text-2xl font-bold mb-6 flex items-center relative z-10">
              <span className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-2 rounded-lg mr-3 shadow-md shadow-blue-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </span>
              CONNECT WITH EKLAVYA
            </h2>
            
            <div className="space-y-4 relative z-10">
              <div className="flex flex-wrap gap-4">
                <a href="https://github.com/eklavyabytesquad" target="_blank" rel="noopener noreferrer" 
                   className="flex items-center backdrop-blur-lg bg-white/5 rounded-xl p-4 border border-blue-400/20 transition-all duration-300 hover:bg-white/10 hover:scale-105 hover:border-blue-400/40 shadow-md group/social">
                  <div className="w-10 h-10 rounded-full bg-blue-800/50 flex items-center justify-center mr-3 group-hover/social:bg-blue-700/60 transition-colors duration-300">
                    <svg className="w-6 h-6 text-blue-300" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <span className="text-blue-200">GitHub</span>
                </a>
                
                <a href="https://www.linkedin.com/in/theeklavyasingh/" target="_blank" rel="noopener noreferrer" 
                   className="flex items-center backdrop-blur-lg bg-white/5 rounded-xl p-4 border border-blue-400/20 transition-all duration-300 hover:bg-white/10 hover:scale-105 hover:border-blue-400/40 shadow-md group/social">
                  <div className="w-10 h-10 rounded-full bg-blue-800/50 flex items-center justify-center mr-3 group-hover/social:bg-blue-700/60 transition-colors duration-300">
                    <svg className="w-6 h-6 text-blue-300" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </div>
                  <span className="text-blue-200">LinkedIn</span>
                </a>
                
                <a href="https://www.instagram.com/theeklavyasingh/" target="_blank" rel="noopener noreferrer" 
                   className="flex items-center backdrop-blur-lg bg-white/5 rounded-xl p-4 border border-blue-400/20 transition-all duration-300 hover:bg-white/10 hover:scale-105 hover:border-blue-400/40 shadow-md group/social">
                  <div className="w-10 h-10 rounded-full bg-blue-800/50 flex items-center justify-center mr-3 group-hover/social:bg-blue-700/60 transition-colors duration-300">
                    <svg className="w-6 h-6 text-blue-300" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <span className="text-blue-200">Instagram</span>
                </a>
              </div>
              
              {/* Contact Form */}
              <div className="mt-6 backdrop-blur-lg bg-white/5 rounded-xl p-6 border border-blue-400/20 transition-all duration-300 hover:border-blue-400/40">
                <h3 className="text-lg font-semibold text-blue-200 mb-4">Send a Message</h3>
                
                <div className="space-y-4">
                  <div className="relative group/input">
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      className="w-full bg-blue-900/30 text-blue-100 rounded-lg px-4 py-3 border border-blue-500/30 focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all duration-300"
                    />
                    <div className="absolute inset-0 border border-blue-400/0 rounded-lg group-hover/input:border-blue-400/30 group-focus-within/input:border-blue-400/50 transition-all duration-300 pointer-events-none"></div>
                  </div>
                  
                  <div className="relative group/input">
                    <input 
                      type="email" 
                      placeholder="Your Email" 
                      className="w-full bg-blue-900/30 text-blue-100 rounded-lg px-4 py-3 border border-blue-500/30 focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all duration-300"
                    />
                    <div className="absolute inset-0 border border-blue-400/0 rounded-lg group-hover/input:border-blue-400/30 group-focus-within/input:border-blue-400/50 transition-all duration-300 pointer-events-none"></div>
                  </div>
                  
                  <div className="relative group/input">
                    <textarea 
                      placeholder="Your Message" 
                      rows="3"
                      className="w-full bg-blue-900/30 text-blue-100 rounded-lg px-4 py-3 border border-blue-500/30 focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all duration-300"
                    ></textarea>
                    <div className="absolute inset-0 border border-blue-400/0 rounded-lg group-hover/input:border-blue-400/30 group-focus-within/input:border-blue-400/50 transition-all duration-300 pointer-events-none"></div>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-md shadow-blue-500/20 hover:shadow-blue-500/40 transform hover:translate-y-[-2px] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Send Message
                  </button>
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
        
        @keyframes blink {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
        
        /* Custom scrollbar for code sections */
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        
        .scrollbar-thumb-blue-400::-webkit-scrollbar-thumb {
          background: #60a5fa;
          border-radius: 4px;
        }
        
        .scrollbar-track-blue-900\/30::-webkit-scrollbar-track {
          background: rgba(30, 58, 138, 0.3);
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default MentorSection;