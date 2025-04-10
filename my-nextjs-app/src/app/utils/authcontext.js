'use client'

import React, { createContext, useState, useEffect, useContext } from 'react';
import supabase from './supabase';
import { useRouter } from 'next/navigation';

// Create the auth context
const AuthContext = createContext();

// Export the provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        setLoading(true);
        
        // Get current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }

        if (session) {
          setUser(session.user);
          
          // Fetch profile data after setting user
          try {
            await fetchUserProfile(session.user.id);
          } catch (profileError) {
            console.error('Failed to fetch profile during session check:', profileError);
            // Don't throw here, we still want to set the user
          }
        }
      } catch (err) {
        console.error('Error checking auth session:', err);
        setError(err.message || 'Failed to check auth session');
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        
        if (session) {
          setUser(session.user);
          
          // Fetch profile data after auth state change
          try {
            await fetchUserProfile(session.user.id);
          } catch (profileError) {
            console.error('Failed to fetch profile during auth state change:', profileError);
            // Continue with user auth even if profile fetch fails
          }
        } else {
          setUser(null);
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // Clean up subscription on unmount
    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  // Fetch user profile data from the profiles table
  const fetchUserProfile = async (userId) => {
    if (!userId) {
      console.error('Cannot fetch profile: No user ID provided');
      return;
    }

    try {
      console.log('Fetching profile for user ID:', userId);
      
      // Create a function to check if the profile exists
      const checkProfileExists = async () => {
        const { count, error: countError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .eq('id', userId);
          
        if (countError) {
          console.error('Error checking if profile exists:', countError);
          return false;
        }
        
        return count > 0;
      };
      
      // Check if profile exists
      const profileExists = await checkProfileExists();
      console.log('Profile exists check result:', profileExists);
      
      // If profile doesn't exist, create one
      if (!profileExists) {
        console.log('Profile does not exist, creating new profile');
        try {
          const { error: insertError } = await supabase
            .from('profiles')
            .insert([{ 
              id: userId, 
              name: '', 
              class: '', 
              year: 2025, 
              role: 'student' 
            }]);
            
          if (insertError) {
            console.error('Error creating new profile:', insertError);
            throw insertError;
          }
          
          console.log('Created new profile successfully');
        } catch (createError) {
          console.error('Failed to create new profile:', createError);
          // Continue to try fetching in case the trigger has worked
        }
      }
      
      // Now fetch the profile
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        
        // Log more details about the error
        if (error.code) console.error('Error code:', error.code);
        if (error.details) console.error('Error details:', error.details);
        if (error.hint) console.error('Error hint:', error.hint);
        
        throw error;
      }
      
      console.log('Profile data fetched successfully:', data);
      
      if (data) {
        setProfile(data);
      } else {
        console.warn('No profile data returned for user ID:', userId);
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
      setError(err.message || 'Failed to fetch user profile');
      // We don't rethrow here to prevent the entire auth flow from failing
    }
  };

  // Sign up function
  const signUp = async (email, password) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      
      return { data, error: null };
    } catch (err) {
      console.error('Error signing up:', err);
      return { data: null, error: err.message || 'Failed to sign up' };
    } finally {
      setLoading(false);
    }
  };

  // Sign in function
  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Manually fetch the profile after sign in
      if (data && data.user) {
        try {
          await fetchUserProfile(data.user.id);
        } catch (profileError) {
          console.error('Failed to fetch profile after sign in:', profileError);
          // Continue with sign in even if profile fetch fails
        }
      }

      return { data, error: null };
    } catch (err) {
      console.error('Error signing in:', err);
      return { data: null, error: err.message || 'Failed to sign in' };
    } finally {
      setLoading(false);
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      // Clear user and profile state
      setUser(null);
      setProfile(null);
      
      router.push('/login');
    } catch (err) {
      console.error('Error signing out:', err);
      setError(err.message || 'Failed to sign out');
    } finally {
      setLoading(false);
    }
  };

  // Update user profile function
  const updateProfile = async (updates) => {
    if (!user || !user.id) {
      console.error('Cannot update profile: No authenticated user');
      return { data: null, error: 'No authenticated user' };
    }

    try {
      setLoading(true);
      
      console.log('Updating profile for user ID:', user.id, 'with updates:', updates);
      
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select();

      if (error) {
        console.error('Error updating profile:', error);
        throw error;
      }
      
      console.log('Profile updated successfully:', data);
      
      // Update local state with the returned data or the updates
      if (data && data.length > 0) {
        setProfile(data[0]);
      } else {
        setProfile(prev => ({ ...prev, ...updates }));
      }
      
      return { data, error: null };
    } catch (err) {
      console.error('Error updating profile:', err);
      return { data: null, error: err.message || 'Failed to update profile' };
    } finally {
      setLoading(false);
    }
  };

  // Log state changes for debugging
  useEffect(() => {
    console.log('Auth state updated:', { 
      userExists: !!user, 
      profileExists: !!profile,
      loading,
      error 
    });
    
    if (user) console.log('User details:', user);
    if (profile) console.log('Profile details:', profile);
    if (error) console.log('Auth error:', error);
  }, [user, profile, loading, error]);

  // Context value
  const value = {
    user,
    profile,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    updateProfile,
    isAdmin: profile?.role === 'admin',
  };

  // Provider component
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}