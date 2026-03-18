(function () {
  "use strict";

  // Sample art shows — SF Bay Area, current month (no API/scraping for MVP)
  var MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  var artShows = [
    { title: "Abstract Horizons", date: "2025-03-02", artist: "Jordan Lee", location: "Minnesota Street Project, SF" },
    { title: "Clay & Code", date: "2025-03-08", artist: "Riley Chen", location: "Headlands Center, Sausalito" },
    { title: "Light Box", date: "2025-03-12", artist: "Sam Rivera", location: "SFMOMA, San Francisco" },
    { title: "Bay Views", date: "2025-03-15", artist: "Alex Kim", location: "Oakland Museum of California" },
    { title: "Night Garden", date: "2025-03-17", artist: "Morgan Tate", location: "Gallery 16, SF" },
    { title: "Paper Dreams", date: "2025-03-22", artist: "Jamie Woo", location: "Root Division, SF" },
    { title: "Sound Shapes", date: "2025-03-28", artist: "Casey Drew", location: "Berkeley Art Center" }
  ];

  function parseShowDates() {
    artShows.forEach(function (show) {
      var parts = show.date.split("-").map(Number);
      show.day = parts[2];
      show.month = parts[1];
      show.year = parts[0];
    });
  }

  function getCalendarDays(year, month) {
    var first = new Date(year, month - 1, 1);
    var last = new Date(year, month, 0);
    var startDay = first.getDay();
    var daysInMonth = last.getDate();
    var days = [];
    var i;
    for (i = 0; i < startDay; i++) {
      days.push({ empty: true });
    }
    for (i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, empty: false });
    }
    return days;
  }

  function showsOnDay(day, month, year) {
    return artShows.filter(function (s) {
      return s.day === day && s.month === month && s.year === year;
    });
  }

  function renderCalendar(year, month) {
    var titleEl = document.getElementById("calendar-title");
    var gridEl = document.getElementById("calendar-grid");
    if (!titleEl || !gridEl) return;

    titleEl.textContent = MONTH_NAMES[month - 1] + " " + year;

    var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    weekdays.forEach(function (d) {
      var div = document.createElement("div");
      div.className = "calendar-day-header";
      div.setAttribute("role", "columnheader");
      div.textContent = d;
      gridEl.appendChild(div);
    });

    var today = new Date();
    var days = getCalendarDays(year, month);
    days.forEach(function (d) {
      var cell = document.createElement("div");
      cell.setAttribute("role", "gridcell");
      if (d.empty) {
        cell.className = "calendar-cell empty";
      } else {
        cell.className = "calendar-cell";
        if (today.getFullYear() === year && today.getMonth() === month - 1 && today.getDate() === d.day) {
          cell.classList.add("today");
        }
        var dayNum = document.createElement("div");
        dayNum.className = "day-num";
        dayNum.textContent = d.day;
        cell.appendChild(dayNum);
        var shows = showsOnDay(d.day, month, year);
        shows.forEach(function () {
          var dot = document.createElement("span");
          dot.className = "show-dot";
          dot.setAttribute("aria-hidden", "true");
          cell.appendChild(dot);
        });
      }
      gridEl.appendChild(cell);
    });
  }

  function renderShowsList() {
    var listEl = document.getElementById("shows-list");
    if (!listEl) return;

    artShows.forEach(function (show) {
      var card = document.createElement("article");
      card.className = "show-card";
      card.setAttribute("role", "listitem");

      var title = document.createElement("h3");
      title.textContent = show.title;
      card.appendChild(title);

      var meta = document.createElement("div");
      meta.className = "meta";
      var dateSpan = document.createElement("span");
      dateSpan.textContent = "Date: " + MONTH_NAMES[show.month - 1] + " " + show.day + ", " + show.year;
      var artistSpan = document.createElement("span");
      artistSpan.textContent = "Artist: " + show.artist;
      var locationSpan = document.createElement("span");
      locationSpan.textContent = "Location: " + show.location;
      meta.appendChild(dateSpan);
      meta.appendChild(document.createTextNode(" "));
      meta.appendChild(artistSpan);
      meta.appendChild(document.createTextNode(" "));
      meta.appendChild(locationSpan);
      card.appendChild(meta);

      listEl.appendChild(card);
    });
  }

  function init() {
    parseShowDates();
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    renderCalendar(year, month);
    renderShowsList();
  }

  init();
})();
