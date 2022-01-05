let options = {
    day: "numeric",
    month: "long",
    year: "numeric"
};

// shows current date
document.getElementById("currentDate").textContent = "Today: " + new Date().toLocaleDateString("en-US", options);

// shows when document was last modified
document.getElementById("lastUpdated").textContent = "Last Updated: " + document.lastModified;

// shows current year for copyright
document.getElementById("currentYear").innerHTML = "&copy; " + new Date().getFullYear() + " | Chris Fowler | Utah |";