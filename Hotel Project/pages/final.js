let roomText = document.getElementById("roomText");
let roomNumber = Math.floor(Math.random() * 1600);

// generates a random room number
roomText.innerHTML = 'Your room number is: ' + roomNumber;