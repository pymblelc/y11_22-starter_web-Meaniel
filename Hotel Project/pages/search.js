// declaring variables and getting elements from html
let results = document.getElementById("results");
let btnSearch = document.getElementById("btnSearch");
let room = document.getElementById("cardID");
let cost;

btnSearch.addEventListener("click", function () {
    results.innerHTML = '<h1 class="subtitle">Results</h1>'; // displays the subtitle "results"

    // gets number of adults  and converts to an integer
    let people = parseInt(document.getElementById("guests").value);

    // calculates estimated cost using number of days
    let days = parseInt(document.getElementById("days").value);

    // displays different rooms based on number of people (although I only added one room :p)
    if ((people > 0) & (people <= 3)) {
        cost = days * 194;
        results.innerHTML +=
            '<a href="book.html">' +
            '<div class="card" id="cardID">' +
            '<img src="../img/king.jpg" alt="" width="400">' +
            '<h2 class="subtitle">King Suite</h2>' +
            "<p>Cost: </p>" +
            "<p>$" +
            cost +
            "</p>" +
            "</div>" +
            "</a>";
    } else {
        results.innerHTML += '<p class="none">No rooms avaliable</p>';
    }
    console.log(people);
});
