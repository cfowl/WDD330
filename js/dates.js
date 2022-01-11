let options = {day: "numeric", month: "long", year: "numeric"
};

// shows the current date
document.getElementById("currentDate").textContent = "Today: " + new Date().toLocaleDateString("en-US", options);

// shows when the document was last modified
document.getElementById("lastUpdated").textContent = "Last Updated: " + document.lastModified;

// shows current year and my name for the copyright
document.getElementById("currentYear").innerHTML = "&copy; " + new Date().getFullYear() + " | <a href='../'>Chris Fowler</a> | Utah |";