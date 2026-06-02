/* ============================================
   SpringSummer Portfolio — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
  const safeInit = (name, initFn) => {
    try {
      if (typeof initFn === 'function') initFn();
    } catch (err) {
      console.warn(`[SafeInit] Failed to load ${name}:`, err);
    }
  };

  safeInit('initMobileNav', initMobileNav);
  safeInit('initScrollHeader', initScrollHeader);
  safeInit('initReveal', initReveal);
  safeInit('initSkillBars', initSkillBars);
  safeInit('initSmoothScroll', initSmoothScroll);
  safeInit('initParticles', initParticles);
  safeInit('initTypewriter', initTypewriter);
  safeInit('initContactForm', initContactForm);
  safeInit('initDockHighlight', initDockHighlight);
  /* 3D Animation System */
  safeInit('initScrollProgress', initScrollProgress);
  safeInit('initCursorGlow', initCursorGlow);
  safeInit('initTiltCards', initTiltCards);
  safeInit('initMagneticDock', initMagneticDock);
  safeInit('initParallaxHero', initParallaxHero);
  safeInit('initRippleButtons', initRippleButtons);
  safeInit('initPageTransition', initPageTransition);
});

/* ── Mobile Navigation ──────────────────────── */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav    = document.querySelector('.nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    const open = nav.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close on link click
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (nav.classList.contains('open') && !nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

/* ── Header Scroll Effect ───────────────────── */
function initScrollHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── Reveal on Scroll ───────────────────────── */
function initReveal() {
  const elements = document.querySelectorAll(
    '.reveal, .reveal-blur, .reveal-left, .reveal-right, .reveal-scale'
  );
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* ── Skill Bar Animations ───────────────────── */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-width') || '0%';
        setTimeout(() => { bar.style.width = width; }, 200);
        setTimeout(() => { bar.classList.add('filled'); }, 1900);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  bars.forEach(bar => observer.observe(bar));
}

/* ── Smooth Scroll (anchor links) ───────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const offset = 80;
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - offset,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ── Particle System ────────────────────────── */
function initParticles() {
  const container = document.getElementById('particleContainer');
  if (!container) return;

  if (typeof p5 !== 'undefined') {
    initP5Particles(container);
  } else {
    initCSSParticles(container);
  }
}

function initP5Particles(container) {
  const isMobile = window.innerWidth < 600;
  const numParticles = isMobile ? 30 : 60;
  const connectDist  = isMobile ? 70 : 110;

  new p5(function (p) {
    let particles = [];

    p.setup = function () {
      const canvas = p.createCanvas(container.offsetWidth, container.offsetHeight);
      canvas.parent(container);
      canvas.style('position', 'absolute');
      canvas.style('top', '0');
      canvas.style('left', '0');
      p.frameRate(45);

      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x:  p.random(p.width),
          y:  p.random(p.height),
          vx: p.random(-0.4, 0.4),
          vy: p.random(-0.4, 0.4),
          size: p.random(2, 5.5),
          opacity: p.random(60, 170)
        });
      }
    };

    p.draw = function () {
      p.clear();

      for (let i = 0; i < particles.length; i++) {
        const pt = particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;

        // Wrap edges
        if (pt.x < 0)        pt.x = p.width;
        if (pt.x > p.width)  pt.x = 0;
        if (pt.y < 0)        pt.y = p.height;
        if (pt.y > p.height) pt.y = 0;

        // Draw particle
        p.noStroke();
        p.fill(255, 255, 255, pt.opacity);
        p.circle(pt.x, pt.y, pt.size);

        // Draw connection lines to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const d = p.dist(pt.x, pt.y, other.x, other.y);
          if (d < connectDist) {
            const alpha = p.map(d, 0, connectDist, 90, 0);
            p.stroke(255, 255, 255, alpha);
            p.strokeWeight(0.6);
            p.line(pt.x, pt.y, other.x, other.y);
          }
        }
      }
    };

    p.windowResized = function () {
      p.resizeCanvas(container.offsetWidth, container.offsetHeight);
    };
  });
}

function initCSSParticles(container) {
  const count = window.innerWidth < 600 ? 20 : 45;
  for (let i = 0; i < count; i++) {
    createCSSParticle(container);
  }
}

function createCSSParticle(container) {
  const p = document.createElement('div');
  p.className = 'particle';

  const size   = Math.random() * 4 + 1.5;
  const x      = Math.random() * 100;
  const y      = Math.random() * 100;
  const dur    = Math.random() * 18 + 10;
  const delay  = Math.random() * 8;
  const driftX = (Math.random() - 0.5) * 120;
  const driftY = (Math.random() - 0.5) * 120;
  const op     = Math.random() * 0.5 + 0.15;

  if (!document.getElementById('particle-kf')) {
    const style = document.createElement('style');
    style.id = 'particle-kf';
    style.textContent = `
      @keyframes particleFloat {
        0%   { transform: translate(0,0) scale(1); }
        100% { transform: translate(var(--dx),var(--dy)) scale(0.7); }
      }
    `;
    document.head.appendChild(style);
  }

  p.style.cssText = `
    width:${size}px; height:${size}px;
    left:${x}%; top:${y}%;
    opacity:${op};
    animation: particleFloat ${dur}s ${delay}s ease-in-out infinite alternate;
  `;
  p.style.setProperty('--dx', `${driftX}px`);
  p.style.setProperty('--dy', `${driftY}px`);

  container.appendChild(p);
}

/* ── Typewriter (Typed.js if loaded, fallback if not) ── */
function initTypewriter() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const strings = [
    'AI Agent & Full-Stack Python Engineer',
    'RAG & GraphRAG Architect',
    'n8n Workflow Automation Specialist',
    'Founder of HK Engineering',
    'Co-Founder of CreativeIQ',
    'SaaS, Automation & Digital Growth Expert'
  ];

  if (typeof Typed !== 'undefined') {
    new Typed('#typed-text', {
      strings,
      typeSpeed: 70,
      backSpeed: 45,
      backDelay: 2000,
      startDelay: 500,
      loop: true,
      showCursor: false
    });
  } else {
    // Simple fallback typewriter
    let si = 0, ci = 0, deleting = false;
    function tick() {
      const str = strings[si];
      if (!deleting) {
        el.textContent = str.slice(0, ci + 1);
        ci++;
        if (ci === str.length) {
          deleting = true;
          setTimeout(tick, 2000);
          return;
        }
      } else {
        el.textContent = str.slice(0, ci - 1);
        ci--;
        if (ci === 0) {
          deleting = false;
          si = (si + 1) % strings.length;
        }
      }
      setTimeout(tick, deleting ? 40 : 80);
    }
    setTimeout(tick, 600);
  }
}

/* ── Contact Form ───────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Quick validation
    const nameInput = document.getElementById('cf-name');
    const emailInput = document.getElementById('cf-email');
    const messageInput = document.getElementById('cf-message');

    if (!nameInput || !emailInput || !messageInput) return;

    if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }

    const btn = form.querySelector('[type="submit"]');
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.textContent = 'Sending…';

    const formData = {
      name: nameInput.value,
      email: emailInput.value,
      subject: document.getElementById('cf-subject')?.value || 'General Inquiry',
      project_type: document.getElementById('cf-type')?.value || 'Other',
      message: messageInput.value
    };

    fetch('https://formsubmit.co/ajax/hemal.shah2004@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      btn.innerHTML = originalText;
      btn.disabled = false;

      if (data.success === "true" || data.success === true) {
        form.reset();
        showToast('Message sent! I\'ll get back to you soon.', 'success');
        const successEl = document.getElementById('form-success');
        if (successEl) {
          successEl.style.display = 'block';
          setTimeout(() => { successEl.style.display = 'none'; }, 5000);
        }
      } else {
        showToast('Oops! Something went wrong. Please try again.', 'error');
      }
    })
    .catch(error => {
      btn.innerHTML = originalText;
      btn.disabled = false;
      showToast('Connection error. Please check your network.', 'error');
      console.error('Error submitting form:', error);
    });
  });
}

/* ── Toast Notification ─────────────────────── */
function showToast(message, type = 'info') {
  let toast = document.getElementById('site-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'site-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = `toast ${type}`;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => { toast.classList.add('show'); });
  });
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* ── Dock Highlight (active page) ───────────── */
function initDockHighlight() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.dock-btn[data-page]').forEach(btn => {
    if (btn.dataset.page === current) {
      btn.style.color = '#fff';
      btn.style.background = 'rgba(59,130,246,0.15)';
    }
  });
}

/* ── Export Utilities ───────────────────────── */
window.SS = { showToast };

/* ============================================
   3D Animation System — New Functions
   ============================================ */

/* ── Scroll Progress Bar ────────────────────── */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  const update = () => {
    const max = document.body.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ── Cursor Glow ────────────────────────────── */
function initCursorGlow() {
  const el = document.getElementById('cursorGlow');
  if (!el || window.matchMedia('(pointer: coarse)').matches) return;
  let raf;
  document.addEventListener('mousemove', e => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      el.style.left = e.clientX + 'px';
      el.style.top  = e.clientY + 'px';
      el.style.opacity = '1';
    });
  });
  document.addEventListener('mouseleave', () => { el.style.opacity = '0'; });
}

/* ── 3D Tilt Cards ──────────────────────────── */
function initTiltCards() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  /* Add tilt-card class + card-sheen to qualifying cards */
  document.querySelectorAll('.project-card, .skill-card, .blog-entry').forEach(card => {
    card.classList.add('tilt-card');
    if (!card.querySelector('.card-sheen')) {
      const sheen = document.createElement('div');
      sheen.className = 'card-sheen';
      card.appendChild(sheen);
    }
  });

  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      const rotY =  x * 10;
      const rotX = -y * 10;
      card.style.transform =
        `perspective(var(--perspective)) rotateY(${rotY}deg) rotateX(${rotX}deg) translateZ(6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform =
        'perspective(var(--perspective)) rotateY(0deg) rotateX(0deg) translateZ(0px)';
    });
  });
}

/* ── Magnetic Dock Buttons ──────────────────── */
function initMagneticDock() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  document.querySelectorAll('.dock-btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r  = btn.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width  / 2)) * 0.38;
      const dy = (e.clientY - (r.top  + r.height / 2)) * 0.38;
      btn.style.transform =
        `scale(1.28) translate(${dx}px, ${dy}px) translateY(-4px) rotate(5deg)`;
      btn.style.filter = 'drop-shadow(0 0 8px rgba(59,130,246,0.55))';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.filter    = '';
    });
  });
}

/* ── Parallax Hero ──────────────────────────── */
function initParallaxHero() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const aurora      = document.querySelector('.hero-aurora');
  const heroContent = document.querySelector('.hero .hero-content');

  if (!aurora && !heroContent) return;

  let lastY = 0;
  const onScroll = () => {
    const y = window.scrollY;
    if (Math.abs(y - lastY) < 2) return;
    lastY = y;
    if (aurora)      aurora.style.transform      = `translateY(${y * 0.15}px) rotate(${y * 0.02}deg)`;
    if (heroContent) heroContent.style.transform = `translateY(${y * 0.04}px)`;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ── Ripple Buttons ─────────────────────────── */
function initRippleButtons() {
  document.querySelectorAll('.hero-grid-btn, .btn, .cta-btn, .cta-hero-btn').forEach(btn => {
    btn.classList.add('ripple-btn');
    btn.addEventListener('click', e => {
      const r      = btn.getBoundingClientRect();
      const size   = 64;
      const ripple = document.createElement('span');
      ripple.style.cssText = [
        'position:absolute',
        `width:${size}px`,
        `height:${size}px`,
        'border-radius:50%',
        'background:rgba(255,255,255,0.22)',
        `top:${e.clientY - r.top  - size / 2}px`,
        `left:${e.clientX - r.left - size / 2}px`,
        'animation:rippleOut 0.55s ease forwards',
        'pointer-events:none',
        'z-index:10'
      ].join(';');
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
}

/* ── Page Transition Fade ───────────────────── */
function initPageTransition() {
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href
      || href.startsWith('#')
      || href.startsWith('http')
      || href.startsWith('mailto')
      || href.startsWith('tel')
      || link.target === '_blank') return;

    link.addEventListener('click', e => {
      e.preventDefault();
      document.body.style.cssText =
        'opacity:0;transform:translateY(-8px);transition:opacity 0.28s ease,transform 0.28s ease;';
      setTimeout(() => { window.location.href = href; }, 295);
    });
  });
}
