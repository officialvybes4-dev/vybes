// Script to seed initial mock profiles and chats into Supabase Database
import { createClient } from '@supabase/supabase-js';
import { INITIAL_USERS } from '../src/data/mockUsers.js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://hmmomykswyduynnyjete.supabase.co';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtbW9teWtzd3lkdXlubnlqZXRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA3NjAwMDIsImV4cCI6MjEwNjMzNjAwMn0.UTJ1S0EP5ZuZt7KwaMbpMO6nUwfyoy1NFqOlFZ8wLUU';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function seed() {
  console.log('🌱 Starting Supabase Seeding on:', SUPABASE_URL);

  for (const user of INITIAL_USERS) {
    const { data, error } = await supabase.from('profiles').upsert({
      id: user.id,
      name: user.name,
      age: user.age,
      location: user.location,
      bio: user.bio,
      avatar_url: user.avatar,
      photos: user.photos,
      occupation: user.occupation,
      interests: user.interests,
      prompts: user.prompts,
      zodiac: user.zodiac,
      height: user.height,
      verified: user.verified,
      online: user.online
    }, { onConflict: 'id' });

    if (error) {
      console.warn(`⚠️ Could not seed profile ${user.name}:`, error.message);
    } else {
      console.log(`✅ Seeded profile: ${user.name}`);
    }
  }

  console.log('✨ Seeding process completed.');
}

seed().catch(console.error);
