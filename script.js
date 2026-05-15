const header = document.querySelector("[data-header]");
const tabButtons = document.querySelectorAll("[data-tab]");
const tabPanels = document.querySelectorAll("[data-panel]");
const filterButtons = document.querySelectorAll("[data-filter]");
const productCards = document.querySelectorAll("[data-category]");
const leadForm = document.querySelector("[data-lead-form]");
const formStatus = document.querySelector("[data-form-status]");

const refreshHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
};

refreshHeader();
window.addEventListener("scroll", refreshHeader, { passive: true });

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.tab;

    tabButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    tabPanels.forEach((panel) => {
      panel.classList.toggle("active", panel.dataset.panel === target);
    });
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    productCards.forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

leadForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(leadForm);
  const inquiry = {
    name: formData.get("name")?.toString().trim(),
    company: formData.get("company")?.toString().trim(),
    email: formData.get("email")?.toString().trim(),
    whatsapp: formData.get("whatsapp")?.toString().trim(),
    product: formData.get("product")?.toString().trim(),
    destination: formData.get("destination")?.toString().trim(),
    message: formData.get("message")?.toString().trim(),
  };

  const body = [
    `Name: ${inquiry.name}`,
    `Company: ${inquiry.company}`,
    `Email: ${inquiry.email}`,
    `WhatsApp: ${inquiry.whatsapp || "Not provided"}`,
    `Product of Interest: ${inquiry.product}`,
    `Destination: ${inquiry.destination}`,
    "",
    "Message:",
    inquiry.message || "No additional message provided.",
  ].join("\n");

  formStatus.textContent = "Opening your email client with the inquiry details.";
  window.location.href = `mailto:info@mbjglobal.net?subject=${encodeURIComponent(
    `Trade Inquiry from ${inquiry.company || inquiry.name}`
  )}&body=${encodeURIComponent(body)}`;
});

window.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
