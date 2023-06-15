<!-- this is a draft -->
<!-- https://github.com/LaFosseAcademy/cohort_resources/blob/main/liskov/Writing_READMEs_101.md -->

<!-- All work must include a README with the following elements:

Must have:

Project title
Project description
Installation & usage
Technologies
Process
Licence

Should have:

Screenshots/Images
Wins & Challenges

Could have:

Badges
Contribution guide
Code snippets
Bugs
Future features -->

## Project Title: 

BrainVille

## Project Description:

A website with 4 games; "Hangman: Countries and Capitals", "Hangman: Italian nouns", "Guess who: English Kings" and "Translating race: Italian nouns". Currently, only "Hangman: Countries and Capitals" has been implemented. 
The game is hidden underneath the main page which can be entered by clicking the top left red squircle.


The point of these games is to increase interest in NON-STEM subjects in secondary schools. 
This project was requested by the management team of the Hive group of secondary schools. 

## INSTALLATION & USAGE:

GITHUB REPO: https://github.com/HarryTB2112/syntax-squad/

##### GITHUB INITIAL STEPS:

- Click on the github repo link above.
- Fork the repo (top right of the page)
- Go to your forked repo, it will now say ```<your-github-username>syntax-squad```
- Click the green "Code" button and copy the **SSH** option if you have already setup git in your terminal, or the **HTTPS** option if not.

IN TERMINAL: (GITBASH FOR WINDOW USERS OR TERMINAL FOR MAC USERS)

- Go to the directory you want to clone in
- Run ```git clone <SSH key or HTTPS key>``` 
- Then, ```cd syntax-squad```
- Check branch is main using ```git branch``` otherwise ```git checkout main```
- Run ```ls``` to check files & folders which should have a "server" folder, "client" folder and "README.md" file.
- To open vscode, ```code .```

HOW TO RUN BACKEND:

- cd into the cloned directory in your terminal
- Again, check branch is main using ```git branch``` otherwise ```git checkout main```
- Then, run ```cd server```
- Run ```npm install```
<!-- are these next 2 lines nececcesary or the line above unnecessary-->
- Run ``` npm install cors```
- Run ``` npm install express```
- Run ```npm install -D nodemon``` 
- Run ``` npm run dev```

**Make sure to leave the server running in the terminal for the next stages too.**

HOW TO OPEN THE BACKEND:

- Go to your chosen browser, enter the url : [API](http://localhost:3002)
- You can check the roots /geography and /geography/random as well as /italian and /italian/random.

HOW TO RUN FRONTEND:

- Open another terminal 
- cd into your directory that contains syntax-squad folder
- Run ```cd syntax squad```
<!-- - Run ```cd client``` -->
- Run ```code .``` to open it in VS code

HOW TO OPEN FRONTEND:

- Check the extension "Live Server" is installed on VS code otherwise install it.
- Open the explorer section in VS code, then open the "server" folder
- Right click "index.html" and click on "Open with Live Server". It will redirect you to your browser.

HOW TO USE THE WEBSITE:

<!-- insert screenshot of the main page -->



## TECHNOLOGIES:



## PROCESS:



## LICENSE:
