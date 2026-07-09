// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

// ===== SLIDER =====
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let current = 0;
let autoTimer;

function goTo(idx) {
  slides[current].classList.remove('active');
  slides[current].classList.add('exit');
  setTimeout(() => { slides[current].classList.remove('exit'); }, 600);
  dots[current].classList.remove('active');
  current = (idx + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
}

function startAuto() {
  clearInterval(autoTimer);
  autoTimer = setInterval(() => goTo(current + 1), 4500);
}

document.getElementById('nextBtn').addEventListener('click', () => { goTo(current + 1); startAuto(); });
document.getElementById('prevBtn').addEventListener('click', () => { goTo(current - 1); startAuto(); });
dots.forEach(dot => {
  dot.addEventListener('click', () => { goTo(+dot.dataset.index); startAuto(); });
});
startAuto();

// ===== PRODUCT FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    productCards.forEach(card => {
      if (f === 'all' || card.dataset.cat === f) {
        card.classList.remove('hidden');
        card.style.animation = 'none';
        requestAnimationFrame(() => {
          card.style.animation = 'fadeIn 0.4s ease forwards';
        });
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// Add fadeIn keyframe dynamically
const style = document.createElement('style');
style.textContent = '@keyframes fadeIn { from { opacity:0; transform:translateY(15px);} to { opacity:1; transform:translateY(0);} }';
document.head.appendChild(style);

// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) backToTop.classList.add('visible');
  else backToTop.classList.remove('visible');
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== SMOOTH ACTIVE NAV =====
const sections = document.querySelectorAll('section[id], div[id]');
const navAs = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 150) cur = s.id;
  });
  navAs.forEach(a => {
    a.style.color = '';
    a.style.background = '';
    if (a.getAttribute('href') === '#' + cur) {
      a.style.color = '#E63946';
      a.style.background = '#FFF3E0';
    }
  });
});

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.cat-card, .product-card, .why-card, .brand-card, .info-card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }, i * 60);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(25px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
