// booking process
let btnSubmitBook = document.getElementById("btnSubmitID");

guests = [
    // array
];

btnSubmitBook.addEventListener("click", function () {
    // attaches code to the submit button
    let fName = document.getElementById("inputFName").value;
    let lName = document.getElementById("inputLName").value;
    let email = document.getElementById("inputEmail").value;
    let phone = document.getElementById("inputPhone").value; // fetching values for the record
    btnSubmitBook.innerHTML = "Submit ✓";

    let fileInput = document.getElementById("fileSubmitID");
    let blob = new Blob([fileInput.files[0]]); // creates blob
    ImageAPI.analyseFacesBlob(
        // analyses blob
        blob,
        function (data) {
            guests.push(
                // adds a record to the "guests" array
                {
                    firstName: fName,
                    lastName: lName,
                    email: email,
                    phone: phone,
                    photo: data[0],
                }
            );
        }
    );

    //  this section displays the blob image on the page
    let fileReader = new FileReader();
    fileReader.onload = function (e) {
        document.getElementById("preview").src = e.target.result;
    };
    fileReader.readAsDataURL(fileInput.files[0]);

    console.log(guests);

    // checks if field are all filled and alerts user if not
    if (fName == "" || lName == "" || email == "" || phone == "") {
        alert("Please fill required areas");
    }
});

// check in process
// declaring and defining variables
let video = document.querySelector(".videoElement");
let btnBegin = document.getElementById("btnBeginID");
let btnCapture = document.getElementById("btnCapture");
let btnRetake = document.getElementById("btnRetake");
let btnSubmit = document.getElementById("btnSubmit");
let webcam = document.getElementById("camera");
let canvas = document.getElementById("canvasID");
let contentTop = document.getElementById("checkinTopID");
let contentPicture = document.getElementById("pictureID");
let pageContent = document.getElementById("checkinContent");
let contentCheckin = document.getElementById("checkinCard");
let camera = new Webcam(webcam, "user", canvas);

btnBegin.addEventListener("click", function () {
    camera.start();
    contentTop.innerHTML = '<p class="checkinText">Check in using photo ID</p>';
}); // starts camera and hides begin button

btnRetake.addEventListener("click", function () {
    camera.start();
}); // restarts camera

btnCapture.addEventListener("click", function () {
    console.log("button pressed");
    camera.snap();
    camera.stop();
}); // takes picture

// calculates the % match for quantitative data
function quantitative(a, b) {
    return (1 - Math.abs(a - b)) * 100;
}

// calculates the % match for qualitative data
function qualitative(a, b) {
    if (a == b) {
        return 100;
    } else {
        return 0;
    }
}

guestSim = []; // similarity array

// declaring variables
let similarity;
let moustache;
let beard;
let sideburns;
let gender;
let age;
let bald;
let hairColor;
let glasses;
let profile;

// activates code when submit button is pressed
btnSubmit.addEventListener("click", function () {
    canvas.toBlob(function (blob) {
        //this takes the data from the canvas and the data is turned into a blob
        ImageAPI.analyseFacesBlob(blob, function (data) {
            // analyses the new image
            console.log(data);

            // declaring face attribute variables for new image
            let moustache1 = data[0].faceAttributes.facialHair.moustache;
            let beard1 = data[0].faceAttributes.facialHair.moustache;
            let sideburns1 = data[0].faceAttributes.facialHair.moustache;
            let gender1 = data[0].faceAttributes.gender;
            let age1 = data[0].faceAttributes.age;
            let bald1 = data[0].faceAttributes.hair.bald;
            let hairColor1 = data[0].faceAttributes.hair.HairColor;
            let glasses1 = data[0].faceAttributes.hair.HairColor;

            for (let i = 0; i < guests.length; i++) {
                // declaring face attribute variables for old image
                let moustache2 = guests[i].photo.faceAttributes.facialHair.moustache;
                let beard2 = guests[i].photo.faceAttributes.facialHair.moustache;
                let sideburns2 = guests[i].photo.faceAttributes.facialHair.moustache;
                let gender2 = guests[i].photo.faceAttributes.gender;
                let age2 = guests[i].photo.faceAttributes.age;
                let bald2 = guests[i].photo.faceAttributes.hair.bald;
                let hairColor2 = guests[i].photo.faceAttributes.hair.HairColor;
                let glasses2 = guests[i].photo.faceAttributes.hair.HairColor;

                // calculates the % match of each attribute using above functions (see line 38)
                moustache = quantitative(moustache1, moustache2);
                beard = quantitative(beard1, beard2);
                sideburns = quantitative(sideburns1, sideburns2);
                bald = quantitative(bald1, bald2);
                gender = qualitative(gender1, gender2);
                glasses = qualitative(glasses1, glasses2);
                age = 100 - Math.abs(age1 - age2);

                if (guests[i].photo.faceAttributes.hair.invisible == false) {
                    hairColor = qualitative(hairColor1, hairColor2);
                } else {
                    hairColor = 0;
                } // prevents errors if hair is detected as invisible there wont be any hair colour

                similarity = // calculates the similarity between img 1 and 2
                    (moustache + beard + sideburns + gender + age + bald + hairColor) / 7;

                guestSim.push(similarity); // adds guest simiilarity to array

                console.log("moustache " + moustache);
                console.log("beard " + beard);
                console.log("sideburns " + sideburns);
                console.log("gender " + gender);
                console.log("age " + age);
                console.log("bald " + bald);
                console.log("glasses " + glasses);
                console.log("colour " + hairColor);

                console.log("sim " + similarity);
            }

            // gets the value in the array which contains the highest number
            const max = Math.max(...guestSim);
            const index = guestSim.indexOf(max);
            console.log(index);

            // gets the corresponding record to the highest match %
            profile = guests[index];

            // displays messages based on % match
            if (guestSim[index] >= 95) {
                // displays full name of guest and confirmation button
                contentCheckin.innerHTML +=
                    '<div id="foundMatch">' +
                    "<p></p>" +
                    '<p class="checkinText">If this you please click confirm. Otherwise, please try again</p>' +
                    "<p>" +
                    profile.firstName +
                    " " +
                    profile.lastName +
                    "</p>" +
                    '<a href="final.html"><button class="btnBegin">Confirm</button></a>' +
                    "</div>";
            } else {
                // displays "no match, please try again"
                contentCheckin.innerHTML +=
                    '<div id="foundMatch">' +
                    "<p></p>" +
                    '<p class="checkinText">No match found, please try again</p>' +
                    "<p></p>" +
                    '<p class="checkinText">Tips: Use the picture on your passport or drivers licence, remove any hats or face coverings</p>' +
                    "</div>";
            }
        });
    });
});
