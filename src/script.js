console.log('Lined Up')

/*
Your Tic Tac Toe app must:

1) Render a game board in the browser
Switch turns between X and O (or whichever markers you select)
Visually display which side won if a player gets three in a row, or show a draw if neither player wins
Include separate HTML / CSS / JavaScript files
Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself) principles
Use JavaScript for DOM manipulation
Deploy your game online, where the rest of the world can access it
You can use GitHub Pages for deploying your project
Use semantic markup for HTML and CSS (adhere to best practices)
Have well-formatted, and well-commented code

User Stories:
be able to start a new tic tac toe game
be able to click on a square to add X first and then O, and so on
be shown a message after each turn for if I win, lose, tie or who's turn it is next
not be able to click the same square twice
be shown a message when I win, lose or tie
not be able to continue playing once I win, lose, or tie
be able to play the game again without refreshing the page
*/


// 1

// create main elements
const pageBody = document.querySelector('body');
// create header
const createHeader = document.createElement('header');
pageBody.appendChild(createHeader);
// create game screen
const createScreen = document.createElement('main');
createScreen.setAttribute('id', 'game_screen');
pageBody.appendChild(createScreen);
// create footer
const createFooter = document.createElement('footer');
pageBody.appendChild(createFooter);


// retrieve main elements
const getHeader = document.querySelector('header');
const getScreen = document.querySelector('#game_screen');
const getFooter = document.querySelector('footer');


// create board on screen
document.createElement('section');


// *** KEEP HERE TO LOG CURRENT PAGE NODES ***
console.log(pageBody);







// const fillBoard = () => {

//   // push 9 squares to the board
//   for(let i = 1; i <= 9; i++) {
//     // create square div
//     let square = document.createElement('div');
//     square.setAttribute('class', 'square');
//     square.setAttribute('id', i);
//     // push square to board
//     board.appendChild(square);
//   }
//   console.log(board);
// }

// fillBoard();