const player = require('./player');
const battleShipDisplay = require('./battleshipdisplay');
const shipPicker =require ('./shippicker')
// setup

let winner = null;
const display = battleShipDisplay();
const shipDisplay = shipPicker();
const player1 = player('Player 1');
const player2 = player('Computer');
const currentPlayer = player1;
const opponent = player2;
const board1 = document.getElementById('board1');
const board2 = document.getElementById('board2');
const consoleDisplay = document.querySelector('.console')
let queuedAttacks = 0;
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


let shipToPlace = player1.board.nextShipToPlace();
player2.board.placeAllShips();

function acceptClick() {
  if (queuedAttacks<currentPlayerShots){
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

  board2.appendChild(display.render(player1.board, 'friendly', acceptClick,acceptDrag));
  board1.appendChild(display.render(player2.board, 'enemy', acceptClick,acceptDrag));

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

  if (player1.board.allSunk() === true) {
    winner = player2.name;
  } else if (player2.board.allSunk() === true) {
    winner = player1.name;
  }
  }
}
function acceptDrag (e){
  if (shipToPlace) {
    e.preventDefault()
    console.log(e)
    console.log(parseInt(e.target.getAttribute('data-x'), 10), parseInt(e.target.getAttribute('data-y'), 10))
    if (player1.board.placeShip(parseInt(e.target.getAttribute('data-x'), 10),parseInt(e.target.getAttribute('data-y'), 10),'north',shipToPlace.length) != 'fail'){
      while (board1.firstChild){
        board1.removeChild(board1.firstChild)
      }
      while (board2.firstChild){
        board2.removeChild(board2.firstChild)
      }
      while (consoleDisplay.firstChild){
        consoleDisplay.removeChild(consoleDisplay.firstChild)
      }
      
        console.log('ships to place!')
        if (player1.board.hasShipsToPlace()){
        shipToPlace = player1.board.nextShipToPlace();
        console.table(shipToPlace)
        board2.appendChild(display.render(player1.board, 'friendly', acceptClick,acceptDrag));

        consoleDisplay.appendChild(shipDisplay(shipToPlace))
        }else {
          board2.appendChild(display.render(player1.board, 'friendly', acceptClick,acceptDrag));
          board1.appendChild(display.render(player2.board, 'enemy', acceptClick,acceptDrag));
          shipToPlace = null;
        
        }
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
  }

}
}


// each player places ships
// current player takes shot
if (player1.board.hasShipsToPlace) {
board2.appendChild(display.render(player1.board, 'friendly', acceptClick,acceptDrag));
consoleDisplay.appendChild(shipDisplay(shipToPlace))
} else {
  board2.appendChild(display.render(player1.board, 'friendly', acceptClick,acceptDrag));
  board1.appendChild(display.render(player2.board, 'enemy', acceptClick,acceptDrag));

}

