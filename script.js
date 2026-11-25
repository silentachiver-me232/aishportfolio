/**
 * ============================================================================
 * AISHWARYA HARISHANKAR — PORTFOLIO INTERACTIVITY
 * ============================================================================
 * Renders all content from PORTFOLIO_CONFIG (js/config.js), provides accessible
 * OTT horizontal navigation, portrait gallery lightbox (keyboard + swipe),
 * theme switcher, and gentle stats count-up respecting reduced-motion.
 */

document.addEventListener("DOMContentLoaded", () => {
  if (typeof PORTFOLIO_CONFIG === "undefined") {
    console.error("PORTFOLIO_CONFIG missing. Check that js/config.js is loaded before script.js.");
    return;
  }

  const {
    profile,
    features,
    socials,
    stats,
    ottHighlights,
    musicVideos,
    shortFilms,
    actingProjects,
    brandCollaborations,
    events,
    vlogs,
    gallery
  } = PORTFOLIO_CONFIG;

  const prefersReducedMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --------------------------------------------------------------------------
     1. SVG ICONS HELPER
     -------------------------------------------------------------------------- */
  function getSocialSvg(icon) {
    const map = {
      instagram:
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>',
      youtube:
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
      facebook:
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
      threads:
        '<svg width="18" height="18" viewBox="0 0 192 192" fill="currentColor" aria-hidden="true"><path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z"/></svg>',
      snapchat:
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.003 2c-3.143 0-5.498 2.273-5.503 5.341 0 .973.232 2.054.49 2.766-.632.144-1.393.447-1.488 1.096-.062.428.188.756.592.936-.084.582-.246 1.402-1.077 1.637-.478.135-.875.467-.866.924.012.607.784.877 1.579.917.443.023.774.225.845.548.163.74-.755 1.523-1.688 1.834-.413.138-.646.467-.621.849.034.52.548.835 1.258.835.497 0 1.066-.145 1.62-.358 1.015-.391 1.83-.243 2.457.447.789.867 1.764 1.168 2.899 1.168 1.135 0 2.11-.301 2.9-1.168.627-.69 1.442-.838 2.457-.447.554.213 1.123.358 1.62.358.71 0 1.224-.315 1.258-.835.025-.382-.208-.711-.621-.849-.933-.311-1.851-1.094-1.688-1.834.071-.323.402-.525.845-.548.795-.04 1.567-.31 1.579-.917.009-.457-.388-.789-.866-.924-.831-.235-.993-1.055-1.077-1.637.404-.18.654-.508.592-.936-.095-.649-.856-.952-1.488-1.096.258-.712.49-1.793.49-2.766-.005-3.068-2.36-5.341-5.503-5.341z"/></svg>',
      x:
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>'
    };
    return map[icon] || "";
  }

  function renderSocialLinks(containerId, primaryOnly = true) {
    const el = document.getElementById(containerId);
    if (!el || !socials) return;
    const list = primaryOnly ? socials.filter((s) => s.primary) : socials;
    el.innerHTML = list
      .map(
        (s) =>
          `<a href="${s.url}" target="_blank" rel="noopener noreferrer" class="social-icon-link" aria-label="${s.platform} (${s.followers})" title="${s.platform}: ${s.handle}">${getSocialSvg(s.icon)}</a>`
      )
      .join("");
  }

  // Strictly ordered: Instagram -> YouTube -> Facebook in primary bars
  renderSocialLinks("headerSocials", true);
  renderSocialLinks("mobileDrawerSocials", true);
  renderSocialLinks("footerSocials", true);
  renderSocialLinks("contactSocials", false);

  /* --------------------------------------------------------------------------
     2. THEME CONTROLLER (RESPECTS prefers-color-scheme)
     -------------------------------------------------------------------------- */
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const themeIcon = document.getElementById("themeIcon");

  function applyTheme(theme) {
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
      if (themeIcon) themeIcon.textContent = "🌙";
      if (themeToggleBtn) {
        themeToggleBtn.setAttribute("aria-label", "Switch to dark theme");
        themeToggleBtn.title = "Switch to dark theme";
      }
    } else {
      document.documentElement.removeAttribute("data-theme");
      if (themeIcon) themeIcon.textContent = "☀️";
      if (themeToggleBtn) {
        themeToggleBtn.setAttribute("aria-label", "Switch to light theme");
        themeToggleBtn.title = "Switch to light theme";
      }
    }
  }

  const savedTheme = localStorage.getItem("aish_theme");
  const systemLight =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
  applyTheme(savedTheme || (systemLight ? "light" : "dark"));

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const next =
        document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
      applyTheme(next);
      localStorage.setItem("aish_theme", next);
    });
  }

  /* --------------------------------------------------------------------------
     3. OPTIONAL BACKGROUND AUDIO TOGGLE (OFF BY DEFAULT)
     -------------------------------------------------------------------------- */
  const audioToggleBtn = document.getElementById("audioToggleBtn");
  const audioIcon = document.getElementById("audioIcon");
  let bgAudio = null;
  let audioPlaying = false;

  if (audioToggleBtn && features && features.showAudioToggle && features.audioTracks.length) {
    audioToggleBtn.hidden = false;
    audioToggleBtn.addEventListener("click", async () => {
      if (!bgAudio) {
        bgAudio = new Audio(features.audioTracks[0]);
        bgAudio.loop = true;
        bgAudio.volume = 0.35;
      }
      if (audioPlaying) {
        bgAudio.pause();
        audioPlaying = false;
        if (audioIcon) audioIcon.textContent = "🔇";
        audioToggleBtn.setAttribute("aria-label", "Play background music");
        audioToggleBtn.title = "Background music (off)";
      } else {
        try {
          await bgAudio.play();
          audioPlaying = true;
          if (audioIcon) audioIcon.textContent = "🔊";
          audioToggleBtn.setAttribute("aria-label", "Mute background music");
          audioToggleBtn.title = "Mute background music";
        } catch (err) {
          console.warn("Audio playback requires user interaction:", err);
        }
      }
    });
  }

  /* --------------------------------------------------------------------------
     4. MOBILE NAVIGATION DRAWER
     -------------------------------------------------------------------------- */
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenuIcon = document.getElementById("mobileMenuIcon");
  const mobileNavDrawer = document.getElementById("mobileNavDrawer");

  function setDrawerOpen(open) {
    if (!mobileNavDrawer || !mobileMenuBtn) return;
    mobileNavDrawer.hidden = !open;
    mobileMenuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    if (mobileMenuIcon) mobileMenuIcon.innerHTML = open ? "&times;" : "&#9776;";
    document.body.style.overflow = open ? "hidden" : "";
  }

  if (mobileMenuBtn && mobileNavDrawer) {
    mobileMenuBtn.addEventListener("click", () => {
      setDrawerOpen(mobileNavDrawer.hidden);
    });
    mobileNavDrawer.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setDrawerOpen(false));
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1120 && !mobileNavDrawer.hidden) {
        setDrawerOpen(false);
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !mobileNavDrawer.hidden) {
        setDrawerOpen(false);
        mobileMenuBtn.focus();
      }
    });
  }

  /* --------------------------------------------------------------------------
     5. HERO OTT HORIZONTAL CAROUSEL (LATEST MUSIC VIDEOS)
     -------------------------------------------------------------------------- */
  const ottTrack = document.getElementById("ottTrack");
  const ottDots = document.getElementById("ottDots");
  const ottPrevBtn = document.getElementById("ottPrevBtn");
  const ottNextBtn = document.getElementById("ottNextBtn");

  function renderOttCarousel() {
    if (!ottTrack || !ottHighlights) return;

    ottTrack.innerHTML = ottHighlights
      .map((item, idx) => {
        const posterClass = item.isPortraitPoster ? "is-portrait" : "is-landscape";
        const loadingAttr = idx === 0 ? 'fetchpriority="high" loading="eager"' : 'loading="lazy" decoding="async"';
        return `
          <article class="ott-card">
            <img src="${item.poster}" alt="" class="ott-card-backdrop" aria-hidden="true" ${loadingAttr} />
            <div class="ott-card-scrim" aria-hidden="true"></div>
            <div class="ott-card-info">
              <div class="ott-badges-row">
                <span class="ott-view-pill">${item.views}</span>
                <span class="ott-cat-label">${item.categoryTag}</span>
              </div>
              <h3 class="ott-card-title">${item.title}</h3>
              ${item.nativeTitle ? `<div class="ott-card-native indic-text">${item.nativeTitle}</div>` : ""}
              <a href="${item.youtubeUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary ott-watch-btn" aria-label="Watch ${item.title} on YouTube">
                <span aria-hidden="true">&#9654;</span>
                <span>Watch on YouTube</span>
              </a>
            </div>
            <div class="ott-poster-wrap">
              <img src="${item.poster}" alt="${item.alt}" class="ott-poster-img ${posterClass}" width="${item.posterWidth}" height="${item.posterHeight}" ${loadingAttr} />
            </div>
          </article>
        `;
      })
      .join("");

    if (ottDots) {
      ottDots.innerHTML = ottHighlights
        .map(
          (item, i) =>
            `<button type="button" class="ott-dot-btn${i === 0 ? " active" : ""}" data-index="${i}" aria-label="Show ${item.title}"></button>`
        )
        .join("");

      ottDots.querySelectorAll(".ott-dot-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const i = parseInt(btn.getAttribute("data-index"), 10);
          const cards = ottTrack.querySelectorAll(".ott-card");
          if (cards[i]) {
            cards[i].scrollIntoView({
              behavior: prefersReducedMotion ? "auto" : "smooth",
              block: "nearest",
              inline: "start"
            });
          }
        });
      });

      ottTrack.addEventListener(
        "scroll",
        () => {
          const cards = ottTrack.querySelectorAll(".ott-card");
          if (!cards.length) return;
          const step = cards[0].offsetWidth + 16;
          const activeIdx = Math.min(cards.length - 1, Math.round(ottTrack.scrollLeft / step));
          ottDots.querySelectorAll(".ott-dot-btn").forEach((b, idx) => {
            b.classList.toggle("active", idx === activeIdx);
          });
        },
        { passive: true }
      );
    }
  }

  function wireHorizontalArrows(track, prevBtn, nextBtn) {
    if (!track || !prevBtn || !nextBtn) return;
    const scrollByCard = (dir) => {
      const firstCard = track.firstElementChild;
      const delta = firstCard ? firstCard.getBoundingClientRect().width + 16 : 320;
      track.scrollBy({
        left: dir * delta,
        behavior: prefersReducedMotion ? "auto" : "smooth"
      });
    };
    prevBtn.addEventListener("click", () => scrollByCard(-1));
    nextBtn.addEventListener("click", () => scrollByCard(1));
    track.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollByCard(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollByCard(1);
      }
    });
  }

  renderOttCarousel();
  wireHorizontalArrows(ottTrack, ottPrevBtn, ottNextBtn);

  /* --------------------------------------------------------------------------
     6. COMPACT STATS STRIP (SUBTLE COUNT-UP)
     -------------------------------------------------------------------------- */
  const statsGrid = document.getElementById("statsGrid");
  const statsSection = document.getElementById("statsSection");

  if (statsGrid && stats) {
    statsGrid.innerHTML = stats
      .map(
        (s) => `
        <div class="stat-item" data-target="${s.target}">
          <div class="stat-value"><span class="stat-num">${prefersReducedMotion ? s.target : 0}</span>${s.suffix}</div>
          <div class="stat-label">${s.label}</div>
        </div>
      `
      )
      .join("");

    let animated = prefersReducedMotion;
    const runCountUp = () => {
      const items = statsGrid.querySelectorAll(".stat-item");
      const start = performance.now();
      const duration = 900;

      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        items.forEach((item) => {
          const target = parseFloat(item.getAttribute("data-target"));
          const numEl = item.querySelector(".stat-num");
          if (!numEl) return;
          numEl.textContent = target % 1 === 0 ? Math.floor(eased * target) : (eased * target).toFixed(1);
        });
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    if (!animated && "IntersectionObserver" in window && statsSection) {
      const obs = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !animated) {
            animated = true;
            runCountUp();
            obs.disconnect();
          }
        },
        { threshold: 0.25 }
      );
      obs.observe(statsSection);
    } else if (!animated) {
      runCountUp();
    }
  }

  /* --------------------------------------------------------------------------
     7. SHARED VIDEO / PROJECT CARD RENDERERS
     -------------------------------------------------------------------------- */
  function renderMediaCard(item, options = {}) {
    const portraitClass = options.portrait ? " is-portrait" : "";
    const imgWidth = options.portrait ? 400 : 480;
    const imgHeight = options.portrait ? 500 : 270;
    const thumb = item.thumbnail || item.image;
    const fallback = item.fallback || "./p3.jpg";
    const badge = item.views || item.format || item.metric || "";
    const subtitle = item.role || item.tag || "";
    const titleSuffix = item.nativeTitle ? ` <span class="indic-text">· ${item.nativeTitle}</span>` : "";

    const mediaHtml = `
      <div class="card-media${portraitClass}">
        <img src="${thumb}" onerror="this.onerror=null;this.src='${fallback}';" alt="${item.alt}" class="card-thumb" width="${imgWidth}" height="${imgHeight}" loading="lazy" decoding="async" />
        ${badge ? `<span class="card-badge">${badge}</span>` : ""}
        ${item.youtubeUrl ? '<span class="card-play-chip" aria-hidden="true">&#9654;</span>' : ""}
      </div>
      <div class="card-meta">
        <h3 class="card-title">${item.title}${titleSuffix}</h3>
        ${subtitle && subtitle !== badge ? `<span class="card-sub">${subtitle}</span>` : ""}
      </div>
    `;

    if (item.youtubeUrl || (item.url && item.url.startsWith("http"))) {
      const href = item.youtubeUrl || item.url;
      return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="work-card" aria-label="Watch ${item.title} on YouTube">${mediaHtml}</a>`;
    }

    if (item.url && item.url.startsWith("#")) {
      return `<a href="${item.url}" class="work-card${item.isPlaceholder ? " is-coming-soon" : ""}">${mediaHtml}</a>`;
    }

    return `<article class="work-card is-coming-soon">${mediaHtml}</article>`;
  }

  const musicVideosGrid = document.getElementById("musicVideosGrid");
  if (musicVideosGrid && musicVideos) {
    musicVideosGrid.innerHTML = musicVideos.map((m) => renderMediaCard(m)).join("");
  }

  const shortFilmsGrid = document.getElementById("shortFilmsGrid");
  if (shortFilmsGrid && shortFilms) {
    shortFilmsGrid.innerHTML = shortFilms.map((f) => renderMediaCard(f)).join("");
  }

  const actingGrid = document.getElementById("actingGrid");
  if (actingGrid && actingProjects) {
    actingGrid.innerHTML = actingProjects.map((a) => renderMediaCard(a)).join("");
  }

  const languagesBar = document.getElementById("languagesBar");
  if (languagesBar && profile.languages) {
    languagesBar.innerHTML =
      `<span class="languages-label">Languages</span>` +
      profile.languages
        .map((l) => `<span class="lang-pill"><span class="indic-text">${l.native}</span> ${l.name}</span>`)
        .join("");
  }

  const brandsGrid = document.getElementById("brandsGrid");
  if (brandsGrid && brandCollaborations) {
    brandsGrid.innerHTML = brandCollaborations.map((b) => renderMediaCard(b, { portrait: true })).join("");
  }

  const eventsGrid = document.getElementById("eventsGrid");
  if (eventsGrid && events) {
    eventsGrid.innerHTML = events.map((ev) => renderMediaCard(ev)).join("");
  }

  /* --------------------------------------------------------------------------
     8. CREATOR CORNER (7 VLOGS HORIZONTAL SCROLL ROW)
     -------------------------------------------------------------------------- */
  const vlogsTrack = document.getElementById("vlogsTrack");
  const vlogsPrevBtn = document.getElementById("vlogsPrevBtn");
  const vlogsNextBtn = document.getElementById("vlogsNextBtn");

  if (vlogsTrack && vlogs) {
    vlogsTrack.innerHTML = vlogs.map((v) => renderMediaCard(v)).join("");
    wireHorizontalArrows(vlogsTrack, vlogsPrevBtn, vlogsNextBtn);
  }

  /* --------------------------------------------------------------------------
     9. GALLERY MASONRY & ACCESSIBLE LIGHTBOX (KEYBOARD + SWIPE)
     -------------------------------------------------------------------------- */
  const galleryGrid = document.getElementById("galleryGrid");
  const lightboxModal = document.getElementById("lightboxModal");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const btnLightboxClose = document.getElementById("btnLightboxClose");
  const btnLightboxPrev = document.getElementById("btnLightboxPrev");
  const btnLightboxNext = document.getElementById("btnLightboxNext");

  let currentIdx = 0;
  let lastTrigger = null;

  if (galleryGrid && gallery) {
    galleryGrid.innerHTML = gallery
      .map(
        (img, i) => `
        <button type="button" class="gallery-tile" data-index="${i}" aria-label="View ${img.alt}">
          <img src="${img.src}" alt="${img.alt}" class="gallery-img" width="${img.width}" height="${img.height}" loading="lazy" decoding="async" />
        </button>
      `
      )
      .join("");

    galleryGrid.querySelectorAll(".gallery-tile").forEach((tile) => {
      tile.addEventListener("click", () => {
        currentIdx = parseInt(tile.getAttribute("data-index"), 10);
        openLightbox(tile);
      });
    });
  }

  function showLightboxImage() {
    const item = gallery[currentIdx];
    if (!item || !lightboxImg || !lightboxCaption) return;
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
    lightboxCaption.textContent = `${item.title} (${currentIdx + 1} / ${gallery.length})`;
  }

  function openLightbox(trigger) {
    if (!lightboxModal) return;
    lastTrigger = trigger || document.activeElement;
    showLightboxImage();
    lightboxModal.hidden = false;
    document.body.style.overflow = "hidden";
    if (btnLightboxClose) btnLightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.hidden = true;
    document.body.style.overflow = "";
    if (lastTrigger && typeof lastTrigger.focus === "function") lastTrigger.focus();
  }

  const prevLightbox = () => {
    currentIdx = (currentIdx - 1 + gallery.length) % gallery.length;
    showLightboxImage();
  };

  const nextLightbox = () => {
    currentIdx = (currentIdx + 1) % gallery.length;
    showLightboxImage();
  };

  if (btnLightboxClose) btnLightboxClose.addEventListener("click", closeLightbox);
  if (btnLightboxPrev) btnLightboxPrev.addEventListener("click", prevLightbox);
  if (btnLightboxNext) btnLightboxNext.addEventListener("click", nextLightbox);

  if (lightboxModal) {
    lightboxModal.addEventListener("click", (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });

    let touchX = 0;
    lightboxModal.addEventListener(
      "touchstart",
      (e) => {
        touchX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );
    lightboxModal.addEventListener(
      "touchend",
      (e) => {
        const delta = e.changedTouches[0].screenX - touchX;
        if (Math.abs(delta) > 48) {
          delta > 0 ? prevLightbox() : nextLightbox();
        }
      },
      { passive: true }
    );
  }

  document.addEventListener("keydown", (e) => {
    if (!lightboxModal || lightboxModal.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") prevLightbox();
    if (e.key === "ArrowRight") nextLightbox();
  });

  /* --------------------------------------------------------------------------
     10. ABOUT, CONTACT FORM PLACEHOLDER FALLBACK & FOOTER
     -------------------------------------------------------------------------- */
  const aboutBio = document.getElementById("aboutBio");
  const aboutHighlights = document.getElementById("aboutHighlights");

  if (aboutBio) aboutBio.textContent = profile.bio;
  if (aboutHighlights && profile.highlights) {
    aboutHighlights.innerHTML = profile.highlights
      .map((h) => `<span class="highlight-chip">${h}</span>`)
      .join("");
  }

  const contactForm = document.getElementById("contactForm");
  const formFeedback = document.getElementById("formFeedback");
  const businessEmailLink = document.getElementById("businessEmailLink");
  const businessEmailText = document.getElementById("businessEmailText");

  if (businessEmailLink && businessEmailText) {
    businessEmailText.textContent = profile.businessEmail;
    businessEmailLink.href = `mailto:${profile.businessEmail}`;
  }

  if (contactForm) {
    contactForm.action = profile.formspreeEndpoint;
    contactForm.addEventListener("submit", (e) => {
      if (profile.formspreeEndpoint.includes("[ADD FORMSPREE ID]")) {
        e.preventDefault();
        const name = encodeURIComponent(document.getElementById("contactName").value.trim());
        const type = encodeURIComponent(document.getElementById("contactEnquiryType").value);
        const msg = encodeURIComponent(document.getElementById("contactMessage").value.trim());

        if (!profile.businessEmail.includes("[ADD BUSINESS EMAIL]")) {
          window.location.href = `mailto:${profile.businessEmail}?subject=${type}%20Enquiry%20from%20${name}&body=${msg}`;
          return;
        }
        if (formFeedback) {
          formFeedback.hidden = false;
          formFeedback.textContent =
            "Form setup pending: replace [ADD FORMSPREE ID] or [ADD BUSINESS EMAIL] in js/config.js.";
        }
      }
    });
  }

  const copyrightYear = document.getElementById("copyrightYear");
  if (copyrightYear) copyrightYear.textContent = new Date().getFullYear();

  const btnBackToTop = document.getElementById("btnBackToTop");
  if (btnBackToTop) {
    btnBackToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  }
});
