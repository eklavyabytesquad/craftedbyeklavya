'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

// Import your images
import image2 from './assets/image2.jpg';
import image3 from './assets/image3.jpg';
import image4 from './assets/image4.jpg';
import image5 from './assets/image5.jpg';
import image6 from './assets/image6.jpg';
import image7 from './assets/image7.jpg';
import image8 from './assets/image8.jpg';
import image9 from './assets/image9.jpg';

const HorizontalScrollGallery = () => {
  const galleryRef = useRef(null);
  const outerContainerRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollComplete, setScrollComplete] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  
  // Gallery images with subtitles
  const galleryImages = [
    { src: image2, alt: 'Gallery Image 2', subtitle: 'Subtitle for Image 2' },
    { src: image3, alt: 'Gallery Image 3', subtitle: 'Subtitle for Image 3' },
    { src: image4, alt: 'Gallery Image 4', subtitle: 'Subtitle for Image 4' },
    { src: image5, alt: 'Gallery Image 5', subtitle: 'Subtitle for Image 5' },
    { src: image6, alt: 'Gallery Image 6', subtitle: 'Subtitle for Image 6' },
    { src: image7, alt: 'Gallery Image 7', subtitle: 'Subtitle for Image 7' },
    { src: image8, alt: 'Gallery Image 8', subtitle: 'Subtitle for Image 8' },
    { src: image9, alt: 'Gallery Image 9', subtitle: 'Subtitle for Image 9' },
  ];

  useEffect(() => {
    // We need a fixed height for the scrollable container to simulate scrolling pause
    // Adjust this value to control how much "scrolling budget" the gallery takes up
    const SCROLL_CONTAINER_HEIGHT = 3000; 
    
    // Get references to DOM elements
    const gallery = galleryRef.current;
    const outerContainer = outerContainerRef.current;
    
    if (!gallery || !outerContainer) return;
    
    // Set the fixed height of our scroll container
    outerContainer.style.height = `${SCROLL_CONTAINER_HEIGHT}px`;
    
    let scrollTimeout;
    let ticking = false;
    let hasCompletedGallery = false;
    
    // This handles the scrolling logic
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      
      window.requestAnimationFrame(() => {
        // Get the current scroll position
        const scrollY = window.scrollY;
        
        // Get the position of our gallery container
        const rect = outerContainer.getBoundingClientRect();
        const containerTop = rect.top;
        const containerBottom = rect.bottom;
        
        // Calculate the point at which the gallery should start becoming visible
        const visibilityThreshold = 40; // Adjust this value - space from top before gallery appears
        
        // Check different states of visibility
        const isEntering = containerTop <= visibilityThreshold && containerTop > -window.innerHeight +100;
        const isFullyInView = containerTop <= -200 && containerBottom >= visibilityThreshold;
        const isExiting = containerBottom <= window.innerHeight && containerBottom > 0 && currentImageIndex >= galleryImages.length - 1;
        
        // Update the inView state - only show when it should be visible
        const newIsInView = (isFullyInView || isEntering) && !hasCompletedGallery;
        
        if (newIsInView !== isInView) {
          setIsInView(newIsInView);
        }
        
        // Calculate the gallery's scroll position
        let scrollProgress = 0;
        
        if (isEntering) {
          // If entering, gradually increase scroll progress based on how far we've scrolled
          scrollProgress = Math.min(0.99, (visibilityThreshold - containerTop) / window.innerHeight);
        } else if (isFullyInView) {
          // When fully in view, use the container's scroll percentage
          const galleryScrollHeight = SCROLL_CONTAINER_HEIGHT - window.innerHeight;
          const scrolledAmount = Math.min(
            scrollY - (outerContainer.offsetTop + visibilityThreshold - window.innerHeight),
            galleryScrollHeight
          );
          scrollProgress = Math.min(0.99, scrolledAmount / galleryScrollHeight);
        } else if (isExiting) {
          // When we've reached the last image and are exiting, keep it at maximum
          scrollProgress = 1;
          
          // Mark as completed to prevent showing gallery again when scrolling back up
          if (!hasCompletedGallery && currentImageIndex >= galleryImages.length - 1) {
            hasCompletedGallery = true;
          }
        }
        
        // Cap the progress between 0 and 1
        scrollProgress = Math.max(0, Math.min(1, scrollProgress));
        
        // Apply the scroll progress to the gallery
        const maxScroll = gallery.scrollWidth - gallery.clientWidth;
        gallery.scrollLeft = maxScroll * scrollProgress;
        
        // Update current image index
        const newIndex = Math.min(
          galleryImages.length - 1,
          Math.floor(scrollProgress * galleryImages.length)
        );
        
        if (newIndex !== currentImageIndex) {
          setCurrentImageIndex(newIndex);
        }
        
        // Check if we've completed the gallery scroll
        if (scrollProgress >= 0.99 && currentImageIndex >= galleryImages.length - 1) {
          setScrollComplete(true);
          
          // If we've completed scrolling through all images, hide the gallery
          if (!hasCompletedGallery) {
            hasCompletedGallery = true;
            setIsInView(false);
          }
        } else {
          setScrollComplete(false);
        }
        
        // Set scrolling animation state
        if (!isScrolling) {
          setIsScrolling(true);
        }
        
        // Reset scrolling animation state after a delay
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          setIsScrolling(false);
        }, 150);
        
        ticking = false;
      });
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Call once to initialize
    handleScroll();
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [currentImageIndex, isInView, galleryImages.length, isScrolling]);

  return (
    <div ref={outerContainerRef} className="relative mt-20" id="gallery">
      {/* This is a fixed-position container that will stay on screen during scrolling */}
      <div className={`fixed top-0 left-0 w-full h-screen z-20 
        ${isInView ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} 
        transition-opacity duration-500`}>
        
        {/* Header with title */}
        <div className="bg-gradient-to-b from-purple-950 via-purple-950 to-transparent pt-20 pb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-white to-amber-300">
            Digital Assets
          </h2>
          
          {/* Progress Indicator */}
          <div className="flex justify-center items-center mb-4">
            <div className="h-1 bg-purple-700/30 rounded-full w-64 md:w-96">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-amber-400 rounded-full transition-all duration-200"
                style={{ width: `${(currentImageIndex / (galleryImages.length - 1)) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {/* Current Image Label */}
          <div className="text-center text-white/70 text-sm">
            <span className="inline-flex items-center">
              <span className="text-amber-300 font-semibold mr-1">{currentImageIndex + 1}</span>
              <span className="mx-1">/</span>
              <span>{galleryImages.length}</span>
            </span>
          </div>
        </div>
        
        {/* Gallery content positioned in the center of the screen */}
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <div className="w-full h-[70vh] overflow-hidden">
            <div 
              ref={galleryRef}
              className="flex overflow-x-hidden w-full h-full py-4"
            >
              <div className="inline-flex space-x-12 md:space-x-16 pl-6 pr-16">
                {galleryImages.map((image, index) => (
                  <div 
                    key={index} 
                    className={`flex-none w-80 md:w-96 lg:w-[30rem] group bg-black/20 rounded-2xl overflow-hidden transition-all duration-500 
                    ${currentImageIndex === index ? 'scale-105 z-10' : 'scale-95'}`}
                    style={{ opacity: Math.max(0.4, 1 - Math.abs(currentImageIndex - index) * 0.25) }}
                  >
                    {/* Image Container with improved aspect ratio handling */}
                    <div className="relative w-full aspect-[3/4] overflow-hidden border-4 border-purple-600/40 rounded-xl shadow-lg shadow-purple-900/40">
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                        {/* Image wrapper with object-fit handling */}
                        <div className="relative w-full h-full">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover object-center"
                            priority={index < 3}
                          />
                        </div>
                      </div>
                      
                      {/* Overlay for active image */}
                      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-500
                        ${currentImageIndex === index ? 'opacity-100' : 'opacity-0'}`}
                      ></div>
                      
                      {/* Overlay highlight on hover */}
                      <div className="absolute inset-0 bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    {/* Subtitle */}
                    <div className="p-4 text-center transform transition-transform duration-300">
                      <p className="text-lg text-amber-300 font-semibold">{image.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Gradient overlays for fade effect */}
            <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-purple-950 to-transparent pointer-events-none z-10"></div>
            <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-purple-950 to-transparent pointer-events-none z-10"></div>
          </div>
        </div>
        
        {/* Scroll instruction */}
        <div className="absolute bottom-8 w-full flex justify-center z-20 pointer-events-none">
          <div className={`bg-purple-900/70 backdrop-blur-md text-white px-6 py-3 rounded-full shadow-lg transform transition-all duration-500 ${isScrolling ? 'opacity-0 translate-y-10' : 'opacity-100'}`}>
            <p className="flex items-center text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-amber-300 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              Scroll to explore assets
            </p>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="fixed top-40 left-10 w-24 h-24 opacity-10 pointer-events-none z-30">
        <div className="grid grid-cols-3 gap-3">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-white"></div>
          ))}
        </div>
      </div>
      <div className="fixed bottom-40 right-10 w-32 h-32 opacity-10 pointer-events-none z-30">
        <div className="grid grid-cols-4 gap-3">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-amber-300"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollGallery;