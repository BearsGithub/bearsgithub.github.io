 // Bears game schedule
        const events = [
            { name: "vs Giants", date: "2025-11-09T12:00:00" },
            { name: "@ Vikings", date: "2025-11-16T12:00:00" },
            { name: "vs Steelers", date: "2025-11-23T12:00:00" },
            { name: "@ Eagles", date: "2025-11-28T15:00:00" },
            { name: "@ Packers", date: "2025-12-07T12:00:00" },
            { name: "vs Browns", date: "2025-12-14T12:00:00" },
            { name: "vs Packers", date: "2025-12-20T12:00:00" },
            { name: "@ 49ers", date: "2025-12-28T19:20:00" },
            { name: "vs Lions", date: "2026-01-04T12:00:00" }
        ];

        let currentEventIndex = 0;
        let intervalId = null;

        // Pad numbers with leading zero
        function pad(num) {
            return String(num).padStart(2, '0');
        }

        // Update label text (singular vs plural)
        function updateLabel(elementId, value, singular, plural) {
            const label = document.getElementById(elementId);
            if (label) {
                label.textContent = parseInt(value) === 1 ? singular : plural;
            }
        }

        // Find the next upcoming event
        function findNextEvent() {
            const now = new Date().getTime();
            for (let i = 0; i < events.length; i++) {
                const eventTime = new Date(events[i].date).getTime();
                if (eventTime > now) {
                    return i;
                }
            }
            return -1; // No future events
        }

        // Update the countdown display
        function updateCountdown() {
            const event = events[currentEventIndex];
            const eventTime = new Date(event.date).getTime();
            const now = new Date().getTime();
            const distance = eventTime - now;

            if (distance < 0) {
                // Event has passed, move to next event
                clearInterval(intervalId);
                currentEventIndex++;
                
                if (currentEventIndex < events.length) {
                    startCountdown();
                } else {
                    document.getElementById('countdown').innerHTML = 
                        '<div style="font-size: clamp(16px, 3vw, 24px);">Season Complete!</div>';
                }
                return;
            }

            // Calculate time units
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Update display
            document.getElementById('days').textContent = pad(days);
            document.getElementById('hours').textContent = pad(hours);
            document.getElementById('minutes').textContent = pad(minutes);
            document.getElementById('seconds').textContent = pad(seconds);

            // Update labels
            updateLabel('days-label', days, 'DAY', 'DAYS');
            updateLabel('hours-label', hours, 'HOUR', 'HOURS');
            updateLabel('minutes-label', minutes, 'MINUTE', 'MINUTES');
            updateLabel('seconds-label', seconds, 'SECOND', 'SECONDS');
        }

        // Start the countdown
        function startCountdown() {
            if (currentEventIndex >= events.length) {
                document.getElementById('countdown').innerHTML = 
                    '<div style="font-size: clamp(16px, 3vw, 24px);">Season Complete!</div>';
                return;
            }

            updateCountdown(); // Update immediately
            intervalId = setInterval(updateCountdown, 1000);
        }

        // Initialize
        function init() {
            currentEventIndex = findNextEvent();
            
            if (currentEventIndex === -1) {
                document.getElementById('countdown').innerHTML = 
                    '<div style="font-size: clamp(16px, 3vw, 24px);">All games have been played!</div>';
                return;
            }
            
            startCountdown();
        }

        // Start when page loads
        init();