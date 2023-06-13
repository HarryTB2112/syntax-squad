const games = document.querySelector("#games");
const hangman = document.querySelector("#hangman-game");
const letters = document.querySelector("#letter-grid");
const displayLetter = document.getElementById("display-letter");
let countryLetters = [];
let capitalLetters = [];
const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
const hangmanCard = document.querySelector("#rcorners1")
//const createForm = document.querySelector("#rcorners1");
const brain = document.querySelector("#brain")
const clickedLetters = []
const countryContainer = document.querySelector("#country-container")
const capitalContainer = document.querySelector("#capital-container")

//event listeners

// event listener for search bar needed

hangmanCard.addEventListener("click", openHangman);
brain.addEventListener("click", closeHangman)

// letters.forEach((letter) => letter.addEventListener("click", checkLetter));
letters.addEventListener("click", checkLetter);

//event listener for back-end and front-end
createForm.addEventListener("submit", createNewWord);
//POST req - connecting front-end and back-end 
async function createNewWord(e) {
    e.preventDefault();
    
    const data = { name: e.target.rcorners1.value };
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    const response = await fetch("http://localhost:3002/geography", options)
    
    let message = document.querySelector("#message");
    if (response.status === 201) {
        // Clear input
        e.target._.value = ""
        // Display a successful message to the user
        message.textContent = "."
        setTimeout(() => {
            message.textContent = ""
        }, 4000)
    } else {
        // Do sth else
        e.target.rcorners1.value = ""
        }
  }



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
  // addApi()

  fetchApiData();
}

//go back to main page
function closeHangman(){
  games.classList.remove("hidden") 
  hangman.classList.add("hidden");
}

function displayCountry(countryArr) {
  countryContainer.innerHTML = "";
  for (let i = 0; i < countryLetters.length; i++) {
    const underscore = document.createElement("p");
    underscore.textContent = "_";
    countryContainer.appendChild(underscore);
  }
}

function displayCapital(capitalArr) {
  capitalContainer.innerHTML = "";
  for (let i = 0; i < capitalLetters.length; i++) {
    const underscore = document.createElement("p");
    underscore.textContent = "_";
    capitalContainer.appendChild(underscore);
  }
}

// get country & city name and turn them into each letter
function addApi(data) {
  const country = data.country;
  const capital = data.capital;
  countryLetters = country.toUpperCase().split("");
  capitalLetters = capital.toUpperCase().split("");
  displayCapital(capitalLetters);
  displayCountry(countryLetters)
  console.log(country)
  console.log(capital)
}

function checkLetter(country, capital) {
  const clickedLetter = event.target
  

  let letterFound = false;
  for (let i = 0; i < countryLetters.length; i++) {
    if (countryLetters[i] === clickedLetter) {
      clickedLetter.style.color = "green"
      displayLetter.textContent += clickedLetter;
      letterFound = true;
      clickedLetters.push(clickedLetter)
    break;

    }
  }
  for (let i = 0; i < capitalLetters.length; i++) {
    if (capitalLetters[i] === clickedLetter) {
      displayLetter.textContent += capitalLetters[i];
     letterFound=true
     clickedLetters.push(clickedLetter)
    break;
    }
    
  }
  if (!countryLetters.includes(clickedLetter) && !capitalLetters.includes(clickedLetter)) {
    clickedLetter.style.color = "red"
    clickedLetter.style.textDecoration="line-through"
  }
  checkWin();
  if (!letterFound){
    checkLoss()
}
}



// function checkWin() {
//   if (countryLetters.length === clickedLetters.length && capitalLetters.length === clickedLetters.length) {
//     alert("You won!");
//   }
// }


/// this function needs to be fixed
// function checkLoss() {
//   //define bodyparts (they are urls)
//   //conditional statement when body parts are all gone, give an alert to try again
//   const img = "";
//   const arrayImages = [
//     "Hangman1.jpg",
//     "Hangman2.jpg",
//     "Hangman3.jpg",
//     "Hangman4.jpg",
//     "Hangman5.jpg",
//     "Hangman6.jpg",
//     "Hangman7.jpg",
//   ];

//   for (let j = 0; j < arrayImages.length; j++) {
//     if (img === arrayImages[6]) {
//       alert("Try Again!");
//     }
//   }
// }
