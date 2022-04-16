const player = require('./player');
const battleShipDisplay = require('./battleshipdisplay');

// setup

let winner = null;
const gameStates = ['placement',
  'targeting',
  'victory'];
let gameStateIndicator = 0;

const display = battleShipDisplay();
const player1 = player('Player 1');
const player2 = player('Computer');
const currentPlayer = player1;
const opponent = player2;
const board1 = document.getElementById('board1');
const board2 = document.getElementById('board2');
let queuedAttacks = 0;
let currentPlayerShots = 0;
let opponentShots = 0;
player1.board.placeAllShips();
player2.board.placeAllShips();
gameStateIndicator = 1;
function acceptClick() {
  switch (gameStateIndicator) {
    case 1:
      opponent.board.queueAttack(parseInt(this.getAttribute('data-x'), 10), parseInt(this.getAttribute('data-y'), 10));
      queuedAttacks += 1;

      while (board1.firstElementChild) {
        board1.removeChild(board1.firstChild);
      }
      while (board2.firstElementChild) {
        board2.removeChild(board2.firstChild);
      }
      if (queuedAttacks === currentPlayerShots) {
        opponent.board.applyQueuedAttacks();
        opponent.volley(currentPlayer.board, opponentShots);
        queuedAttacks = 0;
      }

      board2.appendChild(display.render(player1.board, 'friendly', acceptClick));
      board1.appendChild(display.render(player2.board, 'enemy', acceptClick));

      currentPlayerShots = 0;
      opponentShots = 0;

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
      break;
    default:
  }
  if (player1.board.allSunk() === true) {
    winner = player2;
    gameStateIndicator = 2;
  } else if (player2.board.allSunk() === true) {
    winner = player1;
    gameStateIndicator = 2;
  }
}

// each player places ships
// current player takes shot
board2.appendChild(display.render(player1.board, 'friendly', acceptClick));
board1.appendChild(display.render(player2.board, 'enemy', acceptClick));
