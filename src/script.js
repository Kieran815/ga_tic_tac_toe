/*
User Stories:
- be shown a message after each turn for if I win, lose, tie or who"s turn it is next
*/


// ********** CREATE MAIN ELEMENTS **********
const pageBody = document.querySelector("body");
// create header
const createHeader = document.createElement("header");
pageBody.appendChild(createHeader);
// create game screen
const createScreen = document.createElement("main");
createScreen.setAttribute("id", "game_screen");
pageBody.appendChild(createScreen);
// create footer
const createFooter = document.createElement("footer");
pageBody.appendChild(createFooter);

// ***** retrieve main elements
const getHeader = document.querySelector("header");
const getScreen = document.querySelector("#game_screen");
const getFooter = document.querySelector("footer");

// ********** CREATE SECONDARY ELEMENTS **********
// create game status indicator
const createGameStatus = document.createElement("section");
const update = document.createElement("p");
update.setAttribute("id", "game-status");
update.innerText = `Player Move: `;
const updateSpan = document.createElement("span");
updateSpan.innerText = "Status";
createScreen.appendChild(createGameStatus);
createGameStatus.appendChild(update);
update.appendChild(updateSpan);

// create board on screen
const createBoard = document.createElement("section");
createBoard.classList.add("board");
getScreen.appendChild(createBoard);

// reset button
const createResetButton = document.createElement('button');
createResetButton.setAttribute('id', 'reset-btn');
createResetButton.innerText = "Reset Game";
createResetButton.style.visibility = "hidden";
getScreen.appendChild(createResetButton);

// ***** retrieve secondary elements
const board = document.querySelector(".board");
const gameStatus = document.querySelector("#game-status");
console.log(gameStatus);

// ***** GLOBAL VARIABLES *****
const winSets = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]]

const players = ["X", "O"];
// arrays to push clicked square ids to
let currentPlayer;
let playerArr;
const xArr = [];
const oArr = [];

// ***** EVENT HANDLERS *****
// Randomize starting player
currentPlayer = players[Math.floor(Math.random() * players.length)];

// change player
const togglePlayer = () => {
  currentPlayer === "X" ? currentPlayer = "O" : currentPlayer = "X";
}

// square click handler, passed to `makeSquare`;
const squareClick = (e) => {
  currentPlayer === "X" ? playerArr = xArr : playerArr = oArr;
  playerArr.push(parseInt(e.target.id));
  e.target.classList.add(`${currentPlayer}`);
  e.target.removeEventListener("click", squareClick);
  checkWin(playerArr, winSets);
  togglePlayer();
  updateStatus();
}

// make square and push to board
const makeSquare = (value) => {
  // create square div
  let square = document.createElement("div");
  square.classList.add("square");
  square.setAttribute("id", value);
  square.addEventListener("click", squareClick)
  // push square to board
  board.appendChild(square);
}

// create and add 9 squares to board
const fillBoard = () => {
  for(let i = 1; i <= 9; i++) {
    makeSquare(i);
  }
}

// update Game Status
const updateStatus = () => {
  const getStatusSpan = gameStatus.querySelector("span");
  getStatusSpan.innerText = `${currentPlayer}`;
}
updateStatus(); // invoke immediately for initial status check

const resetGame = () => {
  xArr.length = 0; // reset player selection arrays
  oArr.length = 0;
  board.innerText = ""; // wipe board
  document.querySelector("#reset-btn").style.visibility = "hidden";
  currentPlayer = players[Math.floor(Math.random() * players.length)]; // pick random player to start
  fillBoard(); // re-fill board
  updateStatus();

}
createResetButton.addEventListener('click', resetGame); // add reset function to button

// check player array against winning arrays
const checkWin = (curArr, wins) => {
  const getAllSquares = document.querySelectorAll(".square");
  if (xArr.concat(oArr).length === 9) { //check for draw
    currentPlayer = "Draw";
    getAllSquares.forEach(square => {
      square.removeEventListener("click", squareClick);
    });
    let result = confirm(`Draw... Play Again?`);
    if (result) {
      resetGame();
    } else {
      document.querySelector("#reset-btn").style.visibility = "visible";
      return;
    }
  }
  wins.forEach(win => { // for each winning array combination
    if (win.every(num => curArr.includes(num))) { // compare to current player's selection

    updateStatus();
      getAllSquares.forEach(square => {
        square.removeEventListener("click", squareClick);
      });
      let result = confirm(`${currentPlayer} Wins! Play Again?`);
      if (result) {
        resetGame();
      } else {

        document.querySelector("#reset-btn").style.visibility = "visible";
      }
    }
  })
}

pageBody.addEventListener("load", fillBoard())

// ******************
console.log(pageBody);