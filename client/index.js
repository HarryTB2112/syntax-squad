const games = document.querySelector("#games");
const hangmanCard = document.querySelector("hangman-card");
const hangman = document.querySelector("#hangman");
const letters = document.querySelectorAll("#letters");
const displayLetter = document.getElementById("#display-letter");
const countryLetters = country.split("");
const capitalLetters = capital.split("");

hangmanCard.addEventListener("click", openHangman);
letters.forEach((letter) => letter.addEventListener("click", checkLetter));

function openHangman() {
  games.classList.add("hidden");
  hangman.classList.remove("hidden");
}

function geographyClick (){
    //code for geography hangman
}

//function to update the word displayed

async function fetchApiData(api) {
  try {
    const respData = await fetch(`http://localhost:3000/geography/random`);

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
console.log(fetchApiData());

// get country & city name and
function addApi(data) {
  const country = data.country;
  const capital = data.capital;
  country.forEach((letter) => {
    div.innerHTML("<p></p>");
  });
}

function checkLetter(country, capital) {
  const clickedLetter = event.target;
  for (let i = 0; i < countryLetters.length; i++) {}
  for (let i = 0; i < capitalLetters.length; i++) {
    if (capitalLetters[i] === clickedLetter) {
      displayLetter(capitalLetters[i]);
    }
  }
}

function updateWordDisplay() {
  // Get the word display element from the HTML
  var wordDisplayElement = document.getElementById("word-display");

  // Generate the word display with blanks and correctly guessed letters
  var wordDisplay = "";
  for (var i = 0; i < wordToGuess.length; i++) {
    var letter = wordToGuess[i];
    if (lettersGuessed.includes(letter)) {
      wordDisplay += letter + " ";
    } else {
      wordDisplay += "_ ";
    }
  }

  // Update the HTML with the new word display
  wordDisplayElement.textContent = wordDisplay;
}
