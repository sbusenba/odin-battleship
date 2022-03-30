const ship = require('./ship');

const gameboard = () => {
  const shipsToPlace = [
    { name: 'carrier', lenght: 5, quantity: 1 },
    { name: 'battleship', lenght: 4, quantity: 2 },
    { name: 'destroyer', lenght: 3, quantity: 3 },
    { name: 'submarine', lenght: 3, quantity: 4 },
    { name: 'patrol boat', lenght: 2, quantity: 5 },
  ];
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
    attacks.forEach((attack) => {
      console.log(`${attack.attackX} & ${attackX}, ${attack.attackY} & ${attackY}`);
      if ((attack.attackX === attackX) && (attack.attackY === attackY)) {
        result = 'duplicate';
        console.log('*Duplicate*');
      }
      console.log(attack);
      return result;
    });

    if (result !== 'duplicate') {
      ships.forEach((attackedShip) => {
        if (attackedShip.hit(attackX, attackY)) {
          result = 'hit';
        }
      });
      board[attackX][attackY] = result;
    }
    attacks.push({ attackX, attackY, result });
    console.log(`${attackX},${attackY} :${result}`);
    return result;
  };
  return {
    ships, attacks, placeShip, receiveAttack, allSunk, board,
  };
};

module.exports = gameboard;
