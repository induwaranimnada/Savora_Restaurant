/* ============================================
   Savora Restaurant — Vanilla JS
   ============================================ */

// ---------- Mobile nav toggle ----------
(function initMobileNav() {
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => links.classList.remove('open'))
  );
})();

// ---------- Highlight active nav link ----------
(function highlightActive() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path) a.classList.add('active');
  });
})();

// ---------- Scroll fade-in animations ----------
(function initScrollAnimations() {
  const els = document.querySelectorAll('.fade-in');
  if (!('IntersectionObserver' in window) || els.length === 0) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => io.observe(el));
})();

// ---------- Menu category filter ----------
(function initMenuFilter() {
  const tabs = document.querySelectorAll('.tab-btn');
  const items = document.querySelectorAll('.menu-grid .dish-card');
  if (tabs.length === 0 || items.length === 0) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const category = tab.dataset.category;
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      items.forEach(item => {
        const match = category === 'all' || item.dataset.category === category;
        item.style.display = match ? '' : 'none';
      });
    });
  });
})();
let cart = [];

function addToCart(name, price){

    cart.push({
        name: name,
        price: price
    });

     console.log(cart);

    alert(name + " added to cart!");
}

// ---------- Gallery Lightbox ----------
(function initLightbox() {
  const items = document.querySelectorAll('.gallery-item img');
  const lightbox = document.getElementById('lightbox');
  if (items.length === 0 || !lightbox) return;

  const imgEl = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.lightbox-close');

  const open = (src, alt) => {
    imgEl.src = src;
    imgEl.alt = alt || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  items.forEach(img =>
    img.addEventListener('click', () => open(img.src, img.alt))
  );
  closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
})();

// ---------- Contact form validation ----------
(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const success = form.querySelector('.form-success');
  const fields = ['name', 'email', 'subject', 'message'];

  const setError = (id, msg) => {
    const el = form.querySelector(`#err-${id}`);
    if (el) el.textContent = msg || '';
  };

  const validateEmail = (val) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    fields.forEach(id => {
      const input = form.querySelector(`#${id}`);
      const value = input.value.trim();
      if (!value) {
        setError(id, 'This field is required.');
        valid = false;
      } else if (id === 'email' && !validateEmail(value)) {
        setError(id, 'Please enter a valid email address.');
        valid = false;
      } else {
        setError(id, '');
      }
    });

    if (valid) {
      success.classList.add('show');
      form.reset();
      setTimeout(() => success.classList.remove('show'), 5000);
    }
  });

  // Live-clear errors
  fields.forEach(id => {
    const input = form.querySelector(`#${id}`);
    input && input.addEventListener('input', () => setError(id, ''));
  });
})();
