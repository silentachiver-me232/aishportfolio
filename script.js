/**
 * AISHWARYA HARISHANKAR PORTFOLIO — MODERN REDESIGN JAVASCRIPT
 * Features:
 * - OTT / Netflix-Style Horizontal Hero Carousel (Scroll-Snap & Navigation)
 * - Sticky Navigation Bar with Scroll-Spy Active State Highlighting
 * - Simplified Audio Player (Click-to-Play MP3 Samples)
 * - [Preserved] Easter Egg Secret Vault (5 Clicks on Avatar with SHA-256 + XOR Decryption)
 * - [Preserved] Geolocation Capture & Web3Forms Integration
 * - [Preserved] Site Permissions & Privacy Disclaimer Popup
 * - [Preserved] Diwali 5-Second Celebration Canvas Fireworks
 */

document.addEventListener("DOMContentLoaded", () => {

  // ==========================================================================
  // 1. OTT / NETFLIX-STYLE HERO CAROUSEL CONTROLLER
  // ==========================================================================
  (function initHeroCarousel() {
    const viewport = document.getElementById("heroCarouselViewport");
    const track = document.getElementById("heroCarouselTrack");
    const slides = Array.from(document.querySelectorAll(".carousel-slide"));
    const prevBtn = document.getElementById("carouselPrevBtn");
    const nextBtn = document.getElementById("carouselNextBtn");
    const dotsContainer = document.getElementById("carouselDots");
    const dots = Array.from(document.querySelectorAll(".carousel-dots .dot"));

    if (!viewport || !slides.length) return;

    let currentIndex = 0;

    function getCenteredOffset(targetSlide) {
      const viewportWidth = viewport.clientWidth;
      const slideWidth = targetSlide.clientWidth;
      return targetSlide.offsetLeft - (viewportWidth - slideWidth) / 2;
    }

    function scrollToSlide(index) {
      if (index < 0) index = 0;
      if (index >= slides.length) index = slides.length - 1;
      currentIndex = index;
      const targetSlide = slides[index];
      if (targetSlide) {
        viewport.scrollTo({
          left: getCenteredOffset(targetSlide),
          behavior: "smooth"
        });
      }
      updateDots(index);
    }

    function updateDots(activeIdx) {
      dots.forEach((dot, idx) => {
        if (idx === activeIdx) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        scrollToSlide(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        scrollToSlide(currentIndex + 1);
      });
    }

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const targetIdx = parseInt(dot.getAttribute("data-slide"), 10);
        if (!isNaN(targetIdx)) {
          scrollToSlide(targetIdx);
        }
      });
    });

    // Sync dots on scroll
    let scrollTimeout = null;
    viewport.addEventListener("scroll", () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;
        let closestIdx = 0;
        let closestDist = Infinity;

        slides.forEach((slide, idx) => {
          const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
          const dist = Math.abs(viewportCenter - slideCenter);
          if (dist < closestDist) {
            closestDist = dist;
            closestIdx = idx;
          }
        });

        currentIndex = closestIdx;
        updateDots(closestIdx);
      }, 60);
    }, { passive: true });

    // Keyboard navigation
    window.addEventListener("keydown", (e) => {
      if (document.activeElement && (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA")) {
        return;
      }
      if (e.key === "ArrowLeft") {
        scrollToSlide(currentIndex - 1);
      } else if (e.key === "ArrowRight") {
        scrollToSlide(currentIndex + 1);
      }
    });
  })();

  // ==========================================================================
  // 2. STICKY NAV SCROLL-SPY & SMOOTH SCROLLING
  // ==========================================================================
  (function initScrollSpy() {
    const navLinks = Array.from(document.querySelectorAll(".sticky-site-nav .nav-link"));
    const sections = Array.from(document.querySelectorAll(".portfolio-section"));

    if (!navLinks.length || !sections.length) return;

    // Observe active sections
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -65% 0px",
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            const href = link.getAttribute("href").replace("#", "");
            if (href === currentId) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((sec) => observer.observe(sec));
  })();

  // ==========================================================================
  // 3. SIMPLIFIED AUDIO PLAYER (CLICK-TO-PLAY MP3 SAMPLES)
  // ==========================================================================
  (function initAudioPlayer() {
    const audioToggleBtn = document.getElementById("audioToggleBtn");
    const audioIcon = document.getElementById("audioIcon");
    const audioText = document.getElementById("audioText");
    const audioButtons = Array.from(document.querySelectorAll(".btn-slide-audio"));

    let currentAudio = null;
    let currentSrc = null;
    let isPlaying = false;

    function stopCurrentAudio() {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
        currentSrc = null;
        isPlaying = false;
      }
      audioButtons.forEach((btn) => {
        const label = btn.querySelector("span:not(.audio-btn-icon)");
        const icon = btn.querySelector(".audio-btn-icon");
        if (label) label.textContent = "Play Sample";
        if (icon) icon.textContent = "🔊";
      });
      if (audioIcon) audioIcon.textContent = "🔇";
      if (audioText) audioText.textContent = "Click sample to play sound";
    }

    audioButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const src = btn.getAttribute("data-audio-src");
        if (!src) return;

        if (isPlaying && currentSrc === src) {
          // Pause current
          stopCurrentAudio();
          return;
        }

        // Play selected track
        stopCurrentAudio();
        currentAudio = new Audio(src);
        currentAudio.loop = true;
        currentSrc = src;

        currentAudio.play().then(() => {
          isPlaying = true;
          const label = btn.querySelector("span:not(.audio-btn-icon)");
          const icon = btn.querySelector(".audio-btn-icon");
          if (label) label.textContent = "Pause Sample";
          if (icon) icon.textContent = "⏸️";

          if (audioIcon) audioIcon.textContent = "🔊";
          if (audioText) audioText.textContent = "Playing preview audio";
        }).catch((err) => {
          console.warn("Audio playback interrupted or blocked:", err);
          stopCurrentAudio();
        });
      });
    });

    if (audioToggleBtn) {
      audioToggleBtn.addEventListener("click", () => {
        if (isPlaying) {
          stopCurrentAudio();
        } else {
          // Play first available slide track
          const firstBtn = audioButtons[0];
          if (firstBtn) firstBtn.click();
        }
      });
    }
  })();

  // ==========================================================================
  // 4. CONFIDENTIAL VAULT — EASTER EGG (5 CLICKS ON AVATAR) [VERBATIM PRESERVED]
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
    const DESTRUCT_SECONDS = 300;

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

    // Easter Egg: 5 Clicks on Avatar in About Section
    if (avatarRing) {
      var clickCount = 0;
      var clickTimer = null;

      avatarRing.addEventListener("click", function () {
        clickCount++;
        clearTimeout(clickTimer);
        clickTimer = setTimeout(function () {
          clickCount = 0;
        }, 3500);

        avatarRing.classList.remove("avatar-tap-effect");
        void avatarRing.offsetWidth;
        avatarRing.classList.add("avatar-tap-effect");

        if (clickCount >= 5) {
          clickCount = 0;
          openVaultModal();
        }
      });
    }

    if (btnModalClose) btnModalClose.addEventListener("click", closeVaultModal);
    if (modalBackdrop) modalBackdrop.addEventListener("click", closeVaultModal);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modalOverlay && modalOverlay.classList.contains("active")) {
        closeVaultModal();
      }
    });

    if (btnToggle) {
      btnToggle.addEventListener("click", function () {
        var isPass = passInput.getAttribute("type") === "password";
        passInput.setAttribute("type", isPass ? "text" : "password");
        btnToggle.textContent = isPass ? "🙈" : "👁️";
      });
    }

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

        passInput.value = "";
        passInput.blur();

        revealedText.textContent = decryptedMsg;
        isRevealed = true;

        if (disclaimerBox) disclaimerBox.style.display = "none";
        if (lockedState) lockedState.style.display = "none";
        if (revealedState) revealedState.style.display = "flex";

        startSelfDestructTimer(DESTRUCT_SECONDS);
      } else {
        showError("Mot de passe incorrect. Accès refusé.");
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

    function applyDestroyedState() {
      if (destructInterval) clearInterval(destructInterval);
      isRevealed = false;
      CIPHER = null;

      if (revealedText) revealedText.textContent = "";
      if (messageBox) messageBox.innerHTML = "";

      try {
        localStorage.setItem(STORAGE_KEY, "destroyed");
      } catch (e) { }

      if (disclaimerBox) disclaimerBox.style.display = "none";
      if (lockedState) lockedState.style.display = "none";
      if (revealedState) revealedState.style.display = "none";
      if (destroyedState) destroyedState.style.display = "flex";
    }

    if (btnDestroy) {
      btnDestroy.addEventListener("click", function () {
        applyDestroyedState();
      });
    }

    if (resetHint) {
      resetHint.addEventListener("click", function () {
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch (e) { }
        location.reload();
      });
    }
  })();

});
