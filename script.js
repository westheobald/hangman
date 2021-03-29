"use strict";

let answers = [
  "dolphin",
  "football",
  "hockey",
  "golf",
  "guitar",
  "beach",
  "fireplace",
  "camera",
  "movie",
];

let answer = answers[Math.trunc(Math.random() * answers.length)];

const defaultDeath = 7;
let currentDeath = defaultDeath;
let points = 0;
let previousGuess = "";

function getLetters() {
  for (let i = 0; i < answer.length; i++) {
    let element = document.createElement("div");
    element.className = `letter${i}`;
    element.appendChild(document.createTextNode(""));
    document.getElementById("letter").appendChild(element);
  }

  if (answer.length < 6) {
    document.getElementById("letter").style.maxWidth = "80%";
    document.getElementById("letter").style.margin = "0 auto";
  } else {
    document.getElementById("letter").style.maxWidth = "100%";
  }
}
getLetters();

let c = document.getElementById("hangman");
let ctx = c.getContext("2d");

document.querySelector(".guess").addEventListener("keyup", function () {
  let guess = document.querySelector(".guess").value.toLowerCase();
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  if (
    alphabet.includes(guess) &&
    !previousGuess.includes(guess) &&
    guess.length === 1 &&
    currentDeath != 0
  ) {
    if (answer.includes(guess)) {
      for (let i = 0; i < answer.length; i++) {
        if (answer[i] === guess) {
          document.querySelector(`.letter${i}`).textContent = answer[
            i
          ].toUpperCase();
          document.querySelector("#description").textContent =
            "Letter was found!";
          document.querySelector(`.letter${i}`).style.backgroundColor = "green";
          points += 1;
        }
      }
    } else {
      currentDeath--;
      document.querySelector(
        "#description"
      ).textContent = `Letter was not found. ${currentDeath} lives left.`;
      if (currentDeath === 6) {
        ctx.beginPath();
        ctx.arc(25, 20, 20, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();
      } else if (currentDeath === 5) {
        ctx.beginPath();
        ctx.moveTo(25, 20);
        ctx.lineTo(25, 80);
        ctx.strokeStyle = "white";
        ctx.stroke();
      } else if (currentDeath === 4) {
        ctx.beginPath();
        ctx.moveTo(25, 50);
        ctx.lineTo(5, 55);
        ctx.stroke();
      } else if (currentDeath === 3) {
        ctx.moveTo(25, 50);
        ctx.lineTo(45, 55);
        ctx.strokeStyle = "white";
        ctx.stroke();
      } else if (currentDeath === 2) {
        ctx.beginPath();
        ctx.moveTo(25, 80);
        ctx.lineTo(5, 120);
        ctx.stroke();
      } else if (currentDeath === 1) {
        ctx.moveTo(25, 80);
        ctx.lineTo(45, 120);
        ctx.strokeStyle = "white";
        ctx.stroke();
      }
    }
    previousGuess += guess;
  } else {
    if (guess.length != 1) {
      document.querySelector("#description").textContent =
        "Enter one letter at a time!";
    } else if (previousGuess.includes(guess)) {
      document.querySelector("#description").textContent =
        "Already tried that letter!";
    } else {
      document.querySelector("#description").textContent = "Only use letters!";
    }
  }

  document.querySelector(".guess").value = "";

  if (points === answer.length) {
    document.querySelector("#description").textContent = "YOU WIN!!";
    document.querySelector("body").style.backgroundColor = "rgb(0, 58, 3)";
    document.querySelector(".again").style.visibility = "visible";
  }

  if (currentDeath === 0) {
    document.querySelector("body").style.backgroundColor =
      "rgba(71, 0, 0, 0.918)";
    document.querySelector("#description").textContent = "YOU LOSE.";
    document.querySelector(".again").style.visibility = "visible";
  }
});

document.querySelector(".again").addEventListener("click", function () {
  currentDeath = defaultDeath;
  points = 0;
  let letterDiv = document.getElementById("letter");
  document.querySelector("#description").textContent = "";
  document.querySelector(".guess").value = "";
  document.querySelector("body").style.backgroundColor = "#333";
  document.querySelector(".again").style.visibility = "collapse";

  while (letterDiv.hasChildNodes()) {
    letterDiv.removeChild(letterDiv.firstChild);
  }
  answer = answers[Math.trunc(Math.random() * answers.length)];
  getLetters();
  previousGuess = "";
  ctx.clearRect(0, 0, c.width, c.height);
});
