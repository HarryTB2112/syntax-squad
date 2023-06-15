// Selecting all needed elements from DOM
const games = document.querySelector("#games");
const hangman = document.querySelector("#hangman-game");
const letters = document.querySelector("#letter-grid");
const hangmanCard = document.querySelector("#rcorners1");
const logo = document.querySelector("#logo");
const countryContainer = document.querySelector("#country-container");
const capitalContainer = document.querySelector("#capital-container");
const hangmanImage = document.querySelector("#hangman-image");
const resetButton = document.querySelector("#reset-btn");
const addMoreButton = document.querySelector("#modal-btn");
const modal = document.querySelector("#modal");
const createForm = document.querySelector("#add-form");
const wins = document.querySelector("#win-count")
const losses = document.querySelector("#loss-count")
const winPercent = document.querySelector("#win-percent")
const hamburger = document.querySelector("#hamburger")
const dropdown = document.querySelector("#dropdown-menu")
const modalClose = document.querySelector("#modal-close")

// Creating all needed variables
let winCount = 0
let lossCount = 0
const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
let countryLetters = [];
let capitalLetters = [];
let clickedLetters = [];
let wrongLetters = [];
let underscore;
const arrayImages = [
  "images/Hangman1.jpg",
  "images/Hangman2.jpg",
  "images/Hangman3.jpg",
  "images/Hangman4.jpg",
  "images/Hangman5.jpg",
  "images/Hangman6.jpg",
  "images/Hangman7.jpg",
];
let currentImg = arrayImages[0];

// Creating event listeners for elements
hangmanCard.addEventListener("click", openHangman);
addMoreButton.addEventListener("click", addMore);
createForm.addEventListener("submit", createNewWord);
resetButton.addEventListener("click", openHangman);
logo.addEventListener("click", closeHangman);
letters.addEventListener("click", checkLetter);
hamburger.addEventListener("click", dropdownMenu)
modalClose.addEventListener("click", closeModal)

// Utility functions
function updateWins(){
  wins.textContent = `Win Count: ${winCount}`
}

function updateLosses(){
  losses.textContent = `Loss Count: ${lossCount}`
}

function updateWinPercentage(){
  winPercent.textContent = `Win %: ${winCount / (winCount + lossCount) * 100}%`
}

function dropdownMenu () {
  dropdown.classList.toggle("open")
};

function closeModal () {
  modal.classList.add("hidden")
}

function addMore() {
  modal.classList.remove("hidden");
}


//POST req to add countries and capitals - connecting front-end and back-end
async function createNewWord(e) {
  e.preventDefault();

  // Extract data from form
  const data = {
    country: e.target.countryInput.value,
    capital: e.target.capitalInput.value,
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch("http://localhost:3002/geography", options);

  if (response.status === 201) {
    // Clear input
    e.target.countryInput.value = "";
    e.target.capitalInput.value = "";
    // Display a successful message to the user
    alert("Country and Capital Added.");
  } 
  else if (response.status === 404) {
    e.target.countryInput.value = "";
    e.target.capitalInput.value = "";
    alert("Empty string input, try again.")
  } else {
    e.target.countryInput.value = "";
    e.target.capitalInput.value = "";
    alert("This country already exists, please try a new one.");
  }
}

// Fetches data from backend API
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

// Start hangman
function openHangman() {
  // Hide homepage and open hangman page
  games.classList.add("hidden");
  hangman.classList.remove("hidden");

  // Initialise letters grid
  const lettersArr = letters.children;
  for (let i = 0; i < lettersArr.length; i++) {
    lettersArr[i].style.color = "#ffde7d";
    lettersArr[i].style.textDecoration = "";
  }

  // Initialise hangman image
  hangmanImage.src = "images/Hangman1.jpg";
  currentImg = arrayImages[0];
  // Fetch Country and Capital
  fetchApiData();
  clickedLetters = [];
}

// Go back to main page
function closeHangman() {
  games.classList.remove("hidden");
  hangman.classList.add("hidden");
}

// Displays Underscores for the length of the country
function displayCountry() {
  countryContainer.innerHTML = "<p>Country: </p>";

  // Create underscores for length of country
  for (let i = 0; i < countryLetters.length; i++) {
    underscore = document.createElement("p");
    underscore.setAttribute("id", `${i}`);
    if (countryLetters[i] === " ") {
      underscore.innerHTML = "&nbsp;&nbsp;";
    } else {
      underscore.textContent = "_";
    }

    // Display underscores
    countryContainer.appendChild(underscore);
  }
}

// Displays Underscores for the length of the capital
function displayCapital() {
  capitalContainer.innerHTML = "<p>Capital: <p>";

  // Create underscores for length of capital
  for (let i = 0; i < capitalLetters.length; i++) {
    underscore = document.createElement("p");
    underscore.setAttribute("id", `${i + 20}`);
    if (capitalLetters[i] === " ") {
      underscore.innerHTML = "&nbsp;&nbsp;";
    } else {
      underscore.textContent = "_";
    }

    // Display underscores
    capitalContainer.appendChild(underscore);
  }
}

// Get country & city name and turn them into each letter
function addApi(data) {

  // Initalise country and capital variables
  const country = data.country;
  const capital = data.capital;

  // Create arrays of letters
  countryLetters = country.toUpperCase().split("");
  capitalLetters = capital.toUpperCase().split("");

  // Display underscores
  displayCapital();
  displayCountry();
}

// Checks letter clicked to see if it is correct or incorrect, changes color, checks for duplicates, calls Win or Lose functions
function checkLetter() {

  // Creatte clicked letter variable
  const clickedLetter = event.target;

  // Check if letter has already been clicked
  if (!clickedLetters.includes(clickedLetter.textContent)) {

    // Loop through country letters array and check for clicked letter
    for (let i = 0; i < countryLetters.length; i++) {
      if (countryLetters[i] === clickedLetter.textContent) {

        // Change styling if letter is correct
        clickedLetter.style.color = "green";

        // Change underscore to clicked letter
        document.getElementById(i.toString()).textContent =
          clickedLetter.textContent;

        // Push clicked letter to clicked letters array
        clickedLetters.push(clickedLetter.textContent);
      }
    }
    
    // Loop through capital letters array and check for clicked letter
    for (let i = 0; i < capitalLetters.length; i++) {
      if (capitalLetters[i] === clickedLetter.textContent) {

        // Change styling if letter is correct
        clickedLetter.style.color = "green";

        // Change underscore to clicked letter
        document.getElementById((i + 20).toString()).textContent =
          clickedLetter.textContent;

        // Push clicked letter to clicked letters array
        clickedLetters.push(clickedLetter.textContent);
      }
    }

    // Check if the clicked letter is not in the capital or country letters
    if (
      !countryLetters.includes(clickedLetter.textContent) &&
      !capitalLetters.includes(clickedLetter.textContent) &&
      !(clickedLetter.id === "letter-grid")
    ) {

      // Change styling of letter
      clickedLetter.style.color = "red";
      clickedLetter.style.textDecoration = "line-through";

      // Check if image is not the final image
      if (
        !(currentImg === "images/Hangman7.jpg") &&
        !wrongLetters.includes(clickedLetter.textContent)
      ) {

        // Iterate to the next image in array
        currentImg = arrayImages[arrayImages.indexOf(currentImg) + 1];
      }

      // Push incorrect letter to wrong letters array
      wrongLetters.push(clickedLetter.textContent);
    }

    // Give loss alert if on final image
    if (currentImg === "images/Hangman7.jpg") {
      setTimeout(lossAlert, 300);
    }
  }

  // Change image source to next image
  hangmanImage.src = currentImg;

  // Check for wins after each click
  setTimeout(checkWin, 300);
}

// Displays alert when game is lost
function lossAlert() {
  const country = countryLetters.join("");
  const capital = capitalLetters.join("");

  // Iterate loss count and update score
  lossCount++;
  updateLosses()
  updateWinPercentage()

  // Alert to the loss
  alert(
    `You lost! \n \nThe Country was ${country} and the Capital was ${capital}`
  );

  // Reset game
  openHangman();
}

// Displays alert when game is won
function checkWin() {

  // Check if game is completed
  if (countryLetters.length + capitalLetters.length === clickedLetters.length) {

    // Iterate win count and update scores
    winCount++;
    updateWins()
    updateWinPercentage()

    // Alert to the win
    alert("You won!");

    // Reset the game
    openHangman();
  }
}


