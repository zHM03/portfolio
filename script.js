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
gsap.from(".main-header", { opacity: 0, y: 50, duration: 1.5, delay: 1, ease: "power3.out" });
gsap.from(".text-block h2", { opacity: 0, y: 50, duration: 1.5, delay: 1, ease: "power3.out" });
gsap.from(".text-block p", { opacity: 0, x: -100, duration: 1.5, delay: 1.5, ease: "power3.out" });
gsap.from(".image-block img", { opacity: 0, scale: 0.8, duration: 1.5, delay: 1, ease: "back.out(1.7)" });
gsap.from(".svg-frame", { opacity: 0, scale: 0.8, duration: 1.5, delay: 1, ease: "back.out(1.7)" });

const mainTitle = document.querySelector('.main-title');

// Ekran genişliği 500px altındaysa kelimeye dönüştür
let splitType = window.innerWidth < 500 ? 'words' : 'chars';
let mySplitText = new SplitText(mainTitle, { type: splitType });
let elements = mySplitText[splitType];

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

// ========================= About-Skills Section =========================

// Skills rengi soldan sağa
const skillsSection = document.querySelector('.skills-section');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      skillsSection.classList.add('skills-animate');
      observer.unobserve(skillsSection); // sadece bir kez çalışsın
    }
  });
}, { threshold: 0.2 }); // section %50 görünür olunca tetiklenecek

observer.observe(skillsSection);

// ========================= Kaydırma =========================

document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const sections = gsap.utils.toArray("section");
    const leftSection = document.querySelector(".project-section .left");
    const rightSection = document.querySelector(".project-section .right");

    let isAnimating = false;
    let atBottomEdge = false;
    let atTopEdge = false;
    let scrollQueue = 0;
    let isTicking = false;

    // ---------------- ScrollTrigger ile section kaydırma ----------------
    sections.forEach((section, i) => {
        if (i < sections.length - 1) {
            ScrollTrigger.create({
                trigger: section,
                start: "bottom bottom",
                end: "bottom top",
                onEnter: () => scrollToSection(i + 1),
                onEnterBack: () => scrollToSection(i)
            });
        }
    });

    function scrollToSection(index) {
        if (isAnimating || index < 0 || index >= sections.length) return;
        isAnimating = true;
        gsap.to(window, {
            duration: 1.2,
            scrollTo: { y: sections[index], autoKill: false },
            ease: "power2.inOut",
            overwrite: "auto",
            onComplete: () => isAnimating = false
        });
    }

    // ---------------- Sol alan scroll -> sağ kart scroll ----------------
    leftSection.addEventListener("wheel", (e) => {
        e.preventDefault();
        scrollQueue += e.deltaY;

        if (!isTicking) {
            requestAnimationFrame(() => {
                handleLeftScroll(scrollQueue);
                scrollQueue = 0;
                isTicking = false;
            });
            isTicking = true;
        }
    });

    function handleLeftScroll(scrollAmount) {
        const maxScroll = rightSection.scrollHeight - rightSection.clientHeight;

        // Kart en altta ve aşağı scroll yapılmışsa
        if (scrollAmount > 0 && rightSection.scrollTop >= maxScroll) {
            if (atBottomEdge) {
                const nextIndex = sections.indexOf(document.querySelector(".project-section")) + 1;
                scrollToSection(nextIndex);
            }
            atBottomEdge = true;
        }
        // Kart en üstte ve yukarı scroll yapılmışsa
        else if (scrollAmount < 0 && rightSection.scrollTop <= 0) {
            if (atTopEdge) {
                const prevIndex = sections.indexOf(document.querySelector(".project-section")) - 1;
                scrollToSection(prevIndex);
            }
            atTopEdge = true;
        }
        // Kart hâlâ kayabiliyorsa
        else {
            gsap.to(rightSection, {
                scrollTop: rightSection.scrollTop + scrollAmount,
                duration: 0.5,
                ease: "power2.out"
            });
            atBottomEdge = false;
            atTopEdge = false;
        }
    }
});

//======================= Kategori Animasyonu =======================

const categorySpans = document.querySelectorAll(".categories span");
const projectCategories = document.querySelectorAll(".project-category");
const rightSection = document.querySelector(".project-section .right");

function updateActiveCategory() {
    const containerRect = rightSection.getBoundingClientRect();
    const containerMiddle = containerRect.top + containerRect.height / 2;

    projectCategories.forEach(category => {
        const rect = category.getBoundingClientRect();
        // Container ortasına göre kontrol
        if (rect.top < containerMiddle && rect.bottom > containerMiddle) {
            // Önce tüm span'ları resetle
            categorySpans.forEach(span => {
                span.style.transform = "scale(1)";
                span.style.color = "";
                span.style.transition = "all 0.3s"; // smooth geçiş
            });

            // Aktif span
            const title = category.dataset.title;
            const activeSpan = Array.from(categorySpans).find(s => s.textContent.trim() === title);
            if (activeSpan) {
                activeSpan.style.transform = "scale(1.3)";
                activeSpan.style.color = category.dataset.color;
            }
        }
    });
}

// Sağ kart scroll'u izleme
rightSection.addEventListener("scroll", updateActiveCategory);

// Başlangıçta da çalıştır
updateActiveCategory();
