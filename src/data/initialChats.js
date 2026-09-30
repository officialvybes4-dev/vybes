// Pre-seeded chat conversations with images, timestamps, and status
export const INITIAL_CHATS = {
  'user-1': {
    userId: 'user-1',
    unreadCount: 1,
    lastActivity: Date.now() - 1000 * 60 * 5, // 5 mins ago
    messages: [
      {
        id: 'm1',
        senderId: 'user-1',
        text: 'Hey! Loved your profile. Are you really building full-stack apps from scratch? That is super cool! 🚀',
        timestamp: Date.now() - 1000 * 60 * 60 * 2,
        status: 'read'
      },
      {
        id: 'm2',
        senderId: 'me',
        text: 'Hey Aanya! Yes, exactly haha. Right now working on this sleek dating app experience actually! How is your day going? 😊',
        timestamp: Date.now() - 1000 * 60 * 55,
        status: 'read'
      },
      {
        id: 'm3',
        senderId: 'user-1',
        text: 'Working from this aesthetic coffee spot in Bandra today! Look at this setup: ☕✨',
        timestamp: Date.now() - 1000 * 60 * 30,
        status: 'read'
      },
      {
        id: 'm4',
        senderId: 'user-1',
        imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
        text: 'The cold brew here is top tier!',
        timestamp: Date.now() - 1000 * 60 * 28,
        status: 'read'
      },
      {
        id: 'm5',
        senderId: 'me',
        text: 'Wow that ambiance looks stunning! We should totally grab coffee there sometime soon.',
        timestamp: Date.now() - 1000 * 60 * 15,
        status: 'read'
      },
      {
        id: 'm6',
        senderId: 'user-1',
        text: '100%! Let me know when you are free this week 😊',
        timestamp: Date.now() - 1000 * 60 * 5,
        status: 'delivered'
      }
    ]
  },
  'user-2': {
    userId: 'user-2',
    unreadCount: 0,
    lastActivity: Date.now() - 1000 * 60 * 60 * 4,
    messages: [
      {
        id: 'm21',
        senderId: 'user-2',
        text: 'Bro! Fellow techie I see. Do you ride motorcycles too?',
        timestamp: Date.now() - 1000 * 60 * 60 * 5,
        status: 'read'
      },
      {
        id: 'm22',
        senderId: 'me',
        text: 'Love weekend rides! What bike are you riding currently?',
        timestamp: Date.now() - 1000 * 60 * 60 * 4,
        status: 'read'
      },
      {
        id: 'm23',
        senderId: 'user-2',
        imageUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
        text: 'Continental GT 650. Here is a pic from my last morning breakfast ride to Mysore road!',
        timestamp: Date.now() - 1000 * 60 * 60 * 3,
        status: 'read'
      }
    ]
  },
  'user-3': {
    userId: 'user-3',
    unreadCount: 2,
    lastActivity: Date.now() - 1000 * 60 * 45,
    messages: [
      {
        id: 'm31',
        senderId: 'user-3',
        text: 'Hey there! Just checked out your profile. Have you heard the new indie acoustic album?',
        timestamp: Date.now() - 1000 * 60 * 50,
        status: 'delivered'
      },
      {
        id: 'm32',
        senderId: 'user-3',
        text: 'Also found this amazing vintage record store in Delhi today! 🎶',
        timestamp: Date.now() - 1000 * 60 * 45,
        status: 'delivered'
      }
    ]
  }
};

// Preset sample photo library for quick image sending
export const SAMPLE_PHOTOS = [
  {
    title: 'Cafe Vibes',
    url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    caption: 'Chilling at my favorite coffee corner ☕'
  },
  {
    title: 'Golden Sunset',
    url: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=800&q=80',
    caption: 'Caught this mesmerizing sunset earlier today 🌅'
  },
  {
    title: 'Cute Puppy',
    url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
    caption: 'Say hi to my furry companion! 🐶🐾'
  },
  {
    title: 'Weekend Roadtrip',
    url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
    caption: 'On the road exploring new mountain trails 🚗🌲'
  },
  {
    title: 'Delicious Dinner',
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    caption: 'Made this tonight! How does it look? 🍝🍷'
  },
  {
    title: 'Music Studio',
    url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    caption: 'Late night jam session 🎧🎹'
  }
];

// Realistic automated AI replies for personas when you text them
export const PERSONA_RESPONSES = {
  'user-1': [
    'Aww that is awesome! You have such great energy ✨',
    'Haha totally agree with you on that! What are your plans for the weekend?',
    'I was just thinking the exact same thing! Great minds think alike 🌸',
    'I just took this photo a minute ago, look how pretty the sky is! ☁️✨',
    'Are you more of an early morning coffee person or a late night conversation person?'
  ],
  'user-2': [
    'Haha that is awesome man! Definitely respect that mindset 💪',
    'Sounds like a solid plan. Have you checked out that new place in Indiranagar yet?',
    'Nice! Next time I am going for a trail ride, I will ping you 🏍️🔥',
    'Just wrapped up an intense gym workout! Feeling pumped 🏋️‍♂️'
  ],
  'user-3': [
    'Oh wow, I love that! Your taste in music and vibes is immaculate 🎵',
    'I literally could talk about vintage vinyls and 90s art for hours haha',
    'Send me a photo of your favorite spot in the city! 📷✨',
    'That made me smile! You seem really genuine.'
  ],
  'user-4': [
    'Yo! The vibes are immaculate right now. Chilling by the beach shacks in Goa 🌊',
    'Music and sunsets are truly therapy. What track are you listening to right now? 🎧',
    'Haha classic! You definitely need to visit Goa soon.'
  ],
  'user-5': [
    'Omg yes! 🥐 You definitely earned a fresh batch of chocolate croissants for that!',
    'Haha Oreo (my golden retriever) just wagged his tail at your message! 🐕',
    'That is so sweet of you! How was the rest of your day?'
  ],
  'user-6': [
    'That is the spirit! Driven, ambitious, and spontaneous. Love that! 🚀',
    'Where is the next place on your travel bucket list? ✈️',
    'Always up for stimulating conversations over good whiskey or black coffee ☕'
  ],
  'user-7': [
    'What a beautifully written thought! You have a way with words 📖✨',
    'I was just engrossed in a book and your notification lit up my screen ☕',
    'Which fictional character do you relate to the most?'
  ],
  'default': [
    'Hey! Thanks for messaging, loving our conversation 😊',
    'Haha that is hilarious! Tell me more ✨',
    'Sounds super fun! What else do you enjoy doing in your free time?',
    'I really like your vibe! Let us keep chatting 💫'
  ]
};
