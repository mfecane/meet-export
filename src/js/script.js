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
  const overlayPanel = document.querySelector(".overlay-panel");
  if (!overlay || !overlayPanel) {
    return;
  }

  const elements = document.querySelectorAll(".people-list__action");
  const elementsArray = [...elements];
  elementsArray.forEach((element) => {
    element.addEventListener("click", () => {
      overlay.classList.toggle("active", true);
      overlayPanel.classList.toggle("active", true);
      document.body.classList.toggle("lock", true);
    });
  });

  const gutterLabel = document.querySelector(".panel-gutter__label");
  gutterLabel.addEventListener("click", () => {
    overlay.classList.toggle("active", false);
    overlayPanel.classList.toggle("active", false);
    document.body.classList.toggle("lock", false);
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
}

function setUpBackScroll() {
  const scrollBackPanel = document.querySelector(".scroll-back");
  const personPhoto = document.querySelector(
    ".expert-profile__profile-container"
  );
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

window.addEventListener("load", function () {
  setUpSearch();
  setUpPanel();
  setUpCalendar();
  setUpBackScroll();
  setUpBurger();
});
