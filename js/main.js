/* =========================================================
   威肯健康生活用品館
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     手機版選單
  ===================================================== */

  const mobileMenuButton = document.getElementById("mobileMenuButton");
  const mobileNav = document.getElementById("mobileNav");

  if (mobileMenuButton && mobileNav) {

    mobileMenuButton.addEventListener("click", () => {

      mobileNav.classList.toggle("open");

      const isOpen = mobileNav.classList.contains("open");

      mobileMenuButton.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

    });


    /* 點擊手機選單連結後，自動收起選單 */

    const mobileLinks = mobileNav.querySelectorAll("a");

    mobileLinks.forEach((link) => {

      link.addEventListener("click", () => {

        mobileNav.classList.remove("open");

        mobileMenuButton.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

  }



  /* =====================================================
     商品搜尋
  ===================================================== */

  const headerSearch = document.getElementById("headerSearch");
  const searchInput = document.getElementById("searchInput");

  if (headerSearch && searchInput) {

    headerSearch.addEventListener("submit", (event) => {

      event.preventDefault();

      const keyword = searchInput.value.trim();

      /* 沒輸入內容就不搜尋 */

      if (!keyword) {

        searchInput.focus();

        return;

      }


      /*
        之後商品專區 products.html 建立完成後，
        搜尋關鍵字會傳到商品頁。

        例如搜尋：
        輪椅

        網址會變成：
        products.html?search=輪椅
      */

      window.location.href =
        "products.html?search=" +
        encodeURIComponent(keyword);

    });

  }



  /* =====================================================
     LINE
  ===================================================== */

  const floatingLine = document.getElementById("floatingLine");

  if (floatingLine) {

    floatingLine.addEventListener("click", (event) => {

      /*
        LINE 官方帳號網址還沒設定。

        等你之後提供威肯的 LINE 連結，
        我們會直接放進 index.html。

        現階段避免按下去跳回頁面頂端。
      */

      const href = floatingLine.getAttribute("href");

      if (!href || href === "#") {

        event.preventDefault();

      }

    });

  }



  /* =====================================================
     點擊頁面其他地方時關閉手機選單
  ===================================================== */

  document.addEventListener("click", (event) => {

    if (!mobileNav || !mobileMenuButton) {
      return;
    }

    if (!mobileNav.classList.contains("open")) {
      return;
    }

    const clickedInsideNav =
      mobileNav.contains(event.target);

    const clickedMenuButton =
      mobileMenuButton.contains(event.target);

    if (!clickedInsideNav && !clickedMenuButton) {

      mobileNav.classList.remove("open");

      mobileMenuButton.setAttribute(
        "aria-expanded",
        "false"
      );

    }

  });



  /* =====================================================
     ESC 關閉手機選單
  ===================================================== */

  document.addEventListener("keydown", (event) => {

    if (event.key !== "Escape") {
      return;
    }

    if (mobileNav) {

      mobileNav.classList.remove("open");

    }

    if (mobileMenuButton) {

      mobileMenuButton.setAttribute(
        "aria-expanded",
        "false"
      );

    }

  });

});
