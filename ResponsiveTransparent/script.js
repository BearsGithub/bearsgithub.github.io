const events = [
  {
    "name": "@",
    "date": "Nov 2, 2025 12:00:00",
    "team1Logo": "../assets/logos/BEARS.png",
    "team2Logo": "../assets/logos/BENGALS.png"
  },
  {
    "name": "vs",
    "date": "Nov 9, 2025 12:00:00",
    "team1Logo": "../assets/logos/BEARS.png",
    "team2Logo": "../assets/logos/GIANTS.png"
  },
  {
    "name": "@",
    "date": "Nov 16, 2025 12:00:00",
    "team1Logo": "../assets/logos/BEARS.png",
    "team2Logo": "../assets/logos/VIKINGS.png"
  },
  {
    "name": "vs",
    "date": "Nov 23, 2025 12:00:00",
    "team1Logo": "../assets/logos/BEARS.png",
    "team2Logo": "../assets/logos/STEELERS.png"
  },
  {
    "name": "@",
    "date": "Nov 28, 2025 15:00:00",
    "team1Logo": "../assets/logos/BEARS.png",
    "team2Logo": "../assets/logos/EAGLES.png"
  },
    {
    "name": "@",
    "date": "Dec 7, 2025 15:25:00",
    "team1Logo": "../assets/logos/BEARS.png",
    "team2Logo": "../assets/logos/PACKERS.png"
  },
  {
    "name": "vs",
    "date": "Dec 14, 2025 12:00:00",
    "team1Logo": "../assets/logos/BEARS.png",
    "team2Logo": "../assets/logos/BROWNS.png"
  },
  {
    "name": "vs",
    "date": "Dec 20, 2025 19:20:00",
    "team1Logo": "../assets/logos/BEARS.png",
    "team2Logo": "../assets/logos/PACKERS.png"
  },
  {
    "name": "@",
    "date": "Dec 28, 2025 19:20:00",
    "team1Logo": "../assets/logos/BEARS.png",
    "team2Logo": "../assets/logos/49ERS.png"
  },
  {
    "name": "vs",
    "date": "Jan 4, 2026 15:25:00",
    "team1Logo": "../assets/logos/BEARS.png",
    "team2Logo": "../assets/logos/LIONS.png"
  },
  {
    "name": "vs",
    "date": "Jan 11, 2026 15:30:00",
    "team1Logo": "../assets/logos/BEARS.png",
    "team2Logo": "../assets/logos/PACKERS.png"
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
          "All events have passed!";
      }
    }
  }, 1000);
}

initializeCountdown();
countdown();
