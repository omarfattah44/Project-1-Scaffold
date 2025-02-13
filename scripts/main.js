// Fetch prayer times from Aladhan API
fetch('https://api.aladhan.com/v1/timingsByCity?city=San%20Luis%20Obispo&country=US') // Fetching data from the API
    .then(response => response.json()) // Converting response to JSON // JSON is a format for storing and transporting data
    .then(data => { // Extracts the prayer times from the API
        const timings = data.data.timings; // setting a constant variable to the data of the prayer times
        console.log(timings); // Check the prayer times in the console

        // Display the prayer times on the webpage
        displayPrayerTimes(timings); // Created a function that dynamically adds the prayer times to my webpage
    })
    .catch(error => console.error('Error fetching prayertimes:', error)); // Catch any errors and log them to the console

// Function to display the prayer times on the webpage
function displayPrayerTimes(timings) {
    const prayerTimesContainer = document.getElementById('prayer-times'); // document is the webpage, I'm using getElementbyId to get the element with the id of 'prayer-times'
    // I'm setting the innerHTML of the prayerTimesContainer to the prayer times from the API by using .innerHTML
    prayerTimesContainer.innerHTML = ` 
    <h2>Prayer Times</h2>
    <!-- im using the ${} to insert the prayer times from the API since its a variable and needs to go into a string -->
    <p><strong>Fajr:</strong> ${timings.Fajr}</p> 
    <p><strong>Dhuhr:</strong> ${timings.Dhuhr}</p>
    <p><strong>Asr:</strong> ${timings.Asr}</p>
    <p><strong>Maghrib:</strong> ${timings.Maghrib}</p>
    <p><strong>Isha:</strong> ${timings.Isha}</p>
    `;
}