# Project-1-Scaffold
Productivity/Self-Growth-Application


# Problem Statement:
Productivity-Organization-and Self-Development go hand and hand.

The problem is I have to use various tools such as planners, to-do lists, calendars, and other various resources to stay ahead of my goals and aspirations.

I need a one stop shop that organizes my life in a way that keeps track of all of my taskers enabling me to be more productive and aid in accomplishing my goals/self-development.

# Overview
This personalized productivity app helps me stay organized with a structured to-do list, displays Islamic prayer times with a countdown so that I can properly manage my time, fetches a Quran verse for inspiration. It provides an interactive UI with features like adding, editing, and deleting tasks, along with real-time updates for prayer times and tasks.

# Features:
Islamic Prayer Times & Countdown
Fetches prayer times for a specified location using the Aladhan API.
Displays Hijri date.
Shows a countdown timer to the next prayer.

Daily Quran Verse
Fetches a random verse using the Quran API.
Displays Arabic, English translation, and reference.

To-Do List
Organized into five categories (Islam, Fitness, Work/School, Home/Miscellaneous, Masjid).
Users can add, edit, and delete tasks.
Tasks are saved to local storage, so they persist after refresh.

# Testing the App

1.Testing the Prayer Times API

Open scripts/main.js.

Locate the fetch('https://api.aladhan.com/v1/timingsByCity?...') request.

Run this in Postman or the browser console to verify the response.

Expected JSON response should contain timings and date.hijri.

2.Testing the To-Do List

Add a task in any category.

Refresh the page - the task should persist.

Click a task to mark it as completed (red strike-through).

Edit a task, refresh - the changes should persist.

Delete a task, refresh - it should be removed from local storage.

3.Testing the Quran API

Open scripts/main.js.

Locate fetch('https://quranapi.pages.dev/api/2/153.json').

Copy the URL and paste it in a browser.

Expected JSON response should contain ayahNo, surahName, english, and arabic1.

# Updating the App

Changing the Location for Prayer Times

Update the city and country in fetch request inside scripts/main.js:

fetch('https://api.aladhan.com/v1/timingsByCity?city=New%20York&country=US')

Adjusting To-Do Categories

Modify index.html by adding or removing <div class="todo-category"> elements.

Update const categories array in scripts/main.js to match.

Modifying the Quran Verse API

Update the fetch URL in scripts/main.js to request a different Surah or Ayah.

# User Stories: For Minimal Viable Product.

1. As a user, I want to add daily/weekly I can track and manage my schedule efficiently.

Acceptance Criteria: Users can create and edit tasks, categorize them, and view them.

2. As a user, I want to receive daily Quranic verses to stay inspired and connected to my faith.

Acceptance Criteria: The app displays a Quranic verse each day fetched from external APIs.

3. As a user, I want to view daily Islamic prayer times based on my location.

Acceptance Criteria: The app fetches and displays accurate prayer times from an API.


4. As a user, I want to prioritize tasks using a color-coded system.

Acceptance Criteria: Tasks are displayed with color codes indicating their priority level.


# User Stories: Future End Goal Product

1. As a user, I want to customize time blocks for each day so that I can allocate time for specific activities.

acceptance Criteria: Users can set and modify time blocks with different colors for various categories.

2. As a user, I want a habit tracker to monitor my daily habits across different aspects of my life.

Acceptance Criteria: Users can add, mark as complete, and review habits within the app.

3. As a user, I want a Pomodoro timer to improve focus and productivity while working on tasks.

Acceptance Criteria: The app includes a timer with start, pause, and reset functionalities.

4. As a user, I want to see current weather updates for my location to plan my day better.

Acceptance Criteria: The app displays real-time weather data fetched from an API.

5. As a user, I want to earn points and badges for completing tasks to stay motivated.

Acceptance Criteria: The app tracks completed tasks and rewards users with points and badges.

6. As a user, I want reminders for upcoming tasks and deadlines so that I don't miss any important activities.

Acceptance Criteria: Users receive on-screen reminders for scheduled tasks.

7. As a user, I want an analytics dashboard to view my productivity stats and progress over time

Acceptance Criteria: The app provides charts and graphs showing completed tasks, habits, and streaks.


# Kanban Link:
https://trello.com/b/imn6a4sw/project-1-productivity-app




