// ===== Scale section reveal + spotlight tracking =====
(() => {
  // reveal cards on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("in");
    });
  }, { threshold: 0.2 });

  document.querySelectorAll(".reveal-card").forEach((el) => io.observe(el));

  // spotlight mouse follow per card
  document.querySelectorAll(".scale-card").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      card.style.setProperty("--mx", `${x}%`);
      card.style.setProperty("--my", `${y}%`);
    });
  });
})();


  (() => {
    const btn = document.querySelector(".mobile-menu-btn");
    const menu = document.getElementById("mobileMenu");
    const backdrop = document.querySelector(".mobile-menu-backdrop");
    const closeBtn = document.querySelector(".mobile-close");

    if (!btn || !menu) return;

    const openMenu = () => {
      btn.classList.add("is-open");
      menu.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
      menu.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };

    const closeMenu = () => {
      btn.classList.remove("is-open");
      menu.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };

    btn.addEventListener("click", () => {
      menu.classList.contains("is-open") ? closeMenu() : openMenu();
    });

    closeBtn.addEventListener("click", closeMenu);
    backdrop.addEventListener("click", closeMenu);

    menu.querySelectorAll("a").forEach(a =>
      a.addEventListener("click", closeMenu)
    );

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  })();


