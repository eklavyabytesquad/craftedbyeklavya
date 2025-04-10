'use client';

import { useEffect } from 'react';
import { useAuth } from '../utils/authcontext';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const { signOut, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Call the signOut function from AuthContext as soon as the component mounts
    const performLogout = async () => {
      try {
        await signOut();
        
        // Add a small delay before redirecting to ensure the logout completes
        setTimeout(() => {
          // Redirect to login page
          router.push('/login');
        }, 1500);
      } catch (error) {
        console.error('Error during logout:', error);
        // If there's an error, still try to redirect to login
        router.push('/login');
      }
    };

    performLogout();
  }, [signOut, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-blue-950">
      <div className="max-w-md w-full mx-auto p-8 rounded-lg relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl"></div>
        
        {/* Border glow effect */}
        <div className="absolute inset-0 border border-blue-400/20 rounded-lg"></div>
        <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm rounded-lg"></div>
        
        {/* Content container */}
        <div className="relative z-10 text-center">
          {/* Circuit line decorations */}
          <div className="absolute left-0 top-1/4 h-px w-full bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
          <div className="absolute left-0 bottom-1/4 h-px w-full bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"></div>
          
          {/* Animated loading indicator */}
          <div className="mb-6 relative mx-auto w-16 h-16 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-blue-300/30 animate-ping"></div>
            <div className="absolute inset-2 rounded-full border border-blue-400/50 animate-pulse"></div>
            <div className="w-10 h-10 flex items-center justify-center">
              <svg 
                className="w-6 h-6 text-blue-300 animate-spin" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                ></circle>
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          </div>
          
          {/* Text message */}
          <h2 
            className="text-xl text-blue-100 font-medium mb-3"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            {loading ? "Logging out..." : "Logged out successfully"}
          </h2>
          
          <p 
            className="text-blue-200/70 text-sm"
            style={{ fontFamily: 'Rajdhani, sans-serif' }}
          >
            Redirecting to login page...
          </p>
        </div>
      </div>
    </div>
  );
}