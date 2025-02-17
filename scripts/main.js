// Fetch prayer times from Aladhan API

fetch('https://api.aladhan.com/v1/timingsByCity?city=San%20Luis%20Obispo&country=US') // Fetching data from the API
.then(response => response.json()) // Converting response to JSON // JSON is a format for storing and transporting data
.then(data => { // Extracts the prayer times from the API
    const timings = data.data.timings; // setting a constant variable to the data of the prayer times
    console.log("Prayer Timings", timings); // Check the prayer times in the console
    
    // For the hijri date within the prayer times container
    
    const hijriDate = data.data.date.hijri; // setting a constant variable to the data of the hijri date
    console.log("Hijri Date:", hijriDate); // Check the hijri date in the console
    
    displayIslamicDate(hijriDate); // Calling the function to display the islamic date on the webpage  
    displayPrayerTimes(timings); // Calling the function to display the prayer times on the webpage
    
    
    // creating an array of the prayer times so I can loop through them when finding the next prayer time

    const currentTime = new Date(); // setting a constant variable to get the current local time
    console.log("CurrentTime:", currentTime);
    
    const prayerTimesArray = [ 
        { name: 'Fajr', time: timings.Fajr, class: 'fajr' },
        { name: 'Dhuhr', time: timings.Dhuhr, class: 'dhuhr' },
        { name: 'Asr', time: timings.Asr, class: 'asr' },
        { name: 'Maghrib', time: timings.Maghrib, class: 'maghrib' },
        { name: 'Isha', time: timings.Isha, class: 'isha' }
    ];
    
    // Created a function to find the next prayer time
    
    const nextPrayer = getNextPrayerTime(prayerTimesArray, currentTime); 
    console.log("Next Prayer:", nextPrayer); // Check the next prayer time in the console
    
    if (nextPrayer) { // using an if statement to check if there is a next prayer time
        startCountdown(nextPrayer.time, nextPrayer.name); // Created a function to start the countdown to the next prayer time
    }
})
    .catch(error => console.error('Error fetching prayertimes:', error)); // Catch any errors and log them to the console
    
    // Function to display the Islamic date on the webpage
    
    function displayIslamicDate(hijriDate) {
        const islamicDateContainer = document.getElementById('islamic-date'); // document is the webpage, I'm using getElementbyId to get the element with the id of 'islamic-date'
        islamicDateContainer.innerHTML = `
        <h3 class="date-title">Hijri Date:</h3>
        <p class="date-text">${hijriDate.weekday.en}, ${hijriDate.day} ${hijriDate.month.en} ${hijriDate.year} AH</p>
        `;
    }

    // Function to display the prayer times on the webpage

    function displayPrayerTimes(timings) {
        const prayerTimesContainer = document.getElementById('prayer-times'); // document is the webpage, I'm using getElementById to get the element with the id of 'prayer-times'
        prayerTimesContainer.innerHTML = ` 
        <h2>Prayer Times</h2>
        <p><strong>Fajr:</strong> ${timings.Fajr}</p> 
        <p><strong>Dhuhr:</strong> ${timings.Dhuhr}</p>
        <p><strong>Asr:</strong> ${timings.Asr}</p>
        <p><strong>Maghrib:</strong> ${timings.Maghrib}</p>
        <p><strong>Isha:</strong> ${timings.Isha}</p>
        `;
    }
        // Function to get the next prayer time

        function getNextPrayerTime(prayerTimes, currentTime) { // Created a function to find the next prayer time
            for (let i = 0; i < prayerTimes.length; i++) { // Doing a loop to go through the prayer times, ++ is incrementing the loop by 1 so it goes through each prayer time
                const prayerTime = convertTo24Hour(prayerTimes[i].time); // Convert to 24-hour format
                if (currentTime < prayerTime) { // Check if the current time is less than the prayer time
                    return prayerTimes[i]; // Return the first upcoming prayer
                }
            }
            return getFajrTimeForTomorrow(); // Return the Fajr time for tomorrow if no more prayers today.
        }

        // Function to get the Fajr time for tomorrow

        function getFajrTimeForTomorrow() { 
            return fetch('https://api.aladhan.com/v1/timingsByCity?city=San%20Luis%20Obispo&country=US&method=2') // Fetching data from the API
            .then(response => response.json()) // Converting response to JSON
            .then(data => { // Extracts the Fajr time for tomorrow from the API
                const fajrTime = data.data.timings.Fajr; // setting a constant variable to the data of the Fajr time for tomorrow
                console.log("Fajr time for tomorrow:", fajrTime); // Check the Fajr time for tomorrow in the console
                
                //Create a next day fajr object

                let tomorrow = new Date(); // setting a variable to get the current date
                tomorrow.setDate(tomorrow.getDate() + 1); // setting the date to tomorrow
                const [hours, minutes] = fajrTime.split(':').map(Number); // Split the time into hours and minutes
                
                const nextDayFajr = new Date(); // Initialize nextDayFajr
                nextDayFajr.setHours(hours, minutes, 0, 0); // Set hours and minutes for Fajr time
                
                startCountdown(nextDayFajr, 'Fajr'); // Created a function to start the countdown to the Fajr time for tomorrow
            })
            .catch(error => console.error('Error fetching Fajr time for tomorrow:', error)); // Catch any errors and log them to the console
            
            }
        
        // Function to create the countdown to the next prayer time
        function startCountdown(nextPrayerTime, prayerName) { // Created a function to start the countdown to the next prayer time
            const countdownContainer = document.getElementById('countdown-container'); // creating a countdown container to display the countdown on the webpage
            let countdownElement = document.getElementById('countdown'); // creating a countdown element to display the countdown on the webpage

            if (!countdownElement) {
                countdownElement = document.createElement('p'); // Create a new p element
                countdownElement.id = 'countdown'; // Set the id of the countdown element
                countdownContainer.appendChild(countdownElement); // Append the countdown element to the countdown container
            }

            // Ensure nextPrayerTime is a Date object
            if (typeof nextPrayerTime === 'string') {
                nextPrayerTime = convertTo24Hour(nextPrayerTime);
            }

            // function to update the countdown every second

            function updateCountdown() { // Created a function to update the countdown every second
                const now = new Date(); // setting a variable to get the current date
                const timeDifference = nextPrayerTime - now; // Calculate the time difference between the prayer time and the current time

                if (timeDifference <= 0) { // Check if the time difference is less than or equal to 0
                    countdownElement.innerHTML = `<strong>${prayerName} time is now!</strong>`; // Display the prayer time is now
                    clearInterval(countdownInterval); // Clear the countdown interval
                    return;
                }

                const hours = Math.floor(timeDifference / (1000 * 60 * 60)); // Calculate the hours
                const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)); // Calculate the minutes
                const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000); // Calculate the seconds

                countdownElement.innerHTML = `<strong>${prayerName} is in:</strong> ${hours}h ${minutes}m ${seconds}s`; // Display the countdown
            } 
            
            updateCountdown(); // Call the function to update the countdown
            let countdownInterval = setInterval(updateCountdown, 1000); // Update the countdown every second
        }

        // Function to convert the prayer time to 24 hour format
        function convertTo24Hour(time) { // Created a function to convert the prayer time to 24-hour format
            const [hours, minutes] = time.split(':').map(Number); // Split the time into hours and minutes
            let date = new Date(); // setting a variable to get the current date
            date.setHours(hours, minutes, 0, 0); // setting the hours and minutes of the date
            return date; // Return the date
        }

// Fetch Quran verse from Quran API

fetch('https://quranapi.pages.dev/api/2/153.json') // Fetching data from the API
    .then(response => response.json()) // Converting the response to JSON
    .then(data => { // Extracts the Quran verse from the API 
        console.log(data); // Logging the quran data from the API

        // Display the Quran verse on the webpage
        displayQuranVerse(data); // Calling the function to display the quran verse on the webpage
    })
    .catch(error => console.error('Error fetching Quran verse:', error)); // Catch any errors and log them to the console

// Function to display the Quran verse on the webpage
function displayQuranVerse(data) {
    const quranContainer = document.getElementById('quran-verse'); // document is the webpage, I'm using getElementbyId to get the element with the id of 'quran-verse'
    quranContainer.innerHTML = `
    <h2>Quran Verse:</h2>
    <p><strong>${data.surahName} (${data.surahNo}:${data.ayahNo})</strong></p> 
    <p><strong>${data.arabic1}</strong></p>
    <p><em>${data.english}</em></p>
    `;
}