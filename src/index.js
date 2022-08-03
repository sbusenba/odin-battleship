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
const consoleDisplay = document.querySelector('.controls')
const coms = document.querySelector('.coms')
let dragAdjust =0;
let shipOrientation = 'north';
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
  if (winner==null){   if (queuedAttacks<currentPlayerShots){
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
      let toast = winner + " wins!"
      let toastp = document.createElement('p')
      toastp.style.color='black'
      toastp.textContent= toast;
      coms.appendChild(toastp)
    } else if (player2.board.allSunk() === true) {
      winner = player1.name;
      let toast = winner + " wins!"
      let toastp = document.createElement('p')
      toastp.style.color='black'
      toastp.textContent= toast;
      coms.appendChild(toastp)
    }
    }

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
    if (winner === null){
      if (player1.board.allSunk() === true) {
        winner = player2.name;
        let toast = winner + " wins!"
        let toastp = document.createElement('p')
        toastp.textContent= toast;
        document.querySelector('.coms').appendChild(toastp)
      } else if (player2.board.allSunk() === true) {
        winner = player1.name;
        let toast = winner + " wins!"
        let toastp = document.createElement('p')
        toastp.textContent= toast;
        document.querySelector('.coms').appendChild(toastp)
      }
      }
  }
}

function startDrag (e){

  console.log(e.target)
  dragAdjust = e.target.getAttribute('data-index')
  shipOrientation = (e.target.parentNode.style.flexDirection =='column')? 'north': 'west'
  console.log(dragAdjust, shipOrientation)
}

function acceptDrag (e){
  if (shipToPlace) {
    e.preventDefault()
    let tempX = parseInt(e.target.getAttribute('data-x'), 10) 
    let tempY = parseInt(e.target.getAttribute('data-y'), 10) 
    if (shipOrientation === "north"){
      tempX = tempX - dragAdjust
    } else {
      tempY = tempY- dragAdjust

    }
    console.log (tempX+" , "+tempY + " "+shipOrientation )



    if (player1.board.placeShip(tempX,tempY,shipOrientation,shipToPlace.length,shipToPlace.name) != 'fail'){
      while (board1.firstChild){
        board1.removeChild(board1.firstChild)
      }
      while (board2.firstChild){
        board2.removeChild(board2.firstChild)
      }
      while (consoleDisplay.firstChild){
        consoleDisplay.removeChild(consoleDisplay.firstChild)
      }
      
        if (player1.board.hasShipsToPlace()){
        shipToPlace = player1.board.nextShipToPlace();
        board2.appendChild(display.render(player1.board, 'friendly', acceptClick,acceptDrag));

        consoleDisplay.appendChild(shipDisplay(shipToPlace,startDrag))
        }else {
          board1.style.display = 'block';
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
  } else {
    console.log('ship place fail')
  }

}
}



//board1.style.display = 'none';
board2.appendChild(display.render(player1.board, 'friendly', acceptClick,acceptDrag));
consoleDisplay.appendChild(shipDisplay(shipToPlace,startDrag))

