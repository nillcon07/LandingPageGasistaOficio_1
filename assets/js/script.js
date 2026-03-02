/* =============================================
   GASEXPERT - LANDING PAGE SCRIPTS
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ===== NAVBAR SCROLL =====
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ===== HAMBURGER MENU =====
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close menu on nav link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity = '';
      });
    });
  });

  // ===== FAQ ACCORDION =====
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        i.querySelector('.faq-answer').classList.remove('open');
      });

      // Open clicked (if was closed)
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        answer.classList.add('open');
      }
    });
  });

  // ===== SCROLL REVEAL =====
  const revealEls = document.querySelectorAll(
    '.service-card, .porque-item, .step, .zona-card, .faq-item, .porque-visual, .porque-text'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children in grids
        const siblings = Array.from(entry.target.parentElement.children);
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${idx * 80}ms`;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  // ===== SMOOTH SCROLL for anchor links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ===== FLOATING WA BUTTON show/hide =====
  const floatWa = document.getElementById('float-wa');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      floatWa.style.opacity = '1';
      floatWa.style.pointerEvents = 'auto';
    } else {
      floatWa.style.opacity = '0';
      floatWa.style.pointerEvents = 'none';
    }
  });
  // Initial state
  floatWa.style.transition = 'opacity 0.3s, transform 0.25s';
  floatWa.style.opacity = '0';
  floatWa.style.pointerEvents = 'none';

  // ===== STATS COUNTER ANIMATION =====
  const stats = [
    { el: document.querySelector('.hero-stats .stat:nth-child(1) span'), target: 500, suffix: '+' },
  ];

  function animateCount(el, target, suffix) {
    let count = 0;
    const increment = Math.ceil(target / 50);
    const timer = setInterval(() => {
      count += increment;
      if (count >= target) {
        count = target;
        clearInterval(timer);
      }
      el.textContent = count + suffix;
    }, 30);
  }

  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        stats.forEach(s => {
          if (s.el) animateCount(s.el, s.target, s.suffix);
        });
        heroObserver.disconnect();
      }
    });
  });

  const heroSection = document.getElementById('hero');
  if (heroSection) heroObserver.observe(heroSection);

});
