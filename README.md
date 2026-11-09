# Aishwarya Harishankar — Official Portfolio & Showcase

[![Deploy static content to Pages](https://github.com/silentachiver-me232/aishportfolio/actions/workflows/static.yml/badge.svg)](https://github.com/silentachiver-me232/aishportfolio/actions/workflows/static.yml)
[![Live Site](https://img.shields.io/badge/Live_Website-GitHub_Pages-2ea44f?style=flat&logo=github)](https://silentachiver-me232.github.io/aishportfolio/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A polished, high-performance, responsive general-showcase portfolio for **Aishwarya Harishankar**, Indian Actress, Model, and Digital Creator based in Pune, India. Designed for casting directors, production houses, brand collaborations, and fans worldwide.

🌐 **Live Demo:** [https://silentachiver-me232.github.io/aishportfolio/](https://silentachiver-me232.github.io/aishportfolio/)

---

## 🌟 Highlights & Features

- **Cinematic Visual Aesthetic**:
  - Deep obsidian theme with rose-gold (`#e08ba5`) accents inspired by the "Gulabachi Kali" identity.
  - Seamless Light Mode toggle respecting system `prefers-color-scheme` with `localStorage` persistence.
  - Elegant typography pairing *Playfair Display* (cinematic serif), *Poppins* (modern sans), and *Noto Sans Devanagari* for authentic Marathi script (*माझ्या सोन्या*).

- **Dynamic Data-Driven Content (`js/config.js`)**:
  - All follower metrics, videos, vlogs, gallery photos, and social links are centralized in a single configuration file. Adding or updating a project takes seconds without touching HTML.

- **Interactive Showcases**:
  - **Live Stats Strip**: Smooth animated count-up numbers triggered on scroll (`IntersectionObserver`).
  - **Featured Work**: Filterable by *All*, *Music Videos*, and *Short Films*, featuring direct YouTube watch links and "Coming Soon" cards for upcoming releases.
  - **Photo Gallery & Lightbox**: Responsive masonry layout with an accessible fullscreen lightbox supporting keyboard navigation (`ArrowLeft`, `ArrowRight`, `Escape`) and mobile touch swipe.
  - **Creator Corner**: Horizontal swipeable scroll container on mobile and responsive multi-column grid on desktop.

- **Production-Ready & Accessible**:
  - **Zero Build Step**: Pure HTML5, modern CSS, and vanilla JavaScript—deploys automatically via GitHub Pages.
  - **WCAG AA Compliant**: High contrast ratios, 44px+ minimum touch targets, visible keyboard focus indicators (`:focus-visible`), and `@media (prefers-reduced-motion)` support.
  - **SEO & Social Sharing**: Open Graph and Twitter Card tags configured with `p3.jpg`, canonical URL, and schema.org `Person` JSON-LD structured data.

---

## 📂 Project Architecture

```text
aishportfolio/
├── index.html                   # Semantic HTML5 markup, SEO meta tags, and structured data
├── css/
│   └── style.css                # CSS custom properties, themes, masonry, lightbox, animations
├── js/
│   ├── config.js                # Centralized configuration (stats, work, vlogs, socials)
│   └── main.js                  # Dynamic rendering, lightbox, count-up animation, theme toggle
├── .github/
│   └── workflows/
│       └── static.yml           # Automated GitHub Actions deployment workflow
├── CHANGELOG.md                 # Detailed changelog of refactoring upgrades (v2.0.0)
├── p1.jpg, p2.jpg, p3.jpg       # Hero portraits
├── section2/                    # Gallery photoshoot portraits (1w.png - 10w.png, 4w.jpg)
└── thumbnail/                   # Video thumbnail assets
```

---

## 🛠️ Customization & Updating Content

To update figures or add new releases, edit **`js/config.js`**:

```javascript
// Example: Adding a new release to js/config.js
featuredWork: [
  {
    id: "new-song",
    title: "Song Title",
    nativeTitle: "गाण्याचे नाव",
    category: "music", // 'music' or 'film'
    views: "1.2M",
    role: "Lead Cast",
    genre: "Romantic Single",
    credit: "Featuring Aishwarya Harishankar",
    youtubeUrl: "https://youtu.be/VIDEO_ID?t=0",
    thumbnail: "https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg",
    highlight: "1.2M Views"
  },
  ...
]
```

### Placeholders to Fill:
- **Business Email**: Search for `[ADD BUSINESS EMAIL]` in `js/config.js` and `index.html`.
- **Contact Form (Formspree)**: Replace `[ADD FORMSPREE ID]` in `js/config.js` and `index.html` with your Formspree endpoint (e.g., `https://formspree.io/f/your_form_id`).

---

## 🚀 Deployment

The site automatically deploys on every push to the `main` branch via GitHub Actions:
- **Workflow**: `.github/workflows/static.yml`
- **Settings**: Repository Settings → Pages → Source: **GitHub Actions**

---

## 📄 License
This portfolio is created for Aishwarya Harishankar. All images, video materials, and copyrights remain the property of their respective creators and producers.
