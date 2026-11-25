# Changelog — Portfolio Redesign

## [3.0.0] — OTT Showcase & Minimal Visual Redesign

### Removed
- **Left-to-Right Auto-Moving Marquees**: Removed continuous horizontal CSS marquee animations across the gallery, music albums, short films, and vlogs.
- **Excessive Decorative Motion & Effects**: Removed 3D overlapping hero depth pushback/tilt, Lipstick glitter/stardust particle animations, dancing equalizers, shimmer sweeps, and click-anywhere sound overlay.
- **Popups & Easter Eggs**: Removed the Permissions Security Disclaimer popup, auto-triggering Diwali fireworks overlay, and 5-click Secret Vault modal with its cipher script.
- **Duplicate HTML Markup**: Removed duplicated card blocks previously required for infinite marquee loops; cards now render cleanly from `js/config.js`.
- **Excessive Copy & Sensitive Vitals**: Removed age, height, weight (`42 kg`), school marks, detailed location, verbose production credit overlays, and fan appreciation essay. Kept only **"Pune, India"**.

### Fixed
- **YouTube Link Format**: Fixed malformed URL (`https://youtu.be/UOpCGKkOx0c&t=0`) and standardized every YouTube link across the entire codebase to `https://youtu.be/<ID>?t=0`.
- **Creator Corner Vlog ID Mapping**: Audited and verified all 7 vlog YouTube video IDs against their exact video titles.
- **Mobile Interaction**: Replaced desktop hover-to-play embedded video previews with crisp clickable cards (`rel="noopener noreferrer"`) opening directly in YouTube.
- **SEO & Accessibility**:
  - Updated `<title>` to `Aishwarya Harishankar | Actress & Digital Creator`.
  - Added `<meta name="description">`, Open Graph (`og:image` set to `p3.jpg`), Twitter Card metadata, SVG favicon, `lang="en"`, `<noscript>` notice, skip-to-content link, and schema.org `Person` JSON-LD.
  - Added descriptive `alt` text, `loading="lazy"`, `decoding="async"`, and explicit `width`/`height` dimensions across below-the-fold media.
  - Enforced minimum `44px` touch targets and clear `:focus-visible` keyboard rings.

### Added
- **Hero OTT Horizontal Carousel (`Latest Music Videos`)**: Replaced the stacked 3-card hero with an interactive Netflix/streaming-style horizontal scroll-snap carousel featuring Prev/Next navigation buttons, dot indicators, keyboard Left/Right scrolling, touch swipe, and uncropped poster framing.
- **Separate Dedicated Portfolio Sections**:
  - `Music Videos` (`#music-videos`)
  - `Short Films` (`#short-films`)
  - `Acting Projects` (`#acting-projects`) + spoken languages bar
  - `Brand Collaborations` (`#brand-collaborations`)
  - `Events` (`#events`)
  - `Creator Corner` (`#vlogs`) horizontal scroll row for all 7 vlogs
  - `Gallery` (`#gallery`) clean masonry portrait grid + accessible Lightbox (`Esc`, arrows, swipe)
  - `About` (`#about`) concise verified bio & highlights
  - `Collaborate` (`#contact`) inquiry form (`[ADD FORMSPREE ID]`) & email placeholder (`[ADD BUSINESS EMAIL]`)
- **Ordered Social Links**: Arranged social icons strictly as **Instagram → YouTube → Facebook** in the header, mobile drawer, and footer (with secondary platforms in Contact).
- **Theme Switcher & Reduced Motion**: Dark obsidian/rose-gold default with Light Mode toggle respecting `prefers-color-scheme`, plus `@media (prefers-reduced-motion: reduce)` handling.
- **Centralized Configuration (`js/config.js`)**: Easy single-file updates for stats, videos, events, brand slots, and placeholders without touching HTML.
