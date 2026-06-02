/* Northstar Visual — main.js */

(function () {
  'use strict';

  /* ── Baseurl prefix — fix hardcoded /absolute links on subpath deploys ── */
  const baseurl = document.body.dataset.baseurl || '';
  if (baseurl) {
    document.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href');
      if (href && href.startsWith('/') && !href.startsWith(baseurl)) {
        a.setAttribute('href', baseurl + href);
      }
    });
  }

  const header    = document.querySelector('.site-header');
  const scrollBtn = document.getElementById('scroll-top');
  const navToggle = document.getElementById('nav-toggle');
  const siteNav   = document.getElementById('site-nav');

  /* ── Header scroll shadow + scroll-to-top visibility ── */
  function onScroll() {
    const scrolled = window.scrollY > 80;
    header?.classList.toggle('scrolled', scrolled);
    scrollBtn?.classList.toggle('visible', window.scrollY > 400);
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Scroll to top ── */
  scrollBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── Mobile nav toggle ── */
  navToggle?.addEventListener('click', () => {
    const open = navToggle.classList.toggle('open');
    siteNav?.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  /* Close nav on link click or outside click */
  siteNav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });
  document.addEventListener('click', e => {
    if (navToggle?.classList.contains('open') &&
        !header?.contains(e.target)) {
      closeNav();
    }
  });
  function closeNav() {
    navToggle?.classList.remove('open');
    siteNav?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  /* ── Active nav link ── */
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.site-nav a').forEach(link => {
    const href = link.getAttribute('href')?.replace(/\/$/, '') || '';
    if (href === '/' && currentPath === '/') {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else if (href && href !== '/' && currentPath.startsWith(href)) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  /* ── Accordion ── */
  document.querySelectorAll('.accordion__trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion__item');
      const open = item.classList.toggle('open');
      trigger.setAttribute('aria-expanded', String(open));
    });
  });

  /* ── Product category filter ── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;

        document.querySelectorAll('.product-category-group').forEach(group => {
          if (cat === 'all') {
            group.style.display = '';
          } else {
            const hasCat = group.querySelector(`.product-card[data-category="${cat}"]`);
            group.style.display = hasCat ? '' : 'none';
          }
        });
        /* Also hide dividers for hidden groups */
        document.querySelectorAll('.divider').forEach(d => {
          d.style.display = '';
        });
      });
    });
  }

  /* ── Scroll-triggered fade-in ── */
  const fadeEls = document.querySelectorAll('[data-fade]');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          /* Stagger siblings */
          const parent = entry.target.parentElement;
          if (parent) {
            const siblings = parent.querySelectorAll('[data-fade]');
            siblings.forEach((el, i) => {
              if (el === entry.target) {
                el.style.transitionDelay = (i * 0.07) + 's';
              }
            });
          }
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(el => observer.observe(el));
  } else {
    /* Fallback: show everything immediately */
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  /* ── Smooth hash link scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const headerH = header ? header.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ── Theme switcher ── */
  const themeToggle = document.getElementById('theme-toggle');
  const themePanel  = document.getElementById('theme-panel');
  const root        = document.documentElement;

  themeToggle?.addEventListener('click', () => {
    const open = themePanel.classList.toggle('open');
    themeToggle.setAttribute('aria-expanded', String(open));
  });

  /* Close panel on outside click */
  document.addEventListener('click', e => {
    if (themePanel?.classList.contains('open') &&
        !document.getElementById('theme-switcher')?.contains(e.target)) {
      themePanel.classList.remove('open');
      themeToggle?.setAttribute('aria-expanded', 'false');
    }
  });

  document.querySelectorAll('.theme-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
      root.style.setProperty('--color-accent', swatch.dataset.value);
      root.style.setProperty('--color-accent-hover', swatch.dataset.hover);
      document.querySelectorAll('.theme-swatch').forEach(s => {
        s.classList.remove('active');
        s.setAttribute('aria-pressed', 'false');
      });
      swatch.classList.add('active');
      swatch.setAttribute('aria-pressed', 'true');
    });
  });

})();
