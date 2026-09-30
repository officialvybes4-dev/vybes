import { createClient } from '@supabase/supabase-js';

// Provided Supabase credentials
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://hmmomykswyduynnyjete.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtbW9teWtzd3lkdXlubnlqZXRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA3NjAwMDIsImV4cCI6MjEwNjMzNjAwMn0.UTJ1S0EP5ZuZt7KwaMbpMO6nUwfyoy1NFqOlFZ8wLUU';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  }
});

export const SUPABASE_PROJECT_ID = 'hmmomykswyduynnyjete';
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
