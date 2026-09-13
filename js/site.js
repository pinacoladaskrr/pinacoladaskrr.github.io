// Shared page interactions: navigation, scroll reveals, and memory lightbox.
const navbar = document.querySelector(".navbar");
const backToTop = document.querySelector(".floating-button");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

function updateNavigation() {
  const hasScrolled = window.scrollY > 50;
  navbar.classList.toggle("scrolled", hasScrolled);
  backToTop.classList.toggle("visible", window.scrollY > 550);
}

updateNavigation();
window.addEventListener("scroll", updateNavigation, { passive: true });

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.textContent = isOpen ? "\u00d7" : "\u2630";
});

navLinks.addEventListener("click", (event) => {
  if (!event.target.matches("a")) return;

  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "\u2630";
});

const navigationItems = [...document.querySelectorAll(".nav-links a")];
const navigationObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navigationItems.forEach((link) => {
        link.classList.toggle("active", link.hash === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-35% 0px -58%" },
);

document.querySelectorAll("main section[id]").forEach((section) => {
  navigationObserver.observe(section);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxClose = document.querySelector(".lightbox-close");

function closeLightbox() {
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
}

document.querySelectorAll(".memory").forEach((memory) => {
  memory.addEventListener("click", () => {
    const image = memory.querySelector("img");
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
    lightboxClose.focus();
  });
});

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});
