const gameboard = require('./gameboard');

const player = (playerName) => {
  const board = gameboard();
  const name = playerName;
  let guesses = [];
  let result;
  const makeMove = (opponentBoard) => {
    let attackX; let attackY;

    if (guesses === 'null') {
      attackX = Math.floor(Math.random() * 10);
      attackY = Math.floor(Math.random() * 10);
      result = opponentBoard.makeMove(attackX, attackY);
    } else if (guesses[0] === true) {
      const guess = guesses.pop();
      attackX = guess.attackX;
      attackY = guess.attackY;
      result = opponentBoard.makeMove(attackX, attackY);
    }
    if (result === ('hit')) {
      guesses = [];
      if (attackX > 0) {
        guesses.push(attackX - 1, attackY);
      }
      if (attackY > 0) {
        guesses.push(attackX, attackY - 1);
      }
      if (attackX < 9) {
        guesses.push(attackX + 1, attackY);
      }
      if (attackY < 9) {
        guesses.push(attackX, attackY + 1);
      }
    }
  };
  const placeShips = () => {

  };
  return {
    name, board, makeMove, placeShips,
  };
};

module.exports = player;
