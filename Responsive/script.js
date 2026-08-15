const events = [
  {
    "name": "vs",
    "date": "Aug 15, 2026 12:00:00",
    "team1Logo": "../assets/logos/BEARS.png",
    "team2Logo": "../assets/logos/BROWNS.png"
  },
  {
    "name": "@",
    "date": "Aug 22, 2026 18:00:00",
    "team1Logo": "../assets/logos/BEARS.png",
    "team2Logo": "../assets/logos/BENGALS.png"
  },
  {
    "name": "@",
    "date": "Aug 29, 2026 17:00:00",
    "team1Logo": "../assets/logos/BEARS.png",
    "team2Logo": "../assets/logos/TITANS.png"
  },
  {
    "name": "@",
    "date": "Sep 13, 2026 12:00:00",
    "team1Logo": "../assets/logos/BEARS.png",
    "team2Logo": "../assets/logos/PANTHERS.png"
  },
  {
    "name": "vs",
    "date": "Sep 20, 2026 12:00:00",
    "team1Logo": "../assets/logos/BEARS.png",
    "team2Logo": "../assets/logos/VIKINGS.png"
  },
  {
    "name": "vs",
    "date": "Sep 28, 2026 19:15:00",
    "team1Logo": "../assets/logos/BEARS.png",
    "team2Logo": "../assets/logos/EAGLES.png"
  },
  {
    "name": "vs",
    "date": "Oct 4, 2026 12:00:00",
    "team1Logo": "../assets/logos/BEARS.png",
    "team2Logo": "../assets/logos/JETS.png"
  },
  {
    "name": "@",
    "date": "Oct 11, 2026 15:25:00",
    "team1Logo": "../assets/logos/BEARS.png",
    "team2Logo": "../assets/logos/PACKERS.png"
  },
  {
    "name": "@",
    "date": "Oct 18, 2026 12:00:00",
    "team1Logo": "../assets/logos/BEARS.png",
    "team2Logo": "../assets/logos/FALCONS.png"
  },
  {
    "name": "vs",
    "date": "Oct 22, 2026 19:15:00",
    "team1Logo": "../assets/logos/BEARS.png",
    "team2Logo": "../assets/logos/PATRIOTS.png"
  },
  {
    "name": "@",
    "date": "Nov 2, 2026 19:15:00",
    "team1Logo": "../assets/logos/BEARS.png",
    "team2Logo": "../assets/logos/SEAHAWKS.png"
  },
  {
    "name": "vs",
    "date": "Nov 8, 2026 19:20:00",
    "team1Logo": "../assets/logos/BEARS.png",
    "team2Logo": "../assets/logos/BUCCANEERS.png"
  },
  {
    "name": "vs",
    "date": "Nov 22, 2026 12:00:00",
    "team1Logo": "../assets/logos/BEARS.png",
    "team2Logo": "../assets/logos/SAINTS.png"
  },
  {
    "name": "@",
    "date": "Nov 26, 2026 12:00:00",
    "team1Logo": "../assets/logos/BEARS.png",
    "team2Logo": "../assets/logos/LIONS.png"
  },
  {
    "name": "vs",
    "date": "Dec 6, 2026 12:00:00",
    "team1Logo": "../assets/logos/BEARS.png",
    "team2Logo": "../assets/logos/JAGUARS.png"
  },
  {
    "name": "@",
    "date": "Dec 13, 2026 12:00:00",
    "team1Logo": "../assets/logos/BEARS.png",
    "team2Logo": "../assets/logos/DOLPHINS.png"
  },
  {
    "name": "@",
    "date": "Dec 19, 2026 19:20:00",
    "team1Logo": "../assets/logos/BEARS.png",
    "team2Logo": "../assets/logos/BILLS.png"
  },
  {
    "name": "vs",
    "date": "Dec 25, 2026 12:00:00",
    "team1Logo": "../assets/logos/BEARS.png",
    "team2Logo": "../assets/logos/PACKERS.png"
  },
  {
    "name": "vs",
    "date": "Jan 3, 2027 15:25:00",
    "team1Logo": "../assets/logos/BEARS.png",
    "team2Logo": "../assets/logos/LIONS.png"
  },
  {
    "name": "@",
    "date": "Jan 10, 2027 12:00:00",
    "team1Logo": "../assets/logos/BEARS.png",
    "team2Logo": "../assets/logos/VIKINGS.png"
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

// Scale the fixed-size stage to fit whatever box this page is embedded in
// (e.g. an iframe on a signage template), preserving aspect ratio and
// avoiding any text wrapping/clipping.
// offsetWidth/offsetHeight are unaffected by the transform below, so they
// always reflect the stage's true (untransformed) content size.
function fitStage() {
  const stage = document.getElementById("stage");
  if (!stage) return;

  const naturalWidth = stage.offsetWidth;
  const naturalHeight = stage.offsetHeight;
  if (!naturalWidth || !naturalHeight) return;

  const scale = Math.min(
    document.body.clientWidth / naturalWidth,
    document.body.clientHeight / naturalHeight,
  );

  stage.style.transform = `translate(-50%, -50%) scale(${scale})`;
}

const stageEl = document.getElementById("stage");
if (stageEl && window.ResizeObserver) {
  // Recompute whenever the stage's own content changes size (e.g. team
  // logo images or web fonts finishing loading) or the outer box resizes.
  const resizeObserver = new ResizeObserver(fitStage);
  resizeObserver.observe(stageEl);
  resizeObserver.observe(document.body);
} else {
  window.addEventListener("resize", fitStage);
  window.addEventListener("load", fitStage);
}
fitStage();
