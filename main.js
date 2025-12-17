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

      // Netlify Forms expects urlencoded form data with form-name included
      const formData = new URLSearchParams();
      formData.append("form-name", "contact");
      for (const [key, value] of fd.entries()) {
        formData.append(key, value);
      }

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString()
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

})();


