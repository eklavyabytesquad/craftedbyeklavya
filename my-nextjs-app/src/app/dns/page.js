'use client';

import { useEffect, useRef } from 'react';
import Navbar from '../../components/mainpage/navbar';
import CustomCursor from '../../components/mainpage/customcursor';
import gsap from 'gsap';

const networks = [
  {
    name: 'GitHub',
    handle: '@eklavyabytesquad',
    url: 'https://github.com/eklavyabytesquad',
    description: 'Open source contributions & projects',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    handle: 'Eklavya Singh',
    url: 'https://linkedin.com/in/eklavyasingh',
    description: 'Professional network & experience',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Twitter / X',
    handle: '@eklavyasingh',
    url: 'https://x.com/eklavyasingh',
    description: 'Thoughts, threads & tech takes',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Discord',
    handle: 'eklavya.dev',
    url: '#',
    description: 'Community & conversations',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
  {
    name: 'Email',
    handle: 'hello@eklavya.dev',
    url: 'mailto:hello@eklavya.dev',
    description: 'Direct collaboration & inquiries',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
];

export default function DNSPage() {
  const cardsRef = useRef([]);
  const headerRef = useRef(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.12, delay: 0.2 }
      );
    }

    if (cardsRef.current.length) {
      gsap.fromTo(
        cardsRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.08, delay: 0.5 }
      );
    }
  }, []);

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden relative">
        <Navbar />

        <main className="container mx-auto px-4 pt-32 pb-20">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div ref={headerRef} className="mb-16 text-center">
              <p className="text-[11px] tracking-[0.4em] uppercase text-gray-400 font-mono mb-4" style={{ opacity: 0 }}>
                Developer Network Space
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-5" style={{ opacity: 0 }}>
                DNS
              </h1>
              <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto leading-relaxed" style={{ opacity: 0 }}>
                Connect with me across the digital space. Find me where code, ideas, and conversations happen.
              </p>
            </div>

            {/* Network Cards */}
            <div className="space-y-3">
              {networks.map((net, i) => (
                <a
                  key={net.name}
                  href={net.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  ref={(el) => (cardsRef.current[i] = el)}
                  className="group flex items-center justify-between px-6 py-5 rounded-2xl border border-gray-100 hover:border-gray-200 bg-white hover:bg-gray-50/80 transition-all duration-300"
                  style={{ opacity: 0 }}
                >
                  <div className="flex items-center gap-5">
                    <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {net.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm font-semibold text-gray-900">{net.name}</span>
                        <span className="text-xs text-gray-400 font-mono">{net.handle}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{net.description}</p>
                    </div>
                  </div>
                  <svg
                    className="w-4 h-4 text-gray-300 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                  </svg>
                </a>
              ))}
            </div>

            {/* Footer accent */}
            <div className="mt-16 text-center">
              <span className="text-gray-200 text-xs tracking-[0.3em] uppercase font-mono">◆</span>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
