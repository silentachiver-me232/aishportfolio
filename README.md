# Interactive Tri-Card Hero Screen Experience

A high-performance, modern full-screen hero section featuring 3 overlapping interactive image panels, reactive depth elevation, and dedicated ambient soundtracks matching your design wireframe.

---

## 🌟 Key Features

1. **Full-Screen Fit First Section (`100vh`)**:
   - The first section fills the entire screen on initial load.
   - **Natural Non-Sticky Scroll**: As you scroll down, the section smoothly scrolls out of view in standard document flow, leading to the subsequent content sections.

2. **Diagram-Accurate Overlapping Layout**:
   - **Image 1 (Left / Dark Red)**: Anchored on the left edge with a dark red border frame.
   - **Image 2 (Center / Orange)**: Overlaps the right edge of Image 1 with an orange border frame.
   - **Image 3 (Right / Yellow)**: Overlaps the right edge of Image 2 with a vivid yellow border frame.

3. **Hover Depth Interaction**:
   - When the cursor hovers over any card, it **comes ahead** (elevated `z-index`, subtle 3D scale, glowing themed shadow).
   - The other two cards **get pushed back** (receding scale, dimmed brightness and subtle depth blur).

4. **Dedicated Interactive Soundtrack**:
   - Hovering over a card instantly triggers that card's unique ambient soundtrack with smooth fade-in.
   - Hovering to another card smoothly crossfades the audio to the new card's music.
   - Moving the cursor out of the cards container smoothly fades the music out.
   - Built with a **Procedural Web Audio Engine** so it works immediately out-of-the-box with **zero external dependencies** and 100% offline reliability.

5. **Audio Unlock & Autoplay Compliance**:
   - Modern browsers require user interaction before playing audio with sound. A sleek top-right pill lets users enable sound with one click, or clicking anywhere on the page unlocks it automatically.

---

## 📂 Project Structure

```text
P1n5/
├── index.html        # Main HTML structure with 3 overlapping image cards
├── style.css         # Styling, overlapping geometry, animations & responsive layout
├── script.js         # Hover elevation controller & Web Audio synthesizer engine
└── README.md         # Documentation & customization guide
```

---

## 🎵 How to Use Your Own Songs & Images

### 1. Using Your Own Images
In `index.html`, update the `<img>` tags for each card:

```html
<!-- Card 1: Dark Red -->
<img src="images/my-red-image.jpg" alt="Dark Red Image" class="card-img" />

<!-- Card 2: Orange -->
<img src="images/my-orange-image.jpg" alt="Orange Image" class="card-img" />

<!-- Card 3: Yellow -->
<img src="images/my-yellow-image.jpg" alt="Yellow Image" class="card-img" />
```

### 2. Using Your Own Songs (MP3 / WAV / OGG)
In `script.js`, open the `TRACKS` array near the top of the file and enter the path to your audio files:

```javascript
const TRACKS = [
  {
    id: 0,
    title: "Crimson Solitude",
    theme: "dark-red",
    audioSrc: "audio/red-song.mp3",  // <-- Put your MP3 file path here
    synthType: "drone"
  },
  {
    id: 1,
    title: "Amber Horizon",
    theme: "orange",
    audioSrc: "audio/orange-song.mp3", // <-- Put your MP3 file path here
    synthType: "warm-pad"
  },
  {
    id: 2,
    title: "Solar Luminescence",
    theme: "yellow",
    audioSrc: "audio/yellow-song.mp3", // <-- Put your MP3 file path here
    synthType: "chimes"
  }
];
```

If `audioSrc` is left as `null`, the built-in procedural synthesizer plays automatically!

---

## 🚀 How to Run the Website

Simply double-click `index.html` to open it in any web browser (Chrome, Edge, Firefox, Safari), or start a local HTTP server:

```powershell
# Using Python:
python -m http.server 8000

# Or using Node:
npx serve .
```

Then visit `http://localhost:8000` in your browser.

