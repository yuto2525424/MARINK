/* =========================================
   MARINK APP
   app.js
========================================= */


/* =========================================
   START
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    renderProducts();
    renderProjects();
    renderNews();
    renderPickup();

    setupDrawer();
    setupReveal();
    setupBottomNav();
    setupPickupSlide();

  }
);


/* =========================================
   PRODUCTS
========================================= */

function renderProducts() {

  const container =
    document.getElementById("productList");

  if (!container) return;

  if (
    typeof productsData === "undefined"
  ) {
    return;
  }


  container.innerHTML = "";


  /*
    HOMEでは最大4商品
  */

  const homeProducts =
    productsData.slice(0, 4);


  homeProducts.forEach(product => {

    const card =
      document.createElement("a");

    card.className =
      "product-card reveal";

    card.href =
      product.link || "shop.html";


    /* -------------------------
       IMAGE
    ------------------------- */

    const imageBox =
      document.createElement("div");

    imageBox.className =
      "product-image";


    if (product.image) {

      const image =
        document.createElement("img");

      image.src =
        product.image;

      image.alt =
        product.name;

      image.loading =
        "lazy";


      image.addEventListener(
        "error",
        () => {

          image.remove();

          imageBox.innerHTML = `
            <div
              style="
                width:100%;
                height:100%;
                display:grid;
                place-items:center;
                color:#738696;
                font-size:11px;
                font-weight:800;
                background:#eef3f6;
              "
            >
              MARINK
            </div>
          `;

        }
      );


      imageBox.appendChild(image);

    }

    else {

      imageBox.innerHTML = `
        <div
          style="
            width:100%;
            height:100%;
            display:grid;
            place-items:center;
            color:#738696;
            font-size:11px;
            font-weight:800;
            background:#eef3f6;
          "
        >
          MARINK
        </div>
      `;

    }


    /* -------------------------
       INFO
    ------------------------- */

    const info =
      document.createElement("div");

    info.className =
      "product-info";


    info.innerHTML = `
      <p class="product-category">
        ${escapeHTML(product.category)}
      </p>

      <h3 class="product-name">
        ${escapeHTML(product.name)}
      </h3>

      <p class="product-price">
        ${escapeHTML(product.priceLabel)}
      </p>

      <p
        style="
          margin-top:3px;
          color:#7a8b98;
          font-size:9px;
          font-weight:700;
        "
      >
        ${escapeHTML(product.status)}
      </p>
    `;


    card.appendChild(imageBox);
    card.appendChild(info);

    container.appendChild(card);

  });

}


/* =========================================
   PROJECTS
========================================= */

function renderProjects() {

  const container =
    document.getElementById(
      "projectsGrid"
    );


  if (!container) return;

  if (
    typeof projectsData ===
    "undefined"
  ) {
    return;
  }


  container.innerHTML = "";


  projectsData
    .slice(0, 4)
    .forEach(project => {

      const card =
        document.createElement("a");

      card.className =
        "project-card reveal";

      card.href =
        project.link || "#";


      /* IMAGE */

      if (project.image) {

        const image =
          document.createElement("img");

        image.className =
          "project-image";

        image.src =
          project.image;

        image.alt =
          project.title;

        image.loading =
          "lazy";


        image.addEventListener(
          "error",
          () => {
            image.remove();
          }
        );


        card.appendChild(image);

      }


      /* CONTENT */

      const content =
        document.createElement("div");

      content.className =
        "project-content";


      content.innerHTML = `
        <p class="project-category">
          ${escapeHTML(project.category)}
        </p>

        <h3 class="project-title">
          ${escapeHTML(project.title)}
        </h3>
      `;


      card.appendChild(content);

      container.appendChild(card);

    });

}


/* =========================================
   NEWS
========================================= */

function renderNews() {

  const container =
    document.getElementById(
      "newsList"
    );


  if (!container) return;

  if (
    typeof newsData === "undefined"
  ) {
    return;
  }


  /*
    新しい順に並び替え
  */

  const sortedNews =
    [...newsData].sort(
      (a, b) =>
        new Date(b.date) -
        new Date(a.date)
    );


  /*
    HOMEは最新3件
  */

  const latest =
    sortedNews.slice(0, 3);


  container.innerHTML = "";


  latest.forEach(news => {

    const item =
      document.createElement("a");

    item.className =
      "news-item reveal";

    item.href =
      news.link || "#";


    const newBadge =
      isNewArticle(news.date)
        ? `
          <span class="news-new">
            NEW
          </span>
        `
        : "";


    item.innerHTML = `

      <div class="news-meta">

        <span class="news-date">
          ${formatDate(news.date)}
        </span>

        ${newBadge}

      </div>


      <span
        style="
          color:#078fbd;
          font-size:9px;
          font-weight:800;
          align-self:center;
        "
      >
        ${escapeHTML(news.category)}
      </span>


      <h3 class="news-title">
        ${escapeHTML(news.title)}
      </h3>

    `;


    container.appendChild(item);

  });

}


/* =========================================
   NEW BADGE
========================================= */

function isNewArticle(
  dateString
) {

  const published =
    new Date(
      `${dateString}T00:00:00`
    );


  const today =
    new Date();


  today.setHours(
    0,
    0,
    0,
    0
  );


  const difference =
    today - published;


  const days =
    difference /
    (
      1000 *
      60 *
      60 *
      24
    );


  /*
    公開から7日まで
  */

  return (
    days >= 0 &&
    days <= 7
  );

}


/* =========================================
   DATE
========================================= */

function formatDate(
  dateString
) {

  const parts =
    dateString.split("-");


  if (parts.length !== 3) {
    return dateString;
  }


  return (
    `${parts[0]}.` +
    `${parts[1]}.` +
    `${parts[2]}`
  );

}


/* =========================================
   PICK UP
========================================= */

function renderPickup() {

  const container =
    document.getElementById(
      "pickupList"
    );


  if (!container) return;


  /*
    PICK UPは後で
    pickup-data.jsに分離可能
  */

  const pickupData = [

    {
      label:
        "GAME",

      title:
        "AQUA TERRITORY",

      description:
        "実在する生き物で戦う、MARINK発の生物TCG。",

      image:
        "images/project-aqua-territory.jpg",

      link:
        "#projects"
    },


    {
      label:
        "SHOP",

      title:
        "MARINK SHOP",

      description:
        "海やダイビングをもっと楽しむための商品を制作中。",

      image:
        "images/product-logbook.jpg",

      link:
        "#shop"
    },


    {
      label:
        "GUIDE",

      title:
        "FishGuide",

      description:
        "展示されている生き物をスマホでもっと楽しむガイド。",

      image:
        "images/project-fishguide.jpg",

      link:
        "#projects"
    }

  ];


  container.innerHTML = "";


  pickupData.forEach(item => {

    const card =
      document.createElement("a");

    card.className =
      "pickup-card reveal";

    card.href =
      item.link;


    /* IMAGE */

    const imageBox =
      document.createElement("div");

    imageBox.className =
      "pickup-image";


    if (item.image) {

      const image =
        document.createElement("img");

      image.src =
        item.image;

      image.alt =
        item.title;

      image.loading =
        "lazy";


      image.addEventListener(
        "error",
        () => {
          image.remove();
        }
      );


      imageBox.appendChild(image);

    }


    /* CONTENT */

    const content =
      document.createElement("div");

    content.className =
      "pickup-content";


    content.innerHTML = `
      <span class="pickup-label">
        ${escapeHTML(item.label)}
      </span>

      <h3 class="pickup-title">
        ${escapeHTML(item.title)}
      </h3>

      <p
        style="
          margin-top:5px;
          font-size:11px;
          line-height:1.6;
        "
      >
        ${escapeHTML(item.description)}
      </p>
    `;


    card.appendChild(imageBox);
    card.appendChild(content);

    container.appendChild(card);

  });


  createPickupDots(
    pickupData.length
  );

}


/* =========================================
   PICKUP DOTS
========================================= */

function createPickupDots(
  count
) {

  const dots =
    document.getElementById(
      "pickupDots"
    );


  if (!dots) return;


  dots.innerHTML = "";


  for (
    let i = 0;
    i < count;
    i++
  ) {

    const dot =
      document.createElement(
        "span"
      );

    dot.className =
      "slide-dot";


    if (i === 0) {

      dot.classList.add(
        "active"
      );

    }


    dots.appendChild(dot);

  }

}


/* =========================================
   DRAWER
========================================= */

function setupDrawer() {

  const button =
    document.getElementById(
      "menuButton"
    );

  const menu =
    document.getElementById(
      "drawerMenu"
    );

  const close =
    document.getElementById(
      "drawerClose"
    );

  const overlay =
    document.getElementById(
      "drawerOverlay"
    );


  if (
    !button ||
    !menu ||
    !overlay
  ) {
    return;
  }


  function openMenu() {

    menu.classList.add(
      "open"
    );

    overlay.classList.add(
      "show"
    );

    button.setAttribute(
      "aria-expanded",
      "true"
    );

    document.body.style.overflow =
      "hidden";

  }


  function closeMenu() {

    menu.classList.remove(
      "open"
    );

    overlay.classList.remove(
      "show"
    );

    button.setAttribute(
      "aria-expanded",
      "false"
    );

    document.body.style.overflow =
      "";

  }


  button.addEventListener(
    "click",
    openMenu
  );


  if (close) {

    close.addEventListener(
      "click",
      closeMenu
    );

  }


  overlay.addEventListener(
    "click",
    closeMenu
  );


  menu
    .querySelectorAll("a")
    .forEach(link => {

      link.addEventListener(
        "click",
        closeMenu
      );

    });


  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape"
      ) {

        closeMenu();

      }

    }
  );

}


/* =========================================
   REVEAL
========================================= */

function setupReveal() {

  const elements =
    document.querySelectorAll(
      ".reveal"
    );


  if (
    !(
      "IntersectionObserver"
      in window
    )
  ) {

    elements.forEach(
      element => {
        element.classList.add(
          "visible"
        );
      }
    );

    return;

  }


  const observer =
    new IntersectionObserver(

      entries => {

        entries.forEach(
          entry => {

            if (
              entry.isIntersecting
            ) {

              entry.target
                .classList.add(
                  "visible"
                );

              observer.unobserve(
                entry.target
              );

            }

          }
        );

      },

      {
        threshold: 0.08
      }

    );


  elements.forEach(
    element =>
      observer.observe(
        element
      )
  );

}


/* =========================================
   BOTTOM NAV
========================================= */

function setupBottomNav() {

  const items =
    document.querySelectorAll(
      ".bottom-nav-item"
    );


  if (!items.length) return;


  const sectionIDs = [
    "home",
    "shop",
    "projects",
    "news",
    "about"
  ];


  function update() {

    let active =
      "home";


    sectionIDs.forEach(id => {

      const section =
        document.getElementById(id);


      if (!section) return;


      const rect =
        section.getBoundingClientRect();


      if (
        rect.top <=
        window.innerHeight * 0.32
      ) {

        active = id;

      }

    });


    items.forEach(item => {

      item.classList.remove(
        "active"
      );


      if (
        item.dataset.section ===
        active
      ) {

        item.classList.add(
          "active"
        );

      }

    });

  }


  window.addEventListener(
    "scroll",
    update,
    {
      passive: true
    }
  );


  update();

}


/* =========================================
   PICK UP AUTO SLIDE
========================================= */

function setupPickupSlide() {

  const container =
    document.getElementById(
      "pickupList"
    );


  if (!container) return;


  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  let index = 0;

  let timer = null;

  let touching = false;


  function cards() {

    return container
      .querySelectorAll(
        ".pickup-card"
      );

  }


  function dots() {

    return document
      .querySelectorAll(
        ".slide-dot"
      );

  }


  function updateDots(
    activeIndex
  ) {

    dots().forEach(
      (dot, dotIndex) => {

        dot.classList.toggle(
          "active",
          dotIndex ===
          activeIndex
        );

      }
    );

  }


  function goTo(
    newIndex
  ) {

    const list =
      cards();


    if (!list.length) return;


    if (
      newIndex >= list.length
    ) {

      newIndex = 0;

    }


    if (newIndex < 0) {

      newIndex =
        list.length - 1;

    }


    index = newIndex;


    container.scrollTo({

      left:
        list[index].offsetLeft -
        container.offsetLeft,

      behavior:
        reducedMotion
          ? "auto"
          : "smooth"

    });


    updateDots(index);

  }


  function next() {

    if (touching) return;

    goTo(index + 1);

  }


  function start() {

    if (reducedMotion) return;


    if (timer) {
      clearInterval(timer);
    }


    timer =
      setInterval(
        next,
        5000
      );

  }


  /*
    手動スワイプ時
  */

  container.addEventListener(
    "touchstart",
    () => {

      touching = true;

      if (timer) {
        clearInterval(timer);
      }

    },
    {
      passive: true
    }
  );


  container.addEventListener(
    "touchend",
    () => {

      touching = false;

      detectCurrentSlide();

      start();

    },
    {
      passive: true
    }
  );


  /*
    PCマウス
  */

  container.addEventListener(
    "mouseenter",
    () => {

      touching = true;

      if (timer) {
        clearInterval(timer);
      }

    }
  );


  container.addEventListener(
    "mouseleave",
    () => {

      touching = false;

      detectCurrentSlide();

      start();

    }
  );


  /*
    現在のカード判定
  */

  function detectCurrentSlide() {

    const list =
      cards();


    if (!list.length) return;


    const scroll =
      container.scrollLeft;


    let nearest = 0;

    let smallest =
      Infinity;


    list.forEach(
      (card, cardIndex) => {

        const distance =
          Math.abs(
            card.offsetLeft -
            container.offsetLeft -
            scroll
          );


        if (
          distance < smallest
        ) {

          smallest =
            distance;

          nearest =
            cardIndex;

        }

      }
    );


    index = nearest;

    updateDots(index);

  }


  container.addEventListener(
    "scroll",
    () => {

      window.clearTimeout(
        container._scrollTimer
      );


      container._scrollTimer =
        window.setTimeout(
          detectCurrentSlide,
          100
        );

    },
    {
      passive: true
    }
  );


  start();

}


/* =========================================
   SAFE TEXT
========================================= */

function escapeHTML(
  value
) {

  if (
    value === null ||
    value === undefined
  ) {

    return "";

  }


  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}