'use client';

import UpdateProfile from '../../components/dashboard/updateprofile';
import Navbar from '../../components/dashboard/navbar';

export default function UpdateProfilePage() {
  return (
    <div className="min-h-screen bg-blue-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <UpdateProfile />
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