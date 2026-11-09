# Changelog & Refactoring Overview

## [2.0.0] — General Showcase Portfolio Upgrade

### 1. Removed
- **Physical Profile Lines**: Removed weight (42 kg), exact age, and height lines from personal information.
- **Detailed Location**: Replaced all specific location references with **"Pune, India"** in the bio and footer.
- **Confidential Vault Modal**: Removed the 5-click easter egg, encrypted cipher payload, and self-destructing modal and all associated JS logic.
- **Security Permissions Popup**: Removed the on-load permissions disclaimer popup.
- **Diwali Pop-up**: Moved into a modular feature toggle in `js/config.js` (`features.diwaliCelebration: false`), off by default.
- **Sound Autoplay Overlay**: Removed the click-anywhere sound unlock prompt. Background music is now controlled via a subtle audio mute/unmute button in the header (muted by default).
- **Duplicate HTML Markup**: Removed all hardcoded duplicate card blocks that were previously written twice or thrice for CSS marquee/scrolling effects.

---

### 2. Fixed
- **Malformed Link**: Corrected `https://youtu.be/UOpCGKkOx0c&t=0` to standard short format `https://youtu.be/UOpCGKkOx0c?t=0`.
- **Query Parameter Audit**: Verified every YouTube link in the project to strictly follow the clean format: `https://youtu.be/<VIDEO_ID>?t=0`.
- **Accessible Alt Text**: Replaced generic or empty `alt` attributes with descriptive text for every single image and gallery portrait.
- **Core Web Vitals & Layout Shifts**: Added `loading="lazy"` and `decoding="async"` to all images below the fold, alongside explicit `width` and `height` dimensions to prevent Cumulative Layout Shift (CLS).
- **SEO & Social Meta Tags**:
  - Replaced title with: `Aishwarya Harishankar | Actress & Digital Creator`.
  - Added primary `<meta name="description">` and `<meta name="keywords">`.
  - Added Open Graph (`og:image` pointing to `p3.jpg`) and Twitter Card tags.
  - Added structured data with schema.org `Person` JSON-LD including `sameAs` links to all verified social profiles.
- **Mobile Video Interactions**: Replaced desktop hover-to-play embeds with responsive thumbnail cards with video badges and direct "Watch on YouTube" links opening in a new tab (`rel="noopener noreferrer"`).

---

### 3. Added
- **Centralized Configuration (`js/config.js`)**:
  - Centralized stats, video catalog, vlogs, gallery images, social links, and feature flags. Adding a new release requires adding just one object.
- **Modular Stylesheet (`css/style.css`)**:
  - Defined CSS custom properties on `:root` for spacing, typography, and color tokens.
  - Cinematic obsidian dark theme with luxury rose-gold (`#e08ba5`, `#c85a7c`) accents matching the "Gulabachi Kali" identity.
  - Light-mode theme toggle respecting `prefers-color-scheme` and remembering choice in `localStorage`.
  - Typography: *Playfair Display* for headings, *Poppins* for UI text, and *Noto Sans Devanagari* for authentic Marathi script (*माझ्या सोन्या*).
  - Responsive masonry grid for the photo gallery.
  - Fullscreen vanilla JS Lightbox with keyboard navigation (`Left`/`Right`/`Escape`) and touch swipe gestures.
- **Stats Strip**: Interactive count-up animation on viewport scroll using `IntersectionObserver`.
- **Featured Work Tabs**: Filter buttons (**All**, **Music Videos**, **Short Films**) with "Coming Soon" card styling for upcoming releases.
- **About Section**: Concise, verified 100–120 word biography clearly commented for easy editing, complete with spoken languages and performance skills chips.
- **Creator Corner**: Horizontal swipeable scroll row on mobile and responsive multi-column grid on desktop.
- **Collaborate & Contact Section**: Contact form with enquiry type dropdown, Formspree endpoint placeholder, direct business email pill, and social icon grid.
- **Accessibility & Standards**:
  - Minimum touch targets of 44px.
  - Visible keyboard focus styling (`:focus-visible`).
  - `@media (prefers-reduced-motion)` to disable animations for users who prefer reduced motion.
  - `<noscript>` fallback message for non-JS visitors.

