// Selecting all needed elements from DOM
const games = document.querySelector("#games");
const hangman = document.querySelector("#hangman-game");
const letters = document.querySelector("#letter-grid");
const hangmanCard = document.querySelector("#rcorners1");
const brain = document.querySelector("#brain");
const countryContainer = document.querySelector("#country-container");
const capitalContainer = document.querySelector("#capital-container");
const hangmanImage = document.querySelector("#hangman-image");
const resetButton = document.querySelector("#reset-btn");
const addMoreButton = document.querySelector("#modal-btn");

// Creating all needed variables
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
// addMoreButton.addEventListener("click", addMore );
resetButton.addEventListener("click", openHangman);
brain.addEventListener("click", closeHangman);
letters.addEventListener("click", checkLetter);

//event listener for back-end and front-end
// createForm.addEventListener("submit", createNewWord);

//POST req to add countries and capitals - connecting front-end and back-end
async function createNewWord(e) {
  e.preventDefault();

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
  games.classList.add("hidden");
  hangman.classList.remove("hidden");
  const lettersArr = letters.children;
  for (let i = 0; i < lettersArr.length; i++) {
    lettersArr[i].style.color = "#ffde7d";
    lettersArr[i].style.textDecoration = "";
  }
  hangmanImage.src = "images/Hangman1.jpg";
  currentImg = arrayImages[0];
  console.log(lettersArr);
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

  for (let i = 0; i < countryLetters.length; i++) {
    underscore = document.createElement("p");
    underscore.setAttribute("id", `${i}`);
    if (countryLetters[i] === " ") {
      underscore.innerHTML = "&nbsp;&nbsp;";
    } else {
      underscore.textContent = "_";
    }

    countryContainer.appendChild(underscore);
  }
}

// Displays Underscores for the length of the capital
function displayCapital() {
  capitalContainer.innerHTML = "<p>Capital: <p>";
  for (let i = 0; i < capitalLetters.length; i++) {
    underscore = document.createElement("p");
    underscore.setAttribute("id", `${i + 20}`);
    if (capitalLetters[i] === " ") {
      underscore.innerHTML = "&nbsp;&nbsp;";
    } else {
      underscore.textContent = "_";
    }
    capitalContainer.appendChild(underscore);
  }
}

// Get country & city name and turn them into each letter
function addApi(data) {
  const country = data.country;
  const capital = data.capital;
  countryLetters = country.toUpperCase().split("");
  capitalLetters = capital.toUpperCase().split("");
  displayCapital();
  displayCountry();
  console.log(country);
  console.log(capital);
  console.log(countryLetters);
  console.log(capitalLetters);
  return {
    country: country,
    capital: capital,
  };
}

// Checks letter clicked to see if it is correct or incorrect, changes color, checks for duplicates, calls Win or Lose functions
function checkLetter() {
  const clickedLetter = event.target;
  console.log(clickedLetter.textContent);
  if (!clickedLetters.includes(clickedLetter.textContent)) {
    for (let i = 0; i < countryLetters.length; i++) {
      if (countryLetters[i] === clickedLetter.textContent) {
        clickedLetter.style.color = "green";
        document.getElementById(i.toString()).textContent =
          clickedLetter.textContent;
        letterFound = true;
        clickedLetters.push(clickedLetter.textContent);
      }
    }

    for (let i = 0; i < capitalLetters.length; i++) {
      if (capitalLetters[i] === clickedLetter.textContent) {
        clickedLetter.style.color = "green";
        document.getElementById((i + 20).toString()).textContent =
          clickedLetter.textContent;
        letterFound = true;
        clickedLetters.push(clickedLetter.textContent);
      }
    }

    if (
      !countryLetters.includes(clickedLetter.textContent) &&
      !capitalLetters.includes(clickedLetter.textContent) &&
      !(clickedLetter.id === "letter-grid")
    ) {
      clickedLetter.style.color = "red";
      clickedLetter.style.textDecoration = "line-through";
      if (
        !(currentImg === "images/Hangman7.jpg") &&
        !wrongLetters.includes(clickedLetter.textContent)
      ) {
        currentImg = arrayImages[arrayImages.indexOf(currentImg) + 1];
      }
      wrongLetters.push(clickedLetter.textContent);
    }
    if (currentImg === "images/Hangman7.jpg") {
      setTimeout(lossAlert, 300);
    }
  }
  hangmanImage.src = currentImg;

  console.log(currentImg);
  console.log(clickedLetters);
  setTimeout(checkWin, 300);
}
// Displays alert when game is lost
function lossAlert() {
  const country = countryLetters.join("");
  const capital = capitalLetters.join("");
  alert(
    `You lost! \n \nThe Country was ${country} and the Capital was ${capital}`
  );
  openHangman();
}

// Displays alert when game is won
function checkWin() {
  if (countryLetters.length + capitalLetters.length === clickedLetters.length) {
    alert("You won!");
    openHangman();
  }
}
