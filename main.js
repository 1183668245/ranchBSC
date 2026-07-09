document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navMenu = document.querySelector("[data-nav-menu]");
  const hoverTargets = document.querySelectorAll(".nav-link, .btn, .hover-lift");
  const navLinks = document.querySelectorAll(".nav-link[href^='#']");
  const sections = [...navLinks]
    .map(link => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  const bgFrame = document.querySelector(".site-bg-frame");

  function updateActiveNav() {
    let currentId = "#top";

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 140 && rect.bottom > 140) {
        currentId = `#${section.id}`;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle("is-active", link.getAttribute("href") === currentId);
    });
  }

  updateActiveNav();
  window.addEventListener("scroll", updateActiveNav, { passive: true });

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
      });
    });
  }

  hoverTargets.forEach(el => {
    el.addEventListener("mouseenter", () => el.classList.add("is-hover"));
    el.addEventListener("mouseleave", () => el.classList.remove("is-hover"));
  });

  if (bgFrame) {
    let currentFrame = 1;
    const totalFrames = 121;

    setInterval(() => {
      currentFrame = currentFrame >= totalFrames ? 1 : currentFrame + 1;
      bgFrame.src = `./IMAGE/bg/frame_${String(currentFrame).padStart(4, "0")}.jpg`;
    }, 80);
  }
});