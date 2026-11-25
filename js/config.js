/**
 * ============================================================================
 * AISHWARYA HARISHANKAR — PORTFOLIO CONFIGURATION
 * ============================================================================
 * Single source of truth for all portfolio sections, media items, stats,
 * social profiles, and feature flags.
 * Add a new item to any array below and the page updates automatically.
 *
 * All YouTube links follow the verified format: https://youtu.be/<ID>?t=0
 * Unknown fields are marked as placeholders [ADD ...] — never fabricated.
 */

const PORTFOLIO_CONFIG = {
  // --------------------------------------------------------------------------
  // 1. PROFILE & VERIFIED BIO
  // --------------------------------------------------------------------------
  profile: {
    name: "Aishwarya Harishankar",
    tagline: "Actress · Model · Digital Creator",
    location: "Pune, India",
    businessEmail: "[ADD BUSINESS EMAIL]", // Placeholder: replace with official business email
    formspreeEndpoint: "https://formspree.io/f/[ADD FORMSPREE ID]", // Placeholder: replace with your Formspree form ID
    heroImage: "./p3.jpg",
    // Verified facts only — edit copy freely as needed
    bio: "Based in Pune, India, Aishwarya Harishankar is an actress, model, and digital creator recognized for expressive performances across multilingual entertainment. A Psychology graduate, she brings emotional nuance to chart-topping music videos like Mazya Sonya (20M+ views) and Atha Petha Azhakay (4.4M+ views) alongside psychological thriller short films. Honored with the YouTube Silver Creator Award, she connects with over 1.4 million followers across social platforms.",
    highlights: [
      "📍 Pune, India",
      "🎓 B.A. in Psychology",
      "🏆 YouTube 100K Silver Play Button"
    ],
    languages: [
      { name: "Marathi", native: "मराठी" },
      { name: "Hindi", native: "हिन्दी" },
      { name: "Tamil", native: "தமிழ்" },
      { name: "Telugu", native: "తెలుగు" },
      { name: "French", native: "Français" }
    ]
  },

  // --------------------------------------------------------------------------
  // 2. FEATURE FLAGS
  // --------------------------------------------------------------------------
  features: {
    // Optional background audio toggle button in header (off/muted by default)
    showAudioToggle: true,
    audioTracks: ["./card3.mp3", "./card1.mp3", "./card2.mp3"],
    // Diwali popup removed per redesign; flag kept false for easy reference
    diwaliCelebration: false
  },

  // --------------------------------------------------------------------------
  // 3. SOCIAL MEDIA LINKS
  // Primary display order per client requirement: Instagram -> YouTube -> Facebook
  // --------------------------------------------------------------------------
  socials: [
    {
      platform: "Instagram",
      handle: "@aishwaryaharishankar",
      url: "https://www.instagram.com/aishwaryaharishankar/",
      followers: "1.4M+",
      primary: true,
      icon: "instagram"
    },
    {
      platform: "YouTube",
      handle: "@aish_harishankar",
      url: "https://www.youtube.com/@aish_harishankar",
      followers: "195K+",
      primary: true,
      icon: "youtube"
    },
    {
      platform: "Facebook",
      handle: "Aishwarya Harishankar",
      url: "https://www.facebook.com/people/Aishwarya-Harishankar/100075923654829/",
      followers: "276K+",
      primary: true,
      icon: "facebook"
    },
    {
      platform: "Threads",
      handle: "@aishwaryaharishankar",
      url: "https://www.threads.com/@aishwaryaharishankar",
      followers: "91K+",
      primary: false,
      icon: "threads"
    },
    {
      platform: "Snapchat",
      handle: "@aishwarya_8900",
      url: "https://www.snapchat.com/@aishwarya_8900",
      followers: "31K+",
      primary: false,
      icon: "snapchat"
    },
    {
      platform: "X",
      handle: "@aishharishankar",
      url: "https://x.com/aishharishankar",
      followers: "3K+",
      primary: false,
      icon: "x"
    }
  ],

  // --------------------------------------------------------------------------
  // 4. AUDIENCE REACH SNAPSHOT
  // --------------------------------------------------------------------------
  stats: [
    {
      id: "instagram",
      label: "Instagram",
      target: 1.4,
      suffix: "M+"
    },
    {
      id: "music-views",
      label: "Music Video Views",
      target: 25,
      suffix: "M+"
    },
    {
      id: "facebook",
      label: "Facebook",
      target: 276,
      suffix: "K+"
    },
    {
      id: "youtube",
      label: "YouTube",
      target: 195,
      suffix: "K+"
    }
  ],

  // --------------------------------------------------------------------------
  // 5. HERO OTT HORIZONTAL CAROUSEL — LATEST MUSIC VIDEOS
  // Uncropped 4:5 portrait posters + clean 16:9 releases in scrollable OTT cards
  // --------------------------------------------------------------------------
  ottHighlights: [
    {
      id: "ott-mazya-sonya",
      title: "Mazya Sonya",
      nativeTitle: "माझ्या सोन्या",
      categoryTag: "Marathi Music Video",
      views: "20M Views",
      poster: "./p3.jpg",
      posterWidth: 1105,
      posterHeight: 1423,
      isPortraitPoster: true,
      alt: "Aishwarya Harishankar in brown ethnic look on Mazya Sonya official poster",
      youtubeUrl: "https://youtu.be/SHM06YvO-kQ?t=0"
    },
    {
      id: "ott-atha-petha",
      title: "Atha Petha Azhakay",
      nativeTitle: "அத்தா பெத்த அழகே",
      categoryTag: "Tamil Music Video",
      views: "4.4M Views",
      poster: "./p1.jpg",
      posterWidth: 1124,
      posterHeight: 1399,
      isPortraitPoster: true,
      alt: "Aishwarya Harishankar in festive green saree with co-star Fayaz for Atha Petha Azhakay",
      youtubeUrl: "https://youtu.be/pBo_wOG9Ya0?t=0"
    },
    {
      id: "ott-lipstick",
      title: "Lipstick",
      nativeTitle: "",
      categoryTag: "Music Video",
      views: "277K Views",
      poster: "./p2.jpg",
      posterWidth: 1114,
      posterHeight: 1412,
      isPortraitPoster: true,
      alt: "Aishwarya Harishankar holding lipstick in a red saree on the Lipstick poster",
      youtubeUrl: "https://youtu.be/UOpCGKkOx0c?t=0"
    },
    {
      id: "ott-lal-bindi",
      title: "Lal Bindi",
      nativeTitle: "लाल बिंदी",
      categoryTag: "Marathi Hit",
      views: "977K Views",
      poster: "./thumbnail/hq720.jpg",
      posterWidth: 686,
      posterHeight: 386,
      isPortraitPoster: false,
      alt: "Aishwarya Harishankar in Lal Bindi official music video thumbnail",
      youtubeUrl: "https://youtu.be/IEPJ8bUiIPA?t=0"
    },
    {
      id: "ott-gori-gori-paaan",
      title: "Gori Gori Paaan",
      nativeTitle: "गोरी गोरी पान",
      categoryTag: "Marathi Dance Single",
      views: "20K Views",
      poster: "https://img.youtube.com/vi/q3g9E5xRw-o/hqdefault.jpg",
      posterWidth: 480,
      posterHeight: 360,
      isPortraitPoster: false,
      alt: "Gori Gori Paaan music video featuring Aishwarya Harishankar",
      youtubeUrl: "https://youtu.be/q3g9E5xRw-o?t=0"
    }
  ],

  // --------------------------------------------------------------------------
  // 6. SECTION: MUSIC VIDEOS (Ordered by views descending + Coming Soon)
  // --------------------------------------------------------------------------
  musicVideos: [
    {
      id: "mazya-sonya",
      title: "Mazya Sonya",
      nativeTitle: "माझ्या सोन्या",
      views: "20M",
      tag: "Marathi",
      youtubeUrl: "https://youtu.be/SHM06YvO-kQ?t=0",
      thumbnail: "https://img.youtube.com/vi/SHM06YvO-kQ/hqdefault.jpg",
      fallback: "./p3.jpg",
      alt: "Mazya Sonya official music video featuring Aishwarya Harishankar"
    },
    {
      id: "atha-petha-azhakay",
      title: "Atha Petha Azhakay",
      nativeTitle: "அத்தா பெத்த அழகே",
      views: "4.4M",
      tag: "Tamil",
      youtubeUrl: "https://youtu.be/pBo_wOG9Ya0?t=0",
      thumbnail: "https://img.youtube.com/vi/pBo_wOG9Ya0/hqdefault.jpg",
      fallback: "./p1.jpg",
      alt: "Atha Petha Azhakay music video featuring Aishwarya Harishankar"
    },
    {
      id: "lal-bindi",
      title: "Lal Bindi",
      nativeTitle: "लाल बिंदी",
      views: "977K",
      tag: "Marathi",
      youtubeUrl: "https://youtu.be/IEPJ8bUiIPA?t=0",
      thumbnail: "./thumbnail/hq720.jpg",
      fallback: "https://img.youtube.com/vi/IEPJ8bUiIPA/hqdefault.jpg",
      alt: "Lal Bindi official Marathi music video featuring Aishwarya Harishankar"
    },
    {
      id: "lipstick",
      title: "Lipstick",
      nativeTitle: "",
      views: "277K",
      tag: "Pop Single",
      youtubeUrl: "https://youtu.be/UOpCGKkOx0c?t=0",
      thumbnail: "https://img.youtube.com/vi/UOpCGKkOx0c/hqdefault.jpg",
      fallback: "./p2.jpg",
      alt: "Lipstick official music video featuring Aishwarya Harishankar"
    },
    {
      id: "gori-gori-paaan",
      title: "Gori Gori Paaan",
      nativeTitle: "गोरी गोरी पान",
      views: "20K",
      tag: "Marathi",
      youtubeUrl: "https://youtu.be/q3g9E5xRw-o?t=0",
      thumbnail: "https://img.youtube.com/vi/q3g9E5xRw-o/hqdefault.jpg",
      fallback: "./p2.jpg",
      alt: "Gori Gori Paaan official music video featuring Aishwarya Harishankar"
    },
    {
      id: "upcoming-music",
      title: "Upcoming Music Release",
      nativeTitle: "",
      views: "Coming Soon",
      tag: "Upcoming",
      isComingSoon: true,
      youtubeUrl: null,
      thumbnail: "./p1.jpg",
      alt: "Upcoming music video release featuring Aishwarya Harishankar"
    }
  ],

  // --------------------------------------------------------------------------
  // 7. SECTION: SHORT FILMS
  // --------------------------------------------------------------------------
  shortFilms: [
    {
      id: "hide-n-seek",
      title: "Hide N Seek",
      views: "41K",
      tag: "Psychological Thriller",
      youtubeUrl: "https://youtu.be/zA6cRKmbj6g?t=0",
      thumbnail: "https://img.youtube.com/vi/zA6cRKmbj6g/hqdefault.jpg",
      fallback: "./section2/3w.png",
      alt: "Hide N Seek thriller short film starring Aishwarya Harishankar"
    },
    {
      id: "adharcard",
      title: "Adharcard",
      views: "33K",
      tag: "Lead & Producer",
      youtubeUrl: "https://youtu.be/5HcJUAdoTls?t=0",
      thumbnail: "https://img.youtube.com/vi/5HcJUAdoTls/hqdefault.jpg",
      fallback: "./section2/6w.png",
      alt: "Adharcard short film starring and produced by Aishwarya Harishankar"
    },
    {
      id: "band-aid",
      title: "Band Aid",
      views: "30K",
      tag: "Suspense",
      youtubeUrl: "https://youtu.be/erCw6DZwtKw?t=0",
      thumbnail: "https://img.youtube.com/vi/erCw6DZwtKw/hqdefault.jpg",
      fallback: "./section2/4w.jpg",
      alt: "Band Aid suspense short film starring Aishwarya Harishankar"
    },
    {
      id: "whisper",
      title: "Whisper",
      views: "18K",
      tag: "Horror Short",
      youtubeUrl: "https://youtu.be/NLbR4Ldr5Lk?t=0",
      thumbnail: "https://img.youtube.com/vi/NLbR4Ldr5Lk/hqdefault.jpg",
      fallback: "./section2/1w.png",
      alt: "Whisper horror short film starring Aishwarya Harishankar"
    },
    {
      id: "upcoming-film",
      title: "Upcoming Short Film",
      views: "Coming Soon",
      tag: "In Development",
      isComingSoon: true,
      youtubeUrl: null,
      thumbnail: "./p2.jpg",
      alt: "Upcoming short film starring Aishwarya Harishankar"
    }
  ],

  // --------------------------------------------------------------------------
  // 8. SECTION: ACTING PROJECTS
  // Real verified credits + clearly marked placeholder slots for upcoming roles
  // --------------------------------------------------------------------------
  actingProjects: [
    {
      id: "act-adharcard",
      title: "Adharcard",
      role: "Lead Actress & Producer",
      format: "Short Film",
      image: "https://img.youtube.com/vi/5HcJUAdoTls/hqdefault.jpg",
      fallback: "./section2/6w.png",
      alt: "Aishwarya Harishankar in Adharcard",
      youtubeUrl: "https://youtu.be/5HcJUAdoTls?t=0",
      isPlaceholder: false
    },
    {
      id: "act-hide-n-seek",
      title: "Hide N Seek",
      role: "Lead Actress",
      format: "Psychological Thriller",
      image: "https://img.youtube.com/vi/zA6cRKmbj6g/hqdefault.jpg",
      fallback: "./section2/3w.png",
      alt: "Aishwarya Harishankar in Hide N Seek",
      youtubeUrl: "https://youtu.be/zA6cRKmbj6g?t=0",
      isPlaceholder: false
    },
    {
      id: "act-showreel",
      title: "Acting Showreel & Screen Tests",
      role: "[ADD SHOWREEL TITLE / ROLE]",
      format: "Showreel",
      image: "./section2/8w.png",
      alt: "Aishwarya Harishankar editorial portrait for casting showreel",
      url: null, // Replace with YouTube showreel link when available
      isPlaceholder: true
    },
    {
      id: "act-upcoming-screen",
      title: "[ADD UPCOMING FILM / SERIES]",
      role: "Open for Casting",
      format: "Feature / OTT",
      image: "./section2/9w.png",
      alt: "Aishwarya Harishankar portrait for upcoming acting announcement",
      url: "#contact",
      isPlaceholder: true
    }
  ],

  // --------------------------------------------------------------------------
  // 9. SECTION: BRAND COLLABORATIONS
  // Showcase pillars backed by verified audience reach + placeholder slots
  // --------------------------------------------------------------------------
  brandCollaborations: [
    {
      id: "brand-fashion",
      title: "Fashion & Ethnic Wear",
      metric: "1.4M+ Instagram",
      tag: "Lookbooks & Editorial Reels",
      image: "./section2/1w.png",
      alt: "Aishwarya Harishankar ethnic portrait look",
      url: "#contact",
      isPlaceholder: false
    },
    {
      id: "brand-beauty",
      title: "Beauty & Lifestyle",
      metric: "276K+ Facebook",
      tag: "Product Integrations",
      image: "./section2/10w.png",
      alt: "Aishwarya Harishankar lifestyle portrait look",
      url: "#contact",
      isPlaceholder: false
    },
    {
      id: "brand-campaigns",
      title: "Digital & Music Campaigns",
      metric: "25M+ Video Views",
      tag: "Promotional Features",
      image: "./section2/5w.png",
      alt: "Aishwarya Harishankar traditional portrait look",
      url: "#contact",
      isPlaceholder: false
    },
    {
      id: "brand-partner-slot",
      title: "[ADD FEATURED BRAND CAMPAIGN]",
      metric: "Partner Slot",
      tag: "Collaborate",
      image: "./section2/7w.png",
      alt: "Aishwarya Harishankar portrait for brand partnership inquiries",
      url: "#contact",
      isPlaceholder: true
    }
  ],

  // --------------------------------------------------------------------------
  // 10. SECTION: EVENTS & MILESTONES
  // Verified appearances & milestones from her channel + upcoming event slot
  // --------------------------------------------------------------------------
  events: [
    {
      id: "event-toxic-launch",
      title: "Toxic Album Launch",
      views: "18K Views",
      tag: "Red Carpet & Event",
      image: "https://img.youtube.com/vi/DYOYsIkO51o/hqdefault.jpg",
      fallback: "./p2.jpg",
      alt: "Aishwarya Harishankar at the Toxic Album Launch event",
      youtubeUrl: "https://youtu.be/DYOYsIkO51o?t=0",
      isPlaceholder: false
    },
    {
      id: "event-silver-button",
      title: "100K Silver Play Button",
      views: "11K Views",
      tag: "YouTube Milestone",
      image: "https://img.youtube.com/vi/RVQHta75gIs/hqdefault.jpg",
      fallback: "./p3.jpg",
      alt: "Aishwarya Harishankar 100K Silver Play Button milestone celebration",
      youtubeUrl: "https://youtu.be/RVQHta75gIs?t=0",
      isPlaceholder: false
    },
    {
      id: "event-upcoming",
      title: "[ADD UPCOMING APPEARANCE / EVENT]",
      views: "Bookings Open",
      tag: "Live Events",
      image: "./section2/2w.png",
      alt: "Aishwarya Harishankar portrait for event appearances",
      youtubeUrl: null,
      isPlaceholder: true
    }
  ],

  // --------------------------------------------------------------------------
  // 11. CREATOR CORNER (All 7 verified Vlogs & BTS videos)
  // Exact YouTube ID <-> Title mapping audited from original site
  // --------------------------------------------------------------------------
  vlogs: [
    {
      id: "atha-petha-bts",
      title: "Atha Petha Azhakay BTS",
      views: "130K",
      tag: "Behind The Scenes",
      youtubeUrl: "https://youtu.be/_JXtFtg_4wY?t=0",
      thumbnail: "https://img.youtube.com/vi/_JXtFtg_4wY/hqdefault.jpg",
      fallback: "./p1.jpg",
      alt: "Atha Petha Azhakay behind the scenes vlog with Aishwarya Harishankar"
    },
    {
      id: "introducing-myself",
      title: "Introducing Myself!",
      views: "33K",
      tag: "Creator Debut",
      youtubeUrl: "https://youtu.be/XVxcnrA62u8?t=0",
      thumbnail: "https://img.youtube.com/vi/XVxcnrA62u8/hqdefault.jpg",
      fallback: "./section2/1w.png",
      alt: "Introducing Myself official vlog by Aishwarya Harishankar"
    },
    {
      id: "toxic-launch",
      title: "Toxic Album Launch Vlog",
      views: "18K",
      tag: "Event Vlog",
      youtubeUrl: "https://youtu.be/DYOYsIkO51o?t=0",
      thumbnail: "https://img.youtube.com/vi/DYOYsIkO51o/hqdefault.jpg",
      fallback: "./p2.jpg",
      alt: "Toxic Album Launch event vlog featuring Aishwarya Harishankar"
    },
    {
      id: "qna-part1",
      title: "I Answered Your Questions! (Part 1)",
      views: "17K",
      tag: "Q&A Special",
      youtubeUrl: "https://youtu.be/b-XQV7ZPJHw?t=0",
      thumbnail: "https://img.youtube.com/vi/b-XQV7ZPJHw/hqdefault.jpg",
      fallback: "./section2/2w.png",
      alt: "Fan Q&A Part 1 vlog with Aishwarya Harishankar"
    },
    {
      id: "silver-play-button",
      title: "100K Silver Play Button Unboxing!",
      views: "11K",
      tag: "Milestone",
      youtubeUrl: "https://youtu.be/RVQHta75gIs?t=0",
      thumbnail: "https://img.youtube.com/vi/RVQHta75gIs/hqdefault.jpg",
      fallback: "./p3.jpg",
      alt: "Aishwarya Harishankar unboxing her YouTube Silver Play Button"
    },
    {
      id: "qna-part2",
      title: "Finally Answering Your Questions! (Part 2)",
      views: "11K",
      tag: "Q&A Special",
      youtubeUrl: "https://youtu.be/gMTcJG01nB4?t=0",
      thumbnail: "https://img.youtube.com/vi/gMTcJG01nB4/hqdefault.jpg",
      fallback: "./p1.jpg",
      alt: "Fan Q&A Part 2 vlog with Aishwarya Harishankar"
    },
    {
      id: "lipstick-bts",
      title: "Lipstick Behind The Scenes",
      views: "9K",
      tag: "Behind The Scenes",
      youtubeUrl: "https://youtu.be/yFvTFv1gZoI?t=0",
      thumbnail: "https://img.youtube.com/vi/yFvTFv1gZoI/hqdefault.jpg",
      fallback: "./p2.jpg",
      alt: "Lipstick song shoot behind the scenes with Aishwarya Harishankar"
    }
  ],

  // --------------------------------------------------------------------------
  // 12. PHOTO GALLERY (All 10 assets from section2/ with exact dimensions)
  // --------------------------------------------------------------------------
  gallery: [
    { id: "gal-1", src: "./section2/1w.png", width: 768, height: 1280, alt: "Aishwarya Harishankar — Look 1", title: "Look 01" },
    { id: "gal-2", src: "./section2/2w.png", width: 744, height: 1328, alt: "Aishwarya Harishankar — Look 2", title: "Look 02" },
    { id: "gal-3", src: "./section2/3w.png", width: 888, height: 1112, alt: "Aishwarya Harishankar — Look 3", title: "Look 03" },
    { id: "gal-4", src: "./section2/4w.jpg", width: 1080, height: 1080, alt: "Aishwarya Harishankar close-up natural indoor portrait", title: "Look 04" },
    { id: "gal-5", src: "./section2/5w.png", width: 864, height: 1152, alt: "Aishwarya Harishankar — Look 5", title: "Look 05" },
    { id: "gal-6", src: "./section2/6w.png", width: 1792, height: 2390, alt: "Aishwarya Harishankar — Look 6", title: "Look 06" },
    { id: "gal-7", src: "./section2/7w.png", width: 744, height: 1320, alt: "Aishwarya Harishankar — Look 7", title: "Look 07" },
    { id: "gal-8", src: "./section2/8w.png", width: 1536, height: 2048, alt: "Aishwarya Harishankar — Look 8", title: "Look 08" },
    { id: "gal-9", src: "./section2/9w.png", width: 1973, height: 2631, alt: "Aishwarya Harishankar — Look 9", title: "Look 09" },
    { id: "gal-10", src: "./section2/10w.png", width: 448, height: 662, alt: "Aishwarya Harishankar — Look 10", title: "Look 10" }
  ]
};

if (typeof Object.freeze === "function") {
  Object.freeze(PORTFOLIO_CONFIG);
}
