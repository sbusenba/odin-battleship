const ship = require('./ship');

const gameboard = () => {
  const ships = [];
  const attacks = [];
  const board = [['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '']];
  const allSunk = () => {
    let allShipsSunk = true;
    ships.forEach((battleShip) => {
      if (!battleShip.isSunk()) {
        allShipsSunk = false;
      }
    });
    return allShipsSunk;
  };
  const onBoard = (battleShip) => {
    let onBoardFlag = true;
    battleShip.parts.forEach((part) => {
      if ((part.x < 0) || (part.y < 0) || (part.x >= 10) || (part.y >= 10)) {
        onBoardFlag = false;
      }
    });
    return onBoardFlag;
  };
  const unObstructed = (battleShip) => {
    let unObstructedFlag = true;
    battleShip.parts.forEach((part) => {
      if (board[part.x][part.y] !== '') {
        unObstructedFlag = false;
      }
    });
    return unObstructedFlag;
  };

  const placeShip = (x, y, facing, length) => {
    const battleShip = ship(x, y, facing, length);
    if (onBoard(battleShip) && unObstructed(battleShip)) {
      ships.push(battleShip);
      battleShip.parts.forEach((part) => {
        board[part.x][part.y] = 'occupied';
      });

      return battleShip;
    } if (!onBoard(battleShip)) {
      return 'off board';
    } if (!unObstructed(battleShip)) {
      return 'obstructed';
    }
    return 'fail';
  };

  const receiveAttack = (attackX, attackY) => {
    let result = 'miss';
    if (attacks.includes({ attackX, attackY })) {
      return 'Repeat Attack';
    }
    ships.forEach((attackedShip) => {
      if (attackedShip.hit(attackX, attackY)) {
        result = 'hit';
      }
    });

    return result;
  };
  return {
    ships, attacks, placeShip, receiveAttack, allSunk,
  };
};

module.exports = gameboard;
