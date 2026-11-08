const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const tracks = [
  { name: 'Row 1 (Music Albums)', start: html.indexOf('works-track-albums'), end: html.indexOf('works-track-films') },
  { name: 'Row 2 (Short Films)', start: html.indexOf('works-track-films'), end: html.indexOf('id="herVideosSection"') },
  { name: 'Section 4 (Her Videos)', start: html.indexOf('works-track-vlogs'), end: html.indexOf('</section>', html.indexOf('id="herVideosSection"')) }
];

tracks.forEach(track => {
  console.log(`\n=== ${track.name} ===`);
  const content = html.substring(track.start, track.end);
  const cardRegex = /<div class="works-card([^"]*)"([^>]*)>([\s\S]*?)(?=<div class="works-card|<\/div>\s*<\/div>\s*<\/div>\s*<\/div>|$)/g;
  let match;
  let count = 0;
  while ((match = cardRegex.exec(content)) !== null) {
    count++;
    const extraClasses = match[1].trim();
    const attrs = match[2];
    const cardBody = match[3];
    const isDup = attrs.includes('aria-hidden="true"');
    const titleMatch = attrs.match(/data-title="([^"]+)"/);
    const ytIdMatch = attrs.match(/data-youtube-id="([^"]+)"/);
    const viewsMatch = cardBody.match(/<span class="card-views-tag">[\s\S]*?<\/svg>\s*([^<]+)<\/span>/);
    const statViewsMatch = cardBody.match(/<strong>([^<]+)<\/strong>\s*views/);
    console.log(
      `  #${count} [${isDup ? 'DUP ' : 'MAIN'}] ${(titleMatch ? titleMatch[1] : 'Unknown').padEnd(35)} | TopTag: ${viewsMatch ? viewsMatch[1].trim() : 'NONE'} | MetaStat: ${statViewsMatch ? statViewsMatch[1].trim() + ' views' : 'NONE'}`
    );
  }
  console.log(`Total in ${track.name}: ${count} cards`);
});
