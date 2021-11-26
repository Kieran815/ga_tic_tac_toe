# Tic-Tac-Toe Pseudocode

### Your Tic Tac Toe app must:

- **Use JavaScript for DOM manipulation**

  Lets try to leave the html entirely alone and do all this with `JS`.
  Also, be a boss and use ternary instead of if/else
<br/><br/>

- Render a game board in the browser

  create board element
  attach to body
  repeat * 9
    create square for board
    add class to square
    add id to square (index for win conditions)
    attach to board
    (check square position, use `display: grid` in css)

<br/><br/>

- Switch turns between X and O (or whichever markers you select)
  
  create variables for player arrays
  create current player variable in js
    added random selection for starting player
  method
    toggle player on current player piece
    ternary statement to switch x & o

<br/><br/>

- Visually display which side won if a player gets three in a row, or show a draw if neither player wins

  create win conditions via arrays
    match winning arrays to current player arrays
      `.includes`

  push Win message to header via `innerText`
<br/><br/>