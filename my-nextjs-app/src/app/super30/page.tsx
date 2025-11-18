"use client";

// pages/super30.jsx
import React from 'react';
import Navbar from '../../components/super30/navbar';
import SimpleBackground from '../../components/mainpage/simplebackground';
import HeaderSection from '../../components/super30/heading';
import AboutSection from '../../components/super30/aboutsection';
import CurriculumSection from '../../components/super30/topics';
import FeaturesSection from '../../components/super30/features';
import RewardsSection from '../../components/super30/reward';
import MentorSection from '../../components/super30/mentor';
import CTASection from '../../components/super30/calltoaction';
import Footer from '../../components/super30/footer';

export default function Super30Page() {
  return (
    <main className="relative min-h-screen bg-purple-950 text-white overflow-x-hidden">
      <SimpleBackground />
      <Navbar />
      
      <div className="relative z-10">
        {/* Enhanced Header Section */}
        <HeaderSection />
        
        {/* Main Content Sections */}
        <AboutSection />
        <CurriculumSection />
        <FeaturesSection />
        <RewardsSection />
        <MentorSection />
        <CTASection />
        
        <Footer />
      </div>
      
      {/* Additional global styling for animations */}
      <style jsx global>{`
        /* Smooth scrolling for the entire page */
        html {
          scroll-behavior: smooth;
        }
        
        /* Define custom animations for components */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        /* Optional: subtle parallax effect for sections when scrolling */
        section {
          transition: transform 0.3s ease-out;
        }
      `}</style>
    </main>
  );
}