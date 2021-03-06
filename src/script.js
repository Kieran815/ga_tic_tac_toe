// ********** CREATE MAIN ELEMENTS **********
const pageBody = document.querySelector("body");
// game start audio
const createStartSound = document.createElement('audio');
createStartSound.setAttribute('id', 'takeoff');
createStartSound.setAttribute('src', 'takeoff.mp3');
pageBody.appendChild(createStartSound);
// selection audio
const createSelSound = document.createElement('audio');
createSelSound.setAttribute('id', 'selSquare');
createSelSound.setAttribute('src', 'selectSquare.mp3');
pageBody.appendChild(createSelSound);
// create header
const createHeader = document.createElement("header"); 
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
// header title
const createTitle = document.createElement("span");
createTitle.setAttribute("id", "game-title");
createTitle.innerText = `Conquest`;
getHeader.appendChild(createTitle);
// footer
const footerMessage = document.createElement("span");
footerMessage.setAttribute("id", "game-footer");
footerMessage.innerText = `A Game of Strategy`;
getFooter.appendChild(footerMessage);
// create game status indicator
const createGameStatus = document.createElement("section");
createGameStatus.setAttribute("id", "game-status");
const update = document.createElement("p");
update.setAttribute("id", "player-turn");
update.innerText = `Player Move: `;
const updateSpan = document.createElement("span");
updateSpan.innerText = "Status";
const createGameCounter = document.createElement("p");
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
const createResetButton = document.createElement("button");
createResetButton.setAttribute("id", "reset-btn");
createResetButton.innerText = "Reset";
createResetButton.style.visibility = "hidden";
getScreen.appendChild(createResetButton);

// ***** retrieve secondary elements
const getTitle = document.querySelector("#game-title");
const board = document.querySelector(".board");
const gameStatus = document.querySelector("#game-status");
const gameCounter = document.querySelector("#game-counter");

// ***** GLOBAL VARIABLES *****
let games = {
  total: 0,
  draws: 0,
  xWins: 0,
  xArr: [],
  oWins: 0,
  oArr: [],
  computer: false,
  gameOver: false
}

let winSets = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

localStorage.getItem("gameSave") ? games = JSON.parse(localStorage.getItem("gameSave")) : ""; // search for existing saveGame data in localStorage

gameCounter.innerText = `Games: ${games.total} | Draws: ${games.draws} | X: ${games.xWins} | O: ${games.oWins}`; // add text to `#game-counter`;

const players = ["X", "O"];
let currentPlayer;
let playerArr; 

// ***** EVENT HANDLERS *****
const playerNum = () => {
  const playComp = prompt(`How Many Players? Enter 1 or 2:`);
  if (parseInt(playComp) === 1) {
    alert("Playing Computer. Good Luck!")
    games.computer = true;
  } else if (parseInt(playComp) === 2) {
    alert("Play Nice, Kids...");
  } else {
    alert('Please Select 1 or 2 Players');
    playerNum()
  };
}
playerNum();

games.computer === true ? currentPlayer = "X" : currentPlayer = players[Math.floor(Math.random() * players.length)]; // Randomize starting player, unless playing computer

const togglePlayer = () => { // change player & run comp player
  currentPlayer === "X" ? currentPlayer = "O" : currentPlayer = "X";
  if (games.computer === true && currentPlayer === "O") {
    compTurn();
    togglePlayer();
  }
};

const squareClick = (e) => { // square click handler, passed to `makeSquare`;
  document.querySelector('#selSquare').play();
  currentPlayer === "X" ? playerArr = games.xArr : playerArr = games.oArr; // select correct array
  playerArr.push(parseInt(e.target.getAttribute("id"))); // push integer of target id
  e.target.classList.add(`${currentPlayer}`); // add X or O
  e.target.classList.add("selected");
  e.target.removeEventListener("click", squareClick); // remove click function
  checkWin(playerArr, winSets); // see if selection wins game
  togglePlayer(); // if no win
  updateStatus();
};

const makeSquare = (value) => { // make square and push to board
  let square = document.createElement("div"); // create square div
  square.classList.add("square"); // add class
  square.setAttribute("id", value); // set id
  square.addEventListener("click", squareClick); // add click function
  board.appendChild(square); // push square to board
};

const fillBoard = () => { // create and add 9 squares to board
  for(let i = 1; i <= 9; i++) {
    makeSquare(i);
  }
};

const compTurn = () => { // computer choice
  let compChoices = []; // empty array for current possible choices
  const getAllSquares = document.querySelectorAll(".square");
  if (currentPlayer === "O") { // computer is player "O"
    getAllSquares.forEach(square => {
      if (!square.classList.contains("X") && !square.classList.contains("O")) compChoices.push(square); // push unclaimed squares to array
    })
    if (compChoices.length > 0 && games.gameOver === false) {
      let compMove = compChoices[Math.floor(Math.random() * compChoices.length)]; // select random choice
      compMove.classList.add("O"); // add classes to random choices
      compMove.classList.add("selected"); // prevent post-click cursor events
      games.oArr.push(parseInt(compMove.getAttribute("id"))); // push square id value to oArr
      compMove.removeEventListener("click", squareClick); // remove click function
      checkWin(games.oArr, winSets); // check computer array against winning arrays
    }
  }
  updateStatus();
}

const updateStatus = () => { // update Game Status
  const getStatusSpan = gameStatus.querySelector("span");
  getStatusSpan.innerText = `${currentPlayer}`;
  gameCounter.innerText = `Games: ${games.total} | Draws: ${games.draws} | X: ${games.xWins} | O: ${games.oWins}`; // add text to `#game-counter`
}
updateStatus(); // invoke immediately for initial status check

const resetGame = () => {
  while (games.xArr.length > 0) games.xArr.pop() // reset player selection arrays
  while (games.oArr.length > 0) games.oArr.pop()
  games.gameOver = false;
  currentPlayer = players[Math.floor(Math.random() * players.length)]; // pick random player to start
  let gameSave = JSON.stringify(games); // switch games object to string
  localStorage.setItem("gameSave", gameSave); // save game string to local storage
  board.innerText = ""; // wipe board
  document.querySelector("#reset-btn").style.visibility = "hidden"; // hide reset button
  fillBoard(); // re-fill board
  updateStatus(); // update current player
}
createResetButton.addEventListener("click", resetGame); // add reset function to button

const checkWin = (curArr, wins) => { // check player array against winning arrays
  const getAllSquares = document.querySelectorAll(".square"); // get array of all squares
  wins.forEach(win => { // for each winning array combination
    if (win.every(num => curArr.includes(num)) && games.gameOver === false) { // if match with current player"s selections
      getAllSquares.forEach(square => square.removeEventListener("click", squareClick)); // remove click function
      games.gameOver = true;
      updateStatus(); // update game status
      games.total += 1; // add 1 to total counter
      currentPlayer === "X" ? games.xWins += 1 : games.oWins += 1; // add 1 to winner counter
      document.querySelector('#takeoff').play()
      let result = confirm(`${currentPlayer} Wins! Play Again?`); // announce winner
      result ? resetGame() : document.querySelector("#reset-btn").style.visibility = "visible"; // reset game or reveal reset button
    }
  });
  if (games.xArr.concat(games.oArr).length === 9 && games.gameOver === false) { //check for draw
    games.gameOver = true;
    games.total += 1; // add 1 to total counter
    games.draws += 1; // add 1 to draw counter
    getAllSquares.forEach(square => square.removeEventListener("click", squareClick)); // remove click function
    document.querySelector('#takeoff').play()
    let result = confirm(`Draw... Play Again?`); // announce draw
    result ? resetGame() : document.querySelector("#reset-btn").style.visibility = "visible";
  }
}

pageBody.addEventListener("load", fillBoard());