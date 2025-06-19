// This makes the page scroll smoothly when you click on links
// (like when you click 'About' in the navbar)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

// Mobile menu toggle
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Navbar scroll effect
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Active navigation link highlighting
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// This part makes the stats and timeline items fade in when you scroll to them
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target); // Only do this once per item
    }
  });
}, observerOptions);

// Set up the fade-in for stat and timeline items
// (they start hidden and slide up when you see them)
document.querySelectorAll(".stat-item, .timeline-item").forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(el);
});

// This makes the subtitle in the hero section look like it's being typed out
const subtitle = document.querySelector(".subtitle");
const text = subtitle.textContent;
subtitle.textContent = "";

let i = 0;
const typeWriter = () => {
  if (i < text.length) {
    subtitle.textContent += text.charAt(i);
    i++;
    setTimeout(typeWriter, 100); // types one letter every 100ms
  }
};

// Start the typing effect after the page loads (waits 1 second)
window.addEventListener("load", () => {
  setTimeout(typeWriter, 1000);
});

// This just adds a 'loaded' class to the body when the page is ready
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// This puts the current year and your name in the footer automatically
const currentYear = new Date().getFullYear();
document.querySelector(
  ".footer p"
).innerHTML = `&copy; ${currentYear} Samuel Adoleh. All rights reserved.`;

// This makes a little bar at the top that shows how much you've scrolled
const createScrollIndicator = () => {
  const indicator = document.createElement("div");
  indicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--secondary-color), var(--accent-color));
        z-index: 9999;
        transition: width 0.1s ease;
    `;
  document.body.appendChild(indicator);

  window.addEventListener("scroll", () => {
    const scrollPercent =
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
      100;
    indicator.style.width = scrollPercent + "%";
  });
};

createScrollIndicator();
