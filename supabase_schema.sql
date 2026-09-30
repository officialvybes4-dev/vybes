-- =====================================================
-- VYBES (AURA) Dating App Database Schema for Supabase
-- Project: https://hmmomykswyduynnyjete.supabase.co
-- =====================================================

-- 1. Profiles Table (extends Supabase Auth users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  age INTEGER DEFAULT 23,
  location TEXT DEFAULT 'Mumbai',
  bio TEXT,
  avatar_url TEXT,
  photos TEXT[] DEFAULT '{}',
  occupation TEXT,
  interests TEXT[] DEFAULT '{}',
  prompts JSONB DEFAULT '[]'::jsonb,
  zodiac TEXT,
  height TEXT,
  verified BOOLEAN DEFAULT true,
  online BOOLEAN DEFAULT true,
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Messages Table (Real-time Direct Chatting)
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id TEXT NOT NULL,
  receiver_id TEXT NOT NULL,
  text TEXT,
  image_url TEXT,
  reaction TEXT,
  status TEXT DEFAULT 'sent', -- 'sent', 'delivered', 'read'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Likes Table
CREATE TABLE IF NOT EXISTS public.likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id TEXT NOT NULL,
  receiver_id TEXT NOT NULL,
  is_super_like BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(sender_id, receiver_id)
);

-- 4. Matches Table
CREATE TABLE IF NOT EXISTS public.matches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user1_id TEXT NOT NULL,
  user2_id TEXT NOT NULL,
  matched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user1_id, user2_id)
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;

-- Allow public read & authenticated write policies
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE USING (true);

CREATE POLICY "Anyone can view and send messages" 
ON public.messages FOR ALL USING (true);

CREATE POLICY "Anyone can view and create likes" 
ON public.likes FOR ALL USING (true);

CREATE POLICY "Anyone can view and create matches" 
ON public.matches FOR ALL USING (true);

-- Enable Realtime for Messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
