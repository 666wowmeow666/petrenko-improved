(function () {
  'use strict';

  const lenisScript = document.createElement('script');
  lenisScript.src = 'https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js';
  lenisScript.onload = init;
  document.head.appendChild(lenisScript);

  function init() {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    gsap.registerPlugin(ScrollTrigger);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const header = document.getElementById('header');
    ScrollTrigger.create({
      start: 'top -40',
      onUpdate: (self) => header.classList.toggle('scrolled', self.scroll() > 40),
    });

    if (typeof SplitType !== 'undefined') {
      document.querySelectorAll('.split-title').forEach((el) => {
        const split = new SplitType(el, { types: 'chars,words', tagName: 'span' });
        gsap.from(split.chars, {
          y: 60,
          opacity: 0,
          rotateX: -40,
          duration: 0.85,
          stagger: 0.018,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        });
      });
    }

    gsap.from('.hero__label', { opacity: 0, y: 24, duration: 0.9, delay: 0.15, ease: 'power3.out' });
    gsap.from('.hero__row', { opacity: 0, y: 40, duration: 1, delay: 0.55, ease: 'power3.out' });

    gsap.to('.hero__bg', {
      yPercent: 28,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.1 },
    });
    gsap.to('.hero__inner', {
      opacity: 0.2,
      y: -50,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'center top', end: 'bottom top', scrub: true },
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
            onUpdate() { el.innerText = Math.round(+el.innerText); },
          });
        },
      });
    });

    gsap.from('.about__media', {
      clipPath: 'inset(100% 0 0 0)',
      duration: 1.35,
      ease: 'power4.inOut',
      scrollTrigger: { trigger: '.about', start: 'top 72%' },
    });
    gsap.from('.about__img', {
      scale: 1.2,
      duration: 1.5,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.about', start: 'top 72%' },
    });
    gsap.from('.about__content > *:not(.split-title)', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.07,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.about__content', start: 'top 75%' },
    });

    gsap.utils.toArray('.service').forEach((item) => {
      gsap.from(item, {
        x: -36,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: { trigger: item, start: 'top 86%' },
      });
    });

    if (window.innerWidth > 960) {
      ScrollTrigger.create({
        trigger: '.why__pin',
        start: 'top 18%',
        end: 'bottom 70%',
        pin: '.why__left',
        pinSpacing: false,
      });
    }
    gsap.from('.why-card', {
      y: 70,
      opacity: 0,
      duration: 0.9,
      stagger: 0.09,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.why__grid', start: 'top 82%' },
    });

    gsap.from('.cases__header > *', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.cases', start: 'top 78%' },
    });
    gsap.from('.case', {
      y: 90,
      opacity: 0,
      scale: 0.95,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.cases__grid', start: 'top 82%' },
    });

    gsap.from('.contact__top, .contact__info > *, .contact__form', {
      y: 40,
      opacity: 0,
      duration: 0.85,
      stagger: 0.06,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.contact', start: 'top 78%' },
    });

    document.querySelectorAll('.btn, .nav-cta, .channel').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.22, y: y * 0.22, duration: 0.35, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1, 0.4)' });
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
  }
})();
