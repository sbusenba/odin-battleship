const player = require('./player');
const battleShipDisplay = require('./battleshipdisplay');

// setup

let winner = null;
const display = battleShipDisplay();
const player1 = player('Player 1');
const player2 = player('Computer');
const currentPlayer = player1;
const opponent = player2;
const board1 = document.getElementById('board1');
const board2 = document.getElementById('board2');
player1.board.placeAllShips();
player2.board.placeAllShips();
console.log('ships placed');
// each player places ships
// current player takes shot
while (winner === null) {
  let currentPlayerShots = 0;
  let opponentShots = 0;
  currentPlayer.board.ships.forEach((ship) => {
    if (!ship.isSunk()) {
      currentPlayerShots += 1;
    }
  });
  opponent.board.ships.forEach((ship) => {
    if (!ship.isSunk()) {
      opponentShots += 1;
    }
  });
  for (let i = 0; i < currentPlayerShots; i += 1) {
    currentPlayer.makeMove(opponent.board);
  }
  for (let i = 0; i < opponentShots; i += 1) {
    opponent.makeMove(currentPlayer.board);
  }

  while (board1.firstElementChild) {
    board1.removeChild(board1.firstChild);
  }
  while (board2.firstElementChild) {
    board2.removeChild(board2.firstChild);
  }
  board2.appendChild(display.render(player1.board, 'friendly'));
  board1.appendChild(display.render(player2.board, 'enemy'));
  alert('pause');
  if (player1.board.allSunk() === true) {
    winner = player2;
  } else if (player2.board.allSunk() === true) {
    winner = player1;
  }
}

console.log(`${winner.name} Wins!`);
