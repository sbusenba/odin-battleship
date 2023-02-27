//imports
const player = require('./player');
const battleShipDisplay = require('./battleshipdisplay');
const shipPicker =require ('./shippicker')
const fireButton = require('./firebutton')


// global variables
let gameState = 'new'
const board1 = document.getElementById('board1');
const board1b = document.getElementById('board1-b');
const board2 = document.getElementById('board2');
const board2b = document.getElementById('board2-b');
let winner = null;
const display = battleShipDisplay();
const shipDisplay = shipPicker();
const fire = fireButton()
const player1 = player('Player 1');
const player2 = player('Computer');
const currentPlayer = player1;
const opponent = player2;
let dragAdjust =0;
let shipOrientation = 'north';
let queuedAttacks = 0;
let currentPlayerShots = 0;
let opponentShots = 0;

function countShotsRemaining(){
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

function swapTop() {
    document.querySelector('.top-display-cube').classList.toggle('rotated')
console.log('swapping top')
}
function swapBottom() {
    document.querySelector('.bottom-display-cube').classList.toggle('rotated')
    console.log('swapping bottom')
}
document.querySelector('#top-button').addEventListener('click',swapTop)
document.querySelector('#bottom-button').addEventListener('click',swapBottom)

function clearBoard(boardToClear){
    while(boardToClear.firstElementChild){
        boardToClear.removeChild(boardToClear.firstChild)
    }
}
function startDrag (e){

    console.log(e.target)
    dragAdjust = e.target.getAttribute('data-index')
    shipOrientation = (e.target.parentNode.style.flexDirection =='column')? 'north': 'west'
    console.log(dragAdjust, shipOrientation)
}
function acceptClick() {
    countShotsRemaining()

    if (winner==null){   
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
            console.log('ship placed')
          if (player1.board.hasShipsToPlace()){
            console.log('placing additional ships')
            gameState = 'placing ships'
          }else {
            console.log('all ships placed')
            gameState= 'ships placed'
          
          }
          updateBoard()
    } else {
      console.log('ship place fail')
    }
    
  }

}

function fireFn(){
    console.log('firing...')
}

//start game
    // create player obj
    // create boards
        // display ship placer
        // display player1 board
        // place computer ships
    // take shots
    // activate fire button
    // apply shots to computer board
    // queue shots for human board
    // apply shots to human board
    // check for victory condition
    // reset

function updateBoard(){
    switch (gameState) {
        case 'new':
            //display ship placer and p1 board
            clearBoard(board1)
            clearBoard(board2)
            board1.appendChild(display.render(player1.board, 'friendly', acceptClick,acceptDrag))
            shipToPlace = player1.board.nextShipToPlace();
            board2.appendChild(shipDisplay(shipToPlace,startDrag))
            console.log('initialized, place ships')
            break;
        case 'placing ships':
            console.log('placing next ship')
            clearBoard(board1)
            clearBoard(board2)
            board1.appendChild(display.render(player1.board, 'friendly', acceptClick,acceptDrag))
            shipToPlace = player1.board.nextShipToPlace();
            board2.appendChild(shipDisplay(shipToPlace,startDrag))
        break;    
        case 'ships placed':
            //accept shots
            console.log('ships placed')
            console.log(player1.board)
            clearBoard(board1)
            board1.appendChild(display.render(player1.board, 'friendly', acceptClick,acceptDrag));
            board1b.appendChild(display.render(player1.board, 'enemy', acceptClick,acceptDrag));
            board2b.appendChild(fire.render('armed',fireFn))
            swapTop()
            swapBottom()
            break;
        case 'accepting shots':
            
            break;
        case 'ready to fire':
            //show fire button


            break;
        case 'applying shots':

            break;
        case 'player1 win':
            break;
        case 'player2 win':
            break;


        default:
            break;
    }
 }
 updateBoard();