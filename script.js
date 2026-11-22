(function () {
  'use strict';

  // ========== LENIS SMOOTH SCROLL ==========
  const lenisScript = document.createElement('script');
  lenisScript.src = 'https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js';
  lenisScript.onload = () => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    if (window.ScrollTrigger) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }
    window.__lenis = lenis;
  };
  document.head.appendChild(lenisScript);

  gsap.registerPlugin(ScrollTrigger);

  const header = document.getElementById('header');
  ScrollTrigger.create({
    start: 'top -40',
    onUpdate: (self) => header.classList.toggle('scrolled', self.scroll() > 40),
  });

  const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } });
  heroTl
    .fromTo('.hero__label', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, delay: 0.2 })
    .fromTo('.hero__title', { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 1.2 }, '-=0.6')
    .fromTo('.hero__row', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, '-=0.7');

  gsap.to('.hero__bg', {
    yPercent: 30,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.2,
    },
  });

  gsap.to('.hero__inner', {
    opacity: 0.15,
    y: -60,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'center top',
      end: 'bottom top',
      scrub: true,
    },
  });

  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = +el.dataset.count;
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(el, {
          innerText: target,
          duration: 2,
          ease: 'power2.out',
          snap: { innerText: 1 },
          onUpdate() {
            el.innerText = Math.round(+el.innerText);
          },
        });
      },
    });
  });

  gsap.from('.about__media', {
    clipPath: 'inset(100% 0 0 0)',
    duration: 1.4,
    ease: 'power4.inOut',
    scrollTrigger: { trigger: '.about', start: 'top 70%' },
  });
  gsap.from('.about__img', {
    scale: 1.25,
    duration: 1.6,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.about', start: 'top 70%' },
  });
  gsap.from('.about__content > *', {
    y: 50,
    opacity: 0,
    duration: 0.9,
    stagger: 0.08,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.about__content', start: 'top 75%' },
  });

  gsap.utils.toArray('.service').forEach((item) => {
    gsap.from(item, {
      x: -40,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
      },
    });
  });

  gsap.from('.why-card', {
    y: 80,
    opacity: 0,
    duration: 1,
    stagger: { each: 0.1, from: 'start' },
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.why__grid',
      start: 'top 80%',
    },
  });

  gsap.from('.case', {
    y: 100,
    opacity: 0,
    scale: 0.94,
    duration: 1.1,
    stagger: 0.12,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.cases__grid',
      start: 'top 80%',
    },
  });

  gsap.from('.contact__info > *', {
    y: 40,
    opacity: 0,
    duration: 0.85,
    stagger: 0.07,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.contact', start: 'top 75%' },
  });
  gsap.from('.contact__form', {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.contact', start: 'top 75%' },
  });

  document.querySelectorAll('.btn, .nav-cta, .channel').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.25, y: y * 0.25, duration: 0.4, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    });
  });

  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button');
      const t = btn.textContent;
      btn.textContent = 'Отправлено ✓';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = t;
        btn.disabled = false;
        form.reset();
      }, 2200);
    });
  }
})();
