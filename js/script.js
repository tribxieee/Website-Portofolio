/* ================= UTIL ================= */
const isInViewport = (el, offset = 0) => {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight - offset;
};

/* ================= NAVBAR SCROLL ================= */
const navbar = document.querySelector(".navbar");

/* ================= HERO PARALLAX ================= */
const heroImage = document.querySelector(".hero-main-image");

/* ================= SKILLS ================= */
const skillBars = document.querySelectorAll(".skill-fill");

function animateSkillBars() {
  const skillsSection = document.querySelector(".skills");
  const rect = skillsSection.getBoundingClientRect();

  if (rect.top < window.innerHeight - 100) {
    skillBars.forEach((bar) => {
      const target = bar.dataset.width;
      bar.style.width = target + "%";
    });
    window.removeEventListener("scroll", animateSkillBars);
  }
}

window.addEventListener("scroll", animateSkillBars);
animateSkillBars();

/* ================= FADE IN ================= */
const sections = document.querySelectorAll("section");
sections.forEach((section) => {
  section.style.opacity = 0;
  section.style.transform = "translateY(30px)";
  section.style.transition = "all 0.8s ease";
});

/* ================= COUNTER ================= */
const counters = document.querySelectorAll(".counter");
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.target;
      let current = 0;
      const step = target / 80;

      const update = () => {
        current += step;
        if (current < target) {
          el.textContent = Math.ceil(current);
          requestAnimationFrame(update);
        } else {
          el.textContent = target;
        }
      };
      update();
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.6 }
);

counters.forEach((c) => counterObserver.observe(c));

/* ================= SCROLL MASTER ================= */
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  // Navbar
  navbar.classList.toggle("scrolled", scrollY > 60);

  // Hero parallax
  if (heroImage && window.matchMedia("(min-width: 769px)").matches) {
    heroImage.style.transform = `translateY(${scrollY * 0.08}px)`;
  }

  // Fade in section
  sections.forEach((section) => {
    if (isInViewport(section, 120)) {
      section.style.opacity = 1;
      section.style.transform = "translateY(0)";
    }
  });

  // Skill bar
  if (!skillsAnimated && isInViewport(document.querySelector(".skills"), 120)) {
    skillFills.forEach((bar) => {
      bar.style.transition = "width 1.5s ease";
      bar.style.width = bar.dataset.width;
    });
    skillsAnimated = true;
  }
});

/* ================= SERVICE CARD TILT ================= */
if (window.matchMedia("(min-width: 769px)").matches) {
  document.querySelectorAll(".service-item").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateX = (y / rect.height - 0.5) * 10;
      const rotateY = (x / rect.width - 0.5) * -10;

      card.style.transform = `
        translateY(-12px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
      `;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) rotateX(0) rotateY(0)";
    });
  });
}

/* ================= CONTACT FORM ================= */
document.querySelector(".contact-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Message sent!");
  e.target.reset();
});
