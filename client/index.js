const games = document.querySelector("#games");
const hangmanCard = document.querySelector("hangman-card");
const hangman = document.querySelector("#hangman");
const letters = document.querySelectorAll("#letters");
const displayLetter = document.getElementById("display-letter");
let countryLetters = [];
let capitalLetters = [];
const alphabet='abcdefghijklmnopqrstuvwxyz'.split ('') 

//event listeners

// event listener for search bar needed

hangmanCard.addEventListener("click", openHangman);
letters.forEach((letter) => letter.addEventListener("click", checkLetter));

async function fetchApiData() {
  try {
    const respData = await fetch(`http://localhost:3002/geography/random`);

    if (respData.ok) {
      const data = await respData.json();
      addApi(data);
    } else {
      throw "Something has gone wrong with one of the API requests";
    }
  } catch (e) {
    console.log(e);
  }
}

//start hangman
function openHangman() {
  games.classList.add("hidden");
  hangman.classList.remove("hidden");

  fetchApiData();
}

function displayCountry(){
    const underscoreContainer = document.getElementById("underscoreContainer");
    underscoreContainer = "";
        for (let i = 0; i < country.length; i++) {
        const underscore = document.createElement("p");
        underscore.textContent = "_";
        underscoreContainer.appendChild(underscore);
      }}

// get country & city name and turn them into each letter
function addApi(data) {
  const country = data.country;
  const capital = data.capital;
  countryLetters = country.split("");
  capitalLetters = capital.split("");
  displayWord();
}


function checkLetter(country, capital) {
  const clickedLetter = event.target.textContent;
  for (let i = 0; i < countryLetters.length; i++) {
    if (countryLetters[i] === clickedLetter) {
      countryLetters.splice(i, 1);
      displayLetter.textContent += clickedLetter;
      checkWin()
    }
  }
  for (let i = 0; i < capitalLetters.length; i++) {
    if (capitalLetters[i] === clickedLetter) {
        countryLetters.splice(i, 1);
        displayLetter.textContent += capitalLetters[i];
        checkWin()
    }
  }
}

function checkWin() {
    if (countryLetters.length === 0 && capitalLetters.length === 0) {
  alert("You won!");
    }
  }

/// this function needs to be fixed
function checkLoss(){
  //define bodyparts (they are urls)
  //conditional statement when body parts are all gone, give an alert to try again
  const img=""
  arrayImages=["Hangman1.jpg","Hangman2.jpg", "Hangman3.jpg", "Hangman4.jpg", 
  "Hangman5.jpg", "Hangman6.jpg", "Hangman7.jpg"]
  
  for (let j=0; j<arrayImages.length; j++){
    if (img===arrayImages[6]){
      alert("Try Again!")
    }
  }
}

  // Update the HTML with the new word display
  wordDisplayElement.textContent = wordDisplay;

