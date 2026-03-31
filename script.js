/* ============================
   PORTFOLIO – THALLA SRI PRADEEP
   Main JavaScript
   ============================ */

/* ---- Navbar scroll effect ---- */
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Sticky navbar
  if (scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Back-to-top button
  if (scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }

  // Active nav link on scroll
  updateActiveNavLink();
});

/* ---- Active nav link ---- */
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

/* ---- Hamburger menu ---- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close menu when a nav link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ---- Reveal on scroll (IntersectionObserver) ---- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
);

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

/* ---- Typewriter / role text animation ---- */
const roles = [
  'AI & Data Science Student',
  'Python Developer',
  'Data Analyst',
  'Problem Solver',
];
let roleIndex = 0;
let charIndex  = 0;
let isDeleting = false;
const roleEl   = document.getElementById('role-text');

function typeWriter() {
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    roleEl.textContent = currentRole.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeWriter, 1800);
      return;
    }
  } else {
    roleEl.textContent = currentRole.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex  = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeWriter, isDeleting ? 55 : 90);
}

setTimeout(typeWriter, 800);

/* ---- Contact form handler ---- */
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  const originalText = btn.innerHTML;

  const name    = document.getElementById('contact-name').value.trim();
  const email   = document.getElementById('contact-email').value.trim();
  const subject = document.getElementById('contact-subject').value.trim();
  const message = document.getElementById('contact-message').value.trim();

  // Validate
  if (!name || !email || !subject || !message) {
    showToast('Please fill in all fields.', 'error');
    return;
  }

  // Simulate sending
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled  = true;

  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    showToast('Your message has been sent successfully! 🎉', 'success');
    document.getElementById('contact-form').reset();

    setTimeout(() => {
      btn.innerHTML      = originalText;
      btn.style.background = '';
      btn.disabled       = false;
    }, 3000);
  }, 1500);
}

/* ---- Toast notification ---- */
function showToast(message, type = 'success') {
  // Remove existing toast
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
    <span>${message}</span>
  `;
  
  Object.assign(toast.style, {
    position:       'fixed',
    bottom:         '90px',
    right:          '30px',
    background:     type === 'success'
                      ? 'linear-gradient(135deg,#10b981,#059669)'
                      : 'linear-gradient(135deg,#ef4444,#dc2626)',
    color:          '#fff',
    padding:        '14px 22px',
    borderRadius:   '12px',
    display:        'flex',
    alignItems:     'center',
    gap:            '10px',
    fontFamily:     "'Outfit', sans-serif",
    fontSize:       '0.9rem',
    fontWeight:     '600',
    boxShadow:      '0 8px 32px rgba(0,0,0,0.4)',
    zIndex:         '9999',
    opacity:        '0',
    transform:      'translateY(20px)',
    transition:     'all 0.35s cubic-bezier(0.4,0,0.2,1)',
  });

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.style.opacity   = '1';
      toast.style.transform = 'translateY(0)';
    });
  });

  setTimeout(() => {
    toast.style.opacity   = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => toast.remove(), 350);
  }, 3500);
}

/* ---- Smooth scrolling for all anchor links ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    const navH = navbar.offsetHeight;
    const top  = target.getBoundingClientRect().top + window.scrollY - navH - 10;

    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ---- Cursor sparkle on hover (subtle flair) ---- */
let sparkleTimeout;
document.addEventListener('mousemove', (e) => {
  clearTimeout(sparkleTimeout);
  sparkleTimeout = setTimeout(() => {
    createSparkle(e.clientX, e.clientY);
  }, 160);
});

function createSparkle(x, y) {
  const sparkle = document.createElement('div');
  sparkle.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: radial-gradient(circle, #c084fc, transparent);
    pointer-events: none;
    z-index: 9998;
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.7;
    transition: transform 0.6s ease, opacity 0.6s ease;
  `;
  document.body.appendChild(sparkle);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      sparkle.style.transform = 'translate(-50%,-50%) scale(3)';
      sparkle.style.opacity   = '0';
    });
  });

  setTimeout(() => sparkle.remove(), 650);
}

/* ---- Init on DOMContentLoaded ---- */
document.addEventListener('DOMContentLoaded', () => {
  updateActiveNavLink();
});
