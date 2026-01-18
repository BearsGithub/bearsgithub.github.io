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

  document.getElementById("event-name").innerText = event.name;
  document.getElementById("team1-logo").src = event.team1Logo;
  document.getElementById("team2-logo").src = event.team2Logo;

  const x = setInterval(function () {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;

    if (distance < 0) {
      clearInterval(x);
      currentEventIndex++;
      if (currentEventIndex < events.length) {
        countdown();
      } else {
        document.getElementById("countdown").innerHTML =
          "All events have passed";
        document.getElementById("event-name").innerText = "";
        document.getElementById("team1-logo").removeAttribute("src");
        document.getElementById("team2-logo").removeAttribute("src");
      }
    }
  }, 1000);
}

initializeCountdown();
countdown();
