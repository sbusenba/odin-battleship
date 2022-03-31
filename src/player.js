const gameboard = require('./gameboard');

const player = (playerName) => {
  const board = gameboard();
  const name = playerName;
  const guesses = [];
  let result;
  const makeMove = (opponentBoard) => {
    let attackX; let attackY;

    if (guesses.length === 0) {
      attackX = Math.floor(Math.random() * 10);
      attackY = Math.floor(Math.random() * 10);
      result = opponentBoard.receiveAttack(attackX, attackY);
    } else if (guesses.length > 0) {
      const guess = guesses.pop();
      attackX = guess.attackX;
      attackY = guess.attackY;
      result = opponentBoard.receiveAttack(attackX, attackY);
    }
    console.log(`${name} attacks ${attackX}, ${attackY}`);
    if (result === ('hit')) {
      if (attackX > 0) {
        guesses.push({ attackX: attackX - 1, attackY });
      }
      if (attackY > 0) {
        guesses.push({ attackX, attackY: attackY - 1 });
      }
      if (attackX < 9) {
        guesses.push({ attackX: attackX + 1, attackY });
      }
      if (attackY < 9) {
        guesses.push({ attackX, attackY: attackY + 1 });
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
