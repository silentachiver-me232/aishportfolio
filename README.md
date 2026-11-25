# Aishwarya Harishankar — Official Portfolio

[![Deploy static content to Pages](https://github.com/silentachiver-me232/aishportfolio/actions/workflows/static.yml/badge.svg)](https://github.com/silentachiver-me232/aishportfolio/actions/workflows/static.yml)

Minimal, visual-first static portfolio for **Aishwarya Harishankar** — Actress, Model & Digital Creator based in Pune, India. Built with plain HTML, CSS variables, and vanilla JavaScript with zero build step for instant GitHub Pages deployment.

## Key Features

- **OTT-Style Hero Carousel**: Horizontal scroll-snap showcase of flagship music videos (*Mazya Sonya*, *Atha Petha Azhakay*, *Lipstick*, *Lal Bindi*, *Gori Gori Paaan*) with Left/Right controls, dots, swipe, and keyboard support.
- **Organized Showcase Sections**: Separate visual sections for **Music Videos**, **Short Films**, **Acting Projects**, **Brand Collaborations**, **Events**, **Creator Corner**, **Gallery**, **About**, and **Collaborate**.
- **Gallery Lightbox**: Masonry portrait grid using existing `section2/` assets with keyboard (`Esc`, Left/Right) and touch swipe navigation.
- **Dark & Light Theme**: Cinematic obsidian dark mode with rose-gold accents and an accessible light-mode toggle respecting `prefers-color-scheme`.
- **Single-File Data Configuration**: Manage all videos, stats, social profiles, placeholders, and feature flags in `js/config.js`.

## Project Structure

```text
├── index.html          # Semantic single-page structure & SEO metadata
├── style.css           # Design tokens, responsive grids, OTT carousel & themes
├── script.js           # Dynamic rendering, lightbox, carousel & contact fallback
├── js/config.js        # Centralized content, YouTube links, stats & placeholders
├── p1.jpg - p3.jpg     # Flagship hero posters
├── section2/           # Portrait gallery photos
├── thumbnail/          # Video thumbnails
└── card1-3.mp3         # Optional ambient audio tracks (off by default)
```

## Updating Content & Placeholders

Open `js/config.js` to replace placeholders before production campaigns:

- `profile.businessEmail`: `[ADD BUSINESS EMAIL]`
- `profile.formspreeEndpoint`: `https://formspree.io/f/[ADD FORMSPREE ID]`
- `actingProjects`: Showreel link and `[ADD UPCOMING FILM / SERIES]`
- `brandCollaborations`: `[ADD FEATURED BRAND CAMPAIGN]`
- `events`: `[ADD UPCOMING APPEARANCE / EVENT]`

## Local Preview

```powershell
python -m http.server 8000
```

Open `http://localhost:8000` in your browser.
