const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = document.querySelector("[data-nav-links]");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.getAttribute("data-open") === "true";
    navLinks.setAttribute("data-open", String(!isOpen));
    navToggle.setAttribute("aria-expanded", String(!isOpen));
  });
}

const helpSearch = document.querySelector("[data-help-search]");
const guides = Array.from(document.querySelectorAll("[data-guide]"));
const emptyState = document.querySelector("[data-help-empty]");

if (helpSearch && guides.length > 0) {
  helpSearch.addEventListener("input", () => {
    const query = helpSearch.value.trim().toLowerCase();
    let visibleCount = 0;

    guides.forEach((guide) => {
      const haystack = guide.textContent.toLowerCase();
      const isVisible = query.length === 0 || haystack.includes(query);
      guide.setAttribute("data-hidden", String(!isVisible));
      if (isVisible) {
        visibleCount += 1;
      }
    });

    if (emptyState) {
      emptyState.hidden = visibleCount !== 0;
    }
  });
}
