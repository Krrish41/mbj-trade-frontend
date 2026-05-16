const header = document.querySelector("[data-header]");
const tabButtons = document.querySelectorAll("[data-tab]");
const tabPanels = document.querySelectorAll("[data-panel]");
const filterButtons = document.querySelectorAll("[data-filter]");
const productCards = document.querySelectorAll("[data-category]");
const leadForm = document.querySelector("[data-lead-form]");
const mobileToggle = document.querySelector("[data-mobile-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const mobileLinks = document.querySelectorAll("[data-mobile-link]");
const tabTimers = new WeakMap();
const productTimers = new WeakMap();

if (mobileToggle && mobileMenu) {
  mobileToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("is-open");
    mobileToggle.classList.toggle("is-active", isOpen);
    mobileToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
      mobileToggle.classList.remove("is-active");
      mobileToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const refreshHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
};

refreshHeader();
window.addEventListener("scroll", refreshHeader, { passive: true });

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.tab;
    const targetPanel = document.querySelector(`[data-panel="${target}"]`);
    const currentPanel = document.querySelector(".tab-panel.active");

    if (!targetPanel || targetPanel === currentPanel) {
      return;
    }

    tabButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    if (currentPanel) {
      window.clearTimeout(tabTimers.get(currentPanel));
      currentPanel.classList.add("is-exiting");

      tabTimers.set(
        currentPanel,
        window.setTimeout(() => {
          currentPanel.classList.remove("active", "is-exiting");
          targetPanel.classList.remove("is-exiting");
          targetPanel.classList.add("active");
        }, 80)
      );
    } else {
      targetPanel.classList.remove("is-exiting");
      targetPanel.classList.add("active");
    }
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("active")) return;

    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));

    const cardsToHide = [];
    const cardsToShow = [];

    productCards.forEach((card) => {
      window.clearTimeout(productTimers.get(card));
      const shouldShow = filter === "all" || card.dataset.category === filter;

      if (!shouldShow && !card.hidden) {
        cardsToHide.push(card);
      } else if (shouldShow) {
        cardsToShow.push(card);
      }
    });

    cardsToHide.forEach((card) => {
      card.classList.remove("is-showing");
      card.classList.add("is-hiding");
      card.style.animationDelay = "";
    });

    const hideDuration = cardsToHide.length > 0 ? 90 : 0;

    window.setTimeout(() => {
      cardsToHide.forEach((card) => {
        card.hidden = true;
        card.classList.remove("is-hiding");
      });

      let visibleIndex = 0;
      cardsToShow.forEach((card) => {
        card.hidden = false;
        card.classList.remove("is-hiding", "is-showing");
        card.style.animationDelay = `${visibleIndex * 35}ms`;
        void card.offsetWidth;
        card.classList.add("is-showing");

        productTimers.set(
          card,
          window.setTimeout(() => {
            card.classList.remove("is-showing");
            card.style.animationDelay = "";
          }, 500 + visibleIndex * 35)
        );

        visibleIndex += 1;
      });
    }, hideDuration);
  });
});

leadForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const submitButton = leadForm.querySelector(".form-submit");

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.setAttribute("aria-busy", "true");
    submitButton.innerHTML = '<span class="button-spinner" aria-hidden="true"></span> Sending...';
  }

  window.setTimeout(() => {
    leadForm.innerHTML = `
      <div class="success-state" role="status" aria-live="polite">
        <div class="success-icon" aria-hidden="true">
          <i data-lucide="circle-check"></i>
        </div>
        <h3>Inquiry Sent Successfully!</h3>
        <p>Thank you for reaching out. Our team will get back to you within 24 business hours.</p>
      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, 900);
});

window.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
