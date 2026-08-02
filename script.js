/* ==========================================================================
   Café Gold — script.js (Vanilla JS)
   ========================================================================== */

// Affiche l'année courante dans le pied de page
document.getElementById('year').textContent = new Date().getFullYear();

/* --------------------------------------------------------------------------
   Menu burger mobile : ouvre/ferme la navigation en tiroir (côté droit)
   -------------------------------------------------------------------------- */
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
const navClose = document.getElementById('navClose');
const navOverlay = document.getElementById('navOverlay');

function toggleMenu() {
  const isActive = nav.classList.toggle('active');
  burger.classList.toggle('active', isActive);
  navOverlay.classList.toggle('active', isActive);
  burger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
  document.body.style.overflow = isActive ? 'hidden' : '';
}

burger.addEventListener('click', toggleMenu);

// Ferme le menu via la croix
navClose.addEventListener('click', () => {
  if (nav.classList.contains('active')) {
    toggleMenu();
  }
});

// Ferme le menu au clic sur l'overlay (zone assombrie à gauche du tiroir)
navOverlay.addEventListener('click', () => {
  if (nav.classList.contains('active')) {
    toggleMenu();
  }
});

// Ferme le menu avec la touche Échap
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav.classList.contains('active')) {
    toggleMenu();
  }
});

// Ferme le menu mobile automatiquement au clic sur un lien de navigation
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    if (nav.classList.contains('active')) {
      toggleMenu();
    }
  });
});

// Réinitialise le menu mobile si l'écran repasse en desktop/tablette pendant qu'il est ouvert
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && nav.classList.contains('active')) {
    toggleMenu();
  }
});

/* --------------------------------------------------------------------------
   Scroll : ombre du header + visibilité du bouton "Retour en haut"
   (un seul écouteur pour les deux comportements)
   -------------------------------------------------------------------------- */
const header = document.getElementById('header');
const scrollTopBtn = document.getElementById('scrollTopBtn');

function handleScroll() {
  // Ombre du header
  if (window.scrollY > 10) {
    header.style.boxShadow = '0 6px 20px rgba(74, 46, 32, 0.08)';
  } else {
    header.style.boxShadow = 'none';
  }

  // Visibilité du bouton "Retour en haut"
  if (window.scrollY > 500) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
}

window.addEventListener('scroll', handleScroll);

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* --------------------------------------------------------------------------
   Animation au défilement : fait apparaître les blocs progressivement
   -------------------------------------------------------------------------- */
const animatedSelectors = [
  '.testimonial-card',
  '.feature-item',
  '.about-image-block'
];

const animatedElements = document.querySelectorAll(animatedSelectors.join(', '));

animatedElements.forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

animatedElements.forEach((el) => observer.observe(el));

/* --------------------------------------------------------------------------
   Menu : filtrage par onglets (Boissons, Entremets, Cheesecakes & Tartes,
   Petites Douceurs, Traditionnel)
   -------------------------------------------------------------------------- */
const menuTabs = document.querySelectorAll('.menu-tab');
const menuPanels = document.querySelectorAll('.menu-panel');

function activateMenuTab(targetTab) {
  const targetId = targetTab.dataset.target;

  // Met à jour l'état visuel des onglets
  menuTabs.forEach((tab) => {
    const isTarget = tab === targetTab;
    tab.classList.toggle('active', isTarget);
    tab.setAttribute('aria-selected', isTarget ? 'true' : 'false');
  });

  // Affiche uniquement le panneau correspondant à l'onglet sélectionné
  menuPanels.forEach((panel) => {
    panel.classList.toggle('active', panel.id === `panel-${targetId}`);
  });
}

menuTabs.forEach((tab) => {
  tab.addEventListener('click', () => activateMenuTab(tab));
});
