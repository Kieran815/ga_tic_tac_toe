// ********** CREATE MAIN ELEMENTS **********
const pageBody = document.querySelector("body");
const createHeader = document.createElement("header"); 
// create header
pageBody.appendChild(createHeader); 
// create game screen
const createScreen = document.createElement("main");
createScreen.setAttribute("id", "game_screen");
pageBody.appendChild(createScreen);
const createFooter = document.createElement("footer");
pageBody.appendChild(createFooter);

// ***** retrieve main elements
const getHeader = document.querySelector("header");
const getScreen = document.querySelector("#game_screen");
const getFooter = document.querySelector("footer");

// ********** CREATE SECONDARY ELEMENTS **********
getHeader.innerText = `Tic-Tac-Toe`;

// create game status indicator
const createGameStatus = document.createElement("section");
createGameStatus.setAttribute("id", "game-status");
const update = document.createElement("p");
update.setAttribute("id", "player-turn");
update.innerText = `Player Move: `;
const updateSpan = document.createElement("span");
updateSpan.innerText = "Status";
const createGameCounter = document.createElement('p');
createGameCounter.setAttribute("id", "game-counter");
createScreen.appendChild(createGameStatus);
createGameStatus.appendChild(update);
createGameStatus.appendChild(createGameCounter);
update.appendChild(updateSpan);

// create board on screen
const createBoard = document.createElement("section");
createBoard.classList.add("board");
getScreen.appendChild(createBoard);

// reset button
const createResetButton = document.createElement('button');
createResetButton.setAttribute('id', 'reset-btn');
createResetButton.innerText = "Reset";
createResetButton.style.visibility = "hidden";
getScreen.appendChild(createResetButton);

// ***** retrieve secondary elements
const board = document.querySelector(".board");
const gameStatus = document.querySelector("#game-status");
const gameCounter = document.querySelector("#game-counter");
// ***** GLOBAL VARIABLES *****

const games = {
  total: 0,
  draws: 0,
  xWins: 0,
  xArr: [],
  oWins: 0,
  oArr: [],
  winSets: [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]],
  computer: false
}

gameCounter.innerText = `Games Played: ${games.total} X: ${games.xWins} O: ${games.oWins} Draws: ${games.draws}`; // add text to `#game-counter`;

const players = ["X", "O"];
let currentPlayer;
let playerArr; 

// ***** EVENT HANDLERS *****

const playComp = prompt(`How Many Players? Enter 1 or 2:`);
if (parseInt(playComp) === 1) {
  alert("Playing Computer. Good Luck!")
  games.computer = true;
} else if (parseInt(playComp) === 2) {
  alert("Play Nice, Kids...")
}

if (games.computer === true) {
  currentPlayer = "X";
} else {
  currentPlayer = players[Math.floor(Math.random() * players.length)]; // Randomize starting player
}

// change player
const togglePlayer = () => {
  currentPlayer === "X" ? currentPlayer = "O" : currentPlayer = "X";
  if (games.computer === true && currentPlayer === "O") {
    compTurn();
    togglePlayer();
  }
}

// square click handler, passed to `makeSquare`;
const squareClick = (e) => {
  currentPlayer === "X" ? playerArr = games.xArr : playerArr = games.oArr; // select correct array
  playerArr.push(parseInt(e.target.getAttribute('id'))); // push integer of target id
  e.target.classList.add(`${currentPlayer}`); // add X or O
  e.target.removeEventListener("click", squareClick); // remove click function
  checkWin(playerArr, games.winSets); // see if selection wins game
  togglePlayer(); // if no win
  updateStatus();
}

// make square and push to board
const makeSquare = (value) => {
  let square = document.createElement("div"); // create square div
  square.classList.add("square"); // add class
  square.setAttribute("id", value); // set id
  square.addEventListener("click", squareClick); // add click function
  board.appendChild(square); // push square to board
}

// create and add 9 squares to board
const fillBoard = () => {
  for(let i = 1; i <= 9; i++) {
    makeSquare(i);
  }
}

// computer choice
const compTurn = () => {
  let compChoices = []; // empty array for current possible choices
  const getAllSquares = document.querySelectorAll('.square');
  if (currentPlayer === "O") { // computer is player "O"
    getAllSquares.forEach(square => {
    if (!square.classList.contains("X") && !square.classList.contains("O")) compChoices.push(square) // push unclaimed squares to array
  })
  let compMove = compChoices[Math.floor(Math.random() * compChoices.length)]; // select random choice
  compMove.classList.add('O'); // add selection class
  games.oArr.push(parseInt(compMove.getAttribute('id'))); // push square id value to oArr
  compMove.removeEventListener("click", squareClick); // remove click function
  checkWin(games.oArr, games.winSets); // check computer array against winning arrays
  updateStatus();
  }
}

// update Game Status
const updateStatus = () => {
  const getStatusSpan = gameStatus.querySelector("span");
  getStatusSpan.innerText = `${currentPlayer}`;
  gameCounter.innerText = `Games Played: ${games.total} Draws: ${games.draws} X: ${games.xWins} O: ${games.oWins}`; // add text to `#game-counter`
}
updateStatus(); // invoke immediately for initial status check

const resetGame = () => {
  games.xArr.length = 0; // reset player selection arrays
  games.oArr.length = 0;
  board.innerText = ""; // wipe board
  document.querySelector("#reset-btn").style.visibility = "hidden"; // hide reset button
  currentPlayer = players[Math.floor(Math.random() * players.length)]; // pick random player to start
  fillBoard(); // re-fill board
  updateStatus(); // update current player
}
createResetButton.addEventListener('click', resetGame); // add reset function to button

// check player array against winning arrays
const checkWin = (curArr, wins) => {
  const getAllSquares = document.querySelectorAll(".square"); // get array of all squares
  let gameOver = false;
  wins.forEach(win => { // for each winning array combination
    if (win.every(num => curArr.includes(num))) { // if match with current player's selections
      games.total += 1; // add 1 to total counter
      currentPlayer === "X" ? games.xWins += 1 : games.oWins += 1; // add 1 to winner counter
      getAllSquares.forEach(square => square.removeEventListener("click", squareClick)); // remove click function
      gameOver = true;
      updateStatus(); // update game status
      let result = confirm(`${currentPlayer} Wins! Play Again?`); // announce winner
      if (result) {
        resetGame(); // auto reset
      } else { 
        document.querySelector("#reset-btn").style.visibility = "visible"; // reveal reset button
      }
    }
  })
  if (games.xArr.concat(games.oArr).length === 9 && gameOver === false) { //check for draw
    games.total += 1; // add 1 to total counter
    games.draws += 1; // add 1 to draw counter
    getAllSquares.forEach(square => square.removeEventListener("click", squareClick)); // remove click function
    let result = confirm(`Draw... Play Again?`); // announce draw
    if (result) {
      resetGame();
    } else {
      document.querySelector("#reset-btn").style.visibility = "visible";
      return;
    }
  }
}

pageBody.addEventListener("load", fillBoard());

// ******************
console.log(pageBody);