'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../utils/authcontext';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { signIn, user, loading } = useAuth();
  const router = useRouter();
  const [codingJoke, setCodingJoke] = useState('');

  const codingJokes = [
    "Why do programmers prefer dark mode? Because light attracts bugs!",
    "How many programmers does it take to change a light bulb? None, that's a hardware problem!",
    "Why do Java developers wear glasses? Because they don't C#!",
    "Algorithm: A word used by programmers when they don't want to explain what they did.",
    "!false; It's funny because it's true!"
  ];

  // Redirect if already logged in
  useEffect(() => {
    if (user && !loading) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  // Set random coding joke
  useEffect(() => {
    const randomJoke = codingJokes[Math.floor(Math.random() * codingJokes.length)];
    setCodingJoke(randomJoke);
  }, [codingJokes]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please fill in all fields');
      return;
    }

    try {
      const { data, error } = await signIn(email, password);
      
      if (error) {
        setErrorMsg(error);
        return;
      }

      // Successful login - the AuthContext will handle the session
      // and the useEffect above will redirect to dashboard
    } catch (err) {
      setErrorMsg('An unexpected error occurred. Please try again.');
      console.error('Login error:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-800">
        <div className="text-white text-xl">
          <div className="animate-bounce flex flex-col items-center">
            <div className="text-2xl mb-4 font-bold">Loading...</div>
            <div className="w-16 h-16 border-4 border-t-blue-400 border-white rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-800 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute text-white opacity-10 text-xs font-mono"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s linear infinite`,
              transform: `scale(${0.5 + Math.random() * 1.5})`,
            }}
          >
            {`{ code: ${Math.floor(Math.random() * 1000)} }`}
          </div>
        ))}
        
        {[...Array(10)].map((_, i) => (
          <div 
            key={`line-${i}`}
            className="absolute bg-white opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: 0,
              width: '1px',
              height: '100%',
              animation: `pulse ${3 + Math.random() * 5}s ease-in-out infinite`,
            }}
          />
        ))}
        
        {[...Array(10)].map((_, i) => (
          <div 
            key={`bracket-${i}`}
            className="absolute text-white opacity-20 text-4xl font-mono"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `rotate ${10 + Math.random() * 20}s linear infinite`,
            }}
          >
            {Math.random() > 0.5 ? '{ }' : '[ ]'}
          </div>
        ))}
      </div>

      {/* Logo and main content */}
      <div className="w-full max-w-md z-10 px-4 sm:px-0">
        <div className="flex justify-center mb-8">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-wider relative inline-block">
              <span className="relative z-10">SUPER</span>
              <span className="text-blue-300 relative z-10">30</span>
              <div className="absolute inset-0 bg-blue-500 opacity-30 transform -skew-x-12 z-0"></div>
            </div>
            <div className="text-white text-sm font-mono animate-pulse">
              {/* Elite Engineering Bootcamp */}
              <span>Elite Engineering Bootcamp</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8">
          <div className="text-center mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-blue-800">Access Terminal</h1>
            <p className="text-blue-500 mt-2 font-mono text-sm">&lt;student_authentication required&gt;</p>
          </div>

          {errorMsg && (
            <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-md mb-6 font-mono text-sm">
              <span className="font-bold">Error:</span> {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-blue-700 mb-2 font-mono">
                $ username@super30
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-blue-100 border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-blue-900 placeholder-blue-700 placeholder-opacity-50 font-mono"
                  placeholder="you@example.com"
                  required
                />
                <div className="absolute right-3 top-2.5 text-blue-700 text-opacity-70 text-sm font-mono animate-pulse">_</div>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-blue-700 mb-2 font-mono">
                $ password --secure
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-blue-100 border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-blue-900 placeholder-blue-700 placeholder-opacity-50 font-mono"
                  placeholder="••••••••"
                  required
                />
                <div className="absolute right-3 top-2.5 text-blue-700 text-opacity-70 text-sm font-mono animate-pulse">_</div>
              </div>
              <div className="flex justify-end mt-1">
                <Link
                  href="/forgot-password"
                  className="text-xs text-blue-600 hover:text-blue-800 font-mono"
                >
                  ./reset-credentials.sh
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 disabled:opacity-50 relative overflow-hidden group font-bold"
            >
              <span className="relative z-10 font-mono">
                {loading ? 'Authenticating...' : 'AUTHENTICATE'}
              </span>
              <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="h-full w-1 bg-blue-300 animate-pulse absolute left-0"></div>
                <div className="h-full w-1 bg-blue-300 animate-pulse absolute right-0"></div>
              </div>
            </button>
          </form>

          <div className="mt-8 pt-4 border-t-2 border-blue-200">
            <div className="text-blue-700 font-mono text-xs">
              <div className="typing-container overflow-hidden whitespace-nowrap">
                <span className="typing-text inline-block">{codingJoke}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8 text-sm text-white font-mono">
          <p>&lt;/&gt; SUPER30 {new Date().getFullYear()} | System v2.5.7</p>
        </div>
      </div>

      {/* Add global styles for animations */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.05; }
          50% { opacity: 0.2; }
          100% { transform: translateY(-1000px) rotate(720deg); opacity: 0.05; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.05; height: 100%; }
          50% { opacity: 0.2; height: 50%; }
        }
        
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .typing-container {
          max-width: 100%;
        }
        
        .typing-text {
          animation: typing 8s steps(40, end) infinite;
          overflow: hidden;
          border-right: 2px solid rgba(29, 78, 216, 0.5);
          white-space: nowrap;
          letter-spacing: 0.1em;
          margin: 0 auto;
        }
        
        @keyframes typing {
          0%, 90%, 100% { width: 0 }
          30%, 60% { width: 100% }
        }

        @media (max-width: 640px) {
          .typing-text {
            font-size: 0.7rem;
          }
        }
      `}</style>
    </div>
  );
}