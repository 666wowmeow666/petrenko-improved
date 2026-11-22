(function () {
  'use strict';

  // Header scroll state
  const header = document.getElementById('header');
  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  reveals.forEach((el) => observer.observe(el));

  // Stagger children in grids
  document.querySelectorAll('.services__grid, .features__grid, .projects__grid').forEach((grid) => {
    const cards = grid.querySelectorAll('.reveal');
    cards.forEach((card, i) => {
      card.style.transitionDelay = `${i * 0.08}s`;
    });
  });

  // Smooth form submit (demo)
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Отправлено ✓';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
        form.reset();
      }, 2200);
    });
  }

  // Mobile menu (simple toggle)
  const burger = document.getElementById('burger');
  if (burger) {
    burger.addEventListener('click', () => {
      document.body.classList.toggle('menu-open');
    });
  }
})();
