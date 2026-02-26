// ===========================
// pmap Landing Page Scripts
// ===========================

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initCountUp();
  initEarlyAccess();
  initMockupDemo();
});

// ===========================
// Navbar Scroll Effect
// ===========================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });
}

// ===========================
// Mobile Menu
// ===========================
function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('mobileMenu');
  const links = menu.querySelectorAll('.mobile-link');

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      menu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// ===========================
// Scroll Reveal Animation
// ===========================
function initScrollReveal() {
  const elements = document.querySelectorAll(
    '.feature-card, .step-card, .user-card, .ea-stat-card, .section-header, .preview-showcase'
  );

  elements.forEach(el => el.classList.add('scroll-reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

// ===========================
// Count Up Animation
// ===========================
function initCountUp() {
  const counters = document.querySelectorAll('.stat-number[data-target]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.dataset.target);
          animateCounter(counter, target);
          observer.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
  const duration = 2000;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);

    element.textContent = current.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// ===========================
// Early Access Form
// ===========================
function initEarlyAccess() {
  const form = document.getElementById('earlyAccessForm');
  const success = document.getElementById('eaSuccess');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('emailInput').value;
    if (!email) return;

    // Simulate form submission
    const btn = form.querySelector('button[type="submit"]');
    btn.innerHTML = '<span>送信中...</span>';
    btn.disabled = true;

    setTimeout(() => {
      form.style.display = 'none';
      success.style.display = 'block';
      success.style.animation = 'fadeInUp 0.5s ease both';

      // Store email in localStorage for demo
      const emails = JSON.parse(localStorage.getItem('pmap_early_access') || '[]');
      emails.push({ email, date: new Date().toISOString() });
      localStorage.setItem('pmap_early_access', JSON.stringify(emails));
    }, 1000);
  });
}

// ===========================
// Smooth Scroll for anchor links
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===========================
// Mockup Auto-Demo
// ===========================
function initMockupDemo() {
  const pins = document.querySelectorAll('#heroMockup .mock-pin');
  const cardName = document.getElementById('mockCardName');
  const cardInfo = document.getElementById('mockCardInfo');
  const cardMenus = document.getElementById('mockCardMenus');
  const cardEmoji = document.querySelector('.mock-card-emoji');
  const cardBadge = document.getElementById('mockCardBadge');

  if (!pins.length || !cardName) return;

  const restaurants = [
    {
      emoji: '💪', name: '筋肉食堂 新宿店', info: '⭐ 4.5 • 徒歩3分 • 営業中',
      badge: 'High P', pin: 1,
      menus: [
        { name: 'ステーキ定食', protein: '45g', color: 'green' },
        { name: 'チキングリル', protein: '38g', color: 'green' },
        { name: 'サーモン定食', protein: '32g', color: 'green' },
      ]
    },
    {
      emoji: '🥩', name: '松屋 新宿南口店', info: '⭐ 4.2 • 徒歩1分 • 営業中',
      badge: 'High P', pin: 0,
      menus: [
        { name: '牛焼肉定食', protein: '38g', color: 'green' },
        { name: 'ネギたま牛めし', protein: '28g', color: 'yellow' },
        { name: '牛めし並', protein: '22g', color: 'yellow' },
      ]
    },
    {
      emoji: '🍜', name: 'すき家 新宿店', info: '⭐ 3.9 • 徒歩5分 • 営業中',
      badge: 'Mid P', pin: 2,
      menus: [
        { name: '牛丼(大)', protein: '28g', color: 'yellow' },
        { name: '鮭朝食', protein: '25g', color: 'yellow' },
        { name: '牛丼(並)', protein: '18g', color: 'yellow' },
      ]
    },
    {
      emoji: '☕', name: 'スターバックス 新宿', info: '⭐ 4.0 • 徒歩2分 • 営業中',
      badge: 'Mid P', pin: 3,
      menus: [
        { name: 'プロテインラテ', protein: '22g', color: 'yellow' },
        { name: 'チキンサラダ', protein: '18g', color: 'yellow' },
        { name: 'ヨーグルト', protein: '10g', color: 'red' },
      ]
    },
    {
      emoji: '🍔', name: 'マクドナルド 新宿', info: '⭐ 3.5 • 徒歩4分 • 営業中',
      badge: 'Low P', pin: 4,
      menus: [
        { name: 'ダブルチーズバーガー', protein: '26g', color: 'yellow' },
        { name: 'チキンマックナゲット', protein: '15g', color: 'yellow' },
        { name: 'フィレオフィッシュ', protein: '12g', color: 'red' },
      ]
    },
    {
      emoji: '🍝', name: 'サイゼリヤ 新宿', info: '⭐ 4.1 • 徒歩6分 • 営業中',
      badge: 'High P', pin: 5,
      menus: [
        { name: '若鶏のグリル', protein: '35g', color: 'green' },
        { name: 'ラムのランプステーキ', protein: '30g', color: 'green' },
        { name: 'エスカルゴ', protein: '12g', color: 'red' },
      ]
    },
  ];

  let currentIndex = 0;

  function updateDemo() {
    const r = restaurants[currentIndex];

    // Update pins
    pins.forEach(pin => pin.classList.remove('mock-pin-active'));
    const activePin = document.querySelector(`[data-pin="${r.pin}"]`);
    if (activePin) activePin.classList.add('mock-pin-active');

    // Update card
    if (cardEmoji) cardEmoji.textContent = r.emoji;
    cardName.textContent = r.name;
    if (cardInfo) cardInfo.textContent = r.info;
    if (cardBadge) {
      cardBadge.textContent = r.badge;
      cardBadge.style.background = r.badge === 'High P' ? 'rgba(34, 197, 94, 0.15)'
        : r.badge === 'Mid P' ? 'rgba(250, 204, 21, 0.15)'
          : 'rgba(248, 113, 113, 0.15)';
      cardBadge.style.color = r.badge === 'High P' ? '#4ade80'
        : r.badge === 'Mid P' ? '#facc15'
          : '#f87171';
    }

    // Update menus
    if (cardMenus) {
      cardMenus.innerHTML = r.menus.map(m =>
        `<div class="mock-menu-row"><span>${m.name}</span><span class="mock-protein ${m.color}">${m.protein}</span></div>`
      ).join('');
    }

    currentIndex = (currentIndex + 1) % restaurants.length;
  }

  setInterval(updateDemo, 4000);
}
