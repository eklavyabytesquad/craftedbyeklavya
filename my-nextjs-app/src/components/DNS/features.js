'use client';

import { useState, useEffect } from 'react';
import { CodeBracketIcon, UserGroupIcon, TrophyIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';

export default function Features() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <CodeBracketIcon className="h-10 w-10 text-blue-400" />,
      customIcon: (
        <svg className="h-10 w-10 text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 3V7C14 7.55228 14.4477 8 15 8H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H14L19 8V19C19 20.1046 18.1046 21 17 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 17H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 13H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Industry Mentorship",
      description: "Connect with experienced professionals who provide guidance and insights from real-world industry experience.",
      codeText: "<Mentorship value={expertise} />"
    },
    {
      icon: <TrophyIcon className="h-10 w-10 text-blue-400" />,
      customIcon: (
        <svg className="h-10 w-10 text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 15C8.13401 15 5 11.866 5 8V7.2C5 7.08954 5.08954 7 5.2 7H18.8C18.9105 7 19 7.08954 19 7.2V8C19 11.866 15.866 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 14.2V17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 14.2V17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 21H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 7H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19 7H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Hackathon Support",
      description: "Get comprehensive support for participating in and winning hackathons, from ideation to implementation.",
      codeText: "function win(){ return 'success'; }"
    },
    {
      icon: <DevicePhoneMobileIcon className="h-10 w-10 text-blue-400" />,
      customIcon: (
        <svg className="h-10 w-10 text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 21H16C17.1046 21 18 20.1046 18 19V5C18 3.89543 17.1046 3 16 3H8C6.89543 3 6 3.89543 6 5V19C6 20.1046 6.89543 21 8 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11.95 18H12.05" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Advanced Project Guidance",
      description: "Receive expert guidance on complex projects that push the boundaries of your technical abilities.",
      codeText: "import { Solution } from 'expertise';"
    },
    {
      icon: <UserGroupIcon className="h-10 w-10 text-blue-400" />,
      customIcon: (
        <svg className="h-10 w-10 text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 20H7C5.89543 20 5 19.1046 5 18V6C5 4.89543 5.89543 4 7 4H17C18.1046 4 19 4.89543 19 6V18C19 19.1046 18.1046 20 17 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 9H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 13H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 17H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Professional Connections",
      description: "Build a network with industry professionals and like-minded peers for future collaborations and opportunities.",
      codeText: "network.connect(peers, industry);"
    }
  ];

  return (
    <section id="features" className="py-20 relative bg-gradient-to-br from-slate-900 to-blue-950 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-500/5 rounded-full blur-3xl"></div>
        
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-px bg-blue-500/10"></div>
          ))}
        </div>
        <div className="absolute inset-0 flex justify-between">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="w-px bg-blue-500/10"></div>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
              What We Offer
            </span>
          </h2>
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="h-px w-12 bg-blue-400/50"></div>
            <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-mono">
            services.map(feature {'=>'} feature.render())
            </div>
            <div className="h-px w-12 bg-blue-400/50"></div>
          </div>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            DNS stands apart as the premier coding club, focusing on completed projects over theory,
            with selective membership to ensure quality collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`relative bg-slate-900/80 backdrop-blur-lg p-6 rounded-xl transition-all duration-700 
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}
                group overflow-hidden`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Animated border */}
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-px rounded-xl bg-slate-900"></div>
              </div>

              {/* Glowing dot in corner */}
              <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-blue-400 opacity-50 group-hover:opacity-100 transition-opacity duration-300 group-hover:animate-pulse"></div>

              <div className="relative">
                <div className="flex items-start justify-between">
                  <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {index % 2 === 0 ? feature.icon : feature.customIcon}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-2 text-blue-300 group-hover:text-blue-200 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-slate-300 group-hover:text-white transition-colors duration-300">
                  {feature.description}
                </p>
                
                <div className="mt-4 p-2 bg-slate-800/80 rounded border border-blue-900/50 font-mono text-xs text-blue-300 opacity-70 group-hover:opacity-100 transition-all duration-300 overflow-x-auto">
                  <code>{feature.codeText}</code>
                </div>
                
                {/* Terminal-like typing animation */}
                <div className="mt-4 h-1 w-full bg-blue-500/20 overflow-hidden rounded">
                  <div className="h-full bg-blue-400 w-0 group-hover:w-full transition-all duration-1500 ease-in-out"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}