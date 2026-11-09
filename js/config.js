/**
 * ============================================================================
 * AISHWARYA HARISHANKAR — PORTFOLIO CONFIGURATION
 * ============================================================================
 * Centralized data store for stats, videos, vlogs, gallery assets, social links,
 * and feature flags. Edit this file to update site figures or add new work.
 */

const PORTFOLIO_CONFIG = {
  // General Profile
  profile: {
    name: "Aishwarya Harishankar",
    tagline: "Actress · Model · Digital Creator",
    location: "Pune, India",
    businessEmail: "[ADD BUSINESS EMAIL]", // Placeholder: replace with official business email
    formspreeEndpoint: "https://formspree.io/f/[ADD FORMSPREE ID]", // Placeholder: replace with your Formspree form ID
    heroImages: [
      {
        src: "./p1.jpg",
        alt: "Aishwarya Harishankar starring in Atha Petha Azhakay",
        caption: "Atha Petha Azhakay (4.4M Views)"
      },
      {
        src: "./p2.jpg",
        alt: "Aishwarya Harishankar in Lipstick musical production",
        caption: "Lipstick (277K Views)"
      },
      {
        src: "./p3.jpg",
        alt: "Aishwarya Harishankar in Mazya Sonya Marathi hit song",
        caption: "Mazya Sonya (20M Views)"
      }
    ],
    // 100-120 word verified bio
    bio: "Based in Pune, India, Aishwarya Harishankar is an actress, model, and digital creator known for her expressive screen presence across multilingual entertainment. Holding a Bachelor’s degree in Psychology, she brings depth and emotional nuance to her performances, headlining chart-topping music videos like Mazya Sonya (20M+ views) and Atha Petha Azhakay (4.4M+ views), as well as intense thriller short films. Beyond the camera, she connects with an audience of over 1.4 million across social platforms, earning YouTube's prestigious Silver Creator Award. Multilingual and versatile, she continually explores impactful roles across cinema, music, and digital storytelling.",
    languages: [
      { name: "Marathi", level: "Native / Fluent", nativeText: "मराठी" },
      { name: "Hindi", level: "Fluent", nativeText: "हिन्दी" },
      { name: "Tamil", level: "Fluent", nativeText: "தமிழ்" },
      { name: "Telugu", level: "Conversational", nativeText: "తెలుగు" },
      { name: "French", level: "Elementary", nativeText: "Français" }
    ],
    skills: [
      "Screen Acting & Dialogue Delivery",
      "Emotional Nuance & Character Depth",
      "Classical & Contemporary Dance",
      "Camera Facing & Posing",
      "Voice Modulation",
      "Brand Storytelling & Lifestyle Content"
    ]
  },

  // Feature Flags
  features: {
    // Diwali celebration overlay (off by default per instructions)
    diwaliCelebration: false,
    // Background audio playback (off by default, toggleable via header button)
    backgroundAudio: false,
    audioTracks: ["card3.mp3", "card1.mp3", "card2.mp3"]
  },

  // Social Links
  socials: [
    {
      platform: "Instagram",
      handle: "@aishwaryaharishankar",
      url: "https://www.instagram.com/aishwaryaharishankar/",
      followers: "1.4M+",
      icon: "instagram"
    },
    {
      platform: "YouTube",
      handle: "@aish_harishankar",
      url: "https://www.youtube.com/@aish_harishankar",
      followers: "195K+",
      icon: "youtube"
    },
    {
      platform: "Facebook",
      handle: "Aishwarya Harishankar",
      url: "https://www.facebook.com/people/Aishwarya-Harishankar/100075923654829/",
      followers: "276K+",
      icon: "facebook"
    },
    {
      platform: "Threads",
      handle: "@aishwaryaharishankar",
      url: "https://www.threads.com/@aishwaryaharishankar",
      followers: "91K+",
      icon: "threads"
    },
    {
      platform: "Snapchat",
      handle: "@aishwarya_8900",
      url: "https://www.snapchat.com/@aishwarya_8900",
      followers: "31K+",
      icon: "snapchat"
    },
    {
      platform: "X",
      handle: "@aishharishankar",
      url: "https://x.com/aishharishankar",
      followers: "3K+",
      icon: "x"
    }
  ],

  // Stats Strip (used for animated count-up on scroll)
  stats: [
    {
      id: "instagram",
      label: "Instagram Community",
      targetValue: 1.4,
      displayPrefix: "",
      displaySuffix: "M+",
      subtext: "Engaged Followers"
    },
    {
      id: "youtube",
      label: "YouTube Subscribers",
      targetValue: 195,
      displayPrefix: "",
      displaySuffix: "K+",
      subtext: "Silver Creator Award"
    },
    {
      id: "music-views",
      label: "Music Video Views",
      targetValue: 25,
      displayPrefix: "",
      displaySuffix: "M+",
      subtext: "Across Chartbusters"
    },
    {
      id: "facebook",
      label: "Facebook Reach",
      targetValue: 276,
      displayPrefix: "",
      displaySuffix: "K+",
      subtext: "Active Audience"
    },
    {
      id: "threads",
      label: "Threads Community",
      targetValue: 91,
      displayPrefix: "",
      displaySuffix: "K+",
      subtext: "Conversational Reach"
    }
  ],

  // Featured Work (Music Videos & Short Films)
  // All YouTube links strictly formatted as: https://youtu.be/<ID>?t=0
  featuredWork: [
    // --- MUSIC VIDEOS ---
    {
      id: "mazya-sonya",
      title: "Mazya Sonya",
      nativeTitle: "माझ्या सोन्या",
      category: "music",
      views: "20M",
      role: "Lead Cast",
      genre: "Marathi Romantic Song",
      credit: "Featuring Aishwarya Harishankar",
      youtubeUrl: "https://youtu.be/SHM06YvO-kQ?t=0",
      thumbnail: "https://img.youtube.com/vi/SHM06YvO-kQ/hqdefault.jpg",
      highlight: "Mega Hit — 20 Million+ Views"
    },
    {
      id: "atha-petha-azhakay",
      title: "Atha Petha Azhakay",
      nativeTitle: "அத்தா பெத்த அழகே",
      category: "music",
      views: "4.4M",
      role: "Lead Cast",
      genre: "Tamil Album Song",
      credit: "Starring Fayaz & Aishwarya Harishankar",
      youtubeUrl: "https://youtu.be/pBo_wOG9Ya0?t=0",
      thumbnail: "https://img.youtube.com/vi/pBo_wOG9Ya0/hqdefault.jpg",
      highlight: "4.4M Views on YouTube"
    },
    {
      id: "lal-bindi",
      title: "Lal Bindi",
      nativeTitle: "लाल बिंदी",
      category: "music",
      views: "977K",
      role: "Lead Cast",
      genre: "Marathi Folk-Pop",
      credit: "Featuring Aishwarya Harishankar",
      youtubeUrl: "https://youtu.be/IEPJ8bUiIPA?t=0",
      thumbnail: "./thumbnail/hq720.jpg",
      highlight: "977K Views"
    },
    {
      id: "lipstick",
      title: "Lipstick",
      nativeTitle: "Lipstick 💄",
      category: "music",
      views: "277K",
      role: "Lead Cast",
      genre: "Commercial Pop",
      credit: "Saisagar Entertainment",
      youtubeUrl: "https://youtu.be/UOpCGKkOx0c?t=0",
      thumbnail: "https://img.youtube.com/vi/UOpCGKkOx0c/hqdefault.jpg",
      highlight: "277K Views"
    },
    {
      id: "gori-gori-paaan",
      title: "Gori Gori Paaan",
      nativeTitle: "गोरी गोरी पान",
      category: "music",
      views: "20K",
      role: "Lead Cast",
      genre: "Marathi Traditional Dance",
      credit: "Music Video",
      youtubeUrl: "https://youtu.be/q3g9E5xRw-o?t=0",
      thumbnail: "https://img.youtube.com/vi/q3g9E5xRw-o/hqdefault.jpg",
      highlight: "20K Views"
    },
    {
      id: "upcoming-music",
      title: "Upcoming Music Release",
      nativeTitle: "लवकरच येत आहे",
      category: "music",
      views: "Coming Soon",
      role: "Lead Cast",
      genre: "Official Music Video",
      credit: "In Production",
      isComingSoon: true,
      youtubeUrl: null,
      thumbnail: "./p1.jpg",
      highlight: "Coming Soon"
    },

    // --- SHORT FILMS & THRILLERS ---
    {
      id: "hide-n-seek",
      title: "Hide N Seek",
      nativeTitle: "Hide & Seek",
      category: "film",
      views: "41K",
      role: "Lead Actress",
      genre: "Psychological Thriller",
      credit: "Starring Aishwarya Harishankar",
      youtubeUrl: "https://youtu.be/zA6cRKmbj6g?t=0",
      thumbnail: "https://img.youtube.com/vi/zA6cRKmbj6g/hqdefault.jpg",
      highlight: "41K Views"
    },
    {
      id: "adharcard",
      title: "Adharcard",
      nativeTitle: "आधारकार्ड",
      category: "film",
      views: "33K",
      role: "Lead & Producer",
      genre: "Social Drama / Suspense",
      credit: "Produced by Aishwarya Harishankar",
      youtubeUrl: "https://youtu.be/5HcJUAdoTls?t=0",
      thumbnail: "https://img.youtube.com/vi/5HcJUAdoTls/hqdefault.jpg",
      highlight: "33K Views · Produced by Aishwarya"
    },
    {
      id: "band-aid",
      title: "Band Aid",
      nativeTitle: "Band Aid",
      category: "film",
      views: "30K",
      role: "Lead Actress",
      genre: "Emotional Drama",
      credit: "Starring Aishwarya Harishankar",
      youtubeUrl: "https://youtu.be/erCw6DZwtKw?t=0",
      thumbnail: "https://img.youtube.com/vi/erCw6DZwtKw/hqdefault.jpg",
      highlight: "30K Views"
    },
    {
      id: "whisper",
      title: "Whisper",
      nativeTitle: "Whisper",
      category: "film",
      views: "18K",
      role: "Lead Actress",
      genre: "Horror / Mystery",
      credit: "Starring Aishwarya Harishankar",
      youtubeUrl: "https://youtu.be/NLbR4Ldr5Lk?t=0",
      thumbnail: "https://img.youtube.com/vi/NLbR4Ldr5Lk/hqdefault.jpg",
      highlight: "18K Views"
    },
    {
      id: "upcoming-film",
      title: "Upcoming Short Film",
      nativeTitle: "लवकरच येत आहे",
      category: "film",
      views: "Coming Soon",
      role: "Lead Role",
      genre: "Dramatic Thriller",
      credit: "Pre-Production",
      isComingSoon: true,
      youtubeUrl: null,
      thumbnail: "./p2.jpg",
      highlight: "Coming Soon"
    }
  ],

  // Creator Corner (Her Videos, Vlogs & BTS)
  // All YouTube links strictly formatted as: https://youtu.be/<ID>?t=0
  vlogs: [
    {
      id: "atha-petha-bts",
      title: "Atha Petha Azhakay (Behind The Scenes)",
      views: "130K",
      tag: "Vlog / BTS",
      duration: "Behind The Scenes",
      youtubeUrl: "https://youtu.be/_JXtFtg_4wY?t=0",
      thumbnail: "https://img.youtube.com/vi/_JXtFtg_4wY/hqdefault.jpg"
    },
    {
      id: "introducing-myself",
      title: "Introducing Myself!",
      views: "33K",
      tag: "Personal Vlog",
      duration: "Creator Journey",
      youtubeUrl: "https://youtu.be/yFvTFv1gZoI?t=0",
      thumbnail: "https://img.youtube.com/vi/yFvTFv1gZoI/hqdefault.jpg"
    },
    {
      id: "toxic-launch",
      title: "I Got Invited to the Toxic Album Launch!",
      views: "18K",
      tag: "Event Vlog",
      duration: "Industry Event",
      youtubeUrl: "https://youtu.be/b-XQV7ZPJHw?t=0",
      thumbnail: "https://img.youtube.com/vi/b-XQV7ZPJHw/hqdefault.jpg"
    },
    {
      id: "qna-part1",
      title: "I Answered Your Most Asked Questions! (Part 1)",
      views: "17K",
      tag: "Q&A Special",
      duration: "Fan Interaction",
      youtubeUrl: "https://youtu.be/XVxcnrA62u8?t=0",
      thumbnail: "https://img.youtube.com/vi/XVxcnrA62u8/hqdefault.jpg"
    },
    {
      id: "silver-play-button",
      title: "100K Silver Play Button Unboxing!",
      views: "11K",
      tag: "Milestone Vlog",
      duration: "YouTube Creator Award",
      youtubeUrl: "https://youtu.be/DYOYsIkO51o?t=0",
      thumbnail: "https://img.youtube.com/vi/DYOYsIkO51o/hqdefault.jpg"
    },
    {
      id: "qna-part2",
      title: "Finally Answering Your Questions! (Part 2)",
      views: "11K",
      tag: "Q&A Special",
      duration: "Fan Interaction",
      youtubeUrl: "https://youtu.be/gMTcJG01nB4?t=0",
      thumbnail: "https://img.youtube.com/vi/gMTcJG01nB4/hqdefault.jpg"
    },
    {
      id: "lipstick-bts",
      title: "Lipstick (Behind The Scenes)",
      views: "9K",
      tag: "Vlog / BTS",
      duration: "Song Shoot",
      youtubeUrl: "https://youtu.be/RVQHta75gIs?t=0",
      thumbnail: "https://img.youtube.com/vi/RVQHta75gIs/hqdefault.jpg"
    }
  ],

  // Gallery Photos (from section2/)
  // Descriptive alt text for high accessibility and SEO
  gallery: [
    {
      id: "gal-1",
      src: "./section2/1w.png",
      alt: "Aishwarya Harishankar in an elegant black ethnic saree, studio portrait",
      title: "Editorial Black Saree",
      category: "Traditional & Ethnic"
    },
    {
      id: "gal-2",
      src: "./section2/2w.png",
      alt: "Aishwarya Harishankar expressive cinematic close-up portrait with soft warm lighting",
      title: "Cinematic Warmth",
      category: "Expressions & Close-up"
    },
    {
      id: "gal-3",
      src: "./section2/3w.png",
      alt: "Aishwarya Harishankar in modern ethnic attire, graceful profile angle",
      title: "Grace & Poise",
      category: "Traditional & Ethnic"
    },
    {
      id: "gal-4",
      src: "./section2/4w.jpg",
      alt: "Aishwarya Harishankar candid warm outdoor portrait smiling naturally",
      title: "Golden Hour Glow",
      category: "Candid & Outdoor"
    },
    {
      id: "gal-5",
      src: "./section2/5w.png",
      alt: "Aishwarya Harishankar in vibrant traditional drape, festive Indian look",
      title: "Festive Splendor",
      category: "Festive Attire"
    },
    {
      id: "gal-6",
      src: "./section2/6w.png",
      alt: "Aishwarya Harishankar high-fashion editorial aesthetic studio portrait",
      title: "Editorial Edge",
      category: "High Fashion"
    },
    {
      id: "gal-7",
      src: "./section2/7w.png",
      alt: "Aishwarya Harishankar radiant natural smile with soft bokeh lighting",
      title: "Luminous Smile",
      category: "Portraiture"
    },
    {
      id: "gal-8",
      src: "./section2/8w.png",
      alt: "Aishwarya Harishankar dramatic cinematic look with bold expressive styling",
      title: "Dramatic Aura",
      category: "Cinematic Drama"
    },
    {
      id: "gal-9",
      src: "./section2/9w.png",
      alt: "Aishwarya Harishankar serene traditional look with floral styling and delicate jewelry",
      title: "Timeless Elegance",
      category: "Traditional & Ethnic"
    },
    {
      id: "gal-10",
      src: "./section2/10w.png",
      alt: "Aishwarya Harishankar contemporary chic photoshoot pose in natural studio light",
      title: "Contemporary Chic",
      category: "Modern Editorial"
    }
  ]
};

// Freeze configuration in production to prevent unintended runtime modification
if (typeof Object.freeze === "function") {
  Object.freeze(PORTFOLIO_CONFIG);
}

