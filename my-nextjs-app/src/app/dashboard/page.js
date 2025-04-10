'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../utils/authcontext';
import Link from 'next/link';
import Navbar from '../../components/dashboard/navbar';

export default function Dashboard() {
  const { user, profile, loading, signOut } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  // Handle client-side only functionality
  useEffect(() => {
    setIsClient(true);
  }, []);

  // For debugging purposes, log the user and profile data
  useEffect(() => {
    if (user) {
      console.log("User data:", user);
    }
    if (profile) {
      console.log("Profile data:", profile);
    }
  }, [user, profile]);

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
        <div className="text-white text-xl font-bold animate-pulse flex items-center">
          <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Initializing System...
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
      {/* Futuristic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-0 left-0 w-full h-96 bg-blue-400 rounded-full filter blur-3xl opacity-20 transform -translate-x-1/3 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-full h-96 bg-blue-200 rounded-full filter blur-3xl opacity-20 transform translate-x-1/3 translate-y-1/2"></div>
        </div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Main Content - with padding-top to accommodate fixed navbar */}
      <main className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="bg-white/90 backdrop-blur-xl shadow-xl rounded-xl overflow-hidden border border-blue-100 transition-all duration-300">
          {/* Profile Section */}
          <div className="p-6 border-b border-blue-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-blue-800 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                User Command Center
              </h2>
              <button 
                onClick={handleUpdateProfile}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-blue-500/50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Modify Profile
              </button>
            </div>
            
            {user ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <div className="text-sm font-semibold text-blue-800 mb-1">Email Address</div>
                  <div className="font-medium text-black border-b border-blue-100 pb-1 transition-all duration-300 group-hover:border-blue-500">{user?.email || 'Not available'}</div>
                </div>
                <div className="group">
                  <div className="text-sm font-semibold text-blue-800 mb-1">Full Name</div>
                  <div className="font-medium text-black border-b border-blue-100 pb-1 transition-all duration-300 group-hover:border-blue-500">{profile?.name || 'Not configured'}</div>
                </div>
                <div className="group">
                  <div className="text-sm font-semibold text-blue-800 mb-1">Class ID</div>
                  <div className="font-medium text-black border-b border-blue-100 pb-1 transition-all duration-300 group-hover:border-blue-500">{profile?.class || 'Not configured'}</div>
                </div>
                <div className="group">
                  <div className="text-sm font-semibold text-blue-800 mb-1">Year</div>
                  <div className="font-medium text-black border-b border-blue-100 pb-1 transition-all duration-300 group-hover:border-blue-500">{profile?.year || 'Not configured'}</div>
                </div>
                <div className="group">
                  <div className="text-sm font-semibold text-blue-800 mb-1">System Role</div>
                  <div className="font-medium text-black border-b border-blue-100 pb-1 transition-all duration-300 group-hover:border-blue-500">
                    <span className={`inline-flex items-center ${profile?.role === 'admin' ? 'text-purple-700' : 'text-blue-700'}`}>
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
                  <div className="text-sm font-semibold text-blue-800 mb-1">Last System Update</div>
                  <div className="font-medium text-black border-b border-blue-100 pb-1 transition-all duration-300 group-hover:border-blue-500">
                    {profile?.updated_at ? new Date(profile.updated_at).toLocaleDateString() : 'No record found'}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="text-sm font-semibold text-blue-800 mb-1">Technical Proficiencies</div>
                  <div className="font-medium">
                    {profile?.skills && profile.skills.length > 0 ? (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {profile.skills.map((skill, index) => (
                          <span 
                            key={index} 
                            className="bg-blue-100 text-blue-800 text-xs px-3 py-1.5 rounded-full border border-blue-200 shadow-sm transition-all duration-300 hover:bg-blue-200 hover:shadow-md"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-black">
                        <span>No skills registered. </span>
                        <Link href="/update" className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-all duration-200">
                          Configure your technical stack →
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-black bg-blue-50 p-4 rounded-lg border border-blue-100">User information unavailable. Please refresh or contact support.</div>
            )}
          </div>

          {/* Admin Only Section */}
          {profile?.role === 'admin' && (
            <div className="p-6 border-b border-blue-100">
              <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Admin Control Panel
              </h2>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 backdrop-blur-sm p-6 rounded-lg border border-blue-100 shadow-inner">
                <p className="text-black mb-4 font-medium">
                  Welcome, Administrator. You have elevated access to system functions and user management capabilities.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-2 text-sm rounded-lg shadow-lg transition-all duration-300 hover:shadow-blue-500/50 hover:scale-105 active:scale-95 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    User Management
                  </button>
                  <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-2 text-sm rounded-lg shadow-lg transition-all duration-300 hover:shadow-blue-500/50 hover:scale-105 active:scale-95 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Analytics Dashboard
                  </button>
                  <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-2 text-sm rounded-lg shadow-lg transition-all duration-300 hover:shadow-blue-500/50 hover:scale-105 active:scale-95 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    System Configuration
                  </button>
                </div>
              </div>
            </div>
          )}

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
                className="inline-flex items-center px-5 py-2.5 border-2 border-blue-600 text-sm font-medium rounded-lg text-blue-700 bg-white hover:bg-blue-50 focus:outline-none transition-all duration-300 hover:shadow-lg hover:shadow-blue-200/50 hover:scale-105 active:scale-95 group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Update Profile
              </Link>
              
              <Link 
                href="/assignments" 
                className="inline-flex items-center px-5 py-2.5 border-2 border-blue-600 text-sm font-medium rounded-lg text-blue-700 bg-white hover:bg-blue-50 focus:outline-none transition-all duration-300 hover:shadow-lg hover:shadow-blue-200/50 hover:scale-105 active:scale-95 group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Submit Assignment
              </Link>
              
              <Link 
                href="/attendance" 
                className="inline-flex items-center px-5 py-2.5 border-2 border-blue-600 text-sm font-medium rounded-lg text-blue-700 bg-white hover:bg-blue-50 focus:outline-none transition-all duration-300 hover:shadow-lg hover:shadow-blue-200/50 hover:scale-105 active:scale-95 group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Attendance Records
              </Link>
            </div>
          </div>
        </div>
      </main>



      {/* Add a subtle tech pattern overlay */}
      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(99, 179, 237, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 179, 237, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
}