// components/RewardsSection.jsx
import React, { useState, useEffect, useRef } from 'react';

const RewardsSection = () => {
  const [activeReward, setActiveReward] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  // Animation for scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const position = sectionRef.current.getBoundingClientRect();
        if (position.top < window.innerHeight * 0.75 && !isVisible) {
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

  const rewards = [
    {
      title: "Certificate of Completion",
      description: "Receive an official Super30 certificate recognizing your achievement and technical skills.",
      icon: "🏆",
      techIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      codeSnippet: `
// Get your certificate
const certificate = await super30.complete();
certificate.verify(); // Blockchain verified
`
    },
    {
      title: "Hackathon Prizes",
      description: "Win exciting prizes in our final hackathon including cash rewards and tech gadgets.",
      icon: "💰",
      techIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      codeSnippet: `
// Claim your prize
const prize = hackathon.winners.find(
  team => team.score > 90
);
console.log(\\\`Won \${prize.amount} INR!\\\`);
`
    },
    {
      title: "Perfect Attendance Bonus",
      description: "Special recognition and additional perks for students with 100% attendance.",
      icon: "🎯",
      techIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      codeSnippet: `
// Check attendance status
const student = super30.getStudent(id);
if (student.attendance === 100) {
  student.addBonus('PERFECT_ATTENDANCE');
}
`
    },
    {
      title: "Project Showcase",
      description: "Opportunity to showcase your final projects to industry professionals and potential employers.",
      icon: "🌟",
      techIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      codeSnippet: `
// Submit your project
await project.deploy('showcase');
const feedback = await industry.review(
  project.url
);
`
    },
    {
      title: "LinkedIn Recommendation",
      description: "Personal recommendation on LinkedIn from our lead instructor and mentor.",
      icon: "👑",
      techIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      codeSnippet: `
// Receive recommendation
const mentor = super30.getMentor();
await linkedin.connect(mentor);
const recommendation = 
  await mentor.recommend(student);
`
    },
    {
      title: "Internship Opportunities",
      description: "Top performers get direct internship referrals to partner companies.",
      icon: "🚀",
      techIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      codeSnippet: `
// Apply for internship
const companies = super30.partners.filter(
  company => company.hasOpenings
);
const interviews = await student.applyTo(
  companies
);
`
    }
  ];

  return (
    <section id="rewards" ref={sectionRef} className="py-16 relative min-h-screen overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-full h-full bg-gradient-to-br from-blue-950/40 via-transparent to-blue-900/40"></div>
        
        {/* Animated grid lines */}
        <div className="absolute w-full h-full border-b border-blue-500/10 animate-pulse"></div>
        <div className="absolute w-full h-full border-r border-blue-500/10 animate-pulse"></div>
        
        {/* Animated particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-blue-400/20 animate-float"
            style={{
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 5}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
        
        {/* Glowing orbs */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-600/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-blue-400/5 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-white">
              Rewards &amp; Recognition
            </h2>
            
            <p className="text-xl text-center text-blue-100 mb-12 max-w-3xl mx-auto">
              At Super30, we believe in recognizing and rewarding excellence. Heres what you can earn through your dedication and hard work.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.map((reward, index) => (
              <div
                key={index}
                className={`backdrop-blur-xl bg-white/10 rounded-2xl border border-blue-400/30 p-6 shadow-xl relative overflow-hidden group transition-all duration-500 hover:shadow-blue-400/20 hover:border-blue-400/40 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                style={{ transitionDelay: `${150 * (index % 3)}ms` }}
                onMouseEnter={() => setActiveReward(index)}
                onMouseLeave={() => setActiveReward(null)}
              >
                {/* Animated border effect */}
                <div className="absolute inset-0 border-2 border-blue-400/0 rounded-2xl group-hover:border-blue-400/30 transition-all duration-700"></div>
                
                {/* Glowing corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-400/50 rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-400/50 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-400/50 rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-400/50 rounded-br-lg"></div>
                
                {/* Glowing accent */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-400/10 rounded-full filter blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <div className="flex items-start space-x-4 relative z-10">
                  <div className="flex-shrink-0 w-16 h-16 bg-blue-800/50 rounded-2xl flex items-center justify-center border border-blue-400/30 shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300">
                    {reward.techIcon}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-blue-200 mb-2">{reward.title}</h3>
                    <p className="text-blue-100/80">{reward.description}</p>
                  </div>
                </div>
                
                {/* Animated code snippet */}
                <div className={`mt-4 bg-black/50 border border-blue-500/20 rounded-lg p-3 overflow-hidden transition-all duration-300 transform ${activeReward === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <pre className="text-xs text-blue-300 font-mono">
                    <code>{reward.codeSnippet}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
          
          <div className={`mt-16 backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-blue-400/30 text-center shadow-xl relative overflow-hidden group transition-all duration-500 hover:shadow-blue-400/20 hover:border-blue-400/40 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '450ms' }}>
            {/* Animated border effect */}
            <div className="absolute inset-0 border-2 border-blue-400/0 rounded-2xl group-hover:border-blue-400/30 transition-all duration-700"></div>
            
            {/* Glowing corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-400/50 rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-400/50 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-400/50 rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-400/50 rounded-br-lg"></div>
            
            {/* Terminal header */}
            <div className="absolute top-0 left-0 right-0 bg-blue-900/50 py-2 px-4 flex items-center border-b border-blue-500/30">
              <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
              <div className="text-xs text-blue-300 ml-2 font-mono">hackathon_final.sh</div>
            </div>
            
            <div className="pt-8 relative z-10">
              <h3 className="text-2xl font-semibold text-blue-200 mb-6">
                Final Hackathon Event
              </h3>
              
              <p className="text-blue-100/90 max-w-3xl mx-auto mb-8">
                The program culminates in an exciting 24-hour hackathon where you will form teams and build 
                innovative solutions to real-world problems. Industry experts will judge your projects, 
                with substantial prizes for the winning teams!
              </p>
              
              {/* Terminal-like code block */}
              <div className="max-w-2xl mx-auto mb-8 bg-black/60 rounded-lg p-4 border border-blue-500/30 text-left">
                <pre className="text-sm font-mono text-blue-200 whitespace-pre-wrap">
                  <code>
                    <span className="text-blue-400">$</span> <span className="text-green-400">./</span><span className="text-white">start_hackathon</span> <span className="text-yellow-400">--teams=5 --duration=24h --prizes=₹2000</span><br/>
                    <span className="text-blue-300">{'>'} Initializing hackathon environment...</span><br/>
                    <span className="text-blue-300">{'>'} Loading challenges from industry partners...</span><br/>
                    <span className="text-blue-300">{'>'} Preparing evaluation criteria...</span><br/>
                    <span className="text-green-400">{'>'} Hackathon ready! May the best team win!</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>
          
          {/* Dialog Box - Tech Element */}
          <div className={`mt-12 backdrop-blur-xl bg-white/10 rounded-2xl border border-blue-400/30 shadow-xl relative overflow-hidden group transition-all duration-500 hover:shadow-blue-400/20 hover:border-blue-400/40 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
            {/* Animated border effect */}
            <div className="absolute inset-0 border-2 border-blue-400/0 rounded-2xl group-hover:border-blue-400/30 transition-all duration-700"></div>
            
            {/* Glowing corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-400/50 rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-400/50 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-400/50 rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-400/50 rounded-br-lg"></div>
            
            {/* Dialog Title Bar */}
            <div className="bg-gradient-to-r from-blue-800 to-blue-700 p-3 border-b border-blue-500/50 flex items-center justify-between">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-blue-100 font-medium">Super30 Achievement System</span>
              </div>
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
            </div>
            
            <div className="p-6 md:p-8 relative z-10">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-24 h-24 rounded-full bg-blue-800/50 flex items-center justify-center border border-blue-400/30 p-4 shadow-lg shadow-blue-500/10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl text-blue-200 font-semibold mb-2">Achievement System</h3>
                  <p className="text-blue-100 mb-4">
                    Unlock special achievements as you progress through the bootcamp. Complete challenges, solve complex problems, and help your peers to earn badges that showcase your skills and dedication.
                  </p>
                  
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-4">
                    {["Coder", "Helper", "Problem Solver", "Team Player", "Night Owl", "Quick Learner"].map((badge, i) => (
                      <div key={i} className="flex flex-col items-center group/badge">
                        <div className="w-12 h-12 bg-blue-900/70 rounded-full flex items-center justify-center mb-2 border border-blue-500/30 group-hover/badge:border-blue-400/70 transition-all duration-300 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/20 opacity-0 group-hover/badge:opacity-100 transition-opacity duration-300"></div>
                          <span className="text-xl">{["🧠", "🤝", "⚡", "👥", "🌙", "🚀"][i]}</span>
                        </div>
                        <span className="text-xs text-blue-300 text-center">{badge}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-900/30 rounded-lg border border-blue-500/20">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-blue-200 font-medium">Pro Tip</span>
                </div>
                <p className="text-blue-100/80 text-sm">
                When your code does not work, just pretend it s a feature—nothing says I m a professional like confidently explaining why your bug is actually an intentional innovation in user experience.
                </p>
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

export default RewardsSection;