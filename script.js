// ========================= Yıldızlar =========================
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 500;

function initStars() {
  stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      speed: Math.random() * 0.5 + 0.2
    });
  }
}

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(star => {
    star.y += star.speed;
    if (star.y > canvas.height) star.y = 0;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
  });
  requestAnimationFrame(animateStars);
}

// Başlat
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
initStars();
animateStars();

// Yeniden boyutlandırma
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initStars();
});



// ========================= Hero Section =========================
gsap.from(".text-block h2", { opacity: 0, y: 50, duration: 1.5, delay: 1, ease: "power3.out" });
gsap.from(".text-block p", { opacity: 0, x: -100, duration: 1.5, delay: 1.5, ease: "power3.out" });
gsap.from(".image-block img", { opacity: 0, scale: 0.8, duration: 1.5, delay: 1, ease: "back.out(1.7)" });

const mainTitle = document.querySelector('.main-title');

// Her zaman karakter karakter parçala
let mySplitText = new SplitText(mainTitle, { type: "chars" });
let elements = mySplitText.chars;

gsap.from(elements, {
  yPercent: 100,
  opacity: 0,
  rotationX: -90,
  stagger: 0.03,
  ease: "back.out(1.7)",
  duration: 1,
  onComplete: () => {
    // İlk animasyon bitince 2 saniye bekle ve ardından startLoop'u başlat
    setTimeout(startLoop, 2000);
  }
});

// Sonsuz zıplama animasyonu: harfler tek tek yukarı çıkıp iniyor
function startLoop() {
  gsap.to(elements, {
    y: "-=20",           // yukarı çıkma miktarı
    stagger: {
      each: 0.05,         // her harf arasında gecikme
      repeat: 1,         // geri dönmesini sağlıyor
      yoyo: true,
      stagger: 0.03,

    },
    ease: "power1.inOut",
    onComplete: () => {
      // 2 saniye bekledikten sonra tekrar başlat
      setTimeout(startLoop, 4000);
    }
  });
}

gsap.to(".social-box", {
  opacity: 1,
  y: 0,
  duration: 1,
  delay: 2,
  ease: "back.out(1.7)"
});

//========================== I'M =========================

const roles = [
  "Web Designer",
  "UI/UX Enthusiast",
  "Creative Coder",
  "Front-End Developer",
  "Full-Stack Developer"
];

let index = 0;
const roleElement = document.getElementById("role");
const prefix = "Hello, I'm a "; // Sabit kısım

function animateRole() {
  const nextRole = roles[index];

  // Önce mevcut harfleri span olarak ayır
  let currentText = roleElement.textContent.substring(prefix.length);
  roleElement.innerHTML = prefix + currentText.split("").map(char => `<span>${char}</span>`).join("");
  const oldLetters = roleElement.querySelectorAll("span");

  // Timeline oluştur
  const tl = gsap.timeline({
    onComplete: () => {
      // Yeni rol için harfleri span ile ayır ve opacity=0 yap
      roleElement.innerHTML = prefix + nextRole.split("").map(char => `<span style="opacity:0">${char}</span>`).join("");
      const newLetters = roleElement.querySelectorAll("span");

      // Yeni harfleri yaz
      gsap.to(newLetters, {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 1,
        ease: "power1.out",
        onComplete: () => {
          // 1.5 saniye bekleyip sonraki metne geç
          index = (index + 1) % roles.length;
          setTimeout(animateRole, 3000);
        }
      });
    }
  });

  // Mevcut harfleri sil
  tl.to(oldLetters, {
    opacity: 0,
    y: -10,
    stagger: { each: 0.03, from: "end" },
    duration: 0.3,
    ease: "power1.in"
  });
}

// Başlat
setTimeout(animateRole, 3000);

// ========================= About-Skills Section =========================

gsap.registerPlugin(SplitText, ScrollTrigger);

document.fonts.ready.then(() => {
  // SplitText oluştur
  const split = new SplitText(".skills-section", {
    type: "lines,words",
    linesClass: "line"
  });

  // Satırları başlangıçta gizle
  gsap.set(split.lines, { yPercent: 100, opacity: 0 });

  // ScrollTrigger animasyonu
  gsap.to(split.lines, {
    yPercent: 0,
    opacity: 1,
    stagger: 0.5,
    duration: 0.6,
    ease: "expo.out",
    scrollTrigger: {
      trigger: ".skills-section",
      start: "top 50%",
      end: "bottom 70%",
      toggleActions: "play reverse play reverse"
    }
  });
});


// ========================= About =========================

gsap.registerPlugin(SplitText, ScrollTrigger);

document.fonts.ready.then(() => {
  // SplitText oluştur
  const split = new SplitText(".about-me, .about-title", {
    type: "lines,words",
    linesClass: "line"
  });

  // Satırları başlangıçta gizle
  gsap.set(split.lines, { yPercent: 100, opacity: 0 });

  // ScrollTrigger animasyonu
  gsap.to(split.lines, {
    yPercent: 0,
    opacity: 1,
    stagger: 0.1,
    duration: 0.6,
    ease: "expo.out",
    scrollTrigger: {
      trigger: ".about-section",
      start: "top 50%",
      end: "bottom 70%",
      toggleActions: "play reverse play reverse"
    }
  });
});

//===================================================================

// gsap.registerPlugin(SplitText, ScrollTrigger);

// document.fonts.ready.then(() => {
//   // SplitText oluştur
//   const split = new SplitText(".projects-section", {
//     type: "lines,words",
//     linesClass: "line"
//   });

//   // Satırları başlangıçta gizle
//   gsap.set(split.lines, { yPercent: 100, opacity: 0 });

//   // ScrollTrigger animasyonu
//   gsap.to(split.lines, {
//     yPercent: 0,
//     opacity: 1,
//     stagger: 0.5,
//     duration: 0.6,
//     ease: "expo.out",
//     scrollTrigger: {
//       trigger: ".projects-section",
//       start: "top 50%",
//       end: "bottom 70%",
//     }
//   });
// });

//======================= Kategori Animasyonu =======================

gsap.registerPlugin(Draggable, InertiaPlugin);

const wrapper = document.querySelector(".projects-cards-wrapper");
const cardsContainer = document.querySelector(".projects-cards");
const allCards = document.querySelectorAll(".projects-cards .card");

const headerTitle = document.querySelector(".projects-categories");

const categoryColors = {
  "Websites": "#ff5959ff",
  "Programs": "#4ecdc4",
  "Automation": "#feca57"
};

// Başlangıçta Websites ve rengi
headerTitle.innerHTML = `<span class="category-span active">Websites</span>`;
headerTitle.querySelector(".category-span").style.color = categoryColors["Websites"];

const maxScroll = cardsContainer.scrollWidth - wrapper.offsetWidth;

Draggable.create(cardsContainer, {
  type: "x",
  bounds: { minX: -maxScroll, maxX: 0 },
  inertia: true,
  edgeResistance: 0.65,
  cursor: "grab",
  activeCursor: "grabbing",
  onDrag: updateCategory,
  onThrowUpdate: updateCategory
});

function updateCategory() {
  const wrapperBounds = wrapper.getBoundingClientRect();
  const centerX = wrapperBounds.left + wrapperBounds.width / 2;

  let closestCard = null;
  let closestDistance = Infinity;

  allCards.forEach(card => {
    const cardBounds = card.getBoundingClientRect();
    const cardCenter = cardBounds.left + cardBounds.width / 2;
    const distance = Math.abs(centerX - cardCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestCard = card;
    }
  });

  if (closestCard) {
    const category = capitalize(closestCard.dataset.category);
    const currentText = headerTitle.textContent.trim();

    if (currentText !== category) {
      gsap.to(headerTitle, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          headerTitle.innerHTML = `<span class="category-span active">${category}</span>`;
          headerTitle.querySelector(".category-span").style.color = categoryColors[category] || "#fff";
          gsap.to(headerTitle, { opacity: 1, duration: 0.3 });
        }
      });
    }
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    const url = card.getAttribute('data-link');
    if (url) {
      window.open(url, '_blank'); // Yeni sekmede açmak için _blank, aynı sekmede açmak için _self
    }
  });
});

//============= Kaydırma Animasyonu ==============

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

ScrollSmoother.create({
  smooth: 1,
  effects: true,
  smoothTouch: 0.1,
  speed: 1.5,
});



