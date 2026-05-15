const header = document.querySelector("[data-header]");
const tabButtons = document.querySelectorAll("[data-tab]");
const tabPanels = document.querySelectorAll("[data-panel]");
const filterButtons = document.querySelectorAll("[data-filter]");
const productCards = document.querySelectorAll("[data-category]");
const leadForm = document.querySelector("[data-lead-form]");
const tabTimers = new WeakMap();
const productTimers = new WeakMap();

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
        }, 200)
      );
    }

    targetPanel.classList.remove("is-exiting");
    targetPanel.classList.add("active");
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    let visibleIndex = 0;

    productCards.forEach((card) => {
      window.clearTimeout(productTimers.get(card));

      const shouldShow = filter === "all" || card.dataset.category === filter;

      if (shouldShow) {
        card.hidden = false;
        card.classList.remove("is-hiding", "is-showing");
        card.style.animationDelay = `${visibleIndex * 55}ms`;
        void card.offsetWidth;
        card.classList.add("is-showing");
        productTimers.set(
          card,
          window.setTimeout(() => {
            card.classList.remove("is-showing");
            card.style.animationDelay = "";
          }, 520 + visibleIndex * 55)
        );
        visibleIndex += 1;
        return;
      }

      card.classList.remove("is-showing");
      card.classList.add("is-hiding");
      card.style.animationDelay = "";
      productTimers.set(
        card,
        window.setTimeout(() => {
          card.hidden = true;
          card.classList.remove("is-hiding");
        }, 220)
      );
    });
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
