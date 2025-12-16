// Helper: cek apakah elemen terlihat di viewport
function isInViewport(el, offset = 0) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight - offset;
}

/* ================= Hero Floating Cards ================= */
const floatingCards = document.querySelectorAll(".floating-card");
floatingCards.forEach((card, i) => {
  let direction = 1;
  setInterval(() => {
    let y = parseFloat(card.style.transform?.match(/translateY\((-?\d+)px\)/)?.[1]) || 0;
    if (y >= 15) direction = -1;
    if (y <= -15) direction = 1;
    card.style.transform = `translateY(${y + direction}px)`;
  }, 80 + i * 20);
});

/* ================= Skill Bar Animation ================= */
const skillFills = document.querySelectorAll(".skill-fill");
skillFills.forEach((skill) => {
  skill.setAttribute("data-width", skill.style.width); // simpan target
  skill.style.width = "0";
  skill.style.transition = "width 1.5s ease-in-out";
});

function animateSkills() {
  const skillsSection = document.querySelector(".skills");
  if (isInViewport(skillsSection, 100)) {
    skillFills.forEach((bar) => {
      const targetWidth = parseInt(bar.getAttribute("data-width"));
      let currentWidth = 0;
      const interval = setInterval(() => {
        currentWidth++;
        bar.style.width = currentWidth + "%";
        if (currentWidth >= targetWidth) clearInterval(interval);
      }, 12);
    });
    window.removeEventListener("scroll", animateSkills);
  }
}

/* ================= Fade-In per Element ================= */
document.querySelectorAll("section").forEach((section) => {
  const children = Array.from(section.children);
  children.forEach((child, index) => {
    child.style.opacity = 0;
    child.style.transform = "translateY(20px)";
    child.style.transition = `all 0.6s ease-out ${index * 0.15}s`;
  });
});

function fadeInSection(section) {
  if (!section.classList.contains("fade-in-done") && isInViewport(section, 100)) {
    section.querySelectorAll("*").forEach((el) => {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    });
    section.classList.add("fade-in-done");
  }
}

/* ================= Service Card Hover (JS Smooth) ================= */
document.querySelectorAll(".service-item").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transition = "transform 0.2s ease, box-shadow 0.2s ease";
    card.style.transform = "translateY(-15px)";
  });
  card.addEventListener("mouseleave", () => {
    card.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
    card.style.transform = "translateY(0)";
  });
});

/* ================= Button Hover Animation ================= */
document.querySelectorAll(".btn, .contact-form button").forEach((btn) => {
  btn.style.transition = "transform 0.2s ease";
  btn.addEventListener("mouseenter", () => (btn.style.transform = "scale(1.05)"));
  btn.addEventListener("mouseleave", () => (btn.style.transform = "scale(1)"));
});

/* ================= Counter Animation ================= */
const counters = document.querySelectorAll(".counter");
const animateCounter = (counter) => {
  const target = +counter.getAttribute("data-target");
  let current = 0;
  const increment = target / 80;
  const update = () => {
    current += increment;
    if (current < target) {
      counter.innerText = Math.ceil(current);
      requestAnimationFrame(update);
    } else {
      counter.innerText = target;
    }
  };
  update();
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);
counters.forEach((counter) => counterObserver.observe(counter));

/* ================= Contact Form ================= */
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector(".contact-form");
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = contactForm.querySelector('input[type="text"]').value.trim();
    const email = contactForm.querySelector('input[type="email"]').value.trim();
    const phone = contactForm.querySelector('input[type="tel"]').value.trim();
    const message = contactForm.querySelector("textarea").value.trim();

    if (!name || !email || !phone || !message) {
      alert("Please fill in all fields!");
      return;
    }

    alert(`Message sent!\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`);
    contactForm.reset();
  });
});

/* ================= Scroll Event ================= */
window.addEventListener("scroll", () => {
  document.querySelectorAll("section").forEach((section) => fadeInSection(section));
  animateSkills();
});

/* Trigger animasi untuk section yang langsung terlihat */
document.querySelectorAll("section").forEach((section) => fadeInSection(section));
animateSkills();
