const ship = require('./ship');

const gameboard = () => {
  const shipsToPlace = [
    { name: 'carrier', length: 5, quantity: 1 },
    { name: 'battleship', length: 4, quantity: 2 },
    { name: 'destroyer', length: 3, quantity: 3 },
    { name: 'submarine', length: 3, quantity: 4 },
    { name: 'patrol boat', length: 2, quantity: 5 },
  ];
  const ships = [];
  const directions = ['north', 'south', 'east', 'west'];
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
      return 'fail';
    } if (!unObstructed(battleShip)) {
      return 'fail';
    }
    return 'fail';
  };

  const placeAllShips = () => {
    shipsToPlace.forEach((shipToPlace) => {
      for (let i = 0; i < shipToPlace.quantity; i++) {
        let placed = 'fail';
        while ((placed === 'fail')) {
          const placeX = Math.floor(Math.random() * 10);
          const placeY = Math.floor(Math.random() * 10);
          const facing = directions[Math.floor(Math.random() * 4)];
          placed = placeShip(placeX, placeY, facing, shipToPlace.length);
          if (placed !== 'fail') {
            console.log(`${shipToPlace.name} number ${i + 1} placed`);
          }
        }
      }
    });
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
    ships, attacks, placeShip, receiveAttack, allSunk, board, placeAllShips,
  };
};

module.exports = gameboard;