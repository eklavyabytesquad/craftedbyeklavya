'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = ['Home', 'DNS', 'Projects', 'Skills', 'Contact'];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const currentPage = navItems.find(
    (item) => (item === 'Home' ? '/' : `/${item.toLowerCase()}`) === pathname
  ) || 'Home';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* ===== Logo — always visible, vertically aligned with capsule nav ===== */}
      <Link
        href="/"
        onClick={closeMenu}
        data-cursor-text="Home"
        className="fixed top-0 left-0 z-[60] h-[60px] md:h-[68px] flex items-center pl-5 md:pl-8 group transition-opacity duration-300 hover:opacity-70"
      >
        <div className="flex flex-col items-start leading-none">
          {/* "The" — 007-style narrow condensed look */}
          <span
            className="text-[7px] md:text-[8px] font-bold tracking-[0.35em] uppercase text-gray-400 ml-[1px]"
            style={{
              fontFamily: '"Arial Narrow", "Helvetica Neue", Arial, sans-serif',
              fontStretch: 'condensed',
            }}
          >
            The
          </span>
          {/* Name — bold serif */}
          <span
            className="text-[14px] md:text-[16px] font-bold tracking-[0.06em] uppercase text-gray-900 -mt-[1px]"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            Eklavya Singh
          </span>
        </div>
      </Link>

      {/* ===== Desktop Capsule Nav (hides on scroll) ===== */}
      <nav
        data-cursor-text="Navbar"
        className={`hidden md:block fixed top-0 left-1/2 -translate-x-1/2 z-50 h-[68px] flex items-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled
            ? 'opacity-0 -translate-y-8 pointer-events-none'
            : 'opacity-100 translate-y-0 pointer-events-auto'
        }`}
      >
        <div className="mt-4 bg-white/60 backdrop-blur-md rounded-full border border-gray-200/50 px-6 py-2.5">
          <div className="flex items-center gap-1">
            {navItems.map((item, i) => (
              <Link
                key={i}
                href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="relative px-4 py-1.5 rounded-full text-[13px] font-medium text-gray-700 hover:text-black transition-all duration-300 hover:bg-gray-100/80"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* ===== Minimal Tab (shows on scroll) ===== */}
      <div
        className={`hidden md:flex fixed top-0 left-0 right-0 z-50 flex-col items-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        {/* Thicker top border */}
        <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* Centered tab */}
        <div
          className="bg-white/80 backdrop-blur-xl border border-gray-200/60 border-t-0 rounded-b-2xl px-10 py-3 shadow-sm shadow-gray-200/40"
        >
          <span
            className="text-[11px] tracking-[0.3em] uppercase text-gray-500 font-medium"
            style={{ fontFamily: 'var(--font-geist-sans), system-ui, sans-serif' }}
          >
            {currentPage}
          </span>
        </div>
      </div>

      {/* ===== Mobile Hamburger ===== */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-0 right-0 z-[60] h-[60px] w-14 flex items-center justify-center focus:outline-none"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <div className="flex flex-col justify-center items-center w-6 h-6">
          <span
            className={`block h-[2px] w-5 rounded-full transition-all duration-300 ease-in-out ${
              isOpen ? 'rotate-45 translate-y-[7px] bg-white' : 'bg-gray-900'
            }`}
          />
          <span
            className={`block h-[2px] w-5 rounded-full my-[5px] transition-all duration-300 ease-in-out ${
              isOpen ? 'opacity-0 bg-white' : 'bg-gray-900'
            }`}
          />
          <span
            className={`block h-[2px] w-5 rounded-full transition-all duration-300 ease-in-out ${
              isOpen ? '-rotate-45 -translate-y-[7px] bg-white' : 'bg-gray-900'
            }`}
          />
        </div>
      </button>

      {/* ===== Mobile Full-screen Menu ===== */}
      <div
        className={`md:hidden fixed inset-0 z-[55] bg-black transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-2">
          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              onClick={closeMenu}
              className={`text-3xl font-light text-white/80 hover:text-white tracking-wider py-3 transition-all duration-500 ${
                isOpen
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: isOpen ? `${i * 80}ms` : '0ms' }}
            >
              {item}
            </Link>
          ))}

          <p
            className={`absolute bottom-8 text-white/20 text-[10px] tracking-[0.4em] uppercase font-mono transition-all duration-500 ${
              isOpen ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: isOpen ? '400ms' : '0ms' }}
          >
            Eklavya Singh
          </p>
        </div>
      </div>
    </>
  );
}