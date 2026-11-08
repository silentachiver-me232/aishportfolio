const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const script = fs.readFileSync('script.js', 'utf8');

// 1. Check getElementById in HTML
const regexHtmlId = /getElementById\(['"]([^'"]+)['"]\)/g;
let m;
while ((m = regexHtmlId.exec(html)) !== null) {
  if (!html.includes('id="' + m[1] + '"')) {
    console.log('HTML onclick missing ID:', m[1]);
  }
}

// 2. Check getElementById in script.js
const regexJsId = /getElementById\(['"]([^'"]+)['"]\)/g;
while ((m = regexJsId.exec(script)) !== null) {
  if (!html.includes('id="' + m[1] + '"')) {
    console.log('script.js getElementById missing in HTML:', m[1]);
  }
}

// 3. Check href="#..."
const regexHref = /href="#([^"]+)"/g;
while ((m = regexHref.exec(html)) !== null) {
  if (!html.includes('id="' + m[1] + '"')) {
    console.log('HTML href="#" missing in HTML:', m[1]);
  }
}

console.log('Check complete.');

// Test decryptPayload
const cipherMatch = script.match(/let CIPHER = "([^"]+)"/);
const saltMatch = script.match(/const SALT = "([^"]+)"/);
const hashMatch = script.match(/const EXPECTED_HASH = "([^"]+)"/);

const CIPHER = cipherMatch[1];
const SALT = saltMatch[1];
const EXPECTED_HASH = hashMatch[1];

const fnCode = script.substring(script.indexOf('function sha256Bytes'), script.indexOf('let destructInterval'));
eval(fnCode);

const decrypted = decryptPayload('05052026');
console.log('Decrypted length:', decrypted.length);
console.log('Decrypted starts with:', decrypted.substring(0, 70));
console.log('Decrypted ends with:', decrypted.substring(decrypted.length - 70));
