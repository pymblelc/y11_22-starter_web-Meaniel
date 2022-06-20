console.log("hi");

let myPhoto = document.getElementById("myPhoto");
let analyseBtn = document.getElementById("btnAnalyse");
let myResults = document.getElementById("myText");

let imgURL = myPhoto.src;

//myResults.innerHTML = imgURL;

analyseBtn.addEventListener("click", function(){
    ImageAPI.analyseFaces(imgURL, function (data) {
        for (let i = 0; i < data.length; i++) {
            let age1 = data[i].faceAttributes.age;
            myResults.innerHTML = "Person " + (i + 1) + " is " + age1 + " years old"
            
        };
    });
});