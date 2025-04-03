// components/CTASection.jsx
import React from 'react';

const CTASection = () => {
  return (
    <section id="cta" className="py-16 bg-gradient-to-b from-purple-900/20 to-purple-900/40">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-purple-800/80 to-purple-900/80 backdrop-blur-md rounded-xl border border-purple-500/30 p-8 md:p-12 shadow-xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-amber-300">
              Join Today!
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Limited to only 30 students. Secure your spot for just ₹399 (regular price ₹1999) 
              and transform your tech career in just 4 weeks!
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8 mb-10">
              <div className="flex flex-col items-center">
                <span className="text-5xl font-bold text-amber-300 mb-2">30</span>
                <span className="text-gray-300">Limited Seats</span>
              </div>
              
              <div className="w-px h-16 bg-purple-500/30 hidden md:block"></div>
              
              <div className="flex flex-col items-center">
                <span className="text-5xl font-bold text-amber-300 mb-2">4</span>
                <span className="text-gray-300">Week Program</span>
              </div>
              
              <div className="w-px h-16 bg-purple-500/30 hidden md:block"></div>
              
              <div className="flex flex-col items-center">
                <div className="flex items-center">
                  <span className="text-xl font-medium text-gray-400 line-through mr-2">₹1999</span>
                  <span className="text-5xl font-bold text-amber-300">₹399</span>
                </div>
                <span className="text-gray-300">Special Offer</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white font-medium px-8 py-4 rounded-lg text-lg transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg shadow-purple-600/20">
                Register Now
              </button>
              
              <button className="bg-transparent border border-purple-400 text-purple-300 hover:text-white hover:border-white font-medium px-8 py-4 rounded-lg text-lg transition duration-300">
                Learn More
              </button>
            </div>
            
            <p className="mt-8 text-gray-400 text-sm">
              Have questions? Contact us at super30@example.com
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;