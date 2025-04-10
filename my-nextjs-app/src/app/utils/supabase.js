import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://pknfpxunrdaidfveqfha.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrbmZweHVucmRhaWRmdmVxZmhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1OTI1MDMsImV4cCI6MjA1OTE2ODUwM30.aS67xis9BgUxvSqTnQK8iI4T044UPZS1Zcr4-loOfiA';

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;