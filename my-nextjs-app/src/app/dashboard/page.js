'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../utils/authcontext';
import Link from 'next/link';

export default function Dashboard() {
  const { user, profile, loading, signOut } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  // Handle client-side only functionality
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Protect the page - redirect if not authenticated
  useEffect(() => {
    if (isClient && !loading && !user) {
      router.push('/login');
    }
  }, [isClient, user, loading, router]);

  // Show loading state
  if (loading || !isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center">
        <div className="text-white text-xl font-bold animate-pulse flex flex-col items-center">
          <div className="relative w-20 h-20 mb-4">
            <div className="absolute inset-0 border-4 border-t-transparent border-blue-300 rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-4 border-t-transparent border-blue-500 rounded-full animate-spin-slow"></div>
          </div>
          <div className="flex items-center">
            <span className="typing-text">&gt; Initializing System...</span>
          </div>
        </div>
      </div>
    );
  }

  // If not authenticated and on client, return nothing (will redirect)
  if (!user) {
    return null;
  }

  // Function to handle profile update navigation
  const handleUpdateProfile = () => {
    router.push('/update');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Code Lines Background */}
        <div className="absolute inset-0 code-lines opacity-10"></div>
        
        {/* Floating particles */}
        <div className="particles">
          {[...Array(20)].map((_, index) => (
            <div 
              key={index} 
              className="particle bg-blue-400"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                width: `${Math.random() * 5 + 2}px`,
                height: `${Math.random() * 5 + 2}px`,
              }}
            ></div>
          ))}
        </div>
        
        {/* Glowing orbs */}
        <div className="absolute top-0 left-0 w-full h-96 bg-blue-400 rounded-full filter blur-3xl opacity-10 transform -translate-x-1/3 -translate-y-1/2 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-full h-96 bg-blue-200 rounded-full filter blur-3xl opacity-10 transform translate-x-1/3 translate-y-1/2 animate-pulse-slow"></div>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-blue-900/80 backdrop-blur-md border-b border-blue-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center mr-2 animate-pulse-slow">
                  <span className="text-white font-bold">S30</span>
                </div>
                <span className="text-white font-bold text-lg">Super<span className="text-blue-300">30</span> Dashboard</span>
              </div>
            </div>
            <div className="flex items-center">
              <span className="hidden md:block text-blue-300 mr-4">{user?.email}</span>
              <button 
                onClick={signOut}
                className="bg-blue-800 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 border border-blue-700 shadow-inner flex items-center group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-xl overflow-hidden border border-blue-100 transition-all duration-300 hover:shadow-blue-500/20 animate-fade-in">
          
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <h1 className="text-xl font-bold flex items-center mb-3 md:mb-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                System Access // <span className="ml-2 terminal-text">{profile?.name || 'User'}</span>
              </h1>
              <button 
                onClick={handleUpdateProfile}
                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg shadow-md relative overflow-hidden group"
              >
                <span className="absolute inset-0 w-full h-full transition-all duration-1000 ease-out transform translate-x-full bg-gradient-to-r from-blue-400 to-blue-500 group-hover:translate-x-0 group-hover:scale-102"></span>
                <span className="absolute inset-0 w-full h-full mix-blend-screen transition-all duration-1000 ease-out transform translate-x-full bg-gradient-to-r from-blue-300/30 to-blue-300/30 group-hover:translate-x-0"></span>
                <span className="relative flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Modify Profile
                </span>
              </button>
            </div>
          </div>

          {/* Profile Section */}
          <div className="p-6 border-b border-blue-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <div className="text-sm font-semibold text-blue-800 mb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Address
                </div>
                <div className="font-medium text-black border-b border-blue-100 pb-1 transition-all duration-300 group-hover:border-blue-500 flex items-center">
                  <span className="mr-2 terminal-text">&gt;</span>
                  {user?.email || 'Not available'}
                </div>
              </div>
              <div className="group">
                <div className="text-sm font-semibold text-blue-800 mb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Full Name
                </div>
                <div className="font-medium text-black border-b border-blue-100 pb-1 transition-all duration-300 group-hover:border-blue-500 flex items-center">
                  <span className="mr-2 terminal-text">&gt;</span>
                  {profile?.name || 'Not configured'}
                </div>
              </div>
              <div className="group">
                <div className="text-sm font-semibold text-blue-800 mb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Class ID
                </div>
                <div className="font-medium text-black border-b border-blue-100 pb-1 transition-all duration-300 group-hover:border-blue-500 flex items-center">
                  <span className="mr-2 terminal-text">&gt;</span>
                  {profile?.class || 'Not configured'}
                </div>
              </div>
              <div className="group">
                <div className="text-sm font-semibold text-blue-800 mb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Year
                </div>
                <div className="font-medium text-black border-b border-blue-100 pb-1 transition-all duration-300 group-hover:border-blue-500 flex items-center">
                  <span className="mr-2 terminal-text">&gt;</span>
                  {profile?.year || 'Not configured'}
                </div>
              </div>
              <div className="group">
                <div className="text-sm font-semibold text-blue-800 mb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  System Role
                </div>
                <div className="font-medium text-black border-b border-blue-100 pb-1 transition-all duration-300 group-hover:border-blue-500">
                  <span className={`inline-flex items-center ${profile?.role === 'admin' ? 'text-purple-700' : 'text-blue-700'}`}>
                    <span className="mr-2 terminal-text">&gt;</span>
                    {profile?.role === 'admin' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    )}
                    <span className="capitalize font-medium">{profile?.role || 'Not configured'}</span>
                  </span>
                </div>
              </div>
              <div className="group">
                <div className="text-sm font-semibold text-blue-800 mb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Last System Update
                </div>
                <div className="font-medium text-black border-b border-blue-100 pb-1 transition-all duration-300 group-hover:border-blue-500 flex items-center">
                  <span className="mr-2 terminal-text">&gt;</span>
                  {profile?.updated_at ? new Date(profile.updated_at).toLocaleDateString() : 'No record found'}
                </div>
              </div>
              <div className="md:col-span-2">
                <div className="text-sm font-semibold text-blue-800 mb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                  Technical Proficiencies
                </div>
                <div className="font-medium">
                  {profile?.skills && profile.skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {profile.skills.map((skill, index) => (
                        <span 
                          key={index} 
                          className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 text-xs px-3 py-1.5 rounded-full border border-blue-200 shadow-sm transition-all duration-300 hover:shadow-md hover:from-blue-200 hover:to-blue-300 hover:transform hover:scale-105 cursor-default flex items-center"
                        >
                          <span className="mr-1 opacity-70">&lt;</span>
                          {skill}
                          <span className="ml-1 opacity-70">/&gt;</span>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-black relative overflow-hidden">
                      <div className="absolute inset-0 code-lines opacity-5"></div>
                      <span>No skills registered. </span>
                      <Link href="/update" className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-all duration-200 inline-flex items-center group">
                        Configure your technical stack 
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className="p-6">
            <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Quick Commands
            </h2>
            
            <div className="flex flex-wrap gap-3">
              <Link 
                href="/update" 
                className="inline-flex items-center px-5 py-2.5 bg-white hover:bg-blue-50 border-2 border-blue-500 text-sm font-medium rounded-lg text-blue-700 focus:outline-none transition-all duration-300 hover:shadow-lg hover:shadow-blue-200/50 hover:scale-105 active:scale-95 group relative overflow-hidden"
              >
                <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-blue-100 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-500 ease-out"></span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span className="relative z-10">Update Profile</span>
              </Link>
              
              <Link 
                href="/assignments" 
                className="inline-flex items-center px-5 py-2.5 bg-white hover:bg-blue-50 border-2 border-blue-500 text-sm font-medium rounded-lg text-blue-700 focus:outline-none transition-all duration-300 hover:shadow-lg hover:shadow-blue-200/50 hover:scale-105 active:scale-95 group relative overflow-hidden"
              >
                <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-blue-100 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-500 ease-out"></span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="relative z-10">Submit Assignment</span>
              </Link>
              
              <Link 
                href="/attendance" 
                className="inline-flex items-center px-5 py-2.5 bg-white hover:bg-blue-50 border-2 border-blue-500 text-sm font-medium rounded-lg text-blue-700 focus:outline-none transition-all duration-300 hover:shadow-lg hover:shadow-blue-200/50 hover:scale-105 active:scale-95 group relative overflow-hidden"
              >
                <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-blue-100 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-500 ease-out"></span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="relative z-10">Attendance Records</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* CSS for animations and effects */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        @keyframes float-particle {
          0% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-10px) translateX(10px); }
          50% { transform: translateY(0) translateX(20px); }
          75% { transform: translateY(10px) translateX(10px); }
          100% { transform: translateY(0) translateX(0); }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        
        .code-lines {
          background-image: 
            linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        .terminal-text::after {
          content: '|';
          animation: blink 1s step-end infinite;
        }
        
        .typing-text {
          overflow: hidden;
          white-space: nowrap;
          border-right: 2px solid #fff;
          animation: typing 3.5s steps(40, end), blink 1s step-end infinite;
        }
        
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        
        .particle {
          position: absolute;
          border-radius: 50%;
          opacity: 0.5;
          animation: float-particle 15s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}