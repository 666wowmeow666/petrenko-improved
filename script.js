(function () {
  'use strict';

  gsap.registerPlugin(ScrollTrigger);

  // Header
  const header = document.getElementById('header');
  ScrollTrigger.create({
    start: 'top -40',
    onUpdate: (self) => {
      header.classList.toggle('scrolled', self.scroll() > 40);
    }
  });

  // Hero entrance
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTl
    .to('.hero__eyebrow', { opacity: 1, y: 0, duration: 0.8, delay: 0.2 })
    .to('.hero__title .line > span', {
      y: 0,
      opacity: 1,
      duration: 1.1,
      stagger: 0.12
    }, '-=0.4')
    .to('.hero__bottom', { opacity: 1, y: 0, duration: 0.9 }, '-=0.5');

  // Hero parallax
  gsap.to('.hero__img', {
    yPercent: 25,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  // Count-up stats
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = parseInt(el.dataset.count, 10);
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(el, {
          innerText: target,
          duration: 1.8,
          ease: 'power2.out',
          snap: { innerText: 1 },
          onUpdate: function () {
            el.innerText = Math.round(this.targets()[0].innerText);
          }
        });
      }
    });
  });

  // About section
  gsap.from('.about__photo-wrap', {
    y: 80,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.about',
      start: 'top 70%'
    }
  });

  gsap.from('.about__award', {
    y: 60,
    opacity: 0,
    duration: 1,
    delay: 0.25,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.about',
      start: 'top 70%'
    }
  });

  gsap.from('.about__text > *', {
    y: 40,
    opacity: 0,
    duration: 0.9,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.about__text',
      start: 'top 75%'
    }
  });

  // Services lines + items
  gsap.utils.toArray('.service').forEach((item, i) => {
    gsap.from(item, {
      y: 50,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 85%'
      }
    });

    const line = item.querySelector('.service__line');
    if (line) {
      gsap.to(line, {
        width: '100%',
        duration: 1.2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: item,
          start: 'top 80%'
        }
      });
    }
  });

  // Why cards
  gsap.from('.why-card', {
    y: 60,
    opacity: 0,
    duration: 0.9,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.why__grid',
      start: 'top 80%'
    }
  });

  // Cases
  gsap.from('.case', {
    y: 70,
    opacity: 0,
    duration: 1,
    stagger: 0.12,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.cases__grid',
      start: 'top 80%'
    }
  });

  // Contact
  gsap.from('.contact__left > *', {
    y: 40,
    opacity: 0,
    duration: 0.9,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.contact',
      start: 'top 75%'
    }
  });

  gsap.from('.contact__form', {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.contact',
      start: 'top 75%'
    }
  });

  // Form demo
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button');
      const span = btn.querySelector('span');
      const original = span.textContent;
      span.textContent = 'Отправлено ✓';
      btn.disabled = true;
      setTimeout(() => {
        span.textContent = original;
        btn.disabled = false;
        form.reset();
      }, 2200);
    });
  }
})();
