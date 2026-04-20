const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const scrollTopButton = document.getElementById("scrollTop");
const typedText = document.getElementById("typedText");
const yearSlot = document.getElementById("currentYear");
const resumeViewButton = document.getElementById("resumeViewButton");
const resumeModal = document.getElementById("resumeModal");
const resumeModalBackdrop = document.getElementById("resumeModalBackdrop");
const resumeModalClose = document.getElementById("resumeModalClose");
const resumeFrame = document.getElementById("resumeFrame");
const resumeFallback = document.getElementById("resumeFallback");
const resumeOpenNewTab = document.getElementById("resumeOpenNewTab");
const resumeModalTitle = document.getElementById("resumeModalTitle");

const typingPhrases = [
  "Learning, building and improving every day",
  "Exploring code, design, and practical innovation",
  "Turning ideas into meaningful student projects",
];

function applySavedTheme() {
  const savedTheme = localStorage.getItem("portfolio-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    body.classList.add("dark-mode");
  }
}

function toggleTheme() {
  body.classList.toggle("dark-mode");
  const activeTheme = body.classList.contains("dark-mode") ? "dark" : "light";
  localStorage.setItem("portfolio-theme", activeTheme);
}

function toggleMobileNav() {
  const isOpen = navMenu.classList.toggle("open");
  body.classList.toggle("nav-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
}

function closeMobileNav() {
  navMenu.classList.remove("open");
  body.classList.remove("nav-open");
  navToggle.setAttribute("aria-expanded", "false");
}

function runTypingEffect() {
  if (!typedText) {
    return;
  }

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function type() {
    const currentPhrase = typingPhrases[phraseIndex];

    if (!deleting) {
      typedText.textContent = currentPhrase.slice(0, charIndex + 1);
      charIndex += 1;

      if (charIndex === currentPhrase.length) {
        deleting = true;
        setTimeout(type, 1600);
        return;
      }
    } else {
      typedText.textContent = currentPhrase.slice(0, charIndex - 1);
      charIndex -= 1;

      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % typingPhrases.length;
      }
    }

    setTimeout(type, deleting ? 45 : 85);
  }

  type();
}

function setupRevealAnimations() {
  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealElements.forEach((element) => observer.observe(element));
}

function handleScrollButton() {
  if (window.scrollY > 500) {
    scrollTopButton.classList.add("visible");
  } else {
    scrollTopButton.classList.remove("visible");
  }
}

function openResumeModal(filePath, fallbackMessage, title) {
  resumeFrame.src = filePath;
  resumeOpenNewTab.href = filePath;
  resumeFallback.textContent = fallbackMessage;
  resumeFallback.classList.remove("visible");
  resumeModalTitle.textContent = title || "Document Preview";
  resumeModal.classList.add("open");
  resumeModal.setAttribute("aria-hidden", "false");
  body.classList.add("modal-open");
}

function closeResumeModal() {
  resumeModal.classList.remove("open");
  resumeModal.setAttribute("aria-hidden", "true");
  body.classList.remove("modal-open");
  resumeFrame.src = "";
}

function wireDocumentTriggers() {
  document.querySelectorAll(".document-trigger").forEach((button) => {
    button.addEventListener("click", () => {
      openResumeModal(
        button.dataset.file,
        button.dataset.fallback || "File could not be opened.",
        button.dataset.title || "Document Preview"
      );
    });
  });
}

function setCurrentYear() {
  if (yearSlot) {
    yearSlot.textContent = new Date().getFullYear();
  }
}

applySavedTheme();
runTypingEffect();
setupRevealAnimations();
wireDocumentTriggers();
setCurrentYear();
handleScrollButton();

themeToggle.addEventListener("click", toggleTheme);
navToggle.addEventListener("click", toggleMobileNav);
scrollTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

resumeViewButton.addEventListener("click", () => {
  openResumeModal(
    resumeViewButton.dataset.file,
    resumeViewButton.dataset.fallback,
    resumeViewButton.dataset.title
  );
});

resumeModalClose.addEventListener("click", closeResumeModal);
resumeModalBackdrop.addEventListener("click", closeResumeModal);
resumeFrame.addEventListener("error", () => {
  resumeFallback.classList.add("visible");
});

window.addEventListener("scroll", handleScrollButton);
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && resumeModal.classList.contains("open")) {
    closeResumeModal();
  }
});

document.querySelectorAll('.nav-links a[href^="#"]').forEach((link) => {
  link.addEventListener("click", closeMobileNav);
});
