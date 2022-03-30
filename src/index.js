const player = require('./player');
const battleShipDisplay = require('./battleshipdisplay');

// setup

let winner = null;
const display = battleShipDisplay();
const player1 = player('Player 1');
const player2 = player('Computer');
let currentPlayer = player1;
let opponent = player2;
const board1 = document.getElementById('board1');
const board2 = document.getElementById('board2');
player1.board.placeShip(1, 1, 'north', 4);
player2.board.placeShip(1, 1, 'north', 4);
console.log('ships placed');
// each player places ships
// current player takes shot
currentPlayer.makeMove(opponent.board);
currentPlayer.makeMove(opponent.board);
currentPlayer.makeMove(opponent.board);
currentPlayer.makeMove(opponent.board);
currentPlayer.makeMove(opponent.board);
currentPlayer.makeMove(opponent.board);

opponent.makeMove(currentPlayer.board);
opponent.makeMove(currentPlayer.board);
opponent.makeMove(currentPlayer.board);
opponent.makeMove(currentPlayer.board);
opponent.makeMove(currentPlayer.board);
opponent.makeMove(currentPlayer.board);
opponent.makeMove(currentPlayer.board);
opponent.makeMove(currentPlayer.board);
opponent.makeMove(currentPlayer.board);
opponent.makeMove(currentPlayer.board);
opponent.makeMove(currentPlayer.board);
opponent.makeMove(currentPlayer.board);
opponent.makeMove(currentPlayer.board);
opponent.makeMove(currentPlayer.board);
opponent.makeMove(currentPlayer.board);
opponent.makeMove(currentPlayer.board);
opponent.makeMove(currentPlayer.board);
opponent.makeMove(currentPlayer.board);
// display update board
board1.appendChild(display.render(player1.board, 'friendly'));
board2.appendChild(display.render(player2.board, 'enemy'));
// check for winners
if (player1.board.allSunk === true) {
  winner = player2;
} else if (player2.board.allSunk === true) {
  winner = player1;
}

// switch players
if (winner === null) {
  if (currentPlayer === player1) {
    currentPlayer = player2;
    opponent = player1;
  } else if (currentPlayer === player2) {
    currentPlayer = player1;
    opponent = player2;
  }
}
console.log(`${currentPlayer} Wins!`);
