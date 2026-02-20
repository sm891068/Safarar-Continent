// ========================================
// Initialize Fate Ring Diamonds
// ========================================
function createRingDiamonds() {
   const outerGroup = document.getElementById('outer-diamonds');
   const innerGroup = document.getElementById('inner-diamonds');
   const outerCount = 8;
   const innerCount = 6;
   
   for (let i = 0; i < outerCount; i++) {
       const angle = (i / outerCount) * 360;
       const diamond = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
       diamond.setAttribute('x', '48');
       diamond.setAttribute('y', '5');
       diamond.setAttribute('width', '4');
       diamond.setAttribute('height', '4');
       diamond.setAttribute('fill', '#D4AF37');
       diamond.setAttribute('opacity', '0.6');
       diamond.setAttribute('transform', `rotate(${angle} 50 50)`);
       outerGroup.appendChild(diamond);
   }
   
   for (let i = 0; i < innerCount; i++) {
       const angle = (i / innerCount) * 360;
       const diamond = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
       diamond.setAttribute('x', '48');
       diamond.setAttribute('y', '22');
       diamond.setAttribute('width', '4');
       diamond.setAttribute('height', '4');
       diamond.setAttribute('fill', '#FFD700');
       diamond.setAttribute('opacity', '0.8');
       diamond.setAttribute('transform', `rotate(${angle} 50 50)`);
       innerGroup.appendChild(diamond);
   }
}

// ========================================
// Dust Particle System
// ========================================
const dustCanvas = document.getElementById('dust-canvas');
const dustCtx = dustCanvas.getContext('2d');
let dustParticles = [];

function resizeDustCanvas() {
   dustCanvas.width = window.innerWidth;
   dustCanvas.height = window.innerHeight;
}

class DustParticle {
   constructor() {
       this.reset();
       this.y = Math.random() * dustCanvas.height;
   }
   
   reset() {
       this.x = Math.random() * dustCanvas.width;
       this.y = dustCanvas.height + 10;
       this.size = Math.random() * 3 + 1;
       this.speedY = Math.random() * 0.3 + 0.1;
       this.speedX = (Math.random() - 0.5) * 0.2;
       this.opacity = Math.random() * 0.15 + 0.05;
       this.pulse = Math.random() * Math.PI;
   }
   
   update() {
       this.y -= this.speedY;
       this.x += this.speedX + Math.sin(this.y * 0.01) * 0.1;
       this.pulse += 0.02;
       this.currentOpacity = this.opacity * (0.8 + Math.sin(this.pulse) * 0.2);
       
       if (this.y < -10) {
           this.reset();
       }
   }
   
   draw() {
       dustCtx.beginPath();
       dustCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
       dustCtx.fillStyle = `rgba(212, 175, 55, ${this.currentOpacity})`;
       dustCtx.fill();
   }
}

class MicroDust {
   constructor() {
       this.reset();
       this.y = Math.random() * dustCanvas.height;
   }
   
   reset() {
       this.x = Math.random() * dustCanvas.width;
       this.y = dustCanvas.height + 5;
       this.size = Math.random() * 1.5 + 0.5;
       this.speedY = Math.random() * 0.5 + 0.2;
       this.speedX = (Math.random() - 0.5) * 0.3;
       this.opacity = Math.random() * 0.08 + 0.04;
   }
   
   update() {
       this.y -= this.speedY;
       this.x += this.speedX;
       if (this.y < -5) this.reset();
   }
   
   draw() {
       dustCtx.beginPath();
       dustCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
       dustCtx.fillStyle = `rgba(250, 240, 230, ${this.opacity})`;
       dustCtx.fill();
   }
}

// ========================================
// Magic Rune System
// ========================================
const magicCanvas = document.getElementById('magic-canvas');
const magicCtx = magicCanvas.getContext('2d');
let runes = [];
let magicIntensity = 1;

function resizeMagicCanvas() {
   magicCanvas.width = window.innerWidth;
   magicCanvas.height = window.innerHeight;
}

const runeSymbols = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ'];

class Rune {
   constructor() {
       this.reset();
       this.x = Math.random() * magicCanvas.width;
       this.life = Math.random() * 1000;
   }
   
   reset() {
       this.x = Math.random() < 0.5 ? -50 : magicCanvas.width + 50;
       this.y = Math.random() * magicCanvas.height * 0.8 + magicCanvas.height * 0.1;
       this.symbol = runeSymbols[Math.floor(Math.random() * runeSymbols.length)];
       this.size = Math.random() * 20 + 15;
       this.speedX = (Math.random() - 0.5) * 0.3;
       this.speedY = (Math.random() - 0.5) * 0.2;
       this.opacity = 0;
       this.targetOpacity = Math.random() * 0.15 + 0.05;
       this.phase = Math.random() * Math.PI * 2;
       this.orbitRadius = Math.random() * 100 + 50;
       this.orbitSpeed = (Math.random() - 0.5) * 0.01;
       this.orbitAngle = Math.random() * Math.PI * 2;
       this.centerX = this.x;
       this.centerY = this.y;
   }
   
   update() {
       this.orbitAngle += this.orbitSpeed;
       this.x = this.centerX + Math.cos(this.orbitAngle) * this.orbitRadius;
       this.y = this.centerY + Math.sin(this.orbitAngle) * this.orbitRadius * 0.3;
       this.phase += 0.02;
       
       if (this.life > 0) {
           this.life--;
           if (this.opacity < this.targetOpacity) this.opacity += 0.002;
       } else {
           this.opacity -= 0.01;
           if (this.opacity <= 0) {
               this.reset();
               this.life = 1000 + Math.random() * 500;
           }
       }
       
       if (Math.random() < 0.001) {
           this.opacity = 0.4;
       }
   }
   
   draw() {
       magicCtx.save();
       magicCtx.globalAlpha = this.opacity * magicIntensity;
       magicCtx.font = `${this.size}px Cinzel`;
       magicCtx.fillStyle = Math.random() > 0.5 ? '#9D7DB5' : '#D4AF37';
       magicCtx.shadowBlur = 10;
       magicCtx.shadowColor = magicCtx.fillStyle;
       magicCtx.fillText(this.symbol, this.x, this.y);
       magicCtx.restore();
   }
}

// ========================================
// Animation Loop
// ========================================
function animate() {
   dustCtx.clearRect(0, 0, dustCanvas.width, dustCanvas.height);
   magicCtx.clearRect(0, 0, magicCanvas.width, magicCanvas.height);
   
   dustParticles.forEach(p => {
       p.update();
       p.draw();
   });
   
   microDust.forEach(p => {
       p.update();
       p.draw();
   });
   
   runes.forEach(r => {
       r.update();
       r.draw();
   });
   
   requestAnimationFrame(animate);
}

// ========================================
// Menu Interaction
// ========================================
const buttons = document.querySelectorAll('.menu-button');
const secondaryHint = document.getElementById('secondaryHint');
const mainHint = document.getElementById('mainHint');
let activeIndex = 0;
let hintTimeout;

function updateActiveButton(index) {
   buttons.forEach((btn, i) => {
       if (i === index) {
           btn.classList.add('active');
           secondaryHint.textContent = btn.querySelector('.button-narrative').textContent;
           secondaryHint.style.opacity = '0.6';
       } else {
           btn.classList.remove('active');
       }
   });
}

function createRipple(button) {
   const ripple = document.createElement('div');
   ripple.style.position = 'absolute';
   ripple.style.width = '20px';
   ripple.style.height = '20px';
   ripple.style.background = 'radial-gradient(circle, rgba(212,175,55,0.8) 0%, transparent 70%)';
   ripple.style.borderRadius = '50%';
   ripple.style.transform = 'translate(-50%, -50%)';
   ripple.style.pointerEvents = 'none';
   ripple.style.animation = 'rippleExpand 0.6s ease-out forwards';
   ripple.style.left = '50%';
   ripple.style.top = '50%';
   button.appendChild(ripple);
   
   setTimeout(() => ripple.remove(), 600);
}

// ========================================
// Event Listeners
// ========================================
buttons.forEach((btn, index) => {
   btn.addEventListener('mouseenter', () => {
       activeIndex = index;
       updateActiveButton(index);
       secondaryHint.textContent = btn.getAttribute('data-narrative');
       
       clearTimeout(hintTimeout);
       hintTimeout = setTimeout(() => {
           mainHint.style.opacity = '0';
       }, 2000);
   });
   
   btn.addEventListener('click', () => {
       createRipple(btn);
       console.log(`Selected: ${btn.querySelector('.button-text').textContent}`);
       // Add your navigation logic here
   });

   // Touch support for mobile
   btn.addEventListener('touchstart', (e) => {
       e.preventDefault();
       activeIndex = index;
       updateActiveButton(index);
   });

   btn.addEventListener('touchend', (e) => {
       e.preventDefault();
       createRipple(btn);
       console.log(`Selected: ${btn.querySelector('.button-text').textContent}`);
   });
});

// ========================================
// Keyboard Navigation
// ========================================
document.addEventListener('keydown', (e) => {
   if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
       e.preventDefault();
       activeIndex = (activeIndex + 1) % buttons.length;
       updateActiveButton(activeIndex);
       buttons[activeIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
   } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
       e.preventDefault();
       activeIndex = (activeIndex - 1 + buttons.length) % buttons.length;
       updateActiveButton(activeIndex);
       buttons[activeIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
   } else if (e.key === 'Enter') {
       e.preventDefault();
       buttons[activeIndex].click();
   }
});

// ========================================
// Mouse Movement Parallax
// ========================================
document.addEventListener('mousemove', (e) => {
   const x = (e.clientX / window.innerWidth - 0.5) * 20;
   const y = (e.clientY / window.innerHeight - 0.5) * 20;
   
   document.querySelectorAll('.border-ornament').forEach((el, i) => {
       const factor = (i + 1) * 2;
       el.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
   });
});

// ========================================
// Fate Ring Interaction
// ========================================
const fateRing = document.getElementById('fateRing');
fateRing.addEventListener('mouseenter', () => {
   magicIntensity = 1.5;
   document.querySelector('.fate-ring').style.animationDuration = '15s';
   document.querySelector('.fate-ring-inner').style.animationDuration = '7.5s';
});

fateRing.addEventListener('mouseleave', () => {
   magicIntensity = 1;
   document.querySelector('.fate-ring').style.animationDuration = '30s';
   document.querySelector('.fate-ring-inner').style.animationDuration = '15s';
});

// ========================================
// Inactivity Timeout
// ========================================
let inactivityTimeout;
function resetInactivity() {
   clearTimeout(inactivityTimeout);
   inactivityTimeout = setTimeout(() => {
       mainHint.style.opacity = '0.5';
   }, 10000);
}

document.addEventListener('mousemove', resetInactivity);
document.addEventListener('keydown', resetInactivity);
document.addEventListener('touchstart', resetInactivity);

// ========================================
// Window Resize Handler
// ========================================
function handleResize() {
   resizeDustCanvas();
   resizeMagicCanvas();
}

window.addEventListener('resize', handleResize);

// ========================================
// Initialize
// ========================================
function init() {
   // Create ring diamonds
   createRingDiamonds();
   
   // Setup canvases
   resizeDustCanvas();
   resizeMagicCanvas();
   
   // Create particles
   for (let i = 0; i < 60; i++) {
       dustParticles.push(new DustParticle());
   }
   
   const microDust = [];
   for (let i = 0; i < 40; i++) {
       microDust.push(new MicroDust());
   }
   window.microDust = microDust;
   
   // Create runes
   for (let i = 0; i < 12; i++) {
       runes.push(new Rune());
   }
   
   // Start animation
   animate();
   
   // Initialize first button as active
   updateActiveButton(0);
   
   // Start inactivity timer
   resetInactivity();
   
   // Remove seal animation after completion
   setTimeout(() => {
       document.getElementById('sealOverlay').style.display = 'none';
   }, 1000);
}

// Start when DOM is loaded
if (document.readyState === 'loading') {
   document.addEventListener('DOMContentLoaded', init);
} else {
   init();
}

// Export microDust to global scope for animate function
window.microDust = [];