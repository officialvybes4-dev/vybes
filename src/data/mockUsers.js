// High-quality diverse mock profiles for dating app with 20+ feature attributes
export const INITIAL_USERS = [
  {
    id: 'user-1',
    name: 'Aanya Sharma',
    age: 23,
    location: 'Mumbai, Bandra West',
    distance: '2.4 km away',
    radarDistance: 2.4,
    bio: 'Product Designer by day, indie music lover & cafe hopper by weekend. Looking for good banter, deep conversations, and maybe someone to share sushi with! 🍣✨',
    occupation: 'Lead UI/UX Designer',
    company: 'Fintech Studio',
    education: 'NIFT Mumbai',
    verified: true,
    online: true,
    lastSeen: 'Active now',
    matchScore: 96,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    ],
    interests: ['Design', 'Coffee', 'Indie Rock', 'Photography', 'Sushi', 'Travel'],
    prompts: [
      {
        question: 'My ideal Sunday looks like...',
        answer: 'Iced caramel macchiato, browsing an old bookstore, and an evening drive along Marine Drive.'
      },
      {
        question: 'Two truths and a lie',
        answer: 'I have climbed Triund twice, I have met A.R. Rahman, and I can cook authentic butter chicken.'
      }
    ],
    zodiac: 'Scorpio ♏',
    element: 'Water 🌊',
    height: "5'6\" (168 cm)",
    drinking: 'Socially 🍸',
    lookingFor: 'Long-term relationship ❤️',
    datingIntent: 'Long-term relationship ❤️',
    responseTime: '< 2 mins ⚡',
    engagementScore: 98,
    greenFlags: ['Bakes warm brownies 🍫', 'Never looks at phone on dates 📱', 'Loves acoustic indie tracks 🎸'],
    voiceNote: {
      duration: '0:14',
      caption: 'Hey! Hope you are having a wonderful day ✨',
      waveform: [35, 60, 95, 45, 80, 100, 70, 90, 50, 85, 40, 75, 30]
    },
    anthem: {
      title: 'Die With A Smile',
      artist: 'Lady Gaga & Bruno Mars',
      genre: 'Soul Pop',
      resonanceScore: 94
    },
    thisOrThat: [
      { prompt: 'Morning Coffee vs Late Night Chai', choice: 'Morning Coffee ☕' },
      { prompt: 'Himalayas vs Tropical Beach', choice: 'Tropical Beach 🏖️' },
      { prompt: 'Spontaneous Roadtrip vs Planned Luxury', choice: 'Spontaneous Roadtrip 🚗' }
    ],
    radarCoords: { x: 35, y: 40 }
  },
  {
    id: 'user-2',
    name: 'Rohan Mehra',
    age: 26,
    location: 'Bangalore, Indiranagar',
    distance: '4.1 km away',
    radarDistance: 4.1,
    bio: 'Software Architect building AI systems. Gym rat, weekend motorcyclist, and amateur chef. Let us grab artisanal brews or go on a night trail ride. 🏍️☕',
    occupation: 'Senior AI Engineer',
    company: 'HyperScale AI',
    education: 'IIT Bombay',
    verified: true,
    online: true,
    lastSeen: 'Active now',
    matchScore: 92,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80'
    ],
    interests: ['Fitness', 'AI', 'Motorcycles', 'Cooking', 'EDM', 'Camping'],
    prompts: [
      {
        question: 'A spontaneous thing we should do...',
        answer: 'Pack a tent at 4 AM and catch the sunrise from Nandi Hills with hot filter coffee.'
      },
      {
        question: 'My most controversial opinion',
        answer: 'Pineapple actually elevates spicy pepperoni pizza when done right.'
      }
    ],
    zodiac: 'Aries ♈',
    element: 'Fire 🔥',
    height: "6'1\" (185 cm)",
    drinking: 'Occasionally 🍺',
    lookingFor: 'Something real & exciting ✨',
    datingIntent: 'Something real & exciting ✨',
    responseTime: '< 5 mins ⚡',
    engagementScore: 94,
    greenFlags: ['Always punctually on time ⏰', 'Will cook you gourmet pasta 🍝', 'Takes amazing candid photos 📸'],
    voiceNote: {
      duration: '0:18',
      caption: 'Quick hello from my motorcycle pitstop! 🏍️',
      waveform: [45, 80, 60, 90, 75, 50, 95, 85, 40, 70, 90, 60, 30]
    },
    anthem: {
      title: 'Starboy',
      artist: 'The Weeknd & Daft Punk',
      genre: 'Synthwave',
      resonanceScore: 91
    },
    thisOrThat: [
      { prompt: 'Leg Day vs Rest Day Cheat Meal', choice: 'Cheat Meal Pizza 🍕' },
      { prompt: 'Cruiser Bike vs Sports Bike', choice: 'Cruiser Bike 🏍️' },
      { prompt: 'Clubbing vs House Party', choice: 'House Party 🥂' }
    ],
    radarCoords: { x: 70, y: 30 }
  },
  {
    id: 'user-3',
    name: 'Priya Sen',
    age: 24,
    location: 'Delhi NCR, Cyber Hub',
    distance: '3.8 km away',
    radarDistance: 3.8,
    bio: 'Art curator & fashion stylist. Obsessed with 90s vinyl records, film photography, and finding hidden vintage thrift stores. Send me your favorite playlist! 🎵📷',
    occupation: 'Fashion Stylist & Curator',
    company: 'Vogue Collective',
    education: 'Delhi University',
    verified: true,
    online: false,
    lastSeen: '15m ago',
    matchScore: 89,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80'
    ],
    interests: ['Vintage Art', 'Vinyl Records', 'Fashion', 'Film Photography', 'Wine', 'Museums'],
    prompts: [
      {
        question: 'Teach me something about...',
        answer: 'How vintage 35mm film cameras capture warm golden hour light unlike any smartphone.'
      },
      {
        question: 'The best way to win my heart is...',
        answer: 'Surprise me with a handwritten letter or a thrifted vinyl record.'
      }
    ],
    zodiac: 'Libra ♎',
    element: 'Air 💨',
    height: "5'5\" (165 cm)",
    drinking: 'Wine lover 🍷',
    lookingFor: 'Dating & companionship 💫',
    datingIntent: 'Dating & companionship 💫',
    responseTime: '< 10 mins 💬',
    engagementScore: 91,
    greenFlags: ['Has museum membership cards 🏛️', 'Gives incredible gift ideas 🎁', 'Great emotional depth 🌸'],
    voiceNote: {
      duration: '0:12',
      caption: 'Listening to vintage jazz records right now 🎶',
      waveform: [30, 50, 70, 85, 60, 45, 75, 90, 65, 40, 55, 30]
    },
    anthem: {
      title: 'Midnight City',
      artist: 'M83',
      genre: 'Dream Pop',
      resonanceScore: 88
    },
    thisOrThat: [
      { prompt: 'Modern Art vs Renaissance Oil Paintings', choice: 'Modern Art 🎨' },
      { prompt: 'Red Wine vs Artisanal Gin', choice: 'Red Wine 🍷' },
      { prompt: 'Book in hand vs Kindle reader', choice: 'Physical Book 📖' }
    ],
    radarCoords: { x: 50, y: 65 }
  },
  {
    id: 'user-4',
    name: 'Kabir Singhania',
    age: 27,
    location: 'Goa, Anjuna',
    distance: '6.5 km away',
    radarDistance: 6.5,
    bio: 'Surfer, electronic music producer, and digital nomad. Living between sunset beach shacks and music studios. Let us watch the waves crash under the stars. 🏄‍♂️🌊',
    occupation: 'Music Producer & Sound Designer',
    company: 'WaveLab Records',
    education: 'KM Music Conservatory',
    verified: true,
    online: true,
    lastSeen: 'Active now',
    matchScore: 94,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80'
    ],
    interests: ['Surfing', 'Music Production', 'Beach', 'Sunsets', 'Yoga', 'Festivals'],
    prompts: [
      {
        question: 'Together we could...',
        answer: 'Jam with guitars by a bonfire at Vagator beach till sunrise.'
      },
      {
        question: 'Don’t judge me if...',
        answer: 'I can spend 4 hours straight tweaking a single synth bass drop.'
      }
    ],
    zodiac: 'Pisces ♓',
    element: 'Water 🌊',
    height: "6'0\" (183 cm)",
    drinking: 'Socially 🍻',
    lookingFor: 'Meaningful connection ✨',
    datingIntent: 'Meaningful connection ✨',
    responseTime: '< 4 mins ⚡',
    engagementScore: 96,
    greenFlags: ['Plays acoustic guitar like a pro 🎸', 'Deep listener 🌊', 'Makes morning beach smoothie bowls 🍓'],
    voiceNote: {
      duration: '0:16',
      caption: 'The sound of the ocean waves behind me 🌊',
      waveform: [50, 70, 90, 80, 60, 85, 95, 75, 65, 80, 50, 30]
    },
    anthem: {
      title: 'Sundream',
      artist: 'RÜFÜS DU SOL',
      genre: 'Deep House',
      resonanceScore: 97
    },
    thisOrThat: [
      { prompt: 'Sunrise Surf vs Sunset Bonfire', choice: 'Sunset Bonfire 🔥' },
      { prompt: 'Acoustic Guitar vs Modular Synth', choice: 'Modular Synth 🎹' },
      { prompt: 'Tent under stars vs Boutique Resort', choice: 'Tent under stars ⛺' }
    ],
    radarCoords: { x: 25, y: 75 }
  },
  {
    id: 'user-5',
    name: 'Zara Khan',
    age: 25,
    location: 'Pune, Koregaon Park',
    distance: '5.2 km away',
    radarDistance: 5.2,
    bio: 'Pastry chef and bakery owner. Will bake you warm Belgian chocolate croissants if you match my energy. Dog mom to a golden retriever named Oreo! 🥐🐾',
    occupation: 'Artisanal Baker & Chocolatier',
    company: 'The Velvet Crumb',
    education: 'Le Cordon Bleu',
    verified: true,
    online: false,
    lastSeen: '1h ago',
    matchScore: 88,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80'
    ],
    interests: ['Baking', 'Dogs', 'Brunch', 'Desserts', 'Roadtrips', 'Board Games'],
    prompts: [
      {
        question: 'My secret talent...',
        answer: 'Guessing your exact favorite flavor of dessert within 2 minutes of meeting you.'
      },
      {
        question: 'A boundary of mine...',
        answer: 'If my dog does not like you, we need a serious trial period! 😂'
      }
    ],
    zodiac: 'Taurus ♉',
    element: 'Earth 🌿',
    height: "5'4\" (163 cm)",
    drinking: 'Never 🧃',
    lookingFor: 'Long-term relationship ❤️',
    datingIntent: 'Long-term relationship ❤️',
    responseTime: '< 8 mins 💬',
    engagementScore: 92,
    greenFlags: ['Infinite free pastries & cookies 🍪', 'Dog friendly 🐕', 'Hosts epic board game nights 🎲'],
    voiceNote: {
      duration: '0:11',
      caption: 'Just pulled a fresh batch of pain au chocolat out of the oven! 🥐',
      waveform: [40, 65, 80, 95, 70, 50, 85, 60, 45, 70, 35]
    },
    anthem: {
      title: 'Golden',
      artist: 'Harry Styles',
      genre: 'Indie Pop',
      resonanceScore: 90
    },
    thisOrThat: [
      { prompt: 'Dark Chocolate vs Milk Chocolate', choice: 'Belgian Dark Chocolate 🍫' },
      { prompt: 'Dogs vs Cats', choice: 'Golden Retrievers forever! 🐕' },
      { prompt: 'Lazy Sunday Brunch vs 5 AM Workout', choice: 'Lazy Sunday Brunch 🥞' }
    ],
    radarCoords: { x: 75, y: 70 }
  },
  {
    id: 'user-6',
    name: 'Arjun Verma',
    age: 28,
    location: 'Hyderabad, Jubilee Hills',
    distance: '3.1 km away',
    radarDistance: 3.1,
    bio: 'Angel investor & marathon runner. Traveled to 22 countries. Looking for someone driven, curious, and ready for spontaneous weekend getaways! ✈️🏃‍♂️',
    occupation: 'Venture Capital Associate',
    company: 'Nexus Ventures',
    education: 'ISB Hyderabad',
    verified: true,
    online: true,
    lastSeen: 'Active now',
    matchScore: 91,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80'
    ],
    interests: ['Marathon', 'Investing', 'Travel', 'Architecture', 'Podcasts', 'Tennis'],
    prompts: [
      {
        question: 'Best travel story...',
        answer: 'Got stranded in Kyoto during cherry blossom season and ended up attending a traditional tea ceremony with locals.'
      }
    ],
    zodiac: 'Capricorn ♑',
    element: 'Earth 🌿',
    height: "6'2\" (188 cm)",
    drinking: 'Socially 🥃',
    lookingFor: 'Marriage minded 💍',
    datingIntent: 'Marriage minded 💍',
    responseTime: '< 3 mins ⚡',
    engagementScore: 95,
    greenFlags: ['High ambition & emotional intelligence 🧠', 'Always plans romantic dinners 🕯️', 'Sub 4-hour marathoner 🏃‍♂️'],
    voiceNote: {
      duration: '0:15',
      caption: 'Just finished my 15km morning run, feeling energized! 💪',
      waveform: [40, 75, 90, 60, 80, 100, 70, 85, 55, 90, 35]
    },
    anthem: {
      title: 'Higher Power',
      artist: 'Coldplay',
      genre: 'Pop Rock',
      resonanceScore: 89
    },
    thisOrThat: [
      { prompt: 'Tennis Match vs Golf Session', choice: 'Tennis Match 🎾' },
      { prompt: 'Tokyo vs Zurich', choice: 'Tokyo 🗼' },
      { prompt: 'Espresso vs Matcha Latte', choice: 'Double Espresso ☕' }
    ],
    radarCoords: { x: 60, y: 20 }
  },
  {
    id: 'user-7',
    name: 'Natasha Roy',
    age: 24,
    location: 'Kolkata, Park Street',
    distance: '4.8 km away',
    radarDistance: 4.8,
    bio: 'Literature enthusiast, poet, and dark chocolate addict. Let us get lost in an independent bookstore or debate philosophical cinema over chai. ☕📖',
    occupation: 'Book Editor & Writer',
    company: 'Harper Collective',
    education: 'Jadavpur University',
    verified: true,
    online: true,
    lastSeen: 'Active now',
    matchScore: 95,
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
    ],
    interests: ['Books', 'Poetry', 'Cinema', 'Tea', 'Art', 'Museums'],
    prompts: [
      {
        question: 'Dating me is like...',
        answer: 'Having an infinite supply of rare book recommendations and late-night aesthetic conversations.'
      }
    ],
    zodiac: 'Cancer ♋',
    element: 'Water 🌊',
    height: "5'5\" (165 cm)",
    drinking: 'Rarely 🍵',
    lookingFor: 'Deep emotional connection ❤️',
    datingIntent: 'Deep emotional connection ❤️',
    responseTime: '< 6 mins 💬',
    engagementScore: 97,
    greenFlags: ['Writes personalized poems ✍️', 'Remembers your coffee order ☕', 'Always checks in on you 🌸'],
    voiceNote: {
      duration: '0:13',
      caption: 'Reading a favorite chapter by candlelight 🕯️📖',
      waveform: [35, 55, 75, 90, 60, 45, 70, 85, 60, 40, 50, 25]
    },
    anthem: {
      title: 'Cardigan',
      artist: 'Taylor Swift',
      genre: 'Folk Pop',
      resonanceScore: 96
    },
    thisOrThat: [
      { prompt: 'Poetry vs Prose', choice: 'Poetry 📜' },
      { prompt: 'Masala Chai vs Earl Grey', choice: 'Masala Chai in Clay Cup ☕' },
      { prompt: 'Rainy Day Cafe vs Sunny Picnic', choice: 'Rainy Day Cafe 🌧️' }
    ],
    radarCoords: { x: 40, y: 80 }
  }
];

// Current logged in user (Default Persona)
export const CURRENT_USER = {
  id: 'me',
  name: 'Dev Maverick',
  age: 25,
  location: 'Mumbai, Downtown',
  bio: 'Full-stack builder, tech enthusiast & night owl. Building cool products, love music, hiking and good coffee! ✨💻',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=80',
  photos: [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=800&q=80'
  ],
  occupation: 'Lead Engineer & Founder',
  interests: ['Coding', 'Startups', 'Travel', 'Gaming', 'Coffee', 'Music'],
  zodiac: 'Scorpio ♏',
  element: 'Water 🌊',
  verified: true,
  datingIntent: 'Long-term relationship ❤️',
  anthem: {
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    genre: 'Synthpop',
    resonanceScore: 95
  }
};
