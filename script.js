// ===== Yıldızlar =====
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const numStars = 500;

for(let i=0; i<numStars; i++){
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        speed: Math.random() * 0.5 + 0.2
    });
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.y += star.speed;  // yukarıdan aşağı
        if(star.y > canvas.height) star.y = 0;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
    });
    requestAnimationFrame(animateStars);
}
animateStars();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ===== GSAP Animasyon =====
// gsap.from(".text-block h1", {opacity:0, y:50, duration:1.5, ease:"power3.out"});
gsap.from(".text-block h2", {opacity:0, y:50, duration:1.5, delay:1, ease:"power3.out"});
gsap.from(".text-block p", {opacity:0, x:-100, duration:1.5, delay:1.5, ease:"power3.out"});
gsap.from(".image-block img", {opacity:0, scale:0.8, duration:1.5, delay:1, ease:"back.out(1.7)"});

const title = document.querySelector('.main-title');

// Ekran genişliği 500px altındaysa kelimeye dönüştür
let splitType = window.innerWidth < 500 ? 'words' : 'chars';
let mySplitText = new SplitText(title, { type: splitType });
let elements = mySplitText[splitType]; // chars veya words

gsap.from(elements, {
  yPercent: 100,
  opacity: 0,
  rotationX: -90,
  stagger: 0.03,
  ease: "back.out(1.7)",
  duration: 1
});

gsap.to(".social-box", {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 2,
    ease: "back.out(1.7)"
});