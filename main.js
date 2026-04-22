// Copy email button
const copyBtn = document.getElementById('copy-email-btn');
if (copyBtn) {
  copyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const tooltip = document.getElementById('copy-tooltip');
    const email = 'asyed93@gatech.edu';

    // Try modern clipboard API first, fall back to execCommand
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(() => {
        showCopied(tooltip, copyBtn);
      }).catch(() => {
        fallbackCopy(email, tooltip, copyBtn);
      });
    } else {
      fallbackCopy(email, tooltip, copyBtn);
    }
  });
}

function fallbackCopy(text, tooltip, btn) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
  showCopied(tooltip, btn);
}

function showCopied(tooltip, btn) {
  tooltip.textContent = 'Copied!';
  btn.classList.add('copied');
  setTimeout(() => {
    tooltip.textContent = 'Copy';
    btn.classList.remove('copied');
  }, 2000);
}
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach((section) => observer.observe(section));

// Fade-in animation on scroll
const fadeEls = document.querySelectorAll(
  '.timeline-item, .project-card, .skill-group, .edu-card'
);

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

fadeEls.forEach((el) => {
  el.classList.add('fade-in');
  fadeObserver.observe(el);
});
