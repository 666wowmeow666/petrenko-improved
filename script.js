(function () {
  'use strict';
  gsap.registerPlugin(ScrollTrigger);

  const header = document.getElementById('header');
  ScrollTrigger.create({
    start: 'top -30',
    onUpdate: (self) => header.classList.toggle('scrolled', self.scroll() > 30)
  });

  // Hero
  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .to('.hero__label', { opacity: 1, y: 0, duration: 0.7, delay: 0.15 })
    .to('.hero__title', { opacity: 1, y: 0, duration: 0.9 }, '-=0.35')
    .to('.hero__row', { opacity: 1, y: 0, duration: 0.8 }, '-=0.45');

  gsap.to('.hero__bg', {
    yPercent: 18,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });

  // Counts
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = +el.dataset.count;
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => gsap.to(el, {
        innerText: target,
        duration: 1.6,
        ease: 'power2.out',
        snap: { innerText: 1 },
        onUpdate() { el.innerText = Math.round(+el.innerText); }
      })
    });
  });

  // Sections
  gsap.utils.toArray('.about__media, .about__content > *').forEach((el, i) => {
    gsap.from(el, {
      y: 36, opacity: 0, duration: 0.85, delay: i * 0.05,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.about', start: 'top 75%' }
    });
  });

  gsap.from('.service', {
    y: 40, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
    scrollTrigger: { trigger: '.services__list', start: 'top 82%' }
  });

  gsap.from('.why-card', {
    y: 36, opacity: 0, duration: 0.75, stagger: 0.08, ease: 'power3.out',
    scrollTrigger: { trigger: '.why__grid', start: 'top 82%' }
  });

  gsap.from('.case', {
    y: 40, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
    scrollTrigger: { trigger: '.cases__grid', start: 'top 82%' }
  });

  gsap.from('.contact__info > *, .contact__form', {
    y: 30, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out',
    scrollTrigger: { trigger: '.contact', start: 'top 78%' }
  });

  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button');
      const t = btn.textContent;
      btn.textContent = 'Отправлено ✓';
      btn.disabled = true;
      setTimeout(() => { btn.textContent = t; btn.disabled = false; form.reset(); }, 2000);
    });
  }
})();
