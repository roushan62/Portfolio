/* =====================================================================
   Roushan Kumar Gupta — Portfolio v2
   Vanilla JS. No dependencies, no network calls, no backend.
   ===================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Sticky header shadow ---------- */
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
        // Stagger siblings inside the same grid for a gentle cascade.
        var parent = el.parentElement;
        var idx = parent ? Array.prototype.indexOf.call(parent.children, el) : 0;
        el.style.transitionDelay = Math.min(idx, 6) * 60 + 'ms';
        el.classList.add('is-in');
        revealObserver.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

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
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Project filters ---------- */
  var filters = Array.prototype.slice.call(document.querySelectorAll('.filter'));
  var projects = Array.prototype.slice.call(document.querySelectorAll('#projectGrid .proj'));

  // Keep the counts on the filter chips in sync with the actual cards.
  filters.forEach(function (btn) {
    var cat = btn.getAttribute('data-filter');
    var badge = btn.querySelector('[data-count]');
    if (!badge) return;
    badge.textContent = String(
      cat === 'all'
        ? projects.length
        : projects.filter(function (c) { return c.getAttribute('data-cat') === cat; }).length
    );
  });

  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cat = btn.getAttribute('data-filter');
      filters.forEach(function (b) {
        b.setAttribute('aria-pressed', String(b === btn));
      });
      projects.forEach(function (card) {
        var show = cat === 'all' || card.getAttribute('data-cat') === cat;
        card.classList.toggle('is-hidden', !show);
      });
    });
  });

  /* ---------- Certificate lightbox ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxCap = document.getElementById('lightboxCap');
  var lightboxClose = document.getElementById('lightboxClose');
  var lastFocused = null;

  function openLightbox(src, caption) {
    if (!lightbox || !lightboxImg) return;
    lastFocused = document.activeElement;
    lightboxImg.src = src;
    lightboxImg.alt = caption || 'Certificate';
    if (lightboxCap) lightboxCap.textContent = caption || '';
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    if (lightboxClose) lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    if (lightboxImg) lightboxImg.src = '';
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  Array.prototype.forEach.call(document.querySelectorAll('.cert-card'), function (card) {
    card.addEventListener('click', function () {
      openLightbox(card.getAttribute('data-full'), card.getAttribute('data-caption'));
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target.classList.contains('lightbox__inner')) closeLightbox();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (lightbox && lightbox.classList.contains('is-open')) closeLightbox();
    else closeNav();
  });

  /* ---------- Impact counters ---------- */
  var nums = Array.prototype.slice.call(document.querySelectorAll('.impact__num'));

  if (!reduceMotion && 'IntersectionObserver' in window && nums.length) {
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        countObserver.unobserve(el);

        // Animate only the leading numeric token, preserving all surrounding markup.
        var html = el.innerHTML;
        var match = html.match(/^(₹?)(\d+(?:\.\d+)?)/);
        if (!match) return;

        var prefix = match[1];
        var target = parseFloat(match[2]);
        var decimals = (match[2].split('.')[1] || '').length;
        var rest = html.slice(match[0].length);
        var duration = 1100;
        var start = null;

        function step(ts) {
          if (start === null) start = ts;
          var p = Math.min((ts - start) / duration, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          var value = (target * eased).toFixed(decimals);
          el.innerHTML = prefix + value + rest;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });

    nums.forEach(function (n) { countObserver.observe(n); });
  }
})();
