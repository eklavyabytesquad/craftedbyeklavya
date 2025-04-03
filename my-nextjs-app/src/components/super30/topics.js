import React, { useEffect, useRef, useState } from 'react';

const CurriculumSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);
  
  // Curriculum categories with detailed tools
  const categories = [
    {
      title: "Basic Front-End",
      icon: (
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        </div>
      ),
      tools: ["HTML", "CSS", "JavaScript", "Bootstrap", "FontAwesome"],
      description: "Master the fundamentals of web development with core technologies that form the backbone of modern websites."
    },
    {
      title: "Intermediate Front-End",
      icon: (
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            <circle cx="12" cy="12" r="5"/>
          </svg>
        </div>
      ),
      tools: ["React", "Tailwind CSS", "Lucide React"],
      description: "Level up your skills with component-based architecture and utility-first CSS frameworks for efficient development."
    },
    {
      title: "Advanced Front-End",
      icon: (
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
            <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
          </svg>
        </div>
      ),
      tools: ["Next.js", "Three.js", "Advanced Tailwind"],
      description: "Push the boundaries with server-side rendering, 3D graphics, and optimization techniques for professional applications."
    },
    {
      title: "API Development",
      icon: (
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
            <path d="M12 2.5c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13v5.25l4.5 2.67-.75 1.23L11 14V7z"/>
          </svg>
        </div>
      ),
      tools: ["RESTful API Basics", "Python Flask", "ML Model API Integration"],
      description: "Learn to create and consume APIs, enabling your applications to communicate with various services and ML models."
    },
    {
      title: "Database Management",
      icon: (
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
            <path d="M12 2C6.48 2 2 4.48 2 7v10c0 2.52 4.48 5 10 5s10-2.48 10-5V7c0-2.52-4.48-5-10-5zm0 13c-3.86 0-7-1.79-7-4v-2c0 2.21 3.14 4 7 4s7-1.79 7-4v2c0 2.21-3.14 4-7 4zm0-7c-3.86 0-7-1.79-7-4s3.14-4 7-4 7 1.79 7 4-3.14 4-7 4z"/>
          </svg>
        </div>
      ),
      tools: ["SQL Fundamentals", "MySQL", "PostgreSQL", "Supabase", "Hasura"],
      description: "Store and retrieve data efficiently with both traditional and modern database solutions."
    },
    {
      title: "Authentication Systems",
      icon: (
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
          </svg>
        </div>
      ),
      tools: ["Auth Fundamentals", "JWT", "Firebase Auth", "Clerk Auth", "Supabase Auth"],
      description: "Implement secure user authentication with industry-standard protocols and third-party services."
    },
    {
      title: "Deployment Strategies",
      icon: (
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
          </svg>
        </div>
      ),
      tools: ["Vercel", "Netlify", "Render", "AWS EC2", "AWS Amplify", "S3 Bucket"],
      description: "Take your applications live with various deployment options from simple to advanced cloud infrastructure."
    },
    {
      title: "Prompt Engineering",
      icon: (
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </div>
      ),
      tools: ["Claude Pro", "ChatGPT", "GitHub Copilot"],
      description: "Harness the power of AI to accelerate your development process and solve complex problems efficiently."
    },
    {
      title: "Version Control",
      icon: (
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
            <path d="M15 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-1 4h-4c-1.1 0-2 .9-2 2v9h2v-5h4v5h2v-9c0-1.1-.9-2-2-2zm-2 4h-2v-2h2v2z"/>
          </svg>
        </div>
      ),
      tools: ["Git Basics", "GitHub Workflows", "Advanced Git Commands", "Collaborative Development"],
      description: "Master version control from basic commands to advanced team collaboration techniques."
    }
  ];

  useEffect(() => {
    // Handle responsive behavior
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initialize
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    // Initialize refs array
    cardsRef.current = cardsRef.current.slice(0, categories.length);
    
    // Scroll-based animation
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const { top: sectionTop, height: sectionHeight } = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Start animations when section is in view
      if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
        cardsRef.current.forEach((card, index) => {
          if (!card) return;
          
          const cardRect = card.getBoundingClientRect();
          const cardTop = cardRect.top;
          const triggerPoint = windowHeight * 0.8; // 80% down the screen
          
          if (isMobile) {
            // Mobile fade-in animation (simpler, more reliable)
            if (cardTop < triggerPoint) {
              card.style.transform = 'translateY(0)';
              card.style.opacity = '1';
            } else {
              card.style.transform = 'translateY(20px)';
              card.style.opacity = '0';
            }
          } else {
            // Desktop behavior - fade in from bottom
            if (cardTop < triggerPoint) {
              card.style.transform = 'translateY(0)';
              card.style.opacity = '1';
            } else {
              card.style.transform = 'translateY(30px)';
              card.style.opacity = '0';
            }
          }
        });
      }
    };
    
    // Initial positioning with delay to ensure DOM is ready
    setTimeout(handleScroll, 100);
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);

  return (
    <section 
      ref={sectionRef}
      id="curriculum" 
      className="py-16 relative bg-gray-900"
    >
      {/* Network-like background pattern */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0">
          <svg width="100%" height="100%" className="opacity-20">
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2563EB" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            {/* Random network connections */}
            {Array.from({ length: 20 }).map((_, i) => (
              <line 
                key={i}
                x1={`${Math.random() * 100}%`}
                y1={`${Math.random() * 100}%`}
                x2={`${Math.random() * 100}%`}
                y2={`${Math.random() * 100}%`}
                stroke="#3B82F6"
                strokeWidth="0.5"
                opacity="0.3"
              />
            ))}
            {/* Network nodes */}
            {Array.from({ length: 30 }).map((_, i) => (
              <circle 
                key={i}
                cx={`${Math.random() * 100}%`}
                cy={`${Math.random() * 100}%`}
                r={Math.random() * 3 + 1}
                fill={Math.random() > 0.7 ? "#EC4899" : "#3B82F6"}
                opacity="0.4"
              />
            ))}
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="mb-16 text-center relative">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative inline-block">
              <span className="relative">
                Super<span className="text-blue-400">30</span> Curriculum
                <span className="absolute -top-1 -right-1 w-4 h-4 border-t border-r border-blue-400"></span>
                <span className="absolute -bottom-1 -left-1 w-4 h-4 border-b border-l border-blue-400"></span>
              </span>
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-transparent mx-auto mb-6"></div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto font-light">
              Master the complete web development stack in just 4 weeks with our intensive, 
              hands-on approach to modern technologies.
            </p>
          </div>

          {/* Cards container - grid on desktop, single column on mobile */}
          <div className={`relative ${isMobile ? 'flex flex-col space-y-6' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'}`}>
            {categories.map((category, index) => (
              <div
                key={index}
                ref={el => cardsRef.current[index] = el}
                className={`
                  bg-blue-900/30 backdrop-blur-lg 
                  rounded-lg border border-blue-500/30
                  shadow-lg shadow-blue-500/10
                  p-6 transition-all duration-500
                  transform opacity-0 translate-y-8
                  hover:shadow-lg hover:shadow-blue-500/20 hover:border-blue-400/50
                `}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {/* Card Header with Icon */}
                <div className="flex items-center mb-4">
                  {category.icon}
                  <h3 className="text-xl font-bold text-white ml-4">{category.title}</h3>
                  
                  {/* Circuit Pattern Top Right */}
                  <div className="absolute top-3 right-3 opacity-70">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2V6M12 18V22M2 12H6M18 12H22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" 
                      stroke="#3B82F6" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                
                {/* Blue Line Separator */}
                <div className="h-0.5 w-16 bg-blue-400 mb-4"></div>
                
                {/* Description */}
                <p className="text-blue-100 mb-5">{category.description}</p>
                
                {/* Technologies List */}
                <div>
                  <h4 className="text-sm uppercase text-blue-300 font-semibold tracking-wider mb-2">
                    Technologies Covered:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {category.tools.map((tool, i) => (
                      <span 
                        key={i} 
                        className="inline-block px-2 py-1 bg-blue-800/50 border border-blue-400/20 text-blue-200 text-xs rounded hover:bg-blue-700/50 transition-colors"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Glow Effect at Bottom */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-blue-400/50 blur"></div>
              </div>
            ))}
          </div>

          {/* Free Bootcamp Promo */}
          <div className="mt-20 bg-blue-900/40 backdrop-blur-sm rounded-lg p-8 border border-blue-500/30 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-blue-400/30"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-blue-400/30"></div>
            
            <div className="relative z-10 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 relative inline-block">
                2-Day Introduction Bootcamp
                <span className="absolute -top-6 right-0 bg-blue-500 text-blue-900 text-xs font-bold px-2 py-1 rounded animate-pulse">
                  FREE
                </span>
              </h3>
              
              <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-transparent mx-auto my-4"></div>
              
              <p className="text-blue-100 max-w-3xl mx-auto mb-6">
                Before diving into the main program, join our exclusive 2-day introduction bootcamp.
                Meet your instructors and peers, set up your development environment,
                and get familiar with the Super30 learning approach.
              </p>
              
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-blue-400/30">
                <span className="font-bold">Register Now</span>
              </button>
              
              <div className="mt-4 inline-block bg-blue-800/50 px-3 py-1 rounded-md border border-blue-400/20">
                <span className="text-yellow-300 mr-1">⚠️</span>
                <span className="text-blue-100 text-sm">Only 30 spots available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurriculumSection;