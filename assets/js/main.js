/* =====================================================================
   Roushan Kumar Gupta — Portfolio v3 · Glassmorphism Theme
   ===================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Cursor glow ---------- */
  var cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow && !reduceMotion && window.innerWidth > 768) {
    var mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;
    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    function animateGlow() {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      cursorGlow.style.left = glowX + 'px';
      cursorGlow.style.top = glowY + 'px';
      requestAnimationFrame(animateGlow);
    }
    animateGlow();
  } else if (cursorGlow) {
    cursorGlow.style.display = 'none';
  }

  /* ---------- Sticky header & back to top ---------- */
  var header = document.getElementById('siteHeader');
  var toTop = document.getElementById('toTop');

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('is-stuck', y > 8);
    if (toTop) toTop.classList.toggle('is-visible', y > 620);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------- Mobile navigation ---------- */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  function closeNav() {
    if (!navLinks || !navToggle) return;
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var open = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav();
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) closeNav();
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var parent = el.parentElement;
        var idx = parent ? Array.prototype.indexOf.call(parent.children, el) : 0;
        el.style.transitionDelay = Math.min(idx, 8) * 70 + 'ms';
        el.classList.add('is-in');
        revealObserver.unobserve(el);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- Active nav link on scroll ---------- */
  var sections = Array.prototype.slice.call(
    document.querySelectorAll('main section[id]')
  );
  var linkMap = {};
  Array.prototype.forEach.call(document.querySelectorAll('#navLinks a'), function (a) {
    var id = (a.getAttribute('href') || '').replace('#', '');
    if (id) linkMap[id] = a;
  });

  if (sections.length && 'IntersectionObserver' in window) {
    var current = null;
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        if (id === current || !linkMap[id]) return;
        if (current && linkMap[current]) linkMap[current].classList.remove('is-active');
        linkMap[id].classList.add('is-active');
        current = id;
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Project filters ---------- */
  var filters = Array.prototype.slice.call(document.querySelectorAll('.glass-filter'));
  var projects = Array.prototype.slice.call(document.querySelectorAll('#projectGrid .proj-card'));

  filters.forEach(function (btn) {
    var cat = btn.getAttribute('data-filter');
    var badge = btn.querySelector('span');
    if (badge) {
      badge.textContent = String(
        cat === 'all'
          ? projects.length
          : projects.filter(function (c) { return c.getAttribute('data-cat') === cat; }).length
      );
    }
  });

  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cat = btn.getAttribute('data-filter');
      filters.forEach(function (b) { b.classList.toggle('active', b === btn); });
      projects.forEach(function (card) {
        var show = cat === 'all' || card.getAttribute('data-cat') === cat;
        card.classList.toggle('is-hidden', !show);
      });
    });
  });

  /* ---------- Impact counter animation ---------- */
  var impactNums = Array.prototype.slice.call(document.querySelectorAll('.impact-num[data-target]'));

  if (!reduceMotion && 'IntersectionObserver' in window && impactNums.length) {
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        countObserver.unobserve(el);

        var target = parseFloat(el.getAttribute('data-target'));
        var decimals = (String(target).split('.')[1] || '').length;
        var duration = 1400;
        var start = null;

        function step(ts) {
          if (start === null) start = ts;
          var p = Math.min((ts - start) / duration, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          var value = (target * eased).toFixed(decimals);
          el.textContent = value;
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = target % 1 === 0 ? String(target) : target.toFixed(decimals);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });

    impactNums.forEach(function (n) { countObserver.observe(n); });
  }

  /* ---------- Parallax tilt on glass cards ---------- */
  if (!reduceMotion && window.innerWidth > 1024) {
    var tiltCards = document.querySelectorAll('.glass-card');
    tiltCards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = 'translateY(-4px) perspective(800px) rotateY(' + (x * 3) + 'deg) rotateX(' + (-y * 3) + 'deg)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  /* ---------- Typed text effect for hero (subtle) ---------- */
  var heroTitle = document.querySelector('.hero-title');
  if (heroTitle && !reduceMotion) {
    heroTitle.style.opacity = '0';
    heroTitle.style.transform = 'translateY(20px)';
    heroTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    setTimeout(function () {
      heroTitle.style.opacity = '1';
      heroTitle.style.transform = 'translateY(0)';
    }, 200);
  }

  /* ---------- Smooth section entrance with staggered children ---------- */
  var statItems = document.querySelectorAll('.stat-item');
  statItems.forEach(function (item, i) {
    item.style.opacity = '0';
    item.style.transform = 'translateY(15px)';
    item.style.transition = 'opacity 0.5s ease ' + (0.5 + i * 0.15) + 's, transform 0.5s ease ' + (0.5 + i * 0.15) + 's';
    setTimeout(function () {
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, 100);
  });

  /* ---------- Keyboard navigation ---------- */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

  /* ---------- Company logo error fallback styling ---------- */
  document.querySelectorAll('.client-logo img, .proj-client-logo img, .tl-company-logo img').forEach(function (img) {
    img.addEventListener('error', function () {
      this.style.display = 'none';
    });
  });

})();
