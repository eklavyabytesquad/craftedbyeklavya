'use client';
import AddAssignment from '../../components/assignment/addassignment';
import StudentSubmissions from '../../components/assignment/seeassignment';
import Navbar from '../../components/dashboard/navbar';

export default function AssignmentPage() {
  return (
    <div className="min-h-screen bg-blue-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <main className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Submit Assignment Section */}
          <section>
            <h2 className="text-2xl font-bold text-blue-800 mb-4 pl-2 border-l-4 border-blue-600">
              Submit Assignment
            </h2>
            <AddAssignment />
          </section>
          
          {/* Submissions Section */}
          <section>
            <h2 className="text-2xl font-bold text-blue-800 mb-4 pl-2 border-l-4 border-blue-600">
              My Submissions
            </h2>
            <StudentSubmissions />
          </section>
        </div>
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