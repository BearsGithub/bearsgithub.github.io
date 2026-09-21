const gameSchedule = [
  { opponent: "Browns", date: "Aug 15, 2026 12:00:00", location: "Chicago, IL", coords: "41.8623,-87.6167" },
  { opponent: "Bengals", date: "Aug 22, 2026 18:00:00", location: "Cincinnati, OH", coords: "39.0954,-84.5160" },
  { opponent: "Titans", date: "Aug 29, 2026 17:00:00", location: "Nashville, TN", coords: "36.1663,-86.7716" },
  { opponent: "Panthers", date: "Sep 13, 2026 12:00:00", location: "Charlotte, NC", coords: "35.2258,-80.8528" },
  { opponent: "Vikings", date: "Sep 20, 2026 12:00:00", location: "Chicago, IL", coords: "41.8623,-87.6167" },
  { opponent: "Eagles", date: "Sep 28, 2026 19:15:00", location: "Chicago, IL", coords: "41.8623,-87.6167" },
  { opponent: "Jets", date: "Oct 4, 2026 12:00:00", location: "Chicago, IL", coords: "41.8623,-87.6167" },
  { opponent: "Packers", date: "Oct 11, 2026 15:25:00", location: "Green Bay, WI", coords: "44.5013,-88.0622" },
  { opponent: "Falcons", date: "Oct 18, 2026 12:00:00", location: "Atlanta, GA", coords: "33.7554,-84.4010" },
  { opponent: "Patriots", date: "Oct 22, 2026 19:15:00", location: "Chicago, IL", coords: "41.8623,-87.6167" },
  { opponent: "Seahawks", date: "Nov 2, 2026 19:15:00", location: "Seattle, WA", coords: "47.5952,-122.3316" },
  { opponent: "Buccaneers", date: "Nov 8, 2026 19:20:00", location: "Chicago, IL", coords: "41.8623,-87.6167" },
  { opponent: "Saints", date: "Nov 22, 2026 12:00:00", location: "Chicago, IL", coords: "41.8623,-87.6167" },
  { opponent: "Lions", date: "Nov 26, 2026 12:00:00", location: "Detroit, MI", coords: "42.3400,-83.0456" },
  { opponent: "Jaguars", date: "Dec 6, 2026 12:00:00", location: "Chicago, IL", coords: "41.8623,-87.6167" },
  { opponent: "Dolphins", date: "Dec 13, 2026 12:00:00", location: "Miami Gardens, FL", coords: "25.9580,-80.2389" },
  { opponent: "Bills", date: "Dec 19, 2026 19:20:00", location: "Orchard Park, NY", coords: "42.7738,-78.7870" },
  { opponent: "Packers", date: "Dec 25, 2026 12:00:00", location: "Chicago, IL", coords: "41.8623,-87.6167" },
  { opponent: "Lions", date: "Jan 3, 2027 15:25:00", location: "Chicago, IL", coords: "41.8623,-87.6167" },
  { opponent: "Vikings", date: "Jan 10, 2027 12:00:00", location: "Minneapolis, MN", coords: "44.9736,-93.2577" }
];

function getCurrentAwayGame() {
  const now = new Date().getTime();
  for (let i = 0; i < gameSchedule.length; i++) {
    if (new Date(gameSchedule[i].date).getTime() > now) {
      return gameSchedule[i];
    }
  }
  return gameSchedule[gameSchedule.length - 1];
}
