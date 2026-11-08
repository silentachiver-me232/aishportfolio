const crypto = require('crypto');

const password = '05052026';
const salt = 'Aish_Vault_2026_X9';

const hash = crypto.createHash('sha256').update(password + salt).digest('hex');
console.log('NEW_HASH:', hash);

const message = "\u26A0\uFE0F Veuillez lire ce message seul(e), s'il vous pla\u00EEt. \u26A0\uFE0F\n\nRadhey Radhey,\n\nHi! I am from Pune.\n\nSince you are a psychology student, I think you will really understand what I am trying to share here. I wanted to explain a few things:\n\n1. Why I made this website\nAfter completing my degree, I had a lot of free time. I used to spend it building projects, websites, and games. While coding, I would often fall into the Instagram auto-scroll trap. That\u2019s how your content started appearing on my feed.\n\nYour background music and content had a calming effect on my mind; it helped me focus and slow down. Unknowingly, I started watching your videos regularly. Whenever my code took time to compile or run, I would watch your video transitions. Over time, this unknowingly turned into parasocial interaction for me.\n\nTo get out of it, I applied the exact psychological concepts I was learning about: Acceptance and Commitment Therapy (ACT) \u2013 \u201CCognitive Defusion\u201D, Systematic Desensitization & Exposure Therapy, and Fear Setting.\n\nThrough these tools, I realized that your voice and your presence were having a very strong calming effect on my mind, and I had become overly attached.\n\n2. What I did next and where I am now\nTo break the cycle, I leaned straight into my problem\u2014diving deep into building websites, which is what I love to do. Having watched the entire Mentalist series previously also helped keep my mind analytical and active enough to work my way through it.\n\nNow, I am completely changed and recovered. I\u2019ve also moved forward and enrolled in a network engineering course!\n\n3. Why I am sending this\nI didn\u2019t want the website and the effort I put into it to go to waste, which is why I built it. Also, I want to sincerely apologize if I sent anything inappropriate to your Instagram handle or misbehaved in any way.\n\nWe will probably never meet, but if by some coincidence we ever do cross paths, I\u2019ll probably just walk up and say: \u201CBy the way, my mami shares the exact same date of birth as you (just a different year)!\u201D\n\nLooking back, I think this happened partly because I was feeling lonely. Even though I have friends, they live far away, and I spend most of my time alone working on my projects and job preparation.\n\nOn a positive note, I was genuinely inspired by you. I know you speak multiple languages, and so do I! I currently know Marathi (Ahirani slang), Hindi, English, Sanskrit, Japanese, and Russian. Right now, I\u2019m learning French, and looking into Chinese and Korean (mostly for my little sister, since she loves them).\n\nThank you for reading, and wish you all the best.";

function sha256Hex(str) {
  return crypto.createHash('sha256').update(str).digest('hex');
}

function xorEncrypt(plaintext, pass) {
  const keyHex = sha256Hex(pass + salt);
  const keyBytes = Buffer.from(keyHex, 'hex');
  const msgBytes = Buffer.from(plaintext, 'utf8');
  const out = Buffer.alloc(msgBytes.length);
  for (let i = 0; i < msgBytes.length; i++) {
    out[i] = msgBytes[i] ^ keyBytes[i % 32];
  }
  return out.toString('base64');
}

const xorCipher = xorEncrypt(message, password);
console.log('NEW_XOR_CIPHERTEXT:', xorCipher);

// Verify
function xorDecrypt(cipherB64, pass) {
  const keyHex = sha256Hex(pass + salt);
  const keyBytes = Buffer.from(keyHex, 'hex');
  const cipherBytes = Buffer.from(cipherB64, 'base64');
  const out = Buffer.alloc(cipherBytes.length);
  for (let i = 0; i < cipherBytes.length; i++) {
    out[i] = cipherBytes[i] ^ keyBytes[i % 32];
  }
  return out.toString('utf8');
}

const decrypted = xorDecrypt(xorCipher, password);
console.log('DECRYPTION_VALID:', decrypted === message);
