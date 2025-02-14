// Fetch prayer times from Aladhan API
fetch('https://api.aladhan.com/v1/timingsByCity?city=San%20Luis%20Obispo&country=US') // Fetching data from the API
    .then(response => response.json()) // Converting response to JSON // JSON is a format for storing and transporting data
    .then(data => { // Extracts the prayer times from the API
        const timings = data.data.timings; // setting a constant variable to the data of the prayer times
        console.log(timings); // Check the prayer times in the console
        const hijriDate = data.data.date.hijri; // setting a constant variable to the data of the hijri date
        console.log(hijriDate); // Check the hijri date in the console
        
        displayIslamicDate(hijriDate); // Calling the function to display the islamic date on the webpage


        // Display the prayer times on the webpage
        displayPrayerTimes(timings); // Created a function that dynamically adds the prayer times to my webpage
    })
    .catch(error => console.error('Error fetching prayertimes:', error)); // Catch any errors and log them to the console


// Function to display the Islamic date on the webpage
function displayIslamicDate(hijriDate) {
    const prayerTimesContainer = document.getElementById('prayer-times'); // document is the webpage, I'm using getElementbyId to get the element with the id of 'islamic-date'
    const islamicDateHTML = `
    <h3>Hijri Date:</h3>
     <h3>${hijriDate.weekday.en}, ${hijriDate.day} ${hijriDate.month.en} ${hijriDate.year} AH</h3>
    `;
    prayerTimesContainer.insertAdjacentHTML('afterbegin', islamicDateHTML);
}
// I'm using the insertAdjacentHTML method to insert the islamic date into the webpage. I'm using the 'afterbegin' parameter to insert the islamic date at the beginning of the prayer times container

// Function to display the prayer times on the webpage
function displayPrayerTimes(timings) {
    const prayerTimesContainer = document.getElementById('prayer-times'); // document is the webpage, I'm using getElementbyId to get the element with the id of 'prayer-times'
    //im using the ${} to insert the prayer times from the API since its a variable and needs to go into a string// these are also the API properties inspected from the browser console
    const prayerTimesContainerHTML = ` 
    <h2>Prayer Times</h2>
    <p><strong>Fajr:</strong> ${timings.Fajr}</p> 
    <p><strong>Dhuhr:</strong> ${timings.Dhuhr}</p>
    <p><strong>Asr:</strong> ${timings.Asr}</p>
    <p><strong>Maghrib:</strong> ${timings.Maghrib}</p>
    <p><strong>Isha:</strong> ${timings.Isha}</p>
    `;
    prayerTimesContainer.insertAdjacentHTML('beforeend', prayerTimesContainerHTML); // I'm using the insertAdjacentHTML method to insert the prayer times into the webpage. I'm using the 'beforeend' parameter to insert the prayer times at the end of the prayer times container
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
    <p>${data.arabic1}</p>
    <p><em>${data.english}</em></p>
    `;
}