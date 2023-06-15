# BrainVille

## Project Description:

A website with 4 games; "Hangman Countries and Capitals", "Hangman Italian nouns", "Guess who English Kings and Queens" and "Translating race Italian nouns". Currently, only "Hangman Countries and Capitals" has been implemented.
The game is hidden underneath the main page which can be entered by clicking the top left red curved square.

The point of these games is to increase interest in NON-STEM subjects in secondary schools.
This project was requested by the management team of the Hive group of secondary schools.

## INSTALLATION & USAGE:

GITHUB REPO: https://github.com/HarryTB2112/syntax-squad/

##### GITHUB INITIAL STEPS:

- Click on the github repo link above.
- Fork the repo (top right of the page)
- Go to your forked repo, it will now say `<your-github-username>syntax-squad`
- Click the <span style="color: green;">"Code" button</span> and copy the **SSH** option if you have already setup git in your terminal, or the **HTTPS** option if not.

#### IN TERMINAL: (GITBASH FOR WINDOW USERS OR TERMINAL FOR MAC USERS)

- Go to the directory you want to clone in
- Run `git clone <SSH key or HTTPS key>`
- Then, `cd syntax-squad`
- Check branch is main using `git branch` otherwise `git checkout main`
- Run `ls` to check files & folders which should have a "server" folder, "client" folder and "README.md" file.
- To open VS code, `code .`

#### HOW TO RUN BACKEND:

- cd into the cloned directory in your terminal
- Again, check branch is main using `git branch` otherwise `git checkout main`
- Then, run `cd server`
- Run `npm install`
- Run `npm run dev`

**Make sure to leave the server running in the terminal for the next stages too.**

#### HOW TO OPEN THE BACKEND:

- Go to your chosen browser, enter the url : [API](http://localhost:3002)
- You can check the roots:
  - /geography
  - /geography/random
  - /italian
  - /italian/random

#### HOW TO RUN FRONTEND:

- Open another terminal
- cd into your directory that contains syntax-squad folder
- Run `cd syntax squad`
- Run `code .` to open it in VS code

#### HOW TO OPEN FRONTEND:

- Check the extension "Live Server" is installed on VS code otherwise install it.
- Open the explorer section in VS code, then open the "client" folder
- Right click "index.html" and click on "Open with Live Server". It will redirect you to your browser.

#### HOW TO USE THE WEBSITE:

###### SCREENSHOTS OF THE HOMEPAGE AND THE HANGMAN PAGE.

<img src='/client/images/Homepage.png' width='100'>
<img src='/client/images/Hangman-page.png' width='100'>

###### HOW TO ENTER THE GAME:

Click 
<br>
<img src='/client/images/game1.PNG' width='100'>
<br>
Then, you should see the hangman page.

###### HOW TO PLAY THE GAME:

**REALLY IMPORTANT: Have the server running in the background**

- You will be guessing the country and the capital at the same time.
- Once you make 6 wrong moves, you lose. An alert appears revealing the answer.
- When you win, an alert pops up saying "You won!".
- At the bottom left of the screen, there is a tally keeping track of your losses, wins and overall win percentage.
- A "Reset" button can be used to restart the game whilst you're still playing.
- The "Add More" button lets you add a country and capital that is not already part of the geography.JSON.
- You can go back to the homepage by either refreshing the page or clicking on the "BrainVille" logo.

#### IF YOU CREATE A CHANGE IN ANY OF THE FILES:

- Go to your terminal
- Run `git status` and check files are red
- Run `git add .` to add **all** files
  OR `git add <folder-name>` to add a specific folder
  OR `git add <folder-name/file-name>` to add a specific file
- Run `git status` again and check files are green
- Then, commit by `git commit -m "<message>"`.
- Finally, run `git push`
- Make a "Pull Request" to merge it to the original repository and request review.


## TECHNOLOGIES:

- HTML
- CSS
- Javascript
- API (.json files)
- Figma [Frameworks](https://www.figma.com/file/ZWZXKNWeLBZqYAEDCQDGbX/Hangman?type=design&node-id=0%3A1&t=KlhuUEeRTDZebxyR-1)
- Express.js

## PROCESS:

This is a POST req to add countries and capitals - connecting front-end and back-end.

```
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
}
```

## LICENSE:

ISC license

## WINS AND CHALLENGES:

Some functionality of the Hangman game was tricky to implement, such as not allowing letters to be clicked more than once. We got over these challenges by all coming up with different ideas to get around this.

At the start of the project, git usage was tricky as there were often merge conflicts. However, through time and practice these problems came up less and less.

Countries and Capitals with spaces in the name were a problem, as they would display the space as an underscore to be guessed. Additionally they would count towards the amount of letters you need to get correct to win. We got over the first problem by checking if an element in the array was a space `" "` and displaying a `"&nbsp;` in the html. The second problem we got over by filtering out the spaces from the arrays in the checkWin function.

## BUGS:

There are no known bugs. However, some of the elements have not yet been implemented e.g. User Page.

## FUTURE FEATURES:

We would implement the other 3 games we had concepted and come up with new ideas for games. We would create a leaderboard and scoring system for each games for classmates to compete.
