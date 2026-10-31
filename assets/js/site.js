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
const searchStatus = document.querySelector("[data-help-status]");

if (helpSearch && guides.length > 0) {
  const articleText = new Map();

  const filterGuides = () => {
    const query = helpSearch.value.trim().toLowerCase();
    const terms = query ? query.split(/\s+/) : [];
    let visibleCount = 0;

    guides.forEach((guide) => {
      const link = guide.querySelector("a[href]");
      const path = link ? new URL(link.getAttribute("href"), document.baseURI).pathname : "";
      const haystack = `${guide.textContent} ${articleText.get(path.split("/").pop()) || ""}`.toLowerCase();
      const isVisible = terms.every((term) => haystack.includes(term));
      guide.hidden = !isVisible;
      guide.setAttribute("data-hidden", String(!isVisible));
      if (isVisible) visibleCount += 1;
    });

    if (emptyState) emptyState.hidden = visibleCount !== 0;
    if (searchStatus) {
      searchStatus.textContent = query ? `${visibleCount} ${visibleCount === 1 ? "guide" : "guides"} found.` : "";
    }
  };

  helpSearch.addEventListener("input", filterGuides);

  // A script loads the generated index on both the website and file-based Help.
  // If it is unavailable, card-text search still works.
  const index = window.songivoHelpIndex;
  if (index && Array.isArray(index.articles)) {
    index.articles.forEach((article) => {
      if (typeof article.url === "string") {
        articleText.set(article.url.split("/").pop(), [article.title, article.summary, article.content].filter(Boolean).join(" "));
      }
    });
  }
}
