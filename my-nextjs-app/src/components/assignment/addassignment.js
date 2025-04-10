'use client';

import { useState } from 'react';
import { useAuth } from '../../app/utils/authcontext';
import supabase from '../../app/utils/supabase';

export default function AddAssignment() {
  const { user, profile, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });
  const [formData, setFormData] = useState({
    topic: '',
    github_link: '',
    image_data: null,
    pdf_submission: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          [name]: event.target.result
        }));
      };
      
      if (name === 'image_data') {
        reader.readAsDataURL(file);
      } else if (name === 'pdf_submission') {
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', content: '' });

    try {
      if (!user || !profile) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('assignments')
        .insert({
          profile_id: user.id,
          topic: formData.topic,
          github_link: formData.github_link,
          image_data: formData.image_data,
          pdf_submission: formData.pdf_submission
        })
        .select();

      if (error) throw error;

      setMessage({ 
        type: 'success', 
        content: 'Assignment submitted successfully!' 
      });
      
      // Reset form after successful submission
      setFormData({
        topic: '',
        github_link: '',
        image_data: null,
        pdf_submission: null
      });
      
      // Reset file inputs
      document.getElementById('image_upload').value = '';
      document.getElementById('pdf_upload').value = '';
      
    } catch (error) {
      setMessage({ 
        type: 'error', 
        content: error.message || 'Error submitting assignment' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-blue-600 px-6 py-4">
        <h2 className="text-2xl font-bold text-white">Submit Assignment</h2>
        {profile && (
          <p className="text-white text-sm mt-1">Submitting as: {profile.name || 'Unnamed Student'}</p>
        )}
      </div>
      
      <div className="p-6">
        {authLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : !user ? (
          <div className="mb-4 p-4 rounded-md bg-yellow-100 text-yellow-800">
            Please log in to submit an assignment.
          </div>
        ) : (
          <>
            {message.content && (
              <div className={`mb-4 p-4 rounded-md ${
                message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {message.content}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Topic Field */}
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
                Assignment Topic*
              </label>
              <input
                type="text"
                id="topic"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter the topic of your assignment"
                required
              />
            </div>
            
            {/* GitHub Link Field */}
            <div>
              <label htmlFor="github_link" className="block text-sm font-medium text-gray-700 mb-1">
                GitHub Link
              </label>
              <input
                type="url"
                id="github_link"
                name="github_link"
                value={formData.github_link}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://github.com/yourusername/repository"
              />
              <p className="mt-1 text-xs text-gray-500">
                Please provide the link to your GitHub repository for this assignment
              </p>
            </div>
            
            {/* Image Upload Field */}
            <div>
              <label htmlFor="image_upload" className="block text-sm font-medium text-gray-700 mb-1">
                Image Upload
              </label>
              <input
                type="file"
                id="image_upload"
                name="image_data"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="mt-1 text-xs text-gray-500">
                Upload an image of your work or screenshots (JPEG, PNG, or GIF)
              </p>
            </div>
            
            {/* PDF Upload Field */}
            <div>
              <label htmlFor="pdf_upload" className="block text-sm font-medium text-gray-700 mb-1">
                PDF Submission
              </label>
              <input
                type="file"
                id="pdf_upload"
                name="pdf_submission"
                accept=".pdf"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="mt-1 text-xs text-gray-500">
                Upload your assignment as a PDF document
              </p>
            </div>
            
            {/* Preview Section */}
            {formData.image_data && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Image Preview:</h3>
                <div className="border border-gray-300 rounded-md p-2 max-w-md">
                  <img 
                    src={formData.image_data} 
                    alt="Preview" 
                    className="max-h-48 object-contain mx-auto"
                  />
                </div>
              </div>
            )}
            
            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out flex justify-center items-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : "Submit Assignment"}
              </button>
            </div>
          </div>
        </form>
        </>
        )}
      </div>
    </div>
  );
}