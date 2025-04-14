const events = [
    { name: "Team 1 vs Team 2", date: "Sep 10, 2025 13:00:00" },
    { name: "Team 1 at Team 3", date: "Sep 17, 2025 13:00:00" },
    { name: "Team 4 vs Team 5", date: "Sep 24, 2025 13:00:00" },
    // Add more events here
];

let currentEventIndex = 0;

function countdown() {
    const countDownDate = new Date(events[currentEventIndex].date).getTime();
    document.getElementById("event-name").innerText = events[currentEventIndex].name;

    const x = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
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
                document.getElementById("countdown").innerHTML = "All events have passed!";
                document.getElementById("event-name").innerText = "";
            }
        }
    }, 1000);
}

countdown();
