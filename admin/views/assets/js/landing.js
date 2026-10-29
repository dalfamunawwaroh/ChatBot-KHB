/* KHB landing CTAs -> halaman login / demo widget */
'use strict';
const _go = (id, url) => { const b = document.getElementById(id); if (b) b.addEventListener('click', e => { e.preventDefault(); window.location.href = url; }); };
_go('lp-login-btn','login.html'); _go('lp-register-btn','login.html');
_go('lp-login-btn-m','login.html'); _go('lp-register-btn-m','login.html');
_go('lp-hero-cta-main','login.html'); _go('lp-hero-cta-demo','widget/chat.html');
_go('lp-faq-chat-btn','widget/chat.html'); _go('lp-cta-register','login.html');
_go('lp-cta-login','login.html'); _go('lp-footer-login','login.html');
_go('lp-footer-register','login.html');
/* ── Navbar scroll effect ── */
const lpNav = document.getElementById('lp-nav');
if (lpNav) {
  window.addEventListener('scroll', () => {
    lpNav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

/* ── Mobile menu toggle ── */
const lpMobileToggle = document.getElementById('lp-mobile-toggle');
const lpMobileMenu   = document.getElementById('lp-mobile-menu');
if (lpMobileToggle && lpMobileMenu) {
  lpMobileToggle.addEventListener('click', () => {
    lpMobileMenu.classList.toggle('hidden');
  });
  /* Close on link click */
  lpMobileMenu.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('click', () => lpMobileMenu.classList.add('hidden'));
  });
}

/* ── Smooth anchor scroll for nav links ── */
document.querySelectorAll('.lp-nav-link, .lp-mobile-link').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  });
});

/* ── FAQ Accordion ── */
document.querySelectorAll('.lp-faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.lp-faq-item');
    const isOpen = item.classList.contains('open');
    /* Close all */
    document.querySelectorAll('.lp-faq-item.open').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.lp-faq-q').setAttribute('aria-expanded', 'false');
    });
    /* Open clicked (unless it was already open) */
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

/* ── Scroll Reveal (IntersectionObserver) ── */
function initScrollReveal() {
  const revealEls = document.querySelectorAll(
    '.lp-feature-card, .lp-step-content, .lp-testimonial-card, .lp-faq-item, .lp-section-header, .lp-stat-item'
  );
  revealEls.forEach((el, i) => {
    el.classList.add('lp-reveal');
    const delay = (i % 4) * 0.1;
    el.style.transitionDelay = delay + 's';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
}

/* ── Animated number counters ── */
function animateCounters() {
  const statEls = document.querySelectorAll('.lp-stat-item strong');
  statEls.forEach(el => {
    const rawText = el.textContent.trim();
    const numMatch = rawText.match(/[\d,.]+/);
    if (!numMatch) return;

    const raw = numMatch[0].replace(/[,.]/g, '');
    const target = parseInt(raw, 10);
    if (isNaN(target) || target === 0) return;

    const suffix = rawText.replace(numMatch[0], '');
    const prefix = rawText.slice(0, rawText.indexOf(numMatch[0]));
    const duration = 1800;
    const startTime = performance.now();
    const hasComma = numMatch[0].includes(',') || numMatch[0].includes('.');

    el._animated = true;

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(ease * target);

      let display = current.toString();
      if (hasComma && current >= 1000) {
        display = current.toLocaleString('id-ID');
      }
      el.textContent = prefix + display + suffix;

      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

/* ── Stats bar counter trigger ── */
function initStatsObserver() {
  const statsBar = document.querySelector('.lp-stats-bar');
  if (!statsBar) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  observer.observe(statsBar);
}

/* ── Init landing page (runs once DOM ready) ── */
function initLandingPage() {
  initScrollReveal();
  initStatsObserver();
}

/* Start init */
initLandingPage();
/* ── DALFA v3: scroll progress bar ── */
(function initScrollProgress() {
  const fill = document.getElementById('lp-progress-fill');
  if (!fill) return;
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    fill.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
