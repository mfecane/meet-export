"use strict";

function setUpSearch() {
  const searchbar = document.querySelector(".searchbar");
  if (!searchbar) {
    return;
  }
  const input = searchbar.querySelector("input");
  const updateElement = (state) => {
    const searchResult = input.value || state;
    searchbar.classList.toggle("active", searchResult);
  };
  input.addEventListener("focus", updateElement.bind(null, true));
  input.addEventListener("blur", updateElement.bind(null, false));
}

function setUpPanel() {
  const overlay = document.querySelector(".overlay");
  if (!overlay) return;

  const gutterElements = [
    ...document.querySelectorAll(".panel-gutter,.overlay"),
  ];
  gutterElements.forEach((element) => {
    element.addEventListener("click", () => {
      overlay.classList.toggle("active", false);
      document.body.classList.toggle("lock", false);
      const panels = [...document.querySelectorAll(`.overlay-panel`)];
      panels.forEach((panel) => {
        panel.classList.toggle("active", false);
      });
    });
  });

  const panelActivators = document.querySelectorAll(".panel-activator");
  [...panelActivators].forEach((activator) => {
    const panelId = activator.dataset.panelId;
    const panel = document.querySelector(`.overlay-panel.panel-${panelId}`);
    if (!panel) return;

    activator.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      panel.classList.toggle("active", true);
      overlay.classList.toggle("active", true);
      document.body.classList.toggle("lock", true);
    });
  });
}

function setUpCalendar() {
  const calendarEl = document.querySelector(".calendarEl");
  if (!calendarEl) {
    return;
  }
  const calendar = new FullCalendar.Calendar(calendarEl, {
    timeZone: "UTC",
    initialView: "timeGridWeek",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "timeGridWeek,timeGridDay",
    },
    events: "https://fullcalendar.io/api/demo-feeds/events.json",
    eventColor: "#1C51B9",
    locale: "ru",
    buttonText: {
      today: "сегодня",
      month: "месяц",
      week: "неделя",
      day: "день",
      list: "список",
    },
    allDayContent: function () {
      return "весь день";
    },
  });
  calendar.render();

  const titleElement = document.querySelector(".fc-toolbar-title");
  const dateString = titleElement.innerText;

  var dateRegex = /^(\d+)\D+(\d+)\s+([А-Яа-я]+)\D+(\d+)\s[г]\.$/;
  var dateParts = dateString.match(dateRegex);

  const dateHTML = `
  <span class="month">${dateParts[3]}</span>
  <span class="date">${dateParts[1]}\u2014${dateParts[2]}, ${dateParts[4]}</span>
  `;

  titleElement.innerHTML = dateHTML;
}

function setUpBackScroll() {
  const scrollBackPanel = document.querySelector(".scroll-back");
  const personPhoto = document.querySelector(".scroll-back__panel");
  if (!scrollBackPanel) {
    return;
  }
  let previousScroll = 0;
  window.addEventListener("scroll", function () {
    const show = window.scrollY < previousScroll;
    scrollBackPanel.classList.toggle("visible", show);
    if (personPhoto) {
      personPhoto && personPhoto.classList.toggle("shift", show);
    }
    previousScroll = window.scrollY;
  });
}

function setUpBurger() {
  const burgerButton = document.querySelector(".burger");
  const nav = document.querySelector(".nav");
  const navLinks = [...document.querySelectorAll(".nav__link")];
  if (!nav || !burgerButton || !navLinks.length) {
    return;
  }
  burgerButton.addEventListener("click", () => {
    burgerButton.classList.toggle("active");
    nav.classList.toggle("active");
    document.body.classList.toggle("lock");
  });
  navLinks.forEach((el) =>
    el.addEventListener("click", () => {
      burgerButton.classList.toggle("active", false);
      nav.classList.toggle("active", false);
    })
  );
}

function setUpSwitchers() {
  const switchers = [...document.querySelectorAll(".switcher")];
  if (switchers.length) {
    switchers.forEach((switcherElement) => {
      let activeIndex = 0;
      const children = [...switcherElement.children];
      if (children.length) {
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("switcher__button-container");
        switcherElement.appendChild(buttonContainer);

        const label = document.createElement("span");
        label.innerText = "Switch layout variant";
        label.classList.add("switcher__label");
        buttonContainer.appendChild(label);

        const updateElements = (index) => {
          activeIndex = index;
          children.forEach((child, idx) => {
            child.classList.toggle("visible", activeIndex === idx);
          });

          [...buttonContainer.querySelectorAll(".switcher__button")].forEach(
            (child, idx) => {
              child.classList.toggle("active", activeIndex === idx);
            }
          );
        };

        children.forEach((child, index) => {
          child.classList.add("switcher__child");

          const div = document.createElement("div");
          div.classList.add("switcher__button");
          buttonContainer.appendChild(div);

          div.addEventListener("click", () => {
            updateElements(index);
          });
        });

        updateElements(0);
      }
    });
  }
}

function setUpFormFields() {
  const elements = [...document.querySelectorAll(".form-input__container")];
  elements.forEach((element) => {
    const input = element.querySelector("input");
    if (input) {
      element.addEventListener("click", () => {
        input.focus();
      });
      input.addEventListener("focus", () => {
        element.classList.add("active");
      });
      input.addEventListener("blur", () => {
        element.classList.remove("active");
      });
    }
  });
}

function setUpHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) {
    return;
  }
  window.addEventListener("scroll", () => {
    header.classList.toggle("small", window.scrollY > 0);
  });

  const scrollBack = document.querySelector(".scroll-back");
  if (!scrollBack) {
    return;
  }
  window.addEventListener("scroll", () => {
    scrollBack.classList.toggle("reduced", window.scrollY > 0);
  });
}

function setUpMessage() {
  const textarea = document.querySelector(".message-input__textarea");
  const hint = document.querySelector(".message-input__hint");
  if (!textarea || !hint) {
    return;
  }

  const updateElement = (state) => {
    const text = textarea.value || state;
    hint.classList.toggle("hidden", text);
  };

  textarea.addEventListener("focus", updateElement.bind(null, true));
  textarea.addEventListener("blur", updateElement.bind(null, false));

  // textarea.addEventListener("input", () => {
  //   hint.classList.toggle("hidden", !!textarea.value.length);
  // });

  textarea.addEventListener("input", function () {
    let currentHeight = textarea.offsetHeight;

    let scrollHeight = textarea.scrollHeight;

    if (scrollHeight > currentHeight) {
      scrollHeight = Math.min(scrollHeight, 92);
      textarea.style.height = scrollHeight + "px";
    }
  });
}

window.addEventListener("load", function () {
  setUpSearch();
  setUpPanel();
  setUpCalendar();
  setUpBackScroll();
  setUpBurger();
  setUpSwitchers();
  setUpFormFields();
  setUpHeaderScroll();
  setUpMessage();

  const panels = [...document.querySelectorAll(`.overlay-panel`)];
  panels.forEach((panel) => {
    panel.classList.remove("inactive");
  });
});
