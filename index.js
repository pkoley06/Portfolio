// ===== Cursor Glow Effect =====
const cursorGlow = document.getElementById("cursorGlow");

document.addEventListener("mousemove", (e) => {
  if (cursorGlow) {
    cursorGlow.style.left = e.clientX + "px";
    cursorGlow.style.top = e.clientY + "px";
  }
});

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ===== Mobile Navigation Toggle =====
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  navToggle.classList.toggle("active");
});

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  });
});

// ===== Active Navigation Link =====
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveLink() {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveLink);

// ===== Number Counter Animation =====
const statNumbers = document.querySelectorAll(".stat-number");

function animateCounters() {
  statNumbers.forEach((stat) => {
    const target = parseInt(stat.getAttribute("data-count"));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const counter = setInterval(() => {
      current += step;
      if (current >= target) {
        stat.textContent = target;
        clearInterval(counter);
      } else {
        stat.textContent = Math.floor(current);
      }
    }, 16);
  });
}

// Trigger counter animation when hero section is visible
const heroObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        heroObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const heroSection = document.getElementById("hero");
if (heroSection) {
  heroObserver.observe(heroSection);
}

// ===== Scroll Reveal Animation =====
const revealElements = document.querySelectorAll(
  ".project-card, .skill-item, .highlight-item, .tool-item"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, index * 100);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

revealElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  revealObserver.observe(el);
});

// ===== Form Handling with EmailJS =====
const contactForm = document.getElementById("contactForm");

// EmailJS Configuration
const EMAILJS_PUBLIC_KEY = "YOM48PbuaiE2fIt41";
const EMAILJS_SERVICE_ID = "service_pdtvl4e";
const EMAILJS_TEMPLATE_ID = "template_h3foopw";

// Initialize EmailJS once on page load
emailjs.init(EMAILJS_PUBLIC_KEY);

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector('button[type="submit"]');
  const originalContent = btn.innerHTML;

  // Get form data
  const formData = new FormData(contactForm);
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  // Show loading state
  btn.innerHTML = '<i class="ph ph-spinner"></i> Sending...';
  btn.disabled = true;

  try {
    // Send email using EmailJS
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      from_name: name,
      from_email: email,
      message: message,
      to_email: "pkoley06@gmail.com",
    });

    // Success
    btn.innerHTML = '<i class="ph ph-check-circle"></i> Message Sent!';
    btn.style.background = "linear-gradient(135deg, #22c55e, #16a34a)";
    contactForm.reset();

    // Reset button after 3 seconds
    setTimeout(() => {
      btn.innerHTML = originalContent;
      btn.style.background = "";
      btn.disabled = false;
    }, 3000);
  } catch (error) {
    console.error("EmailJS Error:", error);

    // Fallback: Open email client with pre-filled message
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    window.open(
      `mailto:pkoley06@gmail.com?subject=${subject}&body=${body}`,
      "_blank"
    );

    // Show fallback message
    btn.innerHTML =
      '<i class="ph ph-envelope-open"></i> Opening Email Client...';
    btn.style.background = "linear-gradient(135deg, #f59e0b, #d97706)";

    // Reset button after 3 seconds
    setTimeout(() => {
      btn.innerHTML = originalContent;
      btn.style.background = "";
      btn.disabled = false;
    }, 3000);
  }
});

// ===== Smooth Scroll for All Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ===== Skill Level Animation =====
const skillLevels = document.querySelectorAll(".level-bar");

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const level = entry.target.style.getPropertyValue("--level");
        entry.target.style.width = "0%";
        setTimeout(() => {
          entry.target.style.width = level;
        }, 100);
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

skillLevels.forEach((bar) => {
  skillObserver.observe(bar);
});

// ===== Project Card Tilt Effect =====
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
  });
});

console.log("Portfolio loaded successfully! 🚀");
