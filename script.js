const body = document.body;
const toggleBtn = document.getElementById("theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const menuToggle = document.querySelector(".menu-toggle");
const navPanel = document.querySelector(".nav-panel");
const navLinks = document.querySelectorAll(".nav-links a");
const revealItems = document.querySelectorAll(".reveal");

const updateThemeLabel = () => {
  const isLight = body.classList.contains("light");
  themeIcon.textContent = isLight ? "Sun" : "Moon";
  toggleBtn.setAttribute("aria-pressed", String(isLight));
};

if (localStorage.getItem("theme") === "light") {
  body.classList.add("light");
}

updateThemeLabel();

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("light");
  localStorage.setItem("theme", body.classList.contains("light") ? "light" : "dark");
  updateThemeLabel();
});

menuToggle.addEventListener("click", () => {
  const isOpen = navPanel.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close nav panel with Escape and return focus to menu button
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (navPanel.classList.contains("open")) {
      navPanel.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.focus();
    }
  }
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navPanel.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 760) {
    navPanel.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

revealItems.forEach((item) => observer.observe(item));
