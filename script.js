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

// ===== Efecto máquina de escribir en el hero =====
const roles = [
  'Desarrollador .NET y C#',
  'Software ERP y WMS',
  'Técnico Superior DAM',
  'Soporte y consultoría funcional',
];

const typeEl = document.getElementById('typewriter');
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = roles[roleIndex];
  typeEl.textContent = current.slice(0, charIndex);

  if (!deleting) {
    if (charIndex < current.length) {
      charIndex++;
      setTimeout(typeLoop, 70);
    } else {
      deleting = true;
      setTimeout(typeLoop, 1800);
    }
  } else {
    if (charIndex > 0) {
      charIndex--;
      setTimeout(typeLoop, 35);
    } else {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeLoop, 400);
  }
  }
}
typeLoop();

// ===== Animación de aparición al hacer scroll =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// ===== Año actual en el footer =====
document.querySelector('.footer p').textContent =
  `© ${new Date().getFullYear()} Alejandro Hidalgo Izquierdo · Técnico DAM · Desarrollo y soporte de software empresarial`;
