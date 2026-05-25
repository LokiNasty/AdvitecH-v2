// ─── Header colour-swap on contact section ───────────────────────────────────
const header         = document.querySelector('.header');
const contactSection = document.querySelector('#contact');

function updateHeader() {
  const contactTop    = contactSection.offsetTop;
  const contactHeight = contactSection.offsetHeight;
  const scrollMid     = window.scrollY + window.innerHeight / 2;

  if (scrollMid >= contactTop && scrollMid < contactTop + contactHeight) {
    header.classList.add('contact-active');
  } else {
    header.classList.remove('contact-active');
  }
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// ─── Scroll-reveal for .reveal elements ──────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings slightly
        const delay = i * 80;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach(el => revealObserver.observe(el));

// ─── Smooth active nav link highlight ────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.navbar ul li a');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === '#' + entry.target.id
          );
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(s => navObserver.observe(s));

// ─── EmailJS contact form ─────────────────────────────────────────────────────
const contactForm = document.getElementById('contact-form');
const submitBtn   = document.getElementById('submit-btn');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();

  submitBtn.textContent = 'Sending…';
  submitBtn.disabled = true;

  emailjs.sendForm('service_w3zvk6j', 'template_8ibmbp8', this)
    .then(() => {
      submitBtn.innerHTML = 'Sent! <i class="fa-solid fa-circle-check"></i>';
      submitBtn.style.background = '#22c55e';
      submitBtn.style.borderColor = '#22c55e';
      submitBtn.style.color = '#fff';
      contactForm.reset();
      setTimeout(() => {
        submitBtn.innerHTML = 'Send Message <i class="fa-regular fa-paper-plane"></i>';
        submitBtn.style.background = '';
        submitBtn.style.borderColor = '';
        submitBtn.style.color = '';
        submitBtn.disabled = false;
      }, 4000);
    })
    .catch((error) => {
      console.error('EmailJS error:', error);
      submitBtn.textContent = 'Failed — try again';
      submitBtn.style.background = '#ef4444';
      submitBtn.style.borderColor = '#ef4444';
      submitBtn.style.color = '#fff';
      submitBtn.disabled = false;
      setTimeout(() => {
        submitBtn.innerHTML = 'Send Message <i class="fa-regular fa-paper-plane"></i>';
        submitBtn.style.background = '';
        submitBtn.style.borderColor = '';
        submitBtn.style.color = '';
      }, 4000);
    });
});
