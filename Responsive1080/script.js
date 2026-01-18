const events = [
  {
    "name": "vs",
    "date": "Jan 18, 2026 17:30:00",
    "team1Logo": "../assets/logos/BEARS.png",
    "team2Logo": "../assets/logos/RAMS.png"
  },
  {
    "name": "@",
    "date": "Jan 25, 2026 19:00:00",
    "team1Logo": "../assets/logos/BEARS.png",
    "team2Logo": "../assets/logos/SEAHAWKS.png"
  },
  {
    "name": "vs",
    "date": "Feb 8, 2026 17:30:00",
    "team1Logo": "../assets/logos/BEARS.png",
    "team2Logo": "../assets/logos/PATRIOTS.png"
  },
    {
    "name": "@",
    "date": "Apr 23, 2026 17:00:00",
    "team1Logo": "../assets/logos/BEARS.png",
    "team2Logo": "../assets/nfl_draft_logo.png"
  }
];

let currentEventIndex = 0;

function initializeCountdown() {
    const eventsDateTimes = events.map(event => new Date(event.date).getTime());
    currentEventIndex = findClosestFutureEventIndex(eventsDateTimes);
}

function findClosestFutureEventIndex(dates) {
    const now = new Date().getTime();
    for (let i = 0; i < dates.length; i++) {
        if (dates[i] > now) return i;
    }
    return dates.length; // Return the length if no future events
}

function countdown() {
  const event = events[currentEventIndex];
  const countDownDate = new Date(event.date).getTime();

  const x = setInterval(function () {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0');
    const hours = String(Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    )).padStart(2, '0');
    const minutes = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    const seconds = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;

    // Update labels to singular when value is exactly 1; otherwise plural
    const labels = document.querySelectorAll("#countdown .countdown-text");
    if (labels.length === 4) {
      labels[0].innerText = days === 1 ? "DAY" : "DAYS";
      labels[1].innerText = hours === 1 ? "HOUR" : "HOURS";
      labels[2].innerText = minutes === 1 ? "MINUTE" : "MINUTES";
      labels[3].innerText = seconds === 1 ? "SECOND" : "SECONDS";
    }

    if (distance < 0) {
      clearInterval(x);
      currentEventIndex++;
      if (currentEventIndex < events.length) {
        countdown();
      } else {
        document.getElementById("countdown").innerHTML =
          "All events have passed";
      }
    }
  }, 1000);
}

initializeCountdown();
countdown();
