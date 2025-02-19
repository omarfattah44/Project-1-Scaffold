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

// Function to display the prayer times on the webpage in a horizontal layout
function displayPrayerTimes(timings) {
    const prayerTimesContainer = document.getElementById('prayer-times');
    prayerTimesContainer.innerHTML = ''; // Clear existing content

    // List of prayer times to display
    const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

    prayers.forEach(prayer => {
        const prayerElement = document.createElement("div");
        prayerElement.classList.add("prayer-time"); // Apply CSS class
        prayerElement.innerHTML = `<strong>${prayer}:</strong> ${timings[prayer]}`;
        prayerTimesContainer.appendChild(prayerElement);
    });
}

        // Function to get the next prayer time

        function getNextPrayerTime(prayerTimes, currentTime) { // Created a function to find the next prayer time
            for (let i = 0; i < prayerTimes.length; i++) { // Doing a loop to go through the prayer times, ++ is incrementing the loop by 1 so it goes through each prayer time
                const prayerTime = convertTo24Hour(prayerTimes[i].time); // Convert to 24-hour format
                if (currentTime < prayerTime) { // Check if the current time is less than the prayer time
                    console.log("Next prayer time found:", prayerTimes[i].name, "at", prayerTimes[i].time);
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
        function startCountdown(nextPrayerTime, prayerName) {
            const countdownContainer = document.getElementById('countdown-container'); // Ensure countdown displays in the right place
            const countdownElement = document.getElementById('countdown'); // Get the countdown element
            countdownElement.innerHTML = `<strong>Loading countdown...</strong>`; // Set initial text
        
            let countdownInterval; // Declare it here at the top before using it
        
            function updateCountdown() {
                const now = new Date(); // Get the current time
                const prayerTime = convertTo24Hour(nextPrayerTime); // Convert prayer time to 24-hour format
                const timeDifference = prayerTime - now; // Calculate time left
        
                if (timeDifference <= 0) { // If it's time for prayer
                    countdownElement.innerHTML = `<strong>${prayerName} time is now!</strong>`;
                    clearInterval(countdownInterval); // Stop the countdown
                    return;
                }
        
                // Calculate hours, minutes, and seconds left
                const hours = Math.floor(timeDifference / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        
                // Update the countdown text
                countdownElement.innerHTML = `<strong>${prayerName} is in:</strong> ${hours}h ${minutes}m ${seconds}s`;
            }
        
            updateCountdown(); // Call it immediately to update the UI
            countdownInterval = setInterval(updateCountdown, 1000); //  Initialize interval after function is defined
        }
        

        // Function to convert the prayer time to 24 hour format
        function convertTo24Hour(time) {
            //  Check if time is valid and is a string
            if (!time || (typeof time !== 'string' && !(time instanceof Date))) {
                console.error("Invalid time format:", time);
                return new Date(); // Return the current time to prevent further errors
            }
        
            //  If time is already a Date object, return it directly
            if (time instanceof Date) {
                return time;
            }
        
            //  Ensure time is a string before splitting
            const [hours, minutes] = time.split(":").map(Number);
            let date = new Date();
            date.setHours(hours, minutes, 0, 0);
            return date;
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
    <h2>Quran Verse: <strong>${data.surahName} (${data.surahNo}:${data.ayahNo})</strong></h2>
    <h1><strong>${data.arabic1}</strong></h1>
    <h2><em>${data.english}</em></h2>
    `;
}

//*********************************************************************************************************************************
// To Do List Portion

// Function to add a new task to a specific list

//*********************************************************************************************************************************
// To-Do List Portion

// Function to add a new task to a specific list
function addTask(category) {
    const taskInput = document.getElementById(`${category}-task`); // Get the task input field
    const taskText = taskInput.value.trim(); // Remove spaces from input

    if (taskText === "") return; // Prevent empty tasks

    const taskList = document.getElementById(`${category}-list`); // Get the task list
    const taskItem = createTaskItem(taskText, category, false); // Create a new task element

    taskList.appendChild(taskItem); // Add task to list
    taskInput.value = ""; // Clear input field

    saveTasks(category); // Save tasks to local storage
    console.log(`Task "${taskText}" added to ${category}`); // Log task addition
}

// Function to create a task item element
function createTaskItem(taskText, category, isCompleted) {
    const taskItem = document.createElement("li"); // Create list item
    const taskTextElement = document.createElement("span"); // Create span for task text
    taskTextElement.textContent = taskText; // Set task text
    taskTextElement.onclick = function () { toggleComplete(this); }; // Add toggle complete function

    if (isCompleted) { 
        taskTextElement.classList.add("completed"); // Mark as completed if needed
    }

  // Create a container for the buttons
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

    // Create Edit Button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-btn");
    editButton.onclick = function () { editTask(this, category); }; // Attach edit function

    // Create Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    deleteButton.onclick = function () { deleteTask(this, category); }; // Attach delete function
    
    // Append buttons to container
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

     // Append elements to task item
     taskItem.appendChild(taskTextElement);
     taskItem.appendChild(buttonContainer);
  
    return taskItem;
}

// Function to edit a task
function editTask(editButton, category) {
    const taskItem = editButton.parentElement.parentElement; // Get task item
    const taskTextElement = taskItem.querySelector("span"); // Get text element
    const oldText = taskTextElement.textContent.trim(); // Store original text

    // Create an input field
    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = oldText;
    inputField.classList.add("edit-input");

    // Replace text with input field
    taskItem.replaceChild(inputField, taskTextElement);
    inputField.focus(); // Focus on input field

    // Save changes when pressing Enter or clicking outside
    inputField.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            saveEditedTask(inputField, taskItem, category);
        }
    });

    inputField.addEventListener("blur", function () {
        saveEditedTask(inputField, taskItem, category);
    });
}

// Function to save edited task
function saveEditedTask(inputField, taskItem, category) {
    const newText = inputField.value.trim();
    if (newText === "") return; // Prevent empty edits

    const taskTextElement = document.createElement("span");
    taskTextElement.textContent = newText;
    taskTextElement.onclick = function () { toggleComplete(taskTextElement); };

    taskItem.replaceChild(taskTextElement, inputField);
    saveTasks(category);
}

// Function to toggle task completion status
function toggleComplete(taskElement) {
    taskElement.classList.toggle("completed"); // Toggle class
    const category = taskElement.parentElement.parentElement.id.replace('-list', ''); // Get category
    saveTasks(category); // Save tasks to local storage
}

// Function to delete a task
function deleteTask(taskElement, category) {
    taskElement.parentElement.parentElement.remove(); // Remove task
    saveTasks(category); // Save tasks to local storage
}

// Function to save tasks to local storage
function saveTasks(category) {
    const taskList = document.getElementById(`${category}-list`);
    const tasks = Array.from(taskList.children).map(item => ({
        text: item.querySelector("span").textContent.trim(), // Store text
        complete: item.querySelector("span").classList.contains("completed") // Store completion status
    }));

    localStorage.setItem(category, JSON.stringify(tasks)); // Save tasks as objects
    console.log(`Tasks saved for ${category}`);
}

// Function to load tasks from local storage
function loadTasks() {
    const categories = ["islam", "fitness", "work", "home", "masjid"];

    categories.forEach(category => {
        const taskList = document.getElementById(`${category}-list`);
        const savedTasks = JSON.parse(localStorage.getItem(category)) || [];

        savedTasks.forEach(task => {
            const taskItem = createTaskItem(task.text, category, task.complete);
            taskList.appendChild(taskItem);
        });
    });

    console.log("Tasks loaded from local storage");
}

// Load tasks when the page loads and add event listeners
document.addEventListener("DOMContentLoaded", () => {
    loadTasks();

    const categories = ["islam", "fitness", "work", "home", "masjid"];

    categories.forEach((category) => {
        const inputField = document.getElementById(`${category}-task`);
        const addButton = document.querySelector(`button[onclick="addTask('${category}')"]`);

        if (inputField) {
            inputField.addEventListener("keypress", function(event) {
                if (event.key === "Enter") {
                    event.preventDefault();
                    addTask(category);
                }
            });
        }
        if (addButton) { 
            addButton.addEventListener("click", function() {
                addTask(category);
            });
        }
    });
});

//********************************************************************************************/

