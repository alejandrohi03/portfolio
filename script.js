// ===== Menú móvil =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

// Cierra el menú al pulsar un enlace
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => navMenu.classList.remove('open'));
});

// ===== Aparición discreta de secciones al hacer scroll =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
