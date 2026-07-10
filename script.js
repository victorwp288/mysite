(() => {
  const root = document.documentElement;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  const header = document.querySelector("[data-header]");
  const updateHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 18);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const revealTargets = [...document.querySelectorAll("[data-reveal]")];
  if (!prefersReducedMotion.matches && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.08,
      }
    );

    revealTargets.forEach((target) => revealObserver.observe(target));
    root.classList.add("reveal-ready");
  } else {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
  }

  const navLinks = [...document.querySelectorAll("[data-nav]")];
  const trackedSections = navLinks
    .map((link) => document.getElementById(link.dataset.nav))
    .filter(Boolean);

  if (trackedSections.length && "IntersectionObserver" in window) {
    const setActiveLink = (id) => {
      navLinks.forEach((link) => {
        const isActive = link.dataset.nav === id;
        link.classList.toggle("is-active", isActive);
        if (isActive) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    };

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveLink(visible.target.id);
      },
      {
        rootMargin: "-24% 0px -58% 0px",
        threshold: [0, 0.15, 0.4],
      }
    );

    trackedSections.forEach((section) => sectionObserver.observe(section));
  }

  const systemCard = document.querySelector("[data-orbit]")?.closest(".system-card");
  const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (systemCard && hasFinePointer && !prefersReducedMotion.matches) {
    let frame = 0;
    const updateOrbit = (event) => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = systemCard.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 9;
        const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 9;
        systemCard.style.setProperty("--orbit-x", `${x.toFixed(2)}px`);
        systemCard.style.setProperty("--orbit-y", `${y.toFixed(2)}px`);
      });
    };

    systemCard.addEventListener("pointermove", updateOrbit);
    systemCard.addEventListener("pointerleave", () => {
      systemCard.style.setProperty("--orbit-x", "0px");
      systemCard.style.setProperty("--orbit-y", "0px");
    });
  }

  const printButton = document.querySelector("[data-print]");
  if (printButton) {
    printButton.hidden = false;
    printButton.addEventListener("click", () => window.print());
  }
})();
