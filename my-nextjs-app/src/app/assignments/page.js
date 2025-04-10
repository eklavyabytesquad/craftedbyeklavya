'use client';

import { useState } from 'react';
import AddAssignment from '../../components/assignment/addassignment';
import StudentSubmissions from '../../components/assignment/seeassignment';
import Navbar from '../../components/dashboard/navbar';

export default function AssignmentPage() {
  const [activeTab, setActiveTab] = useState('submit');

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <main className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="bg-white rounded-t-lg shadow-sm mb-6 flex">
          <button
            onClick={() => setActiveTab('submit')}
            className={`flex-1 py-4 text-center font-medium transition-colors duration-200 ${
              activeTab === 'submit'
                ? 'text-blue-700 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Submit Assignment
          </button>
          <button
            onClick={() => setActiveTab('submissions')}
            className={`flex-1 py-4 text-center font-medium transition-colors duration-200 ${
              activeTab === 'submissions'
                ? 'text-blue-700 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            My Submissions
          </button>
        </div>
        
        {/* Tab Content */}
        {activeTab === 'submit' ? (
          <AddAssignment />
        ) : (
          <StudentSubmissions />
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Eklavya Singh. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}