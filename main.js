(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Footer year
  $$("[data-year]").forEach((n) => (n.textContent = String(new Date().getFullYear())));

  // Mobile nav
  const navToggle = $(".nav-toggle");
  const nav = $("#site-nav");
  if (navToggle && nav) {
    const close = () => {
      nav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    };
    const open = () => {
      nav.classList.add("open");
      navToggle.setAttribute("aria-expanded", "true");
    };
    const toggle = () => (nav.classList.contains("open") ? close() : open());

    navToggle.addEventListener("click", toggle);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
    document.addEventListener("click", (e) => {
      if (!nav.classList.contains("open")) return;
      if (nav.contains(e.target) || navToggle.contains(e.target)) return;
      close();
    });
    $$("#site-nav a").forEach((a) => a.addEventListener("click", close));
  }

  // Contact form -> mailto (no backend)
  const form = $("#contact-form");
  if (form) {
    const status = $(".form-status", form);
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const fd = new FormData(form);
      const name = String(fd.get("name") || "").trim();
      const email = String(fd.get("email") || "").trim();
      const message = String(fd.get("message") || "").trim();

      if (!name || !email || !message) {
        if (status) status.textContent = "Please fill out all fields.";
        return;
      }

      const action = form.getAttribute("action") || "/thanks.html";
      const submitBtn = $('button[type="submit"]', form);
      if (submitBtn) submitBtn.setAttribute("disabled", "true");
      if (status) status.textContent = "Sending…";

      // Netlify Forms expects urlencoded form data.
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(fd).toString()
      })
        .then((res) => {
          if (res.ok) {
            window.location.href = action;
          } else {
            throw new Error("Form submission failed");
          }
        })
        .catch(() => {
          if (status) {
            status.textContent = "Something went wrong. Please try again or refresh the page.";
          }
          if (submitBtn) submitBtn.removeAttribute("disabled");
        });
    });
  }

  // CTA Carousel swipe functionality (mobile only)
  const ctaGrid = $(".cta-grid");
  const ctaCards = $$(".cta-card");

  if (ctaGrid && ctaCards.length > 1 && window.innerWidth <= 760) {
    let currentIndex = 0;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    // Create indicators
    const indicatorsContainer = $(".cta-carousel-indicators");
    if (indicatorsContainer) {
      ctaCards.forEach((_, index) => {
        const indicator = document.createElement("button");
        indicator.className = "cta-carousel-indicator";
        indicator.setAttribute("aria-label", `Go to slide ${index + 1}`);
        indicator.setAttribute("aria-current", index === 0 ? "true" : "false");
        if (index === 0) indicator.classList.add("active");
        indicator.addEventListener("click", () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
      });
    }

    const updateIndicators = (index) => {
      $$(".cta-carousel-indicator").forEach((ind, i) => {
        ind.classList.toggle("active", i === index);
        ind.setAttribute("aria-current", i === index ? "true" : "false");
      });
    };

    const goToSlide = (index) => {
      if (index < 0 || index >= ctaCards.length) return;
      currentIndex = index;
      ctaGrid.scrollTo({
        left: ctaCards[index].offsetLeft,
        behavior: "smooth"
      });
      updateIndicators(index);
    };

    // Touch events
    ctaGrid.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    });

    ctaGrid.addEventListener("touchmove", (e) => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
    });

    ctaGrid.addEventListener("touchend", () => {
      if (!isDragging) return;
      isDragging = false;

      const diffX = startX - currentX;
      const threshold = 50; // Minimum swipe distance

      if (Math.abs(diffX) > threshold) {
        if (diffX > 0 && currentIndex < ctaCards.length - 1) {
          // Swipe left - next
          goToSlide(currentIndex + 1);
        } else if (diffX < 0 && currentIndex > 0) {
          // Swipe right - previous
          goToSlide(currentIndex - 1);
        }
      }
    });

    // Update index on scroll (for manual scrolling)
    ctaGrid.addEventListener("scroll", () => {
      const scrollLeft = ctaGrid.scrollLeft;
      const cardWidth = ctaGrid.offsetWidth;
      const newIndex = Math.round(scrollLeft / cardWidth);
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < ctaCards.length) {
        currentIndex = newIndex;
        updateIndicators(newIndex);
      }
    });

    // Handle resize
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (window.innerWidth > 760) {
          // Reset on desktop
          goToSlide(0);
        }
      }, 250);
    });
  }
})();


