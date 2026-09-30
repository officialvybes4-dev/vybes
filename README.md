# VYBES — Next-Gen Dating & Social Discovery App ⚡🔥

> **Open Communication • Instant Direct Chat • Image Sharing • Dynamic Themes • Supabase Cloud Backend**

VYBES (AURA) is a full-featured, mobile-first and desktop-responsive dating and social discovery platform designed to eliminate traditional matching barriers and provide instant, unrestricted connections powered by **Supabase Cloud**.

---

## ✨ Features

- ⚡ **Supabase Cloud Integration:**
  - Connected to live Supabase project (`https://hmmomykswyduynnyjete.supabase.co`).
  - Supabase Auth for Email/Password sign-up & login.
  - Supabase session persistence and real-time state listeners.
  - SQL Schema provided (`supabase_schema.sql`) for server-side database tables (`profiles`, `messages`, `likes`, `matches`) with Row Level Security (RLS).
- 💬 **Unrestricted Direct Chatting:** Anyone can chat with anyone without needing a mutual match first.
- 📸 **Photo & Image Sharing:** Send real photo files from your computer or phone, or choose from aesthetic photo presets. Includes captions and full-screen HD Lightbox view.
- 🧭 **Explore Page:**
  - **Swipe Cards Mode:** Tinder/Bumble-style interactive cards with Swipe Left, Swipe Right, and Super Like (with confetti fireworks!).
  - **Grid Feed Mode:** Browse all user cards at once with match percentage, online badges, and direct chat buttons.
  - **Detailed Profile Modal:** Photo carousel, dating prompts (*"My ideal Sunday...", "Two truths and a lie"*), lifestyle tags, and bio.
- 🎨 **6 Dynamic Themes (Live Switcher):**
  1. Sunset Blaze (Romantic dark)
  2. Cyber Neon (Futuristic purple/cyan glow)
  3. Midnight Rose (Luxury obsidian red)
  4. Emerald Royale (Deep forest green & gold)
  5. Ocean Twilight (Deep navy & azure serenity)
  6. Aura Light Clean (Crisp Apple/Bumble style light theme)
- 🔐 **Authentication & Onboarding:**
  - **Sign In with Google (OAuth 2.0 flow):** Interactive Google Account Chooser with preset accounts or custom Gmail.
  - **Full User Sign-Up:** Name, age, email, password, location, avatar upload/presets, bio, and interest tags.
  - **User Login:** Email & password with remember me and quick 1-click demo logins.
  - **User Menu & Session Management:** Verified badges, account details, Supabase status badge, and 1-click logout.
- 📱 **Responsive Design & Phone Frame Simulator:**
  - Fully responsive on mobile, tablet, and widescreen desktop.
  - Built-in **iPhone 16 Pro Device Frame** simulator toggle.
- 🤖 **Smart AI Persona Auto-Replies:** Active profiles reply dynamically with typing indicators and reciprocal photo sharing.

---

## 🗄️ Supabase Setup & Configuration

The app is pre-configured with the live Supabase project:
- **Project URL:** `https://hmmomykswyduynnyjete.supabase.co`

### Environment Variables
Create a `.env` file from `.env.example`:
```env
VITE_SUPABASE_URL=https://hmmomykswyduynnyjete.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtbW9teWtzd3lkdXlubnlqZXRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA3NjAwMDIsImV4cCI6MjEwNjMzNjAwMn0.UTJ1S0EP5ZuZt7KwaMbpMO6nUwfyoy1NFqOlFZ8wLUU
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_wGXd4INmQucTF3CiMc-Pfg_gQqd2ccL
```

### Database Tables (Optional)
To enable server-side database storage for messages, likes, and profiles:
1. Open the [Supabase Dashboard](https://supabase.com/dashboard/project/hmmomykswyduynnyjete/sql).
2. Go to the **SQL Editor**.
3. Paste and run the contents of [`supabase_schema.sql`](./supabase_schema.sql).

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ or v20+)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/officialvybes4-dev/vybes.git
cd vybes

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser!

### Production Build
```bash
npm run build
npm run preview
```

---

## 🛠️ Tech Stack
- **Backend / Database:** Supabase Cloud (`@supabase/supabase-js`)
- **Frontend:** React 19, Vite 5
- **Styling:** Tailwind CSS, Custom Glassmorphism, CSS Animations
- **Icons:** Lucide React
- **Celebrations:** Canvas Confetti

---

## 📄 License
MIT License
