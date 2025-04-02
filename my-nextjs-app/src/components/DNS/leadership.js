'use client';
import { useEffect } from 'react';
import Image from 'next/image';

export default function Leadership() {
  const leadership = [
    {
      category: "University Leadership",
      members: [
        {
          name: "Dr. C.V. Jayakumar",
          position: "Dean Faculty of Engineering and Technology",
          image: "https://pknfpxunrdaidfveqfha.supabase.co/storage/v1/object/public/images/DNS/deansir.jpg",
        },
        {
          name: "Dr. Prasanna Devi",
          position: "Head of Department CSE",
          image: "https://pknfpxunrdaidfveqfha.supabase.co/storage/v1/object/public/images/DNS/prassanamam.jpg",
        }
      ]
    },
    {
      category: "Faculty Coordination",
      members: [
        {
          name: "Dr. Sridevi Sridhar",
          position: "Faculty Coordinator",
          image: "https://pknfpxunrdaidfveqfha.supabase.co/storage/v1/object/public/images/DNS/sridevimam.jpg",
        }
      ]
    },
    {
      category: "Founding Team",
      members: [
        {
          name: "Eklavya Singh",
          position: "President",
          image: "https://pknfpxunrdaidfveqfha.supabase.co/storage/v1/object/public/images/DNS/eklavya.jpg",
        },
        {
          name: "Aniket Kumar",
          position: "Vice President",
          image: "https://pknfpxunrdaidfveqfha.supabase.co/storage/v1/object/public/images/DNS/aniket.jpg",
        },
        {
          name: "Netrand Davey",
          position: "Founding Member",
          image: "https://pknfpxunrdaidfveqfha.supabase.co/storage/v1/object/public/images/DNS/netrang.jpg",
        }
      ]
    }
  ];

  useEffect(() => {
    // Cursor blinking animation for code editor effect
    const interval = setInterval(() => {
      const cursors = document.querySelectorAll('.code-cursor');
      cursors.forEach(cursor => {
        cursor.classList.toggle('opacity-0');
      });
    }, 530);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="leadership" className="py-24 relative bg-gradient-to-br from-blue-900 to-blue-950 text-white">
      {/* Tech background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="absolute bg-blue-400" 
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 0.5}px`,
                height: `${Math.random() * 100 + 50}px`,
                opacity: Math.random() * 0.3 + 0.1
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="flex items-center space-x-2 bg-blue-800 rounded-t-md px-4 py-2">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="font-mono text-sm text-blue-200">leadership.jsx</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-white">
              Our Leadership <span className="code-cursor inline-block w-2 h-6 bg-white ml-1 align-middle"></span>
            </span>
          </h2>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            We are grateful for the continuous support and guidance from our university leadership and faculty.
          </p>
        </div>

        <div className="space-y-16">
          {leadership.map((category, categoryIndex) => (
            <div key={categoryIndex} className="relative group">
              {/* Animated border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-white opacity-75 rounded-xl blur-sm group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-x"></div>
              
              <div className="relative bg-blue-800 rounded-xl p-6 md:p-8 border border-blue-600">
                {/* VSCode-like header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                    <h3 className="text-2xl font-mono font-semibold text-white">{category.category}</h3>
                  </div>
                  <div className="flex space-x-3 text-xs text-blue-300 font-mono">
                    <span>class</span>
                    <span>extends</span>
                    <span>Component</span>
                  </div>
                </div>
                
                {/* Line numbers like code editor */}
                <div className="absolute left-4 top-24 bottom-4 w-6 flex flex-col items-end pr-2 text-blue-400 font-mono text-xs opacity-60">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="mb-6">{i+1}</div>
                  ))}
                </div>
                
                <div className="flex flex-col items-center justify-center">
                  {category.members.map((member, memberIndex) => (
                    <div 
                      key={memberIndex} 
                      className="bg-blue-900/90 backdrop-blur-md p-6 rounded-xl border border-blue-500/50 shadow-lg hover:shadow-blue-300/20 transition-all text-center max-w-sm w-full mb-8 last:mb-0 hover:translate-y-[-5px] duration-300"
                    >
                      <div className="mb-4 mx-auto w-40 h-40 rounded-full overflow-hidden border-4 border-white/30 shadow-inner relative">
                        <Image 
                          src={member.image} 
                          alt={member.name} 
                          fill
                          style={{objectFit: 'cover'}}
                          sizes="(max-width: 768px) 100vw, 160px"
                        />
                      </div>
                      <h4 className="text-xl font-semibold mb-1 text-white">{member.name}</h4>
                      <p className="text-blue-200 font-medium">{member.position}</p>
                      {/* Code-like decorations */}
                      <div className="mt-4 font-mono text-xs text-blue-300 opacity-70">
                        <div>&#123; role: &quot;{member.position}&quot; &#125;</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center p-6 bg-blue-800/50 backdrop-blur-sm rounded-xl border border-blue-500/30">
          <h3 className="text-2xl font-mono font-semibold mb-4 text-white flex items-center justify-center">
            <span className="text-blue-300 mr-2">{"//"}</span>
            Acknowledgements
          </h3>
          <p className="text-lg text-blue-100">🙏 A heartfelt thank you to Dr. Prasanna Devi (HOD, CSE), Dr. C.V. Jayakumar (Dean, FET), and SRM Management for their unwavering support.</p>  
          <p className="text-lg text-blue-100 mt-2">🌟 Special gratitude to Dr. Sridevi Sridhar for her invaluable guidance.</p>
        </div>
      </div>

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
      `}</style>
    </section>
  );
}