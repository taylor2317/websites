// Variable to track which button was clicked
var clicked = 0;

// Function to open the appropriate popup based on the clicked option (Instructions, Leaderboard, Settings)
function openPopup() {
    // If the instructions button was clicked
    if (clicked == 1) {
        // Hide all popups and show the instructions popup
        document.querySelectorAll('.popup').forEach(element => {
            element.style.display = 'none';
        });
        document.getElementById('instPop1').style.display = 'block'; // Show instructions page 1
    }
    // If the leaderboard button was clicked
    else if (clicked == 2) {
        // Hide all popups and show the leaderboard popup
        document.querySelectorAll('.popup').forEach(element => {
            element.style.display = 'none';
        });
        document.getElementById('leadPop').style.display = 'block'; // Show leaderboard
    }
    // If the settings button was clicked
    else if (clicked == 3) {
        // Hide all popups and show the settings popup
        document.querySelectorAll('.popup').forEach(element => {
            element.style.display = 'none';
        });
        document.getElementById('settPop').style.display = 'block'; // Show settings
    }
}

// Function to close all popups when invoked
function closePopup() {
    // Hide all popups
    document.querySelectorAll('.popup').forEach(element => {
        element.style.display = 'none';
    });
}

// Event listener to handle the instructions button click
document.getElementById('inst').addEventListener('click', function() {
    clicked = 1;  // Set clicked variable to 1 (Instructions)
    openPopup();  // Open the instructions popup
});

// Event listener to handle the leaderboard button click
document.getElementById('lead').addEventListener('click', function() {
    clicked = 2;  // Set clicked variable to 2 (Leaderboard)
    openPopup();  // Open the leaderboard popup
});

// Event listener to handle the settings button click
document.getElementById('sett').addEventListener('click', function() {
    clicked = 3;  // Set clicked variable to 3 (Settings)
    openPopup();  // Open the settings popup
});

// Function to navigate to the next page of instructions
function next() {
    document.getElementById('instPop1').style.display = 'none'; // Hide the current instruction page
    document.getElementById('instPop2').style.display = 'block'; // Show the next instruction page
}

// Function to navigate to the previous page of instructions
function prev() {
    document.getElementById('instPop1').style.display = 'block'; // Show the previous instruction page
    document.getElementById('instPop2').style.display = 'none'; // Hide the next instruction page
}

// Function to enable high contrast mode
function contOn() {
    localStorage.setItem('contrast', "true");  // Save the high contrast setting in local storage
    alert("High contrast mode has been enabled.");  // Alert user
    location.reload();  // Reload the page to apply changes
}

// Function to disable high contrast mode
function contOff() {
    localStorage.setItem('contrast', "false"); // Save the low contrast setting in local storage
    alert("High contrast mode has been disabled.");  // Alert user
    location.reload();  // Reload the page to apply changes
}

// Function to clear stored data from local storage
function clearSaved() {
    localStorage.clear();  // Clear all data from local storage
    alert("All stored data has been cleared.");  // Alert user
    location.reload();  // Reload the page to apply changes
}
