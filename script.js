let buttonText = document.getElementById("pressMeMeow");
let hiText = document.getElementById("hiBtn1");
let clicker = 0;
let clickerValue = 0;
const aboutMe = ["hi", "hello", "how are you?", "About Me", ":)", "nngyunglydngraady", "私につして"];

bttnmeow.addEventListener("click", function () {
  buttonText.innerHTML = "yay!";
  var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  var randomColor2 = "#" + Math.floor(Math.random() * 16777215).toString(16);
  bttnmeow.style.color = randomColor;
  bttnmeow.style.backgroundColor = randomColor2;
  clickerValue = clickerValue + 1;

  if (clicker == 1) {
    buttonText.innerHTML = clickerValue + " melons";
  } else {
    clicker = clicker + 1;
  }
});

hiBtn1.addEventListener("click",function () {
    console.log("hi")
    document.getElementById("title1").innerHTML = aboutMe[Math.floor(Math.random() * 7)];
});