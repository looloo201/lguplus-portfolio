document.addEventListener("DOMContentLoaded", function () {
  const menu = document.querySelector("[data-menu]");
  const mobileMenu = document.querySelector(".mobile-menu");
  if (menu)
    menu.addEventListener("click", () => {
      const open = mobileMenu.classList.toggle("open");
      menu.setAttribute("aria-expanded", String(open));
    });
  const search = document.querySelector("[data-search]");
  const panel = document.querySelector(".search-panel");
  if (search)
    search.addEventListener("click", () => {
      panel.classList.toggle("open");
      if (panel.classList.contains("open"))
        panel.querySelector("input").focus();
    });
  const searchInput = document.querySelector("#site-search");
  if (searchInput)
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const q = e.target.value.trim();
        if (q)
          location.href = q.includes("요금")
            ? "plans.html"
            : q.includes("휴대") || q.includes("폰")
              ? "devices.html"
              : q.includes("멤버")
                ? "membership.html"
                : "about.html";
      }
    });
  const slides = [
    {
      tag: "LG U+ 5G LIFE",
      title: "새로운 연결, 더 큰 즐거움",
      desc: "일상에 꼭 맞는 통신 혜택을 만나보세요.",
      emoji: "📱",
      href: "plans.html",
    },
    {
      tag: "U+ 인터넷 / IPTV",
      title: "집에서도 더 풍성하게",
      desc: "인터넷과 IPTV를 한 번에 살펴보세요.",
      emoji: "📺",
      href: "about.html",
    },
    {
      tag: "U+ 멤버십",
      title: "매일의 혜택을 더하다",
      desc: "영화·카페·쇼핑 혜택을 한곳에서.",
      emoji: "🎁",
      href: "membership.html",
    },
  ];
  let idx = 0;
  const hero = document.querySelector("[data-hero]");
  function drawSlide() {
    if (!hero) return;
    const s = slides[idx];
    hero.querySelector("[data-tag]").textContent = s.tag;
    hero.querySelector("[data-title]").textContent = s.title;
    hero.querySelector("[data-desc]").textContent = s.desc;
    hero.querySelector("[data-emoji]").textContent = s.emoji;
    hero.querySelector("[data-cta]").href = s.href;
    hero
      .querySelectorAll("[data-dot]")
      .forEach((el, i) => el.classList.toggle("active", i === idx));
  }
  document.querySelectorAll("[data-dot]").forEach((el, i) =>
    el.addEventListener("click", () => {
      idx = i;
      drawSlide();
    }),
  );
  drawSlide();
  // 메인 비주얼 터치 스와이프
  if (hero) {
    let touchStartX = 0;
    let touchStartY = 0;

    hero.addEventListener("touchstart", function (e) {
      touchStartX = e.changedTouches[0].clientX;
      touchStartY = e.changedTouches[0].clientY;
    }, { passive: true });

    hero.addEventListener("touchend", function (e) {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;

      const diffX = touchStartX - touchEndX;
      const diffY = touchStartY - touchEndY;

      // 50px 미만 이동하거나 세로 스크롤이면 실행하지 않음
      if (
        Math.abs(diffX) < 50 ||
        Math.abs(diffX) <= Math.abs(diffY)
      ) {
        return;
      }

      if (diffX > 0) {
        // 왼쪽 스와이프 → 다음 슬라이드
        idx = (idx + 1) % slides.length;
      } else {
        // 오른쪽 스와이프 → 이전 슬라이드
        idx = (idx - 1 + slides.length) % slides.length;
      }

      drawSlide();
    }, { passive: true });
  }

  // PC 메인 비주얼 마우스 드래그
  if (hero) {
    let mouseStartX = 0;
    let isDragging = false;

    // 마우스 버튼을 눌렀을 때
    hero.addEventListener("mousedown", function (e) {
      if (e.button !== 0) return;

      mouseStartX = e.clientX;
      isDragging = true;
    });

    // 마우스 버튼을 놓았을 때
    hero.addEventListener("mouseup", function (e) {
      if (!isDragging) return;

      const mouseEndX = e.clientX;
      const diffX = mouseStartX - mouseEndX;

      isDragging = false;

      // 50px 이상 드래그했을 때만 이동
      if (Math.abs(diffX) < 50) return;

      if (diffX > 0) {
        // 왼쪽 드래그 → 다음 슬라이드
        idx = (idx + 1) % slides.length;
      } else {
        // 오른쪽 드래그 → 이전 슬라이드
        idx = (idx - 1 + slides.length) % slides.length;
      }

      drawSlide();
    });

    // 드래그 도중 영역을 벗어났을 때 초기화
    hero.addEventListener("mouseleave", function () {
      isDragging = false;
    });
  }

  const filters = document.querySelectorAll("[data-filter]");
  filters.forEach((b) =>
    b.addEventListener("click", () => {
      filters.forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      let count = 0;
      document.querySelectorAll("[data-category]").forEach((card) => {
        let show =
          b.dataset.filter === "all" ||
          card.dataset.category === b.dataset.filter;
        card.hidden = !show;
        if (show) count++;
      });
      const empty = document.querySelector(".empty");
      if (empty) empty.hidden = count !== 0;
    }),
  );
  document.querySelectorAll(".faq-item button").forEach((btn) =>
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      item.classList.toggle("open");
      btn.setAttribute(
        "aria-expanded",
        String(item.classList.contains("open")),
      );
    }),
  );
});
