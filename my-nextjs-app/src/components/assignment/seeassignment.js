'use client';

import { useState, useEffect, memo, useCallback } from 'react';
import { useAuth } from '../../app/utils/authcontext';
import supabase from '../../app/utils/supabase';

// Image Modal Component
const ImageModal = ({ isOpen, onClose, imageData }) => {
  if (!isOpen || !imageData) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" 
      onClick={onClose}
    >
      <div className="relative max-w-4xl max-h-screen p-2 bg-white rounded-lg overflow-auto" onClick={e => e.stopPropagation()}>
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 p-2 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 z-10"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="mt-2">
          <img 
            src={imageData} 
            alt="Submission preview" 
            className="mx-auto max-h-[80vh]" 
          />
        </div>
      </div>
    </div>
  );
};

// Memoized submission card component to reduce re-renders
const SubmissionCard = memo(({ submission, onDelete, onViewImage }) => {
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }).format(date);
    } catch {
      return 'Date unavailable';
    }
  };

  // Only call this when the button is actually clicked
  const handleImageView = () => {
    if (submission.image_data) {
      onViewImage(submission.image_data);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg border border-blue-100 hover:border-blue-200">
      <div className="px-6 py-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-blue-800 mb-2">{submission.topic}</h3>
            <p className="text-sm text-gray-500 mb-2">
              Submitted: {formatDate(submission.date_submitted || submission.created_at)}
            </p>
          </div>
          <button 
            onClick={() => onDelete(submission)}
            className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors duration-200"
            title="Delete submission"
            aria-label="Delete submission"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
        
        {submission.github_link && (
          <div className="mt-3">
            <a 
              href={submission.github_link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub Repository
            </a>
          </div>
        )}
        
        <div className="mt-3 grid grid-cols-2 gap-2">
          {submission.image_data && (
            <div className="col-span-1">
              <button 
                onClick={handleImageView}
                className="w-full py-1 px-2 text-sm bg-blue-50 text-blue-700 rounded border border-blue-200 hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                View Image
              </button>
            </div>
          )}
          
          {submission.pdf_submission && (
            <div className="col-span-1">
              <button 
                onClick={() => window.open(submission.pdf_submission, '_blank')}
                className="w-full py-1 px-2 text-sm bg-red-50 text-red-700 rounded border border-red-200 hover:bg-red-100 transition-colors duration-200 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View PDF
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

// Modal component for delete confirmation
const DeleteModal = ({ isOpen, onClose, onConfirm, isDeleting }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" onClick={onClose}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div 
          onClick={e => e.stopPropagation()} 
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Delete Assignment
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete this assignment submission? 
                    This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onConfirm}
              disabled={isDeleting}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {isDeleting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Deleting...
                </>
              ) : "Delete"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main component
export default function StudentSubmissions() {
  const { user, loading: authLoading } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [submissionToDelete, setSubmissionToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  // Use useCallback to prevent unnecessary re-renders
  const fetchSubmissions = useCallback(async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      
      // Optimize query with RLS to ensure fast data retrieval
      const { data, error } = await supabase
        .from('assignments')
        .select('id, profile_id, topic, date_submitted, created_at, github_link, pdf_submission')
        .eq('profile_id', user.id)
        .order('date_submitted', { ascending: false });
      
      if (error) throw error;
      
      setSubmissions(data || []);
    } catch (err) {
      console.error('Error fetching submissions:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Fetch image data only when needed
  const fetchImageData = useCallback(async (submissionId) => {
    try {
      const { data, error } = await supabase
        .from('assignments')
        .select('image_data')
        .eq('id', submissionId)
        .single();
        
      if (error) throw error;
      return data?.image_data;
    } catch (err) {
      console.error('Error fetching image data:', err);
      return null;
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchSubmissions();
    }
  }, [user, fetchSubmissions]);

  const handleDeleteClick = useCallback((submission) => {
    setSubmissionToDelete(submission);
    setShowDeleteModal(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setShowDeleteModal(false);
    setSubmissionToDelete(null);
  }, []);

  const handleViewImage = useCallback(async (imageData) => {
    setCurrentImage(imageData);
    setImageModalOpen(true);
  }, []);

  const closeImageModal = useCallback(() => {
    setImageModalOpen(false);
    setCurrentImage(null);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!submissionToDelete) return;
    
    try {
      setDeleteLoading(true);
      
      // Delete the assignment record
      const { error } = await supabase
        .from('assignments')
        .delete()
        .eq('id', submissionToDelete.id);
      
      if (error) throw error;
      
      // Remove from local state (more efficient than refetching)
      setSubmissions(prev => prev.filter(s => s.id !== submissionToDelete.id));
      
      setMessage({ 
        type: 'success', 
        content: 'Assignment deleted successfully!' 
      });
      
      // Close the modal
      closeDeleteModal();
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setMessage({ type: '', content: '' });
      }, 3000);
      
    } catch (err) {
      console.error('Error deleting submission:', err);
      setMessage({ 
        type: 'error', 
        content: err.message || 'Error deleting assignment' 
      });
    } finally {
      setDeleteLoading(false);
    }
  }, [submissionToDelete, closeDeleteModal]);

  if (authLoading) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="mb-4 p-4 rounded-md bg-blue-100 text-blue-800">
          Please log in to view your submissions.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">My Assignments</h2>
        
        {message.content && (
          <div className={`mb-4 p-4 rounded-md ${
            message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {message.content}
          </div>
        )}
        
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 text-red-700 p-4 rounded-md">
            Error loading submissions: {error}
          </div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-8 bg-blue-50 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-blue-700">No submissions yet</h3>
            <p className="mt-1 text-blue-500">
              You haven't submitted any assignments yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
            {submissions.map(submission => (
              <SubmissionCard 
                key={submission.id} 
                submission={submission} 
                onDelete={handleDeleteClick} 
                onViewImage={() => handleViewImage(submission.image_data)}
              />
            ))}
          </div>
        )}
      </div>
      
      <DeleteModal 
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        isDeleting={deleteLoading}
      />

      <ImageModal
        isOpen={imageModalOpen}
        onClose={closeImageModal}
        imageData={currentImage}
      />
    </div>
  );
}