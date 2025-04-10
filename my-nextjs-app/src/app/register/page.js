'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../utils/authcontext';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [role, setRole] = useState('student');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const { signUp, user, loading, updateProfile } = useAuth();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (user && !loading) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    // Basic validation
    if (!email || !password || !confirmPassword) {
      setErrorMsg('Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters');
      return;
    }

    try {
      // First, sign up with Supabase Auth
      const { data, error } = await signUp(email, password);
      
      if (error) {
        setErrorMsg(error);
        return;
      }

      // If signUp is successful but needs email confirmation
      if (data?.user && data?.session === null) {
        setSuccessMsg('Registration successful! Please check your email to confirm your account before logging in.');
        return;
      }

      // If registration and sign-in were successful (got session)
      if (data?.user && data?.session) {
        // Update the profile with additional information
        const profileUpdates = {
          name: name || '',
          class: className || '',
          role: role
        };

        await updateProfile(profileUpdates);

        // Redirect to dashboard (this will happen automatically via the useEffect above)
        setSuccessMsg('Registration successful! Redirecting to dashboard...');
      }
    } catch (err) {
      setErrorMsg('An unexpected error occurred. Please try again.');
      console.error('Registration error:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-blue-950">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 relative">
            <div className="absolute inset-0 rounded-full border-4 border-blue-400/20 animate-pulse"></div>
            <div className="absolute inset-3 rounded-full border-2 border-blue-300/40 animate-spin"></div>
            <div className="absolute inset-0 rounded-full border border-t-blue-400 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          </div>
          <p className="mt-4 text-blue-100 text-lg font-medium" style={{ fontFamily: 'Orbitron, sans-serif' }}>INITIALIZING</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Google Fonts Import */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&family=Rajdhani:wght@300;400;500;600;700&display=swap');
      `}</style>

      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-950 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md relative">
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>
          
          {/* Main card with glassmorphism effect */}
          <div className="relative backdrop-blur-md bg-blue-900/30 rounded-lg border border-blue-400/30 shadow-lg shadow-blue-500/10 p-8 overflow-hidden">
            {/* Circuit line decorations */}
            <div className="absolute left-0 top-16 h-px w-full bg-gradient-to-r from-transparent via-blue-400/40 to-transparent"></div>
            <div className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"></div>
            <div className="absolute left-0 bottom-16 h-px w-full bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>

            {/* Vertical circuit lines */}
            <div className="absolute top-0 left-12 w-px h-full bg-gradient-to-b from-transparent via-blue-400/20 to-transparent"></div>
            <div className="absolute top-0 right-12 w-px h-full bg-gradient-to-b from-transparent via-blue-400/20 to-transparent"></div>
            
            {/* Title with futuristic style */}
            <div className="text-center mb-8 relative">
              <h1 
                className="text-2xl font-bold text-blue-100 tracking-wider mb-1"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                SYSTEM REGISTRATION
              </h1>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-indigo-400 mx-auto rounded-full"></div>
              <p 
                className="text-blue-200 mt-3"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
              >
                Create new user credentials to access Super30
              </p>
            </div>

            {/* Error message with cyberpunk style */}
            {errorMsg && (
              <div className="bg-red-900/30 backdrop-blur-sm border border-red-500/50 text-red-200 px-4 py-3 rounded-md mb-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p style={{ fontFamily: 'Rajdhani, sans-serif' }}>{errorMsg}</p>
                </div>
              </div>
            )}

            {/* Success message with cyberpunk style */}
            {successMsg && (
              <div className="bg-green-900/30 backdrop-blur-sm border border-green-500/50 text-green-200 px-4 py-3 rounded-md mb-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p style={{ fontFamily: 'Rajdhani, sans-serif' }}>{successMsg}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Field with cyberpunk style */}
              <div className="relative">
                <label htmlFor="email" className="block text-sm font-medium text-blue-100 mb-2 tracking-wide" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  <span className="flex items-center">
                    <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                    EMAIL ADDRESS <span className="text-blue-400">*</span>
                  </span>
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-blue-950/60 text-white border border-blue-500/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 placeholder-blue-300/50"
                    placeholder="you@example.com"
                    required
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  />
                  <div className="absolute top-0 left-0 w-0.5 h-full bg-blue-400 scale-y-0 group-focus-within:scale-y-100 transition-transform"></div>
                </div>
              </div>

              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-blue-100 mb-2 tracking-wide" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  <span className="flex items-center">
                    <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                    PASSWORD <span className="text-blue-400">*</span>
                  </span>
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-blue-950/60 text-white border border-blue-500/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 placeholder-blue-300/50"
                    placeholder="••••••••"
                    required
                    minLength={6}
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  />
                </div>
                <p className="mt-1 text-xs text-blue-300/70" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  MINIMUM 6 CHARACTERS REQUIRED
                </p>
              </div>

              <div className="relative">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-blue-100 mb-2 tracking-wide" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  <span className="flex items-center">
                    <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                    CONFIRM PASSWORD <span className="text-blue-400">*</span>
                  </span>
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-blue-950/60 text-white border border-blue-500/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 placeholder-blue-300/50"
                    placeholder="••••••••"
                    required
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  />
                </div>
              </div>

              <div className="relative">
                <label htmlFor="name" className="block text-sm font-medium text-blue-100 mb-2 tracking-wide" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  <span className="flex items-center">
                    <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                    FULL NAME
                  </span>
                </label>
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-blue-950/60 text-white border border-blue-500/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 placeholder-blue-300/50"
                    placeholder="John Doe"
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  />
                </div>
              </div>

              <div className="relative">
                <label htmlFor="className" className="block text-sm font-medium text-blue-100 mb-2 tracking-wide" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  <span className="flex items-center">
                    <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                    CLASS
                  </span>
                </label>
                <div className="relative">
                  <input
                    id="className"
                    type="text"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-blue-950/60 text-white border border-blue-500/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 placeholder-blue-300/50"
                    placeholder="e.g. 10th Grade, Computer Science"
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  />
                </div>
              </div>

              <div className="relative">
                <label htmlFor="role" className="block text-sm font-medium text-blue-100 mb-2 tracking-wide" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  <span className="flex items-center">
                    <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                    ROLE
                  </span>
                </label>
                <div className="relative">
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-2.5 bg-blue-950/60 text-white border border-blue-500/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 appearance-none"
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  >
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                  </select>
                  {/* Custom dropdown arrow */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-blue-300">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Submit button with cyberpunk style */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 relative overflow-hidden text-white py-3 px-4 rounded-md hover:from-blue-500 hover:to-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all duration-200 disabled:opacity-50 group"
                >
                  {/* Animated tech details on hover */}
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="h-px w-full absolute top-1/3 left-0 bg-gradient-to-r from-transparent via-blue-200/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    <span className="h-px w-full absolute bottom-1/3 left-0 bg-gradient-to-r from-transparent via-blue-200/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 delay-75"></span>
                  </span>
                  
                  {/* Button text */}
                  <span className="relative z-10 flex items-center justify-center font-medium tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        INITIALIZING
                      </>
                    ) : (
                      'CREATE USER ACCOUNT'
                    )}
                  </span>
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <div className="text-blue-200" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                <span>ALREADY REGISTERED?</span>{' '}
                <Link 
                  href="/login" 
                  className="text-blue-300 hover:text-blue-100 font-medium relative group"
                >
                  <span>SIGN IN</span>
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-6 text-blue-300/70" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            <p>SYSTEM VER 2.5.0 // © {new Date().getFullYear()} EKLAVYA SINGH</p>
          </div>
        </div>
      </div>
    </>
  );
}