/**
 * ============================================================================
 * AISHWARYA HARISHANKAR — MAIN APPLICATION LOGIC
 * ============================================================================
 * Handles dynamic rendering from config.js, stats count-up animation,
 * interactive gallery lightbox, theme toggling, filter tabs, and navigation.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Ensure config is loaded
  if (typeof PORTFOLIO_CONFIG === "undefined") {
    console.error("PORTFOLIO_CONFIG is not defined. Ensure js/config.js is loaded first.");
    return;
  }

  const { profile, features, socials, stats, featuredWork, vlogs, gallery } = PORTFOLIO_CONFIG;

  /* ==========================================================================
     1. THEME CONTROLLER (DARK / LIGHT MODE)
     ========================================================================== */
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const htmlRoot = document.documentElement;

  function initTheme() {
    const savedTheme = localStorage.getItem("aish_theme");
    const systemPrefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "dark"); // Default dark luxury

    applyTheme(initialTheme);
  }

  function applyTheme(theme) {
    if (theme === "light") {
      htmlRoot.setAttribute("data-theme", "light");
      if (themeToggleBtn) {
        themeToggleBtn.innerHTML = "🌙";
        themeToggleBtn.setAttribute("aria-label", "Switch to dark theme");
        themeToggleBtn.setAttribute("title", "Switch to dark theme");
      }
    } else {
      htmlRoot.removeAttribute("data-theme");
      if (themeToggleBtn) {
        themeToggleBtn.innerHTML = "☀️";
        themeToggleBtn.setAttribute("aria-label", "Switch to light theme");
        themeToggleBtn.setAttribute("title", "Switch to light theme");
      }
    }
    localStorage.setItem("aish_theme", theme);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = htmlRoot.getAttribute("data-theme") === "light" ? "light" : "dark";
      const newTheme = currentTheme === "light" ? "dark" : "light";
      applyTheme(newTheme);
    });
  }

  initTheme();

  /* ==========================================================================
     2. AUDIO CONTROLLER (MUTED BY DEFAULT)
     ========================================================================== */
  const audioToggleBtn = document.getElementById("audioToggleBtn");
  let bgAudio = null;
  let isAudioPlaying = false;

  function initAudio() {
    if (!features.audioTracks || features.audioTracks.length === 0) return;
    bgAudio = new Audio();
    bgAudio.src = features.audioTracks[0];
    bgAudio.loop = true;
    bgAudio.volume = 0.35;
    bgAudio.preload = "none";
  }

  if (audioToggleBtn) {
    initAudio();
    audioToggleBtn.addEventListener("click", async () => {
      if (!bgAudio) return;
      if (isAudioPlaying) {
        bgAudio.pause();
        isAudioPlaying = false;
        audioToggleBtn.innerHTML = "🔈";
        audioToggleBtn.setAttribute("aria-label", "Play background music");
        audioToggleBtn.setAttribute("title", "Play background music");
      } else {
        try {
          await bgAudio.play();
          isAudioPlaying = true;
          audioToggleBtn.innerHTML = "🔊";
          audioToggleBtn.setAttribute("aria-label", "Mute background music");
          audioToggleBtn.setAttribute("title", "Mute background music");
        } catch (err) {
          console.warn("Audio playback was blocked by browser:", err);
        }
      }
    });
  }

  /* ==========================================================================
     3. MOBILE NAVIGATION DRAWER
     ========================================================================== */
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileNavDrawer = document.getElementById("mobileNavDrawer");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  function toggleMobileMenu(forceClose = false) {
    if (!mobileNavDrawer || !mobileMenuBtn) return;
    const isOpen = forceClose ? false : !mobileNavDrawer.classList.contains("open");
    mobileNavDrawer.classList.toggle("open", isOpen);
    mobileMenuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    mobileMenuBtn.innerHTML = isOpen ? "&times;" : "&#9776;";
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => toggleMobileMenu());
  }

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => toggleMobileMenu(true));
  });

  /* ==========================================================================
     4. RENDER STATS & COUNT-UP ANIMATION
     ========================================================================== */
  const statsGrid = document.getElementById("statsGrid");

  function renderStats() {
    if (!statsGrid || !stats) return;
    statsGrid.innerHTML = stats.map((item) => `
      <article class="stat-card" data-target="${item.targetValue}" data-suffix="${item.displaySuffix}">
        <div class="stat-number-wrapper">
          <span class="stat-number" id="stat-${item.id}">0</span>
          <span class="stat-suffix">${item.displaySuffix}</span>
        </div>
        <div class="stat-label">${item.label}</div>
        <div class="stat-subtext">${item.subtext}</div>
      </article>
    `).join("");
  }

  renderStats();

  // IntersectionObserver for Stats count-up
  let statsAnimated = false;
  const statsSection = document.getElementById("statsSection");

  function animateCountUp() {
    const cards = document.querySelectorAll(".stat-card");
    const duration = 1800; // ms
    const startTime = performance.now();

    function updateCounters(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      cards.forEach((card) => {
        const target = parseFloat(card.getAttribute("data-target")) || 0;
        const numberEl = card.querySelector(".stat-number");
        if (!numberEl) return;

        let currentVal;
        if (target % 1 === 0) {
          // Integer counter
          currentVal = Math.floor(easeProgress * target);
        } else {
          // Decimal counter (e.g. 1.4)
          currentVal = (easeProgress * target).toFixed(1);
        }

        numberEl.textContent = currentVal;
      });

      if (progress < 1) {
        requestAnimationFrame(updateCounters);
      }
    }

    requestAnimationFrame(updateCounters);
  }

  if ("IntersectionObserver" in window && statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !statsAnimated) {
          statsAnimated = true;
          animateCountUp();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    statsObserver.observe(statsSection);
  } else {
    // Fallback if IntersectionObserver not supported
    animateCountUp();
  }

  /* ==========================================================================
     5. RENDER FEATURED WORK & FILTER TABS
     ========================================================================== */
  const workCardsGrid = document.getElementById("workCardsGrid");
  const filterTabBtns = document.querySelectorAll(".filter-tab-btn");
  let activeFilter = "all";

  function renderFeaturedWork() {
    if (!workCardsGrid || !featuredWork) return;

    const filtered = featuredWork.filter((item) => {
      if (activeFilter === "all") return true;
      return item.category === activeFilter;
    });

    workCardsGrid.innerHTML = filtered.map((item) => {
      if (item.isComingSoon) {
        return `
          <article class="work-card coming-soon" data-category="${item.category}">
            <div class="work-card-thumb-wrapper">
              <img src="${item.thumbnail}" alt="${item.title}" class="work-card-img" loading="lazy" decoding="async" width="480" height="270" />
              <div class="work-card-badge">Coming Soon</div>
            </div>
            <div class="work-card-body">
              <div class="work-card-genre">${item.genre}</div>
              <h3 class="work-card-title">${item.title}</h3>
              <div class="work-card-native-title lang-devanagari">${item.nativeTitle || ""}</div>
              <p class="work-card-credit">${item.credit}</p>
              <div class="work-card-footer">
                <span class="work-view-stat">Status: <span>Pre-Production</span></span>
                <span class="work-btn-link" style="opacity: 0.7;">Coming Soon</span>
              </div>
            </div>
          </article>
        `;
      }

      return `
        <article class="work-card" data-category="${item.category}">
          <div class="work-card-thumb-wrapper">
            <img src="${item.thumbnail}" alt="${item.title} featuring Aishwarya Harishankar" class="work-card-img" loading="lazy" decoding="async" width="480" height="270" />
            <div class="work-card-badge">${item.views} Views</div>
            <a href="${item.youtubeUrl}" target="_blank" rel="noopener noreferrer" class="work-play-overlay" aria-label="Watch ${item.title} on YouTube">
              <span class="play-circle" aria-hidden="true">&#9658;</span>
            </a>
          </div>
          <div class="work-card-body">
            <div class="work-card-genre">${item.genre}</div>
            <h3 class="work-card-title">${item.title}</h3>
            <div class="work-card-native-title lang-devanagari">${item.nativeTitle || ""}</div>
            <p class="work-card-credit">${item.credit}</p>
            <div class="work-card-footer">
              <div class="work-view-stat">
                <span>&#128065;</span> ${item.views} Views
              </div>
              <a href="${item.youtubeUrl}" target="_blank" rel="noopener noreferrer" class="work-btn-link" aria-label="Watch ${item.title} on YouTube">
                Watch &#8599;
              </a>
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  filterTabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterTabBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.getAttribute("data-filter") || "all";
      renderFeaturedWork();
    });
  });

  renderFeaturedWork();

  /* ==========================================================================
     6. RENDER ABOUT SECTION (LANGUAGES & SKILLS)
     ========================================================================== */
  const languagePillsRow = document.getElementById("languagePillsRow");
  const skillsTagsRow = document.getElementById("skillsTagsRow");

  if (languagePillsRow && profile.languages) {
    languagePillsRow.innerHTML = profile.languages.map((l) => `
      <span class="language-pill">
        <span class="lang-native lang-devanagari">${l.nativeText}</span>
        <strong>${l.name}</strong> (${l.level})
      </span>
    `).join("");
  }

  if (skillsTagsRow && profile.skills) {
    skillsTagsRow.innerHTML = profile.skills.map((s) => `
      <span class="skill-tag">${s}</span>
    `).join("");
  }

  /* ==========================================================================
     7. RENDER PHOTO GALLERY & ACCESSIBLE LIGHTBOX
     ========================================================================== */
  const galleryMasonry = document.getElementById("galleryMasonry");
  const lightboxModal = document.getElementById("lightboxModal");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const btnLightboxClose = document.getElementById("btnLightboxClose");
  const btnLightboxPrev = document.getElementById("btnLightboxPrev");
  const btnLightboxNext = document.getElementById("btnLightboxNext");

  let currentGalleryIndex = 0;
  let lastFocusedElement = null;

  function renderGallery() {
    if (!galleryMasonry || !gallery) return;

    galleryMasonry.innerHTML = gallery.map((item, idx) => `
      <div class="gallery-item" data-index="${idx}" tabindex="0" role="button" aria-label="Open image: ${item.title}">
        <img src="${item.src}" alt="${item.alt}" class="gallery-thumb" loading="lazy" decoding="async" />
        <div class="gallery-zoom-badge" aria-hidden="true">&#128269;</div>
        <div class="gallery-item-overlay">
          <div class="gallery-item-title">${item.title}</div>
          <div class="gallery-item-cat">${item.category}</div>
        </div>
      </div>
    `).join("");

    // Attach click and keydown handlers
    const items = galleryMasonry.querySelectorAll(".gallery-item");
    items.forEach((item) => {
      item.addEventListener("click", () => {
        const idx = parseInt(item.getAttribute("data-index"), 10);
        openLightbox(idx, item);
      });
      item.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const idx = parseInt(item.getAttribute("data-index"), 10);
          openLightbox(idx, item);
        }
      });
    });
  }

  function openLightbox(index, triggerElement) {
    if (!lightboxModal || !gallery[index]) return;
    lastFocusedElement = triggerElement || document.activeElement;
    currentGalleryIndex = index;
    updateLightboxContent();
    lightboxModal.classList.add("open");
    document.body.style.overflow = "hidden";
    if (btnLightboxClose) btnLightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove("open");
    document.body.style.overflow = "";
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  }

  function updateLightboxContent() {
    const item = gallery[currentGalleryIndex];
    if (!item || !lightboxImg || !lightboxCaption) return;
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
    lightboxCaption.textContent = `${item.title} — ${item.category}`;
  }

  function prevImage() {
    currentGalleryIndex = (currentGalleryIndex - 1 + gallery.length) % gallery.length;
    updateLightboxContent();
  }

  function nextImage() {
    currentGalleryIndex = (currentGalleryIndex + 1) % gallery.length;
    updateLightboxContent();
  }

  if (btnLightboxClose) btnLightboxClose.addEventListener("click", closeLightbox);
  if (btnLightboxPrev) btnLightboxPrev.addEventListener("click", prevImage);
  if (btnLightboxNext) btnLightboxNext.addEventListener("click", nextImage);

  // Close on backdrop click
  if (lightboxModal) {
    lightboxModal.addEventListener("click", (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation for Lightbox
  document.addEventListener("keydown", (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains("open")) return;
    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowLeft") {
      prevImage();
    } else if (e.key === "ArrowRight") {
      nextImage();
    }
  });

  // Mobile Touch Swipe support for Lightbox
  let touchStartX = 0;
  let touchEndX = 0;

  if (lightboxModal) {
    lightboxModal.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightboxModal.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const delta = touchEndX - touchStartX;
    if (Math.abs(delta) > 50) {
      if (delta > 0) {
        prevImage(); // Swiped right -> go to previous
      } else {
        nextImage(); // Swiped left -> go to next
      }
    }
  }

  renderGallery();

  /* ==========================================================================
     8. RENDER CREATOR CORNER (VLOGS & BTS)
     ========================================================================== */
  const creatorScrollContainer = document.getElementById("creatorScrollContainer");

  function renderVlogs() {
    if (!creatorScrollContainer || !vlogs) return;

    creatorScrollContainer.innerHTML = vlogs.map((v) => `
      <article class="vlog-card">
        <div class="vlog-thumb-box">
          <img src="${v.thumbnail}" alt="${v.title}" class="vlog-thumb-img" loading="lazy" decoding="async" width="400" height="225" />
          <span class="vlog-tag-badge">${v.tag}</span>
        </div>
        <div class="vlog-body">
          <h4 class="vlog-title">${v.title}</h4>
          <div class="vlog-footer">
            <span>&#128065; ${v.views}</span>
            <a href="${v.youtubeUrl}" target="_blank" rel="noopener noreferrer" class="vlog-watch-btn" aria-label="Watch ${v.title} on YouTube">
              Watch &#8599;
            </a>
          </div>
        </div>
      </article>
    `).join("");
  }

  renderVlogs();

  /* ==========================================================================
     9. RENDER SOCIAL ICONS & LINKS
     ========================================================================== */
  const socialLinksGrid = document.getElementById("socialLinksGrid");

  function getSocialIconSvg(platform) {
    switch (platform.toLowerCase()) {
      case "instagram":
        return `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`;
      case "youtube":
        return `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`;
      case "facebook":
        return `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`;
      case "threads":
        return `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.26 18.3 1.5 15.394 1.5 11.853c0-3.477.832-6.386 2.474-8.647C5.727 1.077 8.653 0 12.186 0c3.547 0 6.471 1.078 8.212 3.206 1.642 2.261 2.474 5.17 2.474 8.647 0 .524-.022 1.042-.066 1.554-.103 1.206-.39 2.378-.853 3.483l-2.07-.858c.362-.865.586-1.78.667-2.721.034-.397.051-.8.051-1.206 0-2.883-.655-5.267-1.947-7.086C17.382 3.23 15.02 2.36 12.186 2.36c-2.83 0-5.192.87-6.471 2.587-1.292 1.819-1.947 4.203-1.947 7.086 0 2.946.611 5.367 1.815 7.195 1.298 1.616 3.298 2.454 5.944 2.488 2.053-.027 3.73-.615 4.986-1.75 1.341-1.212 2.115-2.94 2.3-5.138.006-.067.01-.133.013-.2h-6.64c-2.316 0-4.07-.577-5.215-1.714-1.127-1.119-1.699-2.658-1.699-4.576 0-1.895.586-3.433 1.741-4.573 1.173-1.157 2.894-1.744 5.116-1.744 2.266 0 4.004.593 5.166 1.763 1.109 1.116 1.688 2.617 1.722 4.462l-2.285.004c-.035-1.233-.404-2.203-1.099-2.883-.733-.717-1.879-1.08-3.404-1.08-1.556 0-2.716.388-3.447 1.155-.705.74-.705 1.757-.705 2.896 0 1.154.341 2.148 1.013 2.876.71.77 1.843 1.16 3.367 1.16h6.812c-.22 2.877-1.247 5.148-3.052 6.75-1.666 1.48-3.923 2.247-6.709 2.278z"/></svg>`;
      case "snapchat":
        return `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.206.772c-3.963 0-6.425 2.775-6.425 5.972 0 .937.26 2.087.402 2.593.153.542-.239.73-.591.905-.444.22-.99.529-.99 1.258 0 .543.376.994.887 1.206.99.412 1.57.173 2.032 1.344.238.607.72 2.082 2.072 2.624.773.31 1.637.23 2.502.144.912-.09 1.838-.182 2.457.214.542.348.868.834 1.704.834.823 0 1.139-.472 1.669-.813.623-.399 1.557-.306 2.476-.215.864.088 1.728.168 2.502-.144 1.352-.542 1.834-2.017 2.072-2.624.462-1.171 1.042-.932 2.032-1.344.511-.212.887-.663.887-1.206 0-.729-.546-1.038-.99-1.258-.352-.175-.744-.363-.591-.905.142-.506.402-1.656.402-2.593 0-3.197-2.462-5.972-6.425-5.972z"/></svg>`;
      case "x":
        return `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`;
      default:
        return `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`;
    }
  }

  if (socialLinksGrid && socials) {
    socialLinksGrid.innerHTML = socials.map((s) => `
      <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="social-icon-circle" aria-label="Follow Aishwarya Harishankar on ${s.platform} (${s.followers})" title="${s.platform}: ${s.handle}">
        ${getSocialIconSvg(s.platform)}
      </a>
    `).join("");
  }

  /* ==========================================================================
     10. DYNAMIC COPYRIGHT YEAR & BACK TO TOP
     ========================================================================== */
  const copyrightYearEl = document.getElementById("copyrightYear");
  if (copyrightYearEl) {
    copyrightYearEl.textContent = new Date().getFullYear();
  }

  const btnBackToTop = document.getElementById("btnBackToTop");
  if (btnBackToTop) {
    btnBackToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});

