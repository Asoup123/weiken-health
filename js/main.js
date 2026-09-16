document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuButton = document.getElementById("mobileMenuButton");
  const mobileNav = document.getElementById("mobileNav");

  if (mobileMenuButton && mobileNav) {
    mobileMenuButton.addEventListener("click", () => {
      mobileNav.classList.toggle("open");
      const isOpen = mobileNav.classList.contains("open");
      mobileMenuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("open");
        mobileMenuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  const headerSearch = document.getElementById("headerSearch");
  const searchInput = document.getElementById("searchInput");

  if (headerSearch && searchInput) {
    headerSearch.addEventListener("submit", (event) => {
      event.preventDefault();
      const keyword = searchInput.value.trim();
      if (!keyword) {
        searchInput.focus();
        return;
      }
      window.location.href = "products.html?search=" + encodeURIComponent(keyword);
    });
  }

  const floatingLine = document.getElementById("floatingLine");
  if (floatingLine) {
    floatingLine.addEventListener("click", (event) => {
      const href = floatingLine.getAttribute("href");
      if (!href || href === "#") event.preventDefault();
    });
  }

  document.addEventListener("click", (event) => {
    if (!mobileNav || !mobileMenuButton) return;
    if (!mobileNav.classList.contains("open")) return;

    const clickedInsideNav = mobileNav.contains(event.target);
    const clickedMenuButton = mobileMenuButton.contains(event.target);

    if (!clickedInsideNav && !clickedMenuButton) {
      mobileNav.classList.remove("open");
      mobileMenuButton.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (mobileNav) mobileNav.classList.remove("open");
    if (mobileMenuButton) mobileMenuButton.setAttribute("aria-expanded", "false");
  });

  // =========================================================
  // 熱門商品：一次顯示一個，可左右切換、圓點切換、手機滑動
  // =========================================================
  const carousel = document.getElementById("popularCarousel");

  if (carousel) {
    const track = carousel.querySelector(".popular-track");
    const slides = Array.from(carousel.querySelectorAll(".popular-slide"));
    const prevButton = carousel.querySelector(".popular-prev");
    const nextButton = carousel.querySelector(".popular-next");
    const dots = Array.from(carousel.querySelectorAll(".popular-dot"));

    let currentIndex = 0;
    let startX = 0;
    let endX = 0;

    const goToSlide = (index) => {
      if (!slides.length) return;
      currentIndex = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      slides.forEach((slide, i) => {
        slide.classList.toggle("is-active", i === currentIndex);
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle("is-active", i === currentIndex);
        dot.setAttribute("aria-current", i === currentIndex ? "true" : "false");
      });
    };

    if (prevButton) {
      prevButton.addEventListener("click", () => goToSlide(currentIndex - 1));
    }

    if (nextButton) {
      nextButton.addEventListener("click", () => goToSlide(currentIndex + 1));
    }

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => goToSlide(index));
    });

    carousel.addEventListener("touchstart", (event) => {
      startX = event.touches[0].clientX;
    }, { passive: true });

    carousel.addEventListener("touchend", (event) => {
      endX = event.changedTouches[0].clientX;
      const distance = startX - endX;
      if (Math.abs(distance) < 45) return;
      goToSlide(distance > 0 ? currentIndex + 1 : currentIndex - 1);
    }, { passive: true });

    goToSlide(0);
  }
});
