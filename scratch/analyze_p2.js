const fs = require('fs');
const zlib = require('zlib');

const buf = fs.readFileSync('p2.jpg');
let pos = 8;
let idatChunks = [];
let width = 0, height = 0;

while (pos < buf.length) {
  const len = buf.readUInt32BE(pos);
  const type = buf.slice(pos + 4, pos + 8).toString('ascii');
  if (type === 'IHDR') {
    width = buf.readUInt32BE(pos + 8);
    height = buf.readUInt32BE(pos + 12);
  } else if (type === 'IDAT') {
    idatChunks.push(buf.slice(pos + 8, pos + 8 + len));
  }
  pos += 12 + len;
}

const compressed = Buffer.concat(idatChunks);
zlib.inflate(compressed, (err, raw) => {
  const bpp = 3;
  const stride = 1 + width * bpp;
  const img = Buffer.alloc(width * height * bpp);

  for (let y = 0; y < height; y++) {
    const filter = raw[y * stride];
    const rowRawStart = y * stride + 1;
    const rowOutStart = y * width * bpp;
    const prevRowOutStart = (y - 1) * width * bpp;

    for (let x = 0; x < width * bpp; x++) {
      const xVal = raw[rowRawStart + x];
      const a = (x >= bpp) ? img[rowOutStart + x - bpp] : 0;
      const b = (y > 0) ? img[prevRowOutStart + x] : 0;
      const c = (y > 0 && x >= bpp) ? img[prevRowOutStart + x - bpp] : 0;

      let val = 0;
      if (filter === 0) val = xVal;
      else if (filter === 1) val = (xVal + a) & 0xff;
      else if (filter === 2) val = (xVal + b) & 0xff;
      else if (filter === 3) val = (xVal + Math.floor((a + b) / 2)) & 0xff;
      else if (filter === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        let pr = (pa <= pb && pa <= pc) ? a : ((pb <= pc) ? b : c);
        val = (xVal + pr) & 0xff;
      }
      img[rowOutStart + x] = val;
    }
  }

  // Find bright specular highlights (bright white/yellow/pink shines on the metallic letters)
  // These are the natural chrome shine spots where sparkles should sparkle!
  const highlights = [];
  for (let y = Math.floor(height * 0.48); y < Math.floor(height * 0.84); y += 2) {
    for (let x = Math.floor(width * 0.05); x < Math.floor(width * 0.95); x += 2) {
      const idx = (y * width + x) * bpp;
      const r = img[idx];
      const g = img[idx + 1];
      const b = img[idx + 2];
      // Specular shine: high brightness (r > 210, g > 150, b > 150) or high neon glow
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      if (brightness > 200) {
        highlights.push({ x: (x/width*100).toFixed(1), y: (y/height*100).toFixed(1), brightness });
      }
    }
  }
  console.log('Total highlight pixels:', highlights.length);

  // Group highlights into 12 distinct segments along X (from 5% to 92%)
  const bins = 12;
  for (let b = 0; b < bins; b++) {
    const minPct = 5 + (b * (88 / bins));
    const maxPct = minPct + (88 / bins);
    const inBin = highlights.filter(h => parseFloat(h.x) >= minPct && parseFloat(h.x) < maxPct);
    if (inBin.length > 0) {
      // Pick the brightest in this bin
      inBin.sort((a,b) => b.brightness - a.brightness);
      const best = inBin[0];
      console.log(`sp-${b+1}: left: ${best.x}%, top: ${best.y}%`);
    } else {
      console.log(`sp-${b+1}: estimated center at ${(minPct + 3).toFixed(1)}%`);
    }
  }
});
