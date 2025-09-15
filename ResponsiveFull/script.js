const events = [
  {
    "name": "vs",
    "date": "Sep 21, 2025 15:25:00",
    "team1Logo": "../assets/logos/BEARS.png",
    "team2Logo": "../assets/logos/COWBOYS.png"
  },
  {
    "name": "@",
    "date": "Sep 28, 2025 15:25:00",
    "team1Logo": "../assets/logos/BEARS.png",
    "team2Logo": "../assets/logos/RAIDERS.png"
  },
  {
    "name": "@",
    "date": "Oct 13, 2025 19:15:00",
    "team1Logo": "../assets/logos/BEARS.png",
    "team2Logo": "../assets/logos/COMMANDERS.png"
  },
  {
    "name": "vs",
    "date": "Oct 19, 2025 12:00:00",
    "team1Logo": "../assets/logos/BEARS.png",
    "team2Logo": "../assets/logos/SAINTS.png"
  },
  {
    "name": "@",
    "date": "Oct 26, 2025 12:00:00",
    "team1Logo": "../assets/logos/BEARS.png",
    "team2Logo": "../assets/logos/RAVENS.png"
  },
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
    "date": "Dec 7, 2025 12:00:00",
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
    "date": "Dec 20, 2025 TBD",
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
    "date": "TBD",
    "team1Logo": "../assets/logos/BEARS.png",
    "team2Logo": "../assets/logos/LIONS.png"
  }
];

let currentEventIndex = 0;

function countdown() {
  const countDownDate = new Date(events[currentEventIndex].date).getTime();
  document.getElementById("event-name").innerText =
    events[currentEventIndex].name;
  document.getElementById("team1-logo").src =
    events[currentEventIndex].team1Logo;
  document.getElementById("team2-logo").src =
    events[currentEventIndex].team2Logo;

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
          "All events have passed!";
        document.getElementById("event-name").innerText = "";
        document.getElementById("team1-logo").src = "";
        document.getElementById("team2-logo").src = "";
      }
    }
  }, 1000);
}

countdown();
