/*
Your Tic Tac Toe app must:

1) Render a game board in the browser
Switch turns between X and O (or whichever markers you select)
Visually display which side won if a player gets three in a row, or show a draw if neither player wins
Deploy your game online, where the rest of the world can access it via GitHub Pages
Use semantic markup for HTML and CSS (adhere to best practices)

User Stories:
- be able to start a new tic tac toe game
- be able to click on a square to add X first and then O, and so on
- be shown a message after each turn for if I win, lose, tie or who's turn it is next
- - not be able to click the same square twice
be shown a message when I win, lose or tie
- not be able to continue playing once I win, lose, or tie
- be able to play the game again without refreshing the page
*/


// ********** CREATE MAIN ELEMENTS **********
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
const createBoard = document.createElement('section');
createBoard.classList.add('board');
getScreen.appendChild(createBoard);
const board = document.querySelector('.board');

// ***** GLOBAL VARIABLES *****

const winSets = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]]

const players = ["X", "O"];
// arrays to push clicked square ids to
const xArr = [];
const oArr = [];
let playerArr;
// ***** EVENT HANDLERS *****

// Randomize starting player
let currentPlayer = players[Math.floor(Math.random() * players.length)];

// change player
const togglePlayer = () => {
  currentPlayer === "X" ? currentPlayer = "O" : currentPlayer = "X";
  
}
// check player array against winning arrays
const checkWin = (curArr, wins) => {
  wins.forEach(win => {
    win.every(num => curArr.includes(num)) ? console.log('Winner') : console.log('Not Yet');
  })
  
  
}

// square click handler, passed to `makeSquare`;
const squareClick = (e) => {
  currentPlayer === "X" ? playerArr = xArr : playerArr = oArr;
  playerArr.push(parseInt(e.target.id));
  console.log(playerArr);
  e.target.classList.add(`${currentPlayer}`);
  e.target.removeEventListener('click', squareClick);
  checkWin(playerArr, winSets);
  togglePlayer();
}

// make square and push to board
const makeSquare = (value) => {
  // create square div
  let square = document.createElement('div');
  square.classList.add('square');
  square.setAttribute('id', value);
  square.addEventListener('click', squareClick)
  // push square to board
  board.appendChild(square);
}

// create and add 9 squares to board
const fillBoard = () => {
  for(let i = 1; i <= 9; i++) {
    makeSquare(i);
  }
  console.log(currentPlayer);
}





pageBody.addEventListener('load', fillBoard())



// *** KEEP HERE TO LOG CURRENT PAGE NODES ***
console.log(pageBody);