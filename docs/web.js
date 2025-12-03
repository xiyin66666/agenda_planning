// This file is for web deployment only
// It handles localStorage and initializes the app

document.addEventListener('DOMContentLoaded', function() {
    console.log('Agenda Planner Web Version Loaded');
    
    // Initialize your app (using the same AgendaApp class)
    if (typeof AgendaApp !== 'undefined') {
        window.app = new AgendaApp();
    } else {
        console.error('AgendaApp not found. Make sure script.js is loaded.');
    }
});