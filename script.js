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


logo.addEventListener("mouseleave", () => {
  pressCount = 0;
  logo.classList.remove(
    "glow-1","glow-2","glow-3","glow-4","glow-5"
  );
});

  let keyBuffer = "";

  document.addEventListener("keydown", (e) => {
    // only track numbers
    if (!/^[0-9]$/.test(e.key)) return;

    keyBuffer += e.key;

    // keep last 3 keys
    if (keyBuffer.length > 3) {
      keyBuffer = keyBuffer.slice(-3);
    }

    if (keyBuffer === "115") {
      triggerZombiesEgg();
      keyBuffer = "";
    }
  });

  function triggerZombiesEgg() {
    const overlay = document.getElementById("zombies-egg");
    overlay.classList.add("show");

    // auto-hide after 3 seconds
    setTimeout(() => {
      overlay.classList.remove("show");
    }, 3000);
  }

(() => {
  const eggBtn = document.getElementById("eggBtn");
  const eggQ = document.getElementById("eggQ");
  const eggRiddle = document.getElementById("eggRiddle");
  if (!eggBtn || !eggQ || !eggRiddle) return;

  let presses = 0;
  let resetTimer = null;

  const reset = () => {
    presses = 0;
    eggQ.classList.remove("show");
    eggRiddle.classList.remove("show");
    eggQ.setAttribute("aria-hidden", "true");
    eggRiddle.setAttribute("aria-hidden", "true");
  };

  eggBtn.addEventListener("click", () => {
    presses++;
    clearTimeout(resetTimer);
    resetTimer = setTimeout(reset, 9000); // auto-reset after 9s

    if (presses === 1) {
      eggQ.classList.add("show");
      eggQ.setAttribute("aria-hidden", "false");
    }

    if (presses === 2) {
      eggRiddle.classList.add("show");
      eggRiddle.setAttribute("aria-hidden", "false");
    }

    if (presses >= 3) {
      // third press closes everything (feels game-y)
      reset();
    }
  });
})();
