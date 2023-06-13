const games = document.querySelector("#games");
const hangman = document.querySelector("#hangman-game");
const letters = document.querySelector("#letter-grid");
let countryLetters = [];
let capitalLetters = [];
const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
const hangmanCard = document.querySelector("#rcorners1")
//const createForm = document.querySelector("#rcorners1");
const brain = document.querySelector("#brain")
const clickedLetters = []
const countryContainer = document.querySelector("#country-container")
const capitalContainer = document.querySelector("#capital-container")
let underscore;

//event listeners

// event listener for search bar needed

hangmanCard.addEventListener("click", openHangman);
brain.addEventListener("click", closeHangman)


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

  fetchApiData();
}

//go back to main page
function closeHangman(){
  games.classList.remove("hidden") 
  hangman.classList.add("hidden");
}

function displayCountry() {
  countryContainer.innerHTML = "<p>Country: </p>";
  
  for (let i = 0; i < countryLetters.length; i++) {
    underscore = document.createElement("p");
    underscore.setAttribute("id", `${i}`)
    if (countryLetters[i] === " ") {
      underscore.innerHTML = "&nbsp;&nbsp;"
    }else {
      underscore.textContent = "_";
    }
  
    
    countryContainer.appendChild(underscore);
  }
}

function displayCapital() {
  capitalContainer.innerHTML = "<p>Capital: <p>";
  for (let i = 0; i < capitalLetters.length; i++) {
    underscore = document.createElement("p");
    underscore.setAttribute("id", `${i + 20}`)
    if (capitalLetters[i] === " ") {
      underscore.innerHTML = "&nbsp;&nbsp;";
    } else {
      underscore.textContent = "_";
    }
    capitalContainer.appendChild(underscore);
  }
}


// get country & city name and turn them into each letter
function addApi(data) {
  const country = data.country;
  const capital = data.capital;
  countryLetters = country.toUpperCase().split("");
  capitalLetters = capital.toUpperCase().split("");
  displayCapital();
  displayCountry()
  console.log(country)
  console.log(capital)
  console.log(countryLetters)
  console.log(capitalLetters)
}

function checkLetter(country, capital) {
  const clickedLetter = event.target
  console.log(clickedLetter)
  
  

  let letterFound =false;
  for (let i = 0; i < countryLetters.length; i++) {
    if (clickedLetter.id === "letter-grid") {
      break
    }
    if (countryLetters[i] === clickedLetter.textContent) {
      clickedLetter.style.color = "green"
      // const underscore = document.createElement("p");
      // underscore.innerHTML += clickedLetter;
      document.getElementById(i.toString()).textContent = clickedLetter.textContent;
        letterFound = true;
        clickedLetters.push(clickedLetter.textContent)
      
    // break;

    }
  }
  for (let i = 0; i < capitalLetters.length; i++) {
    if (capitalLetters[i] === clickedLetter.textContent) {
      clickedLetter.style.color = "green"
      // const underscore = document.createElement("p");
      // underscore.innerHTML += clickedLetter;
      document.getElementById((i + 20).toString()).textContent = clickedLetter.textContent;
        letterFound = true;
        clickedLetters.push(clickedLetter.textContent)
    // break;
    }
    
  }
  if (!countryLetters.includes(clickedLetter.textContent) && !capitalLetters.includes(clickedLetter.textContent) && !(clickedLetter.id === "letter-grid")) {
    clickedLetter.style.color = "red"
    clickedLetter.style.textDecoration="line-through"
  }
  console.log(clickedLetters)
  setTimeout(checkWin, 500)
  if (checkWin === true){
    console.log(checkWin)
    openHangman()}
  // if (!letterFound){
  //   checkLoss()
}



function checkWin() {
  if ((countryLetters.length + capitalLetters.length) === clickedLetters.length) {
    alert("You won!");
    return true
  }
}
console.log(checkWin)
if (checkWin === true){
  openHangman()
}

/// this function needs to be fixed
// function checkLoss() {
//   //define bodyparts (they are urls)
//   //conditional statement when body parts are all gone, give an alert to try again
//   const img = "";
//   const arrayImages = [
//     "images/Hangman1.jpg",
//     "images/Hangman2.jpg",
//     "images/Hangman3.jpg",
//     "images/Hangman4.jpg",
//     "images/Hangman5.jpg",
//     "images/Hangman6.jpg",
//     "images/Hangman7.jpg",
//   ];

//   for (let j = 0; j < arrayImages.length; j++) {
//     if (img === arrayImages[6]) {
//       alert("Try Again!");
//     }
//   }
// 
