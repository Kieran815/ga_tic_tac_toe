# Tic-Tac-Toe Pseudocode

### Your Tic Tac Toe app must:

- **Use JavaScript for DOM manipulation**

  Lets try to leave the html entirely alone and do all this with JS.
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
  
  create player variable * 2
  create current player variable in js
  method
    toggle player on current player piece

<br/><br/>

- Visually display which side won if a player gets three in a row, or show a draw if neither player wins

  create win conditions via arrays
    match arrays to current

<br/><br/>