export function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}

export function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 24);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

export function initMobileMenu() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('hidden') === false;
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

let faqListenerBound = false;

export function initFAQ() {
  if (faqListenerBound) return;
  faqListenerBound = true;

  document.addEventListener('click', (event) => {
    const trigger = (event.target as HTMLElement).closest<HTMLElement>('[data-faq-trigger]');
    if (!trigger) return;

    const item = trigger.closest('[data-faq-item]');
    const content = item?.querySelector('.accordion-content');
    const icon = trigger.querySelector('[data-faq-icon]');
    const isOpen = content?.classList.contains('is-open');

    document.querySelectorAll('[data-faq-item] .accordion-content').forEach((el) => {
      el.classList.remove('is-open');
    });
    document.querySelectorAll('[data-faq-trigger]').forEach((btn) => {
      btn.setAttribute('aria-expanded', 'false');
    });
    document.querySelectorAll('[data-faq-icon]').forEach((ic) => {
      ic.classList.remove('rotate-45');
    });

    if (!isOpen && content) {
      content.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
      icon?.classList.add('rotate-45');
    }
  });
}

export function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const animate = (el: Element) => {
    const target = Number(el.getAttribute('data-counter'));
    const suffix = el.getAttribute('data-suffix') ?? '';
    const prefix = el.getAttribute('data-prefix') ?? '';
    const duration = 1400;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      el.textContent = `${prefix}${value}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach((el) => observer.observe(el));
}

export function initSolutionPanel() {
  const panel = document.getElementById('solution-panel');
  const wrap = panel?.closest('.solution-panel-wrap') as HTMLElement | null;
  if (!panel) return;

  const metrics = panel.querySelectorAll('[data-metric]');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const reveal = () => {
    panel.classList.add('is-live');
    metrics.forEach((metric, i) => {
      const delay = reduced ? 0 : i * 120;
      setTimeout(() => metric.classList.add('is-revealed'), delay);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reveal();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(panel);

  if (!reduced && wrap) {
    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      panel.style.transform = `rotateY(${x * 4.5}deg) rotateX(${-y * 4.5}deg)`;
    };

    const onLeave = () => {
      panel.style.transform = '';
    };

    wrap.addEventListener('mousemove', onMove);
    wrap.addEventListener('mouseleave', onLeave);
  }

  metrics.forEach((metric) => {
    metric.addEventListener('mouseenter', () => {
      metrics.forEach((m) => m.classList.remove('is-hovered'));
      metric.classList.add('is-hovered');
    });
    metric.addEventListener('mouseleave', () => {
      metric.classList.remove('is-hovered');
    });
  });
}

export function initHeroParallax() {
  const visual = document.getElementById('hero-visual');
  if (!visual || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const onMove = (e: MouseEvent) => {
    const rect = visual.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    visual.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
  };

  const onLeave = () => {
    visual.style.transform = '';
  };

  visual.addEventListener('mousemove', onMove);
  visual.addEventListener('mouseleave', onLeave);
}

export function initFeatureTabs() {
  const tabs = document.querySelectorAll('[data-feature-tab]');
  const panels = document.querySelectorAll('[data-feature-panel]');
  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const id = tab.getAttribute('data-feature-tab');
      tabs.forEach((t) => t.classList.remove('is-active'));
      panels.forEach((p) => p.classList.remove('is-active'));
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      tabs.forEach((t) => {
        if (t !== tab) t.setAttribute('aria-selected', 'false');
      });
      document.querySelector(`[data-feature-panel="${id}"]`)?.classList.add('is-active');
    });
  });
}

export function initWhatsAppTabs() {
  const tabs = document.querySelectorAll('[data-wa-tab]');
  const panels = document.querySelectorAll('[data-wa-panel]');
  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const id = tab.getAttribute('data-wa-tab');
      tabs.forEach((t) => t.classList.remove('is-active'));
      panels.forEach((p) => p.classList.remove('is-active'));
      tab.classList.add('is-active');
      document.querySelector(`[data-wa-panel="${id}"]`)?.classList.add('is-active');
    });
  });
}

export function initNavSpy() {
  const links = document.querySelectorAll('.nav-link[data-section]');
  const sections = Array.from(links)
    .map((link) => {
      const id = link.getAttribute('data-section');
      const el = id ? document.getElementById(id) : null;
      return el ? { link, el } : null;
    })
    .filter(Boolean) as { link: Element; el: HTMLElement }[];

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach((link) => {
            link.classList.toggle('is-active', link.getAttribute('data-section') === id);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach(({ el }) => observer.observe(el));
}
